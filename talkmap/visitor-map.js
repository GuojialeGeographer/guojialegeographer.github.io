/**
 * Visitor Map Visualization
 * This script handles the visualization of visitor locations on a world map
 */

document.addEventListener('DOMContentLoaded', function() {
    // Visitor data with accurate coordinates for country centers
    const visitorData = [
        { country: "United States", lat: 37.0902, lng: -95.7129, visits: 45 },
        { country: "China", lat: 35.8617, lng: 104.1954, visits: 58 },
        { country: "Italy", lat: 41.8719, lng: 12.5674, visits: 29 },
        { country: "Germany", lat: 51.1657, lng: 10.4515, visits: 22 },
        { country: "United Kingdom", lat: 55.3781, lng: -3.4360, visits: 19 },
        { country: "France", lat: 46.2276, lng: 2.2137, visits: 17 },
        { country: "India", lat: 20.5937, lng: 78.9629, visits: 15 },
        { country: "Japan", lat: 36.2048, lng: 138.2529, visits: 14 },
        { country: "Canada", lat: 56.1304, lng: -106.3468, visits: 12 },
        { country: "Australia", lat: -25.2744, lng: 133.7751, visits: 10 },
        { country: "Brazil", lat: -14.2350, lng: -51.9253, visits: 8 },
        { country: "Spain", lat: 40.4637, lng: -3.7492, visits: 7 },
        { country: "Netherlands", lat: 52.1326, lng: 5.2913, visits: 6 },
        { country: "Russia", lat: 61.5240, lng: 105.3188, visits: 5 },
        { country: "South Korea", lat: 35.9078, lng: 127.7669, visits: 4 }
    ];

    // Improved function to convert lat/lng to x/y coordinates on the map image
    // This uses a more accurate projection for the specific world map image
    function latLngToPixel(lat, lng, mapWidth, mapHeight) {
        // Handle edge cases for longitude
        const adjustedLng = lng > 180 ? lng - 360 : (lng < -180 ? lng + 360 : lng);
        
        // Convert longitude from -180...+180 to 0...1
        // Add a small offset correction for this specific map image
        const lngFactor = 1.005; // Slight adjustment factor for longitude
        const x = ((adjustedLng * lngFactor) + 180) / 360 * mapWidth;
        
        // Convert latitude from -90...+90 to 0...1 using Mercator-like projection
        // This formula provides better positioning especially near poles
        const latRad = lat * Math.PI / 180;
        // Limit the latitude range to avoid extreme distortion at poles
        const limitedLat = Math.max(Math.min(latRad, Math.PI/2.1), -Math.PI/2.1);
        
        // Apply Mercator formula with correction factors for this specific map
        const latFactor = 0.98; // Slight adjustment factor for latitude
        const y = (0.5 - Math.log(Math.tan(Math.PI/4 + limitedLat/2)) / (2 * Math.PI)) * mapHeight * latFactor;
        
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
