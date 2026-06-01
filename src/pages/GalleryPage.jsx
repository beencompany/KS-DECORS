import { useEffect } from 'react';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-24 bg-darkPurple">
      <Portfolio />
      <Footer />
    </main>
  );
};

export default GalleryPage;
