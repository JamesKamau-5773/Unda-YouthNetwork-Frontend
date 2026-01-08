import React from 'react';

const CommunityStory = () => {
  return (
    <section
      id="community-story"
      className="py-32 bg-white relative overflow-hidden scroll-mt-32"
    >
      {/* Ambient background element to anchor the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-unda-teal/[0.02] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* 1. THE IMAGE: Centered with a 'Floating' effect */}
          <div className="relative mb-20 w-full max-w-2xl group">
             {/* Decorative 'frame' for depth */}
            <div className="absolute -inset-4 border border-unda-teal/10 rounded-[4rem] scale-105 group-hover:scale-100 transition-transform duration-700" />
            
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://i.pinimg.com/736x/ac/34/0f/ac340f495ae1469a2dec12f6232045a3.jpg" 
                alt="UNDA Youth Community" 
                className="w-full h-auto" 
              />
            </div>
          </div>

          {/* 2. THE CONTENT: Increased Slate-600 contrast */}
          <div className="space-y-8">
            <div className="inline-flex flex-wrap justify-center gap-2 mb-4">
              {['Awareness', 'Access', 'Advocacy'].map((pillar) => (
                <span key={pillar} className="px-5 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">
                  {pillar}
                </span>
              ))}
            </div>

            <h2 className="text-5xl lg:text-6xl font-black text-unda-navy leading-tight tracking-tight">
              Built by Youth, for Youth.
            </h2>
            
            <p className="text-slate-600 text-xl leading-relaxed font-light max-w-2xl mx-auto">
              UNDA Youth Network leads the national movement for Adolescent & Youth Mental Health Prevention through our UMV program. Empowering those aged 13–35 to build resilience before a crisis.
            </p>

            {/* 3. THE ACTIVITIES: High-contrast text labels */}
            <div className="pt-8 flex flex-wrap justify-center gap-x-12 gap-y-6 border-t border-slate-100">
              {[
                { label: "Weekly Peer Check-Ins", color: "bg-unda-teal" },
                { label: "Cultural Storytelling", color: "bg-unda-orange" },
                { label: "Digital Resilience Tools", color: "bg-unda-yellow" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                  <span className="text-unda-navy font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>

            {/* 4. THE REGIONS: Floating side-tags */}
            <div className="flex justify-center gap-16 pt-8">
              <div className="text-center">
                <p className="text-xs font-black text-unda-teal uppercase tracking-widest mb-1">Kenya</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hub</p>
              </div>
              <div className="w-px h-12 bg-slate-100" />
              <div className="text-center">
                <p className="text-xs font-black text-unda-orange uppercase tracking-widest mb-1">U.S.A</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStory;