import React, { useState, useEffect } from 'react';

// ✅ Paste your FREE ImgBB API key here: https://api.imgbb.com/
const IMGBB_API_KEY = '2917fe313678ce84e915687b682c0596';

const SERVICES_LIST = [
  "Our Services",
  "Wedding Decoration",
  "Reception Decoration",
  "Mehendi & Haldi Decoration",
  "Ear Piercing Ceremony Decoration",
  "Welcome Entrance Decoration",
  "Balloon Arch Decoration",
  "Floral Arch Decoration",
  "Car Decoration",
  "Seer Thattu Decoration",
  "Air Cooler Rental"
];

export default function ImageManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');
  const [service, setService] = useState('Our Services');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to fetch images');
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to connect to the server');
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset
    setError('');
    e.target.value = '';

    if (IMGBB_API_KEY === 'YOUR_IMGBB_API_KEY_HERE') {
      setError('Please set your ImgBB API key in ImageManager.jsx. Get it free at api.imgbb.com');
      return;
    }

    // File size check - ImgBB allows up to 32MB
    if (file.size > 32 * 1024 * 1024) {
      setError('File is too large. Maximum size is 32MB.');
      return;
    }

    setUploading(true);
    setUploadProgress('Uploading to image host...');

    try {
      // Step 1: Upload image to ImgBB
      const formData = new FormData();
      formData.append('image', file);

      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        throw new Error(imgbbData.error?.message || 'ImgBB upload failed');
      }

      const imageUrl = imgbbData.data.url;
      const deleteUrl = imgbbData.data.delete_url;
      setUploadProgress('Saving to database...');

      // Step 2: Save only the URL to MongoDB via our API
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          deleteUrl,
          name: file.name,
          service: service === 'Our Services' ? 'Uncategorized' : service,
          amount: amount
        }),
      });

      if (res.ok) {
        const newImage = await res.json();
        setImages([newImage, ...images]);
        setUploadProgress('');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to save image to database');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(`Upload failed: ${err.message}`);
    }

    setUploading(false);
    setUploadProgress('');
    setAmount(''); // Reset amount after upload
    setService('Our Services'); // Reset service after upload
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch('/api/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setImages(images.filter((img) => img._id !== id));
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Error deleting image');
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-luxury font-bold text-darkPurple">Gallery Manager</h2>
          <p className="text-gray-500 text-sm font-body mt-1 uppercase tracking-widest">Add or Remove Images</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium">
          {error}
        </div>
      )}

      <div className="mb-10 p-8 bg-royal/5 border border-royal/10 border-dashed rounded-2xl text-center transition-all hover:bg-royal/10">
        <label className="block text-sm font-luxury font-bold text-darkPurple mb-6 uppercase tracking-widest">
          Upload New Image
        </label>
        
        <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="text-left">
            <label className="block text-xs font-bold text-darkPurple mb-2 uppercase tracking-widest">Service Category</label>
            <select 
              value={service} 
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gold"
            >
              {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="text-left">
            <label className="block text-xs font-bold text-darkPurple mb-2 uppercase tracking-widest">Amount (₹)</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:uppercase file:tracking-wider file:bg-royal file:text-cream hover:file:bg-darkPurple cursor-pointer transition-all mx-auto"
          />
        </div>
        {uploading && (
          <p className="text-sm font-medium text-gold mt-4 flex items-center justify-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-gold border-t-transparent rounded-full"></span>
            {uploadProgress || 'Uploading...'}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-luxury font-bold text-darkPurple">Current Collection</h3>
        <span className="text-sm font-body text-gray-400">{images.length} images</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="animate-spin h-10 w-10 border-4 border-gray-200 border-t-gold rounded-full"></span>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-400 italic font-luxury text-lg">No images in your collection yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img._id} className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-gray-100">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src={img.imageUrl || img.imageBase64}
                  alt={img.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkPurple/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <button
                  onClick={() => handleDelete(img._id)}
                  className="bg-red-500/90 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm"
                >
                  Delete
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none bg-gradient-to-t from-darkPurple via-darkPurple/80 to-transparent pt-12">
                <p className="text-sm text-cream font-luxury truncate drop-shadow-md" title={img.name}>{img.service || 'Uncategorized'}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gold/80 font-body">{new Date(img.createdAt).toLocaleDateString()}</p>
                  {img.amount > 0 && <p className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">₹{img.amount}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
