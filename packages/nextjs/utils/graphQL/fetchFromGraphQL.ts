// import { DappRating } from "./fetchFromSubgraph";
// import * as dotenv from "dotenv";
// import { ethers } from "ethers";
// import { GraphQLClient, gql } from "graphql-request";

// dotenv.config();
// const SCHEMA_ID = process.env.SCHEMA_ID;
// const GRAPH_ENDPOINT = process.env.GRAPH_ENDPOINT;

// const query = gql`
//   query Attestation {
//     attestations(where: { schemaId: { equals: ${SCHEMA_ID} } }) {
//       schemaId
//       id
//       txid
//       data
//       attester
//       recipient
//       decodedDataJson
//       revoked
//     }
//   }
// `;

// export interface Attestation {
//   schemaId: string;
//   id: string;
//   txid: string;
//   data: string;
//   attester: string;
//   recipient: string;
//   decodedDataJson: string;
//   revoked: boolean;
// }

// interface AttestationsData {
//   attestations: Attestation[];
// }

// export const fetchAttestations = async (): Promise<Attestation[]> => {
//   if (typeof GRAPH_ENDPOINT !== "string") {
//     console.log("SCHEMA_ID:", SCHEMA_ID);
//     console.log("GRAPH_ENDPOINT:", GRAPH_ENDPOINT);
//     throw new Error("The Graph Endpoint must be assigned");
//   }

//   const client = new GraphQLClient(GRAPH_ENDPOINT);

//   try {
//     const data: AttestationsData = await client.request(query);
//     console.log(data);
//     return data.attestations;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// const decodeData = (data: string) => {
//   const abiCoder = new ethers.AbiCoder();
//   const decoded = abiCoder.decode(["bytes32", "uint8", "string"], data);

//   return {
//     projectId: decoded[0],
//     starRating: decoded[1],
//     reviewText: decoded[2],
//   };
// };

// export const getSchemaData = async (): Promise<DappRating[]> => {
//   try {
//     const attestations = await fetchAttestations();
//     console.log(attestations);
//     return attestations.map(attestation => {
//       try {
//         const decodedData = decodeData(attestation.data);
//         return {
//           id: attestation.id,
//           attestationId: attestation.id, // Using the attestation id as attestationId
//           dappId: decodedData.projectId,
//           starRating: decodedData.starRating,
//           reviewText: decodedData.reviewText,
//         };
//       } catch (decodeError) {
//         console.error(`Error decoding attestation data for ${attestation.id}:`, decodeError);
//         // Return a default DappRating object in case of error
//         return {
//           id: attestation.id,
//           attestationId: attestation.id,
//           dappId: "",
//           starRating: 0,
//           reviewText: "Error decoding data",
//         };
//       }
//     });
//   } catch (fetchError) {
//     console.error("Error fetching attestations:", fetchError);
//     throw fetchError;
//   }
// };
