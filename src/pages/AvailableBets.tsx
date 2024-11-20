import { useState } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import BetCard from "@/components/BetCard";

const mockMatches = [
  {
    id: "1",
    home: "Manchester United",
    away: "Liverpool",
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: "2",
    home: "Arsenal",
    away: "Chelsea",
    isActive: true,
    createdAt: Date.now()
  }
];

const mockBets = [
  {
    id: "1",
    matchId: "1",
    description: "Manchester United vs Liverpool",
    creator: "0x1234...5678",
    totalStake: "2.0",
    homeHandicap: "+1.5",
    awayHandicap: "-1.5",
    homeBets: "1.2",
    awayBets: "0.5",
    maxBetAvailable: "0.3",
    isResolved: true,
    isClaimed: false,
    createdAt: Date.now()
  },
  {
    id: "2",
    matchId: "2",
    description: "Arsenal vs Chelsea",
    creator: "0x8765...4321",
    totalStake: "1.5",
    homeHandicap: "0",
    awayHandicap: "0",
    homeBets: "0.7",
    awayBets: "0.3",
    maxBetAvailable: "0.5",
    isResolved: true,
    isClaimed: true,
    createdAt: Date.now()
  }
];

const AvailableBets = () => {
  const [selectedMatch, setSelectedMatch] = useState<string>("");
  const [bets] = useState(mockBets);

  const filteredBets = selectedMatch 
    ? bets.filter(bet => bet.matchId === selectedMatch)
    : bets;

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
            <Select
              onValueChange={setSelectedMatch}
              value={selectedMatch}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Matches</SelectItem>
                {mockMatches.map(match => (
                  <SelectItem key={match.id} value={match.id}>
                    {match.home} vs {match.away}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBets.map((bet) => (
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