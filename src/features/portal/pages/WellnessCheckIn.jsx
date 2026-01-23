import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const WellnessCheckInPortal = () => {
    return (
        <DashboardLayout headerContent={(
            <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-3xl bg-white p-6 md:px-8 md:py-4 shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/10">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-portal-navyInk">Wellness Check-In</h2>
                    <p className="text-sm text-portal-muted mt-1">Your weekly mental resilience tracker.</p>
                </div>
            </div>
        )}>
       <div className="max-w-4xl mx-auto">
          
          <div className="bg-gradient-to-br from-portal-teal to-portal-tealDark rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-teal-900/10 relative overflow-hidden">
             
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

             <div className="relative z-10 flex flex-col items-center">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 shadow-inner ring-1 ring-white/30">
                    <Sparkles size={32} />
                </div>

                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Week 4 Check-In</h2>
                <p className="text-teal-50 text-lg mb-10 max-w-lg leading-relaxed">
                    Take 5 minutes to reflect on your recent experiences. This week focuses on <strong className="text-white">Social Connections</strong> and <strong className="text-white">Sleep Quality</strong>.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 w-full max-w-2xl mb-12 text-left">
                    {[
                        { icon: "", title: "Reflect", desc: "Answer 5 simple questions" },
                        { icon: "", title: "Analyze", desc: "Get instant wellness insights" },
                        { icon: "", title: "Grow", desc: "Receive tailored resources" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                            {item.icon ? <div className="text-2xl mb-2">{item.icon}</div> : null}
                            <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                            <p className="text-xs text-teal-100">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <Link to="/checkin" className="group bg-gradient-to-r from-portal-teal to-portal-tealDark text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl flex items-center gap-2 text-lg transform hover:-translate-y-1">
                    Start Check-In
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="mt-6 text-xs text-white/40 font-medium uppercase tracking-widest">Confidential & Secure</p>
             </div>
          </div>

         </div>
     </DashboardLayout>
  );
};

export default WellnessCheckInPortal;
