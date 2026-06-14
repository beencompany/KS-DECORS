import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Portfolio from '../components/Portfolio';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import WhatsappReviews from '../components/WhatsappReviews';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Home = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KS Decors",
    "image": "https://ksdecorofficial.dpdns.org/favicon.png",
    "url": "https://ksdecorofficial.dpdns.org/",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mayiladuthurai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "description": "Premium luxury wedding and event decorators in Mayiladuthurai.",
    "priceRange": "$$"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who are the best event decorators in Mayiladuthurai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "KS Decors is widely recognized as the best premium event and wedding decorator in Mayiladuthurai, offering luxury stage designs, floral arrangements, and complete event management services."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide luxury wedding planners services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are top luxury wedding planners offering A-to-Z decoration services, including mandap decor, reception setup, entrance arches, and premium floral designs."
        }
      },
      {
        "@type": "Question",
        "name": "What types of events do you decorate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in luxury weddings, corporate event setups, birthday party decorations, bridal showers, baby showers, and all milestone celebrations."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer premium floral decors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our expert florists create stunning, premium floral decors using fresh, exotic flowers tailored to your theme and preferences."
        }
      }
    ]
  };

  const hasPushedHistory = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        hasPushedHistory.current = false;
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const sections = [
      { id: 'home', path: '/' },
      { id: 'about', path: '/about' },
      { id: 'gallery', path: '/gallery' },
      { id: 'services', path: '/services' },
      { id: 'testimonials', path: '/testimonials' },
      { id: 'contact', path: '/contact' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // 20% vertical intersection band, robust for mobile toolbars
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id);
          if (section) {
            if (window.location.pathname !== section.path) {
              if (window.location.pathname === '/' && !hasPushedHistory.current) {
                // Moving away from home for the first time, create a back entry
                window.history.pushState(null, '', section.path);
                hasPushedHistory.current = true;
              } else {
                window.history.replaceState(null, '', section.path);
              }
              window.dispatchEvent(new CustomEvent('scroll-route-changed', { detail: section.path }));
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <SEO 
        title="Best Wedding Decorators in Mayiladuthurai | KS Decors"
        description="KS Decors is the premier wedding decorators in Mayiladuthurai. We provide luxury wedding decoration, reception stage decoration, birthday decoration, floral decoration, and event decoration."
        url="https://ksdecorofficial.dpdns.org/"
        schema={[localBusinessSchema, faqSchema]}
      />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <WhyChooseUs />
      <Stats />
      <Timeline />
      <Testimonials />
      <WhatsappReviews />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
