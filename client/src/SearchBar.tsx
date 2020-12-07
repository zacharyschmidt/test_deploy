import React, { useState } from 'react';
import { Store } from './Store';
import { fetchDataAction, clearSearchAction } from './Actions';

type FormElem = React.FormEvent<HTMLFormElement>;

export default function SearchBar(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  const [value, setValue] = useState<string>('');
  // const [region, setRegion]
  // const [frequency, setFrequency]
  // const [hist, setHist]
  // then add modal to input form, set state when they change, and add
  // all the filters to the fetchDataAction

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    fetchDataAction(dispatch, value, state.filters);
    // setValue("");
  };

  const handleReset = () => {
    setValue('');
    clearSearchAction(dispatch);
  };
  console.log(state);
  return (
    <div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Keyword Search"
          //value={props.searchTitle}
        />
        <button type="submit">Search</button>
        <button type="reset">Clear</button>
      </form>
    </div>
  );
}
