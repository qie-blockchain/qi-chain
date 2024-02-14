const axios = require('axios');

async function fetchData(initialAddress) {
  let allItems = [];

  async function fetchPage(url) {
    try {
      const response = await axios.get(url);
      const data = response.data;

      // Add items from the current page to the result array
      allItems.push(...data.items);
  
      // If there is a next page, recursively fetch it
      if (data.next_page_path) {
        console.log(`https://mainnet.qiblockchain.online${data.next_page_path}&type=JSON`);
        await fetchPage(`https://mainnet.qiblockchain.online${data.next_page_path}&type=JSON`);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  // Construct the initial API URL with the type=JSON parameter
  const initialUrl = `https://mainnet.qiblockchain.online/address/${initialAddress}?type=JSON`;

  // Start fetching data from the provided initial API URL
  await fetchPage(initialUrl);
//   console.log(allItems);
  return allItems;
}
function extractTransactionHash(apiResponse) {
    // Use regular expression to extract transaction hash
    const regex = /data-identifier-hash="([^"]+)"/;
    const match = apiResponse.match(regex);
  
    // Check if a match is found
    if (match && match[1]) {
      return match[1];
    } else {
      console.error('Transaction hash not found in the API response.');
      return null;
    }
  }
  

// Example usage
const initialAddress = '0x4fd15501aDe13Dc668E8d0247885f04bfD00B458';
fetchData(initialAddress)
  .then(items => {
    console.log(items, "items");
    console.log(items);
    // Do something with the items
  })
  .catch(error => console.error('Error fetching data:', error.message));
