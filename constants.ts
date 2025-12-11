
// API Configuration
export const API_KEY = 'd2ae79d7c3d3d02411aadf637c345cb62ccdf344722c0bfdcbadec0f4ae12e1e';

// KEY FIX: Set this to the relative path '/api/proxy'.
// This forces the request to go through the Vercel Rewrite rules defined in vercel.json.
// Browser -> Vercel (Same Origin, No CORS) -> TalkDrove (Server-to-Server).
export const API_BASE_URL = '/api/proxy';

// The Real URL is needed for the fallback proxies to know where to go if Vercel fails (or on localhost)
export const REAL_API_URL = 'https://numbers.talkdrove.com/api/v1/developer';

// Helper to construct headers
export const API_HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
