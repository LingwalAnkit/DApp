import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import { PublicKey , SystemProgram , LAMPORTS_PER_SOL , Transaction } from '@solana/web3.js';

export function Transfer(){
    const wallet = useWallet();
    const {connection} = useConnection();

    async function transfer(){
        let to  = document.getElementById('to').value;
        let amount = document.getElementById('amount').value;
        const transaction = new Transaction()
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubKey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }))
        await wallet.sendTransaction(transaction , connection)
        alert('Amount' + amount + 'SOL sent to ' + to);
    }
    return(
        <div className='flex flex-row gap-8 items-center justify-center mt-4'>
            <input 
                type="text" 
                name="to" 
                id="to" 
                placeholder="To" 
                className='p-2 rounded-md border-2 border-gray-300' 
            />
            <input 
                type="text" 
                name="amount" 
                id="amount" 
                placeholder="Amount" 
                className='w-24 p-2 rounded-md border-2 border-gray-300 text-center' 
            />
            <button 
            onClick={transfer} 
            className='px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors text-white'>
                Transfer
            </button>
        </div>
    )
}