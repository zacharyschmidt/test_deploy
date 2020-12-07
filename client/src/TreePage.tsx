import React from 'react';
import SearchBar from './SearchBar';
import Tree from './Tree';
import SimpleMenu from './Menu';
import { ISeriesProps } from './types';
import { Store } from './Store';
import {
  fetchDataAction,
  toggleSelectAction
} from './redux/actions/eia/actions';

const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function TreePage() {
  const { state, dispatch } = React.useContext(Store);

  const props: ISeriesProps = {
    series: state.treeSeries.flat(),
    store: { state, dispatch },
    toggleSelectAction,
    selected: state.selected
  };
  console.log(state.treeSeries);

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <br />
        <br />
        <section className="treeAndSeries">
          <section>
            <Tree />
          </section>
          <section className="series-layout">
            <SeriesList {...props} />
          </section>
        </section>
      </React.Suspense>
    </React.Fragment>
  );
}
