import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";

// Mock football matches data
const mockMatches = [
  {
    id: "1",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    date: "2024-03-20",
    competition: "Premier League"
  },
  {
    id: "2",
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    date: "2024-03-25",
    competition: "La Liga"
  },
  {
    id: "3",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    date: "2024-03-30",
    competition: "Bundesliga"
  }
];

const CreateBet = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      gameType: "sports",
      wagerAmount: "",
      poolLimit: "",
      description: "",
      homeTeamOdds: "",
      awayTeamOdds: "",
    },
  });

  const gameType = form.watch("gameType");

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      console.log("Creating bet with values:", values);

      if (gameType === "sports" && !selectedMatch) {
        toast({
          title: "Error",
          description: "Please select a match for sports betting",
          variant: "destructive",
        });
        return;
      }

      // Here you would typically send the data to your smart contract
      toast({
        title: "Bet Created Successfully",
        description: "Your bet has been published to the blockchain.",
      });
      navigate("/available");
    } catch (error) {
      console.error("Error creating bet:", error);
      toast({
        title: "Error Creating Bet",
        description: "There was an error creating your bet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMatchDetails = selectedMatch 
    ? mockMatches.find(match => match.id === selectedMatch)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold text-secondary">Create a New Bet</h1>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="gameType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select game type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="dice">Dice Roll</SelectItem>
                            <SelectItem value="cards">Card Game</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {gameType === "sports" && (
                    <>
                      <FormItem>
                        <FormLabel>Select Match</FormLabel>
                        <Select onValueChange={setSelectedMatch}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a match" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockMatches.map((match) => (
                              <SelectItem key={match.id} value={match.id}>
                                {match.homeTeam} vs {match.awayTeam} - {match.competition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>

                      {selectedMatchDetails && (
                        <>
                          <FormField
                            control={form.control}
                            name="homeTeamOdds"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{selectedMatchDetails.homeTeam} Odds</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="awayTeamOdds"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{selectedMatchDetails.awayTeam} Odds</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="wagerAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wager Amount (ETH)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="poolLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pool Limit (ETH, Optional)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Creating Bet..." : "Create Bet"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateBet;