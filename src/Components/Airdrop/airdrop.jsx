import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

export const Airdrop = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const requestAirdrop = async () => {
        if (!publicKey) {
            alert("Wallet not connected!");
            return;
        }

        const solAmount = parseFloat(amount);
        if (isNaN(solAmount) || solAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            setLoading(true);
            const signature = await connection.requestAirdrop(publicKey, solAmount * 1e9);
            await connection.confirmTransaction(signature, "confirmed");
            alert(`✅ Airdropped ${solAmount} SOL to ${publicKey.toBase58()}`);
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("❌ Airdrop failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center p-6 bg-gray-900 rounded-xl shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold text-white">Solana Airdrop</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter SOL amount"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={requestAirdrop}
                className={`w-full px-6 py-2 text-white rounded-lg transition-colors 
                    ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={loading}
            >
                {loading ? "Requesting..." : "Request Airdrop"}
            </button>
        </div>
    );
};
