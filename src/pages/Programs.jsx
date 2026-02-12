import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Target, Users, Heart, Lightbulb, ArrowRight, Mic2, MessageSquare, GraduationCap, MapPin, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { programService } from '@/services/workstreamService';

// Icon map for dynamic icon resolution from backend
const iconMap = {
  Users, Heart, Lightbulb, MessageSquare, GraduationCap, MapPin, Mic2, Calendar, Globe
};

const fallbackPillars = [
  {
    id: 1,
    title: 'Awareness',
    description: 'Building knowledge and understanding of adolescent mental health, prevention strategies, and resources across youth communities.',
    icon: 'Lightbulb',
    color: 'teal'
  },
  {
    id: 2,
    title: 'Access',
    description: 'Ensuring equitable access to prevention resources, support services, and safe spaces for youth mental health and resilience.',
    icon: 'Users',
    color: 'orange'
  },
  {
    id: 3,
    title: 'Advocacy',
    description: 'Empowering youth voices to advocate for mental health policies, support systems, and community-led prevention initiatives.',
    icon: 'Heart',
    color: 'yellow'
  }
];

const fallbackPrograms = [
  {
    id: 1,
    title: 'Annual Conference',
    tagline: 'Youth mental health leaders convening for learning, networking, and action',
    description: 'Join 150+ youth-led delegates, educators, and partners for a two-day conference on prevention, innovation, and youth empowerment.',
    icon: 'Calendar',
    color: 'teal',
    highlights: [
      'Keynote speakers on adolescent mental health',
      'Interactive workshops on resilience building',
      'Networking with prevention champions',
      'Capacity-building on advocacy'
    ],
    cta: 'Register Now',
    available: true,
    link: '/programs/annual-conference'
  },
  {
    id: 2,
    title: 'Global Initiative',
    tagline: 'International collaboration on youth mental health prevention',
    description: 'A global partnership to strengthen youth-led prevention efforts across continents, sharing knowledge and building solidarity.',
    icon: 'Globe',
    color: 'yellow',
    highlights: [
      'Cross-cultural peer learning',
      'Joint prevention research initiatives',
      'International advocacy campaigns',
      'Youth ambassador network'
    ],
    cta: 'Learn More',
    available: true,
    link: '/programs/global'
  }
];

const Programs = () => {
  const [loading, setLoading] = useState(true);
  const [pillars, setPillars] = useState([]);
  const [programs, setPrograms] = useState([]);

  const resolveProgramLink = (program) => {
    if (program?.link) return program.link;
    const raw = program?.slug || program?.title || program?.name || '';
    const normalized = raw.toString().toLowerCase();
    if (normalized.includes('podcast')) return '/podcast';
    if (normalized.includes('debaters')) return '/debaters-circle';
    if (normalized.includes('campus')) return '/campus';
    if (normalized.includes('mtaani')) return '/mtaani';
    if (normalized.includes('annual') && normalized.includes('conference')) return '/programs/annual-conference';
    if (normalized.includes('global')) return '/programs/global';
    return null;
  };

  // Fetch pillars and programs from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pillarsRes, programsRes] = await Promise.all([
          programService.getPillars().catch(() => null),
          programService.getAll().catch(() => null)
        ]);
        setPillars(pillarsRes?.length ? pillarsRes : fallbackPillars);
        setPrograms(programsRes?.length ? programsRes : fallbackPrograms);
      } catch (err) {
        console.error('Failed to fetch programs:', err);
        setPillars(fallbackPillars);
        setPrograms(fallbackPrograms);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Resolve icon from string name or use component directly
  const resolveIcon = (icon) => {
    if (typeof icon === 'string') return iconMap[icon] || Users;
    return icon || Users;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-transparent">
          <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <div className="h-12 w-2/3 bg-white/30 rounded mb-4 animate-pulse" />
                <div className="h-5 w-full bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="p-8 border-t-4 border-slate-200 bg-[#F9FAFB]/30 rounded-2xl animate-pulse">
                    <div className="h-16 w-16 bg-slate-200 rounded-2xl mb-6" />
                    <div className="h-4 w-1/2 bg-slate-200 rounded mb-3" />
                    <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-5/6 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="p-8 lg:p-12 border-l-4 border-slate-200 bg-[#F9FAFB]/30 rounded-2xl animate-pulse">
                    <div className="h-6 w-1/3 bg-slate-200 rounded mb-4" />
                    <div className="h-5 w-2/3 bg-slate-200 rounded mb-4" />
                    <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-5/6 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

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
                Unda Mind Vibes <span className="text-[#0090C0]">Programs.</span>
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

            {((pillars.length ? pillars : fallbackPillars)).length === 0 ? (
              <div className="bg-[#F9FAFB]/30 rounded-2xl p-10 border border-slate-100 text-center">
                <p className="text-slate-500 font-bold">No pillars published yet.</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {(pillars.length ? pillars : fallbackPillars).map((pillar, idx) => {
                  const Icon = resolveIcon(pillar.icon);
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
                  const resolvedColor = pillar.color || 'teal';
                  return (
                    <div key={pillar.id || idx} className={`bg-[#F9FAFB]/30 rounded-2xl p-8 border-t-4 ${colorMap[resolvedColor]} hover:bg-white hover:shadow-xl transition-all duration-300 group`}>
                      <div className={`h-16 w-16 rounded-2xl ${iconBgMap[resolvedColor]} flex items-center justify-center mb-6`}>
                        <Icon size={32} />
                      </div>
                        <h3 className="text-2xl font-black text-[#0B1E3B] mb-4">{pillar.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
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
                All workstreams operate under UMV, each designed to reach different segments of adolescents and youth.
              </p>
            </div>

            {((programs.length ? programs : fallbackPrograms)).length === 0 ? (
              <div className="bg-[#F9FAFB]/30 rounded-2xl p-10 border border-slate-100 text-center">
                <p className="text-slate-500 font-bold">No programs published yet.</p>
              </div>
            ) : (
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {(programs.length ? programs : fallbackPrograms).map((program, idx) => {
                const Icon = resolveIcon(program.icon);
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
                const resolvedColor = program.color || 'teal';

                // availability: if `available` is explicitly false the program is not yet live
                const isAvailable = program.available !== false;
                const resolvedLink = resolveProgramLink(program);
                const linkValid = isAvailable && resolvedLink && resolvedLink !== '/';

                return linkValid ? (
                  <Link
                    key={idx}
                    to={resolvedLink}
                    role="button"
                    aria-label={`Open ${program.title}`}
                    className={`bg-[#F9FAFB]/30 rounded-2xl p-8 lg:p-12 border-l-4 ${colorMap[resolvedColor]} hover:bg-white hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 group block`}
                  >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${iconBgMap[resolvedColor]} mb-6 transform transition-transform group-hover:scale-105`}>
                          <Icon size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">{program.title}</span>
                        </div>
                        <h3 className="text-3xl font-black text-[#0B1E3B] mb-2">{program.tagline}</h3>
                        <p className="text-sm font-bold text-[#00C2CB] uppercase tracking-wider mb-4">{program.tagline}</p>
                        <p className="text-slate-600 leading-relaxed mb-6">{program.description}</p>

                        <ul className="space-y-2 mb-6">
                          {(Array.isArray(program.highlights) ? program.highlights : []).map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`w-full ${buttonMap[resolvedColor]} font-bold py-4 rounded-xl text-center`}>{program.cta && program.cta.trim() !== '' ? program.cta : 'Learn More'} <ArrowRight size={16} className="ml-2 inline-block" /></div>
                      </div>

                      <div className={`aspect-video rounded-2xl ${iconBgMap[resolvedColor]} flex items-center justify-center opacity-50 transform transition-all group-hover:opacity-80 group-hover:scale-105`}>
                        <Icon size={64} className="opacity-20" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div key={idx} className={`bg-[#F9FAFB]/30 rounded-2xl p-8 lg:p-12 border-l-4 ${colorMap[resolvedColor]} opacity-50 cursor-not-allowed pointer-events-none transition-all duration-300`}>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${iconBgMap[resolvedColor]} mb-6`}>
                          <Icon size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">{program.title}</span>
                        </div>
                        <h3 className="text-3xl font-black text-[#0B1E3B] mb-2">{program.tagline}</h3>
                        <p className="text-sm font-bold text-[#00C2CB] uppercase tracking-wider mb-4">{program.tagline}</p>
                        <p className="text-slate-600 leading-relaxed mb-6">{program.description}</p>

                        <ul className="space-y-2 mb-6">
                          {(Array.isArray(program.highlights) ? program.highlights : []).map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#00C2CB] mt-2 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        { !isAvailable ? (
                          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F1F5F9] text-[#0B1E3B] font-bold">Coming Soon</div>
                        ) : (
                          <div className={`w-full ${buttonMap[resolvedColor]} font-bold py-4 rounded-xl text-center`}>
                            {program.cta && program.cta.trim() !== '' ? program.cta : 'Learn More'} <ArrowRight size={16} className="ml-2 inline-block" />
                          </div>
                        )}
                      </div>

                      <div className={`aspect-video rounded-2xl ${iconBgMap[resolvedColor]} flex items-center justify-center opacity-30`}>
                        <Icon size={64} className="opacity-10" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
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
              <Button asChild variant="outline" className="h-14 px-8 rounded-2xl border-white bg-white text-[#0B1E3B] text-lg font-bold">
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
