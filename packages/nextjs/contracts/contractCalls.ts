import { CHAIN_ID, config } from "./defaultSettings";
import deployedContracts from "./deployedContracts";
import { readContract } from "@wagmi/core";

export const contract_address = deployedContracts[CHAIN_ID].DappRatingSystem.address;
export const abi = deployedContracts[CHAIN_ID].DappRatingSystem.abi;

export type DappData = {
  dappId: `0x${string}`;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  platform: string;
  category: string;
  owner: string;
  averageRating?: number;
};

// ***registerDapp is in the register-project page***

export async function getAllDapps(): Promise<DappData[]> {
  try {
    console.log("getAllDapps called with:", {
      config,
      address: contract_address,
      chainId: config.chains[0].id,
    });

    const dappData = (await readContract(config, {
      address: contract_address as `0x${string}`,
      abi,
      functionName: "getAllDapps",
    })) as DappData[];

    console.log("Raw dapp data:", dappData);

    // Validate the data structure
    if (Array.isArray(dappData)) {
      console.log("Number of dapps:", dappData.length);
      dappData.forEach((dapp, index) => {
        console.log(`Dapp ${index}:`, {
          dappId: dapp.dappId,
          name: dapp.name,
          platform: dapp.platform,
        });
      });
    } else {
      console.warn("Unexpected data structure:", typeof dappData);
    }

    return dappData;
  } catch (error: unknown) {
    console.error("Error in getAllDapps:", {
      message: error instanceof Error ? error.message : "Unknown error",
      code: error instanceof Error && "code" in error ? (error as { code: unknown }).code : undefined,
      details: error,
    });
    throw error;
  }
}

// Also verify your contract address and chain ID
console.log("Contract setup:", {
  address: contract_address,
  chainId: CHAIN_ID,
  isValidAddress: /^0x[a-fA-F0-9]{40}$/.test(contract_address),
});

export async function getDappByDappId(dappId: `0x${string}`): Promise<DappData> {
  const dappData = (await readContract(config, {
    address: contract_address,
    abi,
    functionName: "getDapp",
    args: [dappId as `0x${string}`],
  })) as DappData;
  return dappData;
}
