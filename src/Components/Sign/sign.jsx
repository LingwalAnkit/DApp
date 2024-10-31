import { ed25519 } from '@noble/curves/ed25519';
import {useWallet} from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

export function SignMessage(){
    const {publicKey , signMessage} = useWallet();

    async function onClick(){
        if(!publicKey){
            throw new Error('Wallet not connected');
        }
        if(!signMessage){
            throw new Error('Wallet does not support message signing');
        }
        const message = document.getElementById('message').value;
        const encodedMessage = new TextEncoder().encode(message)
        const signature = await signMessage(encodedMessage)

        if(!ed25519.verify(signature , encodedMessage , publicKey.toBytes())){
            throw new Error('Invalid signature');
        }
     
        alert('success', `Message signature: ${bs58.encode(signature)}`)
    }

    return (
        <div className='flex flex-row gap-4 items-center justify-center mt-4'>
            <input type="text" id="message" placeholder="Enter a message" className='p-2 rounded-md border-2 border-gray-300' />
            <button onClick={onClick} className='px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors text-white'>Sign Message</button>
        </div>
    )
}
