import React, { useState } from 'react';

const DrillingInterface: React.FC = () => {
    const [investment, setInvestment] = useState<number>(0);

    const handleDrill = () => {
        console.log(`Drilling with an investment of: ${investment}`);
    };

    // Calculate success probability based on investment
    const calculateProbability = (amount: number): number => {
        // Example: 50% base probability + up to 40% based on investment
        const probability = 50 + (amount / 10000) * 40;
        return Math.min(90, Math.max(50, probability)); // Cap between 50% and 90%
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6 max-w-md mx-auto">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                        Drilling Phase
                    </h2>
                    <div className="mt-2 text-gray-400">
                        Invest in your drilling operation
                    </div>
                </div>

                {/* Investment Input Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">$</span>
                        </div>
                        <input
                            type="number"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                            placeholder="Investment amount"
                            min="1000"
                            step="1000"
                            className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                     focus:ring-2 focus:ring-yellow-500 focus:border-transparent 
                                     outline-none transition-all duration-200 
                                     text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Success Probability Meter */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Success Probability:</span>
                            <span>{calculateProbability(investment)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
                                style={{ width: `${calculateProbability(investment)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Current Investment:</span>
                            <span className="text-yellow-400 font-semibold">
                                ${investment.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Minimum Required:</span>
                            <span className="text-gray-300">$1,000</span>
                        </div>
                    </div>
                </div>

                {/* Drill Button */}
                <button
                    onClick={handleDrill}
                    disabled={investment < 1000}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 
                             rounded-lg font-semibold text-lg shadow-lg 
                             hover:from-blue-600 hover:to-blue-700 
                             transform hover:scale-105 transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Start Drilling
                </button>

                {/* Investment Tips */}
                <div className="text-sm text-gray-400 text-center space-y-1">
                    <p>Higher investment increases success probability</p>
                    <p>Minimum investment: $1,000</p>
                    <p>Recommended: $5,000 - $20,000</p>
                </div>
            </div>
        </div>
    );
};

export default DrillingInterface;