import { createConfig, http } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";

// const BASE_SEPOLIA_CHAIN_ID = 84532;
// const POLYGON_AMAY_CHAIN_ID = 80002;
// const POLYGON_MAINNET = 137;
const BSC = 56;
export const CHAIN_ID = BSC;
const BSC_RPC = "https://binance.llamarpc.com";

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(BSC_RPC),
  },
});
