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
import lgHash from 'lightgallery/plugins/hash';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();
  const [filterIndex, setFilterIndex] = useState(0);
  const [dbImages, setDbImages] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [lgInstance, setLgInstance] = useState(null);

  const categories = [
    'All',
    'Birthday',
    'Wedding & Reception',
    'Manchal Neeratu Vizha',
    'Welcome Board',
    'Arches',
    'Car Decoration',
    'Seer Thattu',
    'Air Cooler Rental'
  ];

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

  // Handle hardware back button to close gallery
  useEffect(() => {
    const handlePopState = () => {
      // If gallery is open (indicated by LightGallery's body class)
      if (document.body.classList.contains('lg-on')) {
        if (lgInstance) {
          lgInstance.closeGallery();
        } else {
          // Fallback if instance is lost
          const closeBtn = document.querySelector('.lg-close');
          if (closeBtn) closeBtn.click();
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lgInstance]);

  const getCategory = (index) => categories[(index % (categories.length - 1)) + 1];

  const carModules = import.meta.glob('../assets/car/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const weddingModules = import.meta.glob('../assets/wedding/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const thatuModules = import.meta.glob('../assets/thatu/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const manchalModules = import.meta.glob('../assets/manchalneratuvila/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const nameBoardModules = import.meta.glob('../assets/name-board/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const airCoolerModules = import.meta.glob('../assets/aircoller/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const archModules = import.meta.glob('../assets/arch/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const birthdayModules = import.meta.glob('../assets/birthday/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });

  const dbPortfolioData = dbImages.map((img, index) => ({
    id: `db-${img._id}`,
    category: img.service && img.service !== 'Other' && img.service !== 'Uncategorized' ? img.service : getCategory(index),
    src: img.imageUrl || img.imageBase64,
    thumb: img.imageUrl || img.imageBase64,
    title: img.name,
    amount: 0
  }));

  const createLocalData = (modules, categoryName) => {
    return Object.values(modules).map((src, index) => ({
      id: `local-${categoryName}-${index}`,
      category: categoryName,
      src: src,
      thumb: src,
      title: '',
      amount: 0
    }));
  };

  const localPortfolioData = [
    ...createLocalData(carModules, 'Car Decoration'),
    ...createLocalData(weddingModules, 'Wedding'),
    ...createLocalData(thatuModules, 'Seer Thattu'),
    ...createLocalData(manchalModules, 'Manchal Neeratu Vizha'),
    ...createLocalData(nameBoardModules, 'Welcome Board'),
    ...createLocalData(airCoolerModules, 'Air Cooler Rental'),
    ...createLocalData(archModules, 'Arches'),
    ...createLocalData(birthdayModules, 'Birthday')
  ];

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
        <div className="relative mb-16">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 pb-4 pt-2">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setFilterIndex(index)}
                className={`shrink-0 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-body text-xs sm:text-sm tracking-wider transition-all duration-500 border backdrop-blur-md ${
                  filterIndex === index 
                    ? 'bg-gradient-to-r from-gold to-yellow-600 text-darkPurple font-bold border-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105' 
                    : 'bg-white/5 text-cream/90 hover:text-gold border-white/10 hover:border-gold/50 hover:bg-white/10'
                } ${!showAllCategories && index >= 5 ? 'hidden md:inline-block' : ''}`}
              >
                {t(`portfolio.categories.${cat.toLowerCase().replace(/ /g, '_')}`, cat)}
              </button>
            ))}
            {/* More / Less button - mobile only */}
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="shrink-0 px-4 py-2 rounded-full font-body text-xs tracking-wider border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 md:hidden"
            >
              {showAllCategories ? 'Less ▲' : 'More ▼'}
            </button>
          </div>
        </div>

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
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setFilterIndex(index + 1)}
                  className="group relative cursor-pointer overflow-hidden aspect-[3/4]"
                >
                  {/* Outer decorative border */}
                  <div className="absolute inset-0 rounded-2xl border border-gold/20 group-hover:border-gold/50 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"></div>
                  
                  {/* Inner image area with gap */}
                  <div className="absolute inset-[5px] sm:inset-[6px] rounded-[14px] overflow-hidden">
                    {coverImage ? (
                      <img 
                        src={coverImage} 
                        alt={cat} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-royal/80 to-darkPurple flex items-center justify-center">
                        <span className="text-gold/20 text-5xl">✦</span>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-darkPurple via-darkPurple/50 to-transparent flex flex-col items-center justify-end pb-6 px-3">
                      <h3 className="text-cream font-luxury text-base sm:text-lg font-bold text-center leading-tight drop-shadow-lg">
                        {t(`portfolio.categories.${cat.toLowerCase().replace(/ /g, '_')}`, cat)}
                      </h3>
                      <p className="text-gold/70 font-body text-xs mt-1.5 tracking-wider">
                        {imageCount} {imageCount === 1 ? 'Design' : 'Designs'}
                      </p>
                      {/* Small decorative line */}
                      <div className="w-8 h-px bg-gold/40 mt-2 group-hover:w-16 transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* Corner sparkles on hover */}
                  <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gold/0 group-hover:border-gold/50 rounded-tr-lg transition-all duration-500 pointer-events-none"></div>
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gold/0 group-hover:border-gold/50 rounded-bl-lg transition-all duration-500 pointer-events-none"></div>
                </motion.div>
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
                onClick={() => setFilterIndex(0)}
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
                plugins={[lgZoom, lgThumbnail, lgRotate, lgHash]}
                onInit={(detail) => setLgInstance(detail.instance)}
                onBeforeOpen={() => {
                  window.history.pushState({ lgOpen: true }, '');
                }}
                onBeforeClose={() => {
                  if (window.history.state && window.history.state.lgOpen) {
                    window.history.back();
                  }
                }}
                galleryId={`gallery-${filterIndex}`}
                elementClassNames="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-7 lg:gap-8 space-y-6 sm:space-y-7 lg:space-y-8 relative z-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, index) => (
                    <motion.a
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100 }}
                      key={item.id}
                      href={item.src}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer block break-inside-avoid border border-gold/20 hover:border-gold/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-gradient-to-b from-royal/40 to-darkPurple/60"
                      data-sub-html={`
                        <div class="lg-custom-caption">
                          ${item.title ? `<h4 class="lg-title">${item.title}</h4>` : ''}
                          <p class="lg-category">${t(`portfolio.categories.${item.category.toLowerCase().replace(/ /g, '_')}`, item.category)}</p>
                        </div>
                      `}
                    >
                      {/* Image with inner padding/border */}
                      <div className="p-2 sm:p-2.5">
                        <img 
                          src={item.thumb} 
                          alt={item.category} 
                          className="w-full h-auto object-cover rounded-xl transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      </div>
                      
                      {/* Info bar below image */}
                      <div className="px-4 pb-4 pt-1">
                        {item.title && <p className="text-cream font-luxury text-lg tracking-wider drop-shadow-md truncate">{item.title}</p>}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute top-2 left-2 right-2 sm:top-2.5 sm:left-2.5 sm:right-2.5 bottom-[4.5rem] rounded-xl bg-gradient-to-t from-darkPurple/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-gold border border-gold px-6 py-2 rounded-full font-body text-sm uppercase tracking-wider bg-darkPurple/60 backdrop-blur-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {t('portfolio.view', 'View')}
                        </span>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/0 group-hover:border-gold/40 rounded-tr-2xl transition-all duration-500 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/0 group-hover:border-gold/40 rounded-bl-2xl transition-all duration-500 pointer-events-none"></div>
                    </motion.a>
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
