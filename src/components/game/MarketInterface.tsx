import React, { useState } from 'react';

const MarketInterface: React.FC = () => {
    const currentOilPrice = 70;
    const [sellAmount, setSellAmount] = useState<number>(0);
    const availableOil = 100; // Example value

    // Example price history for the chart
    const priceHistory = [65, 68, 72, 69, 70];

    const handleSell = () => {
        console.log('Sell oil button clicked');
    };

    const calculateValue = (amount: number) => {
        return amount * currentOilPrice;
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl p-6 max-w-md mx-auto">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                        Market Phase
                    </h2>
                    <div className="mt-2 text-gray-400">
                        Trade your oil at current market prices
                    </div>
                </div>

                {/* Current Price Display */}
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                    <div className="text-sm text-gray-400">Current Oil Price</div>
                    <div className="text-4xl font-bold text-yellow-400 mt-2">
                        ${currentOilPrice}
                    </div>
                    <div className="text-sm text-green-400 mt-1">
                        +2.5% from last round
                    </div>
                </div>

                {/* Price History */}
                <div className="space-y-2">
                    <div className="text-sm text-gray-400">Price Trend</div>
                    <div className="h-12 flex items-end justify-between gap-1">
                        {priceHistory.map((price, index) => (
                            <div
                                key={index}
                                className="w-full bg-yellow-500 bg-opacity-25 rounded-t"
                                style={{
                                    height: `${(price / Math.max(...priceHistory)) * 100}%`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Sell Controls */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Amount to Sell
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={sellAmount}
                                onChange={(e) => setSellAmount(Number(e.target.value))}
                                max={availableOil}
                                min={0}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg 
                                         focus:ring-2 focus:ring-yellow-500 focus:border-transparent 
                                         outline-none transition-all duration-200 
                                         text-white placeholder-gray-400"
                                placeholder="Enter amount of oil to sell"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                barrels
                            </div>
                        </div>
                    </div>

                    {/* Transaction Preview */}
                    <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Available Oil:</span>
                            <span className="text-yellow-400">{availableOil} barrels</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Sale Value:</span>
                            <span className="text-green-400">
                                ${calculateValue(sellAmount).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Sell Button */}
                    <button
                        onClick={handleSell}
                        disabled={sellAmount <= 0 || sellAmount > availableOil}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 
                                 rounded-lg font-semibold text-lg shadow-lg 
                                 hover:from-green-600 hover:to-green-700 
                                 transform hover:scale-105 transition-all duration-200
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sell Oil
                    </button>
                </div>

                {/* Market Tips */}
                <div className="text-sm text-gray-400 text-center space-y-1">
                    <p>Prices update every round</p>
                    <p>Market closes at the end of the phase</p>
                </div>
            </div>
        </div>
    );
};

export default MarketInterface;