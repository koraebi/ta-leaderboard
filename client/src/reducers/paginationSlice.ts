import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const getPlayers = createAction<any>('players/getPlayers/fulfilled')

export interface PaginationState {
  currentPage: number,
  nextPage: number,
  previousPage: number,
  totalPages: number,
  itemsPerPage: number,
}

const initialState: PaginationState = {
  currentPage: 1,
  nextPage: 0,
  previousPage: 0,
  totalPages: 1,
  itemsPerPage: 10,
}

// Updating the nextPage and previousPage states to change the icons of the Pagination component
const updateNextPreviousPage = (state: PaginationState) => {
  if (state.currentPage + 1 <= state.totalPages) {
    state.nextPage = state.currentPage + 1;
  } else {
    state.nextPage = 0;
  }

  if (state.currentPage - 1 >= 1) {
    state.previousPage = state.currentPage - 1;
  } else {
    state.previousPage = 0;
  }
}

// Creating actions and recuders using the Redux Toolkit approach for the pagination store
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      if (newPage !== state.currentPage && newPage >= 1 && newPage <= state.totalPages) {
        state.currentPage = newPage;

        if (newPage + 1 <= state.totalPages) {
          state.nextPage = newPage + 1;
        } else {
          state.nextPage = 0;
        }

        if (newPage - 1 >= 1) {
          state.previousPage = newPage - 1;
        } else {
          state.previousPage = 0;
        }
      }
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
      updateNextPreviousPage(state);
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayers, (state, action) => {
        // Adding a callback action from the players reducer getPlayers action to update the totalPages according to the total of players
        state.totalPages = Math.ceil(action.payload.total / state.itemsPerPage);
        updateNextPreviousPage(state);
      })
  },
})

export const { setCurrentPage, setTotalPages, setItemsPerPage } = paginationSlice.actions;

export default paginationSlice.reducer;