import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Wedding', 'Reception', 'Birthday', 'Corporate', 'Stage', 'Floral'];

  const portfolioData = [
    { id: 1, category: 'Wedding', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop' },
    { id: 2, category: 'Stage', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop' },
    { id: 3, category: 'Floral', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop' },
    { id: 4, category: 'Birthday', src: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa0?q=80&w=1000&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa0?q=80&w=400&auto=format&fit=crop' },
    { id: 5, category: 'Corporate', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400&auto=format&fit=crop' },
    { id: 6, category: 'Reception', src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=400&auto=format&fit=crop' },
  ];

  const filteredData = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

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
            Our Masterpieces
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-luxury text-cream font-bold"
          >
            Premium Portfolio Gallery
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-body text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                filter === cat 
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
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                href={item.src}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer block border-2 border-transparent hover:border-gold/50 transition-colors"
              >
                <img 
                  src={item.thumb} 
                  alt={item.category} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-darkPurple/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <span className="text-gold border border-gold px-6 py-2 rounded-full font-body text-sm uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View
                  </span>
                  <p className="text-cream mt-3 font-luxury text-xl tracking-wider">{item.category}</p>
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
