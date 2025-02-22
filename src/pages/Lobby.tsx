// pages/Lobby.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useGame, GamePlayer } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
// import './Lobby.css'; // Optional: import lobby-specific styles

const Lobby: React.FC = () => {
    const { user } = useAuth();
    const { startGame } = useGame();
    const { socket } = useSocket();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<GamePlayer[]>([]);

    useEffect(() => {
        if (!socket) return;

        // Listen for new players joining the lobby.
        socket.on('playerJoined', (player: GamePlayer) => {
            setPlayers((prevPlayers) => [...prevPlayers, player]);
        });

        // Request the current list of players from the server.
        socket.emit('getPlayers', (currentPlayers: GamePlayer[]) => {
            setPlayers(currentPlayers);
        });

        // Clean up the event listener when the component unmounts.
        return () => {
            socket.off('playerJoined');
        };
    }, [socket]);

    const handleStartGame = () => {
        // Ensure there are at least two players before starting.
        if (players.length < 2) return;
        // Start the game using our GameContext.
        startGame(players);
        navigate('/game');
    };

    return (
        <div className="lobby-container">
            <h1>Game Lobby</h1>
            <p>Welcome, {user?.email}!</p>

            <div className="players-list">
                <h2>Players in Lobby:</h2>
                {players.length > 0 ? (
                    <ul>
                        {players.map((player) => (
                            <li key={player.id}>
                                {player.name || player.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No players have joined yet.</p>
                )}
            </div>

            <button
                onClick={handleStartGame}
                disabled={players.length < 2}
            >
                Start Game
            </button>

            <div className="lobby-chat">
                {/* Placeholder for a future chat component */}
                <p>Chat feature coming soon!</p>
            </div>

            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default Lobby;