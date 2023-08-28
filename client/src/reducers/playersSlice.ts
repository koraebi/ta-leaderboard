import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Player } from '../interfaces/Player';

// Creating an async Thunk to fetch the players from the server and update the players states in the store directly
export const getPlayers = createAsyncThunk(
  'players/getPlayers',
  async ({ page, limit }: { page: number, limit: number}) => {
    const response: any = await fetch(`/players?page=${page}&limit=${limit}`);
    let results: any;
    if (response.status === 200) {
      results = await response.json();
    }
    return results;
  }
)

export interface PlayersState {
  totalPlayers: number,
  displayedPlayers: Player[],
}

const initialState: PlayersState = {
  totalPlayers: 0,
  displayedPlayers: [],
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setTotalPlayers: (state, action: PayloadAction<number>) => {
      state.totalPlayers = action.payload;
    },
    setDisplayedPlayers: (state, action: PayloadAction<Player[]>) => {
      state.displayedPlayers = action.payload;
    },
    updatePlayer: (state, action: PayloadAction<any>) => {
      const newPlayer = action.payload.newPlayer;
      const startIndex = (action.payload.currentPage - 1) * action.payload.itemsPerPage;
      state.displayedPlayers.forEach((player) => {
        if (player.username === newPlayer.username) {
          const updatedPlayers = state.displayedPlayers.map(player => player.username === newPlayer.username ? { ...player, ...newPlayer } : player);
          if (player.rank !== newPlayer.rank) {
            updatedPlayers.sort(function(a, b) { return b.score - a.score });
            updatedPlayers.forEach((player, index) => {
              player.rank = index + startIndex + 1; // Adding ranks dynamically to reorder the leader board
            });
          }
          state.displayedPlayers = updatedPlayers;
          return;
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      // Callback action when the fetch of the players from the server fulfilled
      const response = action.payload;
      if (response.players) {
        state.displayedPlayers = response.players;
      }
      if (response.total) {
        state.totalPlayers = response.total;
      }
    })
  },
})

export const { setTotalPlayers, setDisplayedPlayers, updatePlayer } = playersSlice.actions;

export default playersSlice.reducer;