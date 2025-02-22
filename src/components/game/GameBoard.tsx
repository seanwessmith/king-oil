import React from 'react';

const GameBoard: React.FC = () => {
    // Placeholder data for oil leases
    const leases = Array(16).fill(null).map((_, index) => ({
        id: index,
        status: 'available', // available, owned, drilling, producing
        value: Math.floor(Math.random() * 1000) + 500,
    }));

    const getLeaseStyling = (status: string) => {
        const baseStyle = "w-full h-full rounded-lg border transition-all duration-300 p-4 flex flex-col justify-between";
        switch (status) {
            case 'owned':
                return `${baseStyle} bg-blue-900 bg-opacity-50 border-blue-500`;
            case 'drilling':
                return `${baseStyle} bg-yellow-900 bg-opacity-50 border-yellow-500`;
            case 'producing':
                return `${baseStyle} bg-green-900 bg-opacity-50 border-green-500`;
            default:
                return `${baseStyle} bg-gray-800 border-gray-600 hover:border-yellow-500 cursor-pointer`;
        }
    };

    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-xl p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    Oil Fields Map
                </h2>
                <p className="text-gray-400 mt-2">
                    Select available leases to bid on oil-rich territories
                </p>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                {leases.map(lease => (
                    <div
                        key={lease.id}
                        className="aspect-square relative"
                    >
                        <div className={getLeaseStyling(lease.status)}>
                            <div className="text-sm text-gray-400">
                                Lease #{lease.id + 1}
                            </div>
                            <div className="text-center">
                                <div className="text-yellow-400 font-semibold">
                                    ${lease.value}k
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-800 border border-gray-600 rounded"></div>
                    <span className="text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-900 border border-blue-500 rounded"></div>
                    <span className="text-gray-400">Owned</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-900 border border-yellow-500 rounded"></div>
                    <span className="text-gray-400">Drilling</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-900 border border-green-500 rounded"></div>
                    <span className="text-gray-400">Producing</span>
                </div>
            </div>

            {/* Game Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm">Available Leases</div>
                    <div className="text-2xl font-bold text-yellow-400">12</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm">Total Value</div>
                    <div className="text-2xl font-bold text-yellow-400">$12.5M</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm">Active Wells</div>
                    <div className="text-2xl font-bold text-yellow-400">4</div>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;