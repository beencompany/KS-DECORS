import { useTranslation } from 'react-i18next';

const PortfolioFilters = ({ categories, filterIndex, handleFilterChange, showAllCategories, setShowAllCategories }) => {
  const { t } = useTranslation();

  return (
    <div className="relative mb-16">
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 pb-4 pt-2">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(index)}
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
  );
};

export default PortfolioFilters;
