import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import SEOLandingPage from './pages/SEOLandingPage';

// Components
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Store lenis instance globally so nav links can use it
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      delete window.__lenis;
    };
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        {!isLoading && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* SEO Landing Pages */}
          <Route path="/wedding-decoration-mayiladuthurai" element={<SEOLandingPage type="wedding" />} />
          <Route path="/reception-stage-decoration-mayiladuthurai" element={<SEOLandingPage type="reception" />} />
          <Route path="/birthday-decoration-mayiladuthurai" element={<SEOLandingPage type="birthday" />} />
          <Route path="/floral-decoration-mayiladuthurai" element={<SEOLandingPage type="floral" />} />
          <Route path="/corporate-event-decoration-mayiladuthurai" element={<SEOLandingPage type="corporate" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
