import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState(null);

  async function onClick() {
    setError(null); // Reset error state before executing

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
      setSignature(null);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-white">Sign a Message</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
        className="p-2 w-full rounded-md border-2 border-gray-300 mt-4 bg-gray-700 text-white placeholder-gray-400"
      />
      <button
        onClick={onClick}
        className="px-4 py-2 mt-4 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold"
      >
        Sign Message
      </button>
      {error && <p className="mt-3 text-red-400">{error}</p>}
      {signature && (
        <p className="mt-3 text-green-400 break-words text-center">
          ✅ Signature: <span className="text-sm">{signature}</span>
        </p>
      )}
    </div>
  );
}
