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
      title: "UMV Podcast",
      icon: <Mic />,
      desc: "Expert insights and youth stories on resilience.",
      color: "border-unda-teal",
      link: "/podcast"
    },
    {
      title: "Debaters Circle",
      icon: <Users />,
      desc: "Empowering schools through mental health literacy.",
      color: "border-unda-orange",
      link: "/debaters-circle"
    },
    {
      title: "Campus Edition",
      icon: <GraduationCap />,
      desc: "Research-led innovation and seed funding.",
      color: "border-unda-yellow",
      link: "/campus"
    },
    {
      title: "UMV Mtaani",
      icon: <MapPin />,
      desc: "Community-driven prevention in your neighborhood.",
      color: "border-unda-navy",
      link: "/mtaani"
    },
    // High School workstream does not have a page yet
    {
      title: "High School",
      icon: <BookOpen />,
      desc: "Building wellness foundations for adolescents.",
      color: "border-unda-teal",
      link: null
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-unda-navy text-center mb-16 font-unda">
          Our Workstreams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {streams.map((stream, idx) => (
            stream.link ? (
              <Link
                key={idx}
                to={stream.link}
                className={`p-8 border-t-4 ${stream.color} bg-unda-bg/30 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer block`}
              >
                <div className="text-unda-teal mb-4 group-hover:scale-110 transition-transform">
                  {React.cloneElement(stream.icon, { size: 32 })}
                </div>
                <h4 className="font-bold text-unda-navy mb-2">{stream.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {stream.desc}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase text-unda-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ) : (
              <div
                key={idx}
                className={`p-8 border-t-4 ${stream.color} bg-unda-bg/30 rounded-2xl opacity-60 cursor-not-allowed`}
              >
                <div className="text-unda-teal mb-4">
                  {React.cloneElement(stream.icon, { size: 32 })}
                </div>
                <h4 className="font-bold text-unda-navy mb-2">{stream.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {stream.desc}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase text-unda-teal opacity-50">
                  Coming Soon
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workstreams;
