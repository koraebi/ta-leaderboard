import { Player } from '../../interfaces/Player';
import reducer, { setTotalPlayers, setDisplayedPlayers, updatePlayer, initialPlayersState } from '../../reducers/playersSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialPlayersState);
})

test('should not update the current page if the new page is higher than the total pages', () => {
  expect(reducer(initialPlayersState, setTotalPlayers(10)).totalPlayers).toEqual(10);
})

test('should update the total pages', () => {
  expect(reducer(initialPlayersState, setDisplayedPlayers([
    { 
      username: 'test',
      picture: 'test',
      score: 1000,
      rank: 1,
    }
  ])).displayedPlayers).toHaveLength(1);
})

test('should update the items per page', () => {
  const player: Player = { 
    username: 'test',
    picture: 'test',
    score: 1000,
    rank: 1,
  };

  const previousState = {
    totalPlayers: 0,
    displayedPlayers: [player],
  }

  expect(reducer(previousState, updatePlayer({ newPlayer: { ...player, score: 2000 }, itemsPerPage: 1 })).displayedPlayers[0].score).toEqual(2000);
})