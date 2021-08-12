import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { shallowEqual, useSelector, useDispatch, batch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import {
  setTreeSeriesAction,
  setTreeStructureAction,
  fetchDataAction,
  setSelectedTreeNodeAction,
  setSearchNodeAction,
  setCardRowsAction,
  setPageAction,
  fetchChildSeriesAction,
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

  const series = useSelector((state) => state.eia.seriesData);


  //const searchVal = useSelector((state) => state.eia.selectedSearchNode, shallowEqual)
  const dispatch = useDispatch();
  // should use store instead of state
  // const nodeVal = state.selectedTreeNode;
  //const searchVal = state.selectedSearchNode;
  const flag = useRef();

  // setItem will set this local variable to avoid rerender


  //   if cat has no childCategories, return object1;
  //   if cat has childCategories with no nested children, return object2;
  //   if there are nested children, call this function on that cat
  const recursiveMap = (cat) => {

    if (cat?.childnames && cat.childnames.length > 0 && cat.childnames[0]) {
      if (cat.has_children) {

        return {
          id: cat.category_id,
          search_id: cat.category_id,
          label: cat.name,
          childnames: cat.childnames,
          childseries: cat.childseries,
          children: [
            {
              id: cat.category_id * 100,
              search_id: cat.category_id,
              label: !cat.childCategories ? cat.name : 'Click to see child categories >>>',
              children: cat.childCategories.length > 0 ? cat.childCategories.map((cat) => recursiveMap(cat)) : null,
              // childnames: cat.childnames,
              childseries: cat.childseries,

            },
            {
              id: cat.category_id * 101,
              search_id: cat.category_id,
              label: cat.name,
              childnames: cat.childnames,
              childseries: cat.childseries,
              display: 1,
            }
          ]
        };
      } else if (!cat.has_children) {

        return {
          id: cat.category_id,
          search_id: cat.category_id,
          label: cat.name,
          childnames: cat.childnames,
          childseries: cat.childseries,
          children: [
            {
              id: cat.category_id * 101,
              search_id: cat.category_id,
              label: cat.name,
              childnames: cat.childnames,
              childseries: cat.childseries,
              display: 1,
            }
          ]
        }
      }
    }
    if (cat.childCategories.length === 0) {

      return {

        id: cat.category_id,
        search_id: cat.category_id,
        label: cat.name,
        childnames: cat.childnames,
        childseries: cat.childseries
        // if the category is a leaf,
        // give it a single child which is itself,
        // then I can render it in a column by itself
        // --what about the categories with both childCategories
        // and childseries?
      };
    }

    return {

      id: cat.category_id,
      search_id: cat.category_id,
      label: cat.name,
      childseries: cat.childseries,
      childnames: cat.childnames,
      children: cat.childCategories.map((cat) => recursiveMap(cat))
    };
  };

  // renaming the members of each category in treeCategories so the FinderJS tree
  // can process them childCategories -> children
  // const tree = [{ id: 964165, label: "Annual Energy Outlook 2014", childseries: [], 
  //   children: [{ id: 964135, label: "Annual Energy Outlook 2012", childseries: []}] },
  // { id: 963165, label: "Annual Energy Outlook 2015", childseries: [] }]

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
    flag.current = true
    const node = nodeVal ? nodeVal : 371
    setTreeStructureAction(dispatch, '', node, filters);
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

    console.log('LEAF SELECTEC', item.label)
    flag.current = false
    // how will we know ahead of time if the item has children?
    if (item.display) {
      history.push(`/demo/details/${item.search_id}/EIA`)
      return;
    }

    if ((item.id === nodeVal)) {

      return;
    }
    console.log('fetching data', item.label)

    batch(() => {



      setTreeStructureAction(dispatch, searchTerm, item.search_id, filters);
      // Won't be able to update search when walking back up the tree

      // FOR DEBUGGING

      // fetchCategoriesAction(
      //   dispatch,
      //   searchTerm,
      //   item.search_id,
      //   filters,
      //   1,
      //   limit,
      // );


      //setPageAction(dispatch, 1);
      if (item.display === 1) {
        return;
      }
      // check if childseries have already been fetched
      // if (!(nodeID[0] in tree)) {
      //setSearchRoot(nodeID)

      setSelectedTreeNodeAction(dispatch, item.id);
      //setSearchNodeAction(dispatch, item.id)



      setTreeSeriesAction(dispatch, []);
    })
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


    console.log('ITEM SELECTED')
    console.log(item.label)



    if (!item.children || item.children.length === 0) {
      // run action to query for children?
      return
    }

    // if ((item.id === searchVal)) {
    //   console.log("EXITING ON ITEM SELECTED SEARCHVAL == ITEM.ID")
    //   return;}
    // if (item.id === nodeVal) {
    //   console.log('ITEM ID = NODEVAL')
    // }
    // if ((item.id !== nodeVal)){ 
    // console.log('IN onITEMSELECTED')
    if (item.children) {
      if (item.children[0].display) {
        console.log('ITEM SELECTED: display node')
        console.log(item.label)

        if (item.id !== nodeVal) {
          // this part is important
          console.log('ITEM SELECTED: set selected tree node')
          // setSelectedTreeNode causes the tree to rerender and all the 
          // synthetic itemSelections to fire
          //setSelectedTreeNodeAction(dispatch, item.id);
        }
      }
    }

    // this might be a problem, won't it cause rerendering?
    console.log('ITEM SELECTED: set search node')
    setSearchNodeAction(dispatch, item.search_id)

    // commented out for debugging

    // && item.id === nodeVal
    if (flag.current && !item.children[0].display) {
      console.log('ITEM SELECTED: flag.current is true, setCardRowsAction')
      console.log('setting card rows')
      console.log(item.label)

      setCardRowsAction(
        dispatch,
        searchTerm,
        item.search_id,
        filters,
        1,
        limit,
      );



    }

    if (item.id === nodeVal) {
      console.log('ITEM SELECTED: item.id = nodeVal, set flag.current = true')
      flag.current = true;
    }


    //console.log(searchVal)

    //setSearchRoot(item.id)

    // }


  }
  const renderTree = (config, item) => {



    let div = document.createElement('div');
    div.innerText = `${item.label}`;
    if (item.children && item.children[0].display) {
      div.style.color = '#9e0202';
    } 
    if (item.children && item.children.length > 1 && item.children[1].display) {
      //hybrid node
      div.style.color = '#ff8e2b'
    }



    if (item.display == 1) {
      //if (item.childseries.length > 0) {
      div.style.border = '4px';
      div.style.color = '#2b32ff';
      div.innerHTML = `<strong>Category: ${item.label}</strong>`;
      let p = document.createElement('p')
      p.innerText = 'Time Series: '
      div.appendChild(p);

      let ul = document.createElement('ul');
      ul.classList.add('series-list')
      div.appendChild(ul);
      item.childnames.sort((a, b) => {
        if (a > b) {
          return 1
        }
        return -1
      }).forEach(function (name) {


        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += name;

      });




    }


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


  //console.log(searchVal)
  // console.log('RENDERING TREE')


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
