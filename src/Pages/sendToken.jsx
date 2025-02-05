import { TokenBalance } from "../Components/TokenBalance/tokenBalance";
import { TransferToken } from "../Components/TransferToken/transferToken"

export function SendToken() {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <TokenBalance />
        <TransferToken />
      </div>
    );
  }
  
  export default SendToken;