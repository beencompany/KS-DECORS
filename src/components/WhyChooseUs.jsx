import { motion } from 'framer-motion';
import { FaCrown, FaUserTie, FaGem, FaClock, FaTags, FaHeart } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Creative Designs",
      desc: "Unique luxury decoration concepts.",
      icon: <FaCrown />
    },
    {
      title: "Experienced Team",
      desc: "Professional event execution.",
      icon: <FaUserTie />
    },
    {
      title: "Premium Quality",
      desc: "High-quality decoration materials.",
      icon: <FaGem />
    },
    {
      title: "Timely Delivery",
      desc: "Perfect execution on schedule.",
      icon: <FaClock />
    },
    {
      title: "Affordable Luxury",
      desc: "Luxury decoration at reasonable prices.",
      icon: <FaTags />
    },
    {
      title: "Customer Satisfaction",
      desc: "Client-first approach always.",
      icon: <FaHeart />
    }
  ];

  return (
    <section className="py-24 bg-darkPurple relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/3">
            <motion.h3 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold font-body uppercase tracking-widest text-sm mb-2"
            >
              Why Choose KS Decors
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-luxury text-cream font-bold leading-tight mb-6"
            >
              Excellence in Every <span className="text-gradient">Detail</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-cream/80 font-body text-lg mb-8"
            >
              We don't just decorate venues; we create immersive environments that leave lasting impressions. Our commitment to luxury and perfection sets us apart.
            </motion.p>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-4 items-start bg-royal/30 p-6 rounded-xl border border-royal hover:border-gold/30 transition-colors duration-300 group"
                >
                  <div className="text-3xl text-gold group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-luxury text-cream font-bold mb-1">{feature.title}</h4>
                    <p className="text-cream/60 font-body text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default WhyChooseUs;
