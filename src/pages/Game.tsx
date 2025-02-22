// pages/Game.tsx
import React from 'react';
import { useGame } from '../contexts/GameContext';
import GameDashboard from '../components/game/GameDashboard';
import GameBoard from '../components/game/GameBoard';
import AuctionInterface from '../components/game/AuctionInterface';
import DrillingInterface from '../components/game/DrillingInterface';
import MarketInterface from '../components/game/MarketInterface';
// import './Game.css'; // Optional: game-specific styles

const Game: React.FC = () => {
    const { gameState } = useGame();

    // Render different interfaces based on the current game phase.
    const renderPhaseComponent = () => {
        switch (gameState.phase) {
            case 'auction':
                return <AuctionInterface />;
            case 'drilling':
                return <DrillingInterface />;
            case 'production':
                return <MarketInterface />;
            default:
                return <div>Waiting for the next phase...</div>;
        }
    };

    return (
        <div className="game-page">
            <GameDashboard />
            <GameBoard />
            {renderPhaseComponent()}
        </div>
    );
};

export default Game;