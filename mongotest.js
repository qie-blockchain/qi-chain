const { MongoClient } = require('mongodb');

// Connection URI for MongoDB
const uri = 'mongodb://localhost:27017/qienhancement'; // Replace with your MongoDB connection string

// Database and collection names
const dbName = 'qienhancement';
const collectionName = 'staking';

// Function to connect to MongoDB
async function connectToMongo() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    return { client, collection };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to insert a transaction
 async function insertTransaction(publicKey, transactionHash, value, blockNumber, isStake) {
  const { client, collection } = await connectToMongo();

  try {
    const timestamp = new Date(); // Get current datetime

    const result = await collection.insertOne({
      publicKey,
      transactionHash,
      value,
      blockNumber,
      isStake,
      timestamp
    });

    console.log('Transaction inserted:', result.insertedId);
  } finally {
    await client.close();
  }
}

// Function to retrieve all transactions
async function getAllTransactions() {
  const { client, collection } = await connectToMongo();

  try {
    const transactions = await collection.find({}).toArray();
    return transactions;
  } finally {
    await client.close();
  }
}
async function getAllTransactions() {
    const { client, collection } = await connectToMongo();
  
    try {
      const transactions = await collection.find({}).toArray();
      return transactions;
    } finally {
      await client.close();
    }
  }
  

// Example usage
async function main() {
  await insertTransaction('publicKey1', 'hash1', 100);
  await insertTransaction('publicKey2', 'hash2', 200);

  const transactions = await getAllTransactions();
  console.log('All transactions:', transactions);
}

// main();
module.exports={insertTransaction, getAllTransactions}
