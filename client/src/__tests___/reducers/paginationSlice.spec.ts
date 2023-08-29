import reducer, { setCurrentPage, setTotalPages, setItemsPerPage, initialPaginationState } from '../../reducers/paginationSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialPaginationState);
})

test('should not update the current page if the new page is higher than the total pages', () => {
  expect(reducer(initialPaginationState, setCurrentPage(2)).currentPage).not.toEqual(2);
})

test('should update the total pages', () => {
  expect(reducer(initialPaginationState, setTotalPages(2)).totalPages).toEqual(2);
})

test('should update the items per page', () => {
  expect(reducer(initialPaginationState, setItemsPerPage(20)).itemsPerPage).toEqual(20);
})