export interface Player {
  id: string;
  name: string;
  funds: number;
  oilTokens: number;
  leasesOwned: string[];
  currentBid?: number;
}

export interface OilLease {
  id: string;
  location: { x: number; y: number };
  baseCost: number;
  drilled: boolean;
  hiddenPotential: number;
  currentInvestment: number;
  ownerId: string | null;
}

export interface Auction {
  leaseId: string;
  highestBid: number;
  highestBidderId: string | null;
  bidHistory: { bidderId: string; bidAmount: number }[];
}

export interface DrillingOutcome {
  leaseId: string;
  investment: number;
  success: boolean;
  oilYield: number;
  rollResult: number;
}

export interface OilMarket {
  currentPrice: number;
  priceHistory: { round: number; price: number }[];
}
