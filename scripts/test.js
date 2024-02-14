const {ethers} = require('hardhat')

let val = 0.1
        //   10030357229551174591687029612167891

console.log(ethers.parseEther(val.toString(), 'wei'));
// const QIDexFactory = await ethers.getContractFactory("QIDexFactory");
// const WQIE = await ethers.getContractFactory("WQIE");
// let owner = customWallet;
// let factory = await QIDexFactory.connect(owner).deploy(owner.address, "0xC7BD2D42B0F311A55af9Ca49B739706b1355ed80", deployTransaction);
// await factory.waitForDeployment();

// let wqie = await WQIE.connect(owner).deploy(deployTransaction);
// await wqie.waitForDeployment();
// let factoryAddress = await factory.getAddress()
// let wqieAddress = await wqie.getAddress()

// console.log("QIDexFactory deployed to:", factoryAddress);
// console.log("WQIE deployed to:", wqieAddress);

// const QIDexRouter = await ethers.getContractFactory("QIDexRouter");
// let router = await QIDexRouter.connect(owner).deploy(factoryAddress, wqieAddress, deployTransaction);
// await router.waitForDeployment();