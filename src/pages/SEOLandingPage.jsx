import SEO from '../components/SEO';
import { motion as framerMotion } from 'framer-motion';

const seoData = {
  wedding: {
    title: 'Best Wedding Decorators in Mayiladuthurai | KS Decors',
    description: 'Looking for luxury wedding decoration in Mayiladuthurai? KS Decors offers premium stage setups, floral designs, and complete A-Z wedding planning services.',
    heading: 'Luxury Wedding Decoration in Mayiladuthurai',
    content: 'At KS Decors, we specialize in creating breathtaking wedding decorations that transform your special day into a royal celebration. From magnificent mandap setups and exquisite entrance arches to personalized stage decor, our expert team in Mayiladuthurai ensures every detail is perfect.'
  },
  reception: {
    title: 'Top Reception Stage Decoration in Mayiladuthurai | KS Decors',
    description: 'KS Decors provides stunning reception stage decorations in Mayiladuthurai. We specialize in modern, traditional, and luxury reception setups.',
    heading: 'Premium Reception Stage Decoration',
    content: 'Make a grand impression on your guests with our customized reception stage decorations. Whether you prefer a modern, minimalist look or a lavish, traditional floral setup, our designers craft the perfect backdrop for your reception in Mayiladuthurai.'
  },
  birthday: {
    title: 'Best Birthday Decoration in Mayiladuthurai | KS Decors',
    description: 'Celebrate in style with KS Decors. We offer premium birthday decorations, theme parties, and balloon decor services in Mayiladuthurai.',
    heading: 'Creative Birthday Party Decorations',
    content: 'From 1st birthday celebrations to grand milestone parties, KS Decors brings your vision to life. We offer a wide range of themes, balloon decorations, and custom setups to make your birthday party in Mayiladuthurai truly memorable.'
  },
  floral: {
    title: 'Premium Floral Decoration in Mayiladuthurai | KS Decors',
    description: 'Expert floral decorators in Mayiladuthurai offering fresh, exotic, and premium floral arrangements for weddings, receptions, and corporate events.',
    heading: 'Exquisite Floral Decorations',
    content: 'Flowers add elegance and charm to any event. Our expert florists at KS Decors use fresh, high-quality, and exotic flowers to create stunning floral arrangements, garlands, and venue decorations for your events in Mayiladuthurai.'
  },
  corporate: {
    title: 'Corporate Event Decoration in Mayiladuthurai | KS Decors',
    description: 'Professional corporate event decoration and management services in Mayiladuthurai. KS Decors handles conferences, product launches, and annual meets.',
    heading: 'Professional Corporate Event Decoration',
    content: 'Impress your clients and employees with our professional corporate event setups. KS Decors provides elegant staging, lighting, and branding decorations for conferences, product launches, and corporate gatherings in Mayiladuthurai.'
  }
};

const SEOLandingPage = ({ type }) => {
  const data = seoData[type];
  const url = `https://ksdecorofficial.dpdns.org/${type === 'wedding' ? 'wedding' : type === 'reception' ? 'reception-stage' : type === 'birthday' ? 'birthday' : type === 'floral' ? 'floral' : 'corporate-event'}-decoration-mayiladuthurai`;

  return (
    <>
      <SEO 
        title={data.title}
        description={data.description}
        url={url}
      />
      <div className="pt-24 pb-16 min-h-[60vh] flex flex-col items-center justify-center bg-royal relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 z-10 text-center max-w-4xl">
          <framerMotion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-luxury text-cream mb-6"
          >
            {data.heading}
          </framerMotion.h1>
          
          <framerMotion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-cream/80 font-body mb-8 leading-relaxed"
          >
            {data.content}
          </framerMotion.p>

          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="/contact" 
              className="inline-block bg-gold text-royal px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gold/90 transition-colors"
            >
              Book Now
            </a>
          </framerMotion.div>
        </div>
      </div>
    </>
  );
};

export default SEOLandingPage;
