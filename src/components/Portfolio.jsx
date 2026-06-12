import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-rotate.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgRotate from 'lightgallery/plugins/rotate';
import { useTranslation } from 'react-i18next';
import { categories, localPortfolioData } from '../assets/constants';
import PortfolioFilters from './PortfolioFilters';
import PortfolioCategoryCard from './PortfolioCategoryCard';
import PortfolioImageCard from './PortfolioImageCard';

const Portfolio = () => {
  const { t } = useTranslation();
  const [filterIndex, setFilterIndex] = useState(0);
  const [dbImages, setDbImages] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [lgInstance, setLgInstance] = useState(null);

  useEffect(() => {
    if (window.location.hash === '#viewing') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
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

  // Handle hardware back button to close gallery or go back to All Categories
  useEffect(() => {
    const handlePopState = () => {
      // Ignore the popstate event that fires when we open the gallery
      if (window.location.hash === '#viewing') {
        return;
      }

      try {
        if (lgInstance && typeof lgInstance.closeGallery === 'function') {
          lgInstance.closeGallery();
        } else {
          // Fallback if instance is lost
          const closeBtn = document.querySelector('.lg-close');
          if (closeBtn) closeBtn.click();
        }
      } catch (e) {
        // Ignore errors if gallery is already closed or unmounted
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [lgInstance]);

  const handleFilterChange = (newIndex) => {
    setFilterIndex(newIndex);
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
              <LightGallery
                key={filterIndex}
                speed={500}
                plugins={[lgZoom, lgThumbnail, lgRotate]}
                selector=".gallery-item"
                onInit={(detail) => setLgInstance(detail.instance)}
                onBeforeClose={() => {
                  if (window.location.hash === '#viewing') {
                    window.history.back();
                  }
                }}
                galleryId={`gallery-${filterIndex}`}
                elementClassNames="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-7 lg:gap-8 space-y-6 sm:space-y-7 lg:space-y-8 relative z-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, index) => (
                    <PortfolioImageCard key={item.id} item={item} index={index} />
                  ))}
                </AnimatePresence>
              </LightGallery>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
