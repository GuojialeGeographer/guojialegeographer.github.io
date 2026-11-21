import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent
W = 1400
MIN_LNG, MAX_LNG = -25.0, 150.0
MIN_LAT, MAX_LAT = -5.0, 75.0
MEAN_LAT = (MIN_LAT + MAX_LAT) / 2
H = round(W * (MAX_LAT - MIN_LAT) / ((MAX_LNG - MIN_LNG) * math.cos(math.radians(MEAN_LAT))))


def project(lng, lat):
    x = (lng - MIN_LNG) / (MAX_LNG - MIN_LNG) * W
    y = (MAX_LAT - lat) / (MAX_LAT - MIN_LAT) * H
    return round(x, 1), round(y, 1)


def geometry_paths(geometry):
    paths = []

    def ring_path(ring):
        points = [f'{x:.1f},{y:.1f}' for x, y in (project(lng, lat) for lng, lat in ring)]
        if len(points) > 2:
            return 'M ' + ' L '.join(points) + ' Z'
        return ''

    def polygon_path(polygon):
        return ' '.join(path for ring in polygon if (path := ring_path(ring)))

    if geometry['type'] == 'Polygon':
        path = polygon_path(geometry['coordinates'])
        if path:
            paths.append(path)
    elif geometry['type'] == 'MultiPolygon':
        for polygon in geometry['coordinates']:
            path = polygon_path(polygon)
            if path:
                paths.append(path)
    return paths


land_data = json.loads((ROOT / 'images/ne_110m_land.json').read_text())
land_paths = [path for feature in land_data['features'] for path in geometry_paths(feature['geometry'])]

countries_data = json.loads((ROOT / 'data/world-110m.json').read_text())
country_paths = [path for feature in countries_data['features'] for path in geometry_paths(feature['geometry'])]

places = {
    'chuzhou': (1, '#e5646c', 118.3171, 32.3013),
    'lanzhou': (2, '#57b6f2', 103.8343, 36.0611),
    'suzhou': (3, '#f0a75d', 120.6726, 31.2989),
    'cuhk': (4, '#66c793', 114.2100, 22.4167),
    'milan': ('5·6', '#d8b25f', 9.2275, 45.4781),
}
points = {key: project(lng, lat) for key, (_, _, lng, lat) in places.items()}

graticules = []
for lng in range(-20, 151, 20):
    x, _ = project(lng, 0)
    graticules.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" />')
for lat in range(0, 76, 15):
    _, y = project(0, lat)
    graticules.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" />')


def route(path, color, width, dashed=False):
    dash = ' stroke-dasharray="8 7"' if dashed else ''
    arrow_id = color[1:]
    return f'<path d="{path}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"{dash} marker-end="url(#arrow-{arrow_id})" />'


routes = [
    route(f'M {points["chuzhou"][0]},{points["chuzhou"][1]} Q 1062,330 {points["lanzhou"][0]},{points["lanzhou"][1]}', '#0284c7', 3),
    route(f'M {points["lanzhou"][0]},{points["lanzhou"][1]} Q 1122,452 {points["suzhou"][0]},{points["suzhou"][1]}', '#0284c7', 3),
    route(f'M {points["suzhou"][0]},{points["suzhou"][1]} Q 1184,482 {points["cuhk"][0]},{points["cuhk"][1]}', '#0284c7', 3),
    route(f'M {points["cuhk"][0]},{points["cuhk"][1]} C 900,118 500,118 {points["milan"][0]},{points["milan"][1]}', '#d97706', 4, True),
]

markers = []
for key, (number, color, lng, lat) in places.items():
    x, y = points[key]
    markers.append(f'''<g class="marker" data-id="{key}" data-lat="{lat}" data-lng="{lng}">
      <circle cx="{x}" cy="{y}" r="16" fill="{color}" opacity="0.14" />
      <circle cx="{x}" cy="{y}" r="9.5" fill="{color}" stroke="#ffffff" stroke-width="2.4" />
      <text x="{x}" y="{y + 3.4}" text-anchor="middle">{number}</text>
    </g>''')

city_labels = [
    ('Milan', points['milan'][0] + 18, points['milan'][1] - 14, 'start'),
    ('Lanzhou', points['lanzhou'][0] - 17, points['lanzhou'][1] - 14, 'end'),
    ('Chuzhou', points['chuzhou'][0] - 17, points['chuzhou'][1] + 28, 'end'),
    ('Suzhou', points['suzhou'][0] + 17, points['suzhou'][1] - 12, 'start'),
    ('Hong Kong', points['cuhk'][0] + 17, points['cuhk'][1] + 23, 'start'),
]
city_svg = '\n'.join(
    f'<text class="city-label" x="{x}" y="{y}" text-anchor="{anchor}">{name}</text>'
    for name, x, y, anchor in city_labels
)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="mapTitle mapDesc">
  <title id="mapTitle">Academic journey across Asia and Europe</title>
  <desc id="mapDesc">Eurasia-focused Natural Earth map with WGS84 projected milestones in Chuzhou, Lanzhou, Suzhou, Hong Kong, and Milan.</desc>
  <defs>
    <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbfdff" />
      <stop offset="1" stop-color="#edf5fb" />
    </linearGradient>
    <clipPath id="mapClip"><rect x="0" y="0" width="{W}" height="{H}" rx="14" /></clipPath>
    <marker id="arrow-0284c7" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0284c7" />
    </marker>
    <marker id="arrow-d97706" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#d97706" />
    </marker>
    <style>
      .map-bg {{ fill: url(#oceanGradient); }}
      .graticule {{ stroke: #d7e5f0; stroke-width: 1; }}
      .land {{ fill: #e9f2f8; stroke: #b7d2e6; stroke-width: 1.1; stroke-linejoin: round; }}
      .countries {{ fill: none; stroke: #c9dcea; stroke-width: .75; stroke-linejoin: round; }}
      .route-glow {{ stroke: rgba(2,132,199,.10); stroke-width: 12; fill: none; }}
      .marker text {{ fill: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 10px; font-weight: 800; }}
      .city-label {{ fill: #1e3a5f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 12px; font-weight: 650; letter-spacing: .2px; paint-order: stroke; stroke: rgba(255,255,255,.92); stroke-width: 4px; }}
    </style>
  </defs>
  <rect width="{W}" height="{H}" rx="14" class="map-bg" />
  <g clip-path="url(#mapClip)">
    <g class="graticule">{''.join(graticules)}</g>
    <path class="land" d="{' '.join(land_paths)}" />
    <path class="countries" d="{' '.join(country_paths)}" />
    <path class="route-glow" d="M {points["cuhk"][0]},{points["cuhk"][1]} C 900,118 500,118 {points["milan"][0]},{points["milan"][1]}" />
    {''.join(routes)}
    {city_svg}
    {''.join(markers)}
  </g>
  <rect x=".5" y=".5" width="{W - 1}" height="{H - 1}" rx="13.5" fill="none" stroke="#d5e2ec" />
</svg>'''

output = ROOT / 'images/academic_journey_eurasia.svg'
output.write_text(svg)
print(f'Generated {output.relative_to(ROOT)} ({len(svg)} bytes), viewBox {W}x{H}')
print('Eurasia-focused light map: Natural Earth land + country boundaries; extent -25..150 / -5..75, aspect corrected at mean latitude.')
for key, (_, _, lng, lat) in places.items():
    print(f'{key}: WGS84({lat}, {lng}) -> SVG {points[key]}')
