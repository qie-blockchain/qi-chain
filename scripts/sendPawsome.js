const { ethers } = require('hardhat')

class ManualNonceManager {
	constructor(initialNonce) {
		this.nonce = initialNonce;
	}

	increment() {
		return this.nonce++;
	}
}

const pawsome_data = [
	{
		"name": "NFT",
		"symbol": "NFT",
		"result":[
			{
			  "address": "0x712a238cc2f9168fbbb5ed8b23c8ad78a8fc6f09",
			  "value": "17"
			},
			{
			  "address": "0x8d0473d4e8e8d847e70ac83afbf62b037963548e",
			  "value": "5"
			},
			{
			  "address": "0x8f8e8eff1c7681660e0508b74944da55cdbf5180",
			  "value": "1"
			},
			{
			  "address": "0x790b5e747a33196c8da58afd9abc53efcc32a0f3",
			  "value": "4"
			},
			{
			  "address": "0xde8d80a173df549eda90b42adc21165154233be8",
			  "value": "10"
			},
			{
			  "address": "0xca3e5532f263b4536595065b91d5aacdca56ca56",
			  "value": "6"
			},
			{
			  "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
			  "value": "2"
			},
			{
			  "address": "0xa3e7126770be4e9d6f436773294fcc43c6c34de3",
			  "value": "2"
			},
			{
			  "address": "0x41d1c1bbdd8ce06ac70b418f1d0c26e33e13b31f",
			  "value": "5"
			},
			{
			  "address": "0x9a8d3160428b0e08aaa28b6c20a853a617a345fe",
			  "value": "7"
			},
			{
			  "address": "0xf1ab8ed437fd97102e9c7d55d9f1c431270bb8a9",
			  "value": "12"
			},
			{
			  "address": "0x49b1faa057e888a62088ac72db7a41c04bf2e65e",
			  "value": "1"
			},
			{
			  "address": "0xbcf3111ac8bd9e44a3a23e899c2270650f282963",
			  "value": "1"
			},
			{
			  "address": "0x385d297d8c9293c893a76f7089da60c4244a066d",
			  "value": "5"
			},
			{
			  "address": "0xc926a2aa2443b1d47edfc04477fca0eb6c09ab0e",
			  "value": "1"
			},
			{
			  "address": "0xd9e34ce8ba0ecf31c6bbd9927235ae4afb125b11",
			  "value": "1"
			},
			{
			  "address": "0xf75f3df0dce0eeb7e8e072af792d8623ea4b185b",
			  "value": "1"
			},
			{
			  "address": "0x582ae82fd48a57ef3b203a84e751ba414599fe53",
			  "value": "1"
			},
			{
			  "address": "0x1830882e7565449a3a7af6446f7a964219a4e40e",
			  "value": "1"
			},
			{
			  "address": "0x533406234dad06531e6a708f516efd14496076d0",
			  "value": "3"
			},
			{
			  "address": "0xa0ae9ecb5f0e58e450a4273d333696da6a670c17",
			  "value": "1"
			},
			{
			  "address": "0xef9444d0810a445689622a5dc9d3b06c68ce94b4",
			  "value": "1"
			},
			{
			  "address": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9",
			  "value": "2"
			},
			{
			  "address": "0x5adb4a3da535527bcdb0e6180ba9a006c8304fc6",
			  "value": "1"
			},
			{
			  "address": "0x0ee8d0137b0aa94a498cae56cf2e6e8402940ee0",
			  "value": "2"
			},
			{
			  "address": "0xde1a36e3200f9b1fcd142ef29959a1c0c2f8123c",
			  "value": "1"
			},
			{
			  "address": "0x503d777b227657936e5c6e70d54e03f2b9d061c2",
			  "value": "1"
			},
			{
			  "address": "0xa4735833300554bd5ab11fef085565f98af090c4",
			  "value": "1"
			},
			{
			  "address": "0xc681516a5f9584ca9afa1a11f944e76dfb5f23e5",
			  "value": "3"
			},
			{
			  "address": "0x7b0d853699fdae6ecfc8b241a5470937c8c86255",
			  "value": "12"
			},
			{
			  "address": "0xa1d2f3281a2d51414640cb62a398d60aa47ac601",
			  "value": "1"
			},
			{
			  "address": "0xd9adb159791f59a968827c8f929b7e8ac4803a83",
			  "value": "1"
			},
			{
			  "address": "0x92ff9579428b52482428c0bc68a51db188170297",
			  "value": "3"
			},
			{
			  "address": "0x2e61822721b7f4d0960cec56c70a197db53b0781",
			  "value": "4"
			},
			{
			  "address": "0xcb056a4e112d7bddfaa10f9a2131b48e33678c1a",
			  "value": "2"
			},
			{
			  "address": "0xb294fac670545eb343f93af56ba9ea161e970c8d",
			  "value": "1"
			},
			{
			  "address": "0x2dbab26e637023d9c3389d84cc7d7dd548092e18",
			  "value": "4"
			},
			{
			  "address": "0x8b8311f04dea09bbd06781c4dceaec3000d8e7aa",
			  "value": "1"
			},
			{
			  "address": "0x1ff223f5f1a3b867533486bbb0360717b036f94a",
			  "value": "10"
			},
			{
			  "address": "0xd59cda8717c8d51abd3221f62ac757170c78d961",
			  "value": "5"
			},
			{
			  "address": "0x978f4e56ae55c0602c607c3c7f80392217b3bf98",
			  "value": "6"
			},
			{
			  "address": "0x96804e012091bdca8d757564e17a0910d2ef5332",
			  "value": "2"
			},
			{
			  "address": "0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d",
			  "value": "2"
			},
			{
			  "address": "0x609fac9d07e0741ab22148a747db0993276ef889",
			  "value": "1"
			},
			{
			  "address": "0x235685a5b1078b92567ecfe25d0e72dfd1c72de1",
			  "value": "2"
			},
			{
			  "address": "0xeb8091999cd3832ba8421cffea253c43a9acd525",
			  "value": "1"
			},
			{
			  "address": "0x2c0d59a5df87e7216255d6e67a466ef686b5a2a8",
			  "value": "1"
			},
			{
			  "address": "0x4b58f21a8d83b3b3ce828b283e0f7396e5b5fdc6",
			  "value": "1"
			},
			{
			  "address": "0xe762d309d59b3c904eedcbb5f5881ec0c6452d60",
			  "value": "1"
			},
			{
			  "address": "0x6a56b932e231d9dc4f8e08c94f4411b65b41294a",
			  "value": "1"
			},
			{
			  "address": "0x979ac144edda0249938e175e80d400fcd779eeeb",
			  "value": "1"
			}
		  ],
		"status": "1"
	}
]

const Hooligans_data = [
	{
		"name": "HovR Hooligans",
		"symbol": "HOL",
		"result": [
			{
			  "address": "0xc2d3e68b4e8cf2f71506f12fb19e7cf65999f241",
			  "value": "12"
			},
			{
			  "address": "0xde8d80a173df549eda90b42adc21165154233be8",
			  "value": "14"
			},
			{
			  "address": "0xd59cda8717c8d51abd3221f62ac757170c78d961",
			  "value": "2"
			},
			{
			  "address": "0xa2729176dd7e6042b9d38e2b7e16ad1b0ed6e415",
			  "value": "1"
			}
		  ],
		"status": "1"
	}
]

async function mintNFT(contract, wallet, nonceManager) {
	let setBaseURI = "";
	const symbol = await contract.symbol();
	if (symbol === "HOL") {
		setBaseURI = await contract.setBaseURI("https://ipfs.io/ipfs/QmaaHS4qkTsif3coWPj5QgFxd6h69CaDDweqgA38YjXe4L/");
		await setBaseURI.wait();
		console.log("Base URI set for Hooligans");
	} else {
		setBaseURI = await contract.setBaseURI("https://ipfs.io/ipfs/QmYRvENo4cZ3m9odhH4JpC9kAFotRwJSEH62h1erEbxAzp/");
		await setBaseURI.wait();
		console.log("Base URI set for Pawsome");
	}

	for (let i = 0; i < Hooligans_data[0].result.length; i++) {
		const value = Hooligans_data[0].result[i].value;
		const address = Hooligans_data[0].result[i].address;
		try {
			// Mint NFT directly using the contract instance
			const tx = await contract.mintNFTAdmin(value);
			await tx.wait();
			console.log("NFT supply minted value: ", value);
			const tx1 = await contract.sendNFTAdmin(value, address);
			await tx1.wait();
			console.log("NFT sent to address: ", address);
		} catch (error) {
			console.error("Error in mintNFT:", error);
		}
	}
}

async function deployContract() {

	const provider = new ethers.getDefaultProvider('http://146.190.15.105:10002/'); // Replace with your custom chain RPC URL
	const wallet = new ethers.Wallet("1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155");

	const customWallet = wallet.connect(provider);
	// const wallet = new ethers.Wallet(''); // Replace "your-private-key" with the private key of your custom wallet

	let x = await ethers.provider.getTransactionCount("0x3b3423Af1a3c6a9A3ee46a9ba7F60D235Cb7f9E1")
	let y = await customWallet.getNonce()
	console.log(x, y);
	const nonceManager = new ManualNonceManager(y)    // const contract = await deployNFTContract(customWallet, name, symbol, nonceManager);

	const NFTContract = await ethers.getContractFactory("NFT");
	console.log("Contract deploying...");

	const nftContract = await NFTContract.connect(customWallet).deploy({ nonce: y });
	await nftContract.waitForDeployment()
	console.log("Contract deployed : ", nftContract.target);

	await mintNFT(nftContract, customWallet, nonceManager);

}

deployContract().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

