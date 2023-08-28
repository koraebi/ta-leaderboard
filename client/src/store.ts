import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import paginationReducer from './reducers/paginationSlice';
import playersReducer from './reducers/playersSlice';
import socketReducer from './reducers/socketSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    players: playersReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed to avoid errors from the socket state
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
