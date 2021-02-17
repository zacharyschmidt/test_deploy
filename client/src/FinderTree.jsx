import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  setTreeSeriesAction,
  setTreeStructureAction,
  fetchDataAction, 
  setSelectedTreeNodeAction,
} from './redux/actions/eia/actions';

import ReactFinder from 'react-finderjs';
import './finderjs.css';
import { ContactSupportOutlined } from '@material-ui/icons';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

//const key = process.env.REACT_APP_EIA_API_KEY;

export default function FinderTree() {
  const classes = useStyles();

  const state = useSelector((state) => state.eia, shallowEqual);
  const dispatch = useDispatch();
  // should use store instead of state
  const nodeVal = state.selectedTreeNode;
  

  //   if cat has no childCategories, return object1;
  //   if cat has childCategories with no nested children, return object2;
  //   if there are nested children, call this function on that cat
  const recursiveMap = (cat) => {
    if (cat.childCategories.length === 0) {
      if (cat.childSeries.length > 0) {
        return {
          id: cat.categoryID,
          label: cat.name,
          childseries: cat.childSeries,
          children: [
            {
              id: cat.categoryID,
              label: cat.name,
              childseries: cat.childSeries,
              display: 1,
            }
          ]
        };
      }
      return {
        id: cat.categoryID,
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
      id: cat.categoryID,
      label: cat.name,
      childseries: cat.childSeries,
      children: cat.childCategories.map((cat) => recursiveMap(cat))
    };
  };
  // renaming the members of each category in treeCategories so the FinderJS tree
  // can process them childCategories -> children

  const tree = state.treeCategories.map((cat) => recursiveMap(cat));

  const [childSeries, setSeries] = useState({});

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

    setTreeStructureAction(dispatch, 371, state.filters);
  }, [state.filters]);

  const handleChange = (item) => {
    console.log(item);
    if (item.id === nodeVal) {
      return;
    }
    if (item.dispaly === 1) {
      return;
    }

    // check if childseries have already been fetched
    // if (!(nodeID[0] in tree)) {
    let nodeID = item.id;
    setSelectedTreeNodeAction(dispatch, nodeID);

    setTreeStructureAction(dispatch, nodeID, state.filters);
    setTreeSeriesAction(dispatch, []);

    let Series = state.treeLeaves.filter(function (leaf) {
      return leaf.category_id == Number(nodeID);
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
      fetchDataAction(
        dispatch,
        state.searchTerm,
        state.filters,
        Series,
        state.page,
        state.limit
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
        a.href = `/demo/details/${series}`;
      });
      let parent = document.getElementsByClassName('fjs-col');

      setTimeout(() => {
        console.log(parent.length);
        console.log(
          parent.item(parent.length - 1).childNodes[0].childNodes[0]
            .childNodes[0]
        );
        let replacement = document.createElement('a');
        parent
          .item(parent.length - 1)
          .childNodes[0].childNodes[0].childNodes[0].replaceWith(replacement);
        console.log(parent);
      }, 100);
    }

    div.appendChild(ul);

    return div;
  };
  console.log(tree);
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
  console.log(state)
  console.log("CURRENT TREE NODE")
  console.log(nodeVal)
  
  return (
    <ReactFinder
      className=""
      data={tree}
      onItemSelected={() => {}}
      onLeafSelected={handleChange}
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
}
