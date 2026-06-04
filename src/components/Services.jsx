import { motion } from 'framer-motion';
import { GiDiamondRing, GiBalloons, GiFlowers, GiTie } from 'react-icons/gi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Static accent colors and icons
const serviceConfig = [
  { IconComponent: GiDiamondRing, accent: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent" },
  { IconComponent: GiBalloons, accent: "from-[#F6E27A]/20 via-[#F6E27A]/5 to-transparent" },
  { IconComponent: GiTie, accent: "from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent" },
  { IconComponent: GiFlowers, accent: "from-[#F6E27A]/20 via-[#F6E27A]/5 to-transparent" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.IconComponent;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative cursor-pointer"
    >
      {/* Background glow */}
      <motion.div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-gold/20 to-transparent blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative glass rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-500 h-full">

        {/* Top gradient accent bar */}
        <motion.div
          className={`h-1 w-full bg-gradient-to-r ${service.accent}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        <div className="relative z-10 p-8 flex flex-col items-center text-center">

          {/* Animated icon container */}
          <motion.div
            animate={isHovered ? { rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative mb-6"
          >
            {/* Rotating ring behind icon */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ width: '80px', height: '80px', top: '-8px', left: '-8px' }}
            />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-darkPurple/50 border border-gold/30 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow duration-500">
              <Icon className="text-3xl text-gold group-hover:text-lightGold transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Title */}
          <h4 className="text-2xl font-luxury text-cream mb-1 font-bold tracking-wide">
            {service.title}
          </h4>

          {/* Tagline */}
          <p className="text-cream/50 font-body text-xs italic mb-5 tracking-wider">
            {service.tagline}
          </p>

          {/* Decorative separator */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-[1px] bg-gold/30 group-hover:w-10 transition-all duration-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors duration-500" />
            <div className="w-6 h-[1px] bg-gold/30 group-hover:w-10 transition-all duration-500" />
          </div>

          {/* Service items */}
          <ul className="space-y-2.5 w-full">
            {service.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 + index * 0.1 }}
                className="flex items-center gap-3 text-cream/70 font-body text-sm group-hover:text-cream/90 transition-colors duration-300"
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold shrink-0 transition-colors duration-300"
                  whileHover={{ scale: 2 }}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Bottom CTA hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-4 border-t border-gold/10 w-full"
          >
            <Link
              to="/contact"
              className="text-gold font-body text-xs uppercase tracking-[0.2em] hover:text-lightGold transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {service.bookNow}
              <motion.span
                animate={isHovered ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  
  // Get translated service items array, fallback to default objects if not found
  const translatedItems = t('services.items', { returnObjects: true });
  const defaultItems = [
    { title: "Wedding Decor", tagline: "Your dream wedding, our masterpiece", list: ["Mandap Decoration", "Flower Decoration", "Reception Setup", "Entry Arch Design", "Luxury Stage Design"] },
    { title: "Birthday Decor", tagline: "Make every birthday unforgettable", list: ["Balloon Decoration", "Kids Theme Setup", "Customized Concepts", "Photo Booths", "Dessert Table Setup"] },
    { title: "Corporate Events", tagline: "Impress your guests with elegance", list: ["Conferences", "Product Launches", "Business Meetings", "Gala Dinners", "Award Ceremonies"] },
    { title: "Floral Decor", tagline: "Nature's beauty in every petal", list: ["Fresh Flowers", "Premium Floral Designs", "Stage Floral Setup", "Table Centerpieces", "Bridal Bouquets"] }
  ];
  
  const itemsToUse = Array.isArray(translatedItems) ? translatedItems : defaultItems;

  const servicesData = serviceConfig.map((config, index) => ({
    ...config,
    title: itemsToUse[index]?.title || defaultItems[index].title,
    tagline: itemsToUse[index]?.tagline || defaultItems[index].tagline,
    items: itemsToUse[index]?.list || defaultItems[index].list,
    bookNow: t('services.book_now', 'Book Now')
  }));

  return (
    <section id="services" className="py-24 bg-royal relative overflow-hidden">

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center"
          >
            <span className="text-gold text-2xl">✦</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gold font-body uppercase tracking-[0.3em] text-sm mb-3"
          >
            {t('services.subtitle', 'What We Do')}
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-luxury text-cream font-bold mb-4"
          >
            {t('services.title1', 'Our')} <span className="text-gradient">{t('services.title2', 'Premium')}</span> {t('services.title3', 'Services')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/60 font-body max-w-lg mx-auto text-lg"
          >
            {t('services.desc', 'Elevating every celebration with royal elegance and timeless charm')}
          </motion.p>

          {/* Decorative line under heading */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-[1px] max-w-xs mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />
        </div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
