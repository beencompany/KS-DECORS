import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Dynamically import all images from the ref folder
const imagesContext = import.meta.glob('../assets/ref/*.{png,jpg,jpeg}', { eager: true });
const referralImages = Object.values(imagesContext).map((module) => module.default);

const WhatsappReviews = () => {
  const { t } = useTranslation();

  return (
    <section id="whatsapp-reviews" className="py-24 bg-darkPurple relative overflow-hidden">
      
      <style>
        {`
          .referral-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}
      </style>

      {/* Decorative Background */}
      <motion.div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#25D366]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#25D366] font-body uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-lg" /> {t('whatsapp.subtitle', 'Real Client Love')}
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-luxury text-cream font-bold mb-4 break-words px-2"
          >
            {t('whatsapp.title1', 'Client')} <span className="text-[#25D366]">{t('whatsapp.title2', 'Messages')}</span>
          </motion.h2>
        </div>

        {/* Scrolling Referral Images Marquee */}
        {referralImages.length > 0 && (
          <div className="mb-20 overflow-hidden relative py-4">
            {/* Gradient masks for smooth fading edges */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-darkPurple to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-darkPurple to-transparent pointer-events-none" />
            
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
              speed={4000}
              loop={true}
              slidesPerView="auto"
              spaceBetween={16}
              className="referral-swiper"
              grabCursor={true}
            >
              {[...referralImages, ...referralImages].map((img, index) => (
                <SwiperSlide key={index} style={{ width: 'auto' }}>
                  <div 
                    className="w-32 md:w-40 shrink-0 rounded-2xl border-[3px] border-gold/80 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:border-gold transition-all duration-500 overflow-hidden transform hover:-translate-y-2 mt-4 mb-8 mx-1"
                  >
                    <img 
                      src={img} 
                      alt={`Client Referral ${index}`} 
                      className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500 pointer-events-none" 
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>
    </section>
  );
};

export default WhatsappReviews;
