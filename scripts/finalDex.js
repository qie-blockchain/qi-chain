const { ethers } = require('ethers');

async function approveRouterForTokens(provider, signer, routerAddress, tokenList, amountList) {
    const approvedTokens = [];
    // console.log(tokenList);
    for (let i = 0; i < tokenList.length; i++) {
        const tokenData = tokenList[i];
        // const amountData = amountList[i];
        // console.log(amountData);
        let amountToApprove = 0
        let amountData = null
        for (let j = 0; j < amountList.length; j++) {
            amountData = amountList[j]
            console.log(amountData, tokenData.tokenASymbol, tokenData.tokenBSymbol);
            if (tokenData.tokenASymbol.trim() === amountData.symbol.trim()) {
                amountToApprove = tokenData.tokenABalance
                break
            }
            if (tokenData.tokenBSymbol.trim() === amountData.symbol.trim()) {
                amountToApprove = tokenData.tokenBBalance
                break
            }
            console.log(tokenData.tokenBSymbol === amountData.symbol);
            // else{
            //     console.log("token not found returning");
            //     console.log(`token A Name: ${tokenData.tokenASymbol}, tokenB name: ${tokenData.tokenBSymbol}`);
            //     continue
            // }
        }
        if (amountData === null) {
            console.log("continuing");
            continue
        }
        // Check if token A and B names and symbols match
        console.log(amountToApprove, amountData.address);
        // Create token contract
        const tokenContract = new ethers.Contract(amountData.address, ['function approve(address spender, uint256 amount) external returns (bool)'], signer);

        // Approve router for the amount
        const approveTx = await tokenContract.approve(routerAddress, amountToApprove);
        await approveTx.wait();
        console.log(`approved amount ${amountToApprove} for the token ${amountData.address}`);
        // Push the approved token
        approvedTokens.push({
            contractAddressHash: tokenData.contractAddressHash,
            symbol: tokenData.tokenBSymbol,
        });

    }

    return approvedTokens;
}

const newAddrress =[
    {
        "number": 1,
        "contractName": "ramen",
        "symbol": "RaM",
        "previousContractAddress": "0x9c5FBAB7fa85cDB9882f131F954C2468cc97E57E",
        "newContractAddress": "0x5eA898EBEa148068F7c931D19Cc85A8D1695fD17"
    },
    {
        "number": 2,
        "contractName": "COBA",
        "symbol": "COBA",
        "previousContractAddress": "0xDa2c7273C4a6F06e7DDEF2b07748959f38AA619d",
        "newContractAddress": "0xc915fC743AA279d56ce6C348df5403BA0AAe73ca"
    },
    {
        "number": 3,
        "contractName": "QIDEX",
        "symbol": "QIDEX",
        "previousContractAddress": "0x0f2380E602dD7EA5d717D8BF78c52496F1D54A96",
        "newContractAddress": "0x079Acabcc1fcd9E7211a0Bc294aee02EEfCe77e3"
    },
    {
        "number": 4,
        "contractName": "Wrapped QIE",
        "symbol": "WQIE",
        "previousContractAddress": "0x0a5DAE5e149730c8BED724285E5281F960946c0E",
        "newContractAddress": "0x904eA7850B0A8BCA879790BF36C465D6250f9849"
    },
    {
        "number": 5,
        "contractName": "DoodleQI",
        "symbol": "DOQ",
        "previousContractAddress": "0x8780b97C72F59E9F87a4411984399a8c80E95678",
        "newContractAddress": "0xf509BE1111aa234078E911940b7BC57E446415B9"
    },
    {
        "number": 6,
        "contractName": "Binance USD",
        "symbol": "BUSD",
        "previousContractAddress": "0xD7D7715039dF8056A8B9f6463B48853C0CD210AF",
        "newContractAddress": "0x87339B1696678Ed044DFc6018E79c23550A7D351"
    },
    {
        "number": 7,
        "contractName": "Ethereum main network",
        "symbol": "ETH",
        "previousContractAddress": "0x4E139DA14234660a74a2022304939a21cb9a74e6",
        "newContractAddress": "0xE9678E63d2880227823b6b7D174dA180AA6Ff7F3"
    },
    {
        "number": 8,
        "contractName": "IEVE",
        "symbol": "IEVE",
        "previousContractAddress": "0x99F243A4b2ada68c8f99A0658EB7D3b76F6b3456",
        "newContractAddress": "0xFfdC936d9A81BB9AC0B2d0A58126caBc2D02e67F"
    },
    {
        "number": 9,
        "contractName": "BUSD",
        "symbol": "BUSD",
        "previousContractAddress": "0x756d1CB1F9e97895ACae67955CA678B810EC79A2",
        "newContractAddress": "0xc23CB5e2e96907Bfac847284139Ec73F62a5eF63"
    },
    {
        "number": 10,
        "contractName": "CRED",
        "symbol": "CRED",
        "previousContractAddress": "0x371bb345019a5e9E262629d610355c1195908547",
        "newContractAddress": "0x7Cc4871F423158E1a6c1aBAD936FAcEd45036AA7"
    },
    {
        "number": 11,
        "contractName": "Farnus",
        "symbol": "F",
        "previousContractAddress": "0x558A300681314a2634C4E849Aa21186628279C2F",
        "newContractAddress": "0x07A892222d78AfB8b22809c85eC3Ab5084431D4a"
    },
    {
        "number": 12,
        "contractName": "MemeGold",
        "symbol": "MEMG",
        "previousContractAddress": "0xA419dDc29021b890b849E88BEa7f678BC9f31b3f",
        "newContractAddress": "0xeF651A9B93d84D027C20c9a4D2eCf48D6d7f40d9"
    },
    {
        "number": 13,
        "contractName": "MemeGold",
        "symbol": "MEMG",
        "previousContractAddress": "0xf84E05918c10BAA858a2508bdEf373A5e7A256f5",
        "newContractAddress": "0x0d35Fce9E5e400258D7A675f6585600851db3Ca6"
    },
    {
        "number": 14,
        "contractName": "MemeGold",
        "symbol": "MEMG",
        "previousContractAddress": "0xFaE186d23BB3BC3c973E6FE23C17527E54D92840",
        "newContractAddress": "0xAeDA6Ac55AF975DbBCBb93CC395cE27270aEbF44"
    },
    {
        "number": 15,
        "contractName": "infinity",
        "symbol": "INF",
        "previousContractAddress": "0x25AF05D1116966c2Aeec95E44d702eEF3A8dA67C",
        "newContractAddress": "0x689811C06ce6dF00631b61c9bC77904fb955A0AE"
    },
    {
        "number": 16,
        "contractName": "Tether USD",
        "symbol": "USDT",
        "previousContractAddress": "0x1Ca9da5B2c15917E95cb6C978E7621963D005ccB",
        "newContractAddress": "0xbb868eCeD686b8090Eb647Ba8ee68e6fE2649F27"
    },
    {
        "number": 17,
        "contractName": "QI Blockchain - Mainnet",
        "symbol": "QIE",
        "previousContractAddress": "0x844f1bfc9f8BA2C71c8236A75714Eb872aD44040",
        "newContractAddress": "0x48165A94Dd8442cA17DD3241e063edAfD3bC912D"
    },
    {
        "number": 18,
        "contractName": "USDC",
        "symbol": "USDC",
        "previousContractAddress": "0x0f21E1B1F90473c6b4088a417278ABA7C0C0fc0e",
        "newContractAddress": "0x4fb19f11Fd7AF537e4e5381FeA9EAaBc891903a1"
    },
    {
        "number": 19,
        "contractName": "IEVE",
        "symbol": "IEVE",
        "previousContractAddress": "0xf9816FBAf0410c26c7b331e633F59B519f2d9a2f",
        "newContractAddress": "0xBaC3AD4A22BE26b5306bdB08cF9E3E4E7ab3c126"
    },
    {
        "number": 20,
        "contractName": "IEVE",
        "symbol": "IEVE",
        "previousContractAddress": "0x89bC6BBCd695a12531F32d7cb38d4aF111fCCba9",
        "newContractAddress": "0x63575E563738C3853C94e499D8810e8B700f1435"
    },
    {
        "number": 21,
        "contractName": "BaseSpace",
        "symbol": "BSS",
        "previousContractAddress": "0xd98791c19C88cBD64bC4180Bd5B090bAA87c2761",
        "newContractAddress": "0x5107B13206d225d7EFe0e6c6A2bDF020DC76fE57"
    },
    {
        "number": 22,
        "contractName": "PADEL",
        "symbol": "PAD",
        "previousContractAddress": "0x108a4AEB39E8dd17C050B4fd9110701B6649E40B",
        "newContractAddress": "0x8Ca98Fac6D66acbB2C8F084322E148f4869Ea1B7"
    },
    {
        "number": 23,
        "contractName": "USDQ",
        "symbol": "uSDQ",
        "previousContractAddress": "0x4DbA80b2BfE67D6F9FdeD22A6DF5EB59d418563E",
        "newContractAddress": "0xD2ACbDCBB5B4AFCcB9888956457F73BbD807b434"
    },
    {
        "number": 24,
        "contractName": "IndianCode",
        "symbol": "INCO",
        "previousContractAddress": "0x3E7EbF0082751510fa64cDE0C7692A9Ce1d394C0",
        "newContractAddress": "0xBf24402b1ad89EfEb31a4aAbf27F58a15759c39A"
    }
];

// Usage example
const routerAddress = '0x1a556530bb46c8eC4cdf8c750925952CF89d8E90'; // Replace with your actual router address
const provider = new ethers.JsonRpcProvider('http://146.190.15.105:10002/'); // Replace with your Ethereum node URL
const wallet = new ethers.Wallet('1d35e8c84b9d5861650e061cdabdd4146c2f26ff805db1217a870ce6f1ac4155', provider); // Replace with your private key
let routerAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factory",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_WQIE",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "WQIE",
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
        "name": "_owner",
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
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountADesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBDesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountADesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBDesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addLiquidityAdmin",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenDesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addLiquidityETH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenDesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "addLiquidityETHForAdmin",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "canAddLiquidity",
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
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "canTradeOnLessFee",
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
        "name": "factory",
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
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveOut",
                "type": "uint256"
            }
        ],
        "name": "getAmountIn",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveOut",
                "type": "uint256"
            }
        ],
        "name": "getAmountOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            }
        ],
        "name": "getAmountsIn",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            }
        ],
        "name": "getAmountsOut",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveB",
                "type": "uint256"
            }
        ],
        "name": "quote",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidityETH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approveMax",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "removeLiquidityETHWithPermit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approveMax",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approveMax",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "removeLiquidityWithPermit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapETHForExactTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactETHForTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForETH",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountInMax",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapTokensForExactETH",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountInMax",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapTokensForExactTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

// const approvedTokens = await approveRouterForTokens(provider, wallet, routerAddress, newAddrress, [
//   {
//     "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
//     "tokenABalance": "164677414738973931114197124250159581916099",
//     "tokenAName": "Wrapped QIE",
//     "tokenBName": "QIDEX",
//     "tokenASymbol": "WQIE",
//     "tokenBSymbol": "QIDEX"
//   },
//   {
//     "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
//     "tokenABalance": "4832638102510475097150092776395305847661",
//     "tokenAName": "Wrapped QIE",
//     "tokenBName": "QIDEX",
//     "tokenASymbol": "WQIE",
//     "tokenBSymbol": "QIDEX"
//   },
//   {
//     "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
//     "tokenABalance": "354790549739797941657308371538244454412",
//     "tokenAName": "Wrapped QIE",
//     "tokenBName": "QIDEX",
//     "tokenASymbol": "WQIE",
//     "tokenBSymbol": "QIDEX"
//   },
// ]);
const tokenAddr = [
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "164677414738973931114197124250159581916099",
    //   "tokenBBalance": "25277427654188313991155841600406899626690948",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x790b5e747a33196c8da58afd9abc53efcc32a0f3",
    //   "tokenABalance": "4832638102510475097150092776395305847661",
    //   "tokenBBalance": "741793646740871557569137793042150463890722",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d",
    //   "tokenABalance": "354790549739797941657308371538244454412",
    //   "tokenBBalance": "54459152565958735315410403997379724387374",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x978f4e56ae55c0602c607c3c7f80392217b3bf98",
    //   "tokenABalance": "135093028896097335995226080712382979088",
    //   "tokenBBalance": "20736324224660637261732723224759083593110",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x92ff9579428b52482428c0bc68a51db188170297",
    //   "tokenABalance": "63763729265559555569694524886246342256",
    //   "tokenBBalance": "9787517347331624068885823253537207136021",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x1f3d6b473af08e4fc310c4806b35ff66ee227cca",
    //   "tokenABalance": "4699317509193698598361844943880800667",
    //   "tokenBBalance": "721329385398659052736902392941919651321",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x2e61822721b7f4d0960cec56c70a197db53b0781",
    //   "tokenABalance": "3105312287068191983073484258469007024",
    //   "tokenBBalance": "476654960878804461561388760543295954936",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0xf7bfc8c969e665d82dfc30507bd179b84137213e",
    //   "tokenABalance": "463431097666619547904449751125313239",
    //   "tokenBBalance": "71135110194298183307652149096841241076",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x2fecb3d1bb524313d318ca6371508c3bd94d2077",
    //   "tokenABalance": "448536477582140680552441600068766997",
    //   "tokenBBalance": "68848836255526361429279961824702884085",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x8d0473d4e8e8d847e70ac83afbf62b037963548e",
    //   "tokenABalance": "447489931564339711783253694246786546",
    //   "tokenBBalance": "68688194972119803060603934490781870906",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x0bfd580a07a6f0f8ef8f9010d827d136c1ec6e43",
    //   "tokenABalance": "65345782809398157585826639970497",
    //   "tokenBBalance": "10030357229551174591687029612167891",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
    //   "walletAddress": "0x49141cdbaa6374c1404cf4166787a56e9213606f",
    //   "tokenABalance": "780864180709332431253644369",
    //   "tokenBBalance": "119860017640632565220842449071",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "QIDEX",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "QIDEX"
    // },
    // {
    //   "contractAddressHash": "0xDc2CeE2CDc1b6795005430e5e562b79ba9fA1149",
    //   "walletAddress": "0x86dc994e600fd55b49208de935e92a73cb896696",
    //   "tokenABalance": "4583735049109912679345778362650458010",
    //   "tokenBBalance": "437659432542764209259597169193535699099",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "DoodleQI",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "DOQ"
    // },
    // {
    //   "contractAddressHash": "0xDc2CeE2CDc1b6795005430e5e562b79ba9fA1149",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "1472143352507938560732596248331152129",
    //   "tokenBBalance": "140561663660149607298055261839797740009",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "DoodleQI",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "DOQ"
    // },
    // {
    //   "contractAddressHash": "0xDc2CeE2CDc1b6795005430e5e562b79ba9fA1149",
    //   "walletAddress": "0x10d5e55569471ae227c1ead781599b23ac605064",
    //   "tokenABalance": "412667533283290102116532236193184134",
    //   "tokenBBalance": "39401893109126831848486461990830707629",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "DoodleQI",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "DOQ"
    // },
    // {
    //     "contractAddressHash": "0x0537425285dDB8c805a64F4Df771bA3DF48CdADc",
    //     "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
    //     "tokenABalance": "119790634821668333289869512387957720",
    //     "tokenBBalance": "100851996790909596469428",
    //     "tokenAName": "Wrapped QIE",
    //     "tokenBName": "Tether USD",
    //     "tokenASymbol": "WQIE",
    //     "tokenBSymbol": "USDT"
    // },
    // {
    //   "contractAddressHash": "0x0537425285dDB8c805a64F4Df771bA3DF48CdADc",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "2721718635836773184891984435",
    //   "tokenBBalance": "2291420857196407",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "Tether USD",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "USDT"
    // },
    // {
    //   "contractAddressHash": "0x778693Fa7ca3F86B6169c06F0be899e2D0E40A3b",
    //   "walletAddress": "0x887c8310922c0aed5cc09e1ce43c4779c7403300",
    //   "tokenABalance": "145170840255362815239758390810141258586",
    //   "tokenBBalance": "4828808358613776987766759549397",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "BaseSpace",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "BSS"
    // },
    // {
    //   "contractAddressHash": "0x778693Fa7ca3F86B6169c06F0be899e2D0E40A3b",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "7850977333272664659620359229009242",
    //   "tokenBBalance": "261146556040505270061649162",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "BaseSpace",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "BSS"
    // },
    // {
    //   "contractAddressHash": "0x7D024Cc7a1a5Ec60e4E9D4dE7B9F8cF9821d8369",
    //   "walletAddress": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9",
    //   "tokenABalance": "332994335434715544141715027164633400",
    //   "tokenBBalance": "884176727590479709766176079753859867452",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "USDC",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "USDC"
    // },
    // {
    //   "contractAddressHash": "0x7D024Cc7a1a5Ec60e4E9D4dE7B9F8cF9821d8369",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "15664565284435434268096030476786",
    //   "tokenBBalance": "41593032068363615581187137668988761",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "USDC",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "USDC"
    // },
    // {
    //   "contractAddressHash": "0x892Cc0aB6Add7Fd68A0F197d4AC16ACB01Cb9503",
    //   "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
    //   "tokenABalance": "1502514353059489496569043249634407394",
    //   "tokenBBalance": "6384879445337461286854716220787744225",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "Binance USD",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "BUSD"
    // },
    // {
    //   "contractAddressHash": "0x892Cc0aB6Add7Fd68A0F197d4AC16ACB01Cb9503",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "121027423287845352042958120000",
    //   "tokenBBalance": "514301581012667127890120208318",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "Binance USD",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "BUSD"
    // },
    // {
    //   "contractAddressHash": "0x0E921910874D0d290F5A88179b37690402396464",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "13622894003577999596394064166828",
    //   "tokenBBalance": "1360808171045943984201244329327",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "MemeGold",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "MEMG"
    // },
    {
        "contractAddressHash": "0x0eEe5458F2682811033eFD72b9b833Bb9E3fE672",
        "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
        "tokenABalance": "3556025289336624122258264107224325",
        "tokenBBalance": "75175510873988780399342057149113444089",
        "tokenAName": "QIDEX",
        "tokenBName": "MemeGold",
        "tokenASymbol": "QIDEX",
        "tokenBSymbol": "MEMG"
    },
    {
        "contractAddressHash": "0x13180eBeb52bb2CF5e8Df20bCccee727a01E8bf2",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "2999999999999999945227744249483388653",
        "tokenBBalance": "999999999999999981742581416494462884535",
        "tokenAName": "DoodleQI",
        "tokenBName": "Binance USD",
        "tokenASymbol": "DOQ",
        "tokenBSymbol": "BUSD"
    },
    {
        "contractAddressHash": "0x278Ddd941964b45260960b92884E8cB97De9ed5C",
        "walletAddress": "0x26ff527f9fa303a51a9e7c127149299d51863b1e",
        "tokenABalance": "1010000999999999996806096400952276706292803",
        "tokenBBalance": "99012744227280172686894210858106246",
        "tokenAName": "Ethereum main network",
        "tokenBName": "BUSD",
        "tokenASymbol": "ETH",
        "tokenBSymbol": "BUSD"
    },
    // {
    //   "contractAddressHash": "0x2dbcD9270647229B342A1460ad391fAa537647e0",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "216613265840799707923804810906555",
    //   "tokenBBalance": "2615645840969442996029123583100334605964",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "IEVE",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "IEVE"
    // },
    {
        "contractAddressHash": "0x3168Eb8cc9Fe27115136448b05927f3e0F3863d4",
        "walletAddress": "0x887c8310922c0aed5cc09e1ce43c4779c7403300",
        "tokenABalance": "3299999999999685357188227509301062836",
        "tokenBBalance": "33333299999996821792958286071450",
        "tokenAName": "QIDEX",
        "tokenBName": "BaseSpace",
        "tokenASymbol": "QIDEX",
        "tokenBSymbol": "BSS"
    },
    {
        "contractAddressHash": "0x58DcF74672173255A3eB030C7b7266C5fa2F2EBe",
        "walletAddress": "0x55aae01ad28fd6fc442ea0b93d9d39670d55140f",
        "tokenABalance": "1584085081220499862603383534441774290",
        "tokenBBalance": "15735701344612025494102843869093790200232224",
        "tokenAName": "Wrapped QIE",
        "tokenBName": "IEVE",
        "tokenASymbol": "WQIE",
        "tokenBSymbol": "IEVE"
    },
    {
        "contractAddressHash": "0x5D0633b34E9527A3e555322F5bC014d836EE9fcA",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "999999999990000000000000000000000000",
        "tokenBBalance": "9999999999900000000000000000",
        "tokenAName": "QIDEX",
        "tokenBName": "QI Blockchain - Mainnet",
        "tokenASymbol": "QIDEX",
        "tokenBSymbol": "QIE"
    },
    {
        "contractAddressHash": "0x6677deC1C15f28Fbf30bb0013aeb9D4Ee1274D10",
        "walletAddress": "0xfb67a75d36f226b500cc1e38adcaa746698c13e1",
        "tokenABalance": "6109706118778280498752410341014037503",
        "tokenBBalance": "81876375169543957242393689191363833013",
        "tokenAName": "Wrapped QIE",
        "tokenBName": "IndianCode",
        "tokenASymbol": "WQIE",
        "tokenBSymbol": "INCO"
    },
    // {
    //   "contractAddressHash": "0x6B61b15a63c87321b72E97Ebc11152BE3F9e9Fbb",
    //   "walletAddress": "0x609fac9d07e0741ab22148a747db0993276ef889",
    //   "tokenABalance": "4374246944819327799085299560310867746",
    //   "tokenBBalance": "9999999999999999952186740475501469804673",
    //   "tokenAName": "QIDEX",
    //   "tokenBName": "USDQ",
    //   "tokenASymbol": "QIDEX",
    //   "tokenBSymbol": "uSDQ"
    // },
    {
        "contractAddressHash": "0x808326623530AA8bbdeD50ad3AeB410CbC111216",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "99999999999999968377223398316206",
        "tokenBBalance": "99999999999999968377223398316206670022129",
        "tokenAName": "Tether USD",
        "tokenBName": "Ethereum main network",
        "tokenASymbol": "USDT",
        "tokenBSymbol": "ETH"
    },
    // {
    //   "contractAddressHash": "0x8f01AEDF18E58ec2d93584Cc1Cdd801EB97b505A",
    //   "walletAddress": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9",
    //   "tokenABalance": "4546694553059925433300661089388014913158",
    //   "tokenBBalance": "5499999999999999998900000000000000000000",
    //   "tokenAName": "Test Token",
    //   "tokenBName": "Test Token",
    //   "tokenASymbol": "TT",
    //   "tokenBSymbol": "TT"
    // },
    {
        "contractAddressHash": "0x91F698E7e5B9fe54D261bBd794170136623B17f3",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "98999999999999999968693451164333044613",
        "tokenBBalance": "101013140431395195656131840263034768493523",
        "tokenAName": "Ethereum main network",
        "tokenBName": "Binance USD",
        "tokenASymbol": "ETH",
        "tokenBSymbol": "BUSD"
    },
    {
        "contractAddressHash": "0x95bC07E3c18b53125e2f38583E5359C7E61B7BB7",
        "walletAddress": "0xff46c57b87f90f0681053d63279149d9616e970b",
        "tokenABalance": "3999999999900000000000000000000000000",
        "tokenBBalance": "399999999990000000000000000",
        "tokenAName": "Wrapped QIE",
        "tokenBName": "infinity",
        "tokenASymbol": "WQIE",
        "tokenBSymbol": "INF"
    },
    {
        "contractAddressHash": "0xc798b32607DAd9796330bcCEB6b18F5b40C5E3a8",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "11099999996837722339763241336000734314",
        "tokenBBalance": "1109999999683772233976324",
        "tokenAName": "QIDEX",
        "tokenBName": "Tether USD",
        "tokenASymbol": "QIDEX",
        "tokenBSymbol": "USDT"
    },
    // {
    //   "contractAddressHash": "0xd6b5cB320F9070192Bb44C6eD08e7Ac010c59394",
    //   "walletAddress": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
    //   "tokenABalance": "33813105335982197834744423374339703",
    //   "tokenBBalance": "3407723854533489504043882939034153406212",
    //   "tokenAName": "Wrapped QIE",
    //   "tokenBName": "IEVE",
    //   "tokenASymbol": "WQIE",
    //   "tokenBSymbol": "IEVE"
    // },
    {
        "contractAddressHash": "0xe5312238364517223281B6e8f42DeF3B4C9dC825",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "999999999999999000000000000000000000",
        "tokenBBalance": "999999999999999000000000000000000000",
        "tokenAName": "QIDEX",
        "tokenBName": "Binance USD",
        "tokenASymbol": "QIDEX",
        "tokenBSymbol": "BUSD"
    },
    {
        "contractAddressHash": "0xeAaCFc205da0Cd16D984773E2CD527e6fee7F39F",
        "walletAddress": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
        "tokenABalance": "99999999999999999000000000000000",
        "tokenBBalance": "99999999999999999000000000000000000000000000",
        "tokenAName": "Tether USD",
        "tokenBName": "Binance USD",
        "tokenASymbol": "USDT",
        "tokenBSymbol": "BUSD"
    },
    {
        "contractAddressHash": "0xf3f1f31315F4A3d5b9c961fc3aDF04432f3061F7",
        "walletAddress": "0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d",
        "tokenABalance": "99999999999999683772233983162066600221",
        "tokenBBalance": "999999999999996837722339831620666",
        "tokenAName": "Wrapped QIE",
        "tokenBName": "COBA",
        "tokenASymbol": "WQIE",
        "tokenBSymbol": "COBA"
    },
    {
        "contractAddressHash": "0xF8de837Df549AB8Fb68A0D35c1fb205DbBC10C73",
        "walletAddress": "0xfba2dbb5f9e2d12f03e5805703a1cc7395164711",
        "tokenABalance": "999999000000000000000000000000000000",
        "tokenBBalance": "999999000000000000",
        "tokenAName": "QIDEX",
        "tokenBName": "Farnus",
        "tokenASymbol": "QIDEX",
        "tokenBSymbol": "F"
    }
]

// console.log('Approved Tokens:', approvedTokens);
// (async () => {
//     const approvedTokens = await approveRouterForTokens(provider, wallet, routerAddress, newAddrress,tokenAddr );

//     console.log('Approved Tokens:', approvedTokens);
//   })();
// approveRouterForTokens(provider, wallet, routerAddress, tokenAddr, newAddrress );

async function approveTokens(addressArray, spenderAddress, signer, amount) {
    for (const token of addressArray) {
        const erc20Contract = new ethers.Contract(token.newContractAddress, ["function approve(address spender, uint256 amount) returns (bool)"], signer);

        // Approve the specified amount of tokens for spending by the spenderAddress
        const approvalTx = await erc20Contract.approve(spenderAddress, amount);

        // Wait for the transaction to be mined
        await approvalTx.wait();

        console.log(`Tokens approved successfully for ${token.symbol}. Contract Address: ${token.newContractAddress}`);
    }
}

async function addLiquidityIfNeeded(provider, signer, routerAddress, tokenList, amountList) {
    const approvedTokens = [];
    const routerContract = new ethers.Contract(routerAddress, routerAbi, signer);

    for (let i = 0; i < tokenList.length; i++) {
        const tokenData = tokenList[i];
        let amountToApprove = 0;
        let amountData = null;

        //   for (let j = 0; j < amountList.length; j++) {
        //     amountData = amountList[j];

        //     if (tokenData.tokenASymbol.trim() === amountData.symbol.trim()) {
        //       amountToApprove = tokenData.tokenABalance;
        //       break;
        //     }

        //     if (tokenData.tokenBSymbol.trim() === amountData.symbol.trim()) {
        //       amountToApprove = tokenData.tokenBBalance;
        //       break;
        //     }
        //   }

        //   if (amountData === null) {
        //     console.log("continuing");
        //     continue;
        //   }

        // Check if either token A or token B is WQIE
        if (tokenData.tokenASymbol.trim() === "WQIE" || tokenData.tokenBSymbol.trim() === "WQIE") {
            // Call addLiquidityWQIE
            console.log("in WQIE");
            let wqieAmount = 0;
            let tokenAmount = 0
            let tokenAddress = null
            if (tokenData.tokenASymbol.trim() === "WQIE") {
                wqieAmount = tokenData.tokenABalance
                tokenAmount = tokenData.tokenBBalance
            } else {
                wqieAmount = tokenData.tokenBBalance
                tokenAmount = tokenData.tokenABalance
            }
            for (let k in amountList) {
                if (amountList[k].symbol === tokenData.tokenASymbol || amountList[k].symbol === tokenData.tokenBSymbol) {

                    tokenAddress = amountList[k].address
                    console.log(tokenData.tokenASymbol)
                    break
                }

            }
            tokenAmount = ethers.formatUnits(tokenAmount.toString(), 'ether')
            tokenAmount = BigInt(Math.floor(parseFloat(tokenAmount.valueOf())))

            wqieAmount = ethers.formatUnits(wqieAmount.toString(), 'ether')
            wqieAmount = BigInt(Math.floor(parseFloat(wqieAmount.valueOf())))
            console.log(tokenAddress, "tokenAddress")
            console.log(tokenAmount, wqieAmount.toString(), "heelp", tokenData.walletAddress);
            try {
                const addLiquidityWQIETx = await routerContract.addLiquidityETH(
                    tokenAddress,
                    tokenAmount,
                    0,
                    0,
                    tokenData.walletAddress,
                    Math.floor(Date.now() / 1000) + 60 * 10,
                    {
                        value: wqieAmount.toString(), // Set the amount of ETH you want to send (1 ETH in this example)
                    } // deadline 10 minutes from now
                );
                await addLiquidityWQIETx.wait();
            } catch (error) {
                // console.log("error with", amountData.address);
                console.log(error);
            }
            console.log("Liquidity added using addLiquidityWQIE");
        } else {
            let tokenAaddress = null
            let tokenBaddress = null
            for (let j = 0; j < amountList.length; j++) {
                if (tokenAaddress === null && tokenData.tokenASymbol.trim() === amountList[j].symbol.trim()) {
                    console.log(amountList[j].address);
                    tokenAaddress = amountList[j].address;
                }
                if (tokenBaddress === null && tokenData.tokenBSymbol.trim() === amountList[j].symbol.trim()) {
                    tokenBaddress = amountList[j].address;
                }
            }
            console.log(tokenAaddress, tokenBaddress);
            if (tokenAaddress === null || tokenBaddress === null) {
                console.log("somthing went wrong, ");
                continue
            }

            let tokenABalance = Math.floor(ethers.formatUnits(tokenData.tokenABalance, 'ether'))
            // tokenABalance = ethers.formatUnits(tokenABalance, 'ether')

            console.log("🚀 ~ addLiquidityIfNeeded ~ tokenABalance:", tokenABalance)
            let tokenBBalance = Math.floor(ethers.formatUnits(tokenData.tokenBBalance, 'ether'))
            console.log("🚀 ~ addLiquidityIfNeeded ~ tokenBBalance:", tokenBBalance)

            // tokenBBalance = ethers.formatUnits(tokenBBalance, 'ether')
            

            console.log("🚀 ~ addLiquidityIfNeeded ~ tokenBBalance:", tokenBBalance)

            // Call addLiquidity
            try {
                const addLiquidityTx = await routerContract.addLiquidity(
                    tokenAaddress,
                    tokenBaddress,
                    BigInt(tokenABalance),
                    BigInt(tokenBBalance),
                    0,
                    0,
                    tokenData.walletAddress,
                    Math.floor(Date.now() / 1000) + 60 * 10,
                    // deadline 10 minutes from now
                );

                await addLiquidityTx.wait();
            } catch (error) {
               try {
                 for(let k =0; k<100;k++){
                     const addLiquidityTx = await routerContract.addLiquidity(
                         tokenAaddress,
                         tokenBaddress,
                         Math.ceil(tokenABalance/100) ,
                         Math.ceil(tokenBBalance/100) ,
                         0,
                         0,
                         tokenData.walletAddress,
                         Math.floor(Date.now() / 1000) + 60 * 10,
                         // deadline 10 minutes from now
                     );
     
                     await addLiquidityTx.wait();
                 }
               } catch (error) {
                console.log(error)
               }

            }
            console.log("Liquidity added using addLiquidity");
        }

        // Push the approved token
        approvedTokens.push({
            contractAddressHash: tokenData.contractAddressHash,
            symbol: tokenData.tokenBSymbol,
        });
    }

    return approvedTokens;
}
// addLiquidityIfNeeded(provider, wallet, routerAddress, tokenAddr, newAddrress);
// 
approveTokens(newAddrress, routerAddress, wallet, "1000000000000000000000000000000000000000000000")