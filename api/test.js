import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const uri = process.env.MONGODB_URI;

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    
    await client.connect();
    const db = client.db('ks-decors');
    const collections = await db.listCollections().toArray();
    await client.close();

    return res.status(200).json({
      status: '✅ MongoDB connected successfully!',
      database: 'ks-decors',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return res.status(500).json({
      status: '❌ MongoDB connection FAILED',
      error: error.message,
      errorCode: error.code,
      timestamp: new Date().toISOString()
    });
  }
}
