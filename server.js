const express = require("express");
const { ethers } = require("ethers");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require('cors'); //
const app = express();
const port = 2058;
app.use(bodyParser.json());
app.use(cors());

// Ethereum provider
const provider = new ethers.JsonRpcProvider("http://182.72.203.246:10002/");

const contractAddress = "0x0000000000000000000000000000000000001001";
const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minNumValidators",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxNumValidators",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "accout",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "key",
        type: "bytes",
      },
    ],
    name: "BLSPublicKeyRegistered",
    type: "event",
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
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
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
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "VALIDATOR_THRESHOLD",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
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
    name: "_addressToBLSPublicKey",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    name: "_addressToIsValidator",
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
        name: "",
        type: "address",
      },
    ],
    name: "_addressToStakedAmount",
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
    name: "_addressToValidatorIndex",
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
    inputs: [],
    name: "_maximumNumValidators",
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
    inputs: [],
    name: "_minimumNumValidators",
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
    inputs: [],
    name: "_stakedAmount",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "_validators",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "accountStake",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "isValidator",
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
    name: "maximumNumValidators",
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
    inputs: [],
    name: "minimumNumValidators",
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
        internalType: "bytes",
        name: "blsPubKey",
        type: "bytes",
      },
    ],
    name: "registerBLSPublicKey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakedAmount",
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
    inputs: [],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "validatorBLSPublicKeys",
    outputs: [
      {
        internalType: "bytes[]",
        name: "",
        type: "bytes[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "validators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
]; // Replace with your contract ABI

const contract = new ethers.Contract(contractAddress, contractABI, provider);

app.get("/getAllValidators", async (req, res) => {
  try {
    // Perform the contract call
    const result = await contract.validators.call(); // Replace with your contract function

    console.log(result);
    let responseOnj = [];
    for (i in result) {
      let res = await contract.accountStake(result[i]);
      const balance = await provider.getBalance(result[i]);

      console.log(res);
      responseOnj.push({
        address: result[i],
        stakedBalance: ethers.formatEther(res).toString(),
        balance:ethers.formatEther(balance.toString()).toString()
      });
    }
    // Respond with the result
    console.log(responseOnj);
    res.json({ responseOnj });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/stake", async (req, res) => {
  try {
    // Perform the contract call
    //   const result = await contract.validators.call(); // Replace with your contract function
    // console.log(req);
    const { privateKey, value } = req.body;
    console.log(privateKey);
    const wallet = new ethers.Wallet(privateKey);
    const newWallet = wallet.connect(provider);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const isStaker = await contract.isValidator(wallet.address);
    if (!isStaker && value < 5) {
      res.json({
        result: "sorry you are a new validator so must stake at least 5 QI",
        error: 1,
      });
    }
    const tx = await contract
      .connect(newWallet)
      .stake({ value: ethers.parseEther(value.toString()) });
    const receipt = await tx.wait();

    console.log("Staked", tx.hash, receipt);

    let responseOnj = { status: "success", result: tx.hash, reciept: receipt };
    // Respond with the result
    res.json({ responseOnj });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/unstake", async (req, res) => {
  try {
    // Perform the contract call
    //   const result = await contract.validators.call(); // Replace with your contract function
    // console.log(req);
    const { privateKey } = req.body;
    const wallet = new ethers.Wallet(privateKey);
    const newWallet = wallet.connect(provider);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const isStaker = await contract.isValidator(wallet.address);
    if (!isStaker) {
      res.json({
        result: "sorry you are not a validator so cannot unstake",
        error: 1,
      });
    }
    const tx = await contract.connect(newWallet).unstake();
    const receipt = await tx.wait();

    console.log("Staked", tx.hash, receipt);

    let responseOnj = { status: "success", result: tx.hash, reciept: receipt };
    // Respond with the result
    res.json({ responseOnj });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getStakeBalance", async (req, res) => {
  try {
    const { publicKey } = req.body;
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const stakedBalance = await contract.accountStake(publicKey);
    console.log(stakedBalance);
    let responseOnj = {
      status: "success",
      result: ethers.formatEther(stakedBalance),
    };
    // Respond with the result
    res.json({ responseOnj });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/createNode", async(req, res) => {
  try {
    // Replace 'your-script.sh' with the actual name of your shell script
    // const scriptPath = "./createNode.sh";
    const randomString = require('crypto').randomBytes(20).toString('hex');


    // Run the shell script
    let accountInfo = await new Promise((resolve, reject) => {
        exec(`./qichain secrets init --data-dir test-chain-${randomString}`, (error, stdout, stderr) => {
          if (error) {
            console.error("Error:", error.message);
            reject(error);
            return;
          }
  
          console.log(stdout);
  
          const regex = /Public key \(address\) = (0x[a-fA-F0-9]+)\nBLS Public key\s+= (0x[a-fA-F0-9]+)\nNode ID\s+= ([^\n]+)/;
  
          // Use the regular expression to extract the values
          const matches = stdout.match(regex);
  
          // Create an object to store the extracted values
          const resultObject = {
            publicKey: matches[1],
            blsPublicKey: matches[2],
            nodeId: matches[3],
          };
  
          console.log(resultObject);
          resolve(resultObject);
        });
      });
      const privateKey = await new Promise((resolve, reject) => {
        exec(`cat test-chain-${randomString}/consensus/validator.key`, (error, stdout, stderr) => {
          if (error) {
            console.error("Error:", error.message);
            reject(error);
            return;
          }
  
          const privateKeyValue = stdout.trim(); // Remove trailing newline characters
          resolve(privateKeyValue);
        });
      });
  
    console.log(accountInfo, "accountInfo", privateKey, "privatekey");
    accountInfo.privateKey = privateKey
    console.log(accountInfo, "final account infi");
    const randomPort = Math.floor(Math.random() * (65535 - 10001 + 1)) + 10001;

    const runScr = await new Promise((resolve, reject) => {
        const pm2Command = `pm2 start ./qichain -- server --data-dir ./test-chain-${randomString} --chain genesis.json --grpc-address :${randomPort} --libp2p $(hostname -I | awk '{print $1;}'):10001 --jsonrpc $(hostname -I | awk '{print $1;}'):10002 --seal --block-time 5`;
      
        exec(pm2Command, (error, stdout, stderr) => {
          if (error) {
            console.error("Error:", error.message);
            reject(error);
            return;
          }
      
          console.log(stdout);
      
          // Resolve the promise without waiting for the process to complete
          resolve({ message: 'Command started successfully.' });
        });
      });
      console.log("hello");
      res.json({"status":"success", "nodeInfo":accountInfo})
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
