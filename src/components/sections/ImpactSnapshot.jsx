import React, { useEffect, useState, useRef } from 'react';

const ImpactSnapshot = () => {

  const [isVisible, setIsVisible] = useState(false);
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
  
  const stats = [
    { number: "50,000", label: "Young People Reached", color: "bg-unda-navy", color: "bg-unda-navy",glow: "shadow-unda-navy/20" },
    { number: "5000", label: "Preventive Services", color: "bg-unda-orange", color: "bg-unda-orange",glow: "shadow-unda-orange/20" },
    { number: "100+", label: "Multi-sector Partnerships", color: "bg-unda-teal",color: "bg-unda-teal" , glow: "shadow-unda-teal/20" }, 
  ];

  return(
    <section className = "py-24 bg-white">
      <div className = "container mx-auto px-6">
        <div className = "flex flex-wrap justify-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} 
              className={`flex-1 min-w-[280px] max-w-[360px] p-12 ${stat.color} rounded-[2.5rem] text-center shadow-2xl ${stat.glow} transition-all duration-500 hover:-translate-y-3`}
              >
                <h3 className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.number}</h3>
                <p className="text-white/70 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ImpactSnapshot;