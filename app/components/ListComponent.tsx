import { FormInputWrapper } from "@/app/components/templates/FormInputWrapper";
import {
  useERC20Details,
  useListMarketItem,
  useSetApprovalForAllERC1155,
} from "@/app/hooks/utilHooks";
import { memo, useCallback, useEffect, useState } from "react";

type Token = {
  tokenName: string;
  tokenSymbol: string;
  erc20Token: `0x${string}`;
};

interface Props {
  erc1155: `0x${string}`;
  tokenId: number;
  tokens: Token[];
  contractAddress: `0x${string}`;
  onCallBack: () => void;
  onTransactionSuccess?: () => void;
  onTransactionFailed?: () => void;
}
function isValidAmount(amount: number) {
  return isFinite(amount) && amount > 0;
}

export const ListComponent = memo(function (props: Props) {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<`0x${string}`>("0x00");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [contractAddress, setContractAddress] = useState<`0x${string}`>("0x00");
  const [tokenId, setTokenId] = useState<number>(0);
  const [erc1155, setErc1155] = useState<`0x${string}`>("0x00");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [decimal, setDecimal] = useState<number>(0);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [amountValidationMessage, setAmountValidationMessage] =
    useState<string>("");
  const [qtyValidationMessage, setQtyValidationMessage] = useState<string>("");
  const [hash, setTxHash] = useState<`0x${string}`>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { details, isError, isLoading, refetch } = useERC20Details({
    contractAddress,
  });

  function isValidAddress(address: string) {
    const addressPattern = /^0x[a-fA-F0-9]{40}$/;
    return addressPattern.test(address);
  }

  function isValidAmount(amount: number) {
    return isFinite(amount) && amount > 0;
  }

  useEffect(() => {
    setTokens(props.tokens);
    setContractAddress(props.contractAddress);
    setErc1155(props.erc1155);
    setTokenId(props.tokenId);
  }, [props.tokens]);

  const {
    isTnxInProgress,
    makeTransaction,
    errorOnPrep,
    isPrepSuccess,
    isConfirmed,
    isConfirming,
  } = useListMarketItem({
    erc1155,
    erc20: currency,
    tokenId,
    price: parseFloat(price),
    quantity,
    contractAddress,
  });

  const {
    isContractWriteSuccess: isContractWriteSuccessERC1155,
    isTnxInProgress: isTnxInProgressERC1155,
    makeTransaction: makeTransactionERC1155,
    writeContractAsync: writeAsyncERC1155,
    errorOnPrep: errorOnPrepERC1155,
  } = useSetApprovalForAllERC1155({
    spender: contractAddress,
    contractAddress: erc1155,
  });

  console.log("Token ID .. > ", tokenId);

  const resetForm = useCallback(() => {
    setQuantity(0);
    setPrice("");
    setCurrency("0x00");
    setTxHash("" as `0x${string}`);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleAmountChange = (newAmount: number) => {
    setQuantity(newAmount);
    if (newAmount === 0 || !isValidAmount(newAmount)) {
      setAmountValidationMessage("Please enter a valid amount.");
    } else {
      setAmountValidationMessage("");
    }

    validateForm();
  };

  const handleQtyChange = (newAmount: number) => {
    setQuantity(newAmount);
    if (newAmount === 0 || !isValidAmount(newAmount)) {
      setQtyValidationMessage("Please enter a valid quantity.");
    } else {
      setQtyValidationMessage("");
    }

    validateForm();
  };

  const handlePriceChange = (newAmount: string) => {
    const roundedAmount = parseFloat(newAmount).toFixed(4);
    setPrice(roundedAmount);
    const convertedAmount = parseFloat(roundedAmount);
    if (convertedAmount === 0 || !isValidAmount(convertedAmount)) {
      setAmountValidationMessage("Please enter a valid amount.");
    } else {
      setAmountValidationMessage("");
    }

    validateForm();
  };

  const validateForm = () => {
    const isAmountValid = quantity !== 0 && amountValidationMessage === "";
    setIsFormValid(isAmountValid);
  };

  console.log("currency", currency);
  return (
    <>
      <form>
        <div className="flex flex-col py-8">
          <FormInputWrapper label="Quantity">
            <input
              type="number"
              placeholder="Eg, 200"
              className={`input input-field-function`}
              onChange={(e) => handleQtyChange(parseInt(e.target.value))}
              required
            />
            {qtyValidationMessage && (
              <p className="pl-1 text-xs font-light text-red-700 pt-2">
                {qtyValidationMessage}
              </p>
            )}
          </FormInputWrapper>
          <FormInputWrapper label="Unit Price">
            <input
              type="string"
              placeholder="Eg, 20000"
              className={`input input-field-function`}
              onChange={(e) => handlePriceChange(e.target.value)}
              required
            />
            {amountValidationMessage && (
              <p className="pl-1 text-xs font-light text-red-700 pt-2">
                {amountValidationMessage}
              </p>
            )}
          </FormInputWrapper>
          <FormInputWrapper label="Currency">
            <select
              className="select input-round input-field "
              required
              onChange={(e) => {
                setCurrency(e.target.value as `0x${string}`);
              }}
            >
              <option value="default" selected={true} disabled>
                Select A Currency
              </option>
              {tokens.map((Token) => {
                return (
                  <option key={Token.erc20Token} value={Token.erc20Token}>
                    {Token.tokenName}
                  </option>
                );
              })}
            </select>
          </FormInputWrapper>
        </div>
        <div className="flex flex-row justify-between pb-4">
          <button
            className={`btn btn-navigation`}
            type="button"
            disabled={isTnxInProgress || isTnxInProgressERC1155 || isConfirming}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            disabled={!isPrepSuccess}
            className={`btn btn-navigation ${
              isTnxInProgress || isTnxInProgressERC1155 || isConfirming
                ? "loading"
                : ""
            }`}
            type="submit"
          >
            List
          </button>
        </div>
      </form>
    </>
  );
});

ListComponent.displayName = "ListComponent";
ListComponent.displayName = "ListComponent";
