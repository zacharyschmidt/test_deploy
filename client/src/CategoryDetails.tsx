
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ICategories, IStore } from './types';
import AddButton from './components/add-button/AddButton';
import { fetchChildSeriesAction, getBreadCrumbsAction } from './redux/actions/eia/actions';

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
    }, []
    )
    const state = useSelector((state: IStore) => state.eia.treeLeaves);
    const treeCats = useSelector((state: IStore) => state.eia.treeCategories)
    const series = useSelector((state: IStore) => state.eia.seriesData);
    // this logic should be rewritten--the whole custom category 
    //(and non-custom cats) should be fetched from the 
    // data base and put in the store, found in the state object
    const category = custom_flag === 'custom' ? { dataset_name: 'Custom', ancestors: 'none', name: 'US Energy Electricity GDP', childCategories: [] } :
        custom_flag === 'kaya' ? { dataset_name: 'Custom', ancestors: 'none', name: 'US Energy Electricity GDP KAYA', childCategories: [] } :
            state.find((cat: any) => cat.category_id === Number(category_id));

    console.log(category)
    const tree_categories = useSelector((state: IStore) => state.eia.treeCategories);
    let ancestor_names: Array<String> = [];
    
    if (category && Array.isArray(category.ancestors)) {
    let FindAncestorNames = (cat_array: Array<ICategories>) => {
            cat_array.forEach((cat: ICategories) => {
                if (Array.isArray(category.ancestors) && category.ancestors.includes(cat.category_id)){
                    if (cat.childCategories.length !== 0) {
                        ancestor_names.push(cat.name);
                        FindAncestorNames(cat.childCategories);
                    } else {
                        ancestor_names.push(cat.name)
                    }
                }})
    }  
    FindAncestorNames(treeCats);
  }
  console.log(ancestor_names)
     

    const childseries = series.map((series: any) => <li>{series.name}</li>)

    console.log(childseries)



    //const series = useSelector((state: IStore) => state.eia.seriesData);
    //const series = await getSeries();
    //const childseries = series ? series.map((series) => <li>{series.name}</li>) : null
    //const childseries = series ? (series).map((series) => <li>{series.name}</li>) : null

    console.log(state)
    const downloadExcel = async () => {
        try {
            console.log(category_id)
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
            link.setAttribute('download', 'test.xlsx');
            document.body.appendChild(link);
            link.click();
        }
        catch (error) { }
    }
    const downloadRIS = async () => {
        try {
            console.log(category_id)
            const response = await axios({
                method: 'GET',
                url: '/api/download/RIS',
                responseType: 'blob',
                params: {
                    category_ID: category_id,
                }
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'test.RIS');
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
                <h3>Ancestors: {ancestor_names.join(" -> ")}</h3>
                <p>Click buttons below to download data and citations</p>
                <p>Data series are only included in the download if they match your filter selections on the homepage.</p>
                <ul>{childseries}</ul>
            </section>
            <section>
                <AddButton
                    onClick={downloadExcel}
                    text="Download Excel"
                    filename="test.xlsx"
                    style={{ color: 'blue' }}
                />
                <AddButton
                    onClick={downloadRIS}
                    text="Download RIS"
                    filename="Test.xlsx"
                    style={{ color: 'green' }}
                />
            </section>
        </div>
    )
}

export default CategoryDetails;
function dispatch(dispatch: any, category_id: any, custom_flag: any, Region: any, Frequency: any) {
    throw new Error('Function not implemented.');
}

