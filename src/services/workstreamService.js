/**
 * Workstream API Service
 * 
 * Provides CRUD operations for workstreams managed via the admin dashboard:
 * - Programs (pillars, program streams)
 * - Resources (publications, toolkits)
 * - Stories/Blog articles
 * - Gallery (photos, videos)
 * 
 * All content is managed in the backend admin under /admin/workstreams
 */

import api from './apiService';

// ============================================================================
// HELPER: Extract array data from API responses
// Backend returns { success: true, count: N, <entity>: [...] } or just arrays
// ============================================================================

const extractArray = (data, ...keys) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  // Try each possible key in order
  for (const key of keys) {
    if (Array.isArray(data[key])) return data[key];
  }
  // Fallback: look for any array property
  for (const value of Object.values(data)) {
    if (Array.isArray(value)) return value;
  }
  return [];
};

// ============================================================================
// PROGRAMS / WORKSTREAMS
// ============================================================================

export const programService = {
  // Get all programs/workstreams
  getAll: async () => {
    const response = await api.get('/api/workstreams/programs');
    return extractArray(response.data, 'programs', 'items', 'data');
  },

  // Get a single program by ID or slug
  getOne: async (idOrSlug) => {
    const response = await api.get(`/api/workstreams/programs/${idOrSlug}`);
    return response.data?.program || response.data;
  },

  // Get program pillars (Awareness, Access, Advocacy)
  getPillars: async () => {
    const response = await api.get('/api/workstreams/pillars');
    return extractArray(response.data, 'pillars', 'items', 'data');
  },

  // Get featured/highlighted programs for homepage
  getFeatured: async () => {
    const response = await api.get('/api/workstreams/programs/featured');
    return extractArray(response.data, 'programs', 'items', 'data');
  }
};

// ============================================================================
// RESOURCES (Publications, Toolkits)
// ============================================================================

export const resourceService = {
  // Get all resources
  getAll: async () => {
    const response = await api.get('/api/workstreams/resources');
    return extractArray(response.data, 'resources', 'items', 'data');
  },

  // Get resources by category (publications, toolkits, guides)
  getByCategory: async (category) => {
    const response = await api.get(`/api/workstreams/resources?category=${category}`);
    return extractArray(response.data, 'resources', 'items', 'data');
  },

  // Get a single resource by ID
  getOne: async (id) => {
    const response = await api.get(`/api/workstreams/resources/${id}`);
    return response.data?.resource || response.data;
  },

  // Get publications
  getPublications: async () => {
    const response = await api.get('/api/workstreams/resources?category=publication');
    return extractArray(response.data, 'resources', 'items', 'data');
  },

  // Get toolkits
  getToolkits: async () => {
    const attempts = [
      () => api.get('/api/workstreams/resources?category=toolkit'),
      () => api.get('/api/workstreams/resources?category=toolkits'),
      () => api.get('/api/workstreams/resources?category=institutional_toolkit'),
      () => api.get('/api/workstreams/toolkits'),
      () => api.get('/api/toolkit'),
      () => api.get('/api/toolkits')
    ];

    for (const attempt of attempts) {
      try {
        const response = await attempt();
        const items = extractArray(response.data, 'resources', 'items', 'data', 'toolkits', 'toolkit');
        if (items.length) return items;
      } catch (err) {
        // Continue to next attempt
      }
    }

    return [];
  }
};

// ============================================================================
// STORIES / BLOG ARTICLES
// ============================================================================

export const storyService = {
  // Get all stories/articles
  getAll: async () => {
    const response = await api.get('/api/workstreams/stories');
    return extractArray(response.data, 'stories', 'items', 'data');
  },

  // Get stories by category
  getByCategory: async (category) => {
    const response = await api.get(`/api/workstreams/stories?category=${category}`);
    return extractArray(response.data, 'stories', 'items', 'data');
  },

  // Get a single story by ID or slug
  getOne: async (idOrSlug) => {
    const response = await api.get(`/api/workstreams/stories/${idOrSlug}`);
    return response.data?.story || response.data;
  },

  // Get latest stories (for homepage)
  getLatest: async (limit = 4) => {
    const response = await api.get(`/api/workstreams/stories?limit=${limit}&sort=latest`);
    return extractArray(response.data, 'stories', 'items', 'data');
  },

  // Get featured stories
  getFeatured: async () => {
    const response = await api.get('/api/workstreams/stories?featured=true');
    return extractArray(response.data, 'stories', 'items', 'data');
  }
};

// ============================================================================
// GALLERY (Photos, Videos)
// ============================================================================

/**
 * Helper to extract gallery items from API response.
 * Backend returns { items: [], count: N, success: true } or { galleries: [] }
 * We also fetch from /api/media-galleries as fallback since admin uploads there.
 */
const extractGalleryItems = (data) => {
  if (!data) return [];
  // Handle array response directly
  if (Array.isArray(data)) return data;
  // Handle { items: [...] } structure
  if (Array.isArray(data.items)) return data.items;
  // Handle { galleries: [...] } structure from media-galleries endpoint
  if (Array.isArray(data.galleries)) {
    // Flatten all items from all galleries
    return data.galleries.flatMap(gallery => 
      (gallery.items || []).map(item => ({
        ...item,
        gallery_name: gallery.name,
        gallery_id: gallery.id
      }))
    );
  }
  return [];
};

/**
 * Fetch gallery items, trying workstreams endpoint first, then media-galleries
 */
const fetchGalleryWithFallback = async (type = null) => {
  let items = [];
  
  // Try primary workstreams/gallery endpoint
  try {
    const params = type ? `?type=${type}` : '';
    const response = await api.get(`/api/workstreams/gallery${params}`);
    items = extractGalleryItems(response.data);
  } catch (err) {
    console.warn('Workstreams gallery endpoint failed:', err.message);
  }
  
  // If no items, try media-galleries endpoint (where admin uploads go)
  if (items.length === 0) {
    try {
      const response = await api.get('/api/media-galleries');
      const allItems = extractGalleryItems(response.data);
      // Filter by type if specified
      if (type && allItems.length > 0) {
        items = allItems.filter(item => 
          item.type === type || 
          item.media_type === type ||
          (type === 'photo' && (item.type === 'image' || item.media_type === 'image')) ||
          (type === 'video' && (item.type === 'video' || item.media_type === 'video'))
        );
      } else {
        items = allItems;
      }
    } catch (err) {
      console.warn('Media galleries endpoint failed:', err.message);
    }
  }
  
  return items;
};

export const galleryService = {
  // Get all gallery items
  getAll: async () => {
    return await fetchGalleryWithFallback();
  },

  // Get gallery items by type (photo, video)
  getByType: async (type) => {
    return await fetchGalleryWithFallback(type);
  },

  // Get photos
  getPhotos: async () => {
    return await fetchGalleryWithFallback('photo');
  },

  // Get videos
  getVideos: async () => {
    return await fetchGalleryWithFallback('video');
  },

  // Get a single gallery item by ID
  getOne: async (id) => {
    const response = await api.get(`/api/workstreams/gallery/${id}`);
    return response.data;
  },

  // Get featured gallery items (for homepage highlights)
  getFeatured: async () => {
    const items = await fetchGalleryWithFallback();
    return items.filter(item => item.featured);
  }
};

// ============================================================================
// EVENTS (if needed)
// ============================================================================

export const eventService = {
  // Get all events
  getAll: async () => {
    const response = await api.get('/api/workstreams/events');
    return extractArray(response.data, 'events', 'items', 'data');
  },

  // Get upcoming events
  getUpcoming: async (program = null) => {
    const params = new URLSearchParams({ status: 'Upcoming' });
    if (program) params.append('program', program);
    const response = await api.get(`/api/workstreams/events?${params.toString()}`);
    return extractArray(response.data, 'events', 'items', 'data');
  },

  // Get events by program type
  getByProgram: async (program, status = null) => {
    const params = new URLSearchParams({ program });
    if (status) params.append('status', status);
    const response = await api.get(`/api/workstreams/events?${params.toString()}`);
    return extractArray(response.data, 'events', 'items', 'data');
  },

  // Get a single event by ID or slug
  getOne: async (idOrSlug) => {
    const response = await api.get(`/api/workstreams/events/${idOrSlug}`);
    return response.data?.event || response.data;
  }
};

// Default export for convenience
export default {
  programs: programService,
  resources: resourceService,
  stories: storyService,
  gallery: galleryService,
  events: eventService
};
