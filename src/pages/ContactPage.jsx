import { useEffect } from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-royal">
      <Contact />
      <Footer />
    </main>
  );
};

export default ContactPage;
