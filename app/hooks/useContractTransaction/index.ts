import { useState } from "react";
import { ContractFunctionRevertedError } from "viem";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  BaseError,
  useWaitForTransactionReceipt,
} from "wagmi";

export const useContractTransaction = (
  contractAddress: `0x${string}`,
  args: any,
  functionName: string,
  abi: any
) => {
  const { address, isConnected, connector } = useAccount();
  const [hash, setHash] = useState<`0x${string}`>();
  const [isTnxInProgress, setIsTnxInProgress] = useState(false);

  const {
    //Config,
    error: errorOnPrep,
    isLoading: isPrepLoading,
    isSuccess: isPrepSuccess,
    isError,
    status: prepStatus,
    refetch,
  } = useSimulateContract({
    address: contractAddress,
    abi,
    functionName,
    args,
  });

  const {
    writeContractAsync,
    error: errorOnWrit,
    isError: isContractWriteError,
    isPending: isContractWriteLoading,
    isSuccess: isContractWriteSuccess,
    data,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const makeTransaction = async () => {
    try {
      console.log("function name - ", functionName, "args ---", args);
      setIsTnxInProgress(true);
      const hash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName,
        args,
      });
      setHash(hash);
      console.log(
        "Transaction hash ",
        hash,
        "function name - ",
        functionName,
        "args ---",
        args
      );
      setIsTnxInProgress(false);

      return hash;
    } catch (error) {
      setIsTnxInProgress(false);
      console.log("errror  - ", error);
      throw error;
    }
  };

  return {
    isPrepLoading,
    isContractWriteLoading,
    isContractWriteSuccess,
    isTnxInProgress,
    errorOnWrit,
    errorOnPrep,
    makeTransaction,
    prepStatus,
    writeContractAsync,
    refetchConfig: refetch,
    isError,
    isConfirming,
    isConfirmed,
    isPrepSuccess,
  };
};
