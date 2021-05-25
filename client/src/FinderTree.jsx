import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import {
  setTreeSeriesAction,
  setTreeStructureAction,
  fetchDataAction,  
  setSelectedTreeNodeAction,
  setSearchNodeAction,
  fetchCategoriesAction,
  setPageAction,
} from './redux/actions/eia/actions';

import ReactFinder from 'react-finderjs';
import './finderjs.css';
import { ContactSupportOutlined, LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { Divider } from '@material-ui/core';
import { stat } from 'fs';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

//const key = process.env.REACT_APP_EIA_API_KEY;

// memoize function so it will not rerender when 
// homepage rerenders. I could also change the homepage
// so it doesn't grab all of the state with it's Selector 
// hook (but then I cant see the search val in hompage)
//--actually, I shoud do this second option for performance
// reasons, but perhaps it is not high on optimization list
export default React.memo(function FinderTree() {
  let history = useHistory();
  const classes = useStyles();

  const nodeVal = useSelector((state) => state.eia.selectedTreeNode, shallowEqual);
  const treeCategories = useSelector((state) => state.eia.treeCategories, shallowEqual)
  const filters = useSelector((state) => state.eia.filters, shallowEqual) 
  const treeLeaves = useSelector((state) => state.eia.treeLeaves, shallowEqual)
  const searchTerm = useSelector((state) => state.eia.searchTerm, shallowEqual)
  //const page = useSelector((state) => state.eia.page, shallowEqual)
  const limit = useSelector((state) => state.eia.limit, shallowEqual)
  //const searchVal = useSelector((state) => state.eia.selectedSearchNode, shallowEqual)
  const dispatch = useDispatch();
  // should use store instead of state
  // const nodeVal = state.selectedTreeNode;
  //const searchVal = state.selectedSearchNode;
  

  //   if cat has no childCategories, return object1;
  //   if cat has childCategories with no nested children, return object2;
  //   if there are nested children, call this function on that cat
  const recursiveMap = (cat) => {
    if (cat.childCategories.length === 0) {
      if (cat.childSeries.length > 0) {
        return {
          id: cat.category_id,
          label: cat.name,
          childseries: cat.childSeries,
          children: [
            {
              id: cat.category_id,
              label: cat.name,
              childseries: cat.childSeries,
              display: 1,
            }
          ]
        };
      }
      return {
        id: cat.category_id,
        label: cat.name,
        childseries: cat.childSeries
        // if the category is a leaf,
        // give it a single child which is itself,
        // then I can render it in a column by itself
        // --what about the categories with both childCategories
        // and childSeries?
      };
    }

    return {
      id: cat.category_id,
      label: cat.name,
      childseries: cat.childSeries,
      children: cat.childCategories.map((cat) => recursiveMap(cat))
    };
  };
  // renaming the members of each category in treeCategories so the FinderJS tree
  // can process them childCategories -> children

  const tree = treeCategories.map((cat) => recursiveMap(cat)).sort((a, b) => {
                                            if (a.label > b.label) {
                                              return 1
                                            }
                                            return -1
  });
  let searchRoot = nodeVal
  //const [searchRoot, setSearchRoot] = useState(nodeVal);

  //will I still need useEffect with redux?
  React.useEffect(() => {
    //if (state.treeCats.length === 0) {
    // change these api calls to Actions. In the action
    // I will make call to my api
    // then in the categories service I will need a query that
    // gets all categories with parent_category_id matching the
    // selected node.
    // const fetchInitialTree = async (category_id) => {
    //   const URL = `https://api.eia.gov/category/?api_key=${key}&category_id=${category_id}`;
    //   const data = await fetch(URL);
    //   const dataJSON = await data.json();
    //   console.log(dataJSON);
    //   const treeData = dataJSON.category.childcategories.map((cat) => {
    //     return { id: String(cat.category_id), label: cat.name };
    //   });
    //   console.log(treeData);

    //   // how to set state?

    //   setTree({
    //     root: treeData
    //     //1: []
    //   });
    // };
    //fetchInitialTree('371');
    const node = nodeVal ? nodeVal : 371
    setTreeStructureAction(dispatch, node, filters);
    // fetchCategoriesAction(
    //     dispatch,
    //     searchTerm,
    //     371,
    //     filters,
    //     1,
    //     limit,
    //   );
  }, [filters]);

  const onLeafSelected = (item) => {
    console.log("In ON LEAF SELECTED")
    console.log(item);
    if (item.display) {
      console.log('Display Node')
      console.log(item)
      history.push(`/demo/details/${item.id}/EIA`)
      return;
    }
    
    if ((item.id === nodeVal)) {
      console.log("EXITING ON LEAF SELECTED NODEVAL == ITEM.ID")
      return;
    }
    // Won't be able to update search when walking back up the tree
    fetchCategoriesAction(
        dispatch,
        searchTerm,
        item.id,
        filters,
        1,
        limit,
      );
      setPageAction(dispatch, 1);
    if (item.display === 1) {
      return;
    }
    console.log("IN ON LEAF SELECTED--CONTINUING TO SET NODE AND TREE STRUCTURE")
    // check if childseries have already been fetched
    // if (!(nodeID[0] in tree)) {
    //setSearchRoot(nodeID)
  
    setSelectedTreeNodeAction(dispatch, item.id);
    //setSearchNodeAction(dispatch, item.id)
    

    setTreeStructureAction(dispatch, item.id, filters);
    setTreeSeriesAction(dispatch, []);
    

    let Series = treeLeaves.filter(function (leaf) {
      return leaf.category_id == Number(item.id);
    });

    Series = Series.length > 0 ? Series[0]['childseries'] : null;

    // make a new field in the store to hold an array of leaf nodes and query this to
    //find childseries. Than means the setTreeStructure action will write to this part
    // of the store as well.
    // console.log(flattenObject(state.treeCategories));
    if (Series && Series.length > 0) {
      setTreeSeriesAction(dispatch, Series);
    }
    if (Series && Series.length > 0) {
      console.log('FETCH DATA FROM FINDER TREE')
      fetchDataAction(
        dispatch,
        searchTerm,
        filters,
        Series,
        1, // always get first page. the tree can't get page with useSelector or it will
           // fetch data and interfere with pagination
        limit
      );
    }
    // } else {
    //   setTreeSeriesAction(
    //     dispatch,
    //     state.treeCategories[nodeID[0]].childseries
    //   );
    // }

    // this might cause bug
    //console.log(childSeries[nodeID[0]])

    // if childseries corresponding to nodeID[0] has length greater than 0, send the child series to the store.};
  };
  const itemSelected = (item) => { 
        // if ((item.id === searchVal)) {
        //   console.log("EXITING ON ITEM SELECTED SEARCHVAL == ITEM.ID")
        //   return;}
            // if (item.id === nodeVal) {
            //   console.log('ITEM ID = NODEVAL')
            // }
            // if ((item.id !== nodeVal)){ 
            // console.log('IN onITEMSELECTED')
            console.log(item)
            if (item.children) {
            if (item.children[0].display) {
              if (item.id !== nodeVal) {
               setSelectedTreeNodeAction(dispatch, item.id); 
              }
            }}
            setSearchNodeAction(dispatch, item.id)
            fetchCategoriesAction(
              dispatch,
              searchTerm,
              item.id,
              filters,
              1,
              limit,
              );
           
            console.log("ITEM ID")
            console.log(item.id)
            console.log(item)
            console.log('nodeVal OnItemSelected')
            console.log(nodeVal)
            console.log('searchVal OnItemSelected')
            //console.log(searchVal)
           
            //setSearchRoot(item.id)
         
            // }
            

  }
  const renderTree = (config, item) => {
   
    let div = document.createElement('div');
    div.innerText = `${item.label}`;
    let ul = document.createElement('ul');

    if (item.display == 1) {
      console.log('IN IF');
      item.childseries.forEach(function (series) {
        let a = document.createElement('a');
        ul.appendChild(a);
        a.innerHTML += series;
        // a.href = `/demo/details/${series}`;
      });
      let parent = document.getElementsByClassName('fjs-col');
      console.log(parent)

      setTimeout(() => {
        console.log(parent.length);
        console.log(
          parent.item(parent.length - 1).childNodes[0].childNodes[0]
            .childNodes[0]
              );
            parent.item(parent.length - 1).childNodes[0].childNodes[0]
            .childNodes[0].href = `/demo/details/${item.childseries[0]}`})
    //     let replacement = document.createElement('a');
    //     parent
    //       .item(parent.length - 1)
    //       .childNodes[0].childNodes[0].childNodes[0].replaceWith(replacement);
    //     console.log(parent);
    //   }, 100);
    // }
    }
    div.appendChild(ul);

    return div;
  };
  // console.log(tree);
  // const renderTree = (children) => {
  //   return children.map((child) => {
  //     const childrenNodes =
  //       tree[child.id] && tree[child.id].length > 0
  //         ? renderTree(tree[child.id])
  //         : [<div />];

  //     return (
  //       <TreeItem key={child.id} nodeId={child.id} label={child.label}>
  //         {childrenNodes}
  //       </TreeItem>
  //     );
  //   });
  // };
  console.log('TREE')
  console.log(tree)
  console.log('STATE')
 
  console.log("CURRENT TREE NODE")
  console.log(nodeVal)
  console.log("SEARCH Val")
  
  //console.log(searchVal)
  
  return (
    <ReactFinder
      className=""
      data={tree}
      onItemSelected={itemSelected}
      onLeafSelected={onLeafSelected}
      createItemContent={renderTree}
      value={{ id: nodeVal }}
    />
  );
  //   return (
  //     <TreeView
  //       className={classes.root}
  //       defaultCollapseIcon={<ExpandMoreIcon />}
  //       defaultExpandIcon={<ChevronRightIcon />}
  //       onNodeToggle={handleChange}
  //     >
  //
  //     </TreeView>
  //   );
})
