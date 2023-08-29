import { createSlice } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

export interface SocketState {
  socket: Socket | any,
  isConnected: boolean,
}

export const initialSocketState: SocketState = {
  socket: null,
  isConnected: false,
}

// Creating actions and recuders using the Redux Toolkit approach for the socket store
export const socketSlice = createSlice({
  name: 'socket',
  initialState: initialSocketState,
  reducers: {
    connect: (state) => {
      if (!state.isConnected) {
        const socket = io(process.env.SERVER_SOCKET || 'ws://localhost:5000');
        state.socket = socket;
        state.isConnected = true;
      }
    },
    disconnect: (state) => {
      if (state.isConnected) {
        state.socket.disconnect();
        state.socket = null;
        state.isConnected = false;
      }
    },
  }
})

export const { connect, disconnect } = socketSlice.actions;

export default socketSlice.reducer;