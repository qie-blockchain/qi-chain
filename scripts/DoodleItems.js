const { ethers } = require("hardhat");
const axios = require("axios");
const fs = require("fs");
const transactionJson = require("../swapWithoutReverted21Feb.json");
let hashes = require('../swapWithoutReverted21Feb.json');
let doodleItems = require('../doodleItemsData.json');
let doodleShop = require('../doodleShopData.json');

const doodleAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC1155InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idsLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "valuesLength",
        type: "uint256",
      },
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC1155InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC1155InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "newBaseURI",
        type: "string",
      },
    ],
    name: "BaseURISet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nftIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "BatchMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "newTokenURI",
        type: "string",
      },
    ],
    name: "TokenURISet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "exists",
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
    inputs: [],
    name: "getActiveTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getUserBalance",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IDoodleItems.Balance[]",
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
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "removeActiveToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "newTokenURIs",
        type: "string[]",
      },
    ],
    name: "setBatchTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "newTokenURI",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    inputs: [],
    name: "totalSupply",
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const doodleShopAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
    ],
    name: "buy",
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
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
    ],
    name: "buyAdmin",
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
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "NftPriceSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Purchase",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "nftIds",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "paymentTokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "newPrices",
        type: "uint256[]",
      },
    ],
    name: "setBatchNftPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "setNftPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddresses",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensWithdrawed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokenAddresses",
        type: "address[]",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DoodleItems",
    outputs: [
      {
        internalType: "contract IDoodleItems",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPositions",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "nftId",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "address",
                name: "paymentToken",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
            ],
            internalType: "struct DoodleShop.Pricing[]",
            name: "pricing",
            type: "tuple[]",
          },
        ],
        internalType: "struct DoodleShop.Position[]",
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
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "uint256[]",
        name: "nftIds",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "paymentTokens",
        type: "address[]",
      },
    ],
    name: "getTokenPrices",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
];

const routerAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_WQIE",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WQIE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityAdmin",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "addLiquidityETHForAdmin",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "canAddLiquidity",
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "canTradeOnLessFee",
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
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveOut",
        type: "uint256",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "getAmountsIn",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
    ],
    name: "getAmountsOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveB",
        type: "uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapETHForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapTokensForExactETH",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const factoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeToSetter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "PairCreated",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allPairs",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "allPairsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
    ],
    name: "createPair",
    outputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "feeTo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "feeToSetter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "getPair",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "minStakeForLessFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "minStakeToAddLiq",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "relaxedTradeFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_feeTo",
        type: "address",
      },
    ],
    name: "setFeeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_feeToSetter",
        type: "address",
      },
    ],
    name: "setFeeToSetter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "staking",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "tradeFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_minStakeForLessFee",
        type: "uint256",
      },
    ],
    name: "updateMinStakeForLessFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_minStakeToAddLiq",
        type: "uint256",
      },
    ],
    name: "updateMinStakeToAddLiq",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_relaxedTradeFee",
        type: "uint256",
      },
    ],
    name: "updateRelaxedTradeFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
    ],
    name: "updateStakingContract",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeFee",
        type: "uint256",
      },
    ],
    name: "updateTradeFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ERC20ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const rpcUrls = {
  qiMainnet: "https://rpc-main1.qiblockchain.online",
  qiBeta: "http://146.190.15.105:10002/",
};

const mainnetDoodleItemsAddress = "0xdc45db5C686dC035FbB434bc9bbC8F0c10399B1C";
const mainnetDoodleShopAddress = "0xC93C95aBc93AbF17F38Be8a5FC926C467737CB03";
const testnetDoodleQiAddress = "0xf509BE1111aa234078E911940b7BC57E446415B9";
const testnetRouterAddress = "0x1a556530bb46c8eC4cdf8c750925952CF89d8E90";
const testnetFactoryAddress = "0xadfB415e03dB95f92041096A1e4aa6B80f42178c";
const mainnetRouterAddress = "0x4fd15501aDe13Dc668E8d0247885f04bfD00B458";
const testnetWQIEAddress = "0x3aF492C875829B69a0803f4688C54fb867C193DF";

async function decodeTransactionInput() {
  try {
    const provider = new ethers.getDefaultProvider(rpcUrls.qiMainnet); // Replace with your custom chain RPC URL
    const urlforDataItemns = `https://mainnet.qiblockchain.online/api?module=account&action=txlist&address=${mainnetDoodleItemsAddress}`;
    const response = await axios.get(urlforDataItemns);
    console.log(response.data.result.length);
    const txnList = response.data.result;
    let transactionList = [];
    for (let i in txnList) {
      let transaction = txnList[i];
      let input = transaction.input;

      let iface = new ethers.Interface(doodleAbi);
      let decodedData = iface.parseTransaction({ data: input });
      // console.log(decodedData.args);
      // console.log(decodedData);
      if (decodedData) {
        let mixedArray = decodedData.args;

        // Convert only BigInt values in the array to strings
        function convertBigIntsToStrings(obj) {
          if (typeof obj === "bigint") {
            return obj.toString();
          } else if (Array.isArray(obj)) {
            return obj.map(convertBigIntsToStrings);
          } else if (typeof obj === "object") {
            for (let key in obj) {
              obj[key] = convertBigIntsToStrings(obj[key]);
            }
          }
          return obj;
        }

        // Convert BigInt values within the array to strings
        let stringArray = mixedArray.map((result) => {
          return {
            count: result.count,
            values: convertBigIntsToStrings(result.values),
          };
        });
        //   console.log(stringArray);
        let obj = {
          functionName: decodedData.name,
          args: decodedData.args,
        };
        transactionList.push(obj);
      }
    }
    console.log(transactionList);

    // writeJsonToFile(transactionList, "doodleItemsTxList.json")
    // Assuming the input is in ABI-encoded format
    // const abi = /* your ABI definition */;

    return transactionList;
  } catch (error) {
    console.error("Error decoding transaction input:", error);
    throw error;
  }
}

async function decodeTransactionInputForShop() {
  try {
    const provider = new ethers.getDefaultProvider(rpcUrls.qiMainnet); // Replace with your custom chain RPC URL
    const urlforDataItemns = `https://mainnet.qiblockchain.online/api?module=account&action=txlist&address=${mainnetDoodleShopAddress}`;
    const response = await axios.get(urlforDataItemns);
    console.log(response.data.result.length);
    const txnList = response.data.result;

    let transactionList = [];
    for (let i in txnList) {
      let transaction = txnList[i];
      let input = transaction.input;
      let value = transaction.value;
      // console.log();
      let iface = new ethers.Interface(doodleShopAbi);
      let decodedData = iface.parseTransaction({ data: input });
      // console.log(decodedData.args);
      //   console.log(decodedData);
      if (decodedData) {
        let mixedArray = decodedData.args;

        // Convert only BigInt values in the array to stringsdds
        function convertBigIntsToStrings(obj) {
          if (typeof obj === "bigint") {
            return obj.toString();
          } else if (Array.isArray(obj)) {
            return obj.map(convertBigIntsToStrings);
          } else if (typeof obj === "object") {
            for (let key in obj) {
              obj[key] = convertBigIntsToStrings(obj[key]);
            }
          }
          return obj;
        }

        // Convert BigInt values within the array to strings
        let stringArray = mixedArray.map((result) => {
          return {
            count: result.count,
            values: convertBigIntsToStrings(result.values),
          };
        });
        //   console.log(stringArray);
        let obj = {
          functionName: decodedData.name,
          args: decodedData.args,
          from: transaction.from,
          value: value,
        };
        transactionList.push(obj);
      }
    }
    console.log(transactionList);

    // writeJsonToFile(transactionList, "doodleItemsTxList.json")
    // Assuming the input is in ABI-encoded format
    // const abi = /* your ABI definition */;

    return transactionList;
  } catch (error) {
    console.error("Error decoding transaction input:", error);
    throw error;
  }
}

async function decodeTransactionInputForRouter() {
  try {
    const provider = new ethers.getDefaultProvider(rpcUrls.qiMainnet); // Replace with your custom chain RPC URL
    const urlforDataItemns = `https://mainnet.qiblockchain.online/api?module=account&action=txlist&address=${mainnetRouterAddress}`;
    const response = await axios.get(urlforDataItemns);
    console.log(response.data.result.length);
    const txnList = response.data.result;

    let transactionList = [];
    for (let i in txnList) {
      let transaction = txnList[i];
      let input = transaction.input;
      let value = transaction.value;
      // console.log();
      let iface = new ethers.Interface(routerAbi);
      let decodedData = iface.parseTransaction({ data: input });
      // console.log(decodedData.args);
      //   console.log(decodedData);
      if (decodedData) {
        let mixedArray = decodedData.args;

        // Convert only BigInt values in the array to strings
        function convertBigIntsToStrings(obj) {
          if (typeof obj === "bigint") {
            return obj.toString();
          } else if (Array.isArray(obj)) {
            return obj.map(convertBigIntsToStrings);
          } else if (typeof obj === "object") {
            for (let key in obj) {
              obj[key] = convertBigIntsToStrings(obj[key]);
            }
          }
          return obj;
        }

        // Convert BigInt values within the array to strings
        let stringArray = mixedArray.map((result) => {
          return {
            count: result.count,
            values: convertBigIntsToStrings(result.values),
          };
        });
        //   console.log(stringArray);
        let obj = {
          functionName: decodedData.name,
          args: decodedData.args,
          from: transaction.from,
          value: value,
        };
        transactionList.push(obj);
      }
    }
    console.log(transactionList);

    // writeJsonToFile(transactionList, "doodleItemsTxList.json")
    // Assuming the input is in ABI-encoded format
    // const abi = /* your ABI definition */;

    return transactionList;
  } catch (error) {
    console.error("Error decoding transaction input:", error);
    throw error;
  }
}
//   decodeTransactionInputForRouter()
//   decodeTransactionInputForShop()

// decodeTransactionInput()

async function getContractTransactions(contractAddress) {
  try {
    const provider = new ethers.getDefaultProvider(rpcUrls.qiMainnet); // Replace with your custom chain RPC URL
    const code = await provider.getCode(contractAddress);
    if (code === "0x") {
      console.error("Contract not found at the provided address");
      return;
    } else {
      // console.log(code);
    }
    // Create a filter to get logs related to the contract address
    const filter = {
      address: contractAddress,
      fromBlock: 195103, // Adjust the fromBlock as needed
      toBlock: "latest",
      topics: [null],
    };

    // Get the logs for the specified filter
    //   const logs = await provider.getLogs(filter);
    //   console.log(logs);
    let startBlockNumber = 195103;
    let endBlockNumber = 1821788;
    for (
      let blockNumber = startBlockNumber;
      blockNumber <= endBlockNumber;
      blockNumber++
    ) {
      const block = await provider.getBlockWithTransaction(blockNumber);
      console.log(block);
      let y = await block.getTransaction();
      // let x = await provider.getBlock("0x0113a2cad34612e43371aa6ff6d47c11494ecc435b5ef5add89b456fd928f902")
      console.log(x);
      console.log(blockNumber);
      // Filter transactions related to the contract address
      const contractTransactions = block.transactions.filter(
        (transaction) => transaction.to === contractAddress
      );
      console.log(contractTransactions);
      // Parse and display transaction details
      contractTransactions.forEach((transaction) => {
        const parsedTransaction = ethers.utils.parseTransaction(
          transaction.data
        );

        // Get the function name and arguments
        const contractInterface = new ethers.utils.Interface(
          contract.interface.abi
        );
        const parsedFunction =
          contractInterface.parseTransaction(parsedTransaction);

        console.log("Block Number:", blockNumber);
        console.log("Transaction Hash:", transaction.hash);
        console.log("Function Name:", parsedFunction.name);
        console.log("Arguments:", parsedFunction.args);
        console.log("---");
      });
    }
    // Decode the transaction data if needed
    //   const decodedTransactions = logs.map(log => ethers.AbiCoder.defaultAbiCoder().decode(doodleAbi, log.data));
    let finalTxnList = [];
    // for(let i in logs){
    //     let txn = await decodeTransactionInput(logs[i].transactionHash)
    //     finalTxnList.push(txn)
    // }
    const iface = new ethers.Interface(doodleAbi);

    // Decode the transaction data from logs
    const decodedTransactions = logs.map((log) => {
      const parsedLog = iface.parseLog(log);
      console.log(parsedLog);
      return {
        transactionHash: log.transactionHash,
        decodedData: parsedLog.values,
      };
    });
    console.log(decodedTransactions);
    //   return decodedTransactions;
  } catch (error) {
    console.error("Error fetching contract transactions:", error);
    throw error;
  }
}

//   getContractTransactions(mainnetRouterAddress);
async function processTransactions() {
  try {
    const provider = new ethers.getDefaultProvider(
      "http://146.190.15.105:10002/"
    ); // Replace with your custom chain RPC URL
    const wallet = new ethers.Wallet(
      "1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155"
    );
    let transactions = doodleItems;
    const customWallet = wallet.connect(provider);
    const signer =
      customWallet; /* Your Ethereum account signer, typically obtained from a wallet */
    const contract = new ethers.Contract(
      "0x78f83A3eaE370E269157D6F70b401Efcb4AB4239",
      doodleAbi,
      provider
    );
    const contractWithSigner = contract.connect(signer);
    transactions = transactions.reverse();
    for (const transaction of transactions) {
      const functionName = transaction.functionName;
      const args = transaction.args;

      // Depending on the function, you may need to handle different argument structures
      // Adjust the following switch statement based on your contract's function signatures
      switch (functionName) {
        case "setBaseURI":
          console.log("in setting baseURI");
          console.log(args);

          let txn = await contractWithSigner[functionName](args[0]);
          await txn.wait();
          console.log("Base URI set");
          break;
        case "setBatchTokenURI":
          console.log("in setting batchTokenURI");
          console.log(args[0], typeof Array.from(args[0]), Array.from(args[0]));
          console.log(args[1]);

          let transaction = await contractWithSigner[functionName](
            Array.from(args[0]),
            Array.from(args[1])
          );
          await transaction.wait();
          console.log(
            "setting batch token URI transaction completed successfully"
          );
          break;
        case "setTokenURI":
          console.log("in setting tokenURI");
          console.log(args);

          let trx = await contractWithSigner[functionName](args[0], args[1]);
          await trx.wait();
          console.log("tokenURI transaction done");
          break;
        case "grantRole":
          console.log("in Grant role");
          console.log(args);
          let xx = await contractWithSigner[functionName](args[0], args[1]);
          await xx.wait();
          console.log("role has been granted");
          break;

        default:
          console.error(`Unsupported function: ${functionName}`);
      }
    }
  } catch (error) {
    console.error("Error processing transactions:", error);
    throw error;
  }
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processTransactionsForShop() {
  try {
    const provider = new ethers.getDefaultProvider(
      "http://146.190.15.105:10002/"
    ); // Replace with your custom chain RPC URL
    const wallet = new ethers.Wallet(
      "1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155"
    );
    let transactions = doodleShop;
    const customWallet = wallet.connect(provider);
    const signer =
      customWallet; /* Your Ethereum account signer, typically obtained from a wallet */
    const contract = new ethers.Contract(
      "0x0032A64f006BE73FC31e713C8b68A84324351585",
      doodleShopAbi,
      provider
    ); //0x336ea50B9b6D21e69a0C74B2307dD92c6a8FE65b
    const contractWithSigner = contract.connect(signer);
    transactions = transactions.reverse();
    for (const transaction of transactions) {
      const functionName = transaction.functionName;
      const args = transaction.args;
      const from = transaction.from;
      const value = transaction.value;
      // Depending on the function, you may need to handle different argument structures
      // Adjust the following switch statement based on your contract's function signatures
      switch (functionName) {
        case "buy":
          console.log("in buying");
          let actualFunctionName = "buyAdmin";
          console.log(ethers.parseEther(args[0].toString()));
          console.log(
            Number(args[0]).toString(),
            Number(args[1]).toString(),
            args[2].toString(),
            value
          );
          if (
            args[2].toString() === "0x0000000000000000000000000000000000000000"
          ) {
            let transaction = await contractWithSigner[actualFunctionName](
              Number(args[0]).toString(),
              Number(args[1]).toString(),
              args[2].toString(),
              from.toString(),
              {
                value: value.toString(),
                from: signer.address,
                chainId: 5656,
                gasLimit: 5000000,
              }
            );
            await transaction.wait();
            console.log("done buying");
          } else {
            let transaction = await contractWithSigner[actualFunctionName](
              Number(args[0]).toString(),
              Number(args[1]).toString(),
              testnetDoodleQiAddress.toString(),
              from.toString(),
              { from: signer.address, chainId: 5656, gasLimit: 5000000 }
            );
            await transaction.wait();
            console.log("done buying");
          }

          // ["0x8780b97C72F59E9F87a4411984399a8c80E95678"]
          break;
        case "setBatchNftPrice":
          console.log("in setting batchNFT price");
          let actualArgList = [];
          for (let i in args[1]) {
            if (args[1][i] === "0x0000000000000000000000000000000000000000") {
              actualArgList.push("0x0000000000000000000000000000000000000000");
            } else {
              actualArgList.push(testnetDoodleQiAddress);
            }
          }
          let trx = await contractWithSigner[functionName](
            Array.from(args[0]),
            Array.from(actualArgList),
            Array.from(args[2])
          );
          await trx.wait();
          console.log("done setting batchNFTPrice");
          break;
        case "setNftPrice":
          console.log("in setting NFT price");
          let actualArg2 = null;
          if (
            args[1].toString() === "0x0000000000000000000000000000000000000000"
          ) {
            actualArg2 = "0x0000000000000000000000000000000000000000";
          } else {
            console.log(testnetDoodleQiAddress);
            actualArg2 = testnetDoodleQiAddress;
          }
          let t = await contractWithSigner[functionName](
            Number(args[0]),
            actualArg2.toString(),
            Number(args[2]).toString()
          );
          await t.wait();
          console.log("done settng");
          break;
        // case 'grantRole':
        //     console.log("in granting role");
        //   let xx = await contractWithSigner[functionName](args[0], args[1]);
        //   await xx.wait()
        //   console.log("Done Granting Role");
        //   break;
        // Add more cases for other functions as needed

        default:
          console.error(`Unsupported function: ${functionName}`);
      }
    }
  } catch (error) {
    console.error("Error processing transactions:", error);
    throw error;
  }
}

async function processTransactionsForRouter(contract, transactions) {
  try {
    const provider = new ethers.getDefaultProvider(
      "http://146.190.15.105:10002/"
    ); // Replace with your custom chain RPC URL
    // const providerMainnet = new ethers.JsonRpcProvider(
    // 	"https://rpc-main1.qiblockchain.online"
    //   ); //
    const wallet = new ethers.Wallet(
      "1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155"
    );

    let transactions = transactionJson;
    let proceed = false

    transactions = transactions.reverse()
    const customWallet = wallet.connect(provider);
    const signer =
      customWallet; /* Your Ethereum account signer, typically obtained from a wallet */
    const contract = new ethers.Contract(
      testnetRouterAddress,
      routerAbi,
      provider
    ); //0x336ea50B9b6D21e69a0C74B2307dD92c6a8FE65b
    let factoryContract = new ethers.Contract(
      testnetFactoryAddress,
      factoryAbi,
      provider
    );
    let factoryContractWithSigner = contract.connect(signer);
    const contractWithSigner = contract.connect(signer);
    for (const transaction of transactions) {
      const { functionName, args, from, value, number } = transaction;
      // 	  for(let j in transactions){
      // 		// console.log(number.number, transactions[j].number);
      // 		if(number === transactions[j].number){
      // 			// console.log("here", transactions[j].transactionHash);

      // 			const receipt = await providerMainnet.getTransactionReceipt(transactions[j].transactionHash);
      // 			console.log(receipt);
      // 			if (receipt && receipt.status === 1) {
      // 				// If the status is 1, the transaction was successful
      // 				console.log("Status of number", number, "is", true);
      // 				// obj[number] = true
      // 				proceed = true
      // 				break
      // 			} else {
      // 				// If the status is 0, the transaction was reverted or failed
      // 				console.log("Status of number", number, "is", false);
      // 				// obj[number.number] = false

      // 				break
      // 			}
      // 		}

      // }	

      console.log(`Current Number of Transaction is ${number}`);
      // if(!proceed){
      // 	console.log(`this transaction is not valid coninuinug is ${number}`);

      // 	continue
      // }
      // Depending on the function, you may need to handle different argument structures
      // Adjust the following switch statement based on your contract's function signatures
      let deadline = Math.floor(Date.now() / 1000) + 60 * 100;

      switch (functionName) {
        case "swapExactTokensForETH":
          console.log("in the swapping Tokens for eth function");
          let swapEthTxn = await contractWithSigner[functionName](
            args[0],
            args[1],
            args[2],
            signer.address,
            deadline,
            { value }
          );
          await swapEthTxn.wait();
          console.log("done swapping for Tokens for eth");
          break;
        case "addLiquidityETH":
          console.log("in the add liquiidity eth function");
          console.log(
            args[0],
            args[1],
            args[2],
            args[3],
            signer.address,
            deadline,
            value
          );
          let addingLiquidityTx = await contractWithSigner[functionName](
            args[0],
            args[1],
            args[2],
            args[3],
            signer.address,
            deadline,
            { value }
          );
          await addingLiquidityTx.wait();
          console.log("done adding eth liquidity");
          break;
        case "swapTokensForExactETH":
          console.log("in the swapTokensForExactETH function");
          let amountsIn = await contractWithSigner["getAmountsIn"](
            args[0],
            args[2]
          );
          console.log("amount in is", amountsIn);

          let swapTokensForExactETHTx = await contractWithSigner[functionName](
            args[0],
            args[1],
            args[2],
            signer.address,
            deadline,
            { value }
          );
          await swapTokensForExactETHTx.wait();
          console.log("done swapTokensForExactETH transaction");
          break;
          c;
        case "swapExactETHForTokens":
          console.log("in the swapTokensForExactETH function");
          let amountsOut = await contractWithSigner["getAmountsOut"](
            value,
            args[1]
          );
          console.log("amount in is", amountsOut);
          console.log("in the swapExactETHForTokens function");
          let swapExactETHForTokens = await contractWithSigner[functionName](
            amountsOut[1],
            args[1],
            signer.address,
            deadline,
            { value })
          await swapExactETHForTokens.wait();
          console.log("done swapExactETHForTokens");
          break;
        case "swapExactTokensForTokens":
          console.log("in the swapExactTokensForTokens function");
          let swapExactTokensForTokens = await contractWithSigner[functionName](
            args[0],
            args[1],
            args[2],
            signer.address,
            deadline,
            { value }
          );
          await swapExactTokensForTokens.wait();
          console.log("completed swapExactTokensForTokens transaction");
          break;
        case "swapTokensForExactTokens":
          console.log("in the swapTokensForExactTokens function");

          let swapTokensForExactTokens = await contractWithSigner[functionName](
            args[0],
            args[1],
            args[2],
            signer.address,
            deadline,
            { value }
          );
          await swapTokensForExactTokens.wait();
          console.log("completed swapTokensForExactTokens transaction");
          break;
        case "removeLiquidityETHWithPermit":
          console.log("in the removeLiquidityETHWithPermit function");
          console.log(args[0], args[1]);
          let tokenB = testnetWQIEAddress;
          const pairAddress = await factoryContract.getPair(args[0], tokenB);

          console.log("the Pair Address is", pairAddress);
          let pairContract = new ethers.Contract(pairAddress, ERC20ABI, signer);
          // let pairContractWithSigner = pairContract.connect(signer)
          console.log("Starting approval");
          let approvalTx = await pairContract.approve(
            testnetRouterAddress,
            "99999999999999999999999999999999999999999999"
          );
          await approvalTx.wait();
          console.log("Done Approving");
          let names = "removeLiquidityETH";

          let removeLiquidityETHWithPermit = await contractWithSigner[names](
            args[0],
            args[1],
            args[2],
            args[3],
            signer.address,
            deadline,
            { value }
          );
          await removeLiquidityETHWithPermit.wait();
          console.log("Done removeLiquiiidtyETHwithPermit");
          break;
        case "removeLiquidityWithPermit":
          console.log("in remove removeLiquidityWithPermit function");
          let actualFunctionName = "removeLiquidity";
          const pairAddresss = await factoryContract.getPair(args[0], args[1])

          console.log("the Pair Address is", pairAddresss);
          let pairContracst = new ethers.Contract(pairAddresss, ERC20ABI, signer)
          // let pairContractWithSigner = pairContract.connect(signer)
          console.log("Starting approval");
          let approvalTxs = await pairContracst.approve(testnetRouterAddress, "99999999999999999999999999999999999999999999999999999")
          await approvalTxs.wait()
          console.log("Done Approving");
          console.log("in the removeLiquidityWithPermit function");
          let removeLiquidityWithPermit = await contractWithSigner[
            actualFunctionName
          ](args[0], args[1], args[2], args[3], args[4], signer.address, deadline, {
            value,
          });
          await removeLiquidityWithPermit.wait();
          console.log("done removeLiquidityWithPermit transaction");
          break;
        case "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens":
          let actualName = "removeLiquidityETH";
          console.log("in the removeLiquidityWithPermit function");
          const pairAddressss = await factoryContract.getPair(args[0], testnetWQIEAddress)

          console.log("the Pair Address is", pairAddressss);
          let pairContracsst = new ethers.Contract(pairAddressss, ERC20ABI, signer)
          // let pairContractWithSigner = pairContract.connect(signer)
          console.log("Starting approval");
          let approvalTxss = await pairContracsst.approve(testnetRouterAddress, "99999999999999999999999999999999999999999999999999999")
          await approvalTxss.wait()
          console.log("Done Approving");
          let txn = await contractWithSigner[actualName](
            args[0],
            args[1],
            args[2],
            args[3],
            signer.address,
            deadline,
            { value }
          );
          await txn.wait();
          console.log(
            "Done removing liquidity eth supporting fee on transfer tokens"
          );
          break;
        case "removeLiquidityETHSupportingFeeOnTransferTokens":
          console.log(
            "In the removeLiquidityETHSupportingFeeOnTransferTokens function "
          );
          let name = "removeLiquidityETH";

          const pairAddresssssss = await factoryContract.getPair(args[0], testnetWQIEAddress)

          console.log("the Pair Address is", pairAddresssssss);
          let pairContracsts = new ethers.Contract(pairAddresssssss, ERC20ABI, signer)
          // let pairContractWithSigner = pairContract.connect(signer)
          console.log("Starting approval");
          let approvalTxssss = await pairContracsts.approve(testnetRouterAddress, "99999999999999999999999999999999999999999999999999999")
          await approvalTxssss.wait()
          console.log("Done Approving");
          console.log("in the removeLiquidityWithPermit function");
          let removeLiquidityETHSupportingFeeOnTransferTokens =
            await contractWithSigner[name](
              args[0],
              args[1],
              args[2],
              args[3],
              signer.address,
              deadline,
              { value }
            );
          await removeLiquidityETHSupportingFeeOnTransferTokens.wait();
          console.log(
            "done removeLiquidityETHSupportingFeeOnTransferTokens transaction"
          );
          break;
        case "swapExactTokensForETHSupportingFeeOnTransferTokens":
          console.log(
            "in the swapExactTokensForETHSupportingFeeOnTransferTokens function"
          );
          let nameFunction = "swapExactTokensForETH";
          let swapExactTokensForETHSupportingFeeOnTransferTokens =
            await contractWithSigner[nameFunction](
              args[0],
              args[1],
              args[2],
              signer.address,
              deadline,
              { value }
            );
          await swapExactTokensForETHSupportingFeeOnTransferTokens.wait();
          console.log(
            "done swapExactTokensForETHSupportingFeeOnTransferTokens transaction"
          );
          break;
        case "swapExactETHForTokensSupportingFeeOnTransferTokens":
          console.log(
            "in the swapExactETHForTokensSupportingFeeOnTransferTokens transaction"
          );
          let someName = "swapExactETHForTokens";
          console.log(args[0], args[1], args[2], args[3], args[4]);
          let swapping = await contractWithSigner[someName](
            args[0],
            args[1],
            signer.address,
            deadline,
            { value }
          );
          await swapping.wait();
          console.log(
            "done swapExactETHForTokensSupportingFeeOnTransferTokens transaction"
          );
          break;

        // Add more cases for other functions as needed
        case "addLiquidity":
          console.log("in the adding liquiidty function");
          let addLiquidity = await contractWithSigner[functionName](
            args[0],
            args[1],
            args[2],
            args[3],
            args[4],
            args[5],
            signer.address,
            deadline
          );
          await addLiquidity.wait();
          console.log("done adding liquidity");
          break;
        case "swapETHForExactTokens":
          console.log("in the swapETHForExactTokens function");
          let swapETHForExactTokens = await contractWithSigner[functionName](
            args[0],
            args[1],
            signer.address,
            deadline,
            { value }
          );
          await swapETHForExactTokens.wait();
          console.log("done swapETHForExactTokens transaction");
          break;
        default:
          console.error(`Unsupported function: ${functionName}`);
      }
      await delay(10000);

    }
  } catch (error) {
    console.error("Error processing transactions:", error);
    throw error;
  }
}

// processTransactionsForRouter();
processTransactionsForShop();
// processTransactions()