import React from 'react';
import { useGame } from '../../contexts/GameContext';

const GameDashboard: React.FC = () => {
    const { gameState } = useGame();

    const getPhaseColor = (phase: string) => {
        switch (phase.toLowerCase()) {
            case 'auction':
                return 'text-yellow-400';
            case 'drilling':
                return 'text-blue-400';
            case 'production':
                return 'text-green-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    King Oil
                </h1>
                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-sm text-gray-400">Round</div>
                        <div className="text-2xl font-bold text-yellow-400">
                            {gameState.round}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-400">Phase</div>
                        <div className={`text-2xl font-bold ${getPhaseColor(gameState.phase)}`}>
                            {gameState.phase}
                        </div>
                    </div>
                </div>
            </div>

            {/* Players Status Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-yellow-400">
                    Players Status
                </h2>
                <div className="grid gap-4">
                    {gameState.players.map((player) => (
                        <div
                            key={player.id}
                            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="font-semibold text-white">
                                        {player.name}
                                        {player.email && (
                                            <span className="text-gray-400 text-sm ml-2">
                                                ({player.email})
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">Funds</div>
                                        <div className="font-semibold text-green-400">
                                            ${player.funds.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">Oil</div>
                                        <div className="font-semibold text-yellow-400">
                                            {player.oilTokens} barrels
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Player Stats Bar */}
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="h-1 bg-green-900 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-400"
                                        style={{ width: `${(player.funds / 10000) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="h-1 bg-yellow-900 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400"
                                        style={{ width: `${(player.oilTokens / 100) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Game Stats Footer */}
            <div className="mt-8 grid grid-cols-3 gap-4 bg-gray-700 rounded-lg p-4">
                <div className="text-center">
                    <div className="text-sm text-gray-400">Total Investment</div>
                    <div className="text-xl font-bold text-green-400">$2.5M</div>
                </div>
                <div className="text-center border-x border-gray-600">
                    <div className="text-sm text-gray-400">Active Wells</div>
                    <div className="text-xl font-bold text-blue-400">8</div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-gray-400">Total Oil</div>
                    <div className="text-xl font-bold text-yellow-400">450 barrels</div>
                </div>
            </div>
        </div>
    );
};

export default GameDashboard;