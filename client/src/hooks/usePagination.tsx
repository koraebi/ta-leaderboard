import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setCurrentPage } from '../reducers/paginationSlice';

// Custom hook returning all the states related to the pagination
export default function usePagination() {
  const dispatch = useDispatch(); 
  
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const totalPages = useSelector((state: RootState) => state.pagination.totalPages);
  const nextPage = useSelector((state: RootState) => state.pagination.nextPage);
  const previousPage = useSelector((state: RootState) => state.pagination.previousPage);
  const itemsPerPage = useSelector((state: RootState) => state.pagination.itemsPerPage);

  // callback hook to update the currentPage state without recreating the function on rerenders
  const setCurrentPageCallback = useCallback((page: number) => dispatch(setCurrentPage(page)), [dispatch]);

  return {
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    itemsPerPage,
    setCurrentPage: setCurrentPageCallback,
  }
}