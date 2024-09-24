import { createConfig, http } from "@wagmi/core";
import { baseSepolia } from "@wagmi/core/chains";

const BASE_SEPOLIA_CHAIN_ID = 84532;
//const POLYGON_AMAY_CHAIN_ID = 80002;

export const CHAIN_ID = BASE_SEPOLIA_CHAIN_ID;

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});
