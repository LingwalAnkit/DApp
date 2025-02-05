import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const Airdrop = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const requestAirdrop = async () => {
        setError("");
        setSuccess("");
        
        try {
            if (!publicKey) throw new Error("❌ Wallet not connected!");

            const solAmount = parseFloat(amount);
            if (isNaN(solAmount) || solAmount <= 0) {
                throw new Error("⚠️ Please enter a valid SOL amount!");
            }

            setLoading(true);
            const signature = await connection.requestAirdrop(publicKey, solAmount * 1e9);
            await connection.confirmTransaction(signature, "confirmed");
            
            setSuccess(`✅ Airdropped ${solAmount} SOL to ${publicKey.toBase58()}`);
            setAmount(""); // Clear input after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg p-6 mt-40">
            <h2 className="text-xl font-semibold text-white text-center mb-4">Request Airdrop</h2>
            <div className="space-y-4">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter SOL amount"
                    disabled={loading}
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
                />
                <button
                    onClick={requestAirdrop}
                    disabled={loading}
                    className={`w-full p-3 text-white font-semibold rounded-md transition-colors ${
                        loading 
                        ? "bg-gray-600 cursor-not-allowed" 
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                    {loading ? "Requesting..." : "Request Airdrop"}
                </button>
                {error && <p className="text-red-400 text-center mt-3">{error}</p>}
                {success && <p className="text-green-400 text-center mt-3 break-words">{success}</p>}
            </div>
        </div>
    );
};