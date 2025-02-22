// components/game/MarketInterface.tsx
import React from 'react';
// import './MarketInterface.css'; // Optional: market-specific styles

const MarketInterface: React.FC = () => {
    // Placeholder: You might want to calculate or fetch the current oil price.
    const currentOilPrice = 70; // Example static price

    const handleSell = () => {
        // Insert logic for selling oil (e.g., update player funds, update game state)
        console.log('Sell oil button clicked');
    };

    return (
        <div className="market-interface">
            <h2>Market Phase</h2>
            <p>Current Oil Price: ${currentOilPrice}</p>
            <button onClick={handleSell}>Sell Oil</button>
        </div>
    );
};

export default MarketInterface;