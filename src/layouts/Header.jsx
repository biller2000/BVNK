import ButtonPrimary from "../components/ButtonPrimary";
import { useAccount, useConnect } from "wagmi";
import useShortenAddress from "../hooks/useShortenAddress";
import { injected } from "wagmi/connectors";
import { useCallback } from "react";
import showToast from "../utils/showToast";

const Header = () => {
  const { connect } = useConnect();
  const { address, isConnecting, isReconnecting, isConnected } = useAccount();
  const shortenedAddress = useShortenAddress(address);

  const onClickConnect = useCallback(() => {
    connect({ connector: injected(), chainId: 56 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCopyAddress = useCallback(() => {
    navigator.clipboard.writeText(address);
    showToast("success", "You copied wallet address", {
      progress: 0.1,
    });
  }, [address]);
  return (
    <nav className="flex items-center justify-between py-4 main-content">
      <a href={"/"} className="flex items-center justify-start gap-x-[6px]">
        <img className="h-6 sm:h-7 lg:h-8" src="/BVNK_logo.svg" alt="" />
      </a>
      <div className="flex items-center gap-x-2 lg:gap-x-4">
        <div className="cursor-pointer tooltip ">
          <img
            src="binance-smart-chain-bsc-logo-9C34053D61-seeklogo.png"
            className="w-8 rounded-full md:w-10"
            alt=""
          />
          <span className="tooltiptext">BNB Smart Chain</span>
        </div>
        <ButtonPrimary
          className="px-1 py-2 lg:px-6 lg:py-3 sm:min-w-[150px] min-w-[130px] font-medium"
          onClick={!isConnected ? onClickConnect : onClickCopyAddress}
          type={isConnected ? "gray" : "black"}
          loading={isConnecting || isReconnecting}
        >
          {!isConnected ? (
            "Connect Wallet"
          ) : (
            <>
              {shortenedAddress}
              <span className="tooltiptext">Click to copy</span>
            </>
          )}
        </ButtonPrimary>
      </div>
    </nav>
  );
};

export default Header;
