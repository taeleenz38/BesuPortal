import {
  UseConvertAmountFromBlockChain,
  UseGetERC20Decimal,
} from "@/app/hooks/utilHooks";
import { useState, useEffect } from "react";

type UserERC20TokenBalance = {
  id: string;
  owner: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  contractAddress: string;
  balance: number;
};

interface Props {
  item: UserERC20TokenBalance[];
  title: string;
  onClick: (token: UserERC20TokenBalance) => void;
}

const DashboardTable = (props: Props) => {
  const [tokens, setTokens] = useState<UserERC20TokenBalance[]>(props.item);
  const { onClick } = props;

  useEffect(() => {
    if (props.item.length) {
      setTokens(props.item);
    } else {
      console.log("No Tokens");
    }
  }, [props.item]);

  const getFormattedValue: any = (unitPrice: number, decimal: number) => {
    const formattedValue = UseConvertAmountFromBlockChain({
      amount: unitPrice,
      decimal,
    });
    return formattedValue;
  };

  return (
    <div className="flex flex-col mx-auto p-6 justify-center items-center">
      <div className="w-11/12 max-h-[420px] overflow-y-auto">
        <div className="bg-white p-4 rounded-lg border-2">
          <table className="divide-y divide-border-[255,255,255,0.8] table w-full">
            <tr className="labels">
              <th className="bg-white text-base">Token Name</th>
              <th className="bg-white text-base">Token Symbol</th>
              <th className="bg-white text-base">Token Balance</th>
            </tr>

            <>
              {tokens.map((token) => (
                <tr
                  key={token.id}
                  className="bg-white text-center font-normal text-[#808080] hover:bg-opacity-30 rounded-none"
                  onClick={() => onClick(token)}
                >
                  <td>{token.tokenName}</td>
                  <td>{token.tokenSymbol}</td>
                  <td>
                    {getFormattedValue(token.balance, token.tokenDecimal)}
                  </td>
                </tr>
              ))}
            </>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
