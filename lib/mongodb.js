import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Connection options with timeouts to prevent Vercel 504 errors
const options = {
  serverSelectionTimeoutMS: 5000,  // 5 seconds to find server
  connectTimeoutMS: 5000,           // 5 seconds to connect
  socketTimeoutMS: 8000,            // 8 seconds for operations
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI is not set in environment variables.');
} else {
  if (process.env.NODE_ENV === 'development') {
    // In development: use global variable to preserve connection across HMR reloads
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production (Vercel): create a new connection each time
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
