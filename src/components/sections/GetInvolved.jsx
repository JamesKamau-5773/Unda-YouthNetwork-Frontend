import React from 'react';
import { Link } from 'react-router-dom';
import { Users, HeartHandshake, Building2, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GetInvolved = () => {
  const options = [
    {
      icon: Users,
      title: "Become a Member",
      description: "Pay KES 3,000 annually or $50 to join Unda Mind Vibes (UMV). Members gain access to UMV activities, trainings, and the member portal.",
      cta: "Join Now",
      link: "/membership",
      color: "teal"
    },
    {
      icon: HeartHandshake,
      title: "Volunteer or Host an Event",
      description: "Support UMV channels including debates, podcasts, campus programs, Mtaani events, and forums.",
      cta: "Volunteer",
      link: "/",
      color: "orange"
    },
    {
      icon: Building2,
      title: "Partner With Us",
      description: "Organizations, schools, and funders can collaborate to support UMV programs and expand Adolescent & Youth Mental Health Prevention impact.",
      cta: "Partner",
      link: "/about",
      color: "yellow"
    },
    {
      icon: Heart,
      title: "Donate",
      description: "One-time or recurring contributions fund UMV programs and help advance adolescents and youths mental health prevention across Kenya. Corporate donations start at KES 150,000 annually, supporting two youth cohorts of 25 participants each.",
      cta: "Donate",
      link: "/donate",
      color: "navy"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-unda-teal/[0.03] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-unda-navy mb-6 font-unda">
            How to Get <span className="text-unda-teal">Involved</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join the movement for adolescent and youth mental health prevention. There are many ways to support our mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {options.map((option, idx) => {
            const Icon = option.icon;
            const colorMap = {
              teal: 'border-unda-teal',
              orange: 'border-unda-orange',
              yellow: 'border-unda-yellow',
              navy: 'border-unda-navy'
            };
            const iconBgMap = {
              teal: 'bg-unda-teal/10 text-unda-teal',
              orange: 'bg-unda-orange/10 text-unda-orange',
              yellow: 'bg-unda-yellow/10 text-unda-yellow',
              navy: 'bg-unda-navy/10 text-unda-navy'
            };
            const buttonMap = {
              teal: 'bg-unda-teal text-white hover:bg-unda-navy',
              orange: 'bg-unda-orange text-white hover:bg-unda-navy',
              yellow: 'bg-unda-yellow text-unda-navy hover:bg-unda-orange hover:text-white',
              navy: 'bg-unda-navy text-white hover:bg-unda-teal'
            };
            return (
              <div key={idx} className={`bg-unda-bg/30 rounded-2xl p-8 border-t-4 ${colorMap[option.color]} hover:bg-white hover:shadow-xl transition-all duration-300 group`}>
                <div className={`h-16 w-16 rounded-2xl ${iconBgMap[option.color]} flex items-center justify-center mb-6`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-unda-navy mb-4">{option.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{option.description}</p>
                <Button asChild className={`${buttonMap[option.color]} font-bold group-hover:translate-x-1 transition-transform`}>
                  <Link to={option.link}>
                    {option.cta} <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
