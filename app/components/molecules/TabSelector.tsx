"use client";
import React, { useTransition, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import TabButton from "../atoms/TabButton";
import TabContent from "../templates/TabContent";
import { getBalance } from "@wagmi/core";
import { config } from "@/config";

const TabSelector = () => {
  const [tab, setTab] = useState("AUD");
  const [isPending, startTransition] = useTransition();
  const [balance, setBalance] = useState("Loading...");

  type EthereumAddress = `0x${string}`;

  const tokens: { [key: string]: EthereumAddress } = useMemo(
    () => ({
      AUD: process.env.NEXT_PUBLIC_AUDC as `0x${string}`,
      USD: process.env.NEXT_PUBLIC_USDC as `0x${string}`,
      GBP: process.env.NEXT_PUBLIC_GBPC as `0x${string}`,
    }),
    []
  );

  useEffect(() => {
    getBalance(config, {
      address: process.env.NEXT_PUBLIC_USER_WALLET_ADDRESS as `0x${string}`,
      token: tokens[tab],
    }).then((result) => {
      setBalance(`$${result.formatted}`);
    });
  }, [tab, tokens]);

  const TAB_DATA = [
    {
      title: "AUD",
      id: "AUD",
      content: <TabContent balance={balance} currency="AUD" />,
    },
    {
      title: "USD",
      id: "USD",
      content: <TabContent balance={balance} currency="USD" />,
    },
    // {
    //   title: "GBP",
    //   id: "GBP",
    //   content: <TabContent balance={balance} currency="GBP" />,
    // },
  ];

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };
  const currentTabData = TAB_DATA.find((t) => t.id === tab);
  const content = currentTabData ? currentTabData.content : null;

  return (
    <div className="mt-14">
      <div className="flex flex-row mx-auto xl:mx-0 justify-around xl:justify-start mt-0 md:text-xl text-black">
        <div className="hidden xl:inline-block">
          <TabButton
            selectTab={() => handleTabChange("AUD")}
            active={tab === "AUD"}
          >
            AUD
          </TabButton>
        </div>
        <div className="xl:hidden">
          <TabButton
            selectTab={() => handleTabChange("AUD")}
            active={tab === "AUD"}
          >
            AUD
          </TabButton>
        </div>

        <div className="hidden xl:inline-block">
          <TabButton
            selectTab={() => handleTabChange("USD")}
            active={tab === "USD"}
          >
            USD
          </TabButton>
        </div>
        <div className="xl:hidden">
          <TabButton
            selectTab={() => handleTabChange("USD")}
            active={tab === "USD"}
          >
            USD
          </TabButton>
        </div>
        <div className="hidden xl:inline-block">
          <TabButton
            selectTab={() => handleTabChange("GBP")}
            active={tab === "GBP"}
          >
            GBP
          </TabButton>
        </div>
        <div className="xl:hidden">
          <TabButton
            selectTab={() => handleTabChange("GBP")}
            active={tab === "GBP"}
          >
            GBP
          </TabButton>
        </div>
      </div>
      <div className="mt-6 text-sm md:text-md text-black">{content}</div>
    </div>
  );
};

export default TabSelector;
