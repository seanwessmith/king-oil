// components/game/DrillingInterface.tsx
import React, { useState } from 'react';
// import { useGame } from '../../contexts/GameContext';
// import './DrillingInterface.css'; // Optional: drilling-specific styles

const DrillingInterface: React.FC = () => {
    const [investment, setInvestment] = useState<number>(0);

    const handleDrill = () => {
        // Insert drilling logic here (e.g., calculate success probability, update game state)
        console.log(`Drilling with an investment of: ${investment}`);
        // Optionally update the game phase after drilling.
    };

    return (
        <div className="drilling-interface">
            <h2>Drilling Phase</h2>
            <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                placeholder="Investment amount"
            />
            <button onClick={handleDrill}>Drill</button>
        </div>
    );
};

export default DrillingInterface;