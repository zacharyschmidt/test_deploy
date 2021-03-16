
import React, {useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from './types';
import AddButton from './components/add-button/AddButton';
import {fetchChildSeriesAction} from './redux/actions/eia/actions';

const CategoryDetails = (props: any): JSX.Element => {
// might want to get name, ancestor, dataset name from api call to server instead of 
// the store, so page reloads return same data (right now category_id stays, its a URL param,
// but other fields are fetched from redux store, which gets wiped out with a refresh)
    const category_id = props.match.params.category_id 
    const filters = useSelector((state: IStore) => state.eia.filters);
    useEffect(() => {
       fetchChildSeriesAction(dispatch, category_id,
        filters.Region, 
        filters.Frequency);
        }, []
    )
    const state = useSelector((state: IStore) => state.eia.treeLeaves);
    const series = useSelector((state: IStore) => state.eia.seriesData);

    const category = state.find((cat: any) => cat.category_id === Number(category_id));
    console.log(category)
    
    const dispatch = useDispatch()
    // const getSeries = async () => {
    //    const series = await fetchChildSeriesAction(dispatch, category ? category.category_id : 0, filters.Region, filters.Frequency) 
    //    return series.map((series) => <li>{series.name}</li>)
    // }
   console.log(series)
    
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
      catch (error) {}
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
      catch (error) {}
    }
  
    return (
        <div>
        <section>
            <h2>Category Name: {category ? category.name : ''}</h2>
            <h2>Category ID: {category_id}</h2>
            <h3>Dateset: {category ? category.dataset_name : ''}</h3>
            <h3>Ancestors: {category ? category.ancestors : ''}</h3>
            <p>Click buttons below to download data and citations</p>
            <p>Data series are only included in the download if they match your filter selections on the homepage.</p> 
            <ul>{childseries}</ul>
        </section>
        <section>
             <AddButton
              onClick={downloadExcel}
              text="Download Excel"
              filename="test.xlsx"
              style={{color: 'blue'}}
            />
            <AddButton
              onClick={downloadRIS}
              text="Download RIS"
              filename="Test.xlsx"
              style={{color: 'green'}}
            />
        </section>
        </div>
    )
}

export default CategoryDetails;
