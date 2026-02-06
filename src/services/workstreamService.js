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
// PROGRAMS / WORKSTREAMS
// ============================================================================

export const programService = {
  // Get all programs/workstreams
  getAll: async () => {
    const response = await api.get('/api/workstreams/programs');
    return response.data;
  },

  // Get a single program by ID or slug
  getOne: async (idOrSlug) => {
    const response = await api.get(`/api/workstreams/programs/${idOrSlug}`);
    return response.data;
  },

  // Get program pillars (Awareness, Access, Advocacy)
  getPillars: async () => {
    const response = await api.get('/api/workstreams/pillars');
    return response.data;
  },

  // Get featured/highlighted programs for homepage
  getFeatured: async () => {
    const response = await api.get('/api/workstreams/programs/featured');
    return response.data;
  }
};

// ============================================================================
// RESOURCES (Publications, Toolkits)
// ============================================================================

export const resourceService = {
  // Get all resources
  getAll: async () => {
    const response = await api.get('/api/workstreams/resources');
    return response.data;
  },

  // Get resources by category (publications, toolkits, guides)
  getByCategory: async (category) => {
    const response = await api.get(`/api/workstreams/resources?category=${category}`);
    return response.data;
  },

  // Get a single resource by ID
  getOne: async (id) => {
    const response = await api.get(`/api/workstreams/resources/${id}`);
    return response.data;
  },

  // Get publications
  getPublications: async () => {
    const response = await api.get('/api/workstreams/resources?category=publication');
    return response.data;
  },

  // Get toolkits
  getToolkits: async () => {
    const response = await api.get('/api/workstreams/resources?category=toolkit');
    return response.data;
  }
};

// ============================================================================
// STORIES / BLOG ARTICLES
// ============================================================================

export const storyService = {
  // Get all stories/articles
  getAll: async () => {
    const response = await api.get('/api/workstreams/stories');
    return response.data;
  },

  // Get stories by category
  getByCategory: async (category) => {
    const response = await api.get(`/api/workstreams/stories?category=${category}`);
    return response.data;
  },

  // Get a single story by ID or slug
  getOne: async (idOrSlug) => {
    const response = await api.get(`/api/workstreams/stories/${idOrSlug}`);
    return response.data;
  },

  // Get latest stories (for homepage)
  getLatest: async (limit = 4) => {
    const response = await api.get(`/api/workstreams/stories?limit=${limit}&sort=latest`);
    return response.data;
  },

  // Get featured stories
  getFeatured: async () => {
    const response = await api.get('/api/workstreams/stories?featured=true');
    return response.data;
  }
};

// ============================================================================
// GALLERY (Photos, Videos)
// ============================================================================

export const galleryService = {
  // Get all gallery items
  getAll: async () => {
    const response = await api.get('/api/workstreams/gallery');
    return response.data;
  },

  // Get gallery items by type (photo, video)
  getByType: async (type) => {
    const response = await api.get(`/api/workstreams/gallery?type=${type}`);
    return response.data;
  },

  // Get photos
  getPhotos: async () => {
    const response = await api.get('/api/workstreams/gallery?type=photo');
    return response.data;
  },

  // Get videos
  getVideos: async () => {
    const response = await api.get('/api/workstreams/gallery?type=video');
    return response.data;
  },

  // Get a single gallery item by ID
  getOne: async (id) => {
    const response = await api.get(`/api/workstreams/gallery/${id}`);
    return response.data;
  },

  // Get featured gallery items (for homepage highlights)
  getFeatured: async () => {
    const response = await api.get('/api/workstreams/gallery?featured=true');
    return response.data;
  }
};

// ============================================================================
// EVENTS (if needed)
// ============================================================================

export const eventService = {
  // Get all events
  getAll: async () => {
    const response = await api.get('/api/workstreams/events');
    return response.data;
  },

  // Get upcoming events
  getUpcoming: async (program = null) => {
    const params = new URLSearchParams({ status: 'Upcoming' });
    if (program) params.append('program', program);
    const response = await api.get(`/api/workstreams/events?${params.toString()}`);
    return response.data;
  },

  // Get events by program type
  getByProgram: async (program, status = null) => {
    const params = new URLSearchParams({ program });
    if (status) params.append('status', status);
    const response = await api.get(`/api/workstreams/events?${params.toString()}`);
    return response.data;
  },

  // Get a single event by ID or slug
  getOne: async (idOrSlug) => {
    const response = await api.get(`/api/workstreams/events/${idOrSlug}`);
    return response.data;
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
