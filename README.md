# NAWAR GeoAI
**Smart Multi-Season Crop Rotation & Climate Resilience Planner for Dry Regions**  
*NASA Space Apps Challenge 2026 ("Field Shift: Adapting Farms with NASA Data") — Built by **NAWAR Team***

> *"Helping dry lands bloom, one smart season at a time."*

---

## Overview
**NAWAR GeoAI** is a lightweight, bilingual (English / Arabic RTL) browser-based platform that transforms **NASA POWER** agroclimatology, **SRTM** terrain elevation, soil properties, and crop history into a stress-tested **3-season crop rotation plan** for farms in arid and semi-arid regions.

Instead of recommending a single crop for a single season, NAWAR GeoAI plans **three consecutive seasons ahead**, contrasts **three rotation strategies** (*Status Quo* monoculture vs. *Primary Recommended Rotation* vs. *Conservative Dryland Buffer*), and stress-tests every season against interactive temperature and rainfall shifts with transparent failure diagnostics.

---

## Key Capabilities & 7-Step Pipeline
1. **Interactive Farm Map & Arid Benchmarks (Leaflet.js)**:
   - Click anywhere on the map or drag the pin to capture exact `lat` and `lon`, with a Street / Satellite layer toggle and GPS geolocation support.
   - Includes 4 one-click arid demo sites: **Bisha, Saudi Arabia**, **Meknes, Morocco**, **Jodhpur, India**, and **Imperial Valley, USA**.
2. **Farm & Soil Inputs**:
   - Dynamically loads 14 dryland-suitable crops from `crops.json`, paired with Soil Type (`Sandy`, `Loamy`, `Clay`, `Saline / Arid`), Starting Season, and Farmer Priority (`Save Water`, `Maximize Profit`, `Improve Soil Health`).
3. **Live NASA Earth Observation + Resilient Offline Fallback**:
   - **NASA POWER Climatology API**: Fetches seasonal `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, and `ALLSKY_SFC_SW_DWN`.
   - **SRTM Elevation API**: Fetches terrain elevation (`m`) to evaluate slope, drainage, and runoff infiltration risk.
   - Displays a clear status badge indicating **Live NASA Data** or **Offline Fallback Estimate**.
4. **3-Strategy Comparison Engine**:
   - **Strategy 1 — Status Quo (Existing Practice)**: Repeats the previous crop across Seasons 1–3 to expose nutrient mining, pest buildup, and climate risk.
   - **Strategy 2 — Primary Recommended Rotation**: Diversified 3-season rotation weighted by farmer priority, penalizing consecutive same-family repeats and rewarding cereal-to-legume (*Poaceae* → *Fabaceae*) nitrogen cycling.
   - **Strategy 3 — Conservative Dryland Buffer**: Ultra-low-water, soil-stabilizing dryland sequence built for drought resilience.
5. **Season Cards & Agronomic Badges**:
   - Displays seasonal water requirement (`mm`), effective rainfall (`mm`), estimated net return (`$/ha`), plain-language rationale, **Functional Role** (`Nitrogen-Fixing`, `Deep-Rooting`, `Cover / Anti-Erosion`, `Drought-Tolerant`), and **Field Risk/Benefit** (`Interrupts Pest Cycle`, `Prevents Bare-Soil Erosion`, `Peak Heat/ET Vulnerability`).
6. **Interactive Climate Stress-Testing & Charts (Chart.js)**:
   - Quick presets (**Baseline**, **+2°C Warming**, **-20% Rainfall**) plus live sliders for **Temperature Shift** (`0.0°C` to `+4.0°C`, step `0.5°C`) and **Rainfall Change** (`-40%` to `+20%`, step `5%`).
   - Recalculates crop heat thresholds, water deficits, per-season explanations, and **Climate Confidence Score** (`3/3 High Resilience`, `2/3 Moderate Resilience`, `1/3 High Risk`).
   - Charts: Seasonal Crop Water Demand vs. Effective Rainfall (`mm`) and Scenario Resilience Comparison across the 3 strategies.
7. **Farmer Decision-Support & Ground Truth**:
   - **Information Gaps & Local Review**: Highlights local factors satellites cannot measure (well water salinity, local seed availability, farmgate market demand, subsoil compaction).
   - **Satellite vs. Ground Truth (NAWAR Field Node)**: Explains how coarse satellite grids (`~55 km` NASA POWER / `9–36 km` SMAP) pair with a low-cost in-field soil moisture & temperature probe.
   - **Collapsible Farmer's Science Glossary**: Defines *Evapotranspiration (ET)*, *Water Balance*, *Heat-Stress Threshold*, and *Botanical Family Rotation*.

---

## NASA & Agro-Ecological Data Sources
- **NASA POWER Agroclimatology API**: [power.larc.nasa.gov](https://power.larc.nasa.gov/) — Live seasonal temperature, precipitation, and solar irradiance climatology.
- **SRTM Elevation (via Open-Meteo Elevation API)**: Terrain elevation (`m`) for runoff and infiltration risk assessment.
- **NASA SMAP / GPM IMERG / MODIS & FAO GAEZ**: Reference datasets for soil moisture, precipitation anomalies, vegetation health, and agro-ecological suitability.

---

## Project Structure
```text
├── index.html      # Bilingual (EN / AR RTL) web application
├── style.css       # Responsive desktop & mobile layout styles
├── crops.json      # 14 dryland-suitable crops across 6 botanical families
├── app.js          # Map controller, NASA/SRTM fetchers, 3-strategy & stress-test engine, Chart.js
└── README.md       # Project documentation
```

---

## Running Locally & GitHub Pages
No build step or backend server is required for static hosting:
1. Clone the repository:
   ```bash
   git clone https://github.com/ayazashy/NAWAR.git
   ```
2. Serve the static files locally (for `fetch('crops.json')` to work without `file://` restrictions):
   ```bash
   python -m http.server 8080
   ```
3. Open `http://localhost:8080` in your browser, or enable **GitHub Pages** directly from the `main` branch root.
