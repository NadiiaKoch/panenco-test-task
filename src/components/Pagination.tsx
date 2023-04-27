import React, { useState } from "react";
import { getPages } from "./helpers/getPages";
import './Pagination.css';
import { PaginationSelect } from "./PaginationSelect";
import cn from "classnames";

type Props = {
  total: number
  countPerPage: number,
  optionsPerPage: number[],
  onLoad?: (perPage: number, currentPage: number ) => void
};

export const Pagination: React.FC<Props> = React.memo(({ total, countPerPage, optionsPerPage, onLoad }) => {
  const [perPage, setPerPage] = useState<number>(countPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const firstPage = 1;
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const handleNav = (path: number) => () => {
    const nextPage = currentPage + path;
    setCurrentPage(nextPage);
    onLoad?.(perPage, nextPage);
  }

  const numberOfPages = getPages(
    firstPage,
    lastPage,
  );

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    onLoad?.(Number(event.target.value), currentPage);
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
    onLoad?.(perPage, Number(event.target.value));
  };

  return (
    <div className="pagination">
      <div className="perPage-wrapper">
        <span className="text">Items per page</span>
        <PaginationSelect options={optionsPerPage} onChange={handleChangePerPage} value={perPage} className="perPage-select" />
        <span className="text">
            Displaying {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, total)} of {total} items
        </span>
      </div>

        <div className="page-wrapper">
          <span className="page-text">
            {currentPage} of {lastPage} pages
          </span>
          <div className="page-selector-wrapper">
            <button 
              className={cn('pagination-button button-left', {
                'button-disabled': isFirstPage
              })} 
              onClick={handleNav(-1)}
            ></button>
            <PaginationSelect options={numberOfPages} onChange={handleChangePage} value={currentPage} className="page-select" />
            <button 
              className={cn('pagination-button button-right', {
                'button-disabled': isLastPage
              })} 
              onClick={handleNav(1)}
            ></button>
          </div>
        </div>
    </div>
  )
});

