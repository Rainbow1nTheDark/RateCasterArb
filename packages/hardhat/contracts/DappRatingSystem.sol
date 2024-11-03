// SPDX-License-Identifier: MIT

pragma solidity 0.8.25;

import { IEAS, AttestationRequest, AttestationRequestData, RevocationRequest, RevocationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

contract DappRatingSystem {
    struct Dapp {
        bytes32 dappId;
        string name;
        string description;
        string url;
        string imageUrl;
        string platform;
        string category;
        address owner;
    }

    Dapp[] public dapps; 
    uint256 public dappCounter;
    mapping(bytes32 => bool) public dappIdIsRegistered;
    mapping(bytes32 => uint256) private dappIndex; // Mapping to store the index of each Dapp in the array

    // Dapp registration event
    event DappRegistered(bytes32 indexed dappId, string name, string description, string url, string imageURL, string platform, string category, address owner, uint256 registrationTime);
    event DappUpdated(bytes32 indexed dappId, string name, string description, string url, string imageURL, string platform, string category, address owner);
    event DappDeleted(bytes32 indexed dappId);
    event DappRatingSubmitted(bytes32 indexed attestationId, bytes32 indexed dappId, uint8 starRating, string reviewText);
    event DappRatingRevoked(bytes32 indexed ratingUid, address indexed revokedBy, uint256 revokedAt);

    error InvalidEAS();
    error InvalidSchemaUID();
    error InvalidRatingUID();
    error InvalidDappId();
    error InvalidStarRating();
    error NotDappOwner();

    // The address of the global EAS contract.
    IEAS private immutable _eas;
    bytes32 private immutable _schemaUid;

    /// @notice Creates a new DappRatingSystem instance.
    /// @param eas The address of the global EAS contract.
    /// @param schema The schema UID of the DappRatingSystem.
    constructor(IEAS eas, bytes32 schema) {
        if (address(eas) == address(0)) {
            revert InvalidEAS();
        }
        if (schema == EMPTY_UID) {
            revert InvalidSchemaUID();
        }
        _eas = eas;
        _schemaUid = schema;
    }

    function registerDapp(string memory _name, string memory _description, string memory _url, string memory _imageURL, string memory _platform, string memory _category) public {
        // Calculate the dappId by hashing the URL
        bytes32 _dappId = keccak256(abi.encodePacked(_url));

        // Check if the Dapp with the same URL is already registered
        require(dappIdIsRegistered[_dappId] == false, "Dapp with the same URL already registered");

        // Increment the dapp counter
        dappCounter++;
        dappIdIsRegistered[_dappId] = true;

        // Create a new Dapp struct and add it to the array
        Dapp memory newDapp = Dapp({
            dappId: _dappId,
            name: _name,
            description: _description,
            url: _url,
            imageUrl: _imageURL,
            platform: _platform,
            category: _category,
            owner: msg.sender
        });
        dapps.push(newDapp);
        dappIndex[_dappId] = dapps.length - 1;

        // Emit the DappRegistered event
        emit DappRegistered(_dappId, _name, _description, _url, _imageURL, _platform, _category, msg.sender, block.timestamp);
    }

    function updateDapp(bytes32 _dappId, string memory _name, string memory _description, string memory _url, string memory _imageURL, string memory _platform, string memory _category) public {
        require(dappIdIsRegistered[_dappId], "Dapp not registered");
        uint256 index = dappIndex[_dappId];
        Dapp storage dapp = dapps[index];
        require(dapp.owner == msg.sender, "Not the owner of the Dapp");

        dapp.name = _name;
        dapp.description = _description;
        dapp.url = _url;
        dapp.imageUrl = _imageURL;
        dapp.platform = _platform;
        dapp.category = _category;

        emit DappUpdated(_dappId, _name, _description, _url, _imageURL, _platform, _category, msg.sender);
    }

    function deleteDapp(bytes32 _dappId) public {
        require(dappIdIsRegistered[_dappId], "Dapp not registered");
        uint256 index = dappIndex[_dappId];
        Dapp storage dapp = dapps[index];
        require(dapp.owner == msg.sender, "Not the owner of the Dapp");

        // Move the last element into the place to delete
        dapps[index] = dapps[dapps.length - 1];
        dappIndex[keccak256(abi.encodePacked(dapps[index].url))] = index;
        dapps.pop();

        delete dappIdIsRegistered[_dappId];
        delete dappIndex[_dappId];

        emit DappDeleted(_dappId);
    }

    function isDappRegistered(bytes32 dappId) external view returns (bool) {
        return dappIdIsRegistered[dappId];
    }

    function getAllDapps() external view returns (Dapp[] memory) {
        return dapps;
    }

    function getDapp(bytes32 dappId) external view returns (Dapp memory) {
        require(dappIdIsRegistered[dappId], "Dapp not registered");
        uint256 index = dappIndex[dappId];
        return dapps[index];
    }

    function addDappRating(bytes32 dappId, uint8 starRating, string memory reviewText) external returns (bytes32) {
        if (dappId == EMPTY_UID || dappIdIsRegistered[dappId] == false) {
            revert InvalidDappId();
        }
        if (starRating < 1 || starRating > 5) {
            revert InvalidStarRating();
        }
        bytes32 attestation = 
            _eas.attest(
                AttestationRequest({
                    schema: _schemaUid,
                    data: AttestationRequestData({
                        recipient: address(0), // No recipient
                        expirationTime: NO_EXPIRATION_TIME, // No expiration time
                        revocable: true,
                        refUID: EMPTY_UID, // No references UI
                        data: abi.encode(dappId, starRating, reviewText), // Encode a single uint256 as a parameter to the schema
                        value: 0 // No value/ETH
                    })
                })
            );
        emit DappRatingSubmitted(attestation, dappId, starRating, reviewText);
        return attestation;
    }

    function revokeDappRating(bytes32 ratingUid) external {
        if (ratingUid == EMPTY_UID) {
            revert InvalidRatingUID();
        }
        _eas.revoke(RevocationRequest({ schema: _schemaUid, data: RevocationRequestData({ uid: ratingUid, value: 0 }) }));
        emit DappRatingRevoked(ratingUid, msg.sender, block.timestamp);
    }
}