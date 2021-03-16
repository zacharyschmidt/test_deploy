import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppData from './AppData';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SelectedPage from './SelectedPage';
import TreePage from './TreePage';
import CategoryDetails from './CategoryDetails';
import { Provider } from 'react-redux';
import store from './redux/store/store';

export default function IndexData(props: any): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <AppData>
          <Switch>
            <Route exact path="/demo" component={HomePage} />
            <Route path="/demo/selected" component={SelectedPage} />
            <Route path="/demo/tree" component={TreePage} />
            <Route path="/demo/details/:category_id" component={CategoryDetails} />
          </Switch>
        </AppData>
      </Router>
    </Provider>
  );
}
