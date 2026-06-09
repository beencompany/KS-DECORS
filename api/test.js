export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const hasMongoUri = !!process.env.MONGODB_URI;
  const mongoUriPreview = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI.substring(0, 30) + '...' 
    : 'NOT SET';

  return res.status(200).json({
    status: 'API is working',
    nodeEnv: process.env.NODE_ENV,
    hasMongoDBUri: hasMongoUri,
    mongoUriPreview: mongoUriPreview,
    timestamp: new Date().toISOString()
  });
}
