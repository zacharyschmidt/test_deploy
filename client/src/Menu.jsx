import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from './types';

import { setFilterAction, fetchDataAction, setMenuCatsAction, setMenuSelectionAction, fetchCategoriesAction, setPageAction } from './redux/actions/eia/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //const [selectedIndex, setSelectedIndex] = React.useState(0);
  // need logic here to read from store and match filter type with props,
  // and map filter option (from store to menu option index)

  const dispatch = useDispatch();
  let filter;
  switch (props.filter) {
    case "Country":
      filter = "Region"
      break;
    case "Top-Level Category":
      filter = "DataSet"
      break;
    case "Historical/Projection":
      filter = "HistorProj"
      break;
    default:
      filter = props.filter;
  }
  let other_filter1;
  let other_filter2
  let menu_options_name;
  let menu_selection;
  switch (filter) {
    case "Region":
      other_filter1 = "DataSet"
      other_filter2 = "HistorProj"
      menu_options_name = "menuRegions"
      menu_selection = "CountryMenuDisplay"
      break;
    case "DataSet":
      other_filter1 = "Region"
      other_filter2 = "HistorProj"
      menu_options_name = "menuTopCats"
      menu_selection = "DataSetName"
      break;
    case "HistorProj":
      other_filter1 = "DataSet"
      other_filter2 = "Region"
      menu_options_name = "menuHistorProj"
      menu_selection = "HistorProjDisplay"
      break;
    default:
      other_filter1 = '';
      other_filter2 = '';
  }
  // gives us the current selection of the other filter, a string for region, array of strings for dataset
  let other_filter_selection1 = useSelector((state) => state.eia.filters[other_filter1]);
  let other_filter_selection2 = useSelector((state) => state.eia.filters[other_filter2]);

  // gives array of options that this filter will display. read from the store
  let menu_options = useSelector((state) => state.eia[menu_options_name]);

  //gets current menu selection
  const selection = useSelector((state) => state.eia[menu_selection]);
  const state = useSelector((state) => state.eia)
  console.log(filter)
  console.log('other_filter_selection]', other_filter_selection1)
  console.log('menu_options', menu_options)
  console.log('state', state)
  useEffect(() => {
    if (filter === "Region" || filter === "HistorProj") {
      console.log(other_filter_selection1)
      console.log(other_filter1)
      other_filter_selection1 = other_filter_selection1[1]
    } else if (filter === "DataSet") {
      // do nothing?
      // other_filter1 = other_filter_selection1
    }
    setMenuCatsAction(dispatch, 371, filter, other_filter_selection1, other_filter_selection2)

  }, [other_filter_selection1, other_filter_selection2]);
  let options;
  if (filter === "Region") {
    options = menu_options.map((option) => props.options_dict[option]);
  }
  if (filter === "DataSet") {
    options = menu_options.map((option) => option.name)
    options.unshift('All')
    menu_options = menu_options.map((option) => [option.name, option.category_id])
    menu_options.unshift(['All', 'All'])
  }
  if (filter === "HistorProj") {
    options = menu_options;
  }
  // do I need to handle a case where selection is not found?
  const selectedIndex = options.findIndex((element) => element === selection)

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index) => {
    //setSelectedIndex(index);
    setAnchorEl(null);


    setFilterAction(dispatch, {
      filter: filter,
      option: menu_options[index],
    });
    setMenuSelectionAction(dispatch, {
      store_mem: menu_selection,
      selection: options[index]

    });
    let filter_obj = { ...state.filters, [filter]: menu_options[index] }
    fetchCategoriesAction(
      dispatch,
      state.searchTerm,
      state.selectedSearchNode ? state.selectedSearchNode : 371,
      filter_obj,
      1,
      state.limit,
    );
    setPageAction(dispatch, 1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label={props.filter}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={props.filter}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={props.filter}
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
