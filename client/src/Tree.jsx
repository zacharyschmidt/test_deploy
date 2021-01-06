import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { useSelector, useDispatch } from "react-redux";
import {setTreeSeriesAction} from "./Actions"

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

//const key = process.env.REACT_APP_EIA_API_KEY;

const key = "d329ef75e7dfe89a10ea25326ada3c43"
export default function Tree() {
  const classes = useStyles();

const state = useSelector((state) => state.eia)
const dispatch = useDispatch()
//const tree = state.tree

const initialTree = {
    root:  []
    // 1: []
  };



const [tree, setTree] = useState(initialTree)

const [childSeries, setSeries] = useState({})

React.useEffect(() => {
  
    //if (state.treeCats.length === 0) {
      const fetchInitialTree = async (category_id) => {
      const URL = `https://api.eia.gov/category/?api_key=${key}&category_id=${category_id}`;
      const data = await fetch(URL);
      const dataJSON = await data.json();
      console.log(dataJSON)
  const treeData = dataJSON.category.childcategories.map(cat => {
    return {id: String(cat.category_id),
            label: cat.name}}) 
    console.log(treeData)
  
  


    // how to set state?
    
    setTree(
      {root: treeData
      //1: []
    })
    };
   fetchInitialTree('371');
  },[]);
console.log(state)



console.log(tree)  




  const handleChange = (event, nodeID) => {
    console.log(nodeID)
    
    // check if childseries have already been fetched
    if (!(nodeID[0] in tree)) {
    nodeID = nodeID[0]
console.log(nodeID)
    const updateTree = async (nodeID) => {
      const URL = `https://api.eia.gov/category/?api_key=${key}&category_id=${nodeID}`;
      const data = await fetch(URL);
      const dataJSON = await data.json();
      console.log(dataJSON)
      //if dataJSON has childseries, send that to the store. Then homepage should send those childseries to 
      // SeriesList to be rendered, unless there is search data to render.
  var treeData = dataJSON.category.childcategories.map(cat => {
    return {id: String(cat.category_id),
            label: cat.name}}) 
    console.log(treeData)

    
    
      const newTree = {
        ...tree,
        [nodeID]: treeData
      };
     
      const Series = dataJSON.category.childseries
      setSeries({...childSeries, [nodeID]: Series})

      setTree(newTree);
      console.log(Series)
      console.log(childSeries)
      setTreeSeriesAction(dispatch, Series) 
    }; 
     updateTree(nodeID)
      
    } else {
     setTreeSeriesAction(dispatch, childSeries[nodeID[0]]) 
    }
    
   // this might cause bug
    //console.log(childSeries[nodeID[0]])
  }  
    // if childseries corresponding to nodeID[0] has length greater than 0, send the child series to the store.};
console.log(childSeries)
console.log(state)

  const renderTree = children => {
    return children.map(child => {
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
console.log(tree)
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeToggle={handleChange}
    >
      {renderTree(tree.root)}
    </TreeView>
  );
  }