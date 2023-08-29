import React from 'react';
import type { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../hooks/usePagination';
import { setItemsPerPage } from '../../reducers/paginationSlice';
import MUIGrid from '@mui/material/Grid';
import MUIPagination from '@mui/material/Pagination';
import MUIPaginationItem from '@mui/material/PaginationItem';
import MUIArrowBackIcon from '@mui/icons-material/ArrowBack';
import MUIArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MUICloseIcon from '@mui/icons-material/Close';
import MUIFormControl from '@mui/material/FormControl';
import MUISelect from '@mui/material/Select';
import MUIMenuItem from '@mui/material/MenuItem';
import MUIInputLabel from '@mui/material/InputLabel';
import './Pagination.css';

export default function Pagination() {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector((state: RootState) => state.pagination.itemsPerPage);
  const totalPlayers = useSelector((state: RootState) => state.players.totalPlayers);
  const { currentPage, totalPages, nextPage, previousPage, setCurrentPage } = usePagination();

  const onChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const onChangeItemsPerPage = (event: any) => {
    dispatch(setItemsPerPage(event.target.value));
  };

  return (
    <div className="Pagination">
      <MUIGrid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <MUIGrid item xs={2}>
          <MUIFormControl sx={{ minWidth: 120 }}>
            <MUIInputLabel id="itemsPerPage-label">Players per page</MUIInputLabel>
            <MUISelect
              id="itemsPerPage"
              labelId="itemsPerPage-label"
              value={itemsPerPage}
              label="Players per page"
              onChange={onChangeItemsPerPage}
            >
              {[10, 15, 20, 25].map((value) => (
                <MUIMenuItem key={value} value={value}>
                <em>{value}</em>
              </MUIMenuItem>
              ))}
            </MUISelect>
          </MUIFormControl>
        </MUIGrid>
        <MUIGrid item >
          <MUIPagination
            count={totalPages}
            defaultPage={1}
            page={currentPage}
            onChange={onChangePage}
            renderItem={(item: any) => (
              <MUIPaginationItem
                slots={{ 
                  previous: previousPage === 0 ? MUICloseIcon : MUIArrowBackIcon, 
                  next: nextPage === 0 ? MUICloseIcon : MUIArrowForwardIcon 
                }}
                {...item}
              />
            )}
          />
        </MUIGrid>
        <MUIGrid item xs={2}>
          <p>Total Players: <b>{totalPlayers}</b></p>
        </MUIGrid>
      </MUIGrid>
    </div>
  )
}