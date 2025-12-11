
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
  const primaryUrl = `${API_BASE_URL}${endpoint}`;
  
  try {
    return await performRequest<T>(primaryUrl, options);
  } catch (primaryError: any) {
    console.debug(`[TalkDrove] Primary proxy failed (${primaryError.message}). Attempting fallbacks...`);

    // Construct the absolute target URL for the external proxies
    const targetUrl = `${REAL_API_URL}${endpoint}`;

    // 2. Secondary Attempt: corsproxy.io
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
            throw primaryError; 
        }
    }
  }
};

const performRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_HEADERS,
        ...options.headers,
      },
    });

    if (!response.ok) {
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

// Comprehensive Country Code Map
// Ordered roughly by specificity (longer codes first) to prevent partial matches
const COUNTRY_CODES: Record<string, string> = {
    '1': 'USA/Canada',
    '7': 'Russia/Kazakhstan',
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
    // If API provided a valid country, use it
    if (existingCountry && existingCountry !== 'Unknown' && existingCountry !== 'International' && existingCountry.length > 2) {
        return existingCountry;
    }
    
    // Clean number (remove spaces, dashes)
    const p = phone.trim().replace(/[\s-]/g, '');
    
    // We expect format +123... if not present, assume it needs a +
    const cleanPhone = p.startsWith('+') ? p.substring(1) : p;

    // Check against map
    // We sort keys by length descending so we match '992' before '9' (if '9' existed)
    // This is less critical with the static map above since keys are strings, but safe practice.
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
 * We request a HIGH limit (1000) to try and get ALL numbers, not just recent ones.
 */
export const getNumbers = async (country?: string): Promise<TalkDroveNumber[]> => {
  try {
    let endpoint = '/numbers';
    if (country && country !== 'All') {
      endpoint = `/numbers/by-country?country=${encodeURIComponent(country)}`;
    } else {
        // Request a large limit to get "All" numbers
        endpoint = '/numbers?limit=500'; 
    }

    const response: any = await apiRequest(endpoint);
    
    let data: any[] = [];
    if (Array.isArray(response)) data = response;
    else if (Array.isArray(response?.data)) data = response.data;
    else if (Array.isArray(response?.numbers)) data = response.numbers;
    
    if (data.length > 0) {
        return data.map((item: any) => ({
            id: item.id,
            phone_number: item.phone_number,
            country: detectCountry(item.phone_number, item.country),
            created_at: item.created_at
        }));
    }
    
    throw new Error("Empty list returned");

  } catch (e) {
    // FALLBACK STRATEGY
    try {
        console.warn("[TalkDrove] /numbers endpoint failed or empty. Deriving numbers from OTP list...");
        
        // Fetch a large batch of latest OTPs to find active numbers
        const otpData: any = await apiRequest('/otps/latest?limit=200');
        
        let otps: any[] = [];
        if (Array.isArray(otpData)) otps = otpData;
        else if (Array.isArray(otpData?.data)) otps = otpData.data;
        else if (Array.isArray(otpData?.otps)) otps = otpData.otps;

        const uniqueNumbers = new Map<string, TalkDroveNumber>();
        otps.forEach((otp) => {
            if (!otp.phone_number) return;
            
            const detectedCountry = detectCountry(otp.phone_number, otp.country);
            
            if (country && country !== 'All' && detectedCountry !== country) return;

            if (!uniqueNumbers.has(otp.phone_number)) {
                uniqueNumbers.set(otp.phone_number, {
                    id: otp.id || Math.random(),
                    phone_number: otp.phone_number,
                    country: detectedCountry,
                    created_at: otp.created_at
                });
            }
        });

        const result = Array.from(uniqueNumbers.values());
        return result;
    } catch (fallbackError) {
        console.error("Fallback strategy failed", fallbackError);
        return [];
    }
  }
};

/**
 * Get OTPs for a specific phone number
 * Requests LIMIT=100 (Max allowed) to get the deepest history possible.
 */
export const getOTPsByPhone = async (phone: string): Promise<TalkDroveOTP[]> => {
  try {
    // REQUEST MAX LIMIT OF 100 to get "last codes" not just recent ones
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
        platform: item.platform || 'Service',
        created_at: item.created_at,
        country: detectCountry(item.phone_number, item.country)
    }));
  } catch (e) {
    console.error("Failed to fetch OTPs", e);
    return [];
  }
};

/**
 * Get Global Live Feed of OTPs
 * Fetches latest 100 OTPs across all numbers.
 */
export const getGlobalOTPs = async (): Promise<TalkDroveOTP[]> => {
    try {
        const response: any = await apiRequest('/otps/latest?limit=100');
        
        let data = [];
        if (Array.isArray(response)) data = response;
        else if (Array.isArray(response?.data)) data = response.data;
        else if (Array.isArray(response?.otps)) data = response.otps;

        return data.map((item: any) => ({
            id: item.id,
            phone_number: item.phone_number,
            otp_code: item.otp_code,
            message: item.message || item.sms_text || item.otp_code,
            platform: item.platform || 'Service',
            created_at: item.created_at,
            country: detectCountry(item.phone_number, item.country)
        }));
    } catch (e) {
        console.error("Failed to fetch global OTPs", e);
        return [];
    }
};

export const getHealth = async (): Promise<any> => {
    return await apiRequest('/health');
}

export const getStats = async (): Promise<any> => {
    return await apiRequest('/stats');
}
