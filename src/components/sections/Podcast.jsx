import React from "react";
import { Play, Mic2, Calendar, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Podcast = () => {
  const episodes = [
    {
      title: "Navigating Academic Pressure",
      guest: "Dr. Jane Kamau",
      duration: "45 mins",
      module: "Basic Psychosocial Skills",
      date: "Dec 28, 2025",
    },
    {
      title: "Digital Resilience in a Social World",
      guest: "Peer Lead: Omari T.",
      duration: "32 mins",
      module: "Prevention Literacy",
      date: "Dec 20, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 1. HERO SECTION: Asymmetrical & Bold */}
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-unda-teal/[0.03] -skew-x-12 translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Mic2 className="text-unda-teal" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-unda-navy">
                  Featured Conversation
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-unda-navy leading-[0.9] tracking-tighter">
                Candid <br />
                <span className="text-unda-teal">Resilience</span> <br />
                Stories.
              </h1>

              <p className="text-slate-600 text-xl font-medium max-w-xl leading-relaxed">
                Listen to "The UMV Podcast" where we bridge the gap between
                clinical expertise and youth-led storytelling. Prevention starts
                with a conversation [cite: 5-8].
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="h-16 px-8 rounded-2xl bg-unda-navy text-white hover:bg-unda-teal text-lg font-bold shadow-xl shadow-unda-navy/10 group">
                  <Play className="mr-3 fill-current" size={20} />
                  Listen Now
                </Button>
                <Button
                  variant="outline"
                  className="h-16 px-8 rounded-2xl border-slate-200 text-unda-navy font-bold hover:bg-slate-50"
                >
                  Browse Archive
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-[4rem] bg-unda-navy flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-unda-teal/40 to-transparent opacity-50" />
                <Mic2 size={120} className="text-white opacity-20" />
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                  <p className="text-white text-xs font-black uppercase tracking-widest mb-2">
                    Now Playing
                  </p>
                  <p className="text-white text-lg font-bold">
                    Resilience in Modern Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EPISODE LIST: Professional & High-Contrast */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-3xl font-black text-unda-navy tracking-tight">
              Recent Sessions
            </h2>
            <p className="text-slate-500 font-bold text-sm mt-2 uppercase tracking-widest">
              Prevention Literacy Track [cite: 42]
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Filter By Module
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {episodes.map((ep, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-unda-teal/30 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="flex items-center gap-8">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-unda-teal group-hover:bg-unda-teal group-hover:text-white transition-all">
                  <Play size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 rounded-full bg-unda-teal/5 text-unda-teal text-[9px] font-bold uppercase tracking-widest">
                      {ep.module}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <Calendar size={12} /> {ep.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-unda-navy group-hover:text-unda-teal transition-colors">
                    {ep.title}
                  </h3>
                  <p className="text-slate-600 font-semibold text-sm">
                    Guest: {ep.guest}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mr-4">
                  {ep.duration}
                </span>
                <Button
                  variant="ghost"
                  className="rounded-xl hover:bg-slate-50"
                >
                  <Share2 size={18} className="text-slate-400" />
                </Button>
                {/* BACKEND INTEGRATION: Logs participation for Champion metrics  */}
                <Button className="rounded-xl bg-slate-50 hover:bg-unda-teal hover:text-white text-slate-500 font-bold text-xs px-6 py-2 transition-all flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Log Attendance
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Podcast;
