import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = ({ end, duration, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span>{count}</span>;
};

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const statsData = [
    { num: 500, suffix: "+", title: "Events Completed" },
    { num: 200, suffix: "+", title: "Happy Clients" },
    { num: 10, suffix: "+", title: "Years Experience" },
    { num: 50, suffix: "+", title: "Corporate Events" },
  ];

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop')"
        }}
      />
      <div className="absolute inset-0 z-0 bg-royal/80 backdrop-blur-sm" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-3xl sm:text-4xl md:text-6xl font-luxury text-gold font-bold mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
                <Counter end={stat.num} duration={2.5} inView={inView} />
                {stat.suffix}
              </div>
              <p className="text-cream font-body text-sm md:text-base uppercase tracking-widest">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
