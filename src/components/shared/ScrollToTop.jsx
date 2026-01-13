import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash (anchor), try to scroll to that element, otherwise scroll to top
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // use a small delay to ensure element is rendered
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        return;
      }
    }

    // Default: scroll to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}
