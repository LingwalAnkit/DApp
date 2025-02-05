import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey } from "@solana/web3.js";

export const Transfer = () => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleTransfer = async () => {
        setError("");
        setSuccess("");

        try {
            if (!publicKey) throw new Error("❌ Wallet not connected!");
            if (!recipient) throw new Error("⚠️ Please enter recipient address!");
            if (!amount || isNaN(amount)) throw new Error("⚠️ Please enter a valid amount!");

            const recipientPubKey = new PublicKey(recipient);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubKey,
                    lamports: amount * LAMPORTS_PER_SOL
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);
            setSuccess(`✅ Transfer successful! Signature: ${signature}`);
            setAmount("");
            setRecipient("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white text-center mb-4">Transfer SOL</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Recipient Address"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount in SOL"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
                />
                <button
                    onClick={handleTransfer}
                    className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors"
                >
                    Send SOL
                </button>
                {error && <p className="text-red-400 text-center mt-3">{error}</p>}
                {success && <p className="text-green-400 text-center mt-3 break-words">{success}</p>}
            </div>
        </div>
    );
};