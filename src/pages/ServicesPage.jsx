import { useEffect } from 'react';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-royal">
      <Services />
      <Footer />
    </main>
  );
};

export default ServicesPage;
