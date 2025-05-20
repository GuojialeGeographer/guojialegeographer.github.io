// 国家坐标表和别名表
export const countryCoordinates = {
    'IT': { country: "Italy", lat: 42.5, lng: 12.5 },
    'US': { country: "United States", lat: 39.5, lng: -98.35 },
    'CN': { country: "China", lat: 35.8617, lng: 104.1954 },
    'DE': { country: "Germany", lat: 51.1657, lng: 10.4515 },
    'GB': { country: "United Kingdom", lat: 55.3781, lng: -3.4360 },
    'FR': { country: "France", lat: 46.2276, lng: 2.2137 },
    'IN': { country: "India", lat: 20.5937, lng: 78.9629 },
    'JP': { country: "Japan", lat: 36.2048, lng: 138.2529 },
    'CA': { country: "Canada", lat: 56.1304, lng: -106.3468 },
    'AU': { country: "Australia", lat: -25.2744, lng: 133.7751 },
    'BR': { country: "Brazil", lat: -14.2350, lng: -51.9253 },
    'ES': { country: "Spain", lat: 40.4637, lng: -3.7492 },
    'NL': { country: "Netherlands", lat: 52.1326, lng: 5.2913 },
    'RU': { country: "Russia", lat: 61.5240, lng: 105.3188 },
    'KR': { country: "South Korea", lat: 35.9078, lng: 127.7669 },
    'PH': { country: "Philippines", lat: 12.8797, lng: 121.7740 }
    // 新国家请在此补充
};

// 别名表，key为Flag Counter返回的国名，value为标准国别代码
export const countryNameAlias = {
    'USA': 'US',
    'United States of America': 'US',
    'UK': 'GB',
    'South Korea': 'KR',
    // 新别名请在此补充
}; 