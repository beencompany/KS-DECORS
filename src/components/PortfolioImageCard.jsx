import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PortfolioImageCard = ({ item, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100 }}
      id={item.id}
      data-src={item.src}
      onClick={() => {
        if (window.location.hash !== '#viewing') {
          window.location.hash = 'viewing';
        }
      }}
      className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer block break-inside-avoid border border-gold/20 hover:border-gold/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-gradient-to-b from-royal/40 to-darkPurple/60"
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
      <div className="px-4 pb-4 pt-1 flex justify-between items-center gap-2">
        {item.title && <p className="text-cream font-luxury text-lg tracking-wider drop-shadow-md truncate flex-1">{item.title}</p>}
        
        {/* Download button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const link = document.createElement('a');
            link.href = item.src;
            link.download = item.title ? `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg` : 'KS_Decor.jpg';
            link.target = '_blank';
            
            // Must be appended to body for Firefox/Mobile support
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="bg-gold/20 hover:bg-gold text-gold hover:text-darkPurple p-2 rounded-full transition-colors z-20 flex-shrink-0"
          title="Download Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
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
    </motion.div>
  );
};

export default PortfolioImageCard;
