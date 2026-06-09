import React, { useState, useEffect } from 'react';
import { FiTag, FiDollarSign, FiChevronDown, FiUploadCloud } from 'react-icons/fi';

// ✅ Paste your FREE ImgBB API key here: https://api.imgbb.com/
const IMGBB_API_KEY = '2917fe313678ce84e915687b682c0596';

const SERVICES_LIST = [
  "Our Services",
  "Wedding",
  "Reception",
  "Mehendi & Haldi",
  "Ear Piercing Ceremony",
  "Welcome Board",
  "Balloon Arch",
  "Floral Arch",
  "Car Decoration",
  "Seer Thattu",
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

      <div className="mb-10 p-8 md:p-12 bg-gradient-to-br from-royal/5 to-gold/5 border border-gold/20 rounded-3xl text-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] -z-10"></div>
        
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gold/30 text-gold group-hover:scale-110 transition-transform duration-500">
            <FiUploadCloud size={28} />
          </div>
        </div>

        <label className="block text-xl font-luxury font-bold text-darkPurple mb-8 uppercase tracking-widest drop-shadow-sm">
          Upload New Masterpiece
        </label>
        
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="text-left relative">
            <label className="block text-xs font-luxury font-bold text-darkPurple/80 mb-2 uppercase tracking-widest pl-1">Service Category</label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within/input:text-gold">
                <FiTag className="text-gold/70 group-focus-within/input:text-gold" size={18} />
              </div>
              <select 
                value={service} 
                onChange={(e) => setService(e.target.value)}
                className="w-full pl-12 pr-10 py-4 border border-white/60 rounded-2xl text-sm bg-white/70 backdrop-blur-md focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all appearance-none text-darkPurple font-medium shadow-sm hover:bg-white"
              >
                {SERVICES_LIST.map(s => <option key={s} value={s} className="text-darkPurple bg-white">{s}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <FiChevronDown className="text-gold/50" size={20} />
              </div>
            </div>
          </div>
          
          <div className="text-left relative">
            <label className="block text-xs font-luxury font-bold text-darkPurple/80 mb-2 uppercase tracking-widest pl-1">Amount (₹)</label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within/input:text-gold">
                <FiDollarSign className="text-gold/70 group-focus-within/input:text-gold" size={18} />
              </div>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full pl-12 pr-4 py-4 border border-white/60 rounded-2xl text-sm bg-white/70 backdrop-blur-md focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all text-darkPurple font-medium shadow-sm hover:bg-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-6 file:py-4 file:px-8 file:rounded-full file:border-0 file:text-sm file:font-bold file:uppercase file:tracking-widest file:bg-gradient-to-r file:from-gold file:to-yellow-600 file:text-white hover:file:shadow-lg hover:file:scale-105 file:transition-all cursor-pointer mx-auto file:cursor-pointer"
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
