import React, { useEffect, useState, useRef } from 'react';
import { useMetrics } from '../../hooks/useMetrics';

const ImpactSnapshot = () => {

  const [_isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger only once
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const { activeChampions: _activeChampions, referralConversionRate, trainingComplianceRate, loading } = useMetrics();

  // Temporarily hide active champions until a later update
  const stats = [
    { number: `${referralConversionRate.toFixed(1)}%`, label: "Referral Conversion Rate", color: "bg-[#00C2CB]", glow: "shadow-[#00C2CB]/20" },
    { number: `${trainingComplianceRate.toFixed(1)}%`, label: "Training Compliance Rate", color: "bg-[#00C2CB]", glow: "shadow-[#00C2CB]/20" },
  ];

  return(
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8">
          {loading ? (
            <div className="text-center w-full py-12 text-[#0B1E3B] font-bold">Loading metrics...</div>
          ) : (
            stats.map((stat, index) => (
              <div key={index}
                className={`flex-1 min-w-[280px] max-w-[360px] p-12 ${stat.color} rounded-[2.5rem] text-center shadow-2xl ${stat.glow} transition-all duration-500 hover:-translate-y-3`}
              >
                <h3 className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.number}</h3>
                <p className="text-white/70 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactSnapshot;