import { Plane, Send, Coins } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-purple-500' : 'bg-purple-700';
  };

  return (
    <nav className="bg-transparent p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isActive('/')} hover:bg-purple-600 text-white transition-colors duration-200`}
            >
              <Plane className="h-5 w-5" />
              <span>Airdrop</span>
            </button>

            <button
              onClick={() => navigate('/send-sol')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isActive('/send-sol')} hover:bg-purple-600 text-white transition-colors duration-200`}
            >
              <Send className="h-5 w-5" />
              <span>Send SOL</span>
            </button>

            <button
              onClick={() => navigate('/send-token')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isActive('/send-token')} hover:bg-purple-600 text-white transition-colors duration-200`}
            >
              <Coins className="h-5 w-5" />
              <span>Send Token</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <WalletMultiButton className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors" />
            <WalletDisconnectButton className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;