"use client"
import { Client, cacheExchange, fetchExchange, ssrExchange } from 'urql';

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = new Client({
  url: process.env.NEXT_PUBLIC_GRAPH_API as string, // Use NEXT_PUBLIC_ prefix for environment variables in Next.js
  exchanges: [cacheExchange, ssrCache, fetchExchange],
});

export default client;
export { ssrCache };
