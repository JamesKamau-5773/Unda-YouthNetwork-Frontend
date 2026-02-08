import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Users,
  GraduationCap,
  MapPin,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { programService } from "@/services/workstreamService";

// Icon map for dynamic icon resolution from backend
const iconMap = { Mic, Users, GraduationCap, MapPin, BookOpen };

const Workstreams = () => {
  const [loading, setLoading] = useState(true);
  const [streams, setStreams] = useState([]);

  const resolveWorkstreamLink = (stream) => {
    if (stream?.link) return stream.link;
    const raw = stream?.slug || stream?.title || stream?.name || '';
    const normalized = raw.toString().toLowerCase();
    if (normalized.includes('podcast')) return '/podcast';
    if (normalized.includes('debaters')) return '/debaters-circle';
    if (normalized.includes('campus')) return '/campus';
    if (normalized.includes('mtaani')) return '/mtaani';
    if (normalized.includes('annual') && normalized.includes('conference')) return '/programs/annual-conference';
    if (normalized.includes('global')) return '/programs/global';
    return null;
  };

  // Fallback static data
  const defaultStreams = [
    {
      title: "UMV Podcast",
      icon: "Mic",
      desc: "Our social driver — youth-led storytelling and expert conversations.",
      color: "border-[#00C2CB]",
      iconColor: '#00C2CB',
      link: "/podcast"
    },
    {
      title: "UMV Debaters",
      icon: "Users",
      desc: "Age-appropriate mental health debates and conversations for 13–17 in school and community settings.",
      color: "border-[#00C2CB]",
      iconColor: '#00C2CB',
      link: "/debaters-circle"
    },
    {
      title: "UMV Campus",
      icon: "GraduationCap",
      desc: "Campus cohorts, events, and embedded research driving prevention innovation.",
      color: "border-[#0090C0]",
      iconColor: '#0090C0',
      link: "/campus"
    },
    {
      title: "UMV Mtaani",
      icon: "MapPin",
      desc: "Community outreaches, local prevention cohorts, and pillar events.",
      color: "border-[#0B1E3B]",
      iconColor: '#0B1E3B',
      link: "/mtaani"
    },
  ];

  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      try {
        const data = await programService.getFeatured();
        setStreams(data?.length ? data : defaultStreams);
      } catch (err) {
        console.error('Failed to fetch workstreams:', err);
        setStreams(defaultStreams);
      } finally {
        setLoading(false);
      }
    };
    fetchStreams();
  }, []);

  // Resolve icon from string name
  const resolveIcon = (iconName) => iconMap[iconName] || Mic;

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <Loader2 className="animate-spin h-10 w-10 text-[#00C2CB]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16">
          Our Workstreams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streams.map((stream, idx) => {
            const IconComponent = resolveIcon(stream.icon);
            const resolvedLink = resolveWorkstreamLink(stream);
            return resolvedLink ? (
              <Link
                key={idx}
                to={resolvedLink}
                role="button"
                aria-label={`Open ${stream.title}`}
                className={`p-8 border-t-4 ${stream.color} bg-[#F9FAFB]/30 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer block flex flex-col h-full justify-between focus:outline-none focus-visible:ring-2`}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent size={36} style={{ color: stream.iconColor }} />
                </div>

                <div>
                  <h4 className="font-bold text-[#0B1E3B] mb-2">{stream.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {stream.desc}
                  </p>
                </div>

                <div className="flex items-center text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: stream.iconColor }}>
                  Learn More <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ) : (
              <div
                key={idx}
                className={`p-8 border-t-4 ${stream.color} bg-[#F9FAFB]/30 rounded-2xl opacity-60 cursor-not-allowed flex flex-col h-full justify-between`}
              >
                <div className="mb-6">
                  <IconComponent size={36} style={{ color: stream.iconColor }} />
                </div>

                <div>
                  <h4 className="font-bold text-[#0B1E3B] mb-2">{stream.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {stream.desc}
                  </p>
                </div>

                <p className="text-xs text-slate-400 italic font-bold">Coming soon</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workstreams;
