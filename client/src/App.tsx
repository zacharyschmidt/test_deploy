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


import './App.css';
import PrivateRoute from './components/private-route';
import HomePage from './HomePage';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, isLoading } = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    console.log('FIRST RENDER OF APP')
    dispatch(userLoggedOut());
    dispatch(getProfile(history));
  }, []);

  return (
    <>
      <div className="App">
        <Navbar />
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
      </div>
      <SnackBar
        position={{ vertical: 'bottom', horizontal: 'left' }}
        duration={3000}
      />
    </>
  );
}

export default App;