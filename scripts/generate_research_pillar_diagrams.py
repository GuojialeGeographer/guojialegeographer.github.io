import os

w, h = 1080, 350
box_h = 265

def create_pillar1():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" style="background:#ffffff; border-radius:10px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <marker id="arr-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
    </marker>
    <filter id="box-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.04" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="{w}" height="{h}" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" />

  <!-- Top Banner -->
  <rect x="0" y="0" width="{w}" height="42" rx="10" fill="#f8fafc" />
  <rect x="0" y="32" width="{w}" height="10" fill="#f8fafc" />
  <line x1="0" y1="42" x2="{w}" y2="42" stroke="#e2e8f0" stroke-width="1" />
  <circle cx="24" cy="21" r="5" fill="#2563eb" />
  <text x="36" y="25" font-size="13" font-weight="700" fill="#0f172a" letter-spacing="0.3">RESEARCH PILLAR 1: SPATIOTEMPORAL BIG DATA &amp; GEOSPATIAL FOUNDATION MODELS</text>
  <rect x="{w-240}" y="10" width="220" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1" />
  <text x="{w-130}" y="25" font-size="10.5" font-weight="600" fill="#1d4ed8" text-anchor="middle">GeoAI • Multimodal LLMs • Mobility</text>

  <!-- STAGE 1: Data Sensing -->
  <g transform="translate(24, 58)">
    <rect width="230" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow)" />
    <rect width="230" height="34" rx="8" fill="#eff6ff" />
    <rect y="26" width="230" height="8" fill="#eff6ff" />
    <line x1="0" y1="34" x2="230" y2="34" stroke="#bfdbfe" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#2563eb" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">1</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#1e3a8a">Urban Multi-Source Sensing</text>

    <!-- Mini Graphic: Data inputs -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="95" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <path d="M 10 32 Q 30 10 50 25 T 85 12" fill="none" stroke="#ef4444" stroke-width="2" />
      <circle cx="10" cy="32" r="3" fill="#ef4444" />
      <circle cx="85" cy="12" r="3" fill="#10b981" />
      <text x="47" y="38" font-size="8.5" fill="#64748b" text-anchor="middle">GPS Trajectories</text>

      <rect x="105" y="0" width="95" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="115" y="8" width="28" height="20" rx="3" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" stroke-width="1" />
      <circle cx="129" cy="18" r="4" fill="#3b82f6" />
      <text x="152" y="38" font-size="8.5" fill="#64748b" text-anchor="middle">Street View (SVI)</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#2563eb" />
      <text x="12" y="14" font-weight="600">Mobile Phone Signaling</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Billion-scale dynamic trajectories</text>

      <circle cx="4" cy="48" r="2.5" fill="#2563eb" />
      <text x="12" y="52" font-weight="600">Omnidirectional SVI Panoramas</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Street canyon micro-environment</text>

      <circle cx="4" cy="86" r="2.5" fill="#2563eb" />
      <text x="12" y="90" font-weight="600">Multimodal Remote Sensing</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">High-res multispectral EO grids</text>

      <circle cx="4" cy="124" r="2.5" fill="#2563eb" />
      <text x="12" y="128" font-weight="600">POI &amp; Road Infrastructure</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">OpenStreetMap network topology</text>
    </g>
  </g>

  <!-- Flow Arrow 1 -> 2 -->
  <line x1="262" y1="190" x2="286" y2="190" stroke="#2563eb" stroke-width="2" marker-end="url(#arr-blue)" />

  <!-- STAGE 2: GeoAI & Foundation Models -->
  <g transform="translate(294, 58)">
    <rect width="245" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow)" />
    <rect width="245" height="34" rx="8" fill="#f5f3ff" />
    <rect y="26" width="245" height="8" fill="#f5f3ff" />
    <line x1="0" y1="34" x2="245" y2="34" stroke="#ddd6fe" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#7c3aed" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">2</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#5b21b6">Foundation Architecture</text>

    <!-- Mini Graphic: Transformer / LLM Pipeline -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="215" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="10" y="10" width="45" height="22" rx="3" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" />
      <text x="32" y="25" font-size="9" font-weight="700" fill="#6d28d9" text-anchor="middle">ViT-Patch</text>
      <line x1="58" y1="21" x2="72" y2="21" stroke="#8b5cf6" stroke-width="1.5" />
      <rect x="75" y="10" width="65" height="22" rx="3" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" />
      <text x="107" y="25" font-size="9" font-weight="700" fill="#1d4ed8" text-anchor="middle">Cross-Attn</text>
      <line x1="143" y1="21" x2="157" y2="21" stroke="#8b5cf6" stroke-width="1.5" />
      <rect x="160" y="10" width="45" height="22" rx="3" fill="#10b981" opacity="0.15" stroke="#10b981" />
      <text x="182" y="25" font-size="9" font-weight="700" fill="#047857" text-anchor="middle">LoRA</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#7c3aed" />
      <text x="12" y="14" font-weight="600">Multimodal LLMs (Qwen2-VL)</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Vision-language spatial perception</text>

      <circle cx="4" cy="48" r="2.5" fill="#7c3aed" />
      <text x="12" y="52" font-weight="600">Spatiotemporal GNNs (ST-GNN)</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Graph attention on road networks</text>

      <circle cx="4" cy="86" r="2.5" fill="#7c3aed" />
      <text x="12" y="90" font-weight="600">Geospatial Pretraining (GeoFM)</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Self-supervised representation learning</text>

      <circle cx="4" cy="124" r="2.5" fill="#7c3aed" />
      <text x="12" y="128" font-weight="600">Cross-Modal Alignment</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Contrastive spatial-textual loss</text>
    </g>
  </g>

  <!-- Flow Arrow 2 -> 3 -->
  <line x1="547" y1="190" x2="571" y2="190" stroke="#2563eb" stroke-width="2" marker-end="url(#arr-blue)" />

  <!-- STAGE 3: Spatial Latent Space & Reasoning -->
  <g transform="translate(579, 58)">
    <rect width="235" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow)" />
    <rect width="235" height="34" rx="8" fill="#f0fdf4" />
    <rect y="26" width="235" height="8" fill="#f0fdf4" />
    <line x1="0" y1="34" x2="235" y2="34" stroke="#bbf7d0" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#16a34a" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">3</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#14532d">Spatial Latent Reasoning</text>

    <!-- Mini Graphic: Embedding Matrix / Graph Clusters -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="205" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="35" cy="21" r="12" fill="#dcfce7" stroke="#16a34a" stroke-width="1.2" />
      <circle cx="102" cy="21" r="12" fill="#dbeafe" stroke="#2563eb" stroke-width="1.2" />
      <circle cx="170" cy="21" r="12" fill="#f3e8ff" stroke="#9333ea" stroke-width="1.2" />
      <line x1="47" y1="21" x2="90" y2="21" stroke="#94a3b8" stroke-dasharray="2,2" />
      <line x1="114" y1="21" x2="158" y2="21" stroke="#94a3b8" stroke-dasharray="2,2" />
      <text x="35" y="25" font-size="8.5" font-weight="bold" fill="#16a34a" text-anchor="middle">Space</text>
      <text x="102" y="25" font-size="8.5" font-weight="bold" fill="#2563eb" text-anchor="middle">Flow</text>
      <text x="170" y="25" font-size="8.5" font-weight="bold" fill="#9333ea" text-anchor="middle">Semantics</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#16a34a" />
      <text x="12" y="14" font-weight="600">High-Dim City Embeddings</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Z-score normalized feature vectors</text>

      <circle cx="4" cy="48" r="2.5" fill="#16a34a" />
      <text x="12" y="52" font-weight="600">Cognitive &amp; Aesthetic Scores</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Beauty, safety, vitality &amp; depression</text>

      <circle cx="4" cy="86" r="2.5" fill="#16a34a" />
      <text x="12" y="90" font-weight="600">Spatial Autocorrelation</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Global/Local Moran's I cluster tests</text>

      <circle cx="4" cy="124" r="2.5" fill="#16a34a" />
      <text x="12" y="128" font-weight="600">Model Interpretability (XAI)</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">SHAP &amp; visual attention heatmaps</text>
    </g>
  </g>

  <!-- Flow Arrow 3 -> 4 -->
  <line x1="822" y1="190" x2="846" y2="190" stroke="#2563eb" stroke-width="2" marker-end="url(#arr-blue)" />

  <!-- STAGE 4: Scientific Applications & Impact -->
  <g transform="translate(854, 58)">
    <rect width="202" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow)" />
    <rect width="202" height="34" rx="8" fill="#fef2f2" />
    <rect y="26" width="202" height="8" fill="#fef2f2" />
    <line x1="0" y1="34" x2="202" y2="34" stroke="#fecaca" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#dc2626" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">4</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#991b1b">Scientific Impact</text>

    <!-- Mini Graphic: Spatial Heatmap output -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="172" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="35" cy="21" r="10" fill="#fee2e2" />
      <circle cx="35" cy="21" r="5" fill="#ef4444" />
      <circle cx="86" cy="21" r="13" fill="#fee2e2" />
      <circle cx="86" cy="21" r="7" fill="#dc2626" />
      <circle cx="137" cy="21" r="8" fill="#dcfce7" />
      <circle cx="137" cy="21" r="4" fill="#16a34a" />
      <text x="86" y="38" font-size="8.5" fill="#64748b" text-anchor="middle">City Perception Atlas</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#dc2626" />
      <text x="12" y="14" font-weight="600">Fine-Grained Mapping</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Street-level perception atlas</text>

      <circle cx="4" cy="48" r="2.5" fill="#dc2626" />
      <text x="12" y="52" font-weight="600">Mobility Prediction</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Dynamic flow forecasting</text>

      <circle cx="4" cy="86" r="2.5" fill="#dc2626" />
      <text x="12" y="90" font-weight="600">Urban Renewal Decision</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Identifying quality disparities</text>

      <circle cx="4" cy="124" r="2.5" fill="#dc2626" />
      <text x="12" y="128" font-weight="600">Digital Twin Platform</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Executable spatio-AI models</text>
    </g>
  </g>

</svg>'''

def create_pillar2():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" style="background:#ffffff; border-radius:10px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <marker id="arr-orange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ea580c" />
    </marker>
    <filter id="box-shadow2" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.04" />
    </filter>
  </defs>

  <rect width="{w}" height="{h}" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" />

  <!-- Top Banner -->
  <rect x="0" y="0" width="{w}" height="42" rx="10" fill="#f8fafc" />
  <rect x="0" y="32" width="{w}" height="10" fill="#f8fafc" />
  <line x1="0" y1="42" x2="{w}" y2="42" stroke="#e2e8f0" stroke-width="1" />
  <circle cx="24" cy="21" r="5" fill="#ea580c" />
  <text x="36" y="25" font-size="13" font-weight="700" fill="#0f172a" letter-spacing="0.3">RESEARCH PILLAR 2: ENVIRONMENTAL HEALTH &amp; MICROCLIMATE EXPOSURE</text>
  <rect x="{w-255}" y="10" width="235" height="22" rx="4" fill="#fff7ed" stroke="#fed7aa" stroke-width="1" />
  <text x="{w-137}" y="25" font-size="10.5" font-weight="600" fill="#c2410c" text-anchor="middle">Street Canyons • Thermal Stress • Health Equity</text>

  <!-- STAGE 1: Street Canyon Geometry & SVI -->
  <g transform="translate(24, 58)">
    <rect width="230" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow2)" />
    <rect width="230" height="34" rx="8" fill="#fff7ed" />
    <rect y="26" width="230" height="8" fill="#fff7ed" />
    <line x1="0" y1="34" x2="230" y2="34" stroke="#fed7aa" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#ea580c" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">1</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#9a3412">3D Street Canyon Sensing</text>

    <!-- Mini Graphic: Fisheye Sky View & Buildings -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="200" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="45" cy="21" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" />
      <path d="M 33 21 Q 45 10 57 21 Q 45 32 33 21" fill="#bae6fd" />
      <circle cx="45" cy="21" r="5" fill="#38bdf8" />
      <text x="45" y="23" font-size="7.5" font-weight="bold" fill="#0369a1" text-anchor="middle">SVF</text>
      <rect x="75" y="10" width="55" height="22" rx="3" fill="#ecfdf5" stroke="#10b981" />
      <text x="102" y="24" font-size="8.5" font-weight="600" fill="#047857" text-anchor="middle">Canopy %</text>
      <rect x="135" y="10" width="55" height="22" rx="3" fill="#f1f5f9" stroke="#64748b" />
      <text x="162" y="24" font-size="8.5" font-weight="600" fill="#334155" text-anchor="middle">Building %</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#ea580c" />
      <text x="12" y="14" font-weight="600">Hemispherical Fisheye Proj.</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Equidistant 180° sky projection</text>

      <circle cx="4" cy="48" r="2.5" fill="#ea580c" />
      <text x="12" y="52" font-weight="600">DeepLabV3+ Semantic Seg.</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Sky, tree canopy, road, walls</text>

      <circle cx="4" cy="86" r="2.5" fill="#ea580c" />
      <text x="12" y="90" font-weight="600">Sky View Factor (SVF)</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Pixel-level solid angle integration</text>

      <circle cx="4" cy="124" r="2.5" fill="#ea580c" />
      <text x="12" y="128" font-weight="600">Canyon Aspect Ratio (H/W)</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Building height vs street width</text>
    </g>
  </g>

  <!-- Flow Arrow 1 -> 2 -->
  <line x1="262" y1="190" x2="286" y2="190" stroke="#ea580c" stroke-width="2" marker-end="url(#arr-orange)" />

  <!-- STAGE 2: Solar Radiation & Microclimate Physics -->
  <g transform="translate(294, 58)">
    <rect width="245" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow2)" />
    <rect width="245" height="34" rx="8" fill="#fef9c3" />
    <rect y="26" width="245" height="8" fill="#fef9c3" />
    <line x1="0" y1="34" x2="245" y2="34" stroke="#fde047" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#ca8a04" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">2</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#854d0e">Microclimate Physics Modeling</text>

    <!-- Mini Graphic: Solar Ray Tracing -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="215" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="25" cy="21" r="8" fill="#f59e0b" />
      <line x1="25" y1="9" x2="25" y2="5" stroke="#f59e0b" stroke-width="1.5" />
      <line x1="25" y1="33" x2="25" y2="37" stroke="#f59e0b" stroke-width="1.5" />
      <line x1="13" y1="21" x2="9" y2="21" stroke="#f59e0b" stroke-width="1.5" />
      <line x1="37" y1="21" x2="41" y2="21" stroke="#f59e0b" stroke-width="1.5" />
      <path d="M 45 32 Q 95 10 145 32" fill="none" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="2,2" />
      <text x="95" y="22" font-size="8.5" font-weight="bold" fill="#e11d48" text-anchor="middle">Solar Azimuth/Zenith</text>
      <rect x="155" y="10" width="50" height="22" rx="3" fill="#fee2e2" stroke="#ef4444" />
      <text x="180" y="24" font-size="8" font-weight="700" fill="#b91c1c" text-anchor="middle">W/m² Flux</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#ca8a04" />
      <text x="12" y="14" font-weight="600">Solar Trajectory Tracking</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Hourly solar path ray intersection</text>

      <circle cx="4" cy="48" r="2.5" fill="#ca8a04" />
      <text x="12" y="52" font-weight="600">Direct &amp; Diffuse Radiation</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Canopy/building obstruction models</text>

      <circle cx="4" cy="86" r="2.5" fill="#ca8a04" />
      <text x="12" y="90" font-weight="600">Universal Thermal Index (UTCI)</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Coupling air temp, wind, humidity</text>

      <circle cx="4" cy="124" r="2.5" fill="#ca8a04" />
      <text x="12" y="128" font-weight="600">Multi-Season Simulation</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">May–October seasonal dynamics</text>
    </g>
  </g>

  <!-- Flow Arrow 2 -> 3 -->
  <line x1="547" y1="190" x2="571" y2="190" stroke="#ea580c" stroke-width="2" marker-end="url(#arr-orange)" />

  <!-- STAGE 3: Mobility-Weighted Spatiotemporal Exposure -->
  <g transform="translate(579, 58)">
    <rect width="235" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow2)" />
    <rect width="235" height="34" rx="8" fill="#ecfeff" />
    <rect y="26" width="235" height="8" fill="#ecfeff" />
    <line x1="0" y1="34" x2="235" y2="34" stroke="#a5f3fc" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#0891b2" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">3</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#164e63">Dynamic Human Exposure</text>

    <!-- Mini Graphic: Static vs Dynamic Exposure -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="205" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="10" y="10" width="85" height="22" rx="3" fill="#f1f5f9" stroke="#94a3b8" />
      <text x="52" y="24" font-size="8.5" fill="#475569" text-anchor="middle">Static (Residence)</text>
      <text x="103" y="24" font-size="10" font-weight="bold" fill="#0891b2" text-anchor="middle">→</text>
      <rect x="115" y="10" width="80" height="22" rx="3" fill="#cffafe" stroke="#0891b2" />
      <text x="155" y="24" font-size="8.5" font-weight="700" fill="#0e7490" text-anchor="middle">Dynamic Mobility</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#0891b2" />
      <text x="12" y="14" font-weight="600">Mobility-Weighted Exposure</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Accounting for daytime commuting</text>

      <circle cx="4" cy="48" r="2.5" fill="#0891b2" />
      <text x="12" y="52" font-weight="600">Spatial Syntax Integration</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Street accessibility &amp; pedestrian flows</text>

      <circle cx="4" cy="86" r="2.5" fill="#0891b2" />
      <text x="12" y="90" font-weight="600">Bivariate Spatial Clustering</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">High-radiation &amp; high-accessibility</text>

      <circle cx="4" cy="124" r="2.5" fill="#0891b2" />
      <text x="12" y="128" font-weight="600">Residence vs Ambient Gap</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Resolving the UGCoP uncertainty</text>
    </g>
  </g>

  <!-- Flow Arrow 3 -> 4 -->
  <line x1="822" y1="190" x2="846" y2="190" stroke="#ea580c" stroke-width="2" marker-end="url(#arr-orange)" />

  <!-- STAGE 4: Environmental Justice & Adaptation -->
  <g transform="translate(854, 58)">
    <rect width="202" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow2)" />
    <rect width="202" height="34" rx="8" fill="#fef2f2" />
    <rect y="26" width="202" height="8" fill="#fef2f2" />
    <line x1="0" y1="34" x2="202" y2="34" stroke="#fecaca" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#dc2626" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">4</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#991b1b">Health Equity &amp; Action</text>

    <!-- Mini Graphic: Disparity Bar Chart -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="172" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="25" y="22" width="20" height="14" fill="#60a5fa" rx="2" />
      <rect x="65" y="14" width="20" height="22" fill="#f87171" rx="2" />
      <rect x="105" y="8" width="20" height="28" fill="#dc2626" rx="2" />
      <text x="75" y="38" font-size="7.5" fill="#64748b" text-anchor="middle">Exposure Disparity</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#dc2626" />
      <text x="12" y="14" font-weight="600">Environmental Justice</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Vulnerable subgroup disparities</text>

      <circle cx="4" cy="48" r="2.5" fill="#dc2626" />
      <text x="12" y="52" font-weight="600">Urban Heat Mitigation</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Targeted tree canopy planting</text>

      <circle cx="4" cy="86" r="2.5" fill="#dc2626" />
      <text x="12" y="90" font-weight="600">Cool Walking Corridors</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Shading optimization in canyons</text>

      <circle cx="4" cy="124" r="2.5" fill="#dc2626" />
      <text x="12" y="128" font-weight="600">Evidence-Based Policy</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Climate-resilient urban standards</text>
    </g>
  </g>

</svg>'''

def create_pillar3():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" style="background:#ffffff; border-radius:10px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <marker id="arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a" />
    </marker>
    <filter id="box-shadow3" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.04" />
    </filter>
  </defs>

  <rect width="{w}" height="{h}" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2" />

  <!-- Top Banner -->
  <rect x="0" y="0" width="{w}" height="42" rx="10" fill="#f8fafc" />
  <rect x="0" y="32" width="{w}" height="10" fill="#f8fafc" />
  <line x1="0" y1="42" x2="{w}" y2="42" stroke="#e2e8f0" stroke-width="1" />
  <circle cx="24" cy="21" r="5" fill="#16a34a" />
  <text x="36" y="25" font-size="13" font-weight="700" fill="#0f172a" letter-spacing="0.3">RESEARCH PILLAR 3: SUSTAINABLE URBAN SYSTEMS &amp; SPATIAL OPTIMIZATION</text>
  <rect x="{w-245}" y="10" width="225" height="22" rx="4" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1" />
  <text x="{w-132}" y="25" font-size="10.5" font-weight="600" fill="#15803d" text-anchor="middle">Spatial Syntax • Agent-Based Models • 15-Min City</text>

  <!-- STAGE 1: Urban Network & Transit Topology -->
  <g transform="translate(24, 58)">
    <rect width="230" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow3)" />
    <rect width="230" height="34" rx="8" fill="#f0fdf4" />
    <rect y="26" width="230" height="8" fill="#f0fdf4" />
    <line x1="0" y1="34" x2="230" y2="34" stroke="#bbf7d0" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#16a34a" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">1</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#14532d">Urban Network Topology</text>

    <!-- Mini Graphic: Network Graph -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="200" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="30" cy="21" r="5" fill="#16a34a" />
      <circle cx="75" cy="12" r="6" fill="#2563eb" />
      <circle cx="75" cy="30" r="5" fill="#2563eb" />
      <circle cx="125" cy="21" r="7" fill="#ea580c" />
      <circle cx="170" cy="12" r="5" fill="#16a34a" />
      <circle cx="170" cy="30" r="5" fill="#16a34a" />
      <line x1="35" y1="21" x2="69" y2="12" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="35" y1="21" x2="69" y2="30" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="81" y1="12" x2="118" y2="21" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="81" y1="30" x2="118" y2="21" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="132" y1="21" x2="165" y2="12" stroke="#94a3b8" stroke-width="1.2" />
      <line x1="132" y1="21" x2="165" y2="30" stroke="#94a3b8" stroke-width="1.2" />
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#16a34a" />
      <text x="12" y="14" font-weight="600">Multimodal Transit Networks</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Metro, bus lines, walking &amp; cycling</text>

      <circle cx="4" cy="48" r="2.5" fill="#16a34a" />
      <text x="12" y="52" font-weight="600">Road Graph Topology</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Dual graph segment representations</text>

      <circle cx="4" cy="86" r="2.5" fill="#16a34a" />
      <text x="12" y="90" font-weight="600">POI &amp; Essential Services</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Healthcare, green spaces, schools</text>

      <circle cx="4" cy="124" r="2.5" fill="#16a34a" />
      <text x="12" y="128" font-weight="600">Demographic Microdata</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Census &amp; residential distribution</text>
    </g>
  </g>

  <!-- Flow Arrow 1 -> 2 -->
  <line x1="262" y1="190" x2="286" y2="190" stroke="#16a34a" stroke-width="2" marker-end="url(#arr-green)" />

  <!-- STAGE 2: Spatial Syntax & Agent-Based Modeling -->
  <g transform="translate(294, 58)">
    <rect width="245" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow3)" />
    <rect width="245" height="34" rx="8" fill="#eff6ff" />
    <rect y="26" width="245" height="8" fill="#eff6ff" />
    <line x1="0" y1="34" x2="245" y2="34" stroke="#bfdbfe" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#2563eb" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">2</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#1e3a8a">Spatial Syntax &amp; Multi-Agent ABM</text>

    <!-- Mini Graphic: Choice & Integration metrics -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="215" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="8" y="10" width="60" height="22" rx="3" fill="#dbeafe" stroke="#3b82f6" />
      <text x="38" y="24" font-size="8.5" font-weight="700" fill="#1d4ed8" text-anchor="middle">Choice (NACH)</text>
      <rect x="75" y="10" width="65" height="22" rx="3" fill="#fef3c7" stroke="#f59e0b" />
      <text x="107" y="24" font-size="8.5" font-weight="700" fill="#b45309" text-anchor="middle">Integr. (NAIN)</text>
      <rect x="148" y="10" width="58" height="22" rx="3" fill="#fce7f3" stroke="#ec4899" />
      <text x="177" y="24" font-size="8.5" font-weight="700" fill="#be185d" text-anchor="middle">ABM Agent</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#2563eb" />
      <text x="12" y="14" font-weight="600">Angular Segment Analysis</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Normalized Choice &amp; Integration</text>

      <circle cx="4" cy="48" r="2.5" fill="#2563eb" />
      <text x="12" y="52" font-weight="600">Agent-Based Simulation (ABM)</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Individual route choice &amp; activity schedules</text>

      <circle cx="4" cy="86" r="2.5" fill="#2563eb" />
      <text x="12" y="90" font-weight="600">Reinforcement Learning Agents</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Policy-guided behavioral decisions</text>

      <circle cx="4" cy="124" r="2.5" fill="#2563eb" />
      <text x="12" y="128" font-weight="600">Multi-Scale Accessibility</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Radii from 400m to 10,000m</text>
    </g>
  </g>

  <!-- Flow Arrow 2 -> 3 -->
  <line x1="547" y1="190" x2="571" y2="190" stroke="#16a34a" stroke-width="2" marker-end="url(#arr-green)" />

  <!-- STAGE 3: Multi-Objective Spatial Optimization -->
  <g transform="translate(579, 58)">
    <rect width="235" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow3)" />
    <rect width="235" height="34" rx="8" fill="#faf5ff" />
    <rect y="26" width="235" height="8" fill="#faf5ff" />
    <line x1="0" y1="34" x2="235" y2="34" stroke="#e9d5ff" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#9333ea" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">3</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#6b21a8">Spatial Optimization Engine</text>

    <!-- Mini Graphic: Pareto Frontier / 15-min Isochrone -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="205" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <circle cx="40" cy="21" r="14" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1" />
      <circle cx="40" cy="21" r="8" fill="#ddd6fe" />
      <circle cx="40" cy="21" r="3" fill="#7c3aed" />
      <text x="40" y="24" font-size="7" font-weight="bold" fill="#6d28d9" text-anchor="middle">15m</text>
      <rect x="75" y="10" width="120" height="22" rx="3" fill="#f3e8ff" stroke="#9333ea" />
      <text x="135" y="24" font-size="8.5" font-weight="700" fill="#7e22ce" text-anchor="middle">Pareto Optimal Frontier</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#9333ea" />
      <text x="12" y="14" font-weight="600">15-Minute City Isochrones</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Walking &amp; transit catchment bounds</text>

      <circle cx="4" cy="48" r="2.5" fill="#9333ea" />
      <text x="12" y="52" font-weight="600">Facility Allocation (MCLP)</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Maximal covering location problem</text>

      <circle cx="4" cy="86" r="2.5" fill="#9333ea" />
      <text x="12" y="90" font-weight="600">Transit-Oriented Development</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Optimizing node-place synergies</text>

      <circle cx="4" cy="124" r="2.5" fill="#9333ea" />
      <text x="12" y="128" font-weight="600">Genetic &amp; Heuristic Solvers</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">NSGA-II multi-objective balance</text>
    </g>
  </g>

  <!-- Flow Arrow 3 -> 4 -->
  <line x1="822" y1="190" x2="846" y2="190" stroke="#16a34a" stroke-width="2" marker-end="url(#arr-green)" />

  <!-- STAGE 4: Policy & Sustainable Governance -->
  <g transform="translate(854, 58)">
    <rect width="202" height="{box_h}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" filter="url(#box-shadow3)" />
    <rect width="202" height="34" rx="8" fill="#ecfdf5" />
    <rect y="26" width="202" height="8" fill="#ecfdf5" />
    <line x1="0" y1="34" x2="202" y2="34" stroke="#a7f3d0" stroke-width="1" />
    <rect x="12" y="8" width="18" height="18" rx="4" fill="#059669" />
    <text x="21" y="21" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">4</text>
    <text x="36" y="22" font-size="12" font-weight="700" fill="#065f46">Decarbonized Cities</text>

    <!-- Mini Graphic: Carbon Reduction & Active Mobility -->
    <g transform="translate(15, 48)">
      <rect x="0" y="0" width="172" height="42" rx="5" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="15" y="10" width="60" height="22" rx="3" fill="#d1fae5" stroke="#10b981" />
      <text x="45" y="24" font-size="8" font-weight="700" fill="#047857" text-anchor="middle">CO₂ -35%</text>
      <rect x="85" y="10" width="75" height="22" rx="3" fill="#e0f2fe" stroke="#0284c7" />
      <text x="122" y="24" font-size="8" font-weight="700" fill="#0369a1" text-anchor="middle">Active Travel</text>
    </g>

    <!-- Bullet Points -->
    <g transform="translate(15, 106)" font-size="11" fill="#334155">
      <circle cx="4" cy="10" r="2.5" fill="#059669" />
      <text x="12" y="14" font-weight="600">Carbon Emission Mitigation</text>
      <text x="12" y="28" font-size="9.5" fill="#64748b">Reducing vehicular travel VMT</text>

      <circle cx="4" cy="48" r="2.5" fill="#059669" />
      <text x="12" y="52" font-weight="600">Active Mobility Promotion</text>
      <text x="12" y="66" font-size="9.5" fill="#64748b">Safe and connected greenways</text>

      <circle cx="4" cy="86" r="2.5" fill="#059669" />
      <text x="12" y="90" font-weight="600">Public Service Equity</text>
      <text x="12" y="104" font-size="9.5" fill="#64748b">Eliminating transit deserts</text>

      <circle cx="4" cy="124" r="2.5" fill="#059669" />
      <text x="12" y="128" font-weight="600">Spatial Planning Support</text>
      <text x="12" y="142" font-size="9.5" fill="#64748b">Actionable municipal decisions</text>
    </g>
  </g>

</svg>'''

with open('images/research/pillar1_geoai_foundation_models.svg', 'w') as f:
    f.write(create_pillar1())

with open('images/research/pillar2_environmental_health_exposure.svg', 'w') as f:
    f.write(create_pillar2())

with open('images/research/pillar3_sustainable_urban_systems.svg', 'w') as f:
    f.write(create_pillar3())

print('Updated all 3 research pillar SVG diagrams with refined vertical breathing room!')
