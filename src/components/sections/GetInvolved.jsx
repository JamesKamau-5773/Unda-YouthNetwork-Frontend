import React from 'react';
import { Link } from 'react-router-dom';
import { Users, HeartHandshake, Building2, Heart, ArrowRight } from 'lucide-react';

const GetInvolved = () => {
  const options = [
    {
      icon: Users,
      title: "Become a Member",
      description: "Pay KES 3,000 annually or $50 to join Unda Mind Vibes (UMV). Members gain access to UMV activities, trainings, and the member portal.",
      link: "/membership",
      color: "border-[#00C2CB]"
    },
    {
      icon: HeartHandshake,
      title: "Support or Host an Event",
      description: "Support UMV channels including debates, podcasts, campus programs, Mtaani events, and forums.",
      link: "/support",
      color: "border-[#00C2CB]"
    },
    {
      icon: Building2,
      title: "Partner With Us",
      description: "Organizations, schools, and funders can collaborate to support UMV programs and expand Adolescent & Youth Mental Health Prevention impact.",
      link: "/partner",
      color: "border-[#0090C0]"
    },
    {
      icon: Heart,
      title: "Contribute",
      description: "One-time or recurring contributions fund UMV programs and help advance adolescents and youths mental health prevention across Kenya. Corporate contributions start at KES 150,000 annually, supporting two youth cohorts of 25 participants each.",
      link: "/contribute",
      color: "border-[#0B1E3B]"
    }
  ];

  return (
    <section className="py-24 bg-[#F9FAFB]/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16 font-unda">
          How to Get Involved
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, idx) => {
            const Icon = option.icon;
            return (
              <Link
                key={idx}
                to={option.link}
                className={`p-8 border-t-4 ${option.color} bg-white rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className="text-[#00C2CB] mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h4 className="font-bold text-[#0B1E3B] mb-2">{option.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {option.description}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase text-[#00C2CB] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
