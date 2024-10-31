# Solana Wallet dApp

A decentralized application built on Solana that demonstrates wallet connection, balance checking, airdrop requests, and message signing functionality. This dApp is built using React and the Solana Web3.js library.

## Features

- 🔗 Wallet Connection/Disconnection
- 💰 SOL Balance Checking
- 🪂 Airdrop Request System
- ✍️ Message Signing with Verification

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Solana wallet (e.g., Phantom, Solflare)

## Installation

1. git clone https://github.com/LingwalAnkit
/solana-wallet-dapp.git
- cd DApp

2. Install dependencies:
```bash
npm install
```

## Required Dependencies

```json
{
  "dependencies": {
    "@noble/curves": "^1.x.x",
    "@solana/wallet-adapter-react": "^0.15.x",
    "@solana/wallet-adapter-react-ui": "^0.9.x",
    "@solana/web3.js": "^1.x.x",
    "bs58": "^5.x.x",
    "react": "^18.x.x"
  }
}
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Connect your wallet using the "Select Wallet" button
3. Interact with the following features:
   - Check your SOL balance
   - Request an airdrop (only works on devnet)
   - Sign messages and verify signatures

## Component Structure

### App.jsx
The main component that sets up the Solana wallet adapter providers and renders the main UI components.

### Components

#### Balance
- Displays the current SOL balance of the connected wallet
- Automatically updates when the wallet is connected

#### Airdrop
- Allows users to request SOL airdrops on devnet
- Input field for specifying the amount of SOL
- Displays transaction confirmation

#### SignMessage
- Enables users to sign messages using their wallet
- Verifies signatures using the ed25519 curve
- Displays the encoded signature upon successful signing

## Network Configuration

The dApp is configured to connect to Solana's devnet by default. You can modify the endpoint in `App.jsx`:

```javascript
<ConnectionProvider endpoint={'https://api.devnet.solana.com'}> // You can also use your own RPC URL from Alchemy 
```

## Styling

The project uses:
- Tailwind CSS for styling
- Custom CSS classes for wallet adapter UI
- Responsive design for various screen sizes

## Security Considerations

- All transactions are signed using the connected wallet
- Message signatures are verified using ed25519 curve
- Input validation is implemented for airdrop amounts
- Error handling for failed transactions and signatures

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Solana Web3.js
- Wallet Adapter libraries
- Noble Curves library
- BS58 encoding library
