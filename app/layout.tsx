import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from '@/config'
import Web3ModalProvider from '@/context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const montserrat = Montserrat({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALOGO - USER",
  description: "ALOGO - USER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
