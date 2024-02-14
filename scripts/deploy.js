// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
const {ethers} = require('hardhat')
const axios = require('axios')
const fs = require('fs');
const url = require('url');
const http = require('http');


function writeJsonToFile(jsonObject, filePath) {
  try {
    const jsonString = JSON.stringify(jsonObject, null, 2); // The third argument (2) specifies the number of spaces to use for indentation.
    fs.writeFileSync(filePath, jsonString);
    console.log(`JSON data has been written to ${filePath}`);
  } catch (error) {
    console.error('Error writing JSON to file:', error);
  }
}
async function getObj()
{
  let obj = []
  let apiUrl =
  "https://node.hovr.site/api/v1/collection/collectionList?page=1&limit=50000000000&isPromoted=false";
let responseForAllCollections = await axios.get(apiUrl);
let docs = responseForAllCollections.data.result.docs;

for (let doc in docs) {
  let _id = docs[doc]._id;
  console.log(_id);
  let url = `https://node.hovr.site/api/v1/order/particularCollectionOrderList/?_id=${_id}`;

  try {
    let responseNFT = await axios.get(url);
    // console.log(responseNFT.data.result);
    // let creatorId = responseNFT.data.result[0].creatorId
    let creatorId = docs[doc].userId


    let bidObj = {}
   
    let tokenName = responseNFT.data.result[0].tokenName
    console.log("Creator DB ID is", creatorId);
    console.log("Token Name DB ID is", tokenName);

    // console.log(responseNFT.data);
    let contractaddressNFT = responseNFT.data.result[0].nftId.contractAddress;
    let urlForID = `https://mainnet.qiblockchain.online/api?module=token&action=getToken&contractaddress=${contractaddressNFT}`;
    let responseForNftID = await axios.get(urlForID);

    let nftTokenName = docs[doc].displayName
    let nftTokenSymbol = docs[doc].symbol
    console.log("NFT token name", nftTokenName);
    console.log("NFT Token Symbol", nftTokenSymbol);

    let urlForNFTOwner = `https://node.hovr.site/api/v1/user/getUserDetails/${creatorId}`
    let responseForCreatorwallet = await axios.get(urlForNFTOwner)
    let walletAddressofCreator = responseForCreatorwallet.data.result[0].walletAddress
    console.log("wallet Address of the creator", walletAddressofCreator);
    // console.log(responseNFT.data);
   let  tokenList = []
    for (let i = 0; i < responseNFT.data.result.length; i++) {
    //   console.log(i);
    //   tokenList = []
        let bidId = responseNFT.data.result[i].bidId;
        let bids = []
        if(bidId === null){
          bidId = []
        }else{
          bidId.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          console.log(bidId, "BidID");

          for(let k in bidId){
            let urlForBidding = `https://node.hovr.site/api/v1/user/getUserDetails/${bidId[k]["userId"]}`
          let responseForBidding = await axios.get(urlForBidding)
          let walletAddressOfBidder = responseForBidding.data.result[0].walletAddress
          bids.push({walletAddressOfBidder, value:bidId[k]["price"]})
          }
        }
        console.log(bids);
        let nftTokenID = responseNFT.data.result[i].nftId.tokenId;
      console.log(nftTokenID, "Token ID for the NFT");
      let nftTokenUriIpfs = responseNFT.data.result[i].nftId.uri;
      let nftPrice = responseNFT.data.result[i].price;
      let expiryTime = responseNFT.data.result[i].expiryTime;
      let royalties =  responseNFT.data.result[i].royalties;
     
      let finalPrice =  nftPrice.toString()
      // print(f"{nftTokenUriIpfs=}")
      console.log(nftTokenUriIpfs, "Token URI");
      let currentOwnerOfNFT =
        responseNFT.data.result[i].currentOwner.walletAddress;
      console.log(currentOwnerOfNFT, "current owner of the NFT");
        tokenList.push({tokenId:nftTokenID, tokenOwner:currentOwnerOfNFT, tokenURI:nftTokenUriIpfs, price:finalPrice, expiryTime:expiryTime, royalties:royalties, bids})
      
 
    }
    console.log(tokenList);
    obj.push({
        name:nftTokenName,
        symbol:nftTokenSymbol,
        originalContractAddress:contractaddressNFT,
        originalCreatorAddress:walletAddressofCreator,
        tokens:tokenList
    })
  } catch (error) {
    console.log(error.code, "error");
    if (error.code === "ERR_BAD_REQUEST") {
      console.log(
        "No data found, the api probably gave 400 code so moving ahead with another collection"
      );
    } else {
      console.log("Something else gone wrong, this is the id", _id);
      console.log(error);
    }
  }

}
writeJsonToFile(obj,"newTestingNFTss.json")
return obj

}
// getObj()
// console.log(obj, "OBJ");
// console.log(obj[0].tokens);
class ManualNonceManager {
  constructor(initialNonce) {
    this.nonce = initialNonce;
  }

  increment() {
    return this.nonce++;
  }
}


async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;
  const privateKey = "1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155"

  const provider = new ethers.getDefaultProvider('http://182.72.203.246:10002/'); // Replace with your custom chain RPC URL
  const wallet = new ethers.Wallet(privateKey);

  const customWallet = wallet.connect(provider); 
   const initialOwner = "0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1";
  // const customWallet = new ethers.Wallet(privateKey);

  const ContractFactory = await ethers.getContractFactory('MyToken'); // Replace with your contract name
  const contractInstance = await ContractFactory.connect(customWallet).deploy();

  // Wait for the contract to be mined
  await contractInstance.deployed();

  // const lock = await hre.ethers.deployContract("MyToken", [initialOwner], {
  //   value: initialOwner,
  // });

  // await lock.waitForDeployment();

  // console.log(
  //   `Lock with ${initialOwner}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}
async function deployNFTContract(wallet, name, symbol,nonceManager ) {
  const nonce = nonceManager.increment();
  const NFTContract = await ethers.getContractFactory("MyToken"); // Replace "YourNFTContract" with the actual name of your NFT contract
  const initialOwner = "0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1";
  const deployTransaction = {
    nonce: nonce,
    chainId: 9987,
    gasLimit: 5000000, // adjust gas limit as needed
    // gasPrice: ethers.utils.parseUnits("50", "gwei"), // adjust gas price as needed
  };
  console.log(`Deploying NFT contract with name: ${name} and symbol: ${symbol}`);
  // const nftContract = await NFTContract.connect(wallet).deploy(deployTransaction, initialOwner, name, symbol);
  // // await nftContract.deployTransaction.wait();
  // await nftContract.waitForDeployment()
  // let s = nftContract.deploymentTransaction().hash
  // console.log(`NFT contract deployed to address: ${s}`);
  // return nftContract;
  const nftContract = await NFTContract.connect(wallet).deploy(initialOwner, name, symbol, deployTransaction);

  // Wait for the deployment transaction to be mined
  await nftContract.waitForDeployment()
return nftContract;
}
// nftContract, tokens, customWallet,  nonceManager)

async function mintNFT(contract, tokens, wallet, nonceManager,marketContract ) {
  console.log(marketContract);
  for (const { tokenOwner, tokenURI, tokenId, price, expiryTime,royalties  } of tokens) {
    // const nonce = nonceManager.increment();
    try {
      // Mint NFT directly using the contract instance
      // const tx = await contract.safeMint("0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1", tokenURI, tokenId);
      // await tx.wait();
      // console.log("minting done");
      // const newTxn = await contract.approve("0x3B4A3535B4748C7F23a530C7d42E06D1Dd037EBE", tokenId)
      // console.log("approval done for token id", tokenId);

      // await newTxn.wait()

      let j = await marketContract.owner()
      console.log(j);
    
      // let nftAddress = await contract.getAddress()
      // let listingTxn = await marketContract.createOrderAdmin(nftAddress, tokenId,(price*10**18).toString(), (parseInt(royalties)*10**18).toString(),expiryTime.toString(), "0xc08befbc2E056cC2906CE6bc118A8EAD123Fb878", tokenOwner )
      console.log("listing txn called"); 
      await listingTxn.wait()
      console.log("done  for", nftAddress, tokenId);
      console.log(`NFT minted with tokenId ${tokenId}`);
    } catch (error) {
      console.error("Error in mintNFT:", error);
    }
  }
}

// Example usage

async function deployMultipleContracts() {
  // let ob = await getObj()
  // writeJsonToFile(ob, "ob.json")
  // console.log(ob);
  const contractsData = [  {
    "name": "Prabhash",
    "symbol": "QI",
    "originalContractAddress": "0x905b0aED34d4A31044b7af53253ACE1BA1Fc106A",
    "originalCreatorAddress": "0x2fecb3d1bb524313D318cA6371508c3bD94d2077",
    "tokens": [
      {
        "tokenId": "388",
        "tokenOwner": "0x2fecb3d1bb524313D318cA6371508c3bD94d2077",
        "tokenURI": "https://ipfs.io/ipfs/QmUbTEhEGyk5xjXiMSHyKVymFxNyZZieR5NLPnHPmG7JFN",
        "price": "1",
        "expiryTime": "1714039560000",
        "royalties": "1",
        "bids": [
          {
            "walletAddressOfBidder": "0x307cfa8c6ca79079839309F60B2eD126F3b39136",
            "value": 0.7
          }
        ]
      },
      {
        "tokenId": "387",
        "tokenOwner": "0x2fecb3d1bb524313D318cA6371508c3bD94d2077",
        "tokenURI": "https://ipfs.io/ipfs/QmY6avdzNoVeM7Qonq9QRtZEibwJV4Z3Ljes293yLbsXiZ",
        "price": "0.7",
        "expiryTime": "1706949058380",
        "royalties": "1",
        "bids": [
          {
            "walletAddressOfBidder": "0x5cBF70A8150Fee0780d67b936bC3Beed8174563D",
            "value": 0.5
          }
        ]
      },
      {
        "tokenId": "386",
        "tokenOwner": "0x2E61822721b7f4D0960CeC56c70A197db53B0781",
        "tokenURI": "https://ipfs.io/ipfs/QmUZgyGkdZLa6viSxMNx1aJVCKEmQEeTVNzhS3bTDXLcRX",
        "price": "1",
        "expiryTime": "1738394952000",
        "royalties": "1",
        "bids": []
      }
    ]
  }]
  const provider = new ethers.getDefaultProvider('http://146.190.15.105:10002/'); // Replace with your custom chain RPC URL
  const wallet = new ethers.Wallet("1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155");

  const customWallet = wallet.connect(provider); 
  // const wallet = new ethers.Wallet(''); // Replace "your-private-key" with the private key of your custom wallet

  const deployedContracts = [];

let x = await ethers.provider.getTransactionCount("0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1")
let y = await customWallet.getNonce()
console.log(x, y);
  // const deployedContracts = [];
  const nonceManager = new ManualNonceManager(y)

  const NFTContract = await ethers.getContractFactory("NFT"); // Replace "YourNFTContract" with the actual name of your NFT contract
  const initialOwner = "0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1";
  const deployTransaction = {
    // nonce: nonce,
    chainId: 5656,
    gasLimit: 5000000, // adjust gas limit as needed
    // gasPrice: ethers.utils.parseUnits("50", "gwei"), // adjust gas price as needed
  };
  
  console.log(`Deploying NFT contract with name: and symbol:`);
  let baseUri="ipfs"
  const nftContract = await NFTContract.connect(customWallet).deploy("Nft", "NFT",baseUri, deployTransaction);
  await nftContract.waitForDeployment()
  let newNFTContractAddress = await nftContract.getAddress()
  let originalContractAddress = contractsData[0].originalContractAddress
  let urlForNFTContractChanging = `http://182.74.213.163:2029/api/v1/nft/changeContractAddress?oldContractAddress=${originalContractAddress}&newContractAddress=${newNFTContractAddress}`
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmQxY2EzZWIxNGIwZmUyNmRiNjBmYSIsIndhbGxldEFkZHJlc3MiOiIweDFhMTVBQTMyMWM2ZEY5ODVGZjYzMUYzMzhCZjMxNTk3YzQwODI3RDIiLCJ1c2VyVHlwZSI6IlVzZXIiLCJpYXQiOjE3MDczMTAzMTcsImV4cCI6MTcwNzM5NjcxN30.y-2m4zOhV2KC--HC_TcTBJKUq9hOeZERuvwa82_uutY";

  const responseForChangingNFT = await axios.get(urlForNFTContractChanging, {
    protocol: 'http',
    maxRedirects: 0,
    headers: {
      'accept': 'application/json',
      'token': token
    }
  });

  let abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "BidAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "BidCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "nftAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "assetId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "priceInWei",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiresAt",
          "type": "uint256"
        }
      ],
      "name": "BidCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cutPerMillion",
          "type": "uint256"
        }
      ],
      "name": "ChangedFeePerMillion",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "OrderCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "nftAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "assetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "priceInWei",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiresAt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "currency",
          "type": "address"
        }
      ],
      "name": "OrderCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "priceInWei",
          "type": "uint256"
        }
      ],
      "name": "OrderSuccessful",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "priceInWei",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiresAt",
          "type": "uint256"
        }
      ],
      "name": "OrderUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MARKETPLACE_ETHER",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        }
      ],
      "name": "acceptBid",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "acceptedCurrencies",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_nftId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_creator",
          "type": "address"
        }
      ],
      "name": "addNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bidByOrderId",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiresAt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        }
      ],
      "name": "cancelBid",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_royalty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiresAt",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_currency",
          "type": "address"
        }
      ],
      "name": "createOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_royalty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiresAt",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_currency",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_actualOwner",
          "type": "address"
        }
      ],
      "name": "createOrderAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cutPerMillion",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddresss",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        }
      ],
      "name": "getTokenMinterTesting",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxCutPerMillion",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orderByAssetId",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "royalty",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiresAt",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "currency",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        }
      ],
      "name": "safeExecuteOrder",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiresAt",
          "type": "uint256"
        }
      ],
      "name": "safePlaceBid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiresAt",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_actualBidder",
          "type": "address"
        }
      ],
      "name": "safePlaceBidAdmin",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "setCurrency",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cutPerMillion",
          "type": "uint256"
        }
      ],
      "name": "setOwnerCutPerMillion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_setPaused",
          "type": "bool"
        }
      ],
      "name": "setPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_priceInWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_expiresAt",
          "type": "uint256"
        }
      ],
      "name": "updateOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  let marketPlaceAddress ="0x3B4A3535B4748C7F23a530C7d42E06D1Dd037EBE"
  const marketContract = await new ethers.Contract(marketPlaceAddress, abi, provider).connect(customWallet);
  console.log(responseForChangingNFT.data.statusCode, "Status Code for the changing the contract address");
  for (let { name, symbol, tokens, originalCreatorAddress } of contractsData) {
    console.log(`NFT DEPLOYED ${name}, ${symbol}`);
    console.log(`New NFT contractaddress is ${newNFTContractAddress}`);

    for (let { tokenOwner, tokenURI, tokenId, price, expiryTime,royalties, bids  } of tokens) {
    
      try {
        // Mint NFT directly using the contract instance

        console.log(royalties, originalCreatorAddress, tokenId);
        name = name.replace(/[^\w\s]/gi, '');

        const tx = await nftContract.createAdmin(tokenURI.toString(), name.toString(), royalties.toString(),originalCreatorAddress, tokenId);
        await tx.wait();
        console.log("minting done");
        const newTxn = await nftContract.approve(marketPlaceAddress, tokenId)
        console.log("approval done for token id", tokenId);
  
        await newTxn.wait()
  
        let j = await marketContract.owner()
        console.log(j);
        let formattedPrice =  ethers.parseEther(price.toString(), 'wei')
        let nftAddress = await nftContract.getAddress()
        let listingTxn = await marketContract.createOrderAdmin(nftAddress, tokenId,formattedPrice, royalties.toString(),expiryTime.toString(), "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", originalCreatorAddress )
        console.log("listing txn called"); 
        await listingTxn.wait()
        for(let j in bids){
          let biddingTxnValues = {
            // nonce: nonce,
            value:ethers.parseEther(bids[j].value.toString(), 'wei'),
            chainId: 5656,
            gasLimit: 5000000, // adjust gas limit as needed
            // gasPrice: ethers.utils.parseUnits("50", "gwei"), // adjust gas price as needed
          };
          console.log(bids);
          let biddingTxn = await marketContract.safePlaceBidAdmin(nftAddress,tokenId,ethers.parseEther(bids[j].value.toString(), 'wei'), expiryTime.toString(),bids[j].walletAddressOfBidder, biddingTxnValues)
          console.log("bidding txn inititated");
          await biddingTxn.wait()
          console.log(`bidding done for ${bids[j].walletAddress}, and for nft ${nftAddress}`);
        
        }
        console.log("done  for", nftAddress, tokenId);
        console.log(`NFT minted with tokenId ${tokenId}`);
      } catch (error) {
        console.error("Error in mintNFT:", error);
      }
    }

  }


  console.log("All contracts deployed:", deployedContracts.map(c => c.address));
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployMultipleContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// getObj().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
