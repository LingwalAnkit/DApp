import { useWallet , useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export function TokenBalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    // Define your token mint address
    const TokenMintAddress = new PublicKey("Your Token Mint Address");

    async function fetchTokenBalance() {
        if (wallet.publicKey) {
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                wallet.publicKey,
                {
                    mint: TokenMintAddress
                }
            );
            
            // If i have token account more than 1
            if (tokenAccounts.value.length > 0) {
                const tokenAccountPubkey = tokenAccounts.value[0].pubkey; // Get the first token account index 0 
                const token = await connection.getTokenAccountBalance(tokenAccountPubkey);
                document.getElementById("token-balance").innerText = token.value.uiAmount;
            } else {
                document.getElementById("token-balance").innerText = "0";
            }
        }
    }
    fetchTokenBalance();
    return (
        <div className="flex items-center justify-center mt-4">
            <p className="text-lg font-semibold">Token Balance: <span id="token-balance" className="text-lg font-semibold"></span> </p>
        </div>
    )
}