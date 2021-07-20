import React from 'react';
import { Grid } from '@material-ui/core';

import CatCard from './CatCard';
import { Pager } from './components/pagination/Pagination';
import { ISeries, ICategories, IStore } from './types';
import { fetchParentCatsAction } from './redux/actions/eia/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function SeriesList(props: any): JSX.Element {

  const { categories, toggleSelectAction, selected, name, id } = props;


  // const { state, dispatch } = store;
  const state = useSelector((state: IStore) => state.eia);
  const dispatch = useDispatch()

  // change to render categories
  let mapped_cats = categories.map((singleCat: ICategories) => {
    return (
      <Grid item key={singleCat.category_id}>
        <CatCard

          toggle={() => toggleSelectAction(state, dispatch, singleCat)}
          singleCat={singleCat}
          selected={selected}
          dispatch={dispatch}
          fetchParentCats={fetchParentCatsAction}
          filters={state.filters}
        />
      </Grid>
    );
  });

  return (
    <Grid container direction="column">
      <Grid item><h2><strong>{name}</strong></h2></Grid>
      {mapped_cats.length === 0 ? <div className="alert-format">No Categories Found!</div> :
        <div><Grid container direction="row" spacing={1} >
          {mapped_cats}
        </Grid>
          <Grid item>
            <Pager id={id} />
          </Grid></div>
      }
    </Grid>)
}
