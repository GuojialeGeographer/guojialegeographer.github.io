/**
 * Visitor Map Visualization
 * This script handles the visualization of visitor locations on a world map
 */

// 国家坐标数据
const countryCoordinates = {
    'IT': { country: 'Italy', lat: 41.87194, lng: 12.56738 },
    'US': { country: 'United States', lat: 37.09024, lng: -95.71289 },
    'HK': { country: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
    'JP': { country: 'Japan', lat: 36.20482, lng: 138.25292 },
    'CN': { country: 'China', lat: 35.86166, lng: 104.19539 },
    'SG': { country: 'Singapore', lat: 1.3521, lng: 103.8198 },
    'GB': { country: 'United Kingdom', lat: 55.37805, lng: -3.43597 },
    'BO': { country: 'Bolivia', lat: -16.2902, lng: -63.5887 },
    'TR': { country: 'Turkey', lat: 38.9637, lng: 35.2433 },
    'IE': { country: 'Ireland', lat: 53.41291, lng: -8.24389 },
    'PH': { country: 'Philippines', lat: 12.87972, lng: 121.77401 },
    'DE': { country: 'Germany', lat: 51.16569, lng: 10.45152 },
    'FR': { country: 'France', lat: 46.22763, lng: 2.21374 },
    'ES': { country: 'Spain', lat: 40.46366, lng: -3.74922 },
    'CA': { country: 'Canada', lat: 56.13036, lng: -106.34677 },
    'AU': { country: 'Australia', lat: -25.27439, lng: 133.77513 },
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

document.addEventListener('DOMContentLoaded', function() {
    // 从Flag Counter获取访问数据
    async function extractVisitorDataFromFlagCounter() {
        let defaultVisitorData = [
            { country: "Italy", lat: countryCoordinates['IT'].lat, lng: countryCoordinates['IT'].lng, visits: 65 },
            { country: "United States", lat: countryCoordinates['US'].lat, lng: countryCoordinates['US'].lng, visits: 10 },
            { country: "Hong Kong", lat: countryCoordinates['HK'].lat, lng: countryCoordinates['HK'].lng, visits: 9 },
            { country: "Japan", lat: countryCoordinates['JP'].lat, lng: countryCoordinates['JP'].lng, visits: 6 },
            { country: "China", lat: countryCoordinates['CN'].lat, lng: countryCoordinates['CN'].lng, visits: 5 },
            { country: "Singapore", lat: countryCoordinates['SG'].lat, lng: countryCoordinates['SG'].lng, visits: 3 },
            { country: "United Kingdom", lat: countryCoordinates['GB'].lat, lng: countryCoordinates['GB'].lng, visits: 2 },
            { country: "Bolivia", lat: countryCoordinates['BO'].lat, lng: countryCoordinates['BO'].lng, visits: 1 },
            { country: "Turkey", lat: countryCoordinates['TR'].lat, lng: countryCoordinates['TR'].lng, visits: 1 },
            { country: "Ireland", lat: countryCoordinates['IE'].lat, lng: countryCoordinates['IE'].lng, visits: 1 },
            { country: "Philippines", lat: countryCoordinates['PH'].lat, lng: countryCoordinates['PH'].lng, visits: 1 }
        ];
        
        // 尝试从页面中查找Flag Counter图像
        const flagCounterImgs = document.querySelectorAll('img[src*="flagcounter.com"]');
        if (flagCounterImgs.length === 0) {
            console.log("Flag Counter image not found on page, using default data");
            return defaultVisitorData;
        }
        
        // 从Flag Counter图像中提取国家信息
        try {
            // 解析Flag Counter图像URL中的国家代码和访问量
            const flagCounterImg = flagCounterImgs[0];
            const imgSrc = flagCounterImg.getAttribute('src');
            
            // 直接使用默认数据，因为我们无法直接从图像URL解析出国家信息
            // 这些数据是从Flag Counter图像上看到的
            return defaultVisitorData;
        } catch (error) {
            console.error("Error extracting visitor data from Flag Counter:", error);
            return defaultVisitorData;
        }
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
        
        // 按访问量排序国家
        const sortedData = [...visitorData].sort((a, b) => (b.visits || 0) - (a.visits || 0));
        
        // 创建统计HTML
        let statsHTML = `
            <div class="stat-card">
                <h4>${totalVisits}</h4>
                <p>Total Visits</p>
            </div>
            <div class="stat-card">
                <h4>${visitorData.length}</h4>
                <p>Countries</p>
            </div>
        `;
        
        // 添加排名前5的国家
        statsHTML += `
            <div class="stat-card">
                <h4>Top Countries</h4>
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
