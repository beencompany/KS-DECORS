import clientPromise from '../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (!clientPromise) {
      return res.status(500).json({ error: 'MONGODB_URI is not set in environment variables.' });
    }

    const client = await clientPromise;
    const db = client.db('ks-decors');
    const collection = db.collection('images');

    switch (req.method) {
      case 'GET': {
        const images = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return res.status(200).json(images);
      }

      case 'POST': {
        const { imageUrl, deleteUrl, name, imageBase64, service, amount } = req.body;

        // Support both new (imageUrl) and old (imageBase64) formats
        if (!imageUrl && !imageBase64) {
          return res.status(400).json({ error: 'imageUrl is required' });
        }

        const newImage = {
          imageUrl: imageUrl || null,
          imageBase64: imageBase64 || null,
          deleteUrl: deleteUrl || null,
          name: name || 'Untitled Image',
          service: service || 'Other',
          amount: Number(amount) || 0,
          createdAt: new Date()
        };

        const result = await collection.insertOne(newImage);
        return res.status(201).json({ ...newImage, _id: result.insertedId });
      }

      case 'DELETE': {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'Image ID is required' });
        }

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
        if (deleteResult.deletedCount === 1) {
          return res.status(200).json({ success: true, message: 'Image deleted' });
        } else {
          return res.status(404).json({ error: 'Image not found' });
        }
      }

      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
