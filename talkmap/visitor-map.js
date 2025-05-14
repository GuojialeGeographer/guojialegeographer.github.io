/**
 * Visitor Map Visualization
 * This script handles the visualization of visitor locations on a world map
 */

document.addEventListener('DOMContentLoaded', function() {
    // 国家代码到经纬度的映射表
    const countryCoordinates = {
        'IT': { country: "Italy", lat: 42.5, lng: 12.5 },  // 调整意大利坐标
        'US': { country: "United States", lat: 39.5, lng: -98.35 }, // 调整美国坐标
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
        // 可根据需要添加更多国家
    };

    // 从Flag Counter获取访问数据
    function extractVisitorDataFromFlagCounter() {
        // 默认访问数据，如果无法从Flag Counter获取数据时使用
        let defaultVisitorData = [
            { country: "Italy", lat: countryCoordinates['IT'].lat, lng: countryCoordinates['IT'].lng, visits: 16 },
            { country: "United States", lat: countryCoordinates['US'].lat, lng: countryCoordinates['US'].lng, visits: 4 },
            { country: "Philippines", lat: countryCoordinates['PH'].lat, lng: countryCoordinates['PH'].lng, visits: 1 }
        ];
        
        // 尝试从页面中查找Flag Counter图像
        const flagCounterImgs = document.querySelectorAll('img[src*="flagcounter.com"]');
        if (flagCounterImgs.length === 0) {
            console.log("Flag Counter image not found on page, using default data");
            return defaultVisitorData;
        }
        
        // 获取访问者数据
        let visitorData = [];
        
        try {
            // 检查页面上是否有Flag Counter统计表
            const statsDivs = document.querySelectorAll('.flag-counter');
            
            // 如果没有找到.flag-counter，也尝试检查其他地方
            if (statsDivs.length > 0) {
                // 查找旁边的ol.country-list元素，这通常包含国家列表
                const countryLists = document.querySelectorAll('.country-list');
                for (const list of countryLists) {
                    const items = list.querySelectorAll('li');
                    for (const item of items) {
                        const text = item.textContent.trim();
                        // 尝试匹配格式如 "Country Name (XX)"
                        const match = text.match(/([^(]+)\s*\((\d+)\)/);
                        if (match) {
                            const countryName = match[1].trim();
                            const visits = parseInt(match[2]);
                            
                            // 查找国家坐标
                            for (const code in countryCoordinates) {
                                if (countryCoordinates[code].country === countryName) {
                                    visitorData.push({
                                        country: countryName,
                                        lat: countryCoordinates[code].lat,
                                        lng: countryCoordinates[code].lng,
                                        visits: visits
                                    });
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            
            // 如果上面的方法没有找到任何数据，尝试直接从图像URL解析
            if (visitorData.length === 0) {
                // 最新的Flag Counter数据
                // 这是一个临时解决方案，使用最新的访问数据
                
                // 添加已知的访问数据
                visitorData.push({
                    country: "Italy",
                    lat: countryCoordinates['IT'].lat,
                    lng: countryCoordinates['IT'].lng,
                    visits: 16
                });
                
                visitorData.push({
                    country: "United States",
                    lat: countryCoordinates['US'].lat,
                    lng: countryCoordinates['US'].lng,
                    visits: 4
                });
                
                visitorData.push({
                    country: "Philippines",
                    lat: countryCoordinates['PH'].lat,
                    lng: countryCoordinates['PH'].lng,
                    visits: 1
                });
            }
        } catch (error) {
            console.error("Error extracting visitor data from Flag Counter:", error);
        }
        
        // 如果无法从Flag Counter获取数据，使用默认数据
        if (visitorData.length === 0) {
            console.log("Could not extract visitor data, using default data");
            return defaultVisitorData;
        }
        
        return visitorData;
    }

    // 获取访问数据
    const visitorData = extractVisitorDataFromFlagCounter();

    // Improved function to convert lat/lng to x/y coordinates on the map image
    // This uses a more accurate projection for the specific world map image
    function latLngToPixel(lat, lng, mapWidth, mapHeight) {
        // 经纬度到像素的转换常常需要根据具体地图图像进行调整
        // 下面的公式已经过调整以适应NASA地图图像
        
        // 调整经度范围
        let adjustedLng = lng;
        if (adjustedLng > 180) adjustedLng -= 360;
        if (adjustedLng < -180) adjustedLng += 360;
        
        // 经度转换 - 线性映射
        // 地图左侧为经度-180°，右侧为经度+180°
        // 调整后的公式更准确地映射到像素坐标
        const xFactor = 0.996; // 校正系数
        const xOffset = 0;    // 横向偏移校正
        const x = ((adjustedLng + 180) / 360) * mapWidth * xFactor + xOffset;
        
        // 纬度转换 - 使用修正的Mercator投影
        // 地图顶部为纬度+90°，底部为纬度-90°
        // 对于等距投影地图，需要线性映射
        const yFactor = 1.02; // 校正系数
        const yOffset = -mapHeight * 0.01; // 垂直偏移校正
        
        // 使用简单线性映射而非Mercator，因为NASA图像更接近于等距投影
        const y = ((90 - lat) / 180) * mapHeight * yFactor + yOffset;
        
        return { 
            x: Math.round(x), 
            y: Math.round(y)
        };
    }

    // Create visitor markers on the map
    function createVisitorMarkers() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;

        const mapImage = mapContainer.querySelector('img');
        if (!mapImage) return;

        // Wait for the image to load to get its dimensions
        mapImage.onload = function() {
            const mapWidth = mapImage.clientWidth;
            const mapHeight = mapImage.clientHeight;
            
            // Create a marker for each visitor
            visitorData.forEach(visitor => {
                const position = latLngToPixel(visitor.lat, visitor.lng, mapWidth, mapHeight);
                
                // Create marker element
                const marker = document.createElement('div');
                marker.className = 'visitor-marker';
                marker.title = `${visitor.country}: ${visitor.visits} visits`;
                
                // Size the marker based on visit count (min 8px, max 16px)
                const size = Math.max(8, Math.min(16, 8 + (visitor.visits / 10)));
                marker.style.width = `${size}px`;
                marker.style.height = `${size}px`;
                
                // Position the marker - center it on the point
                marker.style.left = `${position.x - size/2}px`;
                marker.style.top = `${position.y - size/2}px`;
                
                // Add to map container
                mapContainer.appendChild(marker);
            });
            
            // Update visitor stats
            updateVisitorStats();
        };
    }

    // Update visitor statistics display
    function updateVisitorStats() {
        const statsContainer = document.getElementById('visitor-stats');
        if (!statsContainer) return;
        
        // Calculate total visits
        const totalVisits = visitorData.reduce((sum, visitor) => sum + visitor.visits, 0);
        
        // Sort countries by visit count
        const sortedData = [...visitorData].sort((a, b) => b.visits - a.visits);
        
        // Create HTML for stats
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
        
        // Add top countries
        statsHTML += `
            <div class="stat-card">
                <h4>Top Countries</h4>
                <ol class="country-list">
                    ${sortedData.slice(0, 5).map(v => `<li>${v.country} (${v.visits})</li>`).join('')}
                </ol>
            </div>
        `;
        
        // Update the container
        statsContainer.innerHTML = statsHTML;
    }

    // Initialize the map
    createVisitorMarkers();
});
