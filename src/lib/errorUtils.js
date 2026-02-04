// Centralized error parsing utility
// Returns a short, user-friendly message for display, and preserves raw data in console for debugging.
export function parseErrorForUser(err) {
  if (!err) return 'Something went wrong. Please try again.';

  // Axios timeout or network error detection
  // Axios sets `code === 'ECONNABORTED'` for timeouts and message may contain 'timeout'
  if (err.code === 'ECONNABORTED' || (err.message && /timeout|network error/i.test(err.message))) {
    return 'Server not responding. Please check your connection and try again.';
  }

  const status = err?.response?.status;
  const data = err?.response?.data;

  // Authentication / permission
  if (status === 401) return 'You are not signed in. Please sign in and try again.';
  if (status === 403) return 'You do not have permission to perform this action.';

  // Bad request - try to extract a message
  if (status === 400) {
    if (data && typeof data === 'string') {
      const txt = data.replace(/<[^>]*>/g, '').trim();
      return txt || 'Invalid input. Please check your entries.';
    }
    if (data && typeof data === 'object' && data.message) return data.message;
    return 'Invalid input. Please check your entries.';
  }

  // Server errors
  if (status >= 500) return 'Server error. Please try again later.';

  // HTML error pages — don't show raw HTML to users
  if (data && typeof data === 'string' && data.trim().startsWith('<')) {
    return 'Unexpected server response. Please try again later.';
  }

  // Generic object message
  if (data && typeof data === 'object' && data.message) return data.message;

  // Fallback to error.message or a generic line
  if (err.message) return err.message;
  return 'Something went wrong. Please try again.';
}

export default parseErrorForUser;
