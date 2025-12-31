import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { MapPin, Users, Calendar, ArrowRight, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UMVMtaani = () => {
  const upcomingEvents = [
    {
      title: 'Mental Health Baraza',
      location: 'Kibera Community Hall',
      date: 'Jan 12, 2025',
      type: 'Open Forum',
    },
    {
      title: 'Art & Resilience Workshop',
      location: 'Mathare Social Hall',
      date: 'Jan 18, 2025',
      type: 'Creative Therapy',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white pb-32">
        {/* 1. HERO: Urban & Grounded */}
        <section className="pt-40 pb-20 bg-unda-navy relative overflow-hidden">
          {/* Abstract map pattern background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-unda-orange/10 border border-unda-orange/20 mb-8 mx-auto">
              <MapPin size={16} className="text-unda-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-unda-orange">
                Neighborhood Prevention
              </span>
            </div>

            <h1 className="text-6xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8">
              UMV <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-unda-orange to-unda-yellow">Mtaani.</span>
            </h1>

            <p className="text-slate-300 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Bringing mental health prevention to the doorstep. We turn community halls, playing fields, and social spaces into safe zones for resilience.
            </p>
          </div>
        </section>

        {/* 2. LOCAL ACTION GRID  */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left: Mission */}
            <div className="lg:col-span-5 space-y-12">
              <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100">
                <HeartHandshake size={48} className="text-unda-navy mb-6" />
                <h3 className="text-3xl font-black text-unda-navy mb-4">Community First.</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  UMV Mtaani is designed for youth who are out of school or working in the informal sector. We meet you where you are.
                </p>
                <Button asChild className="w-full py-6 rounded-2xl bg-unda-navy text-white font-bold text-lg hover:bg-unda-orange transition-all">
                  <Link to="/join">
                    Start a Mtaani Hub <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Stat Card */}
              <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-unda-teal/10 border border-unda-teal/20">
                <Users size={32} className="text-unda-teal" />
                <div>
                  <p className="text-3xl font-black text-unda-navy">12</p>
                  <p className="text-xs font-bold text-unda-teal uppercase tracking-widest">Active Locations</p>
                </div>
              </div>
            </div>

            {/* Right: Upcoming Events  */}
            <div className="lg:col-span-7">
              <div className="flex items-end justify-between mb-10">
                <h2 className="text-3xl font-black text-unda-navy tracking-tight">Upcoming Barazas</h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nairobi Region</span>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="group p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-unda-orange/30 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-unda-navy font-bold border border-slate-100">
                        <span className="text-xs uppercase">{event.date.split(' ')[0]}</span>
                        <span className="text-xl">{event.date.split(' ')[1].replace(',', '')}</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-unda-navy group-hover:text-unda-orange transition-colors">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                            <MapPin size={12} /> {event.location}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" asChild className="rounded-xl hover:bg-slate-50 text-unda-navy font-bold">
                      <Link to="/portal">
                        RSVP <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UMVMtaani;
