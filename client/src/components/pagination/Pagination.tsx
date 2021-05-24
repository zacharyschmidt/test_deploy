import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../types';
import { paginationService } from './PaginationService';

import {
  fetchDataAction,
  fetchCategoriesAction,
  setPageAction,
} from '../../redux/actions/eia/actions';

export const Pagination = () => {
  //const [pager, setPager] = useState({} as any);

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
  const pager = setPagination(state.seriesCount, state.page, state.limit);
  let totalRecordsPage = Math.ceil(state.seriesCount / state.limit);
  const dispatch = useDispatch();
  const handleClick = (page: number): void => {
    setPageAction(dispatch, page);
    fetchCategoriesAction(
      dispatch,
      state.searchTerm,
      state.selectedSearchNode ? state.selectedSearchNode : 371,
      state.filters,
      state.page,
      state.limit
    );
  };

  return (
    <div>
      {state.seriesCount > 0 && 
      (
        <div className="table-footer d-flex justify-content-between align-items-center">
          <div className="records-count d-sm-block d-none text-secondary">
            Showing {(state.page - 1) * state.limit} to{' '}
            {state.page * state.limit} of {state.seriesCount} records
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
      )}
    </div>
  );
};
