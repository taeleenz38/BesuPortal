"use client";
import React, { ReactNode } from "react";
import { Provider as UrqlProvider } from "urql";
import urqlClient from "@/app/lib/urql";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <UrqlProvider value={urqlClient}>
      <main className="">{children}</main>
    </UrqlProvider>
  );
}
