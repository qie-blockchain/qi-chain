const axios = require('axios');
const fs = require('fs');

async function getTokenHoldersData(contractAddressHashes) {
  const results = [];

  // Iterate through each contract address hash
  for (const contractAddressHash of contractAddressHashes) {
    const endpoint = `https://mainnet.qiblockchain.online/api?module=token&action=getTokenHolders&contractaddress=${contractAddressHash}&page=1&limit=5000`;

    try {
      // Make a GET request using Axios
      const response = await axios.get(endpoint);

      // Check if the response is successful
      if (response.status === 200) {
        const data = response.data;
        // Add data to the results list
        results.push({ contractAddressHash, data });
        console.log("done for", contractAddressHash);
      } else {
        console.error(`Error for contractAddressHash ${contractAddressHash}: HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error for contractAddressHash ${contractAddressHash}: ${error.message}`);
    }
  }

  return results;
}

// Example list of contract address hashes


const contractAddressHashes = [
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
// Call the function and save the output to a JSON file
getTokenHoldersData(contractAddressHashes)
  .then(results => {
    // Save results to a JSON file
    const jsonData = JSON.stringify(results, null, 2); // 2 is for indentation
    fs.writeFileSync('dexBalances.json', jsonData);

    console.log('Data saved to output.json');
  })
  .catch(error => {
    console.error('Error during getTokenHoldersData:', error.message);
  });
