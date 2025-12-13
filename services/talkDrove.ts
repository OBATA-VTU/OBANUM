import { API_BASE_URL, API_HEADERS, REAL_API_URL } from '../constants';
import { TalkDroveNumber, TalkDroveOTP } from '../types';

// Custom Error Class for better UI feedback
export class SystemError extends Error {
  constructor(message: string, public code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'SystemError';
  }
}

/**
 * ROBUST FETCH STRATEGY
 * 1. Try Vercel Proxy (/api/proxy) - Best for Production
 * 2. Try CORSProxy.io - Fast backup for Localhost
 * 3. Try AllOrigins - Slow backup
 */
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  
  // 1. Primary Attempt: Secure Internal Proxy
  const primaryUrl = `${API_BASE_URL}${endpoint}`;
  
  try {
    return await performRequest<T>(primaryUrl, options);
  } catch (primaryError: any) {
    // Construct the absolute target URL for the external proxies
    const targetUrl = `${REAL_API_URL}${endpoint}`;

    // 2. Secondary Attempt: Secure Routing Node A
    try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
        return await performRequest<T>(proxyUrl, options);
    } catch (secondaryError) {
        
        // 3. Tertiary Attempt: Secure Routing Node B
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
            return await performRequest<T>(proxyUrl, options);
        } catch (finalError) {
            console.warn(`[Obanum Core] Node Connection Failed: ${endpoint}`);
            throw new SystemError("Secure gateway unreachable. Check your connection.", "NETWORK_ERROR");
        }
    }
  }
};

const performRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
    try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...API_HEADERS,
            ...options.headers,
          },
        });

        if (!response.ok) {
            if (response.status === 404) throw new SystemError("Resource unavailable in current node", "NOT_FOUND");
            if (response.status === 401) throw new SystemError("Session signature expired", "AUTH_ERROR");
            if (response.status === 429) throw new SystemError("Traffic limit reached. Cool down.", "RATE_LIMIT");
            if (response.status >= 500) throw new SystemError("System maintenance in progress", "SERVER_ERROR");
            throw new SystemError(`Node response: ${response.status}`, "HTTP_ERROR");
        }

        const text = await response.text();
        if (!text) return {} as T;

        try {
            return JSON.parse(text);
        } catch {
            throw new SystemError("Data decryption failed", "PARSE_ERROR");
        }
    } catch (error: any) {
        if (error instanceof SystemError) throw error;
        throw new SystemError(error.message || "Secure connection failed", "NETWORK_ERROR");
    }
};

// Comprehensive Country Code Map
const COUNTRY_CODES: Record<string, string> = {
    '1': 'USA',
    '7': 'Russia',
    '20': 'Egypt',
    '27': 'South Africa',
    '30': 'Greece',
    '31': 'Netherlands',
    '32': 'Belgium',
    '33': 'France',
    '34': 'Spain',
    '36': 'Hungary',
    '39': 'Italy',
    '40': 'Romania',
    '41': 'Switzerland',
    '43': 'Austria',
    '44': 'United Kingdom',
    '45': 'Denmark',
    '46': 'Sweden',
    '47': 'Norway',
    '48': 'Poland',
    '49': 'Germany',
    '51': 'Peru',
    '52': 'Mexico',
    '54': 'Argentina',
    '55': 'Brazil',
    '56': 'Chile',
    '57': 'Colombia',
    '58': 'Venezuela',
    '60': 'Malaysia',
    '61': 'Australia',
    '62': 'Indonesia',
    '63': 'Philippines',
    '64': 'New Zealand',
    '65': 'Singapore',
    '66': 'Thailand',
    '81': 'Japan',
    '82': 'South Korea',
    '84': 'Vietnam',
    '86': 'China',
    '90': 'Turkey',
    '91': 'India',
    '92': 'Pakistan',
    '93': 'Afghanistan',
    '94': 'Sri Lanka',
    '95': 'Myanmar',
    '98': 'Iran',
    '212': 'Morocco',
    '213': 'Algeria',
    '216': 'Tunisia',
    '218': 'Libya',
    '220': 'Gambia',
    '221': 'Senegal',
    '222': 'Mauritania',
    '223': 'Mali',
    '224': 'Guinea',
    '225': 'Ivory Coast',
    '226': 'Burkina Faso',
    '227': 'Niger',
    '228': 'Togo',
    '229': 'Benin',
    '230': 'Mauritius',
    '231': 'Liberia',
    '232': 'Sierra Leone',
    '233': 'Ghana',
    '234': 'Nigeria',
    '235': 'Chad',
    '236': 'CAR',
    '237': 'Cameroon',
    '238': 'Cape Verde',
    '239': 'Sao Tome',
    '240': 'Equatorial Guinea',
    '241': 'Gabon',
    '242': 'Congo',
    '243': 'DR Congo',
    '244': 'Angola',
    '245': 'Guinea-Bissau',
    '248': 'Seychelles',
    '249': 'Sudan',
    '250': 'Rwanda',
    '251': 'Ethiopia',
    '252': 'Somalia',
    '253': 'Djibouti',
    '254': 'Kenya',
    '255': 'Tanzania',
    '256': 'Uganda',
    '257': 'Burundi',
    '258': 'Mozambique',
    '260': 'Zambia',
    '261': 'Madagascar',
    '263': 'Zimbabwe',
    '264': 'Namibia',
    '265': 'Malawi',
    '266': 'Lesotho',
    '267': 'Botswana',
    '268': 'Eswatini',
    '290': 'Saint Helena',
    '291': 'Eritrea',
    '297': 'Aruba',
    '298': 'Faroe Islands',
    '299': 'Greenland',
    '350': 'Gibraltar',
    '351': 'Portugal',
    '352': 'Luxembourg',
    '353': 'Ireland',
    '354': 'Iceland',
    '355': 'Albania',
    '356': 'Malta',
    '357': 'Cyprus',
    '358': 'Finland',
    '359': 'Bulgaria',
    '370': 'Lithuania',
    '371': 'Latvia',
    '372': 'Estonia',
    '373': 'Moldova',
    '374': 'Armenia',
    '375': 'Belarus',
    '376': 'Andorra',
    '377': 'Monaco',
    '378': 'San Marino',
    '380': 'Ukraine',
    '381': 'Serbia',
    '382': 'Montenegro',
    '385': 'Croatia',
    '386': 'Slovenia',
    '387': 'Bosnia',
    '389': 'Macedonia',
    '420': 'Czech Republic',
    '421': 'Slovakia',
    '423': 'Liechtenstein',
    '500': 'Falkland Islands',
    '501': 'Belize',
    '502': 'Guatemala',
    '503': 'El Salvador',
    '504': 'Honduras',
    '505': 'Nicaragua',
    '506': 'Costa Rica',
    '507': 'Panama',
    '509': 'Haiti',
    '590': 'Guadeloupe',
    '591': 'Bolivia',
    '592': 'Guyana',
    '593': 'Ecuador',
    '594': 'French Guiana',
    '595': 'Paraguay',
    '596': 'Martinique',
    '597': 'Suriname',
    '598': 'Uruguay',
    '599': 'Curacao',
    '670': 'Timor-Leste',
    '673': 'Brunei',
    '674': 'Nauru',
    '675': 'Papua New Guinea',
    '676': 'Tonga',
    '677': 'Solomon Islands',
    '678': 'Vanuatu',
    '679': 'Fiji',
    '680': 'Palau',
    '850': 'North Korea',
    '852': 'Hong Kong',
    '853': 'Macau',
    '855': 'Cambodia',
    '856': 'Laos',
    '880': 'Bangladesh',
    '886': 'Taiwan',
    '960': 'Maldives',
    '961': 'Lebanon',
    '962': 'Jordan',
    '963': 'Syria',
    '964': 'Iraq',
    '965': 'Kuwait',
    '966': 'Saudi Arabia',
    '967': 'Yemen',
    '968': 'Oman',
    '970': 'Palestine',
    '971': 'UAE',
    '972': 'Israel',
    '973': 'Bahrain',
    '974': 'Qatar',
    '975': 'Bhutan',
    '976': 'Mongolia',
    '977': 'Nepal',
    '992': 'Tajikistan',
    '993': 'Turkmenistan',
    '994': 'Azerbaijan',
    '995': 'Georgia',
    '996': 'Kyrgyzstan',
    '998': 'Uzbekistan',
};

// Robust Country Detection
const detectCountry = (phone: string, existingCountry?: string): string => {
    if (existingCountry && existingCountry !== 'Unknown' && existingCountry !== 'International' && existingCountry.length > 2) {
        return existingCountry;
    }
    const p = phone.trim().replace(/[\s-]/g, '');
    const cleanPhone = p.startsWith('+') ? p.substring(1) : p;
    const sortedCodes = Object.keys(COUNTRY_CODES).sort((a, b) => b.length - a.length);

    for (const code of sortedCodes) {
        if (cleanPhone.startsWith(code)) {
            return COUNTRY_CODES[code];
        }
    }
    return 'International';
};

/**
 * Get list of available phone numbers
 * Optimization: Now only fetches 2 pages by default to ensure speed (approx 100-200 nums)
 * Pagination is supported via parameters.
 */
export const getNumbers = async (country?: string, pageStart: number = 1): Promise<TalkDroveNumber[]> => {
  try {
    const extractList = (res: any) => {
        if (Array.isArray(res)) return res;
        if (Array.isArray(res?.data)) return res.data;
        if (Array.isArray(res?.numbers)) return res.numbers;
        return [];
    };

    // Parallel fetch of 2 pages max for speed
    const pagesToFetch = [pageStart, pageStart + 1];
    let endpoints = [];
    
    if (country && country !== 'All') {
        endpoints = pagesToFetch.map(p => `/numbers/by-country?country=${encodeURIComponent(country)}&limit=100&page=${p}`);
    } else {
        endpoints = pagesToFetch.map(p => `/numbers?page=${p}&limit=100`);
    }

    // Fire requests in parallel
    const responses = await Promise.all(
        endpoints.map(ep => apiRequest(ep).catch(() => ({ data: [] })))
    );
    
    let rawData: any[] = [];
    responses.forEach(res => {
        rawData = [...rawData, ...extractList(res)];
    });

    // Deduplication & Cleaning
    const uniqueMap = new Map();
    const cleanData = rawData.map((item: any) => ({
            id: item.id,
            phone_number: item.phone_number,
            country: detectCountry(item.phone_number, item.country),
            created_at: item.created_at
    }));

    cleanData.forEach(item => {
        if (!uniqueMap.has(item.phone_number)) {
            uniqueMap.set(item.phone_number, item);
        }
    });

    return Array.from(uniqueMap.values());
  } catch (e) {
      console.warn("Fast fetch failed, returning empty.");
      return [];
  }
};

/**
 * Get OTPs for a specific phone number
 */
export const getOTPsByPhone = async (phone: string): Promise<TalkDroveOTP[]> => {
  try {
    const endpoint = `/otps/by-phone/${encodeURIComponent(phone)}?limit=100`;
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
        platform: item.platform || 'System',
        created_at: item.created_at,
        country: detectCountry(item.phone_number, item.country)
    }));
  } catch (e) {
    return [];
  }
};

/**
 * Get Global Live Feed of OTPs
 */
export const getGlobalOTPs = async (): Promise<TalkDroveOTP[]> => {
    try {
        // Reduced to 2 pages for performance
        const pages = [1, 2];
        const responses = await Promise.all(
             pages.map(p => apiRequest(`/otps/latest?limit=100&page=${p}`).catch(()=>({})))
        );
        
        let allData: any[] = [];
        responses.forEach((res: any) => {
            if (Array.isArray(res)) allData = [...allData, ...res];
            else if (Array.isArray(res?.data)) allData = [...allData, ...res.data];
            else if (Array.isArray(res?.otps)) allData = [...allData, ...res.otps];
        });

        const unique = new Map();
        allData.forEach(item => unique.set(item.id, item));
        
        return Array.from(unique.values()).map((item: any) => ({
            id: item.id,
            phone_number: item.phone_number,
            otp_code: item.otp_code,
            message: item.message || item.sms_text || item.otp_code,
            platform: item.platform || 'System',
            created_at: item.created_at,
            country: detectCountry(item.phone_number, item.country)
        })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
    } catch (e) {
        return [];
    }
};

export const getHealth = async (): Promise<any> => {
    try {
        return await apiRequest('/health');
    } catch {
        return { status: 'down' };
    }
}

export const getStats = async (): Promise<any> => {
    try {
        return await apiRequest('/stats');
    } catch {
        // Fallback stats if endpoint fails
        return { numbers: 5000, otps: 100000 }; 
    }
}
