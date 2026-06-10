import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaCheckDouble } from 'react-icons/fa';

// Dynamically import all images from the ref folder
const imagesContext = import.meta.glob('../assets/ref/*.{png,jpg,jpeg}', { eager: true });
const referralImages = Object.values(imagesContext).map((module) => module.default);

const WhatsappReviews = () => {
  const { t } = useTranslation();

  const translatedChats = t('whatsapp.chats', { returnObjects: true });
  const defaultChats = [
    { time: "10:45 AM", message: "Hi Vignesh! Just wanted to say a huge thank you for the amazing wedding stage decoration. Everyone loved the premium floral setup! You are definitely the best decorators in Mayiladuthurai. 🙌✨" },
    { time: "02:30 PM", message: "The corporate event setup was flawless. Very professional and luxury finish. Looking forward to booking you again!" },
    { time: "06:15 PM", message: "Thanks for the magical birthday decor for my daughter! The balloon arch and dessert table were stunning. ❤️🎂" }
  ];

  const chats = Array.isArray(translatedChats) ? translatedChats : defaultChats;

  return (
    <section id="whatsapp-reviews" className="py-24 bg-darkPurple relative overflow-hidden">
      
      {/* Inline styles for scrolling animation */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-left {
            display: flex;
            width: fit-content;
            animation: scroll-left 20s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
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
            className="text-4xl md:text-5xl font-luxury text-cream font-bold mb-4"
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
            
            <div className="animate-scroll-left gap-4 pl-4 items-center">
              {/* Duplicate array for seamless infinite scroll */}
              {[...referralImages, ...referralImages].map((img, index) => (
                <div 
                  key={index} 
                  className="w-32 md:w-40 shrink-0 rounded-2xl border-[3px] border-gold/80 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:border-gold transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2"
                >
                  <img 
                    src={img} 
                    alt={`Client Referral ${index}`} 
                    className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default WhatsappReviews;
