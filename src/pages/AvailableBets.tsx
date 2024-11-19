import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Users, Coins, Timer } from "lucide-react";
import type { Bet } from "@/types/bet";
import { BetCard } from "@/components/BetCard";
import { BetActions } from "@/components/BetActions";

const mockBets: Bet[] = [
  {
    id: "1",
    gameType: "sports",
    wagerAmount: "0.5",
    poolLimit: "5",
    description: "Champions League Final",
    banker: "0x1234...5678",
    currentPool: "2.0",
    remainingPool: "3.0",
    players: [],
    contributors: [
      { address: "0x1234...5678", amount: "2.0" }
    ],
    status: "open"
  },
  {
    id: "2",
    gameType: "dice",
    wagerAmount: "0.1",
    poolLimit: "1",
    description: "Roll higher than 4",
    banker: "0x8765...4321",
    currentPool: "0.3",
    remainingPool: "0.7",
    players: [],
    contributors: [
      { address: "0x8765...4321", amount: "0.3" }
    ],
    status: "open"
  },
];

const AvailableBets = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState({ gameType: "all", minWager: "" });
  const [bets] = useState<Bet[]>(mockBets);

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
                <BetCard bet={bet} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AvailableBets;