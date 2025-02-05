import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function TokenBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [tokenBalance, setTokenBalance] = useState(null);

  // Fetch token mint address from environment variables
  const tokenMintAddress = new PublicKey(import.meta.env.VITE_TOKEN_MINT_ADDRESS);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (!publicKey) return;

      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: tokenMintAddress,
        });

        if (tokenAccounts.value.length > 0) {
          const tokenAccountPubkey = tokenAccounts.value[0].pubkey;
          const token = await connection.getTokenAccountBalance(tokenAccountPubkey);
          setTokenBalance(token.value.uiAmount);
        } else {
          setTokenBalance(0);
        }
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setTokenBalance(null);
      }
    };

    fetchTokenBalance();
  },); // Added missing dependencies

  return (
    <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white text-center mb-4">Token Balance</h2>
      <p className="text-2xl font-bold text-white text-center">
        {tokenBalance !== null ? `${tokenBalance} Tokens` : "Connect Wallet"}
      </p>
    </div>
  );
}