import { ethers } from 'ethers';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  // Add the ABI from your contract
];

export class SmartContractService {
  constructor() {
    this.contract = null;
    this.provider = null;
    this.signer = null;
    this.initializeContract();
  }

  async initializeContract() {
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

  async createMatch(home, away) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Creating match:', { home, away });
      const tx = await this.contract.createMatch(home, away);
      const receipt = await tx.wait();
      console.log('Match created successfully:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  }

  async createBettingPost(matchId, homeHandicap, awayHandicap, stake) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Creating betting post:', { matchId, homeHandicap, awayHandicap, stake });
      const tx = await this.contract.createBettingPost(
        matchId,
        homeHandicap,
        awayHandicap,
        { value: ethers.parseEther(stake.toString()) }
      );
      const receipt = await tx.wait();
      console.log('Betting post created successfully:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error creating betting post:', error);
      throw error;
    }
  }

  async finishMatch(matchId, homeScore, awayScore) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Finishing match:', { matchId, homeScore, awayScore });
      const tx = await this.contract.finishMatch(matchId, homeScore, awayScore);
      const receipt = await tx.wait();
      console.log('Match finished successfully:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error finishing match:', error);
      throw error;
    }
  }

  async claimReward(postId) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    try {
      console.log('Claiming reward for post:', postId);
      const tx = await this.contract.playerClaimBettingReward(postId);
      const receipt = await tx.wait();
      console.log('Reward claimed successfully:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  }
}

export const smartContractService = new SmartContractService();