import './App.css'
import { WalletProvider ,ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './Components/Airdrop/airdrop';
import { Balance } from './Components/Balance/balance';
import { SignMessage } from './Components/Sign/sign';
function App() {
  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex gap-4 justify-center items-center p-12">
            <WalletMultiButton className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors" />
            <WalletDisconnectButton className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors" />
          </div>
          <Airdrop />
          <Balance />
          <SignMessage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
