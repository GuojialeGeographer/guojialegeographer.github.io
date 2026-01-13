/**
 * Country Coordinates Data
 * 国家坐标数据 - 统一数据源
 * 
 * 最后更新: 2026-01-01
 */

// 国家坐标数据
const countryCoordinates = {
    'IT': { country: 'Italy', lat: 42.5, lng: 12.5 },
    'SG': { country: 'Singapore', lat: 1.3521, lng: 103.8198 },
    'US': { country: 'United States', lat: 39.5, lng: -98.35 },
    'HK': { country: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
    'CN': { country: 'China', lat: 35.8617, lng: 104.1954 },
    'JP': { country: 'Japan', lat: 36.2048, lng: 138.2529 },
    'GB': { country: 'United Kingdom', lat: 55.37805, lng: -3.43597 },
    'AU': { country: 'Australia', lat: -25.2744, lng: 133.7751 },
    'MY': { country: 'Malaysia', lat: 4.2105, lng: 101.9758 },
    'BO': { country: 'Bolivia', lat: -16.2902, lng: -63.5887 },
    'TR': { country: 'Turkey', lat: 38.9637, lng: 35.2433 },
    'IE': { country: 'Ireland', lat: 53.1424, lng: -7.6921 },
    'PH': { country: 'Philippines', lat: 12.8797, lng: 121.7740 },
    // 其他国家的参考坐标
    'UK': { country: 'United Kingdom', lat: 55.37805, lng: -3.43597 },
    'DE': { country: 'Germany', lat: 51.16569, lng: 10.45152 },
    'FR': { country: 'France', lat: 46.22763, lng: 2.21374 },
    'ES': { country: 'Spain', lat: 40.46366, lng: -3.74922 },
    'CA': { country: 'Canada', lat: 56.13036, lng: -106.34677 },
    'BR': { country: 'Brazil', lat: -14.23500, lng: -51.92528 },
    'IN': { country: 'India', lat: 20.59368, lng: 78.96288 },
    'RU': { country: 'Russia', lat: 61.52401, lng: 105.31875 },
    'KR': { country: 'South Korea', lat: 35.9078, lng: 127.7669 },
    'NL': { country: 'Netherlands', lat: 52.1326, lng: 5.2913 }
};

// 国家名称别名，用于处理不同表示形式
const countryNameAlias = {
    'USA': 'US',
    'United States of America': 'US',
    'UK': 'GB',
    'Great Britain': 'GB',
    'England': 'GB',
    'People\'s Republic of China': 'CN',
    'Republic of China': 'TW',
    'Taiwan': 'TW',
    'Hong Kong': 'HK',
    'South Korea': 'KR',
    'Republic of Korea': 'KR',
    'North Korea': 'KP',
    'Democratic People\'s Republic of Korea': 'KP',
    'Netherlands': 'NL',
    'Holland': 'NL'
};
