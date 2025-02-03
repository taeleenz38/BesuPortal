import { useReadContract } from "wagmi";
import { keccak256 } from "js-sha3";

export const useContractTransactionRead = (
  contractAddress: `0x${string}`,
  args: any,
  functionName: string,
  abi: any
) => {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi,
    functionName,
    args,
  });

  return {
    data,
    isError,
    isLoading,
  };
};
