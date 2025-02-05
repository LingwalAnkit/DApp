import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const Balance = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                try {
                    const bal = await connection.getBalance(publicKey);
                    setBalance(bal / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                }
            }
        };
        fetchBalance();
    }, [publicKey, connection]);

    return (
        <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white text-center mb-4">SOL Balance</h2>
            <p className="text-2xl font-bold text-white text-center">
                {balance !== null ? `${balance.toFixed(4)} SOL` : "Connect Wallet"}
            </p>
        </div>
    );
};