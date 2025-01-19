import FormSubmit from "./FormSubmit";
import { useAccount } from "wagmi";
// import useShortenAddress from "../hooks/useShortenAddress";
// import { USDT_CONTRACT } from "../common/constant";
// import { useChainId } from "wagmi";
import { CheckIcon } from "lucide-react";

const FormTransaction = () => {
  // const chainId = useChainId();
  const { isConnected } = useAccount();
  // const shortenedAddress = useShortenAddress(USDT_CONTRACT[chainId]);
  return (
    <div
      className={`flex flex-col w-full py-5 rounded-lg ${
        !isConnected && "relative overflow-hidden"
      } border border-grayColor lg:w-[70%] sm:w-[65%] bg-white shadow-2xl px-6`}
    >
      {/* <p className="px-6 text-lg font-medium">Send USDT</p>
      <div className="h-[1px] w-full bg-overlayColor mt-2"></div> */}
      {!isConnected && (
        <>
          <div className="absolute inset-0 z-10 backdrop-filter backdrop-blur-md"></div>
          <h1 className="absolute z-20 w-full px-5 text-[26px] font-bold text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            Please connect your wallet
          </h1>
        </>
      )}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center p-2 rounded-md w-fit gap-x-1 bg-primaryColor bg-opacity-15 text-textPrimaryColor">
            <CheckIcon className="text-sm font-bold md:text-base" />
            <p className="text-sm font-bold capitalize md:text-base">
              comply advantage
            </p>
          </div>
          <h5 className="text-[25px] md:text-[30px] font-bold">$50.000</h5>
        </div>
        <img src="ic_tether.png" className="w-8 md:w-10" alt="" />
      </div>
      <p className="text-sm text-gray-400">Maximum funding goal reached</p>
      <div className="w-full h-2 mt-3 overflow-hidden rounded-md bg-primaryColor bg-opacity-40">
        <div className="h-full w-[95%] bg-primaryColor" />
      </div>
      <div className="flex flex-col mt-5 gap-y-2">
        <div className="flex justify-between">
          <p className="opacity-50">Price per token</p>
          <p>$0.005</p>
        </div>

        <div className="flex justify-between">
          <p className="opacity-50">Unlock vesting</p>
          <p>100%TGE</p>
        </div>
        {/* <div className="flex justify-between w-full p-[14px] border-none sm:p-4 rounded-large bg-overlayColor">
          <div className="flex items-center w-auto gap-x-2 lg:gap-x-3">
            <img className="w-14" src="ic_tether.png" alt={"USDT"} />
            <div className="flex flex-col">
              <h4 className="text-lg font-bold sm:text-xl">USDT</h4>
              <p className="text-base font-light sm:text-lg">Tether</p>
            </div>
          </div>
          <div className="relative flex items-center justify-end">
            <p className="text-lg opacity-50 sm:text-xl">{shortenedAddress}</p>
          </div>
        </div> */}
        <div className="flex flex-col">
          <p className="opacity-50">Allocation</p>
          <FormSubmit />
        </div>
      </div>
    </div>
  );
};

export default FormTransaction;
