import base64
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
W, H = 1200, 620
MIN_LNG, MAX_LNG = -18.0, 142.0
MIN_LAT, MAX_LAT = 8.0, 65.0


def proj(lng, lat):
    x = (lng - MIN_LNG) / (MAX_LNG - MIN_LNG) * W
    y = H - (lat - MIN_LAT) / (MAX_LAT - MIN_LAT) * H
    return round(x, 1), round(y, 1)


def image_data(relative_path):
    payload = base64.b64encode((ROOT / relative_path).read_bytes()).decode('ascii')
    return f'data:image/png;base64,{payload}'


def callout(x, y, image, title, subtitle, detail, detail_color='#1e40af'):
    return f'''<g transform="translate({x}, {y})">
    <image x="0" y="0" width="36" height="36" preserveAspectRatio="xMidYMid meet" href="{image}" />
    <text x="48" y="12" class="place-title">{escape(title)}</text>
    <text x="48" y="25" class="place-subtitle">{escape(subtitle)}</text>
    <text x="48" y="37" class="place-detail" fill="{detail_color}">{escape(detail)}</text>
  </g>'''


def marker(place_id, number, color, lng, lat):
    x, y = proj(lng, lat)
    return f'''<g id="marker-{place_id}" data-city="{place_id}" data-lat="{lat}" data-lng="{lng}">
    <circle cx="{x}" cy="{y}" r="14" fill="#ffffff" opacity="0.88" />
    <circle cx="{x}" cy="{y}" r="10" fill="{color}" stroke="#ffffff" stroke-width="1.5" />
    <text x="{x}" y="{y}" fill="#ffffff" font-size="9.5" font-weight="700" text-anchor="middle" dominant-baseline="central">{number}</text>
  </g>'''


def leader(lng, lat, label_x, label_y):
    x, y = proj(lng, lat)
    return f'<path d="M {x},{y} L {label_x + 18},{label_y + 18}" class="leader-line" />'


world = json.loads((ROOT / 'data/world-110m.json').read_text())
land_d = []
for feature in world['features']:
    geometry = feature['geometry']

    def process_poly(poly):
        parts = []
        for ring in poly:
            points = []
            for lng, lat in ring:
                if -25 <= lng <= 145 and 5 <= lat <= 70:
                    x, y = proj(lng, lat)
                    points.append(f'{x},{y}')
            if len(points) > 2:
                parts.append('M ' + ' L '.join(points) + ' Z')
        return ' '.join(parts)

    if geometry['type'] == 'Polygon':
        path = process_poly(geometry['coordinates'])
        if path:
            land_d.append(path)
    elif geometry['type'] == 'MultiPolygon':
        for polygon in geometry['coordinates']:
            path = process_poly(polygon)
            if path:
                land_d.append(path)

places = {
    'chuzhou': {'number': '1', 'color': '#e53935', 'lng': 118.3171, 'lat': 32.3013},
    'lanzhou': {'number': '2', 'color': '#1e88e5', 'lng': 103.8343, 'lat': 36.0611},
    'suzhou': {'number': '3', 'color': '#f57c00', 'lng': 120.6726, 'lat': 31.2989},
    'cuhk': {'number': '4', 'color': '#43a047', 'lng': 114.2100, 'lat': 22.4167},
    'milan': {'number': '5/6', 'color': '#0f2b5c', 'lng': 9.2275, 'lat': 45.4781},
}

points = {key: proj(place['lng'], place['lat']) for key, place in places.items()}
chuzhou = points['chuzhou']
lanzhou = points['lanzhou']
suzhou = points['suzhou']
cuhk = points['cuhk']
milan = points['milan']

labels = [
    ('lanzhou', 600, 160, 'images/institutions/CAS.png', 'Chinese Academy of Sciences (UCAS)', 'Lanzhou, China', 'RA, Eco-hydrology (2021–2022)', '#1e40af'),
    ('chuzhou', 955, 220, 'images/institutions/chuzhou university.png', 'Chuzhou University', 'Chuzhou, Anhui, China', 'B.A. in Geography (2017–2021)', '#1e40af'),
    ('suzhou', 820, 405, 'images/institutions/sipsg_logo.png', 'SIPSG · SIP Surveying & Mapping', 'Suzhou, China', 'Professional Practice · PM & GIS Engineer (2023–2024)', '#1e40af'),
    ('cuhk', 690, 515, 'images/institutions/cuhk.png', 'The Chinese University of Hong Kong', 'Hong Kong, China', 'Joint Training & Collaboration', '#1e40af'),
    ('milan', 40, 245, 'images/institutions/polimi.png', 'Politecnico di Milano', 'Milan, Italy · Leonardo Campus', 'M.S. in Geoinformatics Eng. (2024–2026)', '#1e40af'),
    ('milan', 40, 85, 'images/institutions/polimi.png', 'Politecnico di Milano', 'Milan, Italy · Leonardo Campus', 'Ph.D. in Data Analytics (CSC, 2027–2031)', '#b91c1c'),
]

leaders = '\n'.join(leader(places[key]['lng'], places[key]['lat'], x, y) for key, x, y, *_ in labels)
callouts = '\n'.join(callout(x, y, image_data(image), title, subtitle, detail, color) for key, x, y, image, title, subtitle, detail, color in labels)
markers = '\n'.join(marker(key, place['number'], place['color'], place['lng'], place['lat']) for key, place in places.items())
china_label = proj(98.0, 32.0)
italy_label = proj(12.0, 42.0)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="100%" height="100%" style="background: #f8fbfe; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f2b5c" />
    </marker>
    <style>
      .route {{ fill: none; stroke: #0f2b5c; stroke-width: 1.9; stroke-linecap: round; }}
      .leader-line {{ fill: none; stroke: #94a3b8; stroke-width: 1.1; stroke-dasharray: 3,3; }}
      .place-title {{ font-size: 12px; font-weight: 700; fill: #0f172a; }}
      .place-subtitle {{ font-size: 10px; fill: #475569; }}
      .place-detail {{ font-size: 10px; font-weight: 500; }}
      .country-label {{ font-size: 13px; font-weight: 800; fill: #1e3a5f; letter-spacing: 2px; opacity: 0.7; }}
    </style>
  </defs>
  <rect width="{W}" height="{H}" rx="12" fill="#f8fbfe" stroke="#e2e9f0" stroke-width="1" />
  <path d="{' '.join(land_d)}" fill="#edf4fa" stroke="#a9cef4" stroke-width="1.1" stroke-dasharray="2.5,3" />
  <text x="{china_label[0]}" y="{china_label[1]}" class="country-label">CHINA</text>
  <text x="{italy_label[0]}" y="{italy_label[1]}" class="country-label">ITALY</text>

  <path d="M {chuzhou[0]},{chuzhou[1]} Q 985,285 {lanzhou[0]},{lanzhou[1]}" class="route" marker-end="url(#arrow)" />
  <path d="M {lanzhou[0]},{lanzhou[1]} Q 985,320 {suzhou[0]},{suzhou[1]}" class="route" marker-end="url(#arrow)" />
  <path d="M {suzhou[0]},{suzhou[1]} Q 1045,425 {cuhk[0]},{cuhk[1]}" class="route" marker-end="url(#arrow)" />
  <path d="M {cuhk[0]},{cuhk[1]} C 790,45 420,55 {milan[0]},{milan[1]}" class="route" marker-end="url(#arrow)" />

  {leaders}
  {markers}
  {callouts}
</svg>'''

output = ROOT / 'images/academic_journey_map.svg'
output.write_text(svg)
print(f'Generated {output.relative_to(ROOT)} ({len(svg)} bytes)')
for key, place in places.items():
    print(f'{key}: lat={place["lat"]}, lng={place["lng"]} -> x={points[key][0]}, y={points[key][1]}')
