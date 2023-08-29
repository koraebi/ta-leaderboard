import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Leaderboard from '../Leaderboard/Leaderboard';
import Pagination from '../Pagination/Pagination';
import { connect, disconnect } from '../../reducers/socketSlice';

export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(connect()); // We connect to the web socket only once the main application opened

    return () => {
			dispatch(disconnect()); // We diconnect the web socket when main application closed
		};
  }, []);

  return (
    <div className="App">
      <h1>LEADERBOARD</h1>
      <Leaderboard/>
      <Pagination/>
    </div>
  );
}