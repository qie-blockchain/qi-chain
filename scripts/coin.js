const axios = require("axios");
const { ethers } = require("hardhat");

let tokens = [
  {
    "number": 1,
    "contractName": "QIDEX",
    "contractAddress": "0x0f2380E602dD7EA5d717D8BF78c52496F1D54A96",
    "tokenType": "ERC-20",
    "totalSupply": "260,003,132.694",
    "holder_count": "296",
    "creatorAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e"
  },


  {
    "number": 4,
    "contractName": "Binance USD",
    "contractAddress": "0xD7D7715039dF8056A8B9f6463B48853C0CD210AF",
    "tokenType": "ERC-20",
    "totalSupply": "21,000,000,000",
    "holder_count": "16",
    "creatorAddress": "0x26ff527f9fa303a51a9e7c127149299d51863b1e"
  },
  {
    "number": 6,
    "contractName": "Ethereum main network",
    "contractAddress": "0x4E139DA14234660a74a2022304939a21cb9a74e6",
    "tokenType": "ERC-20",
    "totalSupply": "150,000,000",
    "holder_count": "10",
    "creatorAddress": "0x26ff527f9fa303a51a9e7c127149299d51863b1e"
  },
  {
    "number": 7,
    "contractName": "Tether USD",
    "contractAddress": "0x1Ca9da5B2c15917E95cb6C978E7621963D005ccB",
    "tokenType": "ERC-20",
    "totalSupply": "69,000,000,000",
    "holder_count": "9",
    "creatorAddress": "0x26ff527f9fa303a51a9e7c127149299d51863b1e"
  },
  {
    "number": 8,
    "contractName": "BaseSpace",
    "contractAddress": "0xd98791c19C88cBD64bC4180Bd5B090bAA87c2761",
    "tokenType": "ERC-20",
    "totalSupply": "10,000,000,000",
    "holder_count": "8",
    "creatorAddress": "0x887c8310922c0aed5cc09e1ce43c4779c7403300"
  },
  {
    "number": 9,
    "contractName": "BUSD",
    "contractAddress": "0x756d1CB1F9e97895ACae67955CA678B810EC79A2",
    "tokenType": "ERC-20",
    "totalSupply": "21,000,000,000",
    "holder_count": "6",
    "creatorAddress": "0x26ff527f9fa303a51a9e7c127149299d51863b1e"
  },
  {
    "number": 10,
    "contractName": "QI Blockchain - Mainnet",
    "contractAddress": "0x844f1bfc9f8BA2C71c8236A75714Eb872aD44040",
    "tokenType": "ERC-20",
    "totalSupply": "37,000,000",
    "holder_count": "6",
    "creatorAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e"
  },
  {
    "number": 12,
    "contractName": "Test Token",
    "contractAddress": "0x396a1b505174bA22D54570C2744Da6EC3C312D51",
    "tokenType": "ERC-20",
    "totalSupply": "1,000,000",
    "holder_count": "5",
    "creatorAddress": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9"
  },
  {
    "number": 13,
    "contractName": "IEVE",
    "contractAddress": "0x99F243A4b2ada68c8f99A0658EB7D3b76F6b3456",
    "tokenType": "ERC-20",
    "totalSupply": "21,000,000",
    "holder_count": "4",
    "creatorAddress": "0x81968c51f330e1b8252f5ca82337e3510a726fa7"
  },
  {
    "number": 25,
    "contractName": "infinity",
    "contractAddress": "0x25AF05D1116966c2Aeec95E44d702eEF3A8dA67C",
    "tokenType": "ERC-20",
    "totalSupply": "88,888,888",
    "holder_count": "2",
    "creatorAddress": "0xff46c57b87f90f0681053d63279149d9616e970b"
  },
  {
    "number": 23,
    "contractName": "Farnus",
    "contractAddress": "0x558A300681314a2634C4E849Aa21186628279C2F",
    "tokenType": "ERC-20",
    "totalSupply": "100,000,000",
    "holder_count": "2",
    "creatorAddress": "0xfba2dbb5f9e2d12f03e5805703a1cc7395164711"
  },
  {
    "number": 16,
    "contractName": "IndianCode",
    "contractAddress": "0x3E7EbF0082751510fa64cDE0C7692A9Ce1d394C0",
    "tokenType": "ERC-20",
    "totalSupply": "1,000",
    "holder_count": "3",
    "creatorAddress": "0xfb67a75d36f226b500cc1e38adcaa746698c13e1"
  },
  {
    "number": 17,
    "contractName": "MemeGold",
    "contractAddress": "0xFaE186d23BB3BC3c973E6FE23C17527E54D92840",
    "tokenType": "ERC-20",
    "totalSupply": "20,999,988,999.118",
    "holder_count": "3",
    "creatorAddress": "0xa42d6c6df20e10c62607cb5c04e76bf0b5516804"
  },

  {
    "number": 21,
    "contractName": "USDC",
    "contractAddress": "0x0f21E1B1F90473c6b4088a417278ABA7C0C0fc0e",
    "tokenType": "ERC-20",
    "totalSupply": "1,000,000,000",
    "holder_count": "3",
    "creatorAddress": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9"
  },
  {
    "number": 22,
    "contractName": "COBA",
    "contractAddress": "0xDa2c7273C4a6F06e7DDEF2b07748959f38AA619d",
    "tokenType": "ERC-20",
    "totalSupply": "100,000,000",
    "holder_count": "2",
    "creatorAddress": "0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d"
  },

  {
    "number": 24,
    "contractName": "IEVE",
    "contractAddress": "0xf9816FBAf0410c26c7b331e633F59B519f2d9a2f",
    "tokenType": "ERC-20",
    "totalSupply": "21,000,000",
    "holder_count": "2",
    "creatorAddress": "0x81968c51f330e1b8252f5ca82337e3510a726fa7"
  },

  {
    "number": 26,
    "contractName": "MemeGold",
    "contractAddress": "0xf84E05918c10BAA858a2508bdEf373A5e7A256f5",
    "tokenType": "ERC-20",
    "totalSupply": "2,121",
    "holder_count": "2",
    "creatorAddress": "0xa42d6c6df20e10c62607cb5c04e76bf0b5516804"
  },

  {
    "number": 38,
    "contractName": "USDQ",
    "contractAddress": "0x4DbA80b2BfE67D6F9FdeD22A6DF5EB59d418563E",
    "tokenType": "ERC-20",
    "totalSupply": "21,000,000",
    "holder_count": "2",
    "creatorAddress": "0x609fac9d07e0741ab22148a747db0993276ef889"
  },
 


];

async function getTokenHolders(contractAddress, page = 1, offset = 10000) {
  const apiUrl = `https://mainnet.qiblockchain.online/api?module=token&action=getTokenHolders&contractaddress=${contractAddress}&page=${page}&offset=${offset}`;
  const checkApiUrl = `https://mainnet.qiblockchain.online/token-counters?id=${contractAddress}`;
  try {
    const response = await axios.get(apiUrl);
    const checkRespose = await axios.get(checkApiUrl);
    const tokenHolders = checkRespose.data.token_holder_count;
    // console.log(tokenHolders);
    if (tokenHolders !== response.data.result.length) {
      console.log(tokenHolders, response.data.result.length);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching token holders:", error.message);
    throw error;
  }
}

class ManualNonceManager {
    constructor(initialNonce) {
      this.nonce = initialNonce;
    }
  
    increment() {
      return this.nonce++;
    }
  }
  
async function mintNFT(contract, tokens, wallet, nonceManager) {
    for (const { address, value } of tokens) {
      // const nonce = nonceManager.increment();
      try {
        // Mint NFT directly using the contract instance
        console.log(`address ${address}, value ${value}`);

        const tx = await contract.transfer(address, value);
        await tx.wait();
  
        console.log(`Token transfered to ${address}, amoount ${value}`);
      } catch (error) {
        console.error("Error in token transfer:", error);
      }
    }
  }

async function doAll() {
  const provider = new ethers.getDefaultProvider('http://146.190.15.105:10002/'); // Replace with your custom chain RPC URL
  const wallet = new ethers.Wallet("1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155");

  const customWallet = wallet.connect(provider); 
  // const wallet = new ethers.Wallet(''); // Replace "your-private-key" with the private key of your custom wallet

  const deployedContracts = [];
  for (const { contractAddress } of tokens) {
    console.log(contractAddress, "address from tokens");
    try {
      let holders = await getTokenHolders(contractAddress)
        .then((data) => {
          console.log("Token holders:", data.result.length);
          return data.result;
        })
        .catch((error) => {
          console.error("Failed to fetch token holders:", error.message);
        });
        let y = await customWallet.getNonce()
        
        console.log(y, "Nonce from the wallet");
          // const deployedContracts = [];
          const nonceManager = new ManualNonceManager(y)
        
        let urlForSymbol = `https://mainnet.qiblockchain.online/api?module=token&action=getToken&contractaddress=${contractAddress}`
        let responseForSymbol = await axios.get(urlForSymbol)
        let symbol = responseForSymbol.data.result.symbol
        let name = responseForSymbol.data.result.name

        let totalSupply = responseForSymbol.data.result.totalSupply
        totalSupply = Math.floor(ethers.formatEther(totalSupply))
        console.log("totalSupply",totalSupply);
        console.log(holders);
        const nonce = nonceManager.increment();
        const NFTContract = await ethers.getContractFactory("Tether"); // Replace "YourNFTContract" with the actual name of your NFT contract
        const initialOwner = "0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1";
        const deployTransaction = {
          nonce: nonce ,
          chainId: 5656,
          gasLimit: 5000000, // adjust gas limit as needed
          // gasPrice: ethers.utils.parseUnits("50", "gwei"), // adjust gas price as needed
        };
        console.log(`Deploying ERC contract with name: ${name} and symbol: ${symbol}`);
        const nftContract = await NFTContract.connect(customWallet).deploy(initialOwner, name, symbol,totalSupply);
        await nftContract.waitForDeployment()
        console.log(nftContract.populateTransaction);
        let addressOFtheCoin = await nftContract.getAddress()
        console.log(addressOFtheCoin);
        deployedContracts.push(nftContract);
        // console.log(nftContract.getAddress());
        // await mintNFT(nftContract, holders, customWallet,  nonceManager);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   await fetchData(endpoint).then((address) => {
    //     console.log(address, "Creator Address");
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
doAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Example usage
const contractAddress = "0x0f2380E602dD7EA5d717D8BF78c52496F1D54A96";
