import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Newspaper, TrendingUp, FileText, Award, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storyService } from '@/services/workstreamService';

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const getStoryPath = (article) => {
    const slugOrId = article?.slug || article?.id || article?._id;
    return slugOrId ? `/blog/${slugOrId}` : '/blog';
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await storyService.getAll();
        setArticles(data?.length ? data : []);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#00C2CB]" />
        </div>
      </Layout>
    );
  }

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
                {articles.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 border border-dashed border-slate-200 shadow-sm text-center">
                    <h3 className="text-3xl font-black text-unda-navy mb-3">Coming soon</h3>
                    <p className="text-slate-500">Stories will be available here once published .</p>
                  </div>
                ) : (
                  articles.map((article, idx) => (
                    <Link
                      key={idx}
                      to={getStoryPath(article)}
                      className="block bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-unda-teal/30 transition-all duration-300 group"
                    >
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
                      <div className="text-unda-teal font-bold p-0 h-auto hover:bg-transparent group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Read More <ArrowRight size={16} className="ml-2" />
                      </div>
                    </Link>
                  ))
                )}
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