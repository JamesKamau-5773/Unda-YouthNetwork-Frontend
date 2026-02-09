import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import { storyService } from '@/services/workstreamService';

const LatestBlog = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const getStoryPath = (article) => {
    if (article?.link) return article.link;
    const slugOrId = article?.slug || article?.id || article?._id;
    return slugOrId ? `/blog/${slugOrId}` : '/blog';
  };

  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      try {
        const data = await storyService.getLatest(4);
        setArticles(data?.length ? data : []);
      } catch (err) {
        console.error('Failed to fetch latest stories:', err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#F9FAFB]/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="p-8 border-t-4 border-slate-200 bg-white rounded-2xl animate-pulse">
                <div className="h-8 w-8 rounded-full bg-slate-200 mb-4" />
                <div className="h-4 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                <div className="h-3 w-5/6 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#F9FAFB]/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16 font-unda">
          Latest from the Blog
        </h2>
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-100 text-center">
            <p className="text-slate-500 font-bold mb-4">No stories published yet.</p>
            <Link
              to="/contribute"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#00C2CB] text-white font-bold hover:bg-[#0B1E3B]"
            >
              Be the first to contribute
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <Link
                key={article.id || idx}
                to={getStoryPath(article)}
                className={`p-8 border-t-4 ${article.color || 'border-[#00C2CB]'} bg-white rounded-2xl hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className="text-[#00C2CB] mb-4 group-hover:scale-110 transition-transform">
                  <Newspaper size={32} />
                </div>
                <h4 className="font-bold text-[#0B1E3B] mb-2">{article.title || 'Story'}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {article.excerpt || 'Details coming soon.'}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase text-[#00C2CB] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlog;
