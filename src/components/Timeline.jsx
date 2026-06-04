import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { t } = useTranslation();
  const defaultSteps = [
    { title: "Consultation", desc: "Understanding your vision and requirements." },
    { title: "Planning", desc: "Creating a detailed blueprint and concept." },
    { title: "Design Approval", desc: "Reviewing and finalizing the luxury designs." },
    { title: "Execution", desc: "Flawless setup by our experienced team." },
    { title: "Successful Event", desc: "Delivering an unforgettable royal experience." },
  ];
  const translatedSteps = t('timeline.steps', { returnObjects: true });
  const steps = Array.isArray(translatedSteps) ? translatedSteps : defaultSteps;

  return (
    <section className="py-24 bg-royal relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury text-cream font-bold mb-4">
            {t('timeline.title', 'Our Process')}
          </h2>
          <p className="text-cream/80 font-body">{t('timeline.subtitle', 'From concept to a successful royal event.')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-darkPurple transform md:-translate-x-1/2 rounded-full">
              <motion.div 
                className="absolute top-0 w-full bg-gold rounded-full"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start md:items-center md:justify-between flex-col md:flex-row">
                  
                  {/* Left Side (Empty for odd, Content for even) */}
                  <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:order-2 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="glass p-6 rounded-xl hover:border-gold/50 transition-colors w-full"
                    >
                      <h4 className="text-xl font-luxury text-gold font-bold mb-2">{t('timeline.step', 'Step')} {index + 1}: {step.title}</h4>
                      <p className="text-cream/80 font-body text-sm">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.4 }}
                    className="absolute left-4 top-8 md:top-auto md:left-1/2 w-6 h-6 bg-gold rounded-full border-4 border-royal transform -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                  />

                  {/* Right Side (Empty to maintain flex layout) */}
                  <div className="w-full md:w-[45%] hidden md:block" />

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
