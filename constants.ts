
// API Configuration
export const API_KEY = 'd2ae79d7c3d3d02411aadf637c345cb62ccdf344722c0bfdcbadec0f4ae12e1e';

// We default to the direct URL. The service layer handles CORS via proxy if needed.
// When deployed to Vercel, the rewrites in vercel.json will handle /api/proxy if we wanted to use it,
// but using the direct URL with the fallback mechanism is more robust for mixed environments.
export const API_BASE_URL = 'https://numbers.talkdrove.com/api/v1/developer';

// Helper to construct headers
export const API_HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
