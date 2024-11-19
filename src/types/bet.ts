export interface Bet {
  id: string;
  gameType: string;
  wagerAmount: string;
  poolLimit: string;
  description: string;
  banker: string;
  currentPool: string;
  remainingPool: string;
  players: string[];
  contributors: {
    address: string;
    amount: string;
  }[];
  status: 'open' | 'in_progress' | 'resolved';
}