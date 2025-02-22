// contexts/GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define possible game phases.
export type GamePhase = 'setup' | 'auction' | 'drilling' | 'production' | 'end';

// Define an interface for a game player.
export interface GamePlayer {
    id: string;
    name: string;
    email?: string; // <-- Added optional email property
    funds: number;
    oilTokens: number;
    leasesOwned: string[];
    currentBid?: number;
}

// Define the overall game state.
export interface GameState {
    phase: GamePhase;
    round: number;
    players: GamePlayer[];
    // You can extend this with additional properties, such as auction details, leases, or market info.
}

// Define the context type with state and helper functions.
export interface GameContextType {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    startGame: (players: GamePlayer[]) => void;
    updatePhase: (phase: GamePhase) => void;
    updatePlayer: (player: GamePlayer) => void;
}

// Create the context.
export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    // Initialize the game state.
    const [gameState, setGameState] = useState<GameState>({
        phase: 'setup',
        round: 1,
        players: [],
    });

    // Function to start the game with the given players.
    const startGame = (players: GamePlayer[]) => {
        setGameState({
            phase: 'auction', // Or whichever phase your game should start with.
            round: 1,
            players,
        });
    };

    // Function to update the current game phase.
    const updatePhase = (phase: GamePhase) => {
        setGameState((prevState) => ({
            ...prevState,
            phase,
        }));
    };

    // Function to update an individual player's data.
    const updatePlayer = (player: GamePlayer) => {
        setGameState((prevState) => ({
            ...prevState,
            players: prevState.players.map((p) =>
                p.id === player.id ? player : p
            ),
        }));
    };

    const value: GameContextType = {
        gameState,
        setGameState,
        startGame,
        updatePhase,
        updatePlayer,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Custom hook to use the GameContext.
export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};