
// Map Country Names to ISO 2-letter codes for Flag CDN
export const getCountryIso = (countryName: string): string => {
    const map: Record<string, string> = {
        'United States': 'us',
        'USA': 'us',
        'United Kingdom': 'gb',
        'UK': 'gb',
        'Great Britain': 'gb',
        'Canada': 'ca',
        'Russia': 'ru',
        'Kazakhstan': 'kz',
        'Ukraine': 'ua',
        'Germany': 'de',
        'France': 'fr',
        'Spain': 'es',
        'Italy': 'it',
        'Netherlands': 'nl',
        'Poland': 'pl',
        'Sweden': 'se',
        'Switzerland': 'ch',
        'Belgium': 'be',
        'Austria': 'at',
        'Denmark': 'dk',
        'Portugal': 'pt',
        'Norway': 'no',
        'Finland': 'fi',
        'Turkey': 'tr',
        'China': 'cn',
        'Hong Kong': 'hk',
        'Indonesia': 'id',
        'Malaysia': 'my',
        'Philippines': 'ph',
        'Thailand': 'th',
        'Vietnam': 'vn',
        'India': 'in',
        'Pakistan': 'pk',
        'Bangladesh': 'bd',
        'Japan': 'jp',
        'South Korea': 'kr',
        'Australia': 'au',
        'New Zealand': 'nz',
        'Brazil': 'br',
        'Argentina': 'ar',
        'Mexico': 'mx',
        'Colombia': 'co',
        'Chile': 'cl',
        'Peru': 'pe',
        'Venezuela': 've',
        'Nigeria': 'ng',
        'Kenya': 'ke',
        'South Africa': 'za',
        'Egypt': 'eg',
        'Morocco': 'ma',
        'Ghana': 'gh',
        'Ivory Coast': 'ci',
        'Senegal': 'sn',
        'Cameroon': 'cm',
        'Kyrgyzstan': 'kg',
        'Uzbekistan': 'uz',
        'Tajikistan': 'tj',
        'Afghanistan': 'af',
        'Israel': 'il',
        'Saudi Arabia': 'sa',
        'UAE': 'ae',
        'Latvia': 'lv',
        'Lithuania': 'lt',
        'Estonia': 'ee',
        'Romania': 'ro',
        'Bulgaria': 'bg',
        'Serbia': 'rs',
        'Croatia': 'hr',
        'Slovenia': 'si',
        'Slovakia': 'sk',
        'Czech Republic': 'cz',
        'Hungary': 'hu',
        'Greece': 'gr',
        'Ireland': 'ie',
        'Georgia': 'ge',
        'Armenia': 'am',
        'Moldova': 'md',
        'Belarus': 'by',
        'Azerbaijan': 'az',
        'Tunisia': 'tn',
        'Algeria': 'dz',
        'Yemen': 'ye',
        'Tanzania': 'tz',
        'Uganda': 'ug',
        'Zimbabwe': 'zw',
        'Zambia': 'zm',
        'Mozambique': 'mz',
        'Angola': 'ao',
        'Sri Lanka': 'lk',
        'Myanmar': 'mm',
        'Cambodia': 'kh',
        'Laos': 'la',
        'Nepal': 'np',
    };

    // Normalize input
    const normalized = countryName.trim();
    
    // Check direct map
    if (map[normalized]) return map[normalized];
    
    // Fuzzy check (if map key is contained in name or vice versa)
    const lower = normalized.toLowerCase();
    for (const [key, val] of Object.entries(map)) {
        if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
            return val;
        }
    }

    return 'un'; // United Nations flag as fallback
};

export const getFlagUrl = (countryName: string) => {
    const code = getCountryIso(countryName);
    return `https://flagcdn.com/w80/${code}.png`;
};
