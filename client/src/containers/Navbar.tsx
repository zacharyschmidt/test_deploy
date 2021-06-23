import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import AuthLinks from '../components/auth-links/AuthLinks';
import CuratedDropdown from './CuratedDropdown';

const useStyles = makeStyles(() => ({
  navbar: {
    height: '80px',
    width: '100%',
    //position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    boxShadow: '0 0 8px 3px rgba(0,0,0,0.2)',
    zIndex: 999
  },
  navLinks: {
    '& > a': {
      margin: '0 1rem'
    }
  },
  authLinks: {
    marginRight: '1.5rem',
    display: 'flex',
    //justifyContent: 'flex-end',
    flex: 1,
    '& > a': {
      textDecoration: 'none',
      color: 'black'
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div>
    
      <AppBar position="static">
          <Toolbar style={{
            background: '#d3d3d3'
          }}>
            <Typography variant="h6">
              <Link to="/">

                Login Page

              </Link>
            </Typography>

            <Typography variant="h6">
              <Link to="/demo">

                Data Explorer

              </Link>
            </Typography>
            <CuratedDropdown />

            <div style={{
              marginRight: '1.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
              flex: 1,
              textDecoration: 'none',
              color: 'black'
            }
            }>
              <AuthLinks />
            </div>
          </Toolbar>
        </AppBar>

      {/* <div className={classes.navLinks}>
        <Link to="/">
          <Button
            style={{
              textDecoration: 'none',
              border: '2px black solid',
              height: '48px',
              width: '80px'
            }}
          >
            Login Page
          </Button>
        </Link>
        <Link to="/demo">
          <Button
            style={{
              background: 'black',
              color: 'white',
              textDecoration: 'none',
              height: '48px',
              width: '150px'
            }}
          >
            Data Explorer
          </Button>
        </Link>
        {/* <Link to="/todo">
          <Button
            style={{
              background: 'black',
              color: 'white',
              textDecoration: 'none',
              height: '48px',
              width: '80px'
            }}
          >
            Todo
          </Button>
        </Link> 


      </div>*/}
      <div className={classes.navbar}>
      <h1 style={{ textAlign: 'right' }}>EIA Data Exploration Tool (Alpha)</h1>
      {/* <div className={classes.authLinks}>
        <AuthLinks />
      </div> */}

    </div>
    </div>
  );
};

export default Navbar;
