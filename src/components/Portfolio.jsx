import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { categories, localPortfolioData } from '../assets/constants';
import PortfolioFilters from './PortfolioFilters';
import PortfolioCategoryCard from './PortfolioCategoryCard';
import PortfolioImageCard from './PortfolioImageCard';

const toSlug = (cat) => cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

const Portfolio = () => {
  const { t } = useTranslation();
  const [filterIndex, setFilterIndex] = useState(0);
  const [dbImages, setDbImages] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenImage = (item) => {
    setSelectedImage(item);
    setRotation(0);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images');
        if (res.ok) {
          const data = await res.json();
          setDbImages(data);
        }
      } catch (err) {
        console.error('Failed to fetch gallery images', err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/gallery')) {
      if (categorySlug) {
        const index = categories.findIndex(c => toSlug(c) === categorySlug);
        if (index !== -1) {
          setFilterIndex(index);
        } else {
          setFilterIndex(0);
        }
      } else {
        setFilterIndex(0);
      }
    }
  }, [categorySlug, location.pathname]);

  const handleFilterChange = (newIndex) => {
    if (location.pathname.includes('/gallery')) {
      if (newIndex === 0) {
        navigate('/gallery');
      } else {
        navigate(`/gallery/${toSlug(categories[newIndex])}`);
      }
    } else {
      setFilterIndex(newIndex);
    }
  };

  const getCategory = (index) => categories[(index % (categories.length - 1)) + 1];

  const dbPortfolioData = dbImages.map((img, index) => ({
    id: `db-${img._id}`,
    category: img.service && img.service !== 'Other' && img.service !== 'Uncategorized' ? img.service : getCategory(index),
    src: img.imageUrl || img.imageBase64,
    thumb: img.imageUrl || img.imageBase64,
    title: img.name,
    amount: 0
  }));

  const combinedData = [...dbPortfolioData, ...localPortfolioData];
  const categoryCounters = {};
  const portfolioData = combinedData.map(item => {
    const catName = item.category || 'Design';
    if (!categoryCounters[catName]) categoryCounters[catName] = 0;
    categoryCounters[catName]++;
    return { ...item, title: `${catName} ${categoryCounters[catName]}` };
  });

  const filteredData = filterIndex === 0 
    ? portfolioData 
    : portfolioData.filter(item => {
        const selectedCat = categories[filterIndex];
        if (selectedCat === 'Arches') {
          return item.category === 'Arches' || item.category === 'Balloon Arch' || item.category === 'Floral Arch';
        }
        if (selectedCat === 'Wedding & Reception') {
          return item.category === 'Wedding & Reception' || item.category === 'Wedding' || item.category === 'Reception';
        }
        if (selectedCat === 'Manchal Neeratu Vizha') {
          return item.category === 'Manchal Neeratu Vizha' || item.category === 'Age Ceremony Decoration' || item.category === 'Kathukuthu' || item.category === 'Valaigapu';
        }
        return item.category === selectedCat || item.title === selectedCat;
      });

  return (
    <section id="gallery" className="relative py-28 min-h-screen overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkPurple via-[#1a0530] to-darkPurple"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,11,69,0.6)_0%,transparent_50%)]"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative top ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/50"></div>
            <span className="text-gold/60 text-2xl">✦</span>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/50"></div>
          </div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-body uppercase tracking-[0.3em] text-xs sm:text-sm mb-3"
          >
            {t('portfolio.subtitle', 'Our Masterpieces')}
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[1.8rem] sm:text-4xl md:text-5xl lg:text-6xl font-luxury text-cream font-bold mb-4 break-words px-2 leading-snug"
          >
            {t('portfolio.title', 'Premium Portfolio Gallery')}
          </motion.h2>
          <p className="text-cream/50 font-body text-sm max-w-xl mx-auto">Explore our stunning collection of decoration designs crafted with love and elegance</p>
          
          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-gold/30"></div>
            <div className="w-2 h-2 rounded-full bg-gold/40"></div>
            <div className="w-20 h-px bg-gold/50"></div>
            <div className="w-2 h-2 rounded-full bg-gold/40"></div>
            <div className="w-12 h-px bg-gold/30"></div>
          </div>
        </div>

        {/* Filters */}
        <PortfolioFilters 
          categories={categories}
          filterIndex={filterIndex}
          handleFilterChange={handleFilterChange}
          showAllCategories={showAllCategories}
          setShowAllCategories={setShowAllCategories}
        />

        {/* Content */}
        {filterIndex === 0 ? (
          /* ===== ALL VIEW: Category Cards ===== */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-7">
            {categories.slice(1).map((cat, index) => {
              const catImages = portfolioData.filter(item => {
                if (cat === 'Arches') return item.category === 'Arches' || item.category === 'Balloon Arch' || item.category === 'Floral Arch';
                if (cat === 'Wedding & Reception') return item.category === 'Wedding & Reception' || item.category === 'Wedding' || item.category === 'Reception';
                if (cat === 'Manchal Neeratu Vizha') return item.category === 'Manchal Neeratu Vizha' || item.category === 'Age Ceremony Decoration' || item.category === 'Kathukuthu' || item.category === 'Valaigapu';
                return item.category === cat;
              });
              const coverImage = catImages.length > 0 ? catImages[0].thumb : null;
              const imageCount = catImages.length;

              return (
                <PortfolioCategoryCard 
                  key={cat}
                  cat={cat}
                  index={index}
                  coverImage={coverImage}
                  imageCount={imageCount}
                  onClick={() => handleFilterChange(index + 1)}
                />
              );
            })}
          </div>
        ) : (
          /* ===== CATEGORY VIEW: Image Grid ===== */
          <div className="relative">
            {/* Decorative background panel */}
            <div className="absolute -inset-5 sm:-inset-8 bg-gradient-to-br from-royal/30 via-[#1a0530]/80 to-royal/30 rounded-3xl border border-gold/15 -z-10"></div>
            
            {/* Corner ornaments */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl pointer-events-none"></div>
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl pointer-events-none"></div>
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl pointer-events-none"></div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-gold/30 rounded-br-2xl pointer-events-none"></div>

            {/* Back to All button */}
            <div className="mb-10 pt-5 sm:pt-8 px-4 sm:px-6">
              <button
                onClick={() => handleFilterChange(0)}
                className="flex items-center gap-2 text-gold font-body text-sm tracking-wider hover:text-lightGold transition-colors mb-5 group"
              >
                <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back to All Categories
              </button>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-cream font-luxury text-2xl sm:text-3xl font-bold">
                  {t(`portfolio.categories.${categories[filterIndex].toLowerCase().replace(/ /g, '_')}`, categories[filterIndex])}
                </h3>
                <span className="text-gold font-body text-xs bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">{filteredData.length} designs</span>
              </div>
              {/* Decorative divider */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gold/40"></div>
                <div className="flex-1 h-px bg-gradient-to-l from-gold/30 to-transparent"></div>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-6 sm:pb-8">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-7 lg:gap-8 space-y-6 sm:space-y-7 lg:space-y-8 relative z-10">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, index) => (
                    <PortfolioImageCard 
                      key={item.id} 
                      item={item} 
                      index={index} 
                      onClick={() => handleOpenImage(item)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Full-Screen Framer Motion Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-darkPurple/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Right Controls */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-[101]">
              {/* Rotate Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRotation(prev => prev + 90);
                }}
                className="text-gold/70 hover:text-gold bg-black/30 hover:bg-black/50 rounded-full p-3 transition-all"
                title="Rotate Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gold/70 hover:text-gold bg-black/30 hover:bg-black/50 rounded-full p-3 transition-all"
                title="Close Viewer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Container */}
            <div 
              className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`image-${selectedImage.id}`}
                src={selectedImage.src}
                alt={selectedImage.title || selectedImage.category}
                animate={{ rotate: rotation }}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl shadow-gold/20"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            </div>

            {/* Bottom Info Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl bg-black/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gold/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                {selectedImage.title && (
                  <h3 className="text-cream font-luxury text-xl sm:text-2xl font-bold tracking-wider mb-1">
                    {selectedImage.title}
                  </h3>
                )}
                <p className="text-gold/80 font-body text-sm uppercase tracking-widest">
                  {t(`portfolio.categories.${selectedImage.category.toLowerCase().replace(/ /g, '_')}`, selectedImage.category)}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const link = document.createElement('a');
                  link.href = selectedImage.src;
                  link.download = selectedImage.title ? `${selectedImage.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg` : 'KS_Decor.jpg';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-600 text-darkPurple font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t('portfolio.download', 'Download')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
