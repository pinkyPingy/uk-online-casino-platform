import { ethers } from "ethers";

class SmartContractService {
  private contractOwner: string | null = null;
  private contract: ethers.Contract | null = null;

  async getContractOwner(): Promise<string> {
    if (this.contractOwner) return this.contractOwner;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        "YOUR_CONTRACT_ADDRESS",
        ["function owner() view returns (address)"],
        provider
      );
      
      this.contractOwner = await contract.owner();
      console.log("Contract owner fetched:", this.contractOwner);
      return this.contractOwner;
    } catch (error) {
      console.error("Error getting contract owner:", error);
      throw error;
    }
  }

  async isAdmin(address: string): Promise<boolean> {
    try {
      const owner = await this.getContractOwner();
      const isAdmin = owner.toLowerCase() === address.toLowerCase();
      console.log("Admin check:", { address, owner, isAdmin });
      return isAdmin;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }

  async createMatch(home: string, away: string): Promise<void> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const tx = await this.contract.createMatch(home, away);
      await tx.wait();
      console.log("Match created successfully");
    } catch (error) {
      console.error("Error creating match:", error);
      throw error;
    }
  }

  async placeBet(matchId: string, amount: string): Promise<void> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const tx = await this.contract.placeBet(matchId, { value: ethers.parseEther(amount) });
      await tx.wait();
      console.log("Bet placed successfully");
    } catch (error) {
      console.error("Error placing bet:", error);
      throw error;
    }
  }

  async getMatches(): Promise<any[]> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const matches = await this.contract.getMatches();
      return matches;
    } catch (error) {
      console.error("Error getting matches:", error);
      throw error;
    }
  }

  async getBets(address: string): Promise<any[]> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const bets = await this.contract.getBetsByAddress(address);
      return bets;
    } catch (error) {
      console.error("Error getting bets:", error);
      throw error;
    }
  }

  async initialize(): Promise<void> {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      this.contract = new ethers.Contract(
        "YOUR_CONTRACT_ADDRESS",
        [
          "function owner() view returns (address)",
          "function createMatch(string memory home, string memory away) external",
          "function placeBet(uint256 matchId) external payable",
          "function getMatches() external view returns (tuple(uint256 id, string home, string away, uint256 startTime, bool isActive)[])",
          "function getBetsByAddress(address better) external view returns (tuple(uint256 matchId, uint256 amount, uint256 timestamp)[])"
        ],
        signer
      );
      console.log("Contract initialized successfully");
    } catch (error) {
      console.error("Error initializing contract:", error);
      throw error;
    }
  }
}

export const smartContractService = new SmartContractService();