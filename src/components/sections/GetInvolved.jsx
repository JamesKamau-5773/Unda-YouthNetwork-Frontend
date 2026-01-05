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
      color: "border-unda-teal"
    },
    {
      icon: HeartHandshake,
      title: "Volunteer or Host an Event",
      description: "Support UMV channels including debates, podcasts, campus programs, Mtaani events, and forums.",
      link: "/",
      color: "border-unda-orange"
    },
    {
      icon: Building2,
      title: "Partner With Us",
      description: "Organizations, schools, and funders can collaborate to support UMV programs and expand Adolescent & Youth Mental Health Prevention impact.",
      link: "/about",
      color: "border-unda-yellow"
    },
    {
      icon: Heart,
      title: "Donate",
      description: "One-time or recurring contributions fund UMV programs and help advance adolescents and youths mental health prevention across Kenya. Corporate donations start at KES 150,000 annually, supporting two youth cohorts of 25 participants each.",
      link: "/donate",
      color: "border-unda-navy"
    }
  ];

  return (
    <section className="py-24 bg-unda-bg/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-unda-navy text-center mb-16 font-unda">
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
                <div className="text-unda-teal mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h4 className="font-bold text-unda-navy mb-2">{option.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {option.description}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase text-unda-teal opacity-0 group-hover:opacity-100 transition-opacity">
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
