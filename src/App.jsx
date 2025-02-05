// App.jsx
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Airdrop } from './Components/Airdrop/airdrop';
import NavBar from './Pages/navBar';
import { SendSol } from './Pages/sendSol';
import { SendToken } from './Pages/sendToken';

function App() {
  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <NavBar />
              <div className="container mx-auto px-4">
                <Routes>
                  <Route path="/" element={<Airdrop />}/>
                  <Route path="/send-sol" element={<SendSol />} />
                  <Route path="/send-token" element={<SendToken />} />
                </Routes>
              </div>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;