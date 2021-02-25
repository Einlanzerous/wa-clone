import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = React.createContext(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:5000', { query: { id } });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
