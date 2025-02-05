import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";

export const SignMessage = () => {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");
    const [signature, setSignature] = useState(null);
    const [error, setError] = useState(null);

    const handleSign = async () => {
        setError(null);
        setSignature(null);

        try {
            if (!publicKey) throw new Error("❌ Wallet not connected!");
            if (!signMessage) throw new Error("⚠️ Your wallet does not support message signing.");
            if (!message) throw new Error("⚠️ Please enter a message to sign.");

            const encodedMessage = new TextEncoder().encode(message);
            const signatureBytes = await signMessage(encodedMessage);
            const encodedSignature = bs58.encode(signatureBytes);

            if (!ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes())) {
                throw new Error("❌ Invalid signature, verification failed!");
            }

            setSignature(encodedSignature);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white text-center mb-2 p-4">Sign Message</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter a message"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500"
                />
                <button
                    onClick={handleSign}
                    className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors"
                >
                    Sign Message
                </button>
                {error && <p className="text-red-400 text-center mt-3">{error}</p>}
                {signature && (
                    <p className="text-green-400 text-center mt-3 break-words">
                        ✅ Signature: <span className="text-sm">{signature}</span>
                    </p>
                )}
            </div>
        </div>
    );
};