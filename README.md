# VIN Decoder SPA (React + Vite)

A Single Page Application (SPA) to decode Vehicle Identification Numbers (VIN) using the NHTSA API.

## Live Demo

The application is deployed and accessible at:
[Live Deployment Link](https://tz-abf-vin-decoder.vercel.app/)

## Features

* **Decode VIN**: Enter a 17-character VIN code. It checks for field presence, length, alphanumeric format, and invalid characters (I, O, Q are forbidden).
* **Recent Searches**: Stores the last 3 unique searches in local storage.
* **Results Table**: Filters variables to only display populated values.
* **Variables Catalog**: Searchable directory listing all variables defined in the API database, linking to individual description pages.
* **Responsive Layout**: Minimalist layout using vanilla CSS. Supports viewport sizes from 420px to 1440px.

## Local Launch Instructions

Make sure you have Node.js (version 18 or higher) installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tz_abf_vin_decoder.git
   cd tz_abf_vin_decoder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser.

4. Build production static bundle:
   ```bash
   npm run build
   ```
   Static files will compile into the `dist` directory.

## Deployment Notes

To support client-side routing on static hosting services (like GitHub Pages) without server rewrite rules, this project uses HashRouter.