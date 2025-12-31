import React from "react";
import {
  MessageSquare,
  BookOpen,
  GraduationCap,
  Download,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DebatersCircle = () => {
  const motions = [
    {
      topic: "Digital Wellbeing vs. Traditional Socialization",
      status: "Active",
      level: "University / College",
      participants: "450+ Youth Reached",
    },
    {
      topic: "The Role of Peer Support in Academic Pressure",
      status: "Archived",
      level: "High School",
      participants: "1,200+ Youth Reached",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* 1. HERO: Editorial Alignment */}
      <section className="pt-40 pb-20 bg-unda-navy relative overflow-hidden text-white">
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-unda-teal opacity-10 -skew-x-12 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
              <MessageSquare size={16} className="text-unda-teal" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Advocacy & Literacy
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Debaters <br />
              <span className="text-unda-teal">Circle.</span>
            </h1>

            <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-xl">
              Equipping Peer Champions to lead mental health advocacy through
              structured debate and critical thinking in Schools and Churches.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRICAL GRID: Resources & Motions */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* LEFT: Active Motions  */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-black text-unda-navy mb-10 tracking-tight uppercase tracking-[0.1em]">
              Current Motions
            </h2>
            <div className="space-y-6">
              {motions.map((motion, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        motion.status === "Active"
                          ? "bg-unda-teal/10 text-unda-teal"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {motion.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">
                      {motion.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-unda-navy mb-4 group-hover:text-unda-teal transition-colors">
                    {motion.topic}
                  </h3>
                  <div className="flex items-center gap-6 text-slate-600 font-semibold text-xs">
                    <span className="flex items-center gap-2">
                      <CheckSquare size={14} /> {motion.participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Compliance & Toolkits  */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100">
              <h3 className="text-xl font-black text-unda-navy mb-6">
                Institutional Toolkit
              </h3>
              <p className="text-slate-600 text-sm font-medium mb-8">
                Download required legal documents and consent forms for
                school-based check-ins.
              </p>

              <div className="space-y-4">
                {[
                  { name: "School Consent Policy", type: "PDF " },
                  { name: "Legal Aspect Summary", type: "PDF" },
                  { name: "Safe Environment Protocol", type: "PDF" },
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-unda-teal transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-unda-teal">
                        <Download size={16} />
                      </div>
                      <span className="text-sm font-bold text-unda-navy">
                        {doc.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      {doc.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK LINK: Operational Data Log  */}
            <div className="p-10 rounded-[3rem] bg-unda-teal text-white shadow-2xl shadow-unda-teal/20">
              <GraduationCap size={40} className="mb-6 opacity-30" />
              <h3 className="text-xl font-black mb-4">Log Circle Activity</h3>
              <p className="text-white/80 text-sm font-medium mb-8">
                Champions must log debate participation to maintain high
                Documentation Quality Scores.
              </p>
              <Button className="w-full h-14 rounded-2xl bg-white text-unda-teal hover:bg-unda-navy hover:text-white font-black uppercase tracking-widest transition-all">
                Open Operational Log
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DebatersCircle;
