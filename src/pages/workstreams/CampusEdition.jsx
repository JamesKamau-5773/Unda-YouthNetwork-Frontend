import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/shared/Layout"; // Import the Layout wrapper
import {
  Lightbulb,
  Rocket,
  GraduationCap,
  ArrowRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CampusEdition = () => {
  const initiatives = [
    {
      title: "Mental Health Innovation Grant",
      tag: "Seed Funding",
      desc: "Apply for KES 50,000 to launch a peer-support circle on your campus.",
      status: "Applications Open",
    },
    {
      title: "Prevention Literacy Research",
      tag: "Data Mapping",
      desc: "Participate in national mapping of adolescent mental health stressors.",
      status: "In Progress",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white pb-32">
            {/* HERO: The Innovation Engine */}
        <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-unda-yellow/[0.05] rounded-full blur-[120px] translate-x-1/2" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-unda-yellow/10 border border-unda-yellow/20">
                  <Lightbulb size={16} className="text-unda-yellow" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-unda-navy">
                       Research & Innovation
                  </span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black text-unda-navy leading-[0.9] tracking-tighter">
                  Campus <br />
                  <span className="text-unda-yellow">Edition.</span>
                </h1>

                <p className="text-slate-600 text-xl font-medium max-w-xl leading-relaxed">
                  Empowering University and College students to lead the
                  prevention movement through research and seed funding for
                      innovation.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild className="h-16 px-8 rounded-2xl bg-unda-navy text-white hover:bg-unda-yellow hover:text-unda-navy text-lg font-bold shadow-xl shadow-unda-navy/10 transition-all">
                    <Link to="/join">Apply for Seed Funding</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-square rounded-[4rem] bg-unda-navy shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-unda-yellow/20 to-transparent" />
                  <GraduationCap
                    size={160}
                    className="absolute -bottom-10 -right-10 text-white opacity-10 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                    <Rocket size={64} className="text-unda-yellow mb-6" />
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
          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((item, idx) => (
              <div
                key={idx}
                className="p-10 rounded-[3rem] border border-slate-100 bg-white hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 text-unda-navy group-hover:bg-unda-yellow transition-colors">
                    <Award size={24} />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-unda-teal/5 text-unda-teal text-[9px] font-black uppercase tracking-widest">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-unda-navy mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-unda-navy uppercase tracking-widest">
                    {item.status}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-unda-teal font-black text-xs p-0 h-auto hover:bg-transparent"
                  >
                    Get Involved <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CampusEdition;
