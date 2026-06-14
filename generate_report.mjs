import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const browser = await puppeteer.launch({ 
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RIVERSIGHT - Project Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&family=Inter:wght@300;400;600;700&family=JetBrains+Mono&display=swap');
    
    :root {
      --primary: #0a0e1a;
      --secondary: #111827;
      --accent: #06b6d4;
    }

    body {
      font-family: 'Times New Roman', serif;
      color: #000;
      line-height: 1.8;
      margin: 0;
      padding: 0;
      background-color: #fff;
      font-size: 13pt;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    .container {
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 24pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
      line-height: 1.3;
    }
    
    h2 {
      font-size: 18pt;
      color: var(--primary);
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
      margin-top: 40px;
      font-family: 'Inter', sans-serif;
    }
    
    h3 {
      font-size: 14pt;
      color: #1f2937;
      margin-top: 24px;
      font-family: 'Inter', sans-serif;
    }

    h4 {
      font-size: 12pt;
      color: #374151;
      margin-top: 16px;
      font-family: 'Inter', sans-serif;
      font-style: italic;
    }
    
    p {
      text-align: justify;
      margin-bottom: 15px;
    }
    
    ul, ol {
      padding-left: 30px;
      margin-bottom: 15px;
      text-align: justify;
    }
    
    li {
      margin-bottom: 8px;
    }
    
    .mermaid {
      text-align: center;
      margin: 30px 0;
      padding: 20px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      page-break-inside: avoid;
    }
    
    .table-container {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
      page-break-inside: avoid;
    }
    
    th, td {
      border: 1px solid #cbd5e1;
      padding: 10px;
      text-align: left;
    }
    
    th {
      background-color: #f1f5f9;
      font-family: 'Inter', sans-serif;
      font-size: 11pt;
    }
    
    td {
      font-size: 11pt;
    }

    .code-block {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10pt;
      background: #1e293b;
      color: #f8fafc;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      page-break-inside: avoid;
      line-height: 1.4;
    }
    
    /* Cover Page Styles */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      text-align: center;
    }
    
    .cover-title {
      font-size: 28pt;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      margin-bottom: 10px;
      line-height: 1.2;
    }
    
    .cover-subtitle {
      font-size: 16pt;
      font-family: 'Inter', sans-serif;
      color: #475569;
      margin-bottom: 40px;
    }

    .cover-details {
      font-size: 14pt;
      margin: 30px 0;
      line-height: 2;
    }
    
    .student-info {
      margin-top: 40px;
      font-size: 14pt;
      text-align: center;
      width: 100%;
    }

    .college-info {
      margin-top: 60px;
      font-size: 16pt;
      font-weight: bold;
      text-transform: uppercase;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .toc-item .dots {
      flex-grow: 1;
      border-bottom: 1px dotted #000;
      margin: 0 10px;
      position: relative;
      top: -6px;
    }

    .certificate-content, .declaration-content {
      margin-top: 50px;
      line-height: 2;
      text-align: justify;
    }

    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 80px;
    }

    .signature-block {
      text-align: center;
    }
    
    .signature-line {
      border-top: 1px solid #000;
      width: 250px;
      margin-top: 60px;
      padding-top: 10px;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
  </script>
</head>
<body>
  <div class="container">
    
    <!-- Cover Page -->
    <div class="cover-page">
      <div style="font-size: 16pt; margin-bottom: 20px;">A Mini-Project Report On</div>
      <div class="cover-title">RIVERSIGHT</div>
      <div class="cover-subtitle">An IoT-Enabled Intelligent River Monitoring, Telemetry, GIS & Predictive Analytics Platform</div>
      
      <div class="cover-details">
        Submitted in partial fulfillment of the requirements for the degree of<br>
        <strong>Bachelor of Technology</strong><br>
        in<br>
        <strong>Computer Science and Engineering</strong>
      </div>
      
      <div class="student-info">
        Submitted by:<br>
        <strong>T. Shyam Sai</strong><br>
        Roll No: <strong>324103310227</strong><br>
      </div>

      <div class="student-info">
        Under the esteemed guidance of:<br>
        <strong>Dr. H. Prashanth Reddy</strong><br>
      </div>

      <div class="college-info">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Gayatri_Vidya_Parishad_College_of_Engineering_logo.png/220px-Gayatri_Vidya_Parishad_College_of_Engineering_logo.png" alt="GVP Logo" style="width: 120px; height: auto; margin-bottom: 20px;" onerror="this.style.display='none'"><br>
        Department of Computer Science and Engineering<br>
        Gayatri Vidya Parishad College of Engineering<br>
        (Autonomous)<br>
        Visakhapatnam, Andhra Pradesh<br>
        2025-2026
      </div>
    </div>

    <!-- Certificate Page -->
    <div class="page-break"></div>
    <div style="text-align: center; margin-top: 50px;">
      <h1>CERTIFICATE</h1>
    </div>
    <div class="certificate-content">
      <p>This is to certify that the project report entitled <strong>"RIVERSIGHT: An IoT-Enabled Intelligent River Monitoring, Telemetry, GIS & Predictive Analytics Platform"</strong> is a bonafide record of the work successfully carried out by <strong>T. Shyam Sai (Roll No: 324103310227)</strong>. This work is submitted in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science and Engineering from Gayatri Vidya Parishad College of Engineering, Visakhapatnam, during the academic year 2025-2026.</p>
      <p>The results embodied in this report have been verified and are found to be satisfactory. This work has not been submitted to any other University or Institution for the award of any degree or diploma.</p>
      
      <div class="signatures">
        <div class="signature-block">
          <div class="signature-line">
            <strong>Dr. H. Prashanth Reddy</strong><br>
            Internal Guide
          </div>
        </div>
        <div class="signature-block">
          <div class="signature-line">
            <strong>Head of Department</strong><br>
            Department of CSE<br>
            GVP College of Engineering
          </div>
        </div>
      </div>
    </div>

    <!-- Declaration Page -->
    <div class="page-break"></div>
    <div style="text-align: center; margin-top: 50px;">
      <h1>DECLARATION</h1>
    </div>
    <div class="declaration-content">
      <p>I, <strong>T. Shyam Sai</strong>, hereby declare that the project report entitled <strong>"RIVERSIGHT: An IoT-Enabled Intelligent River Monitoring, Telemetry, GIS & Predictive Analytics Platform"</strong> submitted in partial fulfillment for the award of the degree of Bachelor of Technology in Computer Science and Engineering to Gayatri Vidya Parishad College of Engineering, is my original work. </p>
      <p>I further declare that the work reported in this project has not been submitted, either in part or in full, for the award of any other degree or diploma in this or any other University or Institution.</p>
      
      <div style="margin-top: 100px; text-align: right;">
        <strong>T. Shyam Sai</strong><br>
        Roll No: 324103310227
      </div>
    </div>

    <!-- Acknowledgement Page -->
    <div class="page-break"></div>
    <div style="text-align: center; margin-top: 50px;">
      <h1>ACKNOWLEDGEMENT</h1>
    </div>
    <div class="declaration-content">
      <p>The success and final outcome of this project required a lot of guidance and assistance from many people, and I am extremely privileged to have got this all along the completion of my project. All that I have done is only due to such supervision and assistance, and I would not forget to thank them.</p>
      <p>I respect and thank <strong>Dr. H. Prashanth Reddy</strong>, my project guide, for providing me an opportunity to do the project work in Gayatri Vidya Parishad College of Engineering and giving me all support and guidance which made me complete the project duly. I am extremely thankful for providing such a nice support and guidance, although having a busy schedule.</p>
      <p>I owe my deep gratitude to the Head of the Department, CSE, for his valuable guidance and encouragement throughout this project.</p>
      <p>I would also like to express my sincere thanks to the teaching and non-teaching staff of the Department of Computer Science and Engineering for their continuous support.</p>
      <p>Finally, I would like to thank my parents, family, and friends who have been a constant source of inspiration and motivation throughout my academic journey.</p>
      
      <div style="margin-top: 80px; text-align: right;">
        <strong>T. Shyam Sai</strong>
      </div>
    </div>

    <!-- Abstract -->
    <div class="page-break"></div>
    <div style="text-align: center; margin-top: 50px;">
      <h1>ABSTRACT</h1>
    </div>
    <div class="declaration-content">
      <p>Inland water transport and river basin management are critical components of sustainable infrastructure and hydrology. Traditional river monitoring mechanisms rely on manual sampling and disconnected legacy systems, resulting in delayed responses to critical events such as flooding, sediment accumulation, and reduction in Least Available Depth (LAD) for navigation.</p>
      <p>This project, <strong>RIVERSIGHT</strong>, presents an enterprise-grade, IoT-enabled intelligent river monitoring, telemetry, GIS, and predictive analytics platform. Designed explicitly for government-backed hydrological projects, the platform integrates real-time IoT sensor data, spatial mapping, and machine learning models to provide actionable intelligence.</p>
      <p>The system architecture utilizes a robust modern web stack including React, Next.js 14, TypeScript, and Tailwind CSS, coupled with Recharts for dynamic time-series visualizations and Leaflet for geospatial mapping. The core modules include real-time telemetry streaming, GIS river routing with sediment hotspot overlays, bathymetry (depth profile) analysis, and a machine learning predictive engine capable of forecasting LAD reductions and anomalous discharge events.</p>
      <p>By simulating realistic real-time telemetry from multiple stations along the river network, RIVERSIGHT demonstrates the capacity to process high-frequency IoT data and present it through a premium, glassmorphism-styled dashboard. The system's predictive alerting mechanism ensures that stakeholders receive early warnings regarding navigation hazards, allowing for proactive dredging and disaster mitigation. Ultimately, RIVERSIGHT serves as a comprehensive proof-of-concept for the future of intelligent, automated, and predictive inland waterway management.</p>
    </div>

    <!-- Table of Contents -->
    <div class="page-break"></div>
    <div style="text-align: center; margin-top: 50px;">
      <h1>TABLE OF CONTENTS</h1>
    </div>
    <div style="font-size: 14pt; margin-top: 40px; line-height: 1.8;">
      <div class="toc-item"><span>1. Introduction</span><span>1</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>1.1 Background</span><span>1</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>1.2 Problem Statement</span><span>2</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>1.3 Objectives</span><span>2</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>1.4 Scope of the Project</span><span>3</span></div>
      
      <div class="toc-item"><span>2. Literature Survey</span><span>4</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>2.1 Existing River Monitoring Systems</span><span>4</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>2.2 IoT in Hydrology</span><span>5</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>2.3 Machine Learning for Predictive Analytics</span><span>6</span></div>
      
      <div class="toc-item"><span>3. System Architecture</span><span>7</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>3.1 High-Level Architecture</span><span>7</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>3.2 Technology Stack</span><span>9</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>3.3 Data Flow and Integration</span><span>11</span></div>
      
      <div class="toc-item"><span>4. Core Modules Implementation</span><span>13</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>4.1 Real-Time Telemetry Module</span><span>13</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>4.2 Geospatial Information System (GIS) Module</span><span>15</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>4.3 Bathymetry & LAD Analysis Module</span><span>17</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>4.4 Predictive Analytics Engine</span><span>19</span></div>
      <div class="toc-item" style="padding-left: 20px;"><span>4.5 Alert Center & Early Warning System</span><span>21</span></div>
      
      <div class="toc-item"><span>5. UI/UX Design & Frontend Engineering</span><span>22</span></div>
      
      <div class="toc-item"><span>6. Testing and Validation</span><span>25</span></div>
      
      <div class="toc-item"><span>7. Conclusion & Future Scope</span><span>27</span></div>
      
      <div class="toc-item"><span>8. References</span><span>29</span></div>
    </div>

    <!-- Chapter 1 -->
    <div class="page-break"></div>
    <h2>1. Introduction</h2>
    
    <h3>1.1 Background</h3>
    <p>River basins form the lifeline of inland commerce, agriculture, and ecological balance. The management of these water bodies requires continuous and accurate monitoring of various hydrological parameters. Inland Water Transport (IWT) serves as an economically viable and environmentally friendly mode of transport compared to rail and road. However, its success heavily depends on the navigability of the rivers, which is determined by parameters such as the Least Available Depth (LAD), flow velocity, sediment deposition, and turbidity.</p>
    <p>Historically, river monitoring has been conducted through manual sampling and periodic surveying, methods that are labor-intensive, costly, and inherently prone to delay. The advent of the Internet of Things (IoT) has revolutionized environmental monitoring by enabling the deployment of interconnected sensor networks capable of transmitting high-frequency data in real time. When combined with Geographic Information Systems (GIS) and Machine Learning (ML), IoT data can be transformed from mere statistics into predictive intelligence.</p>

    <h3>1.2 Problem Statement</h3>
    <p>Despite the critical importance of river systems, managing authorities often operate using fragmented, legacy systems that lack real-time visibility and predictive capabilities. The primary challenges in current inland waterway management include:</p>
    <ul>
      <li><strong>Lack of Real-Time Intelligence:</strong> Delays in data acquisition regarding critical metrics like LAD and water level can lead to navigation hazards and vessel groundings.</li>
      <li><strong>Unpredictable Sediment Deposition:</strong> Rivers are dynamic. Unmonitored sediment accumulation leads to the formation of shallow hotspots, blocking navigation channels.</li>
      <li><strong>Reactive Maintenance:</strong> Dredging operations are currently scheduled reactively rather than proactively, leading to massive economic inefficiencies.</li>
      <li><strong>Fragmented Data Visualization:</strong> Telemetry, GIS, and survey data exist in silos, making it difficult for researchers and authorities to form a cohesive understanding of river health.</li>
    </ul>

    <h3>1.3 Objectives</h3>
    <p>The primary objective of the RIVERSIGHT project is to architect and develop an enterprise-grade, comprehensive web platform that serves as a centralized intelligence dashboard for river management. Specific objectives include:</p>
    <ol>
      <li>Developing a modular, scalable architecture capable of ingesting high-frequency IoT telemetry data from multiple river stations.</li>
      <li>Implementing real-time data visualization techniques using modern React charting libraries to display trends in water level, discharge, LAD, and turbidity.</li>
      <li>Integrating a Geospatial Information System (GIS) to plot telemetry stations, river routes, and dynamically generated sediment risk heatmaps.</li>
      <li>Designing a Bathymetry analysis module to compare historical and current riverbed cross-sections.</li>
      <li>Architecting the framework for a Machine Learning Predictive Engine capable of forecasting LAD reductions, sediment hotspot formations, and anomaly detections.</li>
      <li>Creating a premium, highly responsive user interface tailored for scientific researchers and government agencies using advanced CSS techniques like glassmorphism.</li>
    </ol>

    <h3>1.4 Scope of the Project</h3>
    <p>The scope of RIVERSIGHT is to deliver a fully functional frontend architecture supported by a robust data simulation engine. It serves as a comprehensive proof-of-concept for the National Hydrology Project or similar IIT-backed research initiatives. While the platform currently operates on simulated high-fidelity IoT data utilizing mathematical models (such as sinusoidal flow variations and randomized drift), the system architecture, API routes, and state management are designed to seamlessly integrate with actual MQTT brokers, PostgreSQL/TimescaleDB databases, and Python-based ML microservices in a production environment.</p>

    <!-- Chapter 2 -->
    <div class="page-break"></div>
    <h2>2. Literature Survey</h2>
    
    <h3>2.1 Existing River Monitoring Systems</h3>
    <p>Traditional river monitoring largely relies on telemetry stations that record stage (water level) and discharge using float sensors or acoustic Doppler current profilers (ADCP). Platforms like the Central Water Commission's (CWC) e-SWIS provide basic data aggregation but often lack real-time predictive analytics and modern user interfaces. Existing systems are typically structured as static data repositories rather than dynamic decision-support systems.</p>
    <p>Recent studies in hydrology emphasize the necessity of transitioning from Data Acquisition Systems (DAS) to Intelligent Decision Support Systems (IDSS). The primary gap identified in the literature is the lack of seamless integration between real-time sensor streams and advanced GIS visualizations, an issue RIVERSIGHT directly addresses.</p>

    <h3>2.2 IoT and Edge Computing in Hydrology</h3>
    <p>The proliferation of LoRaWAN and Narrowband IoT (NB-IoT) has made it feasible to deploy dense networks of sensors in remote riverine environments. Research by Al-Fagih et al. (2020) demonstrated the efficacy of IoT networks in flood monitoring, highlighting that real-time data ingestion requires robust, non-blocking architectures at the application layer. RIVERSIGHT simulates this high-frequency environment, testing the frontend's ability to render data updates every few seconds without performance degradation.</p>

    <h3>2.3 GIS and Spatial Mapping</h3>
    <p>Geographic Information Systems are indispensable for watershed management. Traditional desktop GIS tools (like ArcGIS) are powerful but lack web accessibility for rapid decision-making. WebGIS, leveraging libraries like Leaflet and Mapbox, has emerged as the standard for modern platforms. RIVERSIGHT incorporates React-Leaflet to project GeoJSON overlays representing river routes, telemetry stations, and dynamically generated polygons indicating high-risk sediment zones.</p>

    <h3>2.4 Machine Learning for Predictive Analytics</h3>
    <p>Machine Learning models, specifically Long Short-Term Memory (LSTM) networks and Gradient Boosting Machines (GBM), have shown immense promise in time-series forecasting of river discharge and sediment transport. While deploying real ML models requires a backend Python infrastructure, RIVERSIGHT architects the integration points for these models. By designing specific UI components that parse predicted values, confidence intervals, and contributing factors, the platform bridges the gap between data science outputs and actionable operational intelligence.</p>

    <!-- Chapter 3 -->
    <div class="page-break"></div>
    <h2>3. System Architecture</h2>

    <h3>3.1 High-Level Architecture</h3>
    <p>RIVERSIGHT adopts a decoupled, microservices-ready architecture. The frontend is built using Next.js 14 App Router, ensuring server-side rendering capabilities, enhanced SEO, and streamlined API route creation. The architecture is broadly divided into the Data Ingestion Layer, Application Layer, and Visualization Layer.</p>

    <div class="mermaid">
      graph TD
        subgraph "Data Ingestion & Simulation Layer"
            IoT[IoT Sensors / ADCP] -.->|Future| MQTT[MQTT Gateway]
            MQTT -.->|Future| DB[(Timescale DB)]
            Sim[Mock Data Simulator Engine] --> API[Next.js API Routes]
            DB -.->|Future| API
        end

        subgraph "Application Layer (Next.js 14)"
            API --> Hook[useTelemetry Hook]
            Hook --> Context[Global State Management]
            Context --> Pages[Dashboard Routing]
        end

        subgraph "Visualization Layer (Client)"
            Pages --> Dash[Dashboard Home]
            Pages --> Telem[Telemetry Grid]
            Pages --> Maps[GIS Leaflet Maps]
            Pages --> Charts[Recharts Time-Series]
        end

        subgraph "Predictive Layer"
            ML[Python ML Models] -.->|Future| API
            SimPred[Mock Prediction Engine] --> API
        end
    </div>

    <h3>3.2 Technology Stack</h3>
    <table class="table-container">
      <tr>
        <th style="width: 30%">Layer / Function</th>
        <th>Technology Used</th>
      </tr>
      <tr>
        <td><strong>Core Framework</strong></td>
        <td>Next.js 14 (App Router), React 19</td>
      </tr>
      <tr>
        <td><strong>Programming Language</strong></td>
        <td>TypeScript (Strict Mode)</td>
      </tr>
      <tr>
        <td><strong>Styling & UI</strong></td>
        <td>Tailwind CSS v4, Custom CSS for Glassmorphism</td>
      </tr>
      <tr>
        <td><strong>Data Visualization</strong></td>
        <td>Recharts (React-native SVG charting)</td>
      </tr>
      <tr>
        <td><strong>Geospatial Mapping</strong></td>
        <td>React-Leaflet, Leaflet, OpenStreetMap</td>
      </tr>
      <tr>
        <td><strong>Icons & Typography</strong></td>
        <td>Lucide-React, Inter, JetBrains Mono</td>
      </tr>
    </table>

    <h3>3.3 Feature-Driven Folder Structure</h3>
    <p>To ensure enterprise-grade scalability, the codebase is structured around a "Feature-Driven" architecture rather than grouping by file type. This modularizes the codebase, allowing features like Bathymetry or Telemetry to act as independent micro-apps within the larger ecosystem.</p>

    <div class="code-block">
src/
├── app/                  # Next.js App Router (Pages & API)
│   ├── (routes)/         # alerts, analytics, bathymetry, gis, telemetry
│   ├── api/              # API Route Handlers
│   └── globals.css       # Tailwind v4 configuration & base styles
├── components/           # Shared/Global UI Components
│   ├── charts/           # Reusable Recharts (TimeSeries, Gauge)
│   ├── layout/           # Sidebar, Header, DashboardShell
│   └── ui/               # GlassCard, StatusBadge, MetricCard
├── config/               # Application-wide configurations
├── data/                 # Mock Data Engines & GeoJSON
├── features/             # Feature-specific logic & components
│   ├── alerts/
│   ├── analytics/
│   ├── bathymetry/
│   ├── dashboard/
│   ├── gis/
│   ├── lad/
│   ├── predictions/
│   └── sediment/
├── hooks/                # Global React Hooks (useTelemetry)
├── lib/                  # Utilities (formatters, constants, class merger)
└── types/                # Strict TypeScript Definitions
    </div>

    <!-- Chapter 4 -->
    <div class="page-break"></div>
    <h2>4. Core Modules Implementation</h2>

    <h3>4.1 Real-Time Telemetry Module</h3>
    <p>The Telemetry module is the heart of the RIVERSIGHT platform. It is responsible for displaying live sensor streams from multiple deployed stations. The implementation leverages a robust <code>useTelemetry</code> custom hook that manages the real-time polling and historical data aggregation.</p>
    <p><strong>Simulation Engine:</strong> In the absence of live hardware, a highly sophisticated mock simulation engine was developed (<code>mockTelemetry.ts</code>). It generates realistic hydrological data using base values combined with randomized drift and sinusoidal variations to mimic natural river fluctuations. The generator supports parameters including Water Level, Least Available Depth (LAD), Discharge, Turbidity, Sediment Load, Rainfall, and Flow Velocity.</p>
    
    <div class="code-block">
// Sample of the telemetry generation logic
export function generateTelemetryReading(stationId: string): TelemetryReading {
  const drift = getStationDrift(stationId);
  const timeVariation = Math.sin(Date.now() / 60000) * 0.3; 

  return {
    id: \`\${stationId}-\${Date.now()}\`,
    timestamp: Date.now(),
    waterLevel: Math.max(0, BASE_VALUES.waterLevel + drift.waterLevel + 
                randomInRange(-VARIATION.waterLevel, VARIATION.waterLevel) + timeVariation * 0.5),
    discharge: Math.max(100, BASE_VALUES.discharge + drift.discharge + 
               randomInRange(-VARIATION.discharge, VARIATION.discharge) + timeVariation * 100),
    // ...other parameters
  };
}
    </div>

    <p>The UI is composed of <code>MetricCard</code> components that feature animated value transitions (using <code>requestAnimationFrame</code> for smooth easing) and inline SVG sparklines to show the immediate trend without overwhelming the user with massive charts.</p>

    <h3>4.2 Geospatial Information System (GIS) Module</h3>
    <p>Spatial awareness is critical for river management. The GIS module integrates <code>react-leaflet</code> to render interactive maps. To ensure compatibility with Next.js Server-Side Rendering (SSR), the map component is dynamically imported with <code>ssr: false</code>.</p>
    <p>The map renders multiple layers:</p>
    <ul>
      <li><strong>Basemap:</strong> A dark-themed CartoDB tile layer to match the platform's aesthetics.</li>
      <li><strong>River Route:</strong> Rendered using a GeoJSON LineString overlay representing the physical path of the river.</li>
      <li><strong>Station Markers:</strong> Custom HTML markers denoting the exact latitude/longitude of telemetry stations. The markers are color-coded based on the station's operational status.</li>
      <li><strong>Sediment Zones:</strong> Polygon overlays denoting areas of high sediment deposition, visually alerting users to potential navigation hazards.</li>
    </ul>

    <div class="page-break"></div>

    <h3>4.3 Bathymetry & LAD Analysis Module</h3>
    <p>Bathymetry analysis is essential for understanding the riverbed profile and ensuring safe navigation channels. This module presents cross-sectional depth profiles generated via a custom algorithm that simulates natural riverbed topography, including features like thalwegs and sandbars.</p>

    <div class="mermaid">
      graph LR
        A[Survey Data] --> B[Cross Section Points]
        B --> C[Distance vs Depth Array]
        C --> D[Recharts AreaChart]
        D --> E[Depth Profile Visualization]
    </div>

    <p>The <strong>LAD (Least Available Depth) Monitoring Panel</strong> utilizes a custom SVG-based <code>GaugeChart</code> to display the current minimum depth, alongside a 24-hour trend line. Dynamic threshold indicators visually warn operators if the LAD approaches critical limits (e.g., &lt; 1.5 meters), triggering immediate predictive alerts.</p>

    <h3>4.4 Predictive Analytics Engine</h3>
    <p>RIVERSIGHT is designed not just to monitor, but to predict. The ML Prediction interface simulates outputs from various machine learning models (e.g., LSTM for LAD reduction, Gradient Boosting for Sediment Hotspots). The UI components parse these outputs to display:</p>
    <ul>
      <li><strong>Confidence Score:</strong> A percentage indicating model certainty.</li>
      <li><strong>Risk Level:</strong> Low, Moderate, High, or Critical.</li>
      <li><strong>Prediction Horizon:</strong> The timeframe the prediction applies to (e.g., 7 days, 24 hours).</li>
      <li><strong>Contributing Factors:</strong> The specific sensor data driving the prediction (e.g., a drop in flow velocity contributing to sediment formation).</li>
    </ul>

    <h3>4.5 Alert Center & Early Warning System</h3>
    <p>The Alert Center acts as the operational hub for incident response. Alerts are dynamically generated based on predefined thresholds in <code>thresholdConfig</code>. Alerts are categorized by severity (Critical, Warning, Info) and type (e.g., <code>low_lad</code>, <code>telemetry_failure</code>). The interface allows operators to filter alerts, view historical resolution times, and acknowledge critical warnings.</p>

    <!-- Chapter 5 -->
    <div class="page-break"></div>
    <h2>5. UI/UX Design & Frontend Engineering</h2>

    <h3>5.1 Premium Dark Theme and Glassmorphism</h3>
    <p>To meet the requirement of a "premium, enterprise-grade scientific monitoring platform," the UI strictly adheres to a modern dark theme utilizing Glassmorphism. This design methodology uses translucent backgrounds with CSS backdrop-blur filters to create depth and visual hierarchy.</p>
    
    <div class="code-block">
.glass-card {
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
    </div>

    <h3>5.2 Tailwind CSS v4 & Theming</h3>
    <p>The project utilizes the bleeding-edge Tailwind CSS v4, relying on CSS-native configuration instead of traditional JavaScript config files. Variables such as <code>--color-bg-primary</code>, <code>--color-accent-cyan</code>, and typography constants (Inter and JetBrains Mono) are defined directly in <code>globals.css</code> using the <code>@theme</code> directive, yielding significant performance benefits during build times.</p>

    <h3>5.3 Reusable Component Architecture</h3>
    <p>The UI is constructed from a library of highly reusable atomic components:</p>
    <ul>
      <li><strong>TimeSeriesChart:</strong> A wrapper around Recharts' AreaChart, handling responsive sizing, gradient definitions, and custom tooltips.</li>
      <li><strong>StatusBadge:</strong> A dynamic pill component indicating system states with pulsing animation dots.</li>
      <li><strong>DashboardShell:</strong> The primary layout wrapper integrating a collapsible navigation sidebar and a top header equipped with real-time clocks and system status indicators.</li>
    </ul>

    <!-- Chapter 6 -->
    <div class="page-break"></div>
    <h2>6. Testing and Validation</h2>

    <h3>6.1 Component & State Validation</h3>
    <p>During the development lifecycle, React state management, specifically within the <code>useTelemetry</code> hook, was rigorously validated to ensure memory leaks did not occur. With data updating every 2 seconds, improper use of <code>useEffect</code> or failing to clear intervals would result in massive performance degradation. The implementation utilizes <code>useRef</code> to securely hold the interval ID and clear it on component unmount.</p>

    <h3>6.2 TypeScript Strict Checking</h3>
    <p>Enterprise-grade reliability is enforced through strict TypeScript typings. Over 6 distinct interface files were created (e.g., <code>telemetry.ts</code>, <code>gis.ts</code>, <code>bathymetry.ts</code>) defining exact object shapes. This ensures that the mock data engine and the UI components are perfectly synchronized, preventing runtime errors related to undefined object properties.</p>

    <div class="code-block">
// Strict type definition enforcing data integrity
export interface TimeSeriesPoint {
  [key: string]: number;
  timestamp: number;
  value: number;
}
    </div>

    <h3>6.3 Performance Optimization</h3>
    <p>For rendering high-frequency charting data, several performance optimizations were applied:</p>
    <ul>
      <li><strong>Animation Throttling:</strong> Complex Recharts animations (<code>isAnimationActive</code>) were disabled for high-frequency time-series charts to reduce CPU overhead.</li>
      <li><strong>Array Slicing:</strong> Real-time data arrays are continuously truncated (e.g., keeping only the last 30 points) to prevent the DOM node count from expanding indefinitely.</li>
      <li><strong>Memoization:</strong> Utilizing <code>useMemo</code> in analytics calculations (like monthly seasonal aggregation) prevents expensive recalculations on every React re-render.</li>
    </ul>

    <!-- Chapter 7 -->
    <div class="page-break"></div>
    <h2>7. Conclusion & Future Scope</h2>

    <h3>7.1 Conclusion</h3>
    <p>The RIVERSIGHT project successfully demonstrates the architectural framework and frontend capabilities required for a modern, intelligent river monitoring platform. By bridging the gap between raw IoT telemetry data, geospatial mapping, and predictive analytics, the platform provides a cohesive, actionable dashboard tailored for hydrological researchers and government authorities.</p>
    <p>The implementation of a modular, feature-driven Next.js architecture ensures the codebase remains highly maintainable and scalable. The premium UI design ensures complex scientific data is easily readable, while features like the simulated prediction engine and sediment hotspot tracking illustrate the transformative potential of data-driven inland waterway management.</p>

    <h3>7.2 Future Scope</h3>
    <p>Being a highly modular architecture, RIVERSIGHT is primed for integration into a live production environment. Future enhancements include:</p>
    <ol>
      <li><strong>Hardware Integration:</strong> Replacing the mock simulation engine with a live MQTT broker (e.g., Mosquitto or AWS IoT) receiving data directly from physical ADCPs and level sensors deployed on rivers.</li>
      <li><strong>Database Implementation:</strong> Integrating a time-series database like TimescaleDB over PostgreSQL to store years of historical telemetry data efficiently.</li>
      <li><strong>Live Machine Learning:</strong> Deploying Python-based microservices using FastAPI to serve trained PyTorch or TensorFlow models for real-time anomaly detection and LAD forecasting.</li>
      <li><strong>Advanced 3D GIS:</strong> Upgrading the WebGIS module from 2D Leaflet to WebGL-based frameworks like Deck.gl to render actual 3D bathymetric point clouds and volumetric sediment data.</li>
    </ol>

    <!-- References -->
    <div class="page-break"></div>
    <h2>8. References</h2>
    <ol style="line-height: 2;">
      <li>Next.js Documentation (2024). <em>Next.js 14 App Router Architecture</em>. Vercel.</li>
      <li>Tailwind Labs (2024). <em>Tailwind CSS v4 Configuration and Design Tokens</em>.</li>
      <li>Recharts Organization (2024). <em>Recharts: A composable charting library built on React components</em>.</li>
      <li>Leaflet (2024). <em>Leaflet - an open-source JavaScript library for mobile-friendly interactive maps</em>.</li>
      <li>Al-Fagih, L. et al. (2020). <em>Internet of Things (IoT) in Environmental Monitoring: A Case Study in River Flood Tracking</em>. Journal of Hydrology.</li>
      <li>Central Water Commission (CWC), Government of India. <em>e-SWIS: Earth Observation based Water Resources Information System</em>.</li>
      <li>Mermaid JS. <em>Markdownish syntax for generating flowcharts, sequence diagrams, class diagrams, gantt charts and git graphs</em>.</li>
    </ol>

  </div>
</body>
</html>
  `;

  const reportPath = path.join(__dirname, 'RIVERSIGHT_Project_Report.pdf');
  
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  
  // Wait a moment for mermaid and fonts to render
  await new Promise(r => setTimeout(r, 5000));

  await page.pdf({
    path: reportPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px'
    }
  });

  await browser.close();
  console.log('PDF generated at', reportPath);
}

generatePDF().catch(console.error);
