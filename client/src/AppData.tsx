import React from 'react';
import { Store } from './Store';
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';

import Button from '@material-ui/core/Button/Button';
export default function App(props: any): JSX.Element {
  const { state } = React.useContext(Store);

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
      {props.children}
    </React.Fragment>
  );
}
