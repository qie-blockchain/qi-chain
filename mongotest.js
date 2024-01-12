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

async function createAndInsertObject(data) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db("qienhancement");
    let collectionName = "rpc"
    // Check if the collection exists
    const collections = await database.listCollections().toArray();
    const collectionExists = collections.some(collection => collection.name === collectionName);

    if (!collectionExists) {
      // Create the collection only if it doesn't exist
      await database.createCollection(collectionName);
      console.log(`Collection '${collectionName}' created.`);
    } else {
      console.log(`Collection '${collectionName}' already exists.`);
    }

    // Insert the object into the collection
    const collection = database.collection(collectionName);
    const document = typeof data === 'string' ? { value: data } : data;
    await collection.insertOne(document);
    console.log('Object inserted successfully.');
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
  
  async function retrieveValues() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      
      const database = client.db("qienhancement");
      let collectionName = "rpc"

      // Check if the collection exists
      const collections = await database.listCollections().toArray();
      const collectionExists = collections.some(collection => collection.name === collectionName);
  
      if (!collectionExists) {
        console.log(`Collection '${collectionName}' does not exist.`);
        return;
      }
  
      // Retrieve values from the collection
      const collection = database.collection(collectionName);
      const values = await collection.find().toArray();
      
      console.log('Retrieved values:', values);
      return values
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
module.exports={insertTransaction, getAllTransactions, createAndInsertObject, retrieveValues}
