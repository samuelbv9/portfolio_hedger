export interface HedgeOption {
  name: string;
  description: string;
  expiration: string;
  strikePrice: number;
  contractPrice: number;
  contracts: number;
  totalCost: number;
  costPercentage: number;
  protectionLevel: string;
  breakeven: number;
}
