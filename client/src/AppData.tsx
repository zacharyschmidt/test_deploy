import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IStore } from './types';
import Button from '@material-ui/core/Button/Button';
export default function App(props: any): JSX.Element {
  const state = useSelector((state: IStore) => state.eia);

  return (
    <React.Fragment>
      {/* <header className="header"> */}
      <AppBar position="relative" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          {/* <Typography >News</Typography>  */}
          <Button color="inherit">
            <Link to="/demo">Home</Link>
          </Button>
          <Button>
            <Link to="/demo/selected"> Selected: {state.selected.length}</Link>
          </Button>
          <Button>
            <Link to="/demo/tree"> Tree </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <div>
        <h1>EIA Search</h1>
        <br />
        <p>Search EIA Data</p>
      </div>
      <div></div>

      {/* </header> */}
      {/* this is where we render the home page thate is passes as a child through 
      the router in IndexData */}
      {props.children}
    </React.Fragment>
  );
}
