import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { useState } from 'react';

export function Transfer() {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    async function transfer() {
        try {
            if (!publicKey) {
                alert('Please connect your wallet first!');
                return;
            }

            // Validate recipient address
            let toPublicKey;
            try {
                toPublicKey = new PublicKey(to);
            } catch (error) {
                alert('Invalid recipient address');
                return;
            }

            // Validate amount
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                alert('Please enter a valid amount');
                return;
            }

            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: toPublicKey, // Fixed property name
                    lamports: parsedAmount * LAMPORTS_PER_SOL
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');
            
            alert(`${amount} SOL sent to ${to}\nTransaction signature: ${signature}`);
            
            // Clear form
            setTo('');
            setAmount('');
            
        } catch (error) {
            console.error('Error:', error);
            alert(`Transaction failed: ${error.message}`);
        }
    }

    return (
        <div className='flex flex-row gap-8 items-center justify-center mt-4'>
            <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipient Address"
                className='p-2 rounded-md border-2 border-gray-300'
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className='w-24 p-2 rounded-md border-2 border-gray-300 text-center'
                min="0"
                step="any"
            />
            <button
                onClick={transfer}
                disabled={!publicKey}
                className='px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
                Transfer
            </button>
        </div>
    );
}