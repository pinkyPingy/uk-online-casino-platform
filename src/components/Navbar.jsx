import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();
  
  const handleConnect = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Wallet connected:", accounts[0]);
        setIsConnected(true);
      } else {
        console.log("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className={`nav-link ${location.pathname === "/" ? "text-secondary" : ""}`}
      >
        Home
      </Link>
      <Link
        to="/create"
        className={`nav-link ${location.pathname === "/create" ? "text-secondary" : ""}`}
      >
        Create Bet
      </Link>
      <Link
        to="/available"
        className={`nav-link ${location.pathname === "/available" ? "text-secondary" : ""}`}
      >
        Available Bets
      </Link>
      <Link
        to="/my-bets"
        className={`nav-link ${location.pathname === "/my-bets" ? "text-secondary" : ""}`}
      >
        My Bets
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-secondary">
            BidKub
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <button
            onClick={handleConnect}
            className="flex items-center space-x-2 btn-primary"
          >
            <Wallet2 className="w-5 h-5" />
            <span>{isConnected ? "Connected" : "Connect Wallet"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;