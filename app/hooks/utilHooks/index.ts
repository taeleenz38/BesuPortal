import { useEffect, useState } from "react";
import { useContractTransaction } from "@/app/hooks/useContractTransaction";
import REQUEST_MANAGER_ABI from "@/app/artifacts/RequestManager.json";
import MYtoken from "@/app/artifacts/ERC20Token.json";
import ERC1155 from "@/app/artifacts/ERC1155Token.json";
import DeploymentManager from "@/app/artifacts/DeployManager.json";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { error } from "console";
import MarketPlace from "@/app/artifacts/MarketPlace.json";
import SanctionList from "@/app/artifacts/SanctionList.json";
import { ethers } from "ethers";
import { useContractTransactionRead } from "@/app/hooks/useContractTransactionRead";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils.js";
import { BigNumber } from "bignumber.js";

type MintAssetHookParameters = {
  onSuccess?: () => void;
  onError?: (err: any) => void;
};

export const useRequestAsset = ({
  onSuccess,
  onError,
}: MintAssetHookParameters) => {
  const [url, setUrl] = useState<string | undefined>();
  const contractAddress: any = process.env.REQUEST_MGR_ADDRESS;
  const res = useContractTransaction(
    contractAddress,
    [url, 1],
    "request",
    REQUEST_MANAGER_ABI.abi
  );
  useEffect(() => {
    if (res.prepStatus === "success" && url) {
      res.makeTransaction().then(onSuccess).catch(onError);
    }
  }, [res.prepStatus, url]);
  return {
    ...res,
    setUrl,
  };
};

export const useERC20Details = ({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) => {
  const { address } = useAccount();
  const { data, isError, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "name",
      },
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "symbol",
      },
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "totalSupply",
      },
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "balanceOf",
        args: [address],
      },
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "decimals",
      },
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "paused",
      },
      {
        address: contractAddress,
        abi: MYtoken.abi,
        functionName: "version",
      },
    ],
  });

  let tokenData: any = {
    name: data?.[0]?.result,
    symbol: data?.[1]?.result,
    supply: data?.[2]?.result,
    balance: data?.[3]?.result,
    decimal: data?.[4]?.result,
    paused: data?.[5]?.result,
    version: data?.[6]?.result,
  };
  return { details: tokenData, isLoading, isError, refetch };
};

export const useERC1155Details = ({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) => {
  const { data, isError, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: ERC1155.abi,
        functionName: "tokenName",
      },
      {
        address: contractAddress,
        abi: ERC1155.abi,
        functionName: "paused",
      },
      {
        address: contractAddress,
        abi: ERC1155.abi,
        functionName: "version",
      },
    ],
  });

  let tokenData: any = {
    tokenType: data?.[0]?.result,
    paused: data?.[1]?.result,
    version: data?.[2]?.result,
  };
  return { details: tokenData, isLoading, isError, refetch };
};

export const useCreateERC20 = ({
  contractAddress,
  args,
}: {
  contractAddress: `0x${string}`;
  args: any[];
}) => {
  return useContractTransaction(
    contractAddress,
    args,
    "deployERC20",
    DeploymentManager.abi
  );
};

export const useCreateERC1155 = ({
  contractAddress,
  args,
}: {
  contractAddress: `0x${string}`;
  args: any[];
}) => {
  return useContractTransaction(
    contractAddress,
    args,
    "deployERC1155",
    DeploymentManager.abi
  );
};

export const useMintERC20 = ({
  to,
  quantity,
  contractAddress,
  decimal,
}: {
  to: string;
  quantity: number;
  decimal: number;
  contractAddress: `0x${string}`;
}) => {
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });

  return useContractTransaction(
    contractAddress,
    [to, convertedValue],
    "mint",
    MYtoken.abi
  );
};

export const useMintERC1155 = ({
  uri,
  contractAddress,
  to,
  amount,
}: {
  uri: string;
  to: string;
  contractAddress: `0x${string}`;
  amount: number;
}) => {
  return useContractTransaction(
    contractAddress,
    [to, amount, uri, "0x"],
    "mint",
    ERC1155.abi
  );
};

export const useSafeTransferFromERC1155 = ({
  contractAddress,
  from,
  to,
  tokenId,
  amount,
}: {
  from: string;
  to: string;
  contractAddress: `0x${string}`;
  tokenId: number;
  amount: number;
}) => {
  return useContractTransaction(
    contractAddress,
    [from, to, tokenId, amount, "0x"],
    "safeTransferFrom",
    ERC1155.abi
  );
};

export const useBurnERC1155 = ({
  contractAddress,
  tokenId,
  amount,
}: {
  contractAddress: `0x${string}`;
  tokenId: number;
  amount: number;
}) => {
  return useContractTransaction(
    contractAddress,
    [tokenId, amount],
    "burn",
    ERC1155.abi
  );
};

export const useSetApprovalForAllERC1155 = ({
  contractAddress,
  spender,
}: // approved,
{
  spender: string;
  contractAddress: `0x${string}`;
  // approved: boolean;
}) => {
  return useContractTransaction(
    contractAddress,
    [spender, true],
    // [spender, approved, []],
    "setApprovalForAll",
    ERC1155.abi
  );
};

export const useIsApprovedForAll = (
  contractAddress: `0x${string}`,
  owner: string,
  spender: string
) => {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    functionName: "isApprovedForAll",
    args: [owner, spender],
    abi: ERC1155.abi,
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const useBurnERC20 = ({
  quantity,
  contractAddress,
  decimal,
}: {
  quantity: number;
  decimal: number;
  contractAddress: `0x${string}`;
}) => {
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });
  return useContractTransaction(
    contractAddress,
    [convertedValue],
    "burn",
    MYtoken.abi
  );
};

export const usePauseERC20 = ({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) => {
  return useContractTransaction(contractAddress, [], "pause", MYtoken.abi);
};

export const useTransferERC20 = ({
  to,
  quantity,
  contractAddress,
  decimal,
}: {
  to: string;
  quantity: number;
  contractAddress: `0x${string}`;
  decimal: number;
}) => {
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });
  return useContractTransaction(
    contractAddress,
    [to, convertedValue],
    "transfer",
    MYtoken.abi
  );
};

export const useApproveSpenderERC20 = ({
  to,
  quantity,
  contractAddress,
  decimal,
}: {
  to: string;
  quantity: number;
  contractAddress: `0x${string}`;
  decimal: number;
}) => {
  console.log("quantity Approve", quantity + " " + decimal);
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });
  console.log("convertedValue", convertedValue);
  return useContractTransaction(
    contractAddress,
    [to, convertedValue],
    "approve",
    MYtoken.abi
  );
};

export const useTransferFromERC20 = ({
  sender,
  quantity,
  to,
  contractAddress,
  decimal,
}: {
  sender: string;
  quantity: number;
  to: string;
  contractAddress: `0x${string}`;
  decimal: number;
}) => {
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });
  return useContractTransaction(
    contractAddress,
    [sender, to, convertedValue],
    "transferFrom",
    MYtoken.abi
  );
};

export const useAddAddressToSanctionList = ({
  to,
  contractAddress,
}: {
  to: string;
  contractAddress: `0x${string}`;
}) => {
  return useContractTransaction(
    contractAddress,
    [to],
    "addAddressToSanctionList",
    SanctionList.abi
  );
};

export const useRemoveAddressSanctionERC20 = ({
  to,
  contractAddress,
}: {
  to: string;
  contractAddress: `0x${string}`;
}) => {
  return useContractTransaction(
    contractAddress,
    [to],
    "removeAddressFromSanctionList",
    SanctionList.abi
  );
};

export const useViewAddressSanctionERC20 = (
  contractAddress: `0x${string}`,
  owner: string
) => {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: MYtoken.abi,
    functionName: "isOnSanctionList",
    args: [owner],
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const UnpauseERC20 = ({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) => {
  return useContractTransaction(contractAddress, [], "unpause", MYtoken.abi);
};

export const IncreseAllowanceERC20 = ({
  contractAddress,
  spender,
  quantity,
  decimal,
}: {
  contractAddress: `0x${string}`;
  spender: string;
  quantity: number;
  decimal: number;
}) => {
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });
  return useContractTransaction(
    contractAddress,
    [spender, convertedValue],
    "increaseAllowance",
    MYtoken.abi
  );
};

export const DecreseAllowanceERC20 = ({
  contractAddress,
  spender,
  quantity,
  decimal,
}: {
  contractAddress: `0x${string}`;
  spender: string;
  quantity: number;
  decimal: number;
}) => {
  const convertedValue = useConvertAmountToBlockChain({ quantity, decimal });
  return useContractTransaction(
    contractAddress,
    [spender, convertedValue],
    "decreaseAllowance",
    MYtoken.abi
  );
};

export const useBurnSanctionBalanceERC20 = ({
  to,
  contractAddress,
}: {
  to: string;
  contractAddress: `0x${string}`;
}) => {
  return useContractTransaction(
    contractAddress,
    [to],
    "burnSanctionedBalance",
    MYtoken.abi
  );
};

export const useBurnSanctionBalanceERC1155 = ({
  contractAddress,
  to,
  tokenId,
}: {
  to: string;
  tokenId: number;
  contractAddress: `0x${string}`;
}) => {
  return useContractTransaction(
    contractAddress,
    [to, tokenId],
    "burnSanctionedBalance",
    ERC1155.abi
  );
};

export const useAllowanceERC20 = (
  contractAddress: `0x${string}`,
  owner: string,
  spender: string
) => {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: MYtoken.abi,
    functionName: "allowance",
    args: [owner, spender],
  });

  return {
    data,
    isError,
    isLoading,
  };
};

export const useRescueERC20FromERC20 = ({
  to,
  amount,
  contractAddress,
  decimal,
}: {
  to: string;
  amount: number;
  contractAddress: `0x${string}`;
  decimal: number;
}) => {
  const erc20Decimal = UseGetERC20Decimal({
    contractAddress: to as `0x${string}`,
  });

  const convertedValue = useConvertAmountToBlockChain({
    quantity: amount,
    decimal: erc20Decimal,
  });
  return useContractTransaction(
    contractAddress,
    [to, convertedValue],
    "rescueERC20",
    MYtoken.abi
  );
};

export const useRescueERC20FromERC1155 = ({
  to,
  amount,
  contractAddress,
}: {
  to: string;
  amount: number;
  contractAddress: `0x${string}`;
}) => {
  const decimal = UseGetERC20Decimal({ contractAddress: to as `0x${string}` });
  const convertedValue = useConvertAmountToBlockChain({
    quantity: amount,
    decimal,
  });
  console.log("convertedValue+decimal", convertedValue, decimal);
  return useContractTransaction(
    contractAddress,
    [to, convertedValue],
    "rescueERC20",
    MYtoken.abi
  );
};

export const useListMarketItem = ({
  erc1155,
  erc20,
  tokenId,
  price,
  quantity,
  contractAddress,
}: {
  erc1155: `0x${string}`;
  erc20: `0x${string}`;
  tokenId: number;
  price: number;
  quantity: number;
  contractAddress: `0x${string}`;
}) => {
  const decimal = UseGetERC20Decimal({ contractAddress: erc20 });

  const convertedValue = useConvertAmountToBlockChain({
    quantity: price,
    decimal,
  });
  console.log("convertedValue", convertedValue);
  return useContractTransaction(
    contractAddress,
    [erc1155, erc20, tokenId, convertedValue, quantity],
    "listMarketItem",
    MarketPlace.abi
  );
};

export const useConvertAmountToBlockChain = ({
  quantity,
  decimal,
}: {
  quantity: number;
  decimal: number;
}) => {
  if (isNaN(quantity) || quantity <= 0) {
    quantity = 0;
  }

  // const convertedValue = new BigNumber(quantity).times(
  //   new BigNumber(10).pow(decimal)
  // );
  const convertedValue = ethers.utils.parseUnits(
    quantity.toFixed(decimal),
    decimal
  );

  //return convertedValue.toString(10);
  return convertedValue;
};

export const UseConvertAmountFromBlockChain = ({
  amount,
  decimal,
}: {
  amount: number;
  decimal: number;
}) => {
  let _amount = amount;

  if (_amount === undefined) {
    _amount = 0;
  }

  console.log("amount --- ? ", amount);
  console.log("amount to string--- ? ", _amount);
  const formatedValue = ethers.utils.formatUnits(
    ethers.BigNumber.from(_amount.toString()),
    decimal
  );

  return formatedValue;
};

export const UseGetERC20Decimal = ({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) => {
  const { details, isError, isLoading, refetch } = useERC20Details({
    contractAddress,
  });

  return details.decimal;
};

export const useSanctionManager = () => {
  const { address } = useAccount();
  const sanctionListAddress = process.env.SANCTIONLIST as `0x${string}`;

  const hashRole = keccak256(toUtf8Bytes("SANCTION_MANAGER_ROLE"));

  const { data, isError, isLoading } = useContractTransactionRead(
    sanctionListAddress,
    [hashRole, address],
    "hasRole",
    SanctionList.abi
  );

  return { data };
};

export const useHasRole = (
  contractAddress: `0x${string}`,
  tokenStandard: string,
  role: string
) => {
  const { address } = useAccount();

  const hashRole = keccak256(toUtf8Bytes(role));
  let abi;
  if (tokenStandard === "ERC20") {
    abi = MYtoken.abi;
  } else if (tokenStandard === "ERC1155") {
    abi = ERC1155.abi;
  }

  const { data, isError, isLoading } = useContractTransactionRead(
    contractAddress,
    [hashRole, address],
    "hasRole",
    abi
  );

  return { data };
};

export const usePurchase = ({
  listId,
  quantity,
  erc20,
  contractAddress,
  decimals,
}: {
  listId: number;
  quantity: number;
  erc20: string;
  contractAddress: `0x${string}`;
  decimals: number;
}) => {
  return useContractTransaction(
    contractAddress,
    [listId, quantity, erc20],
    "purchase",
    MarketPlace.abi
  );
};
