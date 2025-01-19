import { useAccount, useConnect } from "wagmi";
import FormTransaction from "../components/FormTransaction";
// import { MousePointerClickIcon } from "lucide-react";
import ButtonPrimary from "../components/ButtonPrimary";
import { useCallback } from "react";
import { injected } from "wagmi/connectors";

const MainLayout = () => {
  const { isConnecting, isReconnecting, isConnected } = useAccount();
  const { connect } = useConnect();

  const onClickConnect = useCallback(() => {
    connect({ connector: injected(), chainId: 56 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative">
      <div
        className="absolute z-0 top-0 right-0 w-full h-screen lg:scale-110 object-center bg-no-repeat bg-[url('/Home_Hero_BG.webp')]"
        style={{
          backgroundPosition: "center",
        }}
      ></div>
      <div className="grid items-center mt-5 md:mt-[70px] lg:mt-10 lg:grid-cols-2 main-content">
        <div className="z-10 flex flex-col items-center lg:pr-12 lg:items-start">
          <h1 className="lg:text-left text-[34px] md:text-[44px] leading-[40px] lg:text-[54px] lg:leading-[60px] xl:text-[64px] xl:leading-[70px] font-bold lg:w-[calc(100%+100px)] text-center">
            Accelerating global money movement.
          </h1>
          <p className="my-3 text-base font-normal text-center lg:text-left md:mt-2 sm:text-xl text-text-gray lg:mb-6">
            Enterprise-grade payments infrastructure for stablecoins.{" "}
            {!isConnected && (
              <>
                <br />
                Connect the wallet in the list to participate in the allocation
                round
              </>
            )}
          </p>
          {!isConnected && (
            <ButtonPrimary
              className="px-1 py-3 lg:px-6 lg:py-4 sm:min-w-[180px] min-w-[150px] font-medium"
              onClick={onClickConnect}
              loading={isConnecting || isReconnecting}
            >
              Connect Wallet
            </ButtonPrimary>
          )}
          {/* <a
            href="https://signup.sandbox.bvnk.com/create-dev-account"
            className="flex items-center px-6 py-4 text-xl font-bold transition-all bg-white border rounded-lg border-darkBlue hover:border-primaryColor hover:text-primaryColor gap-x-[6px]"
          >
            <MousePointerClickIcon className="w-5" />
            Connect to Start building
          </a> */}
        </div>
        <div className="flex items-center justify-center relative w-full mt-[20px] md:mt-[35px]">
          <FormTransaction />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
