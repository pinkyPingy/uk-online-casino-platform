import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import type { Bet } from "@/types/bet";

interface BetActionsProps {
  bet: Bet;
}

export const BetActions = ({ bet }: BetActionsProps) => {
  const { toast } = useToast();
  const [contributionAmount, setContributionAmount] = useState("");
  const [isContributing, setIsContributing] = useState(false);
  const [isBetting, setIsBetting] = useState(false);

  const handleContribution = async () => {
    try {
      setIsContributing(true);
      console.log("Contributing to bet:", bet.id, "Amount:", contributionAmount);
      toast({
        title: "Contributing to Bet Pool",
        description: "Transaction initiated. Please confirm in your wallet.",
      });
    } catch (error) {
      console.error("Error contributing to bet:", error);
      toast({
        title: "Error",
        description: "Failed to contribute to bet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsContributing(false);
    }
  };

  const handleBet = async () => {
    try {
      setIsBetting(true);
      console.log("Making bet:", bet.id);
      toast({
        title: "Making Bet",
        description: "Transaction initiated. Please confirm in your wallet.",
      });
    } catch (error) {
      console.error("Error making bet:", error);
      toast({
        title: "Error",
        description: "Failed to make bet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBetting(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Contribute as Banker
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contribute to Bet Pool</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="number"
              placeholder="Amount in ETH"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={handleContribution}
              disabled={isContributing}
            >
              {isContributing ? "Contributing..." : "Contribute"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button 
        className="w-full" 
        onClick={handleBet}
        disabled={isBetting}
      >
        {isBetting ? "Processing..." : "Make Bet"}
      </Button>
    </div>
  );
};