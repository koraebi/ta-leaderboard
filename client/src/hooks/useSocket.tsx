import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Player } from '../interfaces/Player';

// Custom hook to subscribe to a socket event from a component directly to the global Socket stored in Redux
export default function useSocket(eventName: string, eventHandler: (newPlayer: Player) => void) {
  const socketIsConnected = useSelector((state: RootState) => state.socket.isConnected);
  const socket = useSelector((state: RootState) => state.socket.socket);

  useEffect(() => {
    if (socketIsConnected) {
      console.log('SocketIO: adding listener', eventName);
      socket.on(eventName, eventHandler);
    }

		return () => {
      if (socketIsConnected) {
        console.log('SocketIO: removing listener', eventName);
        socket.off(eventName, eventHandler);
      }
		};
	}, [socketIsConnected]);
}