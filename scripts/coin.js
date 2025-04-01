const fs = require('fs');
const axios = require("axios");
const { ethers } = require("hardhat");

let count = 0;
let tokens = [
  { "contractAddress": "0xDa2c7273C4a6F06e7DDEF2b07748959f38AA619d" },
  { "contractAddress": "0x0f2380E602dD7EA5d717D8BF78c52496F1D54A96" },
  { "contractAddress": "0x0a5DAE5e149730c8BED724285E5281F960946c0E" },
  { "contractAddress": "0x8780b97C72F59E9F87a4411984399a8c80E95678" },
  { "contractAddress": "0xD7D7715039dF8056A8B9f6463B48853C0CD210AF" },
  { "contractAddress": "0x4E139DA14234660a74a2022304939a21cb9a74e6" },
  { "contractAddress": "0x99F243A4b2ada68c8f99A0658EB7D3b76F6b3456" },
  { "contractAddress": "0x756d1CB1F9e97895ACae67955CA678B810EC79A2" },
  { "contractAddress": "0x371bb345019a5e9E262629d610355c1195908547" },
  { "contractAddress": "0x558A300681314a2634C4E849Aa21186628279C2F" },
  { "contractAddress": "0xA419dDc29021b890b849E88BEa7f678BC9f31b3f" },
  { "contractAddress": "0xf84E05918c10BAA858a2508bdEf373A5e7A256f5" },
  { "contractAddress": "0xFaE186d23BB3BC3c973E6FE23C17527E54D92840" },
  { "contractAddress": "0x25AF05D1116966c2Aeec95E44d702eEF3A8dA67C" },
  { "contractAddress": "0x1Ca9da5B2c15917E95cb6C978E7621963D005ccB" },
  { "contractAddress": "0x844f1bfc9f8BA2C71c8236A75714Eb872aD44040" },
  { "contractAddress": "0x0f21E1B1F90473c6b4088a417278ABA7C0C0fc0e" },
  { "contractAddress": "0xf9816FBAf0410c26c7b331e633F59B519f2d9a2f" },
  { "contractAddress": "0x89bC6BBCd695a12531F32d7cb38d4aF111fCCba9" },
  { "contractAddress": "0xd98791c19C88cBD64bC4180Bd5B090bAA87c2761" },
  { "contractAddress": "0x108a4AEB39E8dd17C050B4fd9110701B6649E40B" },
  { "contractAddress": "0x4DbA80b2BfE67D6F9FdeD22A6DF5EB59d418563E" },
  { "contractAddress": "0x3E7EbF0082751510fa64cDE0C7692A9Ce1d394C0" },
  { "contractAddress": "0x9c5FBAB7fa85cDB9882f131F954C2468cc97E57E" }
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

async function doAll() {
  const provider = new ethers.getDefaultProvider('http://146.190.15.105:10002/'); // Replace with your custom chain RPC URL
  const wallet = new ethers.Wallet("1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155");

  const customWallet = wallet.connect(provider);
  // const wallet = new ethers.Wallet(''); // Replace "your-private-key" with the private key of your custom wallet

  const deployedContracts = [];
  for (const { contractAddress } of tokens) {
    try {

      // let holders = await getTokenHolders(contractAddress)
      //   .then((data) => {
      //     // console.log("Token holders:", data.result.length);
      //     return data.result;
      //   })
      //   .catch((error) => {
      //     console.error("Failed to fetch token holders:", error.message);
      //   });

      let y = await customWallet.getNonce()

      console.log(y, "Nonce from the wallet");
      // const deployedContracts = [];
      const nonceManager = new ManualNonceManager(y)

      let urlForSymbol = `https://mainnet.qiblockchain.online/api?module=token&action=getToken&contractaddress=${contractAddress}`
      let responseForSymbol = await axios.get(urlForSymbol)
      let symbol = responseForSymbol.data.result.symbol
      let name = responseForSymbol.data.result.name
      let decimals=responseForSymbol.data.result.decimals
      let totalSupply = responseForSymbol.data.result.totalSupply
      console.log(parseInt(totalSupply/ 10 ** decimals).toString())
      const NFTContract = await ethers.getContractFactory("Tether"); // Replace "YourNFTContract" with the actual name of your NFT contract
      const initialOwner = "0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1";

      console.log(`Deploying ERC contract with name: ${name} and symbol: ${symbol}`);
      const nftContract = await NFTContract.connect(customWallet).deploy(initialOwner, name, symbol,totalSupply, decimals);
      await nftContract.waitForDeployment()
      nftContract.populateTransaction;
      let addressOFtheCoin = await nftContract.getAddress()
      console.log(contractAddress, "Old contract address");
      console.log(addressOFtheCoin, "New contract address");
      count++;
      let obj = {
        "number": count+1,
        "contractName": name,
        "symbol": symbol,
        "previousContractAddress": contractAddress,
        "newContractAddress": addressOFtheCoin,
      }

      deployedContracts.push(obj);

      // store the deployed contract address in json file and add token name and symbol
      let data = JSON.stringify(deployedContracts);
      fs.writeFileSync('deployedERC-20Contracts22Feb.json', data);

    } catch (error) {
      console.log(error);
    }
  }
}

doAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
