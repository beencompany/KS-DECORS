import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PortfolioCategoryCard = ({ cat, index, coverImage, imageCount, onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
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
};

export default PortfolioCategoryCard;
