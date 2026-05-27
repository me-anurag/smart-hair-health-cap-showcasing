# 🧢 ScalpSense — Smart Cap by HairHealth

> **World's First 7-Sensor Scalp Health Wearable**  
> Continuously monitors 7 biological markers of scalp health in real time and delivers a personalised Hair Health Score to your phone.

---

## Overview

ScalpSense is a smart cap that embeds seven medical-grade sensors into fabric using conductive silver thread. The ESP32-S3 MCU processes all sensor data on-device, runs a CNN-LSTM AI model, and broadcasts an encrypted Hair Health Score via BLE 5.0 to both the patient's phone and a dermatologist's phone simultaneously — in under 50ms.

This repository contains the **interactive product showcase website** — a vanilla HTML5/CSS3/JS multi-section single-page application built with zero external frameworks (GSAP only for animation utilities).

---

## Hardware Specifications

| Spec | Value |
|---|---|
| Sensors | 7 simultaneous |
| MCU | ESP32-S3 |
| Connectivity | BLE 5.0 + Wi-Fi |
| AI Accuracy | 91% |
| Sampling Rate | Up to 100 Hz (PPG at 50 Hz) |
| Battery | LiPo 3.7V · 500mAh · ~8 hrs |
| Weight | ~84g |
| Water Resistance | IPX4 (sweat-proof) |
| BLE Latency | < 50ms |

---

## The 7 Sensors

| # | Sensor | Chip | Spec | Measures |
|---|---|---|---|---|
| 1 | PPG | MAX30102 | 50Hz · Red 660nm + IR 880nm | Blood flow to hair follicles |
| 2 | EIS | AD5933 | 1kHz–100kHz · ±0.5% accuracy | Scalp oiliness & moisture |
| 3 | Temperature | MLX90614 | ±0.1°C · Non-contact IR | Scalp heat across 4 zones |
| 4 | UV | VEML6075 | UVA 320–400nm · UVB 280–320nm | Cumulative UV exposure |
| 5 | VOC | BME680 | 0–500 IAQ · 4-in-1 chip | Chemical markers of inflammation |
| 6 | Humidity | SHT40 | ±1.8% RH · 0–100% range | Scalp microclimate moisture |
| 7 | NIR | AS7265x | 850–940nm · 3mm tissue depth | Deep tissue hydration |

All sensors communicate with the ESP32-S3 over the **I²C bus** (GPIO8 SDA + GPIO9 SCL), each with a unique address so the MCU knows who is sending data.

---

## System Architecture

```
SMART CAP (Hardware Layer)
├── 7 Sensor Nodes  ──I²C──►  ESP32-S3 MCU
│    └── Conductive Silver Thread (Shieldex 110/34 dtex)
├── LiPo Battery 3.7V → TP4056 Charger → AP2112K 3.3V Regulator
└── Pogo Pin Connector (magnetic detach, MagSafe-style)

ESP32-S3
├── Fuses all sensor readings
├── Runs CNN-LSTM AI on-device → Hair Health Score
└── BLE 5.0 (encrypted, < 50ms)
     ├── ──► User Phone (Patient App)
     │         Live Score · Alerts · Trend History · Doctor Advice
     └── ──► Doctor Phone (Dr. Atul Kumar)
               Patient List · Live Vitals · Send Advice · Book Appointment

Local Server: Node.js + Socket.IO (same WiFi · Port 3000)
```

### Architecture Layers

**Sensor Layer** — 7 sensor nodes stitched into the cap fabric using conductive silver thread. All sensors communicate via I²C — a shared two-wire bus where each sensor has its own address.

**Processing Layer** — ESP32-S3 receives all sensor data, runs the AI model on-device, calculates the Hair Health Score, and manages power regulation from the 3.7V LiPo down to a stable 3.3V.

**Communication Layer** — BLE 5.0 broadcasts encrypted packets to both phones in under 50ms. A local Node.js server routes real-time data between all three devices over Wi-Fi.

---

## Hair Health Score Formula

The score is a weighted sum of all seven sensor readings, normalised to 0–100.

```
// Sensors where higher = better: use value directly
// Sensors where higher = worse: invert as (100 - value)

score = clamp(
    blood_flow   × 0.25   +
    (100 - oil)  × 0.20   +
    nir_hydration× 0.18   +
    humidity     × 0.12   +
    (100 - voc)  × 0.10   +
    temp_score   × 0.05   +
    (100 - uv)   × 0.10
, 0, 100)
```

**Sensor Weight Breakdown:**

| Sensor | Weight | Direction |
|---|---|---|
| Blood Flow (PPG) | 25% | Higher = better |
| Oiliness (EIS) | 20% | Higher = worse (inverted) |
| NIR Hydration | 18% | Higher = better |
| Humidity | 12% | Higher = better |
| UV Exposure | 10% | Higher = worse (inverted) |
| VOC | 10% | Higher = worse (inverted) |
| Temperature | 5% | Scored by deviation from ideal |

**Score Ranges:**

| Range | Status | Action |
|---|---|---|
| 85–100 | ✅ Excellent | Keep current routine |
| 70–84 | 🟢 Good | Hydrate more, check diet |
| 50–69 | 🟡 Fair | Use scalp treatment, consult doctor |
| 30–49 | 🟠 Poor | See a trichologist |
| 0–29 | 🔴 Critical | Visit a dermatologist immediately |

---

## Signal Flow

```
Cap  ──[Sensor Data]──►  MCU  ──[BLE 5.0]──►  Branch Point
                                                ├──► User Phone   (green · < 50ms)
                                                └──► Doctor Phone (purple · < 50ms)
                                  ◄──[Advice]──  Doctor Phone
```

Live tickers update every 2.2s with simulated readings across all 7 channels plus patient Hair Health Scores.

---

## Pin Connection Reference

| Sensor / Component | VCC | GND | SDA | SCL | I²C Addr | Protocol |
|---|---|---|---|---|---|---|
| PPG — MAX30102 | 3.3V | GND | GPIO8 | GPIO9 | 0x57 | I²C |
| EIS — AD5933 | 3.3V | GND | GPIO8 | GPIO9 | 0x0D | I²C |
| Temp — MLX90614 | 3.3V | GND | GPIO8 | GPIO9 | 0x5A | I²C |
| UV — VEML6075 | 3.3V | GND | GPIO8 | GPIO9 | 0x10 | I²C |
| VOC — BME680 | 3.3V | GND | GPIO8 | GPIO9 | 0x76 | I²C |
| Humidity — SHT40 | 3.3V | GND | GPIO8 | GPIO9 | 0x44 | I²C |
| NIR — AS7265x | 3.3V | GND | GPIO8 | GPIO9 | 0x49 | I²C |
| LiPo Battery | 3.7V+ | GND | — | — | — | Power |
| TP4056 Charger | USB 5V | GND | Bat+ | Bat- | — | Charge IC |
| AP2112K Regulator | Bat 3.7V | GND | 3.3V out | — | — | Voltage Reg |
| Pogo Pin Connector | 3.3V | GND | SDA pass | SCL pass | — | Mechanical |

> **Why conductive thread instead of wires?** Normal copper wires are rigid and make the cap uncomfortable. Silver-coated conductive thread carries the same I²C signals but stays completely flexible, soft, and washable — stitched through fabric layers by industrial sewing machine. The same material is used in Google's Jacquard smart jacket and NASA space suit electronics.

---

## Website Structure

The showcase is a vanilla JS SPA with one HTML entry point and six self-contained section modules.

```
scalpsense/
├── index.html                # Entry point, nav, section mounts
├── styles.css                # Global design system (CSS variables, nav, shared classes)
├── section1-hero.js          # Hero — product intro, spec pills, floating cap visual
├── section2-sensors.js       # Sensor Map — interactive cap top-view with dot popups
├── section3-flow.js          # Signal Flow — Y-shape SVG animation, live tickers
├── section4-architecture.js  # Architecture — full SVG system diagram + layer cards
├── section5-components.js    # Components — tabbed sensor/component grid + wiring diagram
├── section6-score.js         # Score Calc — formula explainer + live interactive calculator
└── images/
    ├── cap-hero.png           # Hero floating cap (front view)
    ├── cap-top.png            # Cap top view for sensor map
    ├── sensor-ppg.png         # MAX30102 sensor image
    ├── sensor-eis.png         # AD5933 sensor image
    ├── sensor-temp.png        # MLX90614 sensor image
    ├── sensor-uv.png          # VEML6075 sensor image
    ├── sensor-voc.png         # BME680 sensor image
    ├── sensor-humidity.png    # SHT40 sensor image
    ├── sensor-nir.png         # AS7265x sensor image
    └── comp-*.png             # Component images (MCU, battery, etc.)
```

### Sections

| Section | File | Description |
|---|---|---|
| Hero | `section1-hero.js` | Product tag, headline, spec pills, animated floating cap with orbit rings and floating tags, 3-feature row |
| Sensor Map | `section2-sensors.js` | Top-view cap image with 7 interactive dots + MCU indicator. Click any dot or card for a popup with chip details |
| Signal Flow | `section3-flow.js` | Y-shape SVG with animated travelling data packets (Cap → MCU → User/Doctor), live sensor tickers, step cards |
| Architecture | `section4-architecture.js` | Full SVG system diagram: sensor nodes → MCU → BLE → phones → Node.js server, with animated data-flow arrows |
| Components | `section5-components.js` | Tabbed view: 7 Sensors · Components · Wiring. Includes wiring SVG, I²C address map, and pin reference table |
| Score Calc | `section6-score.js` | Formula explainer with weight bars, score range table, live calculator with 7 sliders and animated score ring |

---

## Design System

Built on a dark cinematic theme.

```css
--bg:    #050a0f   /* Deep space black */
--teal:  #00e5cc   /* Brand accent */
--blue:  #00aaff   /* Secondary accent */

/* Signal colors — one per sensor */
--sig-ppg:  #ff3d6e   /* Blood — warm red */
--sig-eis:  #ff8c00   /* Electrical — amber */
--sig-temp: #ff4500   /* Heat — orange-red */
--sig-uv:   #bf5fff   /* UV — vivid purple */
--sig-voc:  #ff1dce   /* Chemical — hot magenta */
--sig-hum:  #00cfff   /* Moisture — electric cyan */
--sig-nir:  #39ff14   /* Infrared — neon green */
```

Typography: **Inter** (400/600/700/800/900) — bold, high-contrast, dark-background optimised.

---

## Running Locally

No build step. No package manager. Serve the root directory with any static file server.

```bash
# Python
python -m http.server 8080

# Node
npx serve .

# VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Open `http://localhost:8080` in your browser.

> The `images/` folder must be populated with the product images before serving. The site will render correctly without them (broken img tags only) but the sensor map and component cards require the images for full visual experience.

---

## Dependencies

| Library | Version | Usage | Source |
|---|---|---|---|
| GSAP | 3.12.2 | Animation utilities | cdnjs |
| Inter | Variable | Body font | Google Fonts |

All other functionality — SVG animations, scroll spy, popups, live calculators, tab panels — is pure vanilla JS with zero runtime dependencies.

---

## Key Technical Details

- **No framework.** Each section is an IIFE that injects its own `<style>` tag and renders into a pre-mounted root div.
- **Scroll spy nav** updates `.active` class on links by comparing `window.scrollY` against section `offsetTop` values with a 120px offset.
- **SVG data flow** in Section 3 uses `<animateMotion>` + `<mpath>` to travel circles along bezier paths. Branch dot uses `r` attribute animation for the pulse ring.
- **Architecture SVG** (Section 4) is a static `viewBox="0 0 1020 560"` diagram with CSS-animated stroke-dashoffset flows and pulsing node rings.
- **Wiring diagram** (Section 5) builds sensor nodes dynamically from a JS array using template literals inside an SVG string.
- **Score calculator** (Section 6) updates a `stroke-dashoffset` on a circle (`r=72`, circumference=452.4px) to animate the score ring. Temperature scoring uses a custom bell-curve function centred on 36.5°C.
- **Live tickers** in Section 3 use `setInterval(2200ms)` to randomise readings within physiologically realistic ranges.
- **Floating particles** spawn as absolutely-positioned divs with random size/color/position, animate upward, then are removed from DOM.

---

## License

This project is a hardware product showcase built for HairHealth. All product specifications, sensor placements, and AI model claims are design targets for the ScalpSense prototype.
