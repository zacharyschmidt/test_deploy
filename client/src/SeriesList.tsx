import React from 'react';
import DataCard from './DataCard';
import CatCard from './CatCard';
import { ISeries, ICategories } from './types';
import { fetchParentCatsAction } from './redux/actions/eia/actions';

export default function SelectedList(props: any): Array<JSX.Element> {
  const { categories, toggleSelectAction, selected, store } = props;

  const { state, dispatch } = store;

  // change to render categories
  return categories.map((singleCat: ICategories) => {
    return (
      <CatCard
        toggle={() => toggleSelectAction(state, dispatch, singleCat)}
        singleCat={singleCat}
        selected={selected}
        dispatch={dispatch}
        fetchParentCats={fetchParentCatsAction}
        filters={state.filters}
      />
    );
  });
}
