import React from 'react';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnualConference = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-transparent pb-24">
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/programs" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Programs</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4">
                UMV Annual <span className="text-white drop-shadow-[0_12px_30px_rgba(2,6,23,0.65)]">Conference</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mb-8">
                Our flagship convening that brings together youth networks, researchers, schools and partners to share evidence, showcase innovations and strengthen prevention systems.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <Calendar size={16} className="text-[#0090C0]" />
                <span className="text-sm font-bold text-white">Register Interest</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-[#0B1E3B] mb-6">What to Expect</h2>
            <p className="text-slate-600 mb-8">Workshops, panels, youth showcases, research presentations and practical tools for prevention programming.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AnnualConference;
