import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import BetCard from "@/components/BetCard";
import { smartContractService } from "@/services/smartContractService";

const AvailableBets = () => {
  const [matches, setMatches] = useState<any[]>([]); // Matches fetched from the contract
  const [selectedMatch, setSelectedMatch] = useState<string>(""); // Currently selected match
  const [bets, setBets] = useState<any[]>([]); // Bets for the selected match
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [isLoadingBets, setIsLoadingBets] = useState(false);
  const [page, setPage] = useState(1); // Pagination page for bets
  const [hasMoreBets, setHasMoreBets] = useState(false); // Check for more pages

  useEffect(() => {
    // Fetch matches when the component loads
    const fetchMatches = async () => {
      setIsLoadingMatches(true);
      try {
        const result = await smartContractService.getActiveMatches(1000, 1);
        setMatches(result.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setIsLoadingMatches(false);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    // Fetch bets when a match is selected
    const fetchBets = async () => {
      if (!selectedMatch) {
        setBets([]);
        return;
      }

      setIsLoadingBets(true);
      try {
        const result = await smartContractService.getPostsByMatchId(Number(selectedMatch), 10, page);
        setBets((prevBets) => (page === 1 ? result.data : [...prevBets, ...result.data]));
        setHasMoreBets(result.haveMorePageAvailable);
      } catch (error) {
        console.error("Error fetching bets:", error);
      } finally {
        setIsLoadingBets(false);
      }
    };

    fetchBets();
  }, [selectedMatch, page]);

  const handleLoadMoreBets = () => {
    if (hasMoreBets) setPage((prevPage) => prevPage + 1);
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
            <Select
              onValueChange={(value) => {
                setSelectedMatch(value === "all" ? "" : value);
                setPage(1); // Reset to first page when selecting a new match
              }}
              value={selectedMatch || "all"}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a match" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                {isLoadingMatches ? (
                  <SelectItem value="all" disabled>Loading matches...</SelectItem>
                ) : (
                  matches.map((match) => (
                    <SelectItem key={match.id} value={match.id}>
                      {match.home} vs {match.away}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingBets ? (
              <p>Loading bets...</p>
            ) : bets.length === 0 ? (
              <p>No bets available for this match.</p>
            ) : (
              bets.map((bet) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <BetCard bet={bet} />
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {hasMoreBets && !isLoadingBets && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleLoadMoreBets}
                className="px-4 py-2 bg-secondary text-white rounded-md"
              >
                Load More Bets
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AvailableBets;
