
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ICategories, IStore } from './types';
import AddButton from './components/add-button/AddButton';
import { fetchChildSeriesAction, getBreadCrumbsAction } from './redux/actions/eia/actions';
import { setTreeSeriesAction } from './Actions';

const CategoryDetails = (props: any): JSX.Element => {
    // might want to get name, ancestor, dataset name from api call to server instead of 
    // the store, so page reloads return same data (right now category_id stays, its a URL param,
    // but other fields are fetched from redux store, which gets wiped out with a refresh)
    const category_id = props.match.params.category_id
    const custom_flag = props.match.params.custom_flag
    const filters = useSelector((state: IStore) => state.eia.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        // change fetchchildseries action to return series beloning to custom datagroup
        // if flag is set to custom
        //getBreadCrumbsAction(dispatch, category_id);
        fetchChildSeriesAction(dispatch, category_id,
            custom_flag,
            filters.Region,
            filters.Frequency);
    }, [category_id]
    )
    const state = useSelector((state: IStore) => state.eia.treeLeaves);
    const treeCats = useSelector((state: IStore) => state.eia.treeCategories)
    const series = useSelector((state: IStore) => state.eia.seriesData);
    // this logic should be rewritten--the whole custom category 
    //(and non-custom cats) should be fetched from the 
    // data base and put in the store, found in the state object
    const category = custom_flag === 'custom' ? { dataset_name: 'Custom', ancestors: 'none', name: 'US Energy Electricity GDP', childCategories: [], ancestor_names: [] } :
        custom_flag === 'kaya' ? { dataset_name: 'Custom', ancestors: 'none', name: 'US Energy Electricity GDP KAYA', childCategories: [], ancestor_names: [] } :
            custom_flag === 'AEO2021' ? { dataset_name: 'Custom', ancestors: 'none', name: 'Annual Energy Outlook 2021 KAYA', childCategories: [], ancestor_names: [] } :
                state.find((cat: any) => cat.category_id === Number(category_id));

    const tree_categories = useSelector((state: IStore) => state.eia.treeCategories);
    let ancestor_names: Array<String> = [];

    // if (category && Array.isArray(category.ancestors)) {
    //     console.log(category.ancestors)
    //     let FindAncestorNames = (cat_array: Array<ICategories>) => {
    //         cat_array.forEach((cat: ICategories) => {
    //             if (Array.isArray(category.ancestors) && category.ancestors.includes(cat.category_id)) {
    //                 if (cat.childCategories.length !== 0) {
    //                     ancestor_names.push(cat.name);
    //                     FindAncestorNames(cat.childCategories);
    //                 } else {
    //                     ancestor_names.push(cat.name)
    //                 }
    //             }
    //         })
    //     }
    //     FindAncestorNames(treeCats);
    // }


    const childseries = series.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        }
        return -1
    }).map((series: any) => <li key={series.series_id}>{series.name}</li>)





    //const series = useSelector((state: IStore) => state.eia.seriesData);
    //const series = await getSeries();
    //const childseries = series ? series.map((series) => <li>{series.name}</li>) : null
    //const childseries = series ? (series).map((series) => <li>{series.name}</li>) : null

    const downloadExcel = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/download/excel',
                responseType: 'blob',
                params: {
                    category_ID: category_id,
                    custom_flag: custom_flag,
                    ...filters,
                }
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            let name;
            if (category && category.dataset_name.includes('Annual Energy Outlook')) {
                name = (category.dataset_name + '_' + category.ancestor_names[1] + '_' + category.name).split(' ').join('')
            } else if (category) {
                name = (category.dataset_name + '_' + category.name).split(' ').join('')
            }

            link.setAttribute('download', `${name}.xlsx`);
            document.body.appendChild(link);
            link.click();
        }
        catch (error) { }
    }
    const downloadRIS = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: '/api/download/RIS',
                responseType: 'blob',
                params: {
                    category_ID: custom_flag == 'AEO2021' ? 4047325 : category_id,
                }
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            let name;
            if (category && category.dataset_name.includes('Annual Energy Outlook')) {
                name = (category.dataset_name + '_' + category.ancestor_names[1] + '_' + category.name).split(' ').join('')
            } else if (category) {
                name = (category.dataset_name + '_' + category.name).split(' ').join('')
            }

            link.setAttribute('download', `${name}.RIS`);
            document.body.appendChild(link);
            link.click();
        }
        catch (error) { }
    }


    return (
        <div>
            <section>
                <br />
                <br />

                <br />
                <br />
                <h2>Category Name: {category ? category.name : ''}</h2>
                <h2>Category ID: {category_id}</h2>
                <h3>Dateset: {category ? category.dataset_name : ''}</h3>
                <h3>Ancestors: {category ? category?.ancestor_names.join(" -> ") : ''}</h3>
                <p>Click buttons below to download data and citations</p>
                <p>Data series are only included in the download if they match your filter selections on the homepage.</p>
                <ul style={{ textAlign: "left" }}>{childseries}</ul>
            </section>
            <section>
                <AddButton
                    onClick={downloadExcel}
                    text="Download Excel"
                    // filename={`${(category ? category.name : '') + '.' + ancestor_names.join('.')}.xlsx`}
                    style={{ color: 'blue' }}
                />
                <AddButton
                    onClick={downloadRIS}
                    text="Download RIS"
                    // filename="Test.xlsx"
                    style={{ color: 'green' }}
                />
            </section>
        </div >
    )
}

export default CategoryDetails;
function dispatch(dispatch: any, category_id: any, custom_flag: any, Region: any, Frequency: any) {
    throw new Error('Function not implemented.');
}

