import React from 'react';
import DataCard from './DataCard';
import { ISeries } from './types';

export default function SelectedList(props: any): Array<JSX.Element> {
  const { series, toggleSelectAction, selected, store } = props;

  const { state, dispatch } = store;
  console.log(state);
  return series.map((singleSeries: ISeries) => {
    return (
      <DataCard
        toggle={() => toggleSelectAction(state, dispatch, singleSeries)}
        singleSeries={singleSeries}
        selected={selected}
      />
    );
  });
}
