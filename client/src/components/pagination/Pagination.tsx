import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../types';
import { paginationService } from './PaginationService';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

import {
  fetchDataAction,
  fetchCategoriesAction,
  setPageAction,
} from '../../redux/actions/eia/actions';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export const Pager = () => {
  //const [pager, setPager] = useState({} as any);

  const classes = useStyles();
  // const [page, setPage] = React.useState(1);
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };


  const setPagination = (
    totalCount: number,
    pageNumber: number,
    recordsPerPage: number
  ) => {
    const pData = paginationService.getPager(
      totalCount,
      pageNumber,
      recordsPerPage
    );
    return pData;
    //setPager({ ...pData });
  };
  /*
   * Fetch data from API
   * Append query params if any
   * API call with GET
   */
  const state = useSelector((state: IStore) => state.eia);
  const totalCatsRound = state.seriesCount <= state.limit ? state.categories.length : Math.ceil(state.seriesCount / 100) *
    100
  const pager = setPagination(totalCatsRound, state.page, state.limit);
  let totalRecordsPage = Math.ceil(state.seriesCount / state.limit);
  const dispatch = useDispatch();
  const handleClick = (event: ChangeEvent<unknown>, page: number): void => {

    setPageAction(dispatch, page);
    fetchCategoriesAction(
      dispatch,
      state.searchTerm,
      state.selectedSearchNode ? state.selectedSearchNode : 371,
      state.filters,
      page,
      state.limit
    );
  };


  return (
    <div>
      {state.seriesCount > 0 &&
        (<div className={classes.root}>
          <Typography>Showing {((state.page - 1) * state.limit) + 1} to{' '}
            {state.page * state.limit} of {totalCatsRound} records</Typography>
          <Pagination count={pager.totalPages} page={pager.currentPage} onChange={handleClick} />
        </div>)}
      {/* {state.seriesCount > 0 &&
        (
          <div className="table-footer d-flex justify-content-between align-items-center">
            <div className="records-count d-sm-block d-none text-secondary">
              Showing {((state.page - 1) * state.limit) + 1} to{' '}
              {state.page * state.limit} of {totalCatsRound} records
            </div>
            <nav className="pages">
              <ul className="pagination">
                <li
                  className={
                    state.page === 1 ? 'disabled page-item' : 'page-item'
                  }
                >
                  <a
                    href="#!"
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(state.page - 1);
                    }}
                  >
                    Previous
                  </a>
                </li>
                {pager.pages &&
                  pager.pages.map((page: number, index: number) => {
                    return (
                      <li
                        key={index}
                        className={
                          state.page === page
                            ? 'custom-disabled active page-item'
                            : 'page-item'
                        }
                      >
                        <a
                          className="page-link"
                          href="#!"
                          onClick={(e) => {

                            e.preventDefault();
                            handleClick(page);
                          }}
                        >
                          {page}
                        </a>
                      </li>
                    );
                  })}
                <li
                  className={
                    state.page + 1 > totalRecordsPage
                      ? 'disabled page-item'
                      : 'page-item'
                  }
                >
                  <a
                    className="page-link"
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(state.page + 1);
                    }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )} */}
    </div>
  );
};
