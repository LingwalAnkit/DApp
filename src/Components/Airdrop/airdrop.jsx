import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

export const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();  // Destructure to get the connection object

    async function requestairdrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * 1e9);  // Convert SOL to lamports
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <input 
                type="text" 
                id="amount" 
                placeholder="Amount" 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                onClick={requestairdrop}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Request Airdrop
            </button>
        </div>
    )
}