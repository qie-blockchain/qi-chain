const { ethers } = require('ethers');
let transactions = require('../swapTransactions.json')
let hashes = require('../doodleQI.json')
hashes = hashes.reverse()
const fs = require('fs')
// console.log(object);
async function checkTransactionStatus(provider, transactionHash) {
    try {
        const receipt = await provider.getTransactionReceipt(transactionHash);

        if (receipt && receipt.status === 1) {
            // If the status is 1, the transaction was successful
            return true;
        } else {
            // If the status is 0, the transaction was reverted or failed
            return false;
        }
    } catch (error) {
        console.error("Error checking transaction status:", error);
        return false; // Assume failure in case of an error
    }
}
const provider = new ethers.JsonRpcProvider(
    "https://rpc-main1.qiblockchain.online"
  ); //


(async()=>{
    let obj = {}
    for(let number of hashes){
        for(let j in transactions){
            // console.log(number.number, transactions[j].number);
            if(number.number === transactions[j].number){
                console.log("here", transactions[j].transactionHash);
                
                const receipt = await provider.getTransactionReceipt(transactions[j].transactionHash);
                // console.log(receipt);
                if (receipt && receipt.status === 1) {
                    // If the status is 1, the transaction was successful
                    console.log("Status of number", number.number, "is", true);
                    obj[number.number] = true
                    break
                } else {
                    // If the status is 0, the transaction was reverted or failed
                    console.log("Status of number", number.number, "is", false);
                    obj[number.number] = false

                    break
                }
            }
        }
    }
    const jsonData = JSON.stringify(obj, null, 2); // 2 is for indentation
    fs.writeFileSync('isTrueDoodleQI.json', jsonData);

})()