import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://beenfilms67_db_user:99qG6QOjtDomvNAv@cluster0.zufqdu0.mongodb.net/ks-decors?retryWrites=true&w=majority";

async function test() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
    await client.close();
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

test();
