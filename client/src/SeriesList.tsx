import React from 'react';
import DataCard from './DataCard';
import { ISeries } from './redux/actions/eia/interfaces';

export default function SelectedList(props: any): Array<JSX.Element> {
  const { series, toggleSelectAction, selected, store } = props;
  console.log(series);
  const { state, dispatch } = store;
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
