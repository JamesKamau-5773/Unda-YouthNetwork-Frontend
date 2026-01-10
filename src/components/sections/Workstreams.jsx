import React from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Users,
  GraduationCap,
  MapPin,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const Workstreams = () => {
  const streams = [
    {
      title: "Unda Mind Vibes Podcast",
      icon: <Mic />,
      desc: "Our social driver — youth-led storytelling and expert conversations.",
      color: "border-[#00C2CB]",
      link: "/podcast"
    },
    {
      title: "Unda Mind Vibes Debaters",
      icon: <Users />,
      desc: "Age-appropriate mental health debates and conversations for 13–17 in school and community settings.",
      color: "border-[#00C2CB]",
      link: "/debaters-circle"
    },
    {
      title: "Unda Mind Vibes Campus",
      icon: <GraduationCap />,
      desc: "Campus cohorts, events, and embedded research driving prevention innovation.",
      color: "border-[#0090C0]",
      link: "/campus"
    },
    {
      title: "Unda Mind Vibes Mtaani",
      icon: <MapPin />,
      desc: "Community outreaches, local prevention cohorts, and pillar events.",
      color: "border-[#0B1E3B]",
      link: "/mtaani"
    },
    // Keep placeholder removed — primary Unda Mind Vibes products now displayed
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16">
          Our Workstreams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {streams.map((stream, idx) => (
            stream.link ? (
              <Link
                key={idx}
                to={stream.link}
                className={`p-8 border-t-4 ${stream.color} bg-[#F9FAFB]/30 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer block`}
              >
                <div className="text-[#00C2CB] mb-4 group-hover:scale-110 transition-transform">
                  {React.cloneElement(stream.icon, { size: 32 })}
                </div>
                <h4 className="font-bold text-[#0B1E3B] mb-2">{stream.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {stream.desc}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase text-[#00C2CB] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ) : (
              <div
                key={idx}
                className={`p-8 border-t-4 ${stream.color} bg-[#F9FAFB]/30 rounded-2xl opacity-60 cursor-not-allowed`}
              >
                <div className="text-[#00C2CB] mb-4">
                  {React.cloneElement(stream.icon, { size: 32 })}
                </div>
                <h4 className="font-bold text-[#0B1E3B] mb-2">{stream.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {stream.desc}
                </p>
                <p className="text-xs text-slate-400 italic font-bold">Coming soon</p>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workstreams;
