import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
  setTreeSeriesAction,
  setTreeStructureAction,
  fetchDataAction
} from './redux/actions/eia/actions';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

//const key = process.env.REACT_APP_EIA_API_KEY;

export default function Tree() {
  const classes = useStyles();

  const state = useSelector((state) => state.eia, shallowEqual);
  const dispatch = useDispatch();
  //const tree = state.tree

  // const initialTree = {
  //   root: []
  //   // 1: []
  // };

  // should use store instead of state
  // const [treeOld, setTree] = useState(initialTree);
  const tree = state.treeCategories;
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
    setTreeStructureAction(dispatch, 371);
  }, []);

  const handleChange = (event, nodeID) => {
    // check if childseries have already been fetched
    // if (!(nodeID[0] in tree)) {
    nodeID = nodeID[0];

    setTreeStructureAction(dispatch, nodeID);
    setTreeSeriesAction(dispatch, []);
    // const updateTree = async (nodeID) => {
    //   const URL = `https://api.eia.gov/category/?api_key=${key}&category_id=${nodeID}`;
    //   const data = await fetch(URL);
    //   const dataJSON = await data.json();
    //   console.log(dataJSON);
    //   //if dataJSON has childseries, send that to the store. Then homepage should send those childseries to
    //   // SeriesList to be rendered, unless there is search data to render.
    //   var treeData = dataJSON.category.childcategories.map((cat) => {
    //     return { id: String(cat.category_id), label: cat.name };
    //   });
    //   console.log(treeData);

    //   const newTree = {
    //     ...tree,
    //     [nodeID]: treeData
    //   };

    //   const Series = dataJSON.category.childseries;
    //   setSeries({ ...childSeries, [nodeID]: Series });

    //   setTree(newTree);
    //   console.log(Series);
    //   console.log(childSeries);
    //
    // };
    //updateTree(nodeID);

    //treeSeries will rely on Series, which relies on treeLeaves. But treeLeaves
    // gets set to empty array once I get down to an node with only series, because
    // Leaves are categories

    let Series = state.treeLeaves.filter(function (leaf) {
      return leaf.category_id == Number(nodeID);
    });
    console.log(Series);
    Series = Series.length > 0 ? Series[0]['childseries'] : null;
    console.log(Series);
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
  };
  // if childseries corresponding to nodeID[0] has length greater than 0, send the child series to the store.};
  const renderTree = (children) => {
    return children.map((child) => {
      const childrenNodes =
        tree[child.id] && tree[child.id].length > 0
          ? renderTree(tree[child.id])
          : [<div />];

      return (
        <TreeItem key={child.id} nodeId={child.id} label={child.label}>
          {childrenNodes}
        </TreeItem>
      );
    });
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeToggle={handleChange}
    >
      {renderTree(state.treeCategories[371])}
    </TreeView>
  );
}
