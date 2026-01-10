import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';

const LatestBlog = () => {
  const articles = [
    {
      title: "UNDA Youth Network UMV Program Featured on EpicPulse Magazine",
      excerpt: "A preview of how our prevention-first model is shaping conversations ahead of our official rollout in January.",
      link: "/blog",
      color: "border-[#00C2CB]"
    },
    {
      title: "What to Expect: Launching UMV in January 2026",
      excerpt: "An inside look at our awareness, access and advocacy pillars and how young people will take the lead.",
      link: "/blog",
      color: "border-[#00C2CB]"
    },
    {
      title: "Youth Voices Setting the Pace for 2026",
      excerpt: "Early stories from schools, campuses and communities preparing to participate in UMV Debaters, UMV Campus and UMV Mtaani.",
      link: "/blog",
      color: "border-[#0090C0]"
    }
    ,
    {
      title: "MindRoots Parent Circle",
      excerpt: "Prevention-first support for parents and caregivers — now part of our Resources and Blog.",
      link: "/mindroots-parent-circle",
      color: "border-[#00C2CB]"
    }
  ];

  return (
    <section className="py-24 bg-[#F9FAFB]/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16 font-unda">
          Latest from the Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <Link
              key={idx}
              to={article.link}
              className={`p-8 border-t-4 ${article.color} bg-white rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer`}
            >
              <div className="text-[#00C2CB] mb-4 group-hover:scale-110 transition-transform">
                <Newspaper size={32} />
              </div>
              <h4 className="font-bold text-[#0B1E3B] mb-2">{article.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center text-[10px] font-bold uppercase text-[#00C2CB] opacity-0 group-hover:opacity-100 transition-opacity">
                Read More <ArrowRight size={12} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 italic font-bold">Coming soon</p>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
