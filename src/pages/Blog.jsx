import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Newspaper, TrendingUp, FileText, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const articles = [
    {
      title: "UNDA Youth Network UMV Program Featured on EpicPulse Magazine",
      excerpt: "A preview of how our prevention-first model is shaping conversations ahead of our official rollout in January.",
      category: "Media",
      date: "December 2025"
    },
    {
      title: "What to Expect: Launching UMV in January 2026",
      excerpt: "An inside look at our awareness, access and advocacy pillars and how young people will take the lead.",
      category: "Update",
      date: "January 2026"
    },
    {
      title: "Youth Voices Setting the Pace for 2026",
      excerpt: "Early stories from schools, campuses and communities preparing to participate in UMV Debaters, UMV Campus and UMV Mtaani.",
      category: "Success Story",
      date: "January 2026"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Blog & <span className="text-unda-yellow">Media.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                The UNDA Youth Network Blog & Media Centre is your hub for news, stories, and insights on Adolescent & Youth Mental Health Prevention. We share content that informs, inspires, and engages youth, educators, partners, and the wider community.
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="h-12 w-12 rounded-2xl bg-unda-teal/10 flex items-center justify-center">
                  <Newspaper size={24} className="text-unda-teal" />
                </div>
                <h2 className="text-4xl font-black text-unda-navy font-unda">Latest Articles</h2>
              </div>
              
              <div className="space-y-6">
                {articles.map((article, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-unda-teal/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-unda-bg text-unda-navy">
                        {article.category}
                      </span>
                      <span className="text-sm text-slate-400 font-medium">{article.date}</span>
                    </div>
                    <h3 className="text-2xl font-black text-unda-navy mb-3 group-hover:text-unda-teal transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <Button variant="ghost" className="text-unda-teal font-bold p-0 h-auto hover:bg-transparent group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button className="bg-unda-teal text-white hover:bg-unda-navy">
                  Subscribe for Updates
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-unda-navy mb-12 text-center">Explore by Category</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Newspaper, title: "Articles", desc: "Program updates and insights" },
                  { icon: TrendingUp, title: "Updates", desc: "Latest news and announcements" },
                  { icon: FileText, title: "Press Releases", desc: "Official statements" },
                  { icon: Award, title: "Success Stories", desc: "Youth narratives and impact" }
                ].map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow text-center">
                      <div className="h-12 w-12 rounded-xl bg-unda-teal/10 flex items-center justify-center mx-auto mb-4">
                        <Icon size={24} className="text-unda-teal" />
                      </div>
                      <h3 className="text-lg font-black text-unda-navy mb-2">{category.title}</h3>
                      <p className="text-sm text-slate-600">{category.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;