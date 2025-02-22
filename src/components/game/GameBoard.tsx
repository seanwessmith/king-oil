// components/game/GameBoard.tsx
import React from 'react';
// import { useGame } from '../../contexts/GameContext';
// import './GameBoard.css'; // Optional: board-specific styles

const GameBoard: React.FC = () => {
    // const { gameState } = useGame();

    // Placeholder: Render the board with oil lease blocks or other visual cues.
    return (
        <div className="game-board">
            <h2>Game Board</h2>
            <p>Map of oil leases and other game areas will be rendered here.</p>
        </div>
    );
};

export default GameBoard;