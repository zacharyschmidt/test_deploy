import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from './types';

import { setFilterAction, fetchDataAction } from './redux/actions/eia/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const state = useSelector((state) => state.eia);
  const dispatch = useDispatch();

  console.log('RENDERING MENU')
  const options = props.options;
  useEffect(() => {
    console.log('FETCH DATA FROM MENU')
    // fetchDataAction(
    //   dispatch,
    //   state.searchTerm,
    //   state.filters,
    //   state.treeSeries,
    //   state.page,
    //   state.limit,
    // );
  }, [selectedIndex]);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
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

    setFilterAction(dispatch, {
      filter: filter,
      option: options[index]
    });
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
