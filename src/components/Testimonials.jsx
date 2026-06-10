import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();
  const defaultReviews = [
    { text: "KS Decors transformed our wedding into a royal celebration. Every detail was perfect and exceeded our expectations.", name: "Priya & Rahul", type: "Wedding Event" },
    { text: "They made my daughter's birthday magical. The theme setup was exactly what we envisioned. Thank you KS Decors!", name: "Anita M.", type: "Birthday Party" }
  ];

  const translatedReviews = t('testimonials.reviews', { returnObjects: true });
  const reviews = Array.isArray(translatedReviews) ? translatedReviews : defaultReviews;

  return (
    <section id="testimonials" className="py-24 bg-darkPurple relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
        
        <h3 className="text-gold font-body uppercase tracking-widest text-sm mb-2">
          {t('testimonials.subtitle', 'Client Feedback')}
        </h3>
        <h2 className="text-4xl md:text-5xl font-luxury text-cream font-bold mb-16">
          {t('testimonials.title', 'Testimonials')}
        </h2>

        <div className="glass p-6 md:p-12 rounded-3xl relative">
          <FaQuoteLeft className="text-3xl md:text-4xl text-gold/30 absolute top-6 left-6 md:top-8 md:left-8" />
          
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-testimonial-pagination' }}
            loop={true}
            className="testimonial-swiper mt-6 md:mt-0"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <div className="flex gap-1 text-gold mb-4 md:mb-6 text-xl">
                    ★★★★★
                  </div>
                  <p className="text-lg md:text-2xl font-luxury text-cream italic leading-relaxed mb-6 md:mb-8 max-w-2xl px-2">
                    "{review.text}"
                  </p>
                  <h4 className="text-gold font-body font-bold text-lg tracking-wider uppercase">
                    - {review.name}
                  </h4>
                  <p className="text-cream/60 font-body text-sm mt-1">
                    {review.type}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Pagination Container outside the box */}
        <div 
          className="custom-testimonial-pagination mt-8 flex justify-center gap-2"
          style={{
            '--swiper-pagination-color': '#D4AF37',
            '--swiper-pagination-bullet-inactive-color': '#D4AF37',
            '--swiper-pagination-bullet-inactive-opacity': '0.3',
            position: 'relative',
            bottom: 'auto'
          }}
        ></div>

      </div>
    </section>
  );
};

export default Testimonials;
