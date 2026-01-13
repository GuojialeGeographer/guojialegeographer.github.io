/**
 * Visitor Map Visualization
 * This script handles the visualization of visitor locations on a world map
 * 
 * 使用统一的数据源：
 * - js/data/country-coordinates.js (国家坐标)
 * - data/visitor-stats.json (访客统计数据)
 */

// 注意：countryCoordinates 应该从 js/data/country-coordinates.js 加载
// 如果该文件未加载，则使用默认值（向后兼容）
if (typeof countryCoordinates === 'undefined') {
    console.warn('countryCoordinates not loaded, using fallback');
    var countryCoordinates = {
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
        'IE': { country: 'Ireland', lat: 53.1424, lng: -7.6921 }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // 从统一数据源加载访客数据
    async function loadVisitorData() {
        try {
            // 尝试从data/visitor-stats.json加载数据
            const response = await fetch('../data/visitor-stats.json');
            if (response.ok) {
                const data = await response.json();
                // 转换JSON数据格式
                return data.countries.map(item => ({
                    country: item.country,
                    lat: item.lat,
                    lng: item.lng,
                    visits: item.visits
                }));
            }
        } catch (error) {
            console.warn("Failed to load visitor stats from JSON, using fallback data:", error);
        }
        
        // 如果加载失败，使用默认数据（向后兼容）
        return [
            { country: "Italy", lat: countryCoordinates['IT'].lat, lng: countryCoordinates['IT'].lng, visits: 78 },
            { country: "Singapore", lat: countryCoordinates['SG'].lat, lng: countryCoordinates['SG'].lng, visits: 24 },
            { country: "United States", lat: countryCoordinates['US'].lat, lng: countryCoordinates['US'].lng, visits: 24 },
            { country: "Hong Kong", lat: countryCoordinates['HK'].lat, lng: countryCoordinates['HK'].lng, visits: 14 },
            { country: "China", lat: countryCoordinates['CN'].lat, lng: countryCoordinates['CN'].lng, visits: 11 },
            { country: "Japan", lat: countryCoordinates['JP'].lat, lng: countryCoordinates['JP'].lng, visits: 11 },
            { country: "United Kingdom", lat: countryCoordinates['GB'].lat, lng: countryCoordinates['GB'].lng, visits: 3 },
            { country: "Australia", lat: countryCoordinates['AU'].lat, lng: countryCoordinates['AU'].lng, visits: 1 },
            { country: "Malaysia", lat: countryCoordinates['MY'].lat, lng: countryCoordinates['MY'].lng, visits: 1 },
            { country: "Bolivia", lat: countryCoordinates['BO'].lat, lng: countryCoordinates['BO'].lng, visits: 1 },
            { country: "Turkey", lat: countryCoordinates['TR'].lat, lng: countryCoordinates['TR'].lng, visits: 1 },
            { country: "Ireland", lat: countryCoordinates['IE'].lat, lng: countryCoordinates['IE'].lng, visits: 1 }
        ];
    }
    
    // 从Flag Counter获取访问数据（保留向后兼容）
    async function extractVisitorDataFromFlagCounter() {
        // 优先使用统一数据源
        const data = await loadVisitorData();
        return data;
    }

    // 经纬度转换为地图上的像素坐标
    function latLngToPixel(lat, lng, mapWidth, mapHeight) {
        // 调整经度范围
        let adjustedLng = lng;
        if (adjustedLng > 180) adjustedLng -= 360;
        if (adjustedLng < -180) adjustedLng += 360;
        
        // 经度转换 - 线性映射
        const xFactor = 0.996; // 校正系数
        const xOffset = 0;    // 横向偏移校正
        const x = ((adjustedLng + 180) / 360) * mapWidth * xFactor + xOffset;
        
        // 纬度转换 - 使用线性映射
        const yFactor = 1.02; // 校正系数
        const yOffset = -mapHeight * 0.01; // 垂直偏移校正
        const y = ((90 - lat) / 180) * mapHeight * yFactor + yOffset;
        
        return { 
            x: Math.round(x), 
            y: Math.round(y)
        };
    }

    // 在地图上创建访客标记
    async function createVisitorMarkers() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;
        
        const mapImage = mapContainer.querySelector('img');
        if (!mapImage) return;
        
        // 获取访客数据
        const visitorData = await extractVisitorDataFromFlagCounter();
        
        // 等待地图图像加载完成
        if (mapImage.complete) {
            addMarkers();
        } else {
            mapImage.onload = addMarkers;
        }
        
        function addMarkers() {
            const mapWidth = mapImage.clientWidth;
            const mapHeight = mapImage.clientHeight;
            
            // 清除现有标记
            const existingMarkers = mapContainer.querySelectorAll('.visitor-marker');
            existingMarkers.forEach(marker => marker.remove());
            
            // 添加新标记
            for (const visitor of visitorData) {
                if (!visitor) continue;
                
                const position = latLngToPixel(visitor.lat, visitor.lng, mapWidth, mapHeight);
                const marker = document.createElement('div');
                marker.className = 'visitor-marker';
                marker.title = `${visitor.country}: ${visitor.visits} visits`;
                
                // 根据访问量调整标记大小
                const size = Math.max(8, Math.min(16, 8 + (visitor.visits / 5)));
                marker.style.width = `${size}px`;
                marker.style.height = `${size}px`;
                marker.style.position = 'absolute';
                marker.style.left = `${position.x - size/2}px`;
                marker.style.top = `${position.y - size/2}px`;
                
                mapContainer.appendChild(marker);
            }
            
            // 更新统计信息
            updateVisitorStats(visitorData);
        }
    }

    // 更新访客统计信息显示
    function updateVisitorStats(visitorData) {
        const statsContainer = document.getElementById('visitor-stats');
        if (!statsContainer) return;
        
        // 计算总访问量
        const totalVisits = visitorData.reduce((sum, visitor) => sum + (visitor.visits || 0), 0);
        
        // 按访问量排序国家和地区
        const sortedData = [...visitorData].sort((a, b) => (b.visits || 0) - (a.visits || 0));
        
        // 创建统计HTML
        let statsHTML = `
            <div class="stat-card">
                <h4>${totalVisits}</h4>
                <p>Total Visits</p>
            </div>
            <div class="stat-card">
                <h4>${visitorData.length}</h4>
                <p>Countries/Regions</p>
            </div>
        `;
        
        // 添加排名前5的国家和地区
        statsHTML += `
            <div class="stat-card">
                <h4>Top Countries/Regions</h4>
                <ol class="country-list">
                    ${sortedData.slice(0, 5).map(v => `<li>${v.country} (${v.visits || 0})</li>`).join('')}
                </ol>
            </div>
        `;
        
        // 更新容器
        statsContainer.innerHTML = statsHTML;
    }

    // 初始化访客地图
    createVisitorMarkers();
});
