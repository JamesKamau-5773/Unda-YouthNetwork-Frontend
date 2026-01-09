import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/shared/Layout"; // Import the Layout wrapper
import {
  Lightbulb,
  Rocket,
  GraduationCap,
  ArrowRight,
  Award,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/apiService";

const CampusEdition = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFunding, setHasFunding] = useState(false);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await api.get('/api/campus-initiatives');
        if (response.data?.initiatives?.length > 0) {
          setInitiatives(response.data.initiatives);
          // Check if any initiative has funding available
          const fundingAvailable = response.data.initiatives.some(
            init => init.status?.toLowerCase().includes('open') || init.funding_available
          );
          setHasFunding(fundingAvailable);
        }
      } catch (err) {
        console.error('Failed to fetch campus initiatives:', err.message);
        setInitiatives([]);
        setHasFunding(false);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-transparent pb-32">
            {/* HERO: The Innovation Engine */}
        <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0090C0]/[0.05] rounded-full blur-[120px] translate-x-1/2" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0090C0]/10 border border-[#0090C0]/20">
                  <Lightbulb size={16} className="text-[#0090C0]" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1E3B]">
                       Research & Innovation
                  </span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black text-[#0B1E3B] leading-[0.9] tracking-tighter">
                  Campus <br />
                  <span className="text-[#0090C0]">Edition.</span>
                </h1>

                <p className="text-slate-600 text-xl font-medium max-w-xl leading-relaxed">
                  Empowering University and College students to lead the
                  prevention movement through research and seed funding for
                      innovation.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {loading ? (
                    <Button disabled className="h-16 px-8 rounded-2xl bg-slate-200 text-slate-400 text-lg font-bold">
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Checking Availability...
                    </Button>
                  ) : hasFunding ? (
                    <Button asChild className="h-16 px-8 rounded-2xl bg-[#0B1E3B] text-white hover:bg-[#0090C0] hover:text-[#0B1E3B] text-lg font-bold shadow-xl shadow-[#0B1E3B]/10 transition-all">
                      <Link to="/seed-funding-apply">Apply for Seed Funding</Link>
                    </Button>
                  ) : (
                    <Button disabled className="h-16 px-8 rounded-2xl bg-slate-200 text-slate-500 text-lg font-bold cursor-not-allowed">
                      No Funding Available Currently
                    </Button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-square rounded-[4rem] bg-[#0B1E3B] shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0090C0]/20 to-transparent" />
                  <GraduationCap
                    size={160}
                    className="absolute -bottom-10 -right-10 text-white opacity-10 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                    <Rocket size={64} className="text-[#0090C0] mb-6" />
                    <p className="text-white text-2xl font-black tracking-tight mb-2">
                      Drive Innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPPORTUNITIES GRID */}
        <section className="py-24 container mx-auto px-6">
          {loading ? (
              <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-[#0090C0]" size={48} />
            </div>
          ) : initiatives.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg font-medium">No initiatives available at the moment.</p>
              <p className="text-slate-400 text-sm mt-2">Check back soon for new opportunities!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {initiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="p-10 rounded-[3rem] border border-slate-100 bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 text-[#0B1E3B] group-hover:bg-[#0090C0] transition-colors">
                      <Award size={24} />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-[#00C2CB]/5 text-[#00C2CB] text-[9px] font-black uppercase tracking-widest">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B1E3B] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-[10px] font-bold text-[#0B1E3B] uppercase tracking-widest">
                      {item.status}
                    </span>
                    <Button
                      variant="ghost"
                      className="text-[#00C2CB] font-black text-xs p-0 h-auto hover:bg-transparent"
                    >
                      Get Involved <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CampusEdition;
