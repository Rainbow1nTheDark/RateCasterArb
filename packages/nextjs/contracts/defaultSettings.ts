import { createConfig, http } from "@wagmi/core";
import { arbitrum } from "@wagmi/core/chains";

// const BASE_SEPOLIA_CHAIN_ID = 84532;
// const POLYGON_AMAY_CHAIN_ID = 80002;
// const POLYGON_MAINNET = 137;
// const BSC = 56;
const ARBITRUM = 42161;
export const CHAIN_ID = ARBITRUM;

export const config = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http(),
  },
});
