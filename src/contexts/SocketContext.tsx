// contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SocketContextType {
    socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Initialize the socket connection using an environment variable or a default URL.
        const newSocket = io(import.meta.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
            // You can add extra options here if needed.
            transports: ['websocket'],
        });
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts.
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};