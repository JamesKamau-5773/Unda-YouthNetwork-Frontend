import React from 'react';

const PreventionPackage = () => {
  const steps = [
    {id: "01", title: "Initial Screening", desc: "PHQ-4, PHQ-9, and GAD-7 tools to identify baseline needs"},
    {id: "02", title: "Daily Affirmations", desc: "Daily affirmations for positive mental habits and emotional regulation."},
    {id: "03", title: "Weekly Peer Check-Ins", desc: "Weekly check-ins for social connectedness and Psychological First Aid; includes referrals to community resources."},
    {id: "04", title: "Monthly Mini-Screening", desc: "Monthly screening with appropriate referrals and resources to support care pathways."},
    {id: "05", title: "Quarterly Mental Health Events", desc: "Youth-expert engagements on advocacy and leadership."},
    {id: "06", title: "Semi-Annual Therapy", desc: "Sessions with approved professionals for deeper support."},
    {id: "07", title: "Annual Mental Health Resilience skills training", desc: "Certified resilience, stress management skills and capacity building."}
  ];

  return(
    <section className = "py-32 bg-[#F9FAFB]/50">
      <div className = "container mx-auto px-6">
        <div className = "max-w-3xl mx-auto text-center mb-20">
          <h2 className = "text-4xl font-black text-[#0B1E3B] mb-4">The Unda Mind Vibes Prevention Package</h2>
          <p className = "text-slate-500 leading-relaxed">A structured, youth-centered model to strengthen early prevention.</p>
        </div>

        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key = {step.id}
              className = "bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 group"
            
            >
              <span className = "text-4xl font-black text-slate-100 group-hover:text-[#00C2CB]/20 transition-colors">{step.id}</span>
              <h4 className = "text-xl font-bold text-[#0B1E3B] mt-4 mb-3">{step.title}</h4>
              <p className = "text-slate-500 text-sm leading-relaxed">{step.desc}</p>

            </div>

          ))}
          
        </div>

      </div>
    </section>
  );
};

export default PreventionPackage;