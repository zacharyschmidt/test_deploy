import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppData from './AppData';
import { StoreProvider } from './Store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SelectedPage from './SelectedPage';
import TreePage from './TreePage';
import DatasetDetails from './DatasetDetails';

export default function IndexData(props: any): JSX.Element {
  return (
    <StoreProvider>
      <Router>
        <AppData>
          <Switch>
            <Route exact path="/demo" component={HomePage} />
            <Route path="/demo/selected" component={SelectedPage} />
            <Route path="/demo/tree" component={TreePage} />
            <Route path="/demo/details/:series_id" component={DatasetDetails} />
          </Switch>
        </AppData>
      </Router>
    </StoreProvider>
  );
}
