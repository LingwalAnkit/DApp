import { Balance } from "../Components/Balance/balance";
import { Transfer } from "../Components/Transfer/transfer";
import { SignMessage } from "../Components/Sign/sign";

export const SendSol = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="mb-16"><Balance /></div>
      <div className="flex flex-row ">
        <Transfer />
        <SignMessage />
      </div>
    </div>
  );
};

export default SendSol;
