import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { smartContractService } from "@/services/smartContractService";

const CreateBet = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [matches, setMatches] = useState<any[]>([]); // Store fetched matches
  const [hasMore, setHasMore] = useState(false); // Handle pagination state
  const [page, setPage] = useState(1); // Pagination page number

  const form = useForm({
    defaultValues: {
      stake: "",
      homeHandicap: "",
      awayHandicap: "",
    },
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const result = await smartContractService.getActiveMatches(1000, 0);
        console.log("Matches are: ", result.data)
        setMatches(result.data);
        setHasMore(result.haveMorePageAvailable);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      console.log("Creating bet with values:", values);

      if (!selectedMatch) {
        toast({
          title: "Error",
          description: "Please select a match",
          variant: "destructive",
        });
        return;
      }

      await smartContractService.createBettingPost(
        Number(selectedMatch),
        Number(values.homeHandicap),
        Number(values.awayHandicap)
      );

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
                  <FormItem>
                    <FormLabel>Select Match</FormLabel>
                    <Select onValueChange={setSelectedMatch}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a match" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {matches.map((match) => (
                          <SelectItem key={match.id} value={match.id}>
                            {match.home} vs {match.away}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  {/* Form Fields for stake, home handicap, away handicap */}
                  <FormField
                    control={form.control}
                    name="stake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stake Amount (ETH)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="homeHandicap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Team Handicap</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="awayHandicap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Away Team Handicap</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" {...field} />
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

          {/* Pagination Controls */}
          {hasMore && (
            <div className="mt-4 flex justify-center">
              <Button onClick={() => setPage(page + 1)} disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Loading..." : "Next Page"}
              </Button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default CreateBet;

