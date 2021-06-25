import React, { useEffect } from 'react';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Navbar from './containers/Navbar';
import IndexData from './IndexData';
import CategoryDetails from './CategoryDetails';

import { Switch, Route, useHistory, Redirect, BrowserRouter as Router } from 'react-router-dom';

import SnackBar from './components/snackbar/SnackBar';
import Login from './pages/Login';
import Register from './pages/Register';

import { useDispatch, useSelector } from 'react-redux';
import { getProfile, userLoggedOut } from './redux/actions/auth/actions';
import { IStore } from './types';

import { Grid, makeStyles } from '@material-ui/core'


import './App.css';
import PrivateRoute from './components/private-route';
import HomePage from './HomePage';
import Footer from './containers/Footer';

const useStylesContainer = makeStyles(theme => ({
  root: {
    minHeight: '100%',
  },
  footer: {
    bottom: "0",
    position: "relative",
    width: "100%"

  }
}));


function App() {
  const classesContainer = useStylesContainer();

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, isLoading } = useSelector((state: IStore) => state.auth);

  useEffect(() => {

    dispatch(userLoggedOut());
    dispatch(getProfile(history));
  }, []);

  return (
    <Grid container direction="column" className={classesContainer.root}>
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item>
        {!isLoading ? (

          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/login" component={Login} />
            {/* <Route path="/register" component={Register} /> */}

            <PrivateRoute
              isLoggedIn={!!currentUser}
              exact path="/demo"
              component={HomePage}
            />
            <PrivateRoute
              isLoggedIn={!!currentUser}
              path="/todo"
              component={Demo}
            />
            <PrivateRoute
              isLoggedIn={!!currentUser}
              path="/demo/details/:category_id/:custom_flag"
              component={CategoryDetails}
            />
            <Route>
              <Redirect to="/demo" />
            </Route>
            {/* <Grid item container direction="column">
              <Footer />
            </Grid> */}
          </Switch>

        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Loading...
          </div>
        )}

      </Grid>
      <SnackBar
        position={{ vertical: 'bottom', horizontal: 'left' }}
        duration={3000}
      />
      <Grid item className={classesContainer.footer}>
        <Footer />
      </Grid>




    </Grid>
  );
}

export default App;