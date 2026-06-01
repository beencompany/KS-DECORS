import { useEffect } from 'react';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-darkPurple">
      <About />
      <WhyChooseUs />
      <Footer />
    </main>
  );
};

export default AboutPage;
