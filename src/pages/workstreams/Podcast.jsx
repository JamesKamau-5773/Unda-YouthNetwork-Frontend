import React, { useState, useEffect } from "react";
import { Play, Mic2, Calendar, Share2, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/apiService";

const Podcast = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await api.get('/api/podcasts');
        console.log('📡 Podcasts API Response:', response.data);
        console.log('📊 Total podcasts from backend:', response.data?.total || 0);
        
        if (response.data?.podcasts && Array.isArray(response.data.podcasts)) {
          if (response.data.podcasts.length > 0) {
            console.log('✅ Using real podcasts from backend:', response.data.podcasts);
            console.log('🔍 First podcast structure:', response.data.podcasts[0]);
            
            // Map backend fields to frontend expected fields
            const mappedEpisodes = response.data.podcasts.map(podcast => ({
              id: podcast.id,
              title: podcast.title || podcast.name || 'Untitled Episode',
              guest: podcast.guest || podcast.host || 'TBA',
              duration: podcast.duration || podcast.length || 'N/A',
              module: podcast.module || podcast.category || podcast.episode || 'General',
              date: podcast.date || podcast.published_date || podcast.created_at || 'Recent',
              // Keep original data for debugging
              ...podcast
            }));
            
            console.log('🗺️ Mapped episodes:', mappedEpisodes);
            setEpisodes(mappedEpisodes);
          } else {
            console.warn('⚠️ Backend returned empty podcasts array');
            setEpisodes([]);
          }
        } else {
          console.error('❌ Unexpected API response structure:', response.data);
          setEpisodes([]);
        }
      } catch (err) {
        console.error('❌ Podcasts API error:', err.message);
        setEpisodes([]);
        setError('Failed to load podcasts from backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handlePlayEpisode = (episode) => {
    setPlayingEpisode(episode);
    setShowPlayerModal(true);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getMediaType = (url) => {
    if (!url) return null;
    
    // Check for YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }
    
    // Check for Spotify
    if (url.includes('spotify.com')) {
      return 'spotify';
    }
    
    // Check for SoundCloud
    if (url.includes('soundcloud.com')) {
      return 'soundcloud';
    }
    
    // Check file extension for direct media files
    const extension = url.split('.').pop().toLowerCase().split('?')[0];
    
    // Audio formats
    if (['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(extension)) {
      return 'audio';
    }
    
    // Video formats
    if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(extension)) {
      return 'video';
    }
    
    return 'unknown';
  };

  const getSpotifyEmbedUrl = (url) => {
    const match = url.match(/spotify\.com\/(episode|show|playlist)\/([^?]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    }
    return url;
  };

  const PlayerModal = () => {
    const mediaUrl = playingEpisode?.audioUrl || playingEpisode?.audio_url;
    const mediaType = getMediaType(mediaUrl);

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-3xl">
            <div>
              <h2 className="text-xl font-black text-[#0B1E3B]">{playingEpisode?.title}</h2>
              <p className="text-sm text-slate-500 mt-1">Guest: {playingEpisode?.guest || 'N/A'}</p>
            </div>
            <button onClick={() => setShowPlayerModal(false)} className="p-2 hover:bg-slate-100 rounded-xl">
              <X size={20} className="text-slate-400" />
            </button>
          </div>
          <div className="p-6">
            {!mediaUrl ? (
              <div className="aspect-video w-full bg-slate-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Play size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-medium">No media available for this episode</p>
                </div>
              </div>
            ) : mediaType === 'youtube' ? (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(mediaUrl)}
                  title={playingEpisode?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-2xl"
                ></iframe>
              </div>
            ) : mediaType === 'spotify' ? (
              <div className="w-full" style={{ height: '380px' }}>
                <iframe
                  src={getSpotifyEmbedUrl(mediaUrl)}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                ></iframe>
              </div>
            ) : mediaType === 'soundcloud' ? (
              <div className="w-full">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(mediaUrl)}&color=%2323b5a8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                  className="rounded-2xl"
                ></iframe>
              </div>
            ) : mediaType === 'audio' ? (
              <div className="w-full p-8 bg-gradient-to-br from-[#00C2CB]/10 to-[#0B1E3B]/10 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-2xl bg-[#00C2CB] flex items-center justify-center">
                    <Mic2 size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0B1E3B]">{playingEpisode?.title}</h3>
                    <p className="text-sm text-slate-500">{playingEpisode?.duration || 'Audio Podcast'}</p>
                  </div>
                </div>
                <audio
                  controls
                  className="w-full"
                  style={{ height: '54px' }}
                  src={mediaUrl}
                  preload="metadata"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : mediaType === 'video' ? (
              <div className="aspect-video w-full">
                <video
                  controls
                  className="w-full h-full rounded-2xl bg-black"
                  src={mediaUrl}
                  preload="metadata"
                >
                  Your browser does not support the video element.
                </video>
              </div>
            ) : (
              <div className="p-8 bg-slate-50 rounded-2xl text-center">
                <p className="text-slate-600 font-medium mb-4">Unsupported media format</p>
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C2CB] text-white rounded-xl font-bold hover:bg-[#0B1E3B] transition-all"
                >
                  Open in New Tab <ArrowRight size={16} />
                </a>
              </div>
            )}
            
            {/* Episode Details */}
            {playingEpisode && (
              <div className="mt-6 p-6 bg-slate-50 rounded-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {playingEpisode.module && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Module</p>
                      <p className="text-sm font-bold text-[#0B1E3B]">{playingEpisode.module}</p>
                    </div>
                  )}
                  {playingEpisode.duration && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                      <p className="text-sm font-bold text-[#0B1E3B]">{playingEpisode.duration}</p>
                    </div>
                  )}
                  {playingEpisode.date && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-bold text-[#0B1E3B]">{playingEpisode.date}</p>
                    </div>
                  )}
                      {playingEpisode.episode && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Episode</p>
                      <p className="text-sm font-bold text-[#0B1E3B]">{playingEpisode.episode}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent pb-24">
      {showPlayerModal && <PlayerModal />}
      
      {/* 1. HERO SECTION: Asymmetrical & Bold */}
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00C2CB]/[0.03] -skew-x-12 translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Mic2 className="text-[#00C2CB]" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1E3B]">
                  Featured Conversation
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-[#0B1E3B] leading-[0.9] tracking-tighter">
                UMV <br />
                <span className="text-[#00C2CB]">Podcast</span>
                <br />
                Stories.
              </h1>

              <p className="text-slate-600 text-xl font-medium max-w-xl leading-relaxed">
                The UMV Podcast is our social driver—youth-led storytelling and expert conversations that translate prevention science into accessible narratives and community action.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="h-16 px-8 rounded-2xl bg-gradient-to-r from-[#0B1E3B] to-[#00C2CB] text-white text-lg font-bold shadow-2xl transform transition hover:scale-[1.02]">
                  <Play className="mr-3" size={20} />
                  Listen Now
                </Button>
                <Button
                  variant="outline"
                  className="h-16 px-8 rounded-2xl border-slate-200 text-[#0B1E3B] font-bold hover:bg-slate-50"
                >
                  Browse Archive
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-[3.5rem] bg-gradient-to-tr from-[#0B1E3B] via-[#003f47] to-[#00C2CB] flex items-center justify-center relative overflow-hidden shadow-2xl ring-1 ring-black/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00C2CB]/30 to-transparent opacity-60" />
                <Mic2 size={120} className="text-white opacity-18" />
                <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/6 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-white text-[11px] font-black uppercase tracking-widest mb-1">
                      Now Playing
                    </p>
                    <p className="text-white text-base font-bold leading-tight">
                      Resilience in Modern Kenya
                    </p>
                  </div>
                  <div className="text-white/60 text-sm font-medium">▶︎ 03:24</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EPISODE LIST: Professional & High-Contrast */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
          <div>
              <h2 className="text-3xl font-black text-[#0B1E3B] tracking-tight">
              Recent Sessions
            </h2>
            <p className="text-slate-500 font-bold text-sm mt-2 uppercase tracking-widest">
              Prevention Literacy Track
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Filter By Module
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {loading ? (
              <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-[#00C2CB]" size={48} />
            </div>
          ) : episodes.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-medium">No episodes available yet.</p>
            </div>
          ) : (
            episodes.map((ep, idx) => (
              <div
                key={ep.id || idx}
                role="button"
                tabIndex={0}
                onClick={() => handlePlayEpisode(ep)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlayEpisode(ep); } }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#00C2CB] hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handlePlayEpisode(ep)}
                    className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#00C2CB] to-[#0090C0] text-white flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
                  >
                    <Play size={24} />
                  </button>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-3 py-1 rounded-full bg-[#00C2CB]/5 text-[#00C2CB] text-[10px] font-bold uppercase tracking-widest">
                        {ep.module}
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Calendar size={12} /> {ep.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1E3B] group-hover:text-[#00C2CB] transition-colors">
                      {ep.title}
                    </h3>
                    <p className="text-slate-600 font-medium text-sm">
                      Guest: {ep.guest}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mr-4">
                    {ep.duration}
                  </span>
                  <Button
                    variant="ghost"
                    className="rounded-xl hover:bg-[#00C2CB]/10"
                  >
                    <Share2 size={18} className="text-[#0B1E3B]" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Podcast;
