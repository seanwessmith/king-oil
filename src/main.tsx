// index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { SocketProvider } from './contexts/SocketContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <GameProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </GameProvider>
    </AuthProvider>
  </StrictMode>,
);