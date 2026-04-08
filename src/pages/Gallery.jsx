import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Image, Video, Camera, Play, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryService } from '@/services/workstreamService';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [failedImages, setFailedImages] = useState(new Set());
  const [failedVideoThumbnails, setFailedVideoThumbnails] = useState(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const isImageThumbnail = (url) => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/.test(cleanUrl);
  };

  const handleImageError = (photoId) => {
    setFailedImages(prev => new Set([...prev, photoId]));
  };

  const handleVideoThumbnailError = (videoId) => {
    setFailedVideoThumbnails(prev => new Set([...prev, videoId]));
  };

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const [photosRes, videosRes] = await Promise.all([
          galleryService.getPhotos().catch(() => null),
          galleryService.getVideos().catch(() => null)
        ]);
        setPhotos(photosRes?.length ? photosRes : []);
        setVideos(videosRes?.length ? videosRes : []);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        setPhotos([]);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
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
        {/* Lightbox Modal */}
        {lightboxOpen && photos.length > 0 && (
          <div 
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-20 right-4 md:top-6 md:right-6 p-4 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition z-[210]"
              aria-label="Close gallery lightbox"
            >
              <X size={24} className="text-white" />
            </button>

            <div 
              className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="flex items-center justify-center w-full h-full">
                {photos[selectedPhotoIndex]?.url && !failedImages.has(photos[selectedPhotoIndex]?.id) ? (
                  <img
                    src={photos[selectedPhotoIndex].url}
                    alt={photos[selectedPhotoIndex].title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={() => handleImageError(photos[selectedPhotoIndex].id)}
                  />
                ) : (
                  <div className="text-center text-white">
                    <Image size={64} className="mx-auto mb-4 text-slate-400" />
                    <p>{photos[selectedPhotoIndex]?.title || 'Photo'}</p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 p-4 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={28} className="text-white" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 p-4 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={28} className="text-white" />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white text-sm font-medium">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>

              {/* Photo Title */}
              {photos[selectedPhotoIndex]?.title && (
                <div className="absolute top-6 left-6 bg-black/60 px-4 py-2 rounded-lg text-white max-w-md">
                  <p className="font-medium truncate">{photos[selectedPhotoIndex].title}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0090C0] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-6 z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 hero-overlay pointer-events-none z-10" />
          
          <div className="container mx-auto px-6 relative z-20">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Gallery & <span className="text-[#0B1E3B]">Moments.</span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed max-w-3xl">
                Our Gallery brings the UMV Prevention Program experience to life. Explore photos and videos capturing the energy, creativity, and impact of Unda Youth Network programs.
              </p>
            </div>
          </div>
        </section>

        {/* Photos Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Camera size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Photos</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {photos.length === 0 ? (
                  // Placeholder grid when no photos from API
                  [1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square rounded-2xl bg-[#F9FAFB]/30 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Image size={48} className="text-slate-300 mx-auto mb-3" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  photos.map((photo, index) => (
                    <div 
                      key={photo.id} 
                      onClick={() => openLightbox(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(index); }}
                      className="aspect-square rounded-2xl bg-[#F9FAFB]/30 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    >
                      {photo.url && !failedImages.has(photo.id) ? (
                        <img 
                          src={photo.url} 
                          alt={photo.title || 'Gallery photo'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          onError={() => handleImageError(photo.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                          <div className="text-center px-4">
                            <Image size={40} className="text-slate-300 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 font-medium">{photo.title || 'Photo'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-12 text-center">
                  <p className="text-slate-600 leading-relaxed">
                    Snapshots from UMV Debaters, UMV Campus, UMV Mtaani, community outreach, and UMV Quarterly & Annual Forums, showcasing youth engagement, learning, and creativity.
                  </p>
                </div>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="h-12 w-12 rounded-2xl bg-[#00C2CB]/10 flex items-center justify-center">
                  <Video size={24} className="text-[#00C2CB]" />
                </div>
                <h2 className="text-4xl font-black text-[#0B1E3B]">Videos</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {videos.length === 0 ? (
                  // Placeholder grid when no videos from API
                  [1, 2, 3, 4].map((item) => (
                    <div key={item} className="aspect-video rounded-2xl bg-[#F9FAFB]/30 border-t-4 border-[#00C2CB] hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Play size={32} className="text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  videos.map((video) => {
                    const hasImageThumbnail = isImageThumbnail(video.thumbnail_url);
                    const thumbnailFailed = failedVideoThumbnails.has(video.id);
                    
                    return (
                      <a
                        key={video.id}
                        href={video.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-video rounded-2xl bg-gradient-to-br from-[#0B1E3B] to-[#003f47] border-t-4 border-[#00C2CB] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer block"
                      >
                        {hasImageThumbnail && !thumbnailFailed ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={video.thumbnail_url} 
                              alt={video.title || 'Video'} 
                              className="w-full h-full object-cover" 
                              onError={() => handleVideoThumbnailError(video.id)}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                              <div className="h-16 w-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play size={32} className="text-white ml-1" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1E3B]/5 to-[#00C2CB]/5">
                            <div className="h-16 w-16 rounded-full bg-[#00C2CB]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                              <Play size={32} className="text-[#00C2CB] ml-1" />
                            </div>
                            <p className="text-sm text-slate-500 font-medium text-center px-4">{video.title || 'Video'}</p>
                          </div>
                        )}
                      </a>
                    );
                  })
                )}
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-600 leading-relaxed">
                  Highlights from podcasts, debates, workshops, and community events, providing a closer look at how young people are driving mental-health prevention across schools, campuses, and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0B1E3B] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-6">
              Join the <span className="text-[#0090C0]">Movement</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Be part of the moments we capture. Participate in UMV programs and help us create more impactful stories.
            </p>
            <Link to="/membership" className="inline-flex items-center h-14 px-8 rounded-2xl bg-[#0090C0] text-[#0B1E3B] hover:bg-[#00C2CB] hover:text-white text-lg font-bold transition-colors">
              Get Involved
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Gallery;
