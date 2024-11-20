import { ethers } from "ethers";
import { PaginatedResponse, Match, Post } from "@/types/betting";

class SmartContractService {
  private contractOwner: string | null = null;
  private contract: ethers.Contract | null = null;

  // Ensure the contract is initialized before making any calls to it
  private async initialize(): Promise<void> {
    if (this.contract) return; // If already initialized, skip re-initialization
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      this.contract = new ethers.Contract(
        "0x8ffDd9d8ad3807Bf74119f6030e89064616869C3", // Contract address
        [
          "function getOwner() view returns (address)",
          "function createMatch(string memory home, string memory away) external",
          "function placeBet(uint256 matchId) external payable",
          "function getMatches() external view returns (tuple(uint256 id, string home, string away, uint256 startTime, bool isActive)[])",
          "function getBetsByAddress(address better) external view returns (tuple(uint256 matchId, uint256 amount, uint256 timestamp)[])",
          "function createBettingPost(uint256 matchId, uint256 homeHandicap, uint256 awayHandicap) external payable",
          "function claimBettingReward(uint256 postId) external",
          "function makeABet(uint256 postId, bool isHomeBet) external payable"
        ],
        signer
      );
      console.log("Contract initialized successfully");
    } catch (error) {
      console.error("Error initializing contract:", error);
      throw error;
    }
  }

  // Fetch the contract owner
  async getContractOwner(): Promise<string> {
    if (this.contractOwner) return this.contractOwner;

    try {
      await this.initialize(); // Ensure contract is initialized
      const owner = await this.contract?.getOwner();
      this.contractOwner = owner;
      console.log("Contract owner fetched:", this.contractOwner);
      return this.contractOwner;
    } catch (error) {
      console.error("Error getting contract owner:", error);
      throw error;
    }
  }

  // Fetch active matches with pagination
  async getActiveMatches(pageSize: number, pageNumber: number): Promise<PaginatedResponse<Match>> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const result = await this.contract?.getActiveMatchSortByLatest(pageSize, pageNumber);
      return {
        data: result.activeMatches,
        success: result.success,
        haveMorePageAvailable: result.haveMorePageAvailable
      };
    } catch (error) {
      console.error("Error fetching active matches:", error);
      throw error;
    }
  }

  // Fetch posts by match ID with pagination
  async getPostsByMatchId(matchId: number, pageSize: number, pageNumber: number): Promise<PaginatedResponse<Post>> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const result = await this.contract?.getPostsByMatchIdWithPagination(matchId, pageSize, pageNumber);
      return {
        data: result.posts,
        success: result.success,
        haveMorePageAvailable: result.haveMorePageAvailable
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  // Create a betting post
  async createBettingPost(matchId: number, homeHandicap: number, awayHandicap: number): Promise<number> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const tx = await this.contract?.createBettingPost(matchId, homeHandicap, awayHandicap);
      const receipt = await tx.wait();
      console.log("Betting post created:", receipt);
      return receipt.status; // You can return any relevant value from receipt
    } catch (error) {
      console.error("Error creating betting post:", error);
      throw error;
    }
  }

  // Claim betting reward
  async claimBettingReward(postId: number): Promise<boolean> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const tx = await this.contract?.claimBettingReward(postId);
      const receipt = await tx.wait();
      return receipt.status === 1; // Return success status
    } catch (error) {
      console.error("Error claiming reward:", error);
      throw error;
    }
  }

  // Make a bet
  async makeABet(postId: number, isHomeBet: boolean, amount: string): Promise<boolean> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const tx = await this.contract?.makeABet(postId, isHomeBet, {
        value: ethers.parseEther(amount)
      });
      const receipt = await tx.wait();
      return receipt.status === 1; // Return success status
    } catch (error) {
      console.error("Error making bet:", error);
      throw error;
    }
  }

  // Check if the user is an admin
  async isAdmin(address: string): Promise<boolean> {
    try {
      const owner = await this.getContractOwner();
      return owner.toLowerCase() === address.toLowerCase();
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }

  // Create a match
  async createMatch(home: string, away: string): Promise<void> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const tx = await this.contract?.createMatch(home, away);
      await tx.wait();
      console.log("Match created successfully");
    } catch (error) {
      console.error("Error creating match:", error);
      throw error;
    }
  }

  // Place a bet
  async placeBet(matchId: string, amount: string): Promise<void> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const tx = await this.contract?.placeBet(matchId, { value: ethers.parseEther(amount) });
      await tx.wait();
      console.log("Bet placed successfully");
    } catch (error) {
      console.error("Error placing bet:", error);
      throw error;
    }
  }

  // Get matches
  async getMatches(): Promise<any[]> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const matches = await this.contract?.getMatches();
      return matches;
    } catch (error) {
      console.error("Error getting matches:", error);
      throw error;
    }
  }

  // Get bets by address
  async getBets(address: string): Promise<any[]> {
    try {
      await this.initialize(); // Ensure contract is initialized
      const bets = await this.contract?.getBetsByAddress(address);
      return bets;
    } catch (error) {
      console.error("Error getting bets:", error);
      throw error;
    }
  }
}

export const smartContractService = new SmartContractService();
