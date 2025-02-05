import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const Balance = () => {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                try {
                    const bal = await connection.getBalance(publicKey);
                    setBalance(bal / 1e9); // Convert lamports to SOL
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                }
            }
        };

        fetchBalance();
    }, [publicKey, connection]); // Re-run when wallet changes

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-white">SOL Balance</h2>
            <p className="text-lg font-medium text-gray-300 mt-2">
                {balance !== null ? `${balance} SOL` : "Connect Wallet"}
            </p>
        </div>
    );
};
