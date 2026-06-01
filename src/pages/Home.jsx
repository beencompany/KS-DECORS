import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Stats from '../components/Stats';
import Portfolio from '../components/Portfolio';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Stats />
      <Portfolio />
      <Timeline />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
