// components/game/GameDashboard.tsx
import React from 'react';
import { useGame } from '../../contexts/GameContext';
// import './GameDashboard.css'; // Optional: dashboard-specific styles

const GameDashboard: React.FC = () => {
    const { gameState } = useGame();

    return (
        <div className="game-dashboard">
            <h1>King Oil</h1>
            <p>Round: {gameState.round}</p>
            <p>Phase: {gameState.phase}</p>
            <div className="players-status">
                <h2>Players:</h2>
                <ul>
                    {gameState.players.map((player) => (
                        <li key={player.id}>
                            {player.name} {player.email && `(${player.email})`} - Funds: {player.funds} - Oil: {player.oilTokens}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GameDashboard;