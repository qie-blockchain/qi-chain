const { ethers } = require('hardhat')
const deployTransaction = {
  // nonce: nonce,
  chainId: 5656,
  gasLimit: 5000000,  // adjust gas limit as needed
  // gasPrice: ethers.utils.parseUnits("50", "gwei"), // adjust gas price as needed
};

const stakingAddress = "0x5163c4C24cEb5EBF75795986f8E8181AAfc5E38b";
class ManualNonceManager {
  constructor(initialNonce) {
    this.nonce = initialNonce;
  }

  increment() {
    return this.nonce++;
  }
}

async function deployDex() {

  const provider = new ethers.getDefaultProvider('http://146.190.15.105:10002/'); // Replace with your custom chain RPC URL
  const wallet = new ethers.Wallet("1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155");

  const customWallet = wallet.connect(provider);
  // const wallet = new ethers.Wallet(''); // Replace "your-private-key" with the private key of your custom wallet

  let x = await ethers.provider.getTransactionCount("0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1")
  let y = await customWallet.getNonce()
  console.log(x, y);
  const nonceManager = new ManualNonceManager(y)    // const contract = await deployNFTContract(customWallet, name, symbol, nonceManager);

  const QIDexFactory = await ethers.getContractFactory("QIDexFactory");
  const WQIE = await ethers.getContractFactory("WQIE");
  let owner = customWallet;
  let factory = await QIDexFactory.connect(owner).deploy(owner.address, stakingAddress, deployTransaction);
  await factory.waitForDeployment();

  let wqie = await WQIE.connect(owner).deploy(deployTransaction);
  await wqie.waitForDeployment();
  let factoryAddress = await factory.getAddress()
  let wqieAddress = await wqie.getAddress()

  console.log("QIDexFactory deployed to:", factoryAddress);
  console.log("WQIE deployed to:", wqieAddress);

  const QIDexRouter = await ethers.getContractFactory("QIDexRouter");
  let router = await QIDexRouter.connect(owner).deploy(factoryAddress, wqieAddress, deployTransaction);
  await router.waitForDeployment();
  let routerAddress = await router.getAddress()
  console.log("QIDexRouter deployed to:", routerAddress);
}

deployDex().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
