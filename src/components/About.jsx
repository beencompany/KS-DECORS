import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import aboutBg from '../assets/images/about_image_generated.png';

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 bg-darkPurple relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <div className="aspect-[4/5] bg-royal relative">
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold z-20"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold z-20"></div>
                
                {/* Image Placeholder - Replace src with actual image */}
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${aboutBg}")` }}
                >
                  <div className="absolute inset-0 bg-darkPurple/20"></div>
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-gold/20 rounded-2xl -z-10"></div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-gold font-body uppercase tracking-widest text-sm mb-2">{t('about.subtitle')}</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-luxury text-cream font-bold mb-6 break-words">
                {t('about.title1')} <span className="text-gradient">{t('about.title2')}</span>
              </h2>
              
              <div className="space-y-4 text-cream/80 font-body text-lg mb-8">
                <p>{t('about.desc1')}</p>
                <p>{t('about.desc2')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t('about.services', { returnObjects: true }).map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span className="text-cream font-body">{service}</span>
                  </div>
                ))}
              </div>

            <motion.div
              whileHover={{ scale: 1.05, x: 10 }}
              className="inline-block pt-8"
            >
              <Link
                to="/services"
                className="text-gold font-luxury text-xl border-b border-gold pb-1 hover:text-lightGold transition-colors"
              >
                {t('about.cta')}
              </Link>
            </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
