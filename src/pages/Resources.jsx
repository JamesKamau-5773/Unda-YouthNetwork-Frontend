import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, BookOpen, FileText, Heart, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { resourceService } from '@/services/workstreamService';

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [publications, setPublications] = useState([]);
  const [toolkits, setToolkits] = useState([]);
  const [toolkitNotice, setToolkitNotice] = useState('');
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isPublicationDialogOpen, setIsPublicationDialogOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const [pubsRes, toolkitsRes] = await Promise.all([
          resourceService.getPublications().catch(() => null),
          resourceService.getToolkits().catch(() => null)
        ]);
        setPublications(pubsRes?.length ? pubsRes : []);
        setToolkits(toolkitsRes?.length ? toolkitsRes : []);
      } catch (err) {
        console.error('Failed to fetch resources:', err);
        setPublications([]);
        setToolkits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const resolveToolkitUrl = (toolkit) => (
    toolkit?.download_url ||
    toolkit?.file_url ||
    toolkit?.fileUrl ||
    toolkit?.document_url ||
    toolkit?.documentUrl ||
    toolkit?.pdf_url ||
    toolkit?.pdfUrl ||
    toolkit?.url ||
    toolkit?.link
  );

  const resolvePublicationUrl = (publication) => (
    publication?.download_url ||
    publication?.file_url ||
    publication?.fileUrl ||
    publication?.document_url ||
    publication?.documentUrl ||
    publication?.pdf_url ||
    publication?.pdfUrl ||
    publication?.url ||
    publication?.link ||
    (Array.isArray(publication?.attachments) ? publication.attachments[0]?.url : null)
  );

  const handleToolkitClick = async (toolkit) => {
    const directUrl = resolveToolkitUrl(toolkit);
    if (directUrl) {
      window.open(directUrl, '_blank', 'noopener,noreferrer');
      setToolkitNotice('');
      return;
    }
    console.error('Toolkit missing download URL; unable to open resource.', toolkit);
    setToolkitNotice('This resource is not ready for download yet. Please check back soon or contact us if you need access.');
  };

  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
    setIsPublicationDialogOpen(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-transparent">
          <section className="pt-40 pb-20 bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] relative overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <div className="h-10 w-2/3 bg-white/30 rounded mb-4 animate-pulse" />
                <div className="h-5 w-full bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </section>
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="p-8 border border-slate-100 rounded-2xl animate-pulse">
                    <div className="h-5 w-1/2 bg-slate-200 rounded mb-3" />
                    <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-5/6 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 hero-overlay z-10 pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-20">
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

        {/* Publications (placeholder until backend supplies materials) */}
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
                {publications.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm text-center">
                    <h3 className="text-3xl font-black text-[#0B1E3B] mb-3">Check back soon</h3>
                    <p className="text-slate-500 mb-6">Publications and downloadable reports will appear here once they're published.</p>
                  </div>
                ) : (
                  publications.map((pub) => {
                    const downloadUrl = resolvePublicationUrl(pub);
                    const summary = pub.summary || pub.description || pub.content;
                    return (
                      <div 
                        key={pub.id} 
                        onClick={() => handlePublicationClick(pub)}
                        className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#00C2CB] transition-all duration-300 cursor-pointer group"
                      >
                        <h3 className="text-2xl font-black text-[#0B1E3B] mb-3 group-hover:text-[#00C2CB] transition-colors">{pub.title}</h3>
                        {summary && <p className="text-slate-600 mb-4 line-clamp-3">{summary}</p>}
                        <div className="inline-flex items-center text-[#00C2CB] font-bold">
                          <ArrowRight size={16} className="mr-2" /> Read More
                        </div>
                      </div>
                    );
                  })
                )}
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
                {toolkits.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 border border-slate-100 text-center">
                    <p className="text-slate-500 font-bold mb-4">No toolkits published yet.</p>
                  </div>
                ) : (
                  <div>
                    {toolkitNotice && (
                      <div className="mb-4 rounded-xl border border-[#00C2CB]/20 bg-[#E0F7FA] px-4 py-3 text-sm text-[#006064]">
                        {toolkitNotice}
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                    {toolkits.map((toolkit) => {
                      const key = toolkit.id || toolkit._id || toolkit;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleToolkitClick(toolkit)}
                          className="p-4 bg-white rounded-xl border border-slate-100 hover:border-[#00C2CB] hover:shadow-md transition-all duration-200 block text-left w-full"
                        >
                          <p className="font-bold text-[#0B1E3B]">{toolkit.title || toolkit}</p>
                          <div className="text-xs text-[#00C2CB] font-bold mt-2 inline-flex items-center">
                            <Download size={12} className="mr-1" /> View Toolkit
                          </div>
                        </button>
                      );
                    })}
                    </div>
                  </div>
                )}
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

        {/* Parents & Caregivers (NEW) */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Heart size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Parents &amp; Caregivers</h2>
              </div>

              <div className="bg-[#F9FAFB]/30 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #00C2CB 0%, #0090C0 50%, #008ba3 100%)' }} />
                <div className="pt-3">
                <h3 className="text-2xl font-black text-[#0B1E3B] mb-3">MindRoots Parent Circle</h3>
                <p className="text-slate-600 leading-relaxed mb-4">Prevention support and family psychoeducation to enhance parent-youth conversation and proactive action.</p>
                <div className="flex items-center gap-4">
                  <a href="/mindroots-parent-circle" className="text-unda-teal font-bold">Learn more</a>
                  <Button asChild className="px-3 py-1.5 rounded-lg bg-white/40 backdrop-blur-sm border border-white/30 text-[#0B1E3B] hover:bg-[#00C2CB] hover:text-[#0B1E3B] hover:border-transparent text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2CB]/30">
                    <a href="https://www.skool.com/mindroots-parent-circle-2411/about" target="_blank" rel="noopener noreferrer">Join the Parent Circle</a>
                  </Button>
                </div>
                </div>
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
              New resources are added regularly. Join the network to stay updated on the latest tools, guides, and research.
            </p>
          </div>
        </section>
      </div>

      {/* Publication Detail Dialog */}
      <Dialog open={isPublicationDialogOpen} onOpenChange={setIsPublicationDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-[#0B1E3B] pr-8">
              {selectedPublication?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {/* Full content */}
            {(selectedPublication?.content || selectedPublication?.description || selectedPublication?.summary) && (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedPublication?.content || selectedPublication?.description || selectedPublication?.summary}
                </p>
              </div>
            )}

            {/* Download button */}
            <div className="pt-4 border-t border-slate-200">
              {resolvePublicationUrl(selectedPublication) ? (
                <a
                  href={resolvePublicationUrl(selectedPublication)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C2CB] text-white font-bold rounded-lg hover:bg-[#0B1E3B] transition-colors"
                >
                  <Download size={18} />
                  Download Full Document
                  <ExternalLink size={16} />
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-300 text-slate-500 font-bold rounded-lg cursor-not-allowed opacity-60"
                  title="Download not available yet"
                >
                  <Download size={18} />
                  Download Not Available
                </button>
              )}
            </div>

            {/* Metadata if available */}
            {(selectedPublication?.author || selectedPublication?.published_date || selectedPublication?.date) && (
              <div className="pt-4 border-t border-slate-200 text-sm text-slate-500 space-y-1">
                {selectedPublication?.author && <p>Author: {selectedPublication.author}</p>}
                {(selectedPublication?.published_date || selectedPublication?.date) && (
                  <p>Published: {new Date(selectedPublication.published_date || selectedPublication.date).toLocaleDateString()}</p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Resources;