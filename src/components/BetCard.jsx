import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Coins, Users, Timer } from "lucide-react";
import { BetActions } from "./BetActions";

const BetCard = ({ bet }) => {
  return (
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
          <span>Current Pool: {bet.currentPool} ETH</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-primary" />
          <span>Remaining Pool: {bet.remainingPool} ETH</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-primary" />
          <span>Status: {bet.status}</span>
        </div>
      </CardContent>
      <CardFooter>
        <BetActions bet={bet} />
      </CardFooter>
    </Card>
  );
};

export default BetCard;