import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Users, Coins, Timer } from "lucide-react";

interface Bet {
  id: string;
  gameType: string;
  wagerAmount: string;
  poolLimit: string;
  description: string;
  banker: string;
  remainingPool: string;
}

const mockBets: Bet[] = [
  {
    id: "1",
    gameType: "sports",
    wagerAmount: "0.5",
    poolLimit: "5",
    description: "Champions League Final",
    banker: "0x1234...5678",
    remainingPool: "2.5",
  },
  {
    id: "2",
    gameType: "dice",
    wagerAmount: "0.1",
    poolLimit: "1",
    description: "Roll higher than 4",
    banker: "0x8765...4321",
    remainingPool: "0.7",
  },
];

const AvailableBets = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState({ gameType: "all", minWager: "" });
  const [bets] = useState<Bet[]>(mockBets);

  const handleJoinBet = async (betId: string) => {
    try {
      console.log("Joining bet:", betId);
      toast({
        title: "Joining Bet",
        description: "Transaction initiated. Please confirm in your wallet.",
      });
    } catch (error) {
      console.error("Error joining bet:", error);
      toast({
        title: "Error",
        description: "Failed to join bet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-3xl font-bold text-secondary">Available Bets</h1>
            <div className="flex gap-4">
              <Select
                onValueChange={(value) => setFilter({ ...filter, gameType: value })}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Game Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="dice">Dice</SelectItem>
                  <SelectItem value="cards">Cards</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Min Wager"
                className="w-[180px]"
                onChange={(e) => setFilter({ ...filter, minWager: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bets.map((bet) => (
              <motion.div
                key={bet.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">{bet.description}</h3>
                    <p className="text-muted-foreground capitalize">{bet.gameType}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-primary" />
                      <span>Wager: {bet.wagerAmount} ETH</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Banker: {bet.banker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-primary" />
                      <span>Remaining Pool: {bet.remainingPool} ETH</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleJoinBet(bet.id)}
                    >
                      Join Bet
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AvailableBets;