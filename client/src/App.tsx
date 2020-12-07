import React, { useEffect } from 'react';
import Home from './pages/Home';
import Demo from './pages/Demo';
import Navbar from './containers/Navbar';
import IndexData from './IndexData';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SnackBar from './components/snackbar/SnackBar';
import Login from './auth/Login';
import Register from './auth/Register';

import { useDispatch } from 'react-redux';
import { getProfile } from './redux/actions/auth/actions';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/demo" component={IndexData} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
      <SnackBar
        position={{ vertical: 'bottom', horizontal: 'left' }}
        duration={3000}
      />
    </>
  );
}

export default App;
