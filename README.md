# King Oil: Web-Based Game Design Outline

This document outlines the design for a web-based version of the 1974 board game **King Oil**. It covers game mechanics, data structures, UI/UX components, and backend architecture.

---

## 1. Overview and Objectives

### Game Objective
Become the wealthiest player by acquiring oil leases, bidding aggressively, investing wisely in drilling operations, and capitalizing on market fluctuations.

### Core Gameplay Elements
- **Bidding/Auction:** Players bid on oil leases.
- **Drilling:** Investment decisions determine drilling success using chance elements.
- **Production & Market:** Successful drilling produces oil tokens; oil prices fluctuate, affecting revenue.
- **Resource Management:** Balancing cash reserves, investments, and risk is key.

### Game End
The game concludes after a set number of rounds or once all leases are drilled. The winner is the player with the highest net worth (cash plus asset values).

---

## 2. Game Phases & Flow

### A. Game Setup

#### Player Setup
- Define the number of players (support for both single-player vs. AI and multiplayer modes).
- Assign initial funds to each player.
- Randomize or set the player order.

#### Board Initialization
- Create a game board representing an oil field divided into multiple lease blocks.
- Initialize each lease block with hidden oil potential values.

### B. Bidding Phase (Auction)

#### Lease Selection
- Determine which oil lease(s) are available for auction.

#### Bidding Mechanics
- Players submit bids in either a turn-based or simultaneous auction format.
- Enforce bidding rules (e.g., minimum bid increments, bid limits based on available funds).
- The highest bidder wins the lease, with their funds earmarked or immediately deducted.

### C. Drilling Phase

#### Investment Decision
- The winning bidder chooses how much money to invest in drilling the lease.

#### Random Outcome Calculation
- Implement a chance mechanism (e.g., dice roll simulation or card draw) where the investment level influences the probability of success.

#### Outcomes
- **Success:** Yields a certain number of oil tokens or barrels.
- **Failure:** May result in a “dry well” with no yield.

#### Feedback
- Display visual and/or audio cues to communicate the drilling result.

### D. Production & Market Phase

#### Oil Production
- If drilling is successful, add oil tokens (or barrels) to the player’s assets.

#### Market Dynamics
- Implement an algorithm to fluctuate the oil price over time (e.g., random percentage changes, supply/demand simulations, or pre-set scenarios).

#### Sales Opportunity
- Allow players to sell their oil tokens immediately after production or during a dedicated market phase.
- Calculate revenue based on current market prices.

### E. End of Game

#### Game Termination Conditions
- Reaching a set number of rounds.
- Drilling all available leases.

#### Final Scoring
- Sum each player’s remaining cash, the market value of unsold oil tokens, and any residual value from leases.
- The player with the highest net worth is declared the winner.

---

## 3. Data Structures and Entities

### A. Player Object
```json
{
  "id": "string",
  "name": "string",
  "funds": "number",
  "oilTokens": "number",
  "leasesOwned": ["leaseId"],
  "currentBid": "number"
}

B. Oil Lease Object

{
  "id": "string",
  "location": { "x": "number", "y": "number" },
  "baseCost": "number",
  "drilled": "boolean",
  "hiddenPotential": "number", 
  "currentInvestment": "number", 
  "ownerId": "string | null"
}

C. Auction Object

{
  "leaseId": "string",
  "highestBid": "number",
  "highestBidderId": "string | null",
  "bidHistory": [
    { "bidderId": "string", "bidAmount": "number" }
  ]
  
}

D. Drilling Outcome Object

{
  "leaseId": "string",
  "investment": "number",
  "success": "boolean",
  "oilYield": "number", 
  "rollResult": "number" 
}

E. Oil Market Object

{
  "currentPrice": "number",
  "priceHistory": [
    { "round": "number", "price": "number" }
  ]
  
}

4. User Interface (UI) and User Experience (UX)

A. Main Game Dashboard
	•	Overview Panel: Displays current oil market price, round number, and global announcements (e.g., phase changes).
	•	Player Stats: List of players with current funds, oil tokens, and owned leases.
	•	Action Panel: Buttons for bidding, drilling, and selling oil (depending on the game phase).

B. Auction Interface
	•	Lease Display: Visual representation of the lease up for auction.
	•	Bidding Input: Input field for entering bids, current highest bid display, and bid history log.
	•	Timer/Phase Indicator: If using timed auctions, show remaining time.

C. Drilling Interface
	•	Investment Slider/Input: Allow players to choose their investment amount.
	•	Outcome Animation: Visual representation of the drilling process (e.g., drilling rig animation, dice roll).
	•	Result Display: Clear notification of success or failure and the resulting oil yield.

D. Oil Market & Sales Interface
	•	Market Price Display: Real-time graph or indicator showing price trends.
	•	Sell Options: Interface for players to select how much oil to sell.
	•	Transaction History: Record of past sales and revenue generated.

E. Game Board
	•	Visual Map: Interactive board showing all lease blocks.
	•	Lease Status Indicators: Visual markers for available, auctioned, drilled, or owned leases.
	•	Tooltips/Info Pop-ups: Provide details when hovering or clicking on a lease block.

F. Multiplayer Features (if applicable)
	•	Lobby/Matchmaking: Create or join games.
	•	Chat Functionality: Real-time messaging for player interaction.
	•	Turn Indicators: Clear prompts showing whose turn it is during each phase.

5. Backend Architecture and Implementation

A. Server-Side Game Engine
	•	Core Responsibilities:
	•	Manage game state (current phase, player data, lease statuses, oil market price).
	•	Validate actions (bids, investments, sales) to prevent cheating.
	•	Generate random outcomes for drilling on the server side to ensure fairness.
	•	Real-Time Communication:
	•	Use WebSockets (e.g., with Socket.IO) to push game state updates to all connected clients.

B. API Endpoints
	•	Examples:
	•	POST /game/start – Initialize a new game session.
	•	POST /auction/bid – Submit a bid.
	•	POST /drilling/invest – Submit drilling investment.
	•	POST /market/sell – Execute oil sale.
	•	GET /game/state – Retrieve current game state (for reconnects or spectators).

C. Data Persistence
	•	Database: Use a relational (e.g., PostgreSQL) or NoSQL (e.g., MongoDB) database to store ongoing game sessions, player profiles, and game history.
	•	Session Management: Ensure that game sessions can be saved and resumed.

6. Game Mechanics & Business Logic

A. Bidding Rules
	•	Bid Increments: Define a minimum increment for successive bids.
	•	Bid Validation: Check that the player has sufficient funds for the bid.
	•	Auction Closure: Determine when an auction ends (e.g., after a timer runs out or when no higher bid is received).

B. Drilling Probability Calculation
	•	Investment Influence: Model a probability function where higher investment increases the chance of a successful drilling outcome.
	•	Example: Base success probability might start at 20%, increasing by 5% per unit of investment, up to a maximum cap.
	•	Random Outcome Generation: Use a server-side random number generator (e.g., simulating a dice roll or drawing a card) to determine success.
	•	Yield Determination: If successful, calculate the yield (number of oil tokens) based on both investment and the lease’s hidden potential.

C. Oil Market Fluctuations
	•	Algorithm: Develop a simple algorithm that adjusts the oil price each round (e.g., random percentage change within a defined range).
	•	Consider including trends or events that can influence prices for added strategy.
	•	Player Impact: Allow players to choose the optimal time to sell oil based on market trends.

D. End Game & Scoring
	•	Final Calculation: Tally cash on hand, market value of oil tokens (using the final oil price), and any residual asset values.
	•	Winner Declaration: Announce the player with the highest net worth as the winner.

7. Technical Stack Suggestions

A. Frontend
	•	Frameworks/Libraries: React, Vue, or Angular for building interactive UI components.
	•	State Management: Redux, Vuex, or Context API for managing game state on the client side.
	•	Real-Time Updates: WebSocket libraries (e.g., Socket.IO client) for live game interactions.

B. Backend
	•	Server Environment: Node.js with Express for API endpoints and WebSocket integration.
	•	Real-Time Communication: Socket.IO or similar libraries to push state changes to clients.
	•	Database: PostgreSQL, MySQL, or MongoDB depending on your data model preference.

C. Deployment & Scaling
	•	Hosting: Cloud services (e.g., AWS, Heroku, or DigitalOcean) to host your backend and database.
	•	Load Balancing: Consider using load balancers if supporting many simultaneous multiplayer games.

8. Additional Considerations

A. Security
	•	Authentication: Implement user accounts or guest login with session management.
	•	Cheating Prevention: Validate all game actions on the server side.
	•	Randomness: Use secure, server-side random number generation.

B. Testing & Quality Assurance
	•	Unit Testing: Test individual game logic functions (bidding, drilling outcome calculations, market updates).
	•	Integration Testing: Simulate complete game sessions, especially for multiplayer scenarios.
	•	UI/UX Testing: Ensure the interface is intuitive, responsive, and provides clear feedback to players.

C. Additional Features (Future Enhancements)
	•	Tutorial Mode: Step-by-step introduction for new players.
	•	AI Opponents: Create AI players for single-player mode.
	•	Game History & Analytics: Track game statistics for replay or post-game analysis.
	•	Social & Chat Features: In-game chat and social interactions to enhance multiplayer engagement.