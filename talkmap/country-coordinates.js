// 国家坐标数据
const countryCoordinates = {
    'IT': { country: 'Italy', lat: 41.87194, lng: 12.56738 },
    'US': { country: 'United States', lat: 37.09024, lng: -95.71289 },
    'CN': { country: 'China', lat: 35.86166, lng: 104.19539 },
    'JP': { country: 'Japan', lat: 36.20482, lng: 138.25292 },
    'PH': { country: 'Philippines', lat: 12.87972, lng: 121.77401 },
    'IE': { country: 'Ireland', lat: 53.41291, lng: -8.24389 },
    'UK': { country: 'United Kingdom', lat: 55.37805, lng: -3.43597 },
    'DE': { country: 'Germany', lat: 51.16569, lng: 10.45152 },
    'FR': { country: 'France', lat: 46.22763, lng: 2.21374 },
    'ES': { country: 'Spain', lat: 40.46366, lng: -3.74922 },
    'CA': { country: 'Canada', lat: 56.13036, lng: -106.34677 },
    'AU': { country: 'Australia', lat: -25.27439, lng: 133.77513 },
    'BR': { country: 'Brazil', lat: -14.23500, lng: -51.92528 },
    'IN': { country: 'India', lat: 20.59368, lng: 78.96288 },
    'RU': { country: 'Russia', lat: 61.52401, lng: 105.31875 }
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
    'Democratic People\'s Republic of Korea': 'KP'
};
