import { ethers } from 'ethers';
import type { Bet, SmartContractBet } from '@/types/bet';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  // Add your contract ABI here
];

export class SmartContractService {
  private contract: ethers.Contract | null = null;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.initializeContract();
  }

  private async initializeContract() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        this.contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          this.signer
        );
        console.log('Smart contract initialized successfully');
      } catch (error) {
        console.error('Failed to initialize contract:', error);
      }
    }
  }

  async createBet(bet: Omit<Bet, 'id' | 'status' | 'createdAt'>) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Creating bet on blockchain:', bet);
      const tx = await this.contract.createBet(
        bet.gameType,
        ethers.parseEther(bet.wagerAmount),
        ethers.parseEther(bet.poolLimit),
        bet.description
      );
      
      const receipt = await tx.wait();
      console.log('Bet created successfully:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error creating bet:', error);
      throw error;
    }
  }

  async contributeToBet(betId: string, amount: string) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Contributing to bet:', betId, amount);
      const tx = await this.contract.contributeToBet(
        betId,
        { value: ethers.parseEther(amount) }
      );
      
      const receipt = await tx.wait();
      console.log('Contribution successful:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error contributing to bet:', error);
      throw error;
    }
  }

  async makeBet(betId: string, amount: string) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Making bet:', betId, amount);
      const tx = await this.contract.makeBet(
        betId,
        { value: ethers.parseEther(amount) }
      );
      
      const receipt = await tx.wait();
      console.log('Bet placed successfully:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error making bet:', error);
      throw error;
    }
  }

  async getBet(betId: string): Promise<SmartContractBet> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Fetching bet:', betId);
      const bet = await this.contract.getBet(betId);
      console.log('Bet fetched successfully:', bet);
      return bet;
    } catch (error) {
      console.error('Error fetching bet:', error);
      throw error;
    }
  }

  async getAllBets(): Promise<SmartContractBet[]> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Fetching all bets');
      const bets = await this.contract.getAllBets();
      console.log('Bets fetched successfully:', bets);
      return bets;
    } catch (error) {
      console.error('Error fetching bets:', error);
      throw error;
    }
  }
}

export const smartContractService = new SmartContractService();