import { useContext } from 'react';
import { GameContext, GameContextType } from '../contexts/GameContext';

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};