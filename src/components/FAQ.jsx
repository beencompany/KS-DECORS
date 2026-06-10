import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const translatedFaqs = t('faq.items', { returnObjects: true });
  const defaultFaqs = [
    { question: "Who are the best event decorators in Mayiladuthurai?", answer: "KS Decors is widely recognized as the best premium event and wedding decorator in Mayiladuthurai, offering luxury stage designs, floral arrangements, and complete event management services." },
    { question: "Do you provide luxury wedding planners services?", answer: "Yes, we are top luxury wedding planners offering A-to-Z decoration services, including mandap decor, reception setup, entrance arches, and premium floral designs." },
    { question: "What types of events do you decorate?", answer: "We specialize in luxury weddings, corporate event setups, birthday party decorations, bridal showers, baby showers, and all milestone celebrations." },
    { question: "Do you offer premium floral decors?", answer: "Absolutely! Our expert florists create stunning, premium floral decors using fresh, exotic flowers tailored to your theme and preferences." }
  ];

  const faqs = Array.isArray(translatedFaqs) ? translatedFaqs : defaultFaqs;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-royal relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gold font-body uppercase tracking-widest text-sm mb-2"
          >
            {t('faq.subtitle', 'Common Questions')}
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-luxury text-cream font-bold mb-4"
          >
            {t('faq.title1', 'Frequently Asked')} <span className="text-gradient">{t('faq.title2', 'Questions')}</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass border border-gold/20 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg md:text-xl font-luxury text-cream font-bold pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0"
                >
                  <FaChevronDown className="text-gold text-sm" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-cream/70 font-body border-t border-gold/10 mt-2">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
