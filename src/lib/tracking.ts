// Everflow affiliate tracking parameter management

const TRACKING_STORAGE_KEY = 'everflow_tracking_params';

// List of Everflow tracking parameters to capture
const EVERFLOW_PARAMS = [
  '_ef_transaction_id',
  'affid',
  'sid',
  'c1',
  'c2',
  'c3',
  'oid',
  'uid',
  'source_id',
  'affiliate_id',
  'offer_id',
  'sub1',
  'sub2',
  'sub3',
  'sub4',
  'sub5',
] as const;

interface TrackingParams {
  [key: string]: string;
}

/**
 * Capture tracking parameters from URL and store them in sessionStorage
 * Should be called once on app initialization
 */
export function captureTrackingParams(): void {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingParams: TrackingParams = {};
    
    // Extract all Everflow parameters from URL
    EVERFLOW_PARAMS.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        trackingParams[param] = value;
      }
    });
    
    // Only store if we found at least one tracking parameter
    if (Object.keys(trackingParams).length > 0) {
      sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(trackingParams));
      console.log('Captured Everflow tracking parameters:', trackingParams);
    }
  } catch (error) {
    console.error('Error capturing tracking parameters:', error);
  }
}

/**
 * Retrieve stored tracking parameters
 */
export function getTrackingParams(): TrackingParams {
  try {
    const stored = sessionStorage.getItem(TRACKING_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error retrieving tracking parameters:', error);
  }
  return {};
}

/**
 * Append tracking parameters to a URL
 */
export function appendTrackingParams(baseUrl: string): string {
  const trackingParams = getTrackingParams();
  
  if (Object.keys(trackingParams).length === 0) {
    return baseUrl;
  }
  
  try {
    const url = new URL(baseUrl);
    
    // Append each tracking parameter
    Object.entries(trackingParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    
    const finalUrl = url.toString();
    console.log('Appended tracking parameters to checkout URL:', finalUrl);
    return finalUrl;
  } catch (error) {
    console.error('Error appending tracking parameters:', error);
    return baseUrl;
  }
}

/**
 * Clear stored tracking parameters
 */
export function clearTrackingParams(): void {
  sessionStorage.removeItem(TRACKING_STORAGE_KEY);
}
