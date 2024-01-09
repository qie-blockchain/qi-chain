const express = require("express");
const { ethers } = require("ethers");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require('cors'); //
const app = express();
const port = 2058;
const {insertTransaction, getAllTransactions} = require('./mongotest')
app.use(bodyParser.json());
app.use(cors());

// Ethereum provider
const provider = new ethers.JsonRpcProvider("http://182.72.203.254:20002/");

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

app.get('/', async(req, res) => {
res.send("hello world")
// await insertTransaction('publicKey2', 'hash2', 200);
})  
app.get('/getStakeTransaction', async(req, res) => {
  // res.send("hello world")
  let txn = await getAllTransactions()
  // res.send(txn)
  let returnObj = []
  for(i in txn){
    console.log(i)
    if(txn[i]['isStake']){
      if(txn[i].isStake === true){
        returnObj.push(txn[i])
      }
    }
  }
  res.send(returnObj)
  // await insertTransaction('publicKey2', 'hash2', 200);
  })  
  
  app.get('/getunStakeTransaction', async(req, res) => {
    // res.send("hello world")
    let txn = await getAllTransactions()
    // res.send(txn)
    let returnObj = []
    for(i in txn){
      console.log(i)
   
        console.log(txn[i])
        if(txn[i].isStake === false){
          returnObj.push(txn[i])
        
      }
    }
    res.send(returnObj)
    // await insertTransaction('publicKey2', 'hash2', 200);
    })  

    app.post("/searchBarStake", async (req, res) => {
      try {
        let {address} = req.body
        let returnObj = []
        let txn = await getAllTransactions()
        for(let i in txn){
          if(txn[i].publicKey === address && txn[i].isStake === true)
          {
            returnObj.push(txn[i])
          }
        }
        res.send(returnObj)
        
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    
  
    app.post("/searchBarUnstake", async (req, res) => {
      try {
        let {address} = req.body
        let returnObj = []
        let txn = await getAllTransactions()
        for(let i in txn){
          if(txn[i].publicKey === address && txn[i].isStake === false)
          {
            returnObj.push(txn[i])
          }
        }
        res.send(returnObj)
        
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    
    
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
      return res.status(500).json({
        result: "sorry you are a new validator so must stake at least 5 QI",
        error: 1,
      });
    }
    const tx = await contract
      .connect(newWallet)
      .stake({ value: ethers.parseEther(value.toString()) });
    const receipt = await tx.wait();

    console.log("Staked", tx.hash, receipt);
    console.log(receipt.from, receipt.hash, value, receipt.blockNumber)
    let from = receipt.from
    let hash = receipt.hash
    let blockNumber = receipt.blockNumber
    let responseOnj = { status: "success", result: tx.hash, reciept: receipt };
    // Respond with the result
    console.log("adding values to the database")

    console.log(from, hash, blockNumber)
    await insertTransaction(from, hash, value, blockNumber, true)
    console.log("data successfully instered")

    res.json({ responseOnj });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/unstake", async (req, res) => {
  try {
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
      return res.json({
        result: "sorry you are not a validator so cannot unstake",
        error: 1,
      });
    }
    const stakedBalance = await contract.accountStake(wallet.address);
    console.log("staked balance", stakedBalance)
    const tx = await contract.connect(newWallet).unstake();
    const receipt = await tx.wait();

    console.log("Staked", tx.hash, receipt);

    let responseOnj = { status: "success", result: tx.hash, reciept: receipt };
    // Respond with the result
    let from = receipt.from
    let hash = receipt.hash
    let blockNumber = receipt.blockNumber
    console.log("insterting values into the data base")
    await insertTransaction(from, hash, ethers.formatEther(stakedBalance), blockNumber, false)
    console.log("inserted values into the data base")

    res.json({ responseOnj });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getBalance", async (req, res) => {
  try {
    const { privateKey } = req.body;
    const wallet = new ethers.Wallet(privateKey);
    const newWallet = wallet.connect(provider);
    console.log(wallet.address, "public key");
    const availableBalance = await provider.getBalance(wallet.address)
    let responseOnj = {
      status: "success",
      result: ethers.formatEther(availableBalance),
    };
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
    console.log(publicKey, "public key");
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
