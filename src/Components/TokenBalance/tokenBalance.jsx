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
      if (!publicKey) return; // Ensure wallet is connected

      try {
        // Get all token accounts owned by the wallet for this mint
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: tokenMintAddress,
        });

        if (tokenAccounts.value.length > 0) {
          // Get balance from the first token account found
          const tokenAccountPubkey = tokenAccounts.value[0].pubkey;
          const token = await connection.getTokenAccountBalance(tokenAccountPubkey);
          setTokenBalance(token.value.uiAmount); // Store balance in state
        } else {
          setTokenBalance(0);
        }
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setTokenBalance(null);
      }
    };

    fetchTokenBalance();
  }, ); // Runs when wallet connects or changes

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-white">Token Balance</h2>
      <p className="text-lg font-medium text-gray-300 mt-2">
        {tokenBalance !== null ? `${tokenBalance} Tokens` : "Connect Wallet"}
      </p>
    </div>
  );
}
