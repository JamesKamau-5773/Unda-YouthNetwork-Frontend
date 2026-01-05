import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LatestBlog = () => {
  const articles = [
    {
      title: "UNDA Youth Network UMV Program Featured on EpicPulse Magazine",
      excerpt: "A preview of how our prevention-first model is shaping conversations ahead of our official rollout in January.",
      category: "Media Feature"
    },
    {
      title: "What to Expect: Launching UMV in January 2026",
      excerpt: "An inside look at our awareness, access and advocacy pillars and how young people will take the lead.",
      category: "Program Update"
    },
    {
      title: "Youth Voices Setting the Pace for 2026",
      excerpt: "Early stories from schools, campuses and communities preparing to participate in UMV Debates, Campus Edition and UMV Mtaani.",
      category: "Success Story"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-unda-orange/[0.03] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 mb-6">
            <Newspaper size={18} className="text-unda-orange" />
            <span className="text-xs font-black uppercase tracking-widest text-unda-navy">Latest Updates</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-unda-navy mb-6 font-unda">
            Latest from the <span className="text-unda-orange">Blog</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          {articles.map((article, idx) => (
            <div key={idx} className="bg-unda-bg/30 rounded-2xl p-8 border-t-4 border-unda-orange hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-unda-orange/10 text-unda-orange mb-4">
                {article.category}
              </span>
              <h3 className="text-xl font-black text-unda-navy mb-3 group-hover:text-unda-orange transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                {article.excerpt}
              </p>
              <button className="text-unda-orange font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                Read More <ArrowRight size={14} className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-left mt-12">
          <Button asChild className="bg-unda-orange text-white hover:bg-unda-navy">
            <Link to="/blog">
              Read Our Stories <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
