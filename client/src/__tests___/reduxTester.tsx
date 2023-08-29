import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import { playersSlice, initialPlayersState } from '../reducers/playersSlice';
import { paginationSlice, initialPaginationState } from '../reducers/paginationSlice';
import { socketSlice, initialSocketState } from '../reducers/socketSlice';

export function renderWithProviders(
  ui: any,
  {
    preloadedState = {
      players: initialPlayersState,
      pagination: initialPaginationState,
      socket: initialSocketState,
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { 
        players: playersSlice.reducer,
        pagination: paginationSlice.reducer,
        socket: socketSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: any }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}