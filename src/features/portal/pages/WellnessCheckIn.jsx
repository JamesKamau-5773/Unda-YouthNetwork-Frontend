import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const WellnessCheckInPortal = () => {
  return (
    <DashboardLayout>
      {/* --- HEADER --- */}
      <div className="rounded-[2rem] bg-white p-8 mb-8 shadow-sm border border-[#E0F7FA] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1E3B]">
            Wellness Check-In
          </h2>
          <p className="text-sm text-[#00838F] font-bold mt-1">
            Your weekly mental resilience tracker.
          </p>
        </div>
        {/* Secure Badge */}
        <div className="px-4 py-2 rounded-full bg-[#E0F7FA] border border-[#00ACC1] text-[#006064] flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#00ACC1]" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Confidential
          </span>
        </div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="max-w-4xl mx-auto">
        {/* Changed from Dark Gradient to Solid White for Readability */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 text-center border border-[#E0F7FA] shadow-[0_20px_50px_rgba(0,194,203,0.08)] relative overflow-hidden">
          {/* Background Decoration (Subtle Mint) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E0F7FA]/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F0FDFF] rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon - Mint Circle */}
            <div className="h-24 w-24 bg-[#F0FDFF] rounded-3xl flex items-center justify-center text-[#00ACC1] mb-8 shadow-sm border border-[#E0F7FA]">
              <Sparkles size={40} />
            </div>

            {/* Title - Navy Ink (#0B1E3B) - CLEARLY VISIBLE */}
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#0B1E3B]">
              Week 4 Check-In
            </h2>

            {/* Description - Deep Teal (#006064) */}
            <p className="text-[#006064] text-lg mb-10 max-w-lg leading-relaxed font-medium">
              Take 5 minutes to reflect on your recent experiences. This week
              focuses on{" "}
              <span className="text-[#00ACC1] font-bold">
                Social Connections
              </span>{" "}
              and{" "}
              <span className="text-[#00ACC1] font-bold">Sleep Quality</span>.
            </p>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl mb-12 text-left">
              {[
                { title: "Reflect", desc: "Answer 5 simple questions" },
                { title: "Analyze", desc: "Get instant wellness insights" },
                { title: "Grow", desc: "Receive tailored resources" },
              ].map((item, i) => (
                // Step Cards: Anti-Glare Mint Background
                <div
                  key={i}
                  className="bg-[#F2F9FA] rounded-2xl p-6 border border-[#E0F7FA] hover:border-[#B2EBF2] transition-colors"
                >
                  <h3 className="font-bold text-[#0B1E3B] mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-[#00838F] leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Button - High Contrast Teal */}
            <Link
              to="/member/check-in/start"
              className="group bg-[#00C2CB] hover:bg-[#0097A7] text-white font-bold py-5 px-12 rounded-2xl transition-all shadow-xl shadow-[#00C2CB]/20 flex items-center gap-3 text-lg transform hover:-translate-y-1"
            >
              Start Check-In
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <p className="mt-8 text-[10px] text-[#00838F] font-bold uppercase tracking-widest opacity-60">
              Encrypted & Secure
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WellnessCheckInPortal;
