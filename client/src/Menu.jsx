import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from './types';

import { setFilterAction, fetchDataAction, setMenuCatsAction, setMenuSelectionAction, fetchCategoriesAction } from './redux/actions/eia/actions';

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
    default:
      filter = props.filter;
  }
  let other_filter;
  let menu_options_name;
  let menu_selection;
  switch (filter) {
    case "Region":
      other_filter = "DataSet"
      menu_options_name = "menuRegions"
      menu_selection = "CountryMenuDisplay"
      break;
    case "DataSet":
      other_filter = "Region"
      menu_options_name = "menuTopCats"
      menu_selection = "DataSetName"
      break;
    default:
      other_filter = '';
  }
  const other_filter_selection = useSelector((state) => state.eia.filters[other_filter]);
  let menu_options = useSelector((state) => state.eia[menu_options_name]);
  const selection = useSelector((state) => state.eia[menu_selection]);
  const state = useSelector((state) => state.eia)

  useEffect(() => {
    let other_filter;
    if (filter === "Region") {
      other_filter = other_filter_selection[1]
    } else {
      other_filter = other_filter_selection
    }
    setMenuCatsAction(dispatch, 371, filter, other_filter)

  }, [other_filter_selection]);
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
