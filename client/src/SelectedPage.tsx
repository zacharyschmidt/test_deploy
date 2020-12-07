import React from 'react';
import { Store } from './Store';
import { ISeriesProps } from './types';
import { toggleSelectAction } from './redux/actions/eia/actions';

const SeriesList = React.lazy<any>(() => import('./SeriesList'));

export default function SelectedPage(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

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
