// 自动补全国家经纬度
import { countryCoordinates } from './country-coordinates.js';

const LOCAL_KEY = 'autoCountryCoords';

function getCachedCoords(countryName) {
    const cache = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    return cache[countryName] || null;
}

function setCachedCoords(countryName, lat, lng) {
    const cache = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    cache[countryName] = { country: countryName, lat, lng };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(cache));
}

export async function getCountryLatLng(countryName) {
    // 1. 本地表
    for (const code in countryCoordinates) {
        if (countryCoordinates[code].country === countryName) {
            return countryCoordinates[code];
        }
    }
    // 2. localStorage
    const cached = getCachedCoords(countryName);
    if (cached) return cached;

    // 3. Nominatim API
    try {
        const url = `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryName)}&format=json&limit=1`;
        const resp = await fetch(url, { headers: { 'User-Agent': 'AcademicMap/1.0' } });
        const data = await resp.json();
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            setCachedCoords(countryName, lat, lng);
            return { country: countryName, lat, lng };
        }
    } catch (e) {
        console.warn('自动获取国家经纬度失败:', countryName, e);
    }
    return null;
} 