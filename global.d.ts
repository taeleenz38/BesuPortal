import { Eip1193Provider } from "ethers";

interface Ethereum {
  isMetaMask?: boolean;
  request: (...args: any[]) => Promise<any>;
}

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}
