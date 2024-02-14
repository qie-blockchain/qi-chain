const deployTransaction = {
    // nonce: nonce,
    chainId: 5656,
    gasLimit: 5000000, // adjust gas limit as needed
    // gasPrice: ethers.utils.parseUnits("50", "gwei"), // adjust gas price as needed
  };
  const QIDexFactory = await ethers.getContractFactory("QIDexFactory");
  const WQIE = await ethers.getContractFactory("WQIE");
  let owner = customWallet;
  let factory = await QIDexFactory.connect(owner).deploy(owner.address, "0x82A9519650741613D0Fd808834B2DFDC842106Fc", deployTransaction);
  await factory.waitForDeployment();
  // 1898 1735 1732 1730 1725 1724 1250 150
  let wqie = await WQIE.connect(owner).deploy(deployTransaction);
  await wqie.waitForDeployment();
  let factoryAddress = await factory.getAddress()
  let wqieAddress = await wqie.getAddress()

  console.log("QIDexFactory deployed to:", factoryAddress);
  console.log("WQIE deployed to:", wqieAddress);

  const QIDexRouter = await ethers.getContractFactory("QIDexRouter");
  let router = await QIDexRouter.connect(owner).deploy(factoryAddress, wqieAddress, deployTransaction);
  await router.waitForDeployment();