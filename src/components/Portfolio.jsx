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

const Portfolio = () => {
  const { t } = useTranslation();
  const [filterIndex, setFilterIndex] = useState(0);
  const [dbImages, setDbImages] = useState([]);

  const translatedCategories = t('portfolio.categories', { returnObjects: true });
  const categories = Array.isArray(translatedCategories) 
    ? translatedCategories 
    : ['All', 'Wedding', 'Reception', 'Birthday', 'Corporate', 'Stage', 'Floral'];

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

  const imageModules = import.meta.glob('../assets/images/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
  const imagePaths = Object.values(imageModules);
  
  const getCategory = (index) => categories[(index % (categories.length - 1)) + 1];

  const dbPortfolioData = dbImages.map((img, index) => ({
    id: `db-${img._id}`,
    category: getCategory(index), // Assign alternating categories for now
    src: img.imageBase64,
    thumb: img.imageBase64,
    title: img.name
  }));

  const localPortfolioData = imagePaths.map((src, index) => ({
    id: index + 1,
    category: getCategory(index + dbImages.length),
    src: src,
    thumb: src,
    title: 'KS Decors'
  }));

  const portfolioData = [...dbPortfolioData, ...localPortfolioData];

  const filteredData = filterIndex === 0 
    ? portfolioData 
    : portfolioData.filter(item => item.category === categories[filterIndex]);

  return (
    <section id="gallery" className="py-24 bg-darkPurple">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-12">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-body uppercase tracking-widest text-sm mb-2"
          >
            {t('portfolio.subtitle', 'Our Masterpieces')}
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-luxury text-cream font-bold"
          >
            {t('portfolio.title', 'Premium Portfolio Gallery')}
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setFilterIndex(index)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-body text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                filterIndex === index 
                  ? 'bg-gold text-darkPurple font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-royal text-cream hover:text-gold border border-royal hover:border-gold/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <LightGallery
          speed={500}
          plugins={[lgZoom, lgThumbnail, lgRotate]}
          elementClassNames="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
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
                className="group relative overflow-hidden rounded-xl cursor-pointer block border-2 border-transparent hover:border-gold/50 transition-colors break-inside-avoid"
              >
                <img 
                  src={item.thumb} 
                  alt={item.category} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-darkPurple/90 via-darkPurple/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end md:justify-center pb-6 md:pb-0">
                  <span className="text-gold border border-gold px-6 py-2 rounded-full font-body text-sm uppercase tracking-wider translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 bg-darkPurple/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none mb-2 md:mb-0">
                    {t('portfolio.view', 'View')}
                  </span>
                  <p className="text-cream mt-1 md:mt-3 font-luxury text-xl tracking-wider drop-shadow-md">{item.category}</p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </LightGallery>

      </div>
    </section>
  );
};

export default Portfolio;
