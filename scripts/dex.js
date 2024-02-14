const ethers = require('ethers');
const fs = require('fs');

// Set up the Ethereum provider
const provider = new ethers.JsonRpcProvider('https://rpc-main1.qiblockchain.online');

// Uniswap V2 Pair contract address (specific to the trading pair you're interested in)
const uniswapPairAddress = '0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9'; // Replace with the actual address
const lp_addresses = [
    '0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9',
    '0xDc2CeE2CDc1b6795005430e5e562b79ba9fA1149',
    '0x0537425285dDB8c805a64F4Df771bA3DF48CdADc',
    '0x778693Fa7ca3F86B6169c06F0be899e2D0E40A3b',
    '0x7D024Cc7a1a5Ec60e4E9D4dE7B9F8cF9821d8369',
    '0x892Cc0aB6Add7Fd68A0F197d4AC16ACB01Cb9503',
    '0x0E921910874D0d290F5A88179b37690402396464',
    '0x0eEe5458F2682811033eFD72b9b833Bb9E3fE672',
    '0x13180eBeb52bb2CF5e8Df20bCccee727a01E8bf2',
    '0x278Ddd941964b45260960b92884E8cB97De9ed5C',
    '0x2dbcD9270647229B342A1460ad391fAa537647e0',
    '0x3168Eb8cc9Fe27115136448b05927f3e0F3863d4',
    '0x58DcF74672173255A3eB030C7b7266C5fa2F2EBe',
    '0x5D0633b34E9527A3e555322F5bC014d836EE9fcA',
    '0x6677deC1C15f28Fbf30bb0013aeb9D4Ee1274D10',
    '0x6B61b15a63c87321b72E97Ebc11152BE3F9e9Fbb',
    '0x808326623530AA8bbdeD50ad3AeB410CbC111216',
    '0x8f01AEDF18E58ec2d93584Cc1Cdd801EB97b505A',
    '0x91F698E7e5B9fe54D261bBd794170136623B17f3',
    '0x95bC07E3c18b53125e2f38583E5359C7E61B7BB7',
    '0xc798b32607DAd9796330bcCEB6b18F5b40C5E3a8',
    '0xd6b5cB320F9070192Bb44C6eD08e7Ac010c59394',
    '0xe5312238364517223281B6e8f42DeF3B4C9dC825',
    '0xeAaCFc205da0Cd16D984773E2CD527e6fee7F39F',
    '0xf3f1f31315F4A3d5b9c961fc3aDF04432f3061F7',
    '0xF8de837Df549AB8Fb68A0D35c1fb205DbBC10C73',
    '0x38AEf9767edF892EF6EAA23d249c322c2A6a08E5',
    '0x3c733E1324d30586992E40858b3dC6Fb51559023',
    '0x445084d89F257E5AFE05334782F2975B07D261F1',
    '0x48f58917eAd7a2E5f8e52424E7d5267b42cF1eB1',
    '0x62c35A84d0d44711963F6935CEb9B023727a44A8',
    '0x82ACc32a6B557Edf51C8f89Ba936AD43d646C648',
    '0x9fCf24bD2EF9e2c9dE4c6694683293bE9eCDfB0C',
    '0xE68Fe0Ee54260af67E323e117fB436bb254978A9'
  ]
// Your Ethereum wallet address
const walletAddress = '0x0bFD580a07a6f0F8ef8F9010D827d136c1ec6e43'; // Replace with the actual address

// ABI for Uniswap V2 Pair contract
const pairAbi = [
    'function totalSupply() external view returns (uint256)',
    'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
    'function token0() external view returns (address)',
    'function token1() external view returns (address)',
  ];
  


const erc20Abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

async function getLiquidityContribution(contractAddressHash, walletAddress, lpBalance) {
  const pairContract = new ethers.Contract(contractAddressHash, pairAbi, provider);

  // Get the total supply of LP tokens
  const totalSupply = await pairContract.totalSupply();

  // Get the reserves of Token A and Token B
  const [reserve0, reserve1] = await pairContract.getReserves();
 console.log(reserve0, reserve1);
 console.log(contractAddressHash, "contract");
 const token0Address = await pairContract.token0();
 const token1Address = await pairContract.token1();

 // Fetch the names of Token A and Token B using their addresses
 const token0Contract = new ethers.Contract(token0Address, erc20Abi, provider);
 const token1Contract = new ethers.Contract(token1Address, erc20Abi, provider);

 const token0Name = await token0Contract.name();
 const token1Name = await token1Contract.name();
 const token0Symbol = await token0Contract.symbol();
 const token1Symbol = await token1Contract.symbol();

  // Get the balance of LP tokens for the specified wallet
//   const lpBalance = 0.000807332890160387 // replace this with the actual LP token balance of the wallet;
  const ethersBigNumber = ethers.parseEther(lpBalance.toString(), 'wei')
  const tokenABalance = ethersBigNumber * reserve0 / totalSupply;
  const tokenBBalance = ethersBigNumber * reserve1 / totalSupply;
  // Calculate the contribution of Token A and Token B
//   const tokenABalance = (lpBalance.mul(reserve0)).div(totalSupply);
//   const tokenBBalance = (lpBalance.mul(reserve1)).div(totalSupply);

  console.log(`Contribution of Token A: ${tokenABalance.toString()}`);
  console.log(`Contribution of Token B: ${tokenBBalance.toString()}`);
  return {
    contractAddressHash,
    walletAddress,
    tokenABalance: tokenABalance.toString(),
    tokenBBalance: tokenBBalance.toString(),
    tokenAName: token0Name.toString(),
    tokenBName: token1Name.toString(),
    tokenASymbol: token0Symbol.toString(),
    tokenBSymbol: token1Symbol.toString()
  };
}

// getLiquidityContribution();
// const results = [];
const data = [
    {
      "contractAddressHash": "0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "2034553531528517877862508"
          },
          {
            "address": "0x790b5e747a33196c8da58afd9abc53efcc32a0f3",
            "value": "59706189422798716029122"
          },
          {
            "address": "0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d",
            "value": "4383359837596560334514"
          },
          {
            "address": "0x978f4e56ae55c0602c607c3c7f80392217b3bf98",
            "value": "1669044898847259514943"
          },
          {
            "address": "0x92ff9579428b52482428c0bc68a51db188170297",
            "value": "787786963781921374140"
          },
          {
            "address": "0x1f3d6b473af08e4fc310c4806b35ff66ee227cca",
            "value": "58059042578842772163"
          },
          {
            "address": "0x2e61822721b7f4d0960cec56c70a197db53b0781",
            "value": "38365455822632829228"
          },
          {
            "address": "0xf7bfc8c969e665d82dfc30507bd179b84137213e",
            "value": "5725590105190117051"
          },
          {
            "address": "0x2fecb3d1bb524313d318ca6371508c3bd94d2077",
            "value": "5541570323596593549"
          },
          {
            "address": "0x8d0473d4e8e8d847e70ac83afbf62b037963548e",
            "value": "5528640475870971335"
          },
          {
            "address": "0x0bfd580a07a6f0f8ef8f9010d827d136c1ec6e43",
            "value": "807332890160387"
          },
          {
            "address": "0x49141cdbaa6374c1404cf4166787a56e9213606f",
            "value": "9647406592"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xDc2CeE2CDc1b6795005430e5e562b79ba9fA1149",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x86dc994e600fd55b49208de935e92a73cb896696",
            "value": "44721359549995792928"
          },
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "14363014325932311059"
          },
          {
            "address": "0x10d5e55569471ae227c1ead781599b23ac605064",
            "value": "4026204161637908329"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x0537425285dDB8c805a64F4Df771bA3DF48CdADc",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "109900123845"
          },
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "2497"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x778693Fa7ca3F86B6169c06F0be899e2D0E40A3b",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x887c8310922c0aed5cc09e1ce43c4779c7403300",
            "value": "26458214385404080"
          },
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "1430885438517"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x7D024Cc7a1a5Ec60e4E9D4dE7B9F8cF9821d8369",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9",
            "value": "17143433181030611941"
          },
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "806453442858218"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x892Cc0aB6Add7Fd68A0F197d4AC16ACB01Cb9503",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "3094231662746342242"
          },
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "249240138329"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x0E921910874D0d290F5A88179b37690402396464",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "4305591740144"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x0eEe5458F2682811033eFD72b9b833Bb9E3fE672",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "517033850046861185"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x13180eBeb52bb2CF5e8Df20bCccee727a01E8bf2",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "54772255750516610345"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x278Ddd941964b45260960b92884E8cB97De9ed5C",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x26ff527f9fa303a51a9e7c127149299d51863b1e",
            "value": "316227766016837932199"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x2dbcD9270647229B342A1460ad391fAa537647e0",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "741632729434049976"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x3168Eb8cc9Fe27115136448b05927f3e0F3863d4",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x887c8310922c0aed5cc09e1ce43c4779c7403300",
            "value": "10488083237654963"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x58DcF74672173255A3eB030C7b7266C5fa2F2EBe",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x55aae01ad28fd6fc442ea0b93d9d39670d55140f",
            "value": "4972498090721323210411"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x5D0633b34E9527A3e555322F5bC014d836EE9fcA",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "99999999999000"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x6677deC1C15f28Fbf30bb0013aeb9D4Ee1274D10",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0xfb67a75d36f226b500cc1e38adcaa746698c13e1",
            "value": "22360679774997895964"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x6B61b15a63c87321b72E97Ebc11152BE3F9e9Fbb",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x609fac9d07e0741ab22148a747db0993276ef889",
            "value": "209147004396891321532"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x808326623530AA8bbdeD50ad3AeB410CbC111216",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "3162277660168378331"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x8f01AEDF18E58ec2d93584Cc1Cdd801EB97b505A",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0xe8c852fb61a6350caa4a5301ecaea4f5df2eade9",
            "value": "4999999999999999999000"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x91F698E7e5B9fe54D261bBd794170136623B17f3",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "3162277660168379330998"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0x95bC07E3c18b53125e2f38583E5359C7E61B7BB7",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0xff46c57b87f90f0681053d63279149d9616e970b",
            "value": "39999999999000"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xc798b32607DAd9796330bcCEB6b18F5b40C5E3a8",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "3510128201711"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xd6b5cB320F9070192Bb44C6eD08e7Ac010c59394",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x3187eca49599e4be074a56acb9396aecb9d3ab1e",
            "value": "10682582975504575750"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xe5312238364517223281B6e8f42DeF3B4C9dC825",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "999999999999999000"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xeAaCFc205da0Cd16D984773E2CD527e6fee7F39F",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x92287db09b1eaf3f55335d3b06474ff20fb7ff9e",
            "value": "99999999999999999000"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xf3f1f31315F4A3d5b9c961fc3aDF04432f3061F7",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d",
            "value": "316227766016836933"
          }
        ],
        "status": "1"
      }
    },
    {
      "contractAddressHash": "0xF8de837Df549AB8Fb68A0D35c1fb205DbBC10C73",
      "data": {
        "message": "OK",
        "result": [
          {
            "address": "0xfba2dbb5f9e2d12f03e5805703a1cc7395164711",
            "value": "999999000"
          }
        ],
        "status": "1"
      }
    },
    // {
    //   "contractAddressHash": "0x38AEf9767edF892EF6EAA23d249c322c2A6a08E5",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0x3c733E1324d30586992E40858b3dC6Fb51559023",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0x445084d89F257E5AFE05334782F2975B07D261F1",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0x48f58917eAd7a2E5f8e52424E7d5267b42cF1eB1",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0x62c35A84d0d44711963F6935CEb9B023727a44A8",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0x82ACc32a6B557Edf51C8f89Ba936AD43d646C648",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0x9fCf24bD2EF9e2c9dE4c6694683293bE9eCDfB0C",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // },
    // {
    //   "contractAddressHash": "0xE68Fe0Ee54260af67E323e117fB436bb254978A9",
    //   "data": {
    //     "message": "OK",
    //     "result": [],
    //     "status": "1"
    //   }
    // }
  ]
  
// Iterate through the data and call getLiquidityContribution for each entry

async function test(){
    try {
      // Asynchronous function to process each entry
      const processEntry = async (item, entry) => {
        const result = await getLiquidityContribution(item.contractAddressHash, entry.address, entry.value);
        return result;
      };
  
      // Use Promise.all to handle asynchronous calls
      const results = await Promise.all(data.flatMap(item =>
        item.data.result.map(entry => processEntry(item, entry))
      ));
  
      // Save results to a JSON file
      const outputJsonData = JSON.stringify(results, null, 2); // 2 is for indentation
      fs.writeFileSync('dexBalances.json', outputJsonData);
  
      console.log('Data saved to output.json');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  test()
async function trying(){
    await getLiquidityContribution("0x27A531A7d90528d468E01CFF0E8a7bd44D858Ab9","0x7f2ce0b4991b5d345a3e8d1fd75318c1ddbe8d6d", "2034553531528517877862508" )
}
// trying()

const newAddrress = [
    { "address": "0x5Ed4F5122eD46901F420A28285f9B70e07a9FD3E", "symbol": "QIDEX" },
    { "address": "0xe4d3086F645B9d1849b55a9210cc7FB45c8Cf6F7", "symbol": "BUSD" },
    { "address": "0x56857bA9DA569470d76fF18775af46799ED9012a", "symbol": "ETH" },
    { "address": "0xb208DAAd004C60369Ca6134A5BFA8134c8205E17", "symbol": "USDT" },
    { "address": "0xbeFAb3Dc065b962173BD585d8496b47E977658eA", "symbol": "BSS" },
    { "address": "0x36062bD97a37480D429FDb9f1B132b3C7a2B1c86", "symbol": "BUSD" },
    { "address": "0xC02fD61BFfA8AA020472BBF4c1B196D373dDb0D6", "symbol": "QI Blockchain - Mainnet" },
    { "address": "0x6e35A6Cb5dD72eC58dC84766848267b4F2bc99Ff", "symbol": "Test Token" },
    { "address": "0x42faEBD2e0bC342C60f8A91db2738a223631373e", "symbol": "IEVE" },
    { "address": "0xC50C26C6Df96fb8A2fE5cbf466427B13e6a2aA7f", "symbol": "infinity" },
    { "address": "0x4d4A88EecF243B7Dd4C7dDecE221Bb7F9A6E8965", "symbol": "farnus" },
    { "address": "0xA0Fa5755aa86dA18C554d90d2585D6C99F93370b", "symbol": "indiancode" },
    { "address": "0x938562c88945AF98974Ecd2CA90Ec99B846A2EE5", "symbol": "MEMG" },
    { "address": "0xE9d0F20AFFC57a59fcD814914c240A22831760A9", "symbol": "USDC" },
    { "address": "0xe6ecEDD2aE233B702a734479f273c344135dFa02", "symbol": "COBA" },
    { "address": "0x4315e4a11cA1d1562693DBBC5b83253c060E6Fe6", "symbol": "uSDQ" }
  ]
  