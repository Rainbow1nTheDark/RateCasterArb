import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import { Contract } from "ethers";
// import { SchemaRegistry } from "@bnb-attestation-service/bas-sdk";
/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployDappRaterSchemaResolver: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  // const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  // const EAS_CONTRACT_ADDRESS_POLYGON = "0x5E634ef5355f45A855d02D66eCD687b1502AF790"; // Polygon Mainnet
  // const BAS_CONTRACT_ADDRESS_BSC = "0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD"; // BSC testnet
  // const BAS_CONTRACT_ADDRESS_MAINNET = "0x247Fe62d887bc9410c3848DF2f322e52DA9a51bC"; // BSC Mainnet
  const EAS_CONTRACT_ADDRESS_ARBITRUM = "0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458"; // Arbitrum Mainnet
  // const DAPP_RATER_SCHEMA = "0x0beb97f79e873b717add4df7d5d32bed7f19ba0ebdb81b66212048fd12ca89ba"; // BSC Mainnet

  // ******* Schema Addresses:
  // Base-Sepolia: "0xeaa96eb7dd9a3101cabc983cfbfcacc1594c70832d37a79b51bc43db4e4e40fb";
  // Polygon Mainnet: '0x2330fb2f2197b04f5f09645fec2ea4d2420f5f3715796b846384a03e959f2845';
  // BSC Mainnet: '0x0beb97f79e873b717add4df7d5d32bed7f19ba0ebdb81b66212048fd12ca89ba'

  //const DAPP_RATER_SCHEMA = "0x2330fb2f2197b04f5f09645fec2ea4d2420f5f3715796b846384a03e959f2845"; // Polygon Mainnet
  const DAPP_RATER_SCHEMA_ARBITRUM = "0xf16f81ef6f8b8e8aaa4eb3ddc467a5d52bf2ab52c96bf8438a01e93d373b9405";
  const deployer = "0xE0a7c71d21C8d4407dca3788C33C93E9A7160fe8";

  // console.log("Deploying DappRaterSchemaResolver");
  // await deploy("DappRaterSchemaResolver", {
  //   from: deployer,
  //   // Contract constructor arguments
  //   args: [EAS_CONTRACT_ADDRESS_ARBITRUM],
  //   log: true,
  //   gasLimit: 5000000,
  //   // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
  //   // automatically mining the contract deployment transaction. There is no effect on live networks.
  //   autoMine: true,
  // });

  // Get the deployed contract to interact with it after deploying.
  // const schemaResolver = await hre.ethers.getContract<Contract>("DappRaterSchemaResolver", deployer);
  // console.log("👋 Schema resolver version: ", await schemaResolver.version());

  // const schemaRegistryContractAddress = "0x08C8b8417313fF130526862f90cd822B55002D72";
  // const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

  // await schemaRegistry.connect(await hre.ethers.getSigner(deployer));

  // const schema = "bytes32 projectId, uint8 starRating, string reviewText";
  // const resolverAddress = "0x879CB3144def6047d1c3eA9784E82932d55Ebe67";// bnb
  // const revocable = true;

  // const transaction = await schemaRegistry.register({
  //   schema,
  //   resolverAddress,
  //   revocable,
  // });

  // // Optional: Wait for transaction to be validated
  // const uid = await transaction.wait();
  // console.log("Schema UID: ", uid);
  // console.log("Deploying DappRatingSystem");
  const provider = hre.ethers.provider;
  const feeData = await provider.getFeeData();
  const factory = await hre.ethers.getContractFactory("DappRatingSystem");

  // Estimate gas for deployment
  const deployTx = await factory.getDeployTransaction(EAS_CONTRACT_ADDRESS_ARBITRUM, DAPP_RATER_SCHEMA_ARBITRUM);
  const estimatedGas = await provider.estimateGas(deployTx);

  // Add a buffer (20% more than estimated)
  const gasLimit = Math.ceil(Number(estimatedGas) * 1.2);
  await deploy("DappRatingSystem", {
    from: deployer,
    args: [EAS_CONTRACT_ADDRESS_ARBITRUM, DAPP_RATER_SCHEMA_ARBITRUM],
    log: true,
    autoMine: true,
    // Increase gas limit
    gasLimit: gasLimit,
    maxFeePerGas: feeData.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
  });
};

export default deployDappRaterSchemaResolver;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
// deployDappRaterSchemaResolver.tags = ["DappRaterSchemaResolver"]; //"DappRatingSystem",
