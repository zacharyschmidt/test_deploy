import React from 'react';
import { ISeriesProps, IStore } from './types';
import { toggleSelectAction } from './redux/actions/eia/actions';
import { useDispatch, useSelector } from 'react-redux';
const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function SelectedPage(): JSX.Element {
  const dispatch = useDispatch();
  const state = useSelector((state: IStore) => state.eia);


  const props: ISeriesProps = {
    series: state.selected,
    store: { state, dispatch },
    toggleSelectAction,
    selected: state.selected
  };
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <div className="series-layout">
        <SeriesList {...props} />
      </div>
    </React.Suspense>
  );
}
