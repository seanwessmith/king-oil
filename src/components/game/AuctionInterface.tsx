// components/game/AuctionInterface.tsx
import React, { useState } from 'react';
// import { useGame } from '../../contexts/GameContext';
// import './AuctionInterface.css'; // Optional: auction-specific styles

const AuctionInterface: React.FC = () => {
    const [bid, setBid] = useState<number>(0);
    // const { updatePhase } = useGame(); // You might update the phase after bidding

    const handleBidSubmit = () => {
        // Insert logic to handle bid submission (e.g., emit a socket event, update game state)
        console.log(`Bid submitted: ${bid}`);
        // Optionally, update phase or trigger other actions after a bid.
    };

    return (
        <div className="auction-interface">
            <h2>Auction Phase</h2>
            <input
                type="number"
                value={bid}
                onChange={(e) => setBid(Number(e.target.value))}
                placeholder="Enter your bid"
            />
            <button onClick={handleBidSubmit}>Submit Bid</button>
        </div>
    );
};

export default AuctionInterface;