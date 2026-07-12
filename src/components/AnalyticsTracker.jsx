import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeAnalytics, trackPageView, initializeClarity } from '../utils/analytics';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Automatically initialize analytics when component mounts (application loads)
    initializeAnalytics();
    initializeClarity();
  }, []);

  useEffect(() => {
    // Automatically track page view on route changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
