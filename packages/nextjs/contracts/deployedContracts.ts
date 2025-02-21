/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  42161: {
    DappRaterSchemaResolver: {
      address: "0x879CB3144def6047d1c3eA9784E82932d55Ebe67",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IEAS",
              name: "eas",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "AccessDenied",
          type: "error",
        },
        {
          inputs: [],
          name: "InsufficientValue",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidEAS",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidLength",
          type: "error",
        },
        {
          inputs: [],
          name: "NotPayable",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bytes32",
              name: "projectId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "address",
              name: "raterAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "starRating",
              type: "uint8",
            },
          ],
          name: "ReviewRevoked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bytes32",
              name: "projectId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "address",
              name: "raterAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "starRating",
              type: "uint8",
            },
            {
              indexed: false,
              internalType: "string",
              name: "reviewText",
              type: "string",
            },
          ],
          name: "ReviewSubmitted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bytes32",
              name: "projectId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "address",
              name: "raterAddress",
              type: "address",
            },
          ],
          name: "UserAlreadyRatedProject",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "bytes32",
              name: "projectId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "address",
              name: "raterAddress",
              type: "address",
            },
          ],
          name: "UserHasNotRatedProject",
          type: "event",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
            },
          ],
          name: "attest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "isPayable",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "multiAttest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "multiRevoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          name: "projectToNumberOfRates",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "raterToNumberOfRates",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          name: "raterToProjectToRated",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
            },
          ],
          name: "revoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "version",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        attest: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        isPayable: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        multiAttest: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        multiRevoke: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        revoke: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
        version: "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol",
      },
    },
    DappRatingSystem: {
      address: "0x3cc9894AeE61e5c22b620cb09273040D485Ae555",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IEAS",
              name: "eas",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "schema",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "InvalidDappId",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidEAS",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidRatingUID",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidSchemaUID",
          type: "error",
        },
        {
          inputs: [],
          name: "InvalidStarRating",
          type: "error",
        },
        {
          inputs: [],
          name: "NotDappOwner",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
          ],
          name: "DappDeleted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "ratingUid",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "address",
              name: "revokedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "revokedAt",
              type: "uint256",
            },
          ],
          name: "DappRatingRevoked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "attestationId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "uint8",
              name: "starRating",
              type: "uint8",
            },
            {
              indexed: false,
              internalType: "string",
              name: "reviewText",
              type: "string",
            },
          ],
          name: "DappRatingSubmitted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "url",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "imageURL",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "platform",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "category",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "registrationTime",
              type: "uint256",
            },
          ],
          name: "DappRegistered",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "url",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "imageURL",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "platform",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "category",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "DappUpdated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
            {
              internalType: "uint8",
              name: "starRating",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "reviewText",
              type: "string",
            },
          ],
          name: "addDappRating",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "dappCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          name: "dappIdIsRegistered",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "dapps",
          outputs: [
            {
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "url",
              type: "string",
            },
            {
              internalType: "string",
              name: "imageUrl",
              type: "string",
            },
            {
              internalType: "string",
              name: "platform",
              type: "string",
            },
            {
              internalType: "string",
              name: "category",
              type: "string",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_dappId",
              type: "bytes32",
            },
          ],
          name: "deleteDapp",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllDapps",
          outputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "dappId",
                  type: "bytes32",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "url",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "imageUrl",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "platform",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "category",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              internalType: "struct DappRatingSystem.Dapp[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
          ],
          name: "getDapp",
          outputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "dappId",
                  type: "bytes32",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "url",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "imageUrl",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "platform",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "category",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              internalType: "struct DappRatingSystem.Dapp",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "dappId",
              type: "bytes32",
            },
          ],
          name: "isDappRegistered",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
            {
              internalType: "string",
              name: "_url",
              type: "string",
            },
            {
              internalType: "string",
              name: "_imageURL",
              type: "string",
            },
            {
              internalType: "string",
              name: "_platform",
              type: "string",
            },
            {
              internalType: "string",
              name: "_category",
              type: "string",
            },
          ],
          name: "registerDapp",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "ratingUid",
              type: "bytes32",
            },
          ],
          name: "revokeDappRating",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_dappId",
              type: "bytes32",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
            {
              internalType: "string",
              name: "_url",
              type: "string",
            },
            {
              internalType: "string",
              name: "_imageURL",
              type: "string",
            },
            {
              internalType: "string",
              name: "_platform",
              type: "string",
            },
            {
              internalType: "string",
              name: "_category",
              type: "string",
            },
          ],
          name: "updateDapp",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
