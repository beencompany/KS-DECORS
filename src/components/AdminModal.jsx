import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLock, FaUser } from 'react-icons/fa';
import ImageManager from './ImageManager';

const AdminModal = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded check as requested. 
    // In production, this should be validated on the backend.
    if (userId === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid User ID or Password');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setUserId('');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative w-full ${isAuthenticated ? 'max-w-6xl' : 'max-w-md'} bg-white rounded-2xl shadow-2xl overflow-hidden my-auto`}
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors z-10 bg-white/50 rounded-full hover:bg-red-50"
          >
            <FaTimes size={20} />
          </button>

          {!isAuthenticated ? (
            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-royal/10 text-royal rounded-full flex items-center justify-center mb-4">
                  <FaLock size={24} />
                </div>
                <h2 className="text-2xl font-luxury font-bold text-darkPurple">Admin Access</h2>
                <p className="text-gray-500 text-sm mt-2">Please enter your credentials to manage images.</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-royal focus:border-royal outline-none transition-all"
                      placeholder="Enter admin userid"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-royal focus:border-royal outline-none transition-all"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-royal hover:bg-darkPurple text-cream font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md mt-4"
                >
                  Secure Login
                </button>
              </form>
            </div>
          ) : (
            <div className="max-h-[90vh] overflow-y-auto custom-scrollbar p-1">
              <ImageManager />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminModal;
