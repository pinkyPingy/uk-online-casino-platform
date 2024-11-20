import { motion } from "framer-motion";
import { TrendingUp, Users, Award } from "lucide-react";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-secondary mb-4">
            Welcome to BidKub
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            The next generation of decentralized betting on Base Layer 2.
            Create, join, and win with complete transparency.
          </p>
          <h2 className="text-2xl font-bold mt-4">
            Connect your MetaMask Wallet for more details.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard
            title="Total Bets"
            value="10,234"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="Active Users"
            value="2,451"
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Total Winnings"
            value="Ξ 1,234"
            icon={<Award className="w-6 h-6" />}
          />
        </div>

      </main>
    </div>
  );
};

export default Index;