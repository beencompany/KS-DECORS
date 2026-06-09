import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/images/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  
  const footerLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.about', 'About'), path: '/about' },
    { name: t('nav.services', 'Services'), path: '/services' },
    { name: t('nav.gallery', 'Gallery'), path: '/gallery' },
    { name: t('nav.testimonials', 'Testimonials'), path: '/testimonials' },
    { name: t('nav.contact', 'Contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-darkPurple border-t border-gold/20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-12">
          
          {/* Left */}
          <div>
            <Link
              to="/"
              className="inline-block hover:opacity-80 transition-opacity cursor-pointer mb-4"
            >
              <img src={logoImg} alt="KS Decors Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-md mx-auto md:mx-0" />
            </Link>
            <p className="text-cream/70 font-body text-sm tracking-widest uppercase mt-4">
              {t('footer.subtitle', 'We Decorate Your Dreams')}
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-luxury text-cream mb-6">{t('footer.quick_links', 'Quick Links')}</h4>
            <div className="flex flex-col space-y-3 font-body text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-cream/70 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-luxury text-cream mb-6">{t('footer.follow_us', 'Follow Us')}</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ks._.decors_/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-royal flex items-center justify-center text-cream hover:bg-gold hover:text-darkPurple transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-royal flex items-center justify-center text-cream hover:bg-gold hover:text-darkPurple transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://wa.me/916383975747" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-royal flex items-center justify-center text-cream hover:bg-gold hover:text-darkPurple transition-colors">
                <FaWhatsapp />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-royal flex items-center justify-center text-cream hover:bg-gold hover:text-darkPurple transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gold/10 pt-8 text-center">
          <p className="text-cream/50 font-body text-sm">
            &copy; {new Date().getFullYear()} {t('footer.rights', 'KS Decors. All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
