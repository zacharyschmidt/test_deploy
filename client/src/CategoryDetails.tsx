
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IStore } from './types';
import AddButton from './components/add-button/AddButton';

const CategoryDetails = (props: any): JSX.Element => {
    const categoryID = props.match.params.categoryID 
    
    const state = useSelector((state: IStore) => state.eia.treeLeaves);
    const category = state.find((cat: any) => cat.category_id === Number(categoryID));
    console.log(category)
    const filters = useSelector((state: IStore) => state.eia.filters);
    const childseries = category ? category.childSeries.map((series) => <li>{series}</li>) : null
    
    console.log(state)
    const downloadExcel = async () => {
        try {
            console.log(categoryID)
            const response = await axios({
            method: 'GET',
            url: '/api/download/excel',
            responseType: 'blob',
            params: {
                category_ID: categoryID,
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
            console.log(categoryID)
            const response = await axios({
            method: 'GET',
            url: '/api/download/RIS',
            responseType: 'blob',
            params: {
                category_ID: categoryID,
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
            <h2>Category ID: {categoryID}</h2>
            <h3>Dateset: {category ? category.dataset_name : ''}</h3>
            <h3>Ancestors: {category ? category.ancestors : ''}</h3> 
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
