import { useEffect } from 'react';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-darkPurple">
      <Testimonials />
      <Footer />
    </main>
  );
};

export default TestimonialsPage;
