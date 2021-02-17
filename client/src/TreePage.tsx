import React from 'react';
import SearchBar from './SearchBar';
import Tree from './Tree';
import SimpleMenu from './Menu';
import { ISeriesProps, IStore } from './types';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchDataAction,
  toggleSelectAction
} from './redux/actions/eia/actions';

const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function TreePage() {
  const state = useSelector((state: IStore) => state.eia);
  const dispatch = useDispatch();

  const props: ISeriesProps = {
    series: state.treeSeries.flat(),
    store: { state, dispatch },
    toggleSelectAction,
    selected: state.selected
  };
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
