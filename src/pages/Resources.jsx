import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, BookOpen, FileText, Heart, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resources = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Resources & <span className="text-[#0090C0]">Tools.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                At UNDA Youth Network, we provide up-to-date materials to support youth, educators, and partners in mental-health prevention. Resources are regularly updated as the UMV Prevention Program grows.
              </p>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <FileText size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Publications</h2>
              </div>
              
                <div className="space-y-6">
                <div className="bg-[#F9FAFB]/30 rounded-2xl p-8 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-black text-[#0B1E3B] mb-3">Research Summaries</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Brief insights from UMV and partner research on youth mental health, preventive interventions, and evidence-based practices.
                  </p>
                  <Button className="bg-[#00C2CB] text-white hover:bg-[#0B1E3B]">
                    <Download size={16} className="mr-2" /> Coming Soon
                  </Button>
                </div>

                <div className="bg-[#F9FAFB]/30 rounded-2xl p-8 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-black text-[#0B1E3B] mb-3">UMV Reports</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Annual and quarterly program reports highlighting achievements, learnings, and program impact across schools, campuses, and communities.
                  </p>
                  <Button className="bg-[#00C2CB] text-white hover:bg-[#0B1E3B]">
                    <Download size={16} className="mr-2" /> Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Toolkits */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#0090C0]/10 flex items-center justify-center">
                  <BookOpen size={24} className="text-[#0090C0]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Toolkits</h2>
              </div>
              
              <div className="bg-[#F9FAFB]/30 rounded-2xl p-8 border-t-4 border-[#0090C0] hover:bg-white hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-black text-[#0B1E3B] mb-3">Preventive Mental-Health Guides</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Practical, user-friendly resources for young people, schools, and communities on resilience, stress management, peer support, and digital wellbeing.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Resilience Building for Youth",
                    "Stress Management Toolkit",
                    "Peer Support Guidelines",
                    "Digital Wellbeing Resources"
                  ].map((toolkit, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100">
                      <p className="font-bold text-[#0B1E3B]">{toolkit}</p>
                      <p className="text-xs text-slate-500 mt-1">Coming Soon</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Youth Stories */}
        <section className="py-24 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Heart size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Youth Stories</h2>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
                <h3 className="text-2xl font-black text-[#0B1E3B] mb-3">Storytelling Content</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Personal experiences, creative narratives, and peer-led accounts from adolescents and youth sharing their journeys toward mental wholeness.
                </p>
                <Button asChild className="bg-[#00C2CB] text-white hover:bg-[#0B1E3B]">
                  <Link to="/blog">
                    Read Stories <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0B1E3B] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-6">
              Looking for <span className="text-[#0090C0]">More Resources?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              New resources are added regularly. Subscribe to our newsletter to stay updated on the latest tools, guides, and research.
            </p>
            <Button className="h-14 px-8 rounded-2xl bg-[#0090C0] text-[#0B1E3B] hover:bg-[#00C2CB] hover:text-white text-lg font-bold">
              Subscribe for Updates
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resources;