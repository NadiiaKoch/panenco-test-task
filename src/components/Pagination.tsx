import React, { useEffect, useState } from "react";
import { getPages } from "./helpers/getPages";
import { getData } from "../API/loadData";
import './Pagination.css';
import { PaginationSelect } from "./PaginationSelect";
import cn from "classnames";

type Props = {
  setData: any,
  path: string,
  countPerPage: number,
  optionsPerPage: number[],
};

export const Pagination: React.FC<Props> = React.memo(({ setData, path, countPerPage, optionsPerPage }) => {
  const [perPage, setPerPage] = useState<number>(countPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const firstPage = 1;
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const loadData = async () => {
    try {
      const generalData = await getData( path, currentPage, perPage);

      setData(generalData.data);
      setTotal(generalData.meta.total_count);
    } catch(err) {
      console.error(err);
    } 
  };

  useEffect(() => {
    loadData();
  }, [currentPage, perPage]);


  const numberOfPages = getPages(
    firstPage,
    lastPage,
  );

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
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
              onClick={(e) => setCurrentPage((page) => page -1)}
            ></button>
            <PaginationSelect options={numberOfPages} onChange={handleChangePage} value={currentPage} className="page-select" />
            <button 
              className={cn('pagination-button button-right', {
                'button-disabled': isLastPage
              })} 
              onClick={(e) => setCurrentPage((page) => page + 1)}
            ></button>
          </div>
        </div>
    </div>
  )
});

