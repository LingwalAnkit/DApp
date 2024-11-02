import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

export const TransferToken = () => {
    const { connection } = useConnection();
    const wallet = useWallet();

    async function transferToken() {
        try {
            let to = document.getElementById('recipient').value;
            let amount = document.getElementById('amount').value;
            
            // Replace this with your token's mint address
            const mint = new PublicKey(import.meta.env.VITE_TOKEN_MINT_ADDRESS);
            
            // Get the token accounts for sender and receiver
            const senderATA = await getAssociatedTokenAddress(mint, wallet.publicKey);
            const recipientATA = await getAssociatedTokenAddress(mint, new PublicKey(to));

            // Check if recipient's ATA exists
            const recipientATAInfo = await connection.getAccountInfo(recipientATA);

            // If recipient's ATA doesn't exist, throw error
            if (!recipientATAInfo) {
                throw new Error(
                    "Recipient doesn't have a token account for this token yet. " +
                    "Please ask them to create one first by initializing their wallet " +
                    "with a small amount of SOL and creating an Associated Token Account."
                );
            }

            // Create transfer instruction
            const transferInstruction = createTransferInstruction(
                senderATA,
                recipientATA,
                wallet.publicKey,
                amount * (10 ** 9) // Adjust decimals according to your token
            );

            const transaction = new Transaction().add(transferInstruction);
            
            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);
            
            alert(`Sent ${amount} tokens to ${to}`);
        } catch (error) {
            console.error(error);
            alert('Error sending tokens: ' + error.message);
        }
    }

    return (
        <div className='flex flex-row gap-8 items-center justify-center mt-4'>
            <input type="text" id="recipient" placeholder="Recipient Address" className='p-2 rounded-md border-2 border-gray-300' />
            <input type="number" id="amount" placeholder="Amount" className='p-2 rounded-md border-2 border-gray-300' />
            <button onClick={transferToken} className='text-white px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors'>Transfer Token</button>
        </div>
    )
}



