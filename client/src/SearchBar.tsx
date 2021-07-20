import { stat } from 'fs';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataAction,
  fetchCategoriesAction,
  clearSearchAction,
  setSearchTermAction,
  freshStartAction,
  setPageAction,
  setCardRowsAction,
} from './redux/actions/eia/actions';
import { IStore } from './types';

type FormElem = React.FormEvent<HTMLFormElement>;
// add page number and limit (records per page) to IStore state.eia
// create actions to update these two variables and add them to reducer
export default function SearchBar(): JSX.Element {
  const dispatch = useDispatch();
  const state = useSelector((state: IStore) => state.eia);

  const [value, setValue] = useState<string>(state.searchTerm);
  // const [region, setRegion]
  // const [frequency, setFrequency]
  // const [hist, setHist]
  // then add modal to input form, set state when they change, and add
  // all the filters to the fetchDataAction

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setSearchTermAction(dispatch, value);
    //setPageAction(dispatch, 371, 1);
    if (state.catSeriesFlag == 'Series') {
      fetchDataAction(
        dispatch,
        value,
        state.selectedSearchNode,
        state.filters,
        1,
        state.limit,
      );
    } else {
      setCardRowsAction(
        dispatch,
        value,
        state.selectedSearchNode ? state.selectedSearchNode : 371,
        state.filters,
        1,
        state.limit,
      );
    }
    // setValue("");
  };

  const handleReset = () => {
    setValue('');
    clearSearchAction(dispatch);
    setCardRowsAction(
      dispatch,
      '',
      state.selectedSearchNode ? state.selectedSearchNode : 371,
      state.filters,
      1,
      state.limit,
    );
    // id is 371 if no nodes are selected . . .
    //setPageAction(dispatch, 371, 1);
  };
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Keyword Search"
        //value={props.searchTitle}
        />
        <button type="submit">Search</button>
        <button type="reset">Clear Search</button>
        <button onClick={() => {
          setValue('');
          freshStartAction(dispatch)
        }}
        >Fresh Start</button>
      </form>
    </div>
  );
}
