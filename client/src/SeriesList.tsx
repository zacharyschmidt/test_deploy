import React from 'react';
import DataCard from './DataCard';
import CatCard from './CatCard';
import { ISeries, ICategories, IStore } from './types';
import { fetchParentCatsAction } from './redux/actions/eia/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function SelectedList(props: any): Array<JSX.Element> {
  const { categories, toggleSelectAction, selected} = props;

  // const { state, dispatch } = store;
  const state = useSelector((state: IStore) => state.eia);
  const dispatch = useDispatch()

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
