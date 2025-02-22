import React, { useState } from 'react';

const AuctionInterface: React.FC = () => {
    const [bid, setBid] = useState<number>(0);

    const handleBidSubmit = () => {
        console.log(`Bid submitted: ${bid}`);
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6 max-w-md mx-auto">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                        Auction Phase
                    </h2>
                    <div className="mt-2 text-gray-400">
                        Place your bid for the oil field
                    </div>
                </div>

                {/* Bid Input Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">$</span>
                        </div>
                        <input
                            type="number"
                            value={bid}
                            onChange={(e) => setBid(Number(e.target.value))}
                            placeholder="Enter your bid"
                            min="0"
                            step="100"
                            className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                     focus:ring-2 focus:ring-yellow-500 focus:border-transparent 
                                     outline-none transition-all duration-200 
                                     text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Current Bid Display */}
                    <div className="text-center">
                        <div className="text-sm text-gray-400">Current Bid:</div>
                        <div className="text-2xl font-bold text-yellow-400">
                            ${bid.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleBidSubmit}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 
                             rounded-lg font-semibold text-lg shadow-lg 
                             hover:from-yellow-600 hover:to-orange-600 
                             transform hover:scale-105 transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={bid <= 0}
                >
                    Submit Bid
                </button>

                {/* Bid Rules/Info */}
                <div className="text-sm text-gray-400 text-center">
                    <p>Minimum bid increment: $100</p>
                    <p>No decimal values allowed</p>
                </div>
            </div>
        </div>
    );
};

export default AuctionInterface;