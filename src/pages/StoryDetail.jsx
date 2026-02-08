import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';
import Layout from '@/components/shared/Layout';
import { storyService } from '@/services/workstreamService';

const StoryDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const data = await storyService.getOne(slug);
        setStory(data || null);
      } catch (err) {
        console.error('Failed to fetch story:', err);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStory();
    } else {
      setLoading(false);
      setStory(null);
    }
  }, [slug]);

  const displayDate = useMemo(() => {
    const rawDate = story?.date || story?.published_at || story?.publishedAt || story?.createdAt;
    if (!rawDate) return null;
    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) return rawDate;
    return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }, [story]);

  const hasHtmlContent = useMemo(() => {
    const content = story?.content || story?.body || '';
    return /<[^>]+>/.test(content);
  }, [story]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#00C2CB]" />
        </div>
      </Layout>
    );
  }

  if (!story) {
    return (
      <Layout>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-6 py-24">
            <Link to="/blog" className="inline-flex items-center text-unda-teal font-bold mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back to Stories
            </Link>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
              <h1 className="text-3xl font-black text-unda-navy mb-3">Story not found</h1>
              <p className="text-slate-600">We couldn’t load this story. Please try another one.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <section className="pt-36 pb-16 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/blog" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Stories</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                {story.title || 'Story'}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                {story.category && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold uppercase tracking-widest">
                    <Tag size={14} /> {story.category}
                  </span>
                )}
                {displayDate && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} /> {displayDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {story.cover_image || story.coverImage || story.image ? (
                <div className="mb-10 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                  <img
                    src={story.cover_image || story.coverImage || story.image}
                    alt={story.title || 'Story cover'}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ) : null}

              {story.excerpt && (
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {story.excerpt}
                </p>
              )}

              {story.content || story.body ? (
                <div className="prose prose-slate max-w-none">
                  {hasHtmlContent ? (
                    <div dangerouslySetInnerHTML={{ __html: story.content || story.body }} />
                  ) : (
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {story.content || story.body}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-slate-600">Full story content will appear here once published.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default StoryDetail;
