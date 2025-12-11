
import { API_BASE_URL, API_HEADERS, REAL_API_URL } from '../constants';
import { TalkDroveNumber, TalkDroveOTP } from '../types';

/**
 * ROBUST FETCH STRATEGY
 * 1. Try Vercel Proxy (/api/proxy) - Best for Production
 * 2. Try CORSProxy.io - Fast backup for Localhost
 * 3. Try AllOrigins - Slow backup
 */
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  
  // 1. Primary Attempt: Vercel Proxy
  // This uses the relative path defined in constants.ts (/api/proxy)
  const primaryUrl = `${API_BASE_URL}${endpoint}`;
  
  try {
    return await performRequest<T>(primaryUrl, options);
  } catch (primaryError: any) {
    console.debug(`[TalkDrove] Primary proxy failed (${primaryError.message}). Attempting fallbacks...`);

    // Construct the absolute target URL for the external proxies
    const targetUrl = `${REAL_API_URL}${endpoint}`;

    // 2. Secondary Attempt: corsproxy.io (Faster/More reliable than allorigins)
    try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
        return await performRequest<T>(proxyUrl, options);
    } catch (secondaryError) {
        
        // 3. Tertiary Attempt: allorigins.win
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
            return await performRequest<T>(proxyUrl, options);
        } catch (finalError) {
            console.error("[TalkDrove] All fetch attempts failed.");
            throw primaryError; // Throw the original error as it's usually the most relevant
        }
    }
  }
};

// Helper function to execute the fetch and parse JSON
const performRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_HEADERS,
        ...options.headers,
      },
    });

    if (!response.ok) {
        // Handle 404 explicitly so we can trigger specific fallbacks
        if (response.status === 404) throw new Error("404_NOT_FOUND");
        throw new Error(`HTTP_${response.status}`);
    }

    const text = await response.text();
    if (!text) return {} as T;

    try {
        return JSON.parse(text);
    } catch {
        throw new Error("INVALID_JSON");
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
    
    throw new Error("Invalid format");

  } catch (e) {
    // FALLBACK STRATEGY: Scrape from OTPs
    // If the /numbers endpoint is broken/restricted (404), we derive numbers from the latest messages.
    try {
        console.warn("[TalkDrove] /numbers endpoint failed. Deriving numbers from OTP list...");
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
        console.error("Fallback strategy failed", fallbackError);
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

export const getHealth = async (): Promise<any> => {
    return await apiRequest('/health');
}

export const getStats = async (): Promise<any> => {
    return await apiRequest('/stats');
}
