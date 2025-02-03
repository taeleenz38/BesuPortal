import { useMemo, memo, useState, useEffect } from "react";

import { FormInputWrapper } from "@/app/components/templates/FormInputWrapper";

import {
  UseConvertAmountFromBlockChain,
  UseGetERC20Decimal,
  useApproveSpenderERC20,
  usePurchase,
  useSetApprovalForAllERC1155,
} from "@/app/hooks/utilHooks";
import { useAccount } from "wagmi";
import { useQuery } from "urql";
import { GetERC20Balances } from "@/app/lib/graph-queries";

interface Props {
  listId: number;
  erc20: string;
  erc1155: string;
  unitPrice: number;
  amount: number;
  onCallBack: () => void;
}

export const ListedBuyComponent = memo(function (props: Props) {
  const [amount, setAmount] = useState<number>(0);
  const { address } = useAccount();
  const listId = props.listId;
  const contractAddress = process.env.MARKET_PLACE as `0x${string}`;
  const erc20Address = props.erc20 as `0x${string}`;
  const erc1155Address = props.erc1155 as `0x${string}`;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const decimal = UseGetERC20Decimal({ contractAddress: erc20Address });
  const [amountValidation, setAmountValidation] = useState("");
  const [hash, setTxHash] = useState<`0x${string}`>();

  function isValidAmount(amount: number) {
    const isValid = /^[0-9]+$/.test(amount.toString());

    return isValid && amount > 0;
  }

  const [results, executeQuery] = useQuery({
    query: GetERC20Balances,
    variables: { contractAddress: props.erc20, owner: address },
  });
  const ERC20Balances =
    (results?.data?.userERC20TokenBalances as Array<any>) ?? [];

  const ERC20Balance = ERC20Balances[0]?.balance;
  console.log("ERC20Balance", ERC20Balance);
  const convertedBalance = UseConvertAmountFromBlockChain({
    amount: ERC20Balance,
    decimal,
  });

  const handleAmount = (value: number, field: string) => {
    setAmount(value);
    const valid = isValidAmount(value);

    if (valid) {
      const purchasedBalance = value * props.unitPrice;
      if (value > props.amount) {
        setAmountValidation(
          "Quantity must be less than or equal to listed quantity"
        );
      } else if (purchasedBalance > parseFloat(convertedBalance)) {
        setAmountValidation(
          "Token balance is not enough performe the purchase"
        );
      } else {
        setAmountValidation("");
      }
    } else {
      setAmountValidation(`Please enter a valid ${field}`);
    }
  };

  const {
    isTnxInProgress,
    makeTransaction,
    errorOnPrep,
    prepStatus,
    refetchConfig,
    isConfirmed,
    isConfirming,
    isPrepSuccess,
  } = usePurchase({
    listId,
    quantity: amount,
    erc20: erc20Address,
    contractAddress,
    decimals: decimal,
  });

  console.log("isPreSuccess --- ", isPrepSuccess);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setAmount(0);
    setAmountValidation("");
    setTxHash("" as `0x${string}`);
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
        <FormInputWrapper label="Amount">
          <input
            type="number"
            placeholder="Eg, 20000"
            className={`input input-field-function`}
            onChange={(e) => {
              handleAmount(e.currentTarget.valueAsNumber, "amount");
            }}
            required
          />
          <p className="pl-1 text-xs font-light text-red-700 pt-2">
            {amountValidation}
          </p>
        </FormInputWrapper>
        <div className="flex flex-row justify-between pb-4">
          <button
            onClick={closeModal}
            className={`btn btn-navigation `}
            disabled={isTnxInProgress || isConfirming}
          >
            Cancel
          </button>
          <button
            className={
              !isPrepSuccess || amountValidation != ""
                ? `btn btn-disabled-function`
                : `btn btn-function ${
                    isTnxInProgress || isConfirming ? "loading" : ""
                  }`
            }
            disabled={!isPrepSuccess || amountValidation != ""}
          >
            Buy {isPrepSuccess}
          </button>
        </div>
      </div>
    </>
  );
});

ListedBuyComponent.displayName = "ListedBuyComponent";
