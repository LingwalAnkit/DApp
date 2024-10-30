import { useWallet , useConnection } from "@solana/wallet-adapter-react";

export const Balance = () => {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function getBalance() {
        if(wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerText = balance/1e9;
        }
    }
    getBalance();
    return (
        <div className="flex items-center justify-center mt-4">
            <p className="text-lg font-semibold">Balance: <span id="balance" className="text-lg font-semibold"></span> </p>
        </div>
    )
}