import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith('ta') ? 'en' : 'ta';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.about', 'About'), path: '/about' },
    { name: t('nav.services', 'Services'), path: '/services' },
    { name: t('nav.gallery', 'Gallery'), path: '/gallery' },
    { name: t('nav.testimonials', 'Testimonials'), path: '/testimonials' },
    { name: t('nav.contact', 'Contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === path && path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-darkPurple/90 backdrop-blur-md shadow-lg shadow-royal/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="text-2xl md:text-3xl font-luxury text-gradient font-bold tracking-wider"
        >
          KS DECORS
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (location.pathname === '/' && link.path === '/');
            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`transition-colors font-body text-sm uppercase tracking-wider relative group ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-cream hover:text-gold'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            );
          })}

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 border border-gold/50 rounded-full px-3 py-1 text-sm font-body text-cream hover:bg-gold/10 transition-colors"
          >
            <span className={!i18n.language?.startsWith('ta') ? "text-gold font-bold" : ""}>EN</span>
            <span className="text-gold/50">|</span>
            <span className={i18n.language?.startsWith('ta') ? "text-gold font-bold" : ""}>TA</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 border border-gold/50 rounded-full px-2 py-0.5 text-xs font-body text-cream hover:bg-gold/10 transition-colors"
          >
            <span className={!i18n.language?.startsWith('ta') ? "text-gold font-bold" : ""}>EN</span>
            <span className="text-gold/50">|</span>
            <span className={i18n.language?.startsWith('ta') ? "text-gold font-bold" : ""}>TA</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gold text-3xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-royal/95 backdrop-blur-xl border-t border-gold/20"
            >
              <div className="flex flex-col items-center py-8 space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`transition-colors font-luxury text-xl tracking-wider ${
                      location.pathname === link.path
                        ? 'text-gold'
                        : 'text-cream hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
