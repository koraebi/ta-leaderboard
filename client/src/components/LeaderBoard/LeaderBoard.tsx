import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePagination from '../../hooks/usePagination';
import useSocket from '../../hooks/useSocket';
import { useAppDispatch } from '../../store';
import type { RootState } from '../../store';
import type { Player } from '../../interfaces/Player';
import { getPlayers, updatePlayer } from '../../reducers/playersSlice';
import MUIListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import MUITable from '@mui/material/Table';
import MUITableBody from '@mui/material/TableBody';
import MUITableCell, { tableCellClasses } from '@mui/material/TableCell';
import MUITableContainer from '@mui/material/TableContainer';
import MUITableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';
import MUIPaper from '@mui/material/Paper';
import MUIListItemText from '@mui/material/ListItemText';
import MUIListItemAvatar from '@mui/material/ListItemAvatar';
import MUIAvatar from '@mui/material/Avatar';

interface Column {
  id: 'rank' | 'username' | 'score';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'rank',
    label: 'RANK',
    minWidth: 50,
  },
  {
    id: 'username',
    label: 'PLAYER',
    minWidth: 200,
  },
  {
    id: 'score',
    label: 'SCORE',
    minWidth: 50,
  },
];

const StyledTableCell = styled(MUITableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(MUITableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Leaderboard() {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const displayedPlayers = useSelector((state: RootState) => state.players.displayedPlayers); // Selecting the players to display from the Redux store
  const { currentPage, itemsPerPage } = usePagination(); // Custom hook to access the pagination's states

  // Custom hook to subscribe to the scoreUpdate event of the global socket in the Redux store 
  useSocket('playerUpdate', (newPlayer: Player) => {
    dispatch(updatePlayer({ newPlayer, currentPage, itemsPerPage }));
  });

  useEffect(() => {
    getDisplayablePlayers(); // We fetch the displayed players everytime the currentPage changes or when the user changes the items per page to avoid storing all the players in memory
  }, [currentPage, itemsPerPage]);

  const getDisplayablePlayers = async () => {
    await appDispatch(getPlayers({ page: currentPage, limit: itemsPerPage})).unwrap(); // We use an appDispatcher to benefit from the RTK's createAsyncThunk
  }
  
  return (
    <div className="Leaderboard">
      <MUITableContainer component={MUIPaper}>
        <MUITable sx={{ minWidth: 700 }} aria-label="customized table">
          <MUITableHead>
            <MUITableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align="center">{column.label}</StyledTableCell>
              ))}
            </MUITableRow>
          </MUITableHead>
          <MUITableBody>
            {displayedPlayers.map((player) => (
              <StyledTableRow key={player.username}>
                <StyledTableCell align="center" component="th" scope="row">
                  {player.rank}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <MUIListItem>
                    <MUIListItemAvatar>
                      <MUIAvatar
                        alt={player.username}
                        src={player.picture}
                      />
                    </MUIListItemAvatar>
                    <MUIListItemText id={player.username} primary={player.username}/>
                  </MUIListItem>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {player.score}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </MUITableBody>
        </MUITable>
      </MUITableContainer>
    </div>
  )
}