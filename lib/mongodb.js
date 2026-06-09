import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Connection options with TLS forced to prevent Vercel SSL 80 errors
const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 8000,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
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
