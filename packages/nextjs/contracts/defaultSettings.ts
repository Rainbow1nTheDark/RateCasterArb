import { createConfig, http } from "@wagmi/core";
import { polygon } from "@wagmi/core/chains";

// const BASE_SEPOLIA_CHAIN_ID = 84532;
// const POLYGON_AMAY_CHAIN_ID = 80002;
const POLYGON_MAINNET = 137;
export const CHAIN_ID = POLYGON_MAINNET;

export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
});
