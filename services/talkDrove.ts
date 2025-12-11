
import { API_BASE_URL, API_HEADERS } from '../constants';
import { TalkDroveNumber, TalkDroveOTP } from '../types';

// Helper to determine if we need to use a proxy
const PROXY_PREFIX = 'https://api.allorigins.win/raw?url=';

// Simple fetch wrapper to handle errors with retry logic
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}, useProxyRetry = true): Promise<T> => {
  const directUrl = `${API_BASE_URL}${endpoint}`;
  
  const performFetch = async (url: string) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_HEADERS,
        ...options.headers,
      },
    });

    if (!response.ok) {
        // Handle 404 specifically
        if (response.status === 404) throw new Error("404_NOT_FOUND");
        throw new Error(`API Error: ${response.status}`);
    }

    // Parse JSON
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        // Sometimes APIs return plain text or empty responses
        if (!text) return {} as T;
        throw new Error("Invalid JSON response");
    }
  };

  try {
    return await performFetch(directUrl);
  } catch (error: any) {
    // If we shouldn't retry, or if it's a specific auth error, throw immediately
    if (!useProxyRetry || error.message.includes('401')) {
        throw error;
    }

    // Check for conditions to retry with proxy:
    // 1. Network Error (CORS)
    // 2. 404 Not Found (Means local proxy route is missing, so we try direct via external proxy)
    const isNetworkError = error.name === 'TypeError' || error.message === 'Failed to fetch';
    const is404 = error.message === '404_NOT_FOUND';

    if (isNetworkError || is404) {
        console.debug(`[TalkDrove] Direct access failed (${error.message}). Retrying via CORS proxy...`);
        try {
            // Encode the full target URL
            // Note: When using allorigins, we pass the full TalkDrove URL
            // We reconstruct the full URL assuming API_BASE_URL might be relative or absolute.
            // If API_BASE_URL is relative (e.g. /api/proxy), we can't use external proxy easily.
            // So we default to the hardcoded TalkDrove URL for the proxy attempt.
            const targetUrl = `https://numbers.talkdrove.com/api/v1/developer${endpoint}`;
            const proxyUrl = `${PROXY_PREFIX}${encodeURIComponent(targetUrl)}`;
            
            return await performFetch(proxyUrl);
        } catch (proxyError) {
            console.error("Proxy retry also failed", proxyError);
            throw error; // Throw the original error or the proxy error
        }
    }

    throw error;
  }
};

/**
 * Get list of available phone numbers
 */
export const getNumbers = async (country?: string): Promise<TalkDroveNumber[]> => {
  try {
    let endpoint = '/numbers';
    if (country && country !== 'All') {
      endpoint = `/numbers/by-country?country=${encodeURIComponent(country)}`;
    } else {
        endpoint = '/numbers?limit=50';
    }

    const response: any = await apiRequest(endpoint);
    
    // Normalize response
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.numbers)) return response.numbers;
    
    // If we got here but no array, try fallback
    throw new Error("Invalid format");

  } catch (e) {
    // FALLBACK: If /numbers fails, fetch latest OTPs to find active numbers
    // This is useful if the /numbers endpoint is restricted or broken
    try {
        console.warn("Fetching numbers failed, falling back to active OTP list.");
        const otpData: any = await apiRequest('/otps/latest?limit=100');
        
        let otps: any[] = [];
        if (Array.isArray(otpData)) otps = otpData;
        else if (Array.isArray(otpData?.data)) otps = otpData.data;
        else if (Array.isArray(otpData?.otps)) otps = otpData.otps;

        const uniqueNumbers = new Map<string, TalkDroveNumber>();
        otps.forEach((otp) => {
            if (!otp.phone_number) return;
            if (country && country !== 'All' && otp.country !== country) return;

            if (!uniqueNumbers.has(otp.phone_number)) {
                uniqueNumbers.set(otp.phone_number, {
                    id: otp.id || Math.random(),
                    phone_number: otp.phone_number,
                    country: otp.country || 'Unknown',
                    created_at: otp.created_at
                });
            }
        });

        return Array.from(uniqueNumbers.values());
    } catch (fallbackError) {
        console.error("Fallback failed", fallbackError);
        return [];
    }
  }
};

/**
 * Get OTPs for a specific phone number
 */
export const getOTPsByPhone = async (phone: string): Promise<TalkDroveOTP[]> => {
  try {
    const endpoint = `/otps/by-phone/${encodeURIComponent(phone)}?limit=50`;
    const response: any = await apiRequest(endpoint);
    
    let data = [];
    if (Array.isArray(response)) data = response;
    else if (Array.isArray(response?.data)) data = response.data;
    else if (Array.isArray(response?.otps)) data = response.otps;
    
    return data.map((item: any) => ({
        id: item.id,
        phone_number: item.phone_number,
        otp_code: item.otp_code,
        message: item.message || item.sms_text || item.otp_code,
        platform: item.platform || 'Unknown',
        created_at: item.created_at,
        country: item.country
    }));
  } catch (e) {
    console.error("Failed to fetch OTPs", e);
    return [];
  }
};

/**
 * Get Health
 */
export const getHealth = async (): Promise<any> => {
    return await apiRequest('/health');
}

/**
 * Get Stats
 */
export const getStats = async (): Promise<any> => {
    return await apiRequest('/stats');
}
