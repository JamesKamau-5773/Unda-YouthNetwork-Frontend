import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Image, Video, Camera, Play } from 'lucide-react';

const Gallery = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0090C0] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-6 z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 hero-overlay pointer-events-none z-10" />
          
          <div className="container mx-auto px-6 relative z-20">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Gallery & <span className="text-[#0B1E3B]">Moments.</span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed max-w-3xl">
                Our Gallery brings the UMV Prevention Program experience to life. Explore photos and videos capturing the energy, creativity, and impact of UNDA Youth Network programs.
              </p>
            </div>
          </div>
        </section>

        {/* Photos Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Camera size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Photos</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-square rounded-2xl bg-[#F9FAFB]/30 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Image size={48} className="text-slate-300 mx-auto mb-3" />
                        <p className="text-sm font-bold text-slate-400">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-600 leading-relaxed">
                  Snapshots from UMV Debaters Circle, UMV Campus Edition, UMV Mtaani, community outreach, and UMV Quarterly & Annual Forums, showcasing youth engagement, learning, and creativity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Video size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Videos</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-video rounded-2xl bg-[#F9FAFB]/30 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Play size={32} className="text-white ml-1" />
                        </div>
                        <p className="text-sm font-bold text-slate-500">Video Coming Soon</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-600 leading-relaxed">
                  Highlights from podcasts, debates, workshops, and community events, providing a closer look at how young people are driving mental-health prevention across schools, campuses, and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0B1E3B] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-6">
              Join the <span className="text-[#0090C0]">Movement</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Be part of the moments we capture. Participate in UMV programs and help us create more impactful stories.
            </p>
            <Link to="/membership" className="inline-flex items-center h-14 px-8 rounded-2xl bg-[#0090C0] text-[#0B1E3B] hover:bg-[#00C2CB] hover:text-white text-lg font-bold transition-colors">
              Get Involved
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Gallery;
