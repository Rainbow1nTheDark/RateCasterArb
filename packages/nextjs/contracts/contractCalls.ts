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
  const dappData = (await readContract(config, {
    address: contract_address,
    abi,
    functionName: "getAllDapps",
  })) as DappData[];

  return dappData;
}

export async function getDappByDappId(dappId: `0x${string}`): Promise<DappData> {
  const dappData = (await readContract(config, {
    address: contract_address,
    abi,
    functionName: "getDapp",
    args: [dappId as `0x${string}`],
  })) as DappData;
  return dappData;
}
