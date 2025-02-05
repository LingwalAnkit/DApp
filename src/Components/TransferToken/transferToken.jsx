import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { useState } from "react";

export const TransferToken = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [to, setTo] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function transferToken() {
    setError('');
    setSuccess('');
    
    try {
      if (!wallet.publicKey) throw new Error("❌ Wallet not connected!");
      if (!to) throw new Error("⚠️ Please enter recipient address!");
      if (!token || isNaN(token) || parseFloat(token) <= 0) {
        throw new Error("⚠️ Please enter a valid token amount!");
      }

      const recipient = to;
      const amount = parseFloat(token);
      const mint = new PublicKey(import.meta.env.VITE_TOKEN_MINT_ADDRESS);

      const senderATA = await getAssociatedTokenAddress(mint, wallet.publicKey);
      const recipientATA = await getAssociatedTokenAddress(mint, new PublicKey(recipient));

      const recipientATAInfo = await connection.getAccountInfo(recipientATA);

      if (!recipientATAInfo) {
        throw new Error(
          "⚠️ Recipient doesn't have a token account for this token yet. " +
          "Please ask them to create one first by initializing their wallet."
        );
      }

      const transferInstruction = createTransferInstruction(
        senderATA,
        recipientATA,
        wallet.publicKey,
        amount * 10 ** 9
      );

      const transaction = new Transaction().add(transferInstruction);
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      setSuccess(`✅ Sent ${amount} tokens to ${to}`);
      setTo('');
      setToken('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white text-center mb-4">Transfer Token</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient Address"
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
        />
        <input
          type="number"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Amount"
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={transferToken}
          className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors"
        >
          Transfer Token
        </button>
        {error && <p className="text-red-400 text-center mt-3">{error}</p>}
        {success && <p className="text-green-400 text-center mt-3">{success}</p>}
      </div>
    </div>
  );
};