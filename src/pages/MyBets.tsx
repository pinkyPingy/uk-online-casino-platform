import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Trophy, Timer, AlertTriangle } from "lucide-react";

interface Bet {
  id: string;
  gameType: string;
  wagerAmount: string;
  description: string;
  status: "active" | "resolved" | "won" | "lost";
  timestamp: string;
}

const mockBets: Bet[] = [
  {
    id: "1",
    gameType: "sports",
    wagerAmount: "0.5",
    description: "Champions League Final",
    status: "active",
    timestamp: "2024-03-19",
  },
  {
    id: "2",
    gameType: "dice",
    wagerAmount: "0.1",
    description: "Roll higher than 4",
    status: "won",
    timestamp: "2024-03-18",
  },
];

const MyBets = () => {
  const { toast } = useToast();
  const [bets] = useState<Bet[]>(mockBets);

  const handleContributeFunds = async (betId: string) => {
    try {
      console.log("Contributing funds to bet:", betId);
      // Here you would typically interact with your smart contract
      toast({
        title: "Contributing Funds",
        description: "Transaction initiated. Please confirm in your wallet.",
      });
    } catch (error) {
      console.error("Error contributing funds:", error);
      toast({
        title: "Error",
        description: "Failed to contribute funds. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: Bet["status"]) => {
    switch (status) {
      case "active":
        return <Timer className="w-5 h-5 text-primary" />;
      case "won":
        return <Trophy className="w-5 h-5 text-green-500" />;
      case "lost":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Bet["status"]) => {
    switch (status) {
      case "active":
        return "text-primary";
      case "won":
        return "text-green-500";
      case "lost":
        return "text-red-500";
      default:
        return "text-muted";
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
          <h1 className="text-3xl font-bold text-secondary">My Bets</h1>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Bets</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bets.map((bet) => (
                  <motion.div
                    key={bet.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{bet.description}</h3>
                          <p className="text-muted-foreground capitalize">{bet.gameType}</p>
                        </div>
                        {getStatusIcon(bet.status)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Wager Amount:</span>
                          <span>{bet.wagerAmount} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Status:</span>
                          <span className={getStatusColor(bet.status)}>
                            {bet.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Date:</span>
                          <span>{bet.timestamp}</span>
                        </div>
                        {bet.status === "active" && (
                          <Button
                            className="w-full mt-4"
                            onClick={() => handleContributeFunds(bet.id)}
                          >
                            Contribute Funds
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bets.filter((bet) => bet.status === "active").map((bet) => (
                  <motion.div
                    key={bet.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{bet.description}</h3>
                          <p className="text-muted-foreground capitalize">{bet.gameType}</p>
                        </div>
                        {getStatusIcon(bet.status)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Wager Amount:</span>
                          <span>{bet.wagerAmount} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Status:</span>
                          <span className={getStatusColor(bet.status)}>
                            {bet.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Date:</span>
                          <span>{bet.timestamp}</span>
                        </div>
                        {bet.status === "active" && (
                          <Button
                            className="w-full mt-4"
                            onClick={() => handleContributeFunds(bet.id)}
                          >
                            Contribute Funds
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resolved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bets.filter((bet) => bet.status === "won" || bet.status === "lost").map((bet) => (
                  <motion.div
                    key={bet.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{bet.description}</h3>
                          <p className="text-muted-foreground capitalize">{bet.gameType}</p>
                        </div>
                        {getStatusIcon(bet.status)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Wager Amount:</span>
                          <span>{bet.wagerAmount} ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Status:</span>
                          <span className={getStatusColor(bet.status)}>
                            {bet.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Date:</span>
                          <span>{bet.timestamp}</span>
                        </div>
                        {bet.status === "active" && (
                          <Button
                            className="w-full mt-4"
                            onClick={() => handleContributeFunds(bet.id)}
                          >
                            Contribute Funds
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default MyBets;
