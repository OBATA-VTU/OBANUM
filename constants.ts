
// API Configuration
export const API_KEY = 'd82e1fdc1c6adbe2f93436c8bfbe1c6a6cec6dc2ab7dac54018b4d1aeb2970c0';

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
