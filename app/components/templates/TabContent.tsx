import React from "react";
import TabSection from "../organisms/TabSection";
import TabTable from "../organisms/TabTable";
import { transactions } from "../organisms/TableData";
import Heading3 from "../atoms/Heading3";

interface TabContentProps {
  balance: any;
  currency: string;
}

const TabContent: React.FC<TabContentProps> = ({ balance, currency }) => {
  return (
    <>
      <TabSection balance={balance} currency={currency} />
      <Heading3 text="Transaction Activities" />      
      <TabTable transactions={transactions} />
    </>
  );
};

export default TabContent;
