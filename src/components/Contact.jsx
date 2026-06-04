import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Contact = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: FaPhoneAlt,
      label: t('contact.call_us', 'Call Us'),
      lines: [
        { text: '+91 63839 75747', href: 'tel:+916383975747' },
        { text: '+91 90804 67974', href: 'tel:+919080467974' },
      ],
    },
    {
      icon: FaEnvelope,
      label: t('contact.email', 'Email'),
      lines: [
        { text: 'vignesh2000vd@gmail.com', href: 'mailto:vignesh2000vd@gmail.com' },
      ],
    },
    {
      icon: FaMapMarkerAlt,
      label: t('contact.visit_us', 'Visit Us'),
      lines: [
        { text: t('contact.location', 'Mayiladuthurai, Tamil Nadu') },
      ],
    },
  ];

  return (
    <section id="contact" className="py-24 bg-royal relative overflow-hidden">

      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating gold sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center"
          >
            <FaPhoneAlt className="text-gold text-xl" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gold font-body uppercase tracking-widest text-sm mb-2"
          >
            {t('contact.subtitle', 'Get In Touch')}
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-luxury text-cream font-bold mb-4"
          >
            {t('contact.title1', "Let's Create")} <span className="text-gradient">{t('contact.title2', 'Magic Together')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/70 font-body max-w-lg mx-auto"
          >
            {t('contact.desc', 'Ready to transform your dream event into reality? Reach out to us today.')}
          </motion.p>
        </div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow effect behind card */}
                <div className="absolute inset-0 bg-gold/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative glass p-8 rounded-2xl text-center border border-gold/10 group-hover:border-gold/40 transition-all duration-500 h-full">

                  {/* Animated icon circle */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-shadow duration-500"
                  >
                    <Icon className="text-gold text-xl group-hover:text-lightGold transition-colors duration-300" />
                  </motion.div>

                  {/* Label */}
                  <h4 className="text-lg font-luxury text-gold font-bold mb-3 tracking-wider uppercase">
                    {item.label}
                  </h4>

                  {/* Decorative line */}
                  <div className="w-8 h-[2px] bg-gold/30 mx-auto mb-4 group-hover:w-16 transition-all duration-500" />

                  {/* Content lines */}
                  <div className="space-y-1.5">
                    {item.lines.map((line, i) => (
                      line.href ? (
                        <a
                          key={i}
                          href={line.href}
                          className="block text-cream/80 font-body text-sm hover:text-gold transition-colors duration-300 break-all"
                        >
                          {line.text}
                        </a>
                      ) : (
                        <p key={i} className="text-cream/80 font-body text-sm">
                          {line.text}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/916383975747"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-full font-body font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] relative overflow-hidden group"
          >
            <FaWhatsapp className="text-2xl relative z-10" />
            <span className="relative z-10 tracking-wide">{t('contact.whatsapp', 'Chat on WhatsApp')}</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </motion.a>

          {/* Instagram Button */}
          <motion.a
            href="https://www.instagram.com/ks._.decors_/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 border-2 border-gold text-gold hover:bg-gold hover:text-darkPurple px-8 py-4 rounded-full font-body font-bold transition-all duration-300 relative overflow-hidden group"
          >
            <FaInstagram className="text-2xl relative z-10" />
            <span className="relative z-10 tracking-wide">{t('contact.instagram', 'Follow on Instagram')}</span>
          </motion.a>
        </motion.div>

        {/* Bottom decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-[1px] max-w-md mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </div>
    </section>
  );
};

export default Contact;
