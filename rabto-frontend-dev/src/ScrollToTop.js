// ScrollToTop.js

import { useEffect } from 'react';

function ScrollToTop() {
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollTo(0, 0);
    };

    // Listen for the popstate event, which is triggered when the user navigates back or forward in their history.
    window.addEventListener('popstate', scrollHandler);

    // Scroll to top when the component is mounted (page load) as well
    window.scrollTo(0, 0);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('popstate', scrollHandler);
    };
  }, []);

  return null;
}

export default ScrollToTop;
