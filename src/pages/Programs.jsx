import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Target, Users, Heart, Lightbulb, ArrowRight, Mic2, MessageSquare, GraduationCap, MapPin, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Programs = () => {
  const pillars = [
    {
      icon: Users,
      title: "Awareness",
      color: "teal",
      description: "Large-scale youth campaigns, storytelling, digital content, debates and podcast conversations that increase mental-health literacy and reduce stigma."
    },
    {
      icon: Heart,
      title: "Access",
      color: "orange",
      description: "Peer-led prevention services, community-based engagement, school and campus outreach, and digital platforms that bring preventive support closer to young people."
    },
    {
      icon: Lightbulb,
      title: "Advocacy",
      color: "yellow",
      description: "Network-building, intersectoral partnerships, school–community collaborations, and youth representation in policy spaces to strengthen prevention systems nationally."
    }
  ];

  const programs = [
    {
      icon: MessageSquare,
      title: "UMV Debaters",
      tagline: "Critical Thinking Through Structured Debates",
      description: "A dynamic platform where high school students explore mental-health prevention topics through structured debates.",
      highlights: [
        "Intra-school and inter-school debate levels",
        "Age-appropriate debate topics aligned with real youth risks",
        "Training for debate clubs on mental-health literacy",
        "Incentivized competitions at zonal, county and national levels"
      ],
      cta: "Learn More",
      link: "/debaters-circle",
      color: "teal"
    },
    {
      icon: GraduationCap,
      title: "UMV Campus",
      tagline: "Research-Driven Innovation for Tertiary Students",
      description: "A research-centered competition for university and college students passionate about preventive mental health.",
      highlights: [
        "Draft research proposal competitions",
        "Funding or cash incentives for top proposals",
        "Mentorship from mental-health experts and researchers",
        "Building youth leadership in evidence generation"
      ],
      cta: "Explore Campus",
      link: "/campus",
      color: "yellow"
    },
    {
      icon: MapPin,
      title: "UMV Mtaani",
      tagline: "Community Engagement Beyond the Classroom",
      description: "A vibrant community engagement model reaching young people outside formal schooling.",
      highlights: [
        "Sports activities like soccer tournaments",
        "Art festivals & creative showcases",
        "Community galas and open-air dialogues",
        "Mobile outreach and peer support booths"
      ],
      cta: "Join Mtaani",
      link: "/mtaani",
      color: "orange"
    },
    {
      icon: Mic2,
      title: "UMV Podcast",
      tagline: "Conversations That Prevent",
      description: "A bi-monthly podcast where young people, creatives and mental-health voices unpack real issues affecting daily life.",
      highlights: [
        "Honest conversations on resilience, stress, identity, relationships",
        "Preventive insights from psychologists and youth leaders",
        "Youth stories, creative perspectives and practical tools",
        "Available on all major streaming platforms"
      ],
      cta: "Listen Now",
      link: "/podcast",
      color: "teal"
    },
    {
      icon: Calendar,
      title: "UMV Annual Conference",
      tagline: "A Flagship Youth Mental Health Convening",
      description: "A flagship youth convening that brings together networks, schools, universities, researchers and community partners.",
      highlights: [
        "Expert-led prevention sessions",
        "Debate showcases and live competitions",
        "Youth research presentations",
        "Creative performances and thematic panels"
      ],
      cta: "Register",
      link: "/",
      color: "navy"
    },
    {
      icon: Globe,
      title: "UMV Global",
      tagline: "Expanding Prevention to the United States",
      description: "The international expansion of the Unda Mind Vibes (UMV) Prevention Program, bringing our youth-centered mental-health initiatives to the United States.",
      highlights: [
        "Adapted programs for new cultural contexts",
        "Accessibility and relevance for young people aged 13–35",
        "Building on the success of UMV in Kenya",
        "Creating global impact through local action"
      ],
      cta: "",
      link: "/",
      color: "teal"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
          <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                UMV <span className="text-[#0090C0]">Programs.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mb-8">
                The Unda Mind Vibes (UMV) Prevention Program is delivered through a collective of youth-driven platforms under UNDA Youth Network, designed to build preventive mental-health literacy, promote youth-led engagement, and activate community participation.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <Target size={16} className="text-[#0090C0]" />
                <span className="text-sm font-bold text-white">Converse. Prevent. Thrive Mentally.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#0B1E3B] mb-6 font-unda">
                UMV is Built on <span className="text-[#00C2CB]">Three Pillars</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                All UMV activities reinforce the prevention agenda in schools, tertiary institutions and communities through storytelling, debates, research, creative expression and community events.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                const colorMap = {
                  teal: 'border-[#00C2CB]',
                  orange: 'border-[#00C2CB]',
                  yellow: 'border-[#0090C0]'
                };
                const iconBgMap = {
                  teal: 'bg-[#00C2CB]/10 text-[#00C2CB]',
                  orange: 'bg-[#00C2CB]/10 text-[#00C2CB]',
                  yellow: 'bg-[#0090C0]/10 text-[#0090C0]'
                };
                return (
                  <div key={idx} className={`bg-[#F9FAFB]/30 rounded-2xl p-8 border-t-4 ${colorMap[pillar.color]} hover:bg-white hover:shadow-xl transition-all duration-300 group`}>
                    <div className={`h-16 w-16 rounded-2xl ${iconBgMap[pillar.color]} flex items-center justify-center mb-6`}>
                      <Icon size={32} />
                    </div>
                      <h3 className="text-2xl font-black text-[#0B1E3B] mb-4">{pillar.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Program Streams */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#0B1E3B] mb-6 font-unda">
                Our Program <span className="text-[#00C2CB]">Streams</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                All UMV workstreams operate under Unda Mind Vibes (UMV), each designed to reach different segments of young people aged 13–35.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {programs.map((program, idx) => {
                const Icon = program.icon;
                const colorMap = {
                  teal: 'border-[#00C2CB]',
                  orange: 'border-[#00C2CB]',
                  yellow: 'border-[#0090C0]',
                  navy: 'border-[#0B1E3B]'
                };
                const iconBgMap = {
                  teal: 'bg-[#00C2CB]/10 text-[#00C2CB]',
                  orange: 'bg-[#00C2CB]/10 text-[#00C2CB]',
                  yellow: 'bg-[#0090C0]/10 text-[#0090C0]',
                  navy: 'bg-[#0B1E3B]/10 text-[#0B1E3B]'
                };
                const buttonMap = {
                  teal: 'bg-[#00C2CB] text-white hover:bg-[#0B1E3B]',
                  orange: 'bg-[#00C2CB] text-white hover:bg-[#0B1E3B]',
                  yellow: 'bg-[#0090C0] text-[#0B1E3B] hover:bg-[#00C2CB] hover:text-white',
                  navy: 'bg-[#0B1E3B] text-white hover:bg-[#00C2CB]'
                };

                return (
                  <div key={idx} className={`bg-[#F9FAFB]/30 rounded-2xl p-8 lg:p-12 border-l-4 ${colorMap[program.color]} hover:bg-white hover:shadow-xl transition-all duration-300 group`}>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${iconBgMap[program.color]} mb-6`}>
                          <Icon size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">{program.title}</span>
                        </div>
                        <h3 className="text-3xl font-black text-[#0B1E3B] mb-2">{program.tagline}</h3>
                        <p className="text-sm font-bold text-[#00C2CB] uppercase tracking-wider mb-4">{program.tagline}</p>
                        <p className="text-slate-600 leading-relaxed mb-6">{program.description}</p>
                        
                        <ul className="space-y-2 mb-6">
                          {program.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <Button asChild className={`w-full ${buttonMap[program.color]} font-bold group-hover:translate-x-1 transition-transform`}>
                          <Link to={program.link}>
                            {program.cta} <ArrowRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Placeholder for Program Image/Graphic */}
                      <div className={`aspect-video rounded-2xl ${iconBgMap[program.color]} flex items-center justify-center opacity-50`}>
                        <Icon size={64} className="opacity-20" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#0B1E3B] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-6">
              Ready to <span className="text-[#0090C0]">Get Involved?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Join the movement for adolescent and youth mental health prevention. Become a member, support, or partner with us today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="h-14 px-8 rounded-2xl bg-[#0090C0] text-[#0B1E3B] hover:bg-[#00C2CB] hover:text-white text-lg font-bold">
                <Link to="/membership">Become a Member</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 rounded-2xl border-white text-white hover:bg-white hover:text-[#0B1E3B] text-lg font-bold">
                <Link to="/">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Programs;
