import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="py-24 bg-darkPurple relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <div className="aspect-[4/5] bg-royal relative">
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold"></div>
                
                {/* Image Placeholder - Replace src with actual image */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center">
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
              <h3 className="text-gold font-body uppercase tracking-widest text-sm mb-2">About KS Decors</h3>
              <h2 className="text-4xl md:text-5xl font-luxury text-cream font-bold mb-6">
                We Decorate Your <span className="text-gradient">Dreams</span>
              </h2>
              
              <div className="space-y-4 text-cream/80 font-body text-lg mb-8">
                <p>
                  With years of experience in the event decoration industry, KS Decors has established itself as a premier luxury decoration company in Mayiladuthurai and beyond.
                </p>
                <p>
                  Our founder, Vignesh, started with a simple vision: to transform ordinary spaces into extraordinary royal experiences. Today, we specialize in creating breathtaking environments for weddings, corporate events, and milestone celebrations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Wedding Decorations",
                  "Stage Decorations",
                  "Birthday Decorations",
                  "Corporate Events",
                  "Floral Arrangements",
                  "Theme Parties"
                ].map((service, index) => (
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
                Discover Our Services ⟶
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
