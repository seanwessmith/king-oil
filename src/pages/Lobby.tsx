import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useGame, GamePlayer } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';

const Lobby: React.FC = () => {
    const { user } = useAuth();
    const { startGame } = useGame();
    const { socket } = useSocket();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<GamePlayer[]>([]);

    useEffect(() => {
        if (!socket) return;

        socket.on('playerJoined', (player: GamePlayer) => {
            setPlayers((prevPlayers) => [...prevPlayers, player]);
        });

        socket.emit('getPlayers', (currentPlayers: GamePlayer[]) => {
            setPlayers(currentPlayers);
        });

        return () => {
            socket.off('playerJoined');
        };
    }, [socket]);

    const handleStartGame = () => {
        if (players.length < 2) return;
        startGame(players);
        navigate('/game');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                        Game Lobby
                    </h1>
                    <p className="text-xl text-gray-300">
                        Welcome, <span className="text-yellow-400">{user?.email}</span>!
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Players List Section */}
                    <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                            Players in Lobby
                        </h2>
                        {players.length > 0 ? (
                            <ul className="space-y-3">
                                {players.map((player) => (
                                    <li
                                        key={player.id}
                                        className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3 transition-transform hover:transform hover:translate-x-2"
                                    >
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span>{player.name || player.email}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">
                                No players have joined yet.
                            </p>
                        )}
                    </div>

                    {/* Chat Section */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                            Lobby Chat
                        </h2>
                        <div className="h-64 flex items-center justify-center text-gray-400 italic">
                            Chat feature coming soon!
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                    <Link
                        to="/"
                        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    >
                        ← Back to Home
                    </Link>

                    <button
                        onClick={handleStartGame}
                        disabled={players.length < 2}
                        className={`px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-200
                            ${players.length < 2
                                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:scale-105'
                            }`}
                    >
                        {players.length < 2 ? 'Waiting for Players...' : 'Start Game'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lobby;