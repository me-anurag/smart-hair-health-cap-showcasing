/* ═══════════════════════════════════════════
   SECTION 2 — SENSOR MAP
   ═══════════════════════════════════════════ */
(function () {

  // ── Sensor data ─────────────────────────────
  // Positions mapped to actual scalp dome of cap-top.png
  // Dome is the oval panel area — brim is bottom-left, MCU module bottom-right edge
  // All 7 dots evenly spread inside the wearable scalp zone only
  const SENSORS = [
    {
      id: 'ppg',
      name: 'PPG Sensor',
      full: 'Photoplethysmography',
      color: '#ff3d6e',
      img: 'images/sensor-ppg.png',
      chip: 'MAX30102',
      spec: '50Hz · Red 660nm + IR 880nm',
      desc: 'Measures blood flow reaching hair follicles using safe light pulses. Same tech as Apple Watch heart rate.',
      x: 58, y: 24   // FRONT-CENTER — crown of head
    },
    {
      id: 'eis',
      name: 'EIS Sensor',
      full: 'Electrical Impedance Spectroscopy',
      color: '#ff8c00',
      img: 'images/sensor-eis.png',
      chip: 'AD5933',
      spec: '1kHz–100kHz · ±0.5% accuracy',
      desc: 'Passes micro-safe AC current through scalp to measure oiliness and moisture levels precisely.',
      x: 41, y: 38   // LEFT SIDE — temple area
    },
    {
      id: 'temp',
      name: 'Temperature',
      full: 'IR Thermometer',
      color: '#ff4500',
      img: 'images/sensor-temp.png',
      chip: 'MLX90614',
      spec: '±0.1°C · Non-contact IR',
      desc: 'Detects scalp heat variations across 4 zones. Inflammation and poor circulation change temperature detectably.',
      x: 75, y: 36   // RIGHT SIDE — temple area
    },
    {
      id: 'uv',
      name: 'UV Sensor',
      full: 'UVA + UVB Detection',
      color: '#bf5fff',
      img: 'images/sensor-uv.png',
      chip: 'VEML6075',
      spec: 'UVA 320–400nm · UVB 280–320nm',
      desc: 'Monitors cumulative UV exposure on scalp. Alerts when UV index crosses safe threshold for your skin.',
      x: 58, y: 46   // CENTER — top of head
    },
    {
      id: 'voc',
      name: 'VOC Sensor',
      full: 'Volatile Organic Compounds',
      color: '#ff1dce',
      img: 'images/sensor-voc.png',
      chip: 'BME680',
      spec: '0–500 IAQ · 4-in-1 chip',
      desc: 'Detects chemical markers released by unhealthy scalp — inflammation and fungal activity change VOC profile.',
      x: 43, y: 60   // LOWER LEFT — back left zone
    },
    {
      id: 'humidity',
      name: 'Humidity',
      full: 'Scalp Microclimate',
      color: '#00cfff',
      img: 'images/sensor-humidity.png',
      chip: 'SHT40',
      spec: '±1.8% RH · 0–100% range',
      desc: 'Measures air moisture trapped between scalp and cap. High humidity accelerates dandruff and fungal growth.',
      x: 73, y: 60   // LOWER RIGHT — back right zone
    },
    {
      id: 'nir',
      name: 'NIR Sensor',
      full: 'Near-Infrared Spectroscopy',
      color: '#39ff14',
      img: 'images/sensor-nir.png',
      chip: 'AS7265x',
      spec: '850–940nm · 3mm tissue depth',
      desc: 'Infrared light penetrates 3mm deep into scalp to measure true tissue hydration — not just surface moisture.',
      x: 58, y: 70   // BACK-CENTER — rear scalp
    },
  ];

  // MCU rectangle indicator position (% on image)
  const MCU = { x: 87, y: 50 }; // right edge where the module sits on the cap

  // ── Inject CSS ──────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #section-sensors {
      background:
        radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,170,255,0.08) 0%, transparent 60%),
        linear-gradient(180deg, #080f1a 0%, #050a0f 100%);
      padding: 100px 0 120px;
      overflow: hidden;
    }

    .sensors-header {
      text-align: center;
      margin-bottom: 70px;
      padding: 0 40px;
    }

    .sensors-body {
      display: grid;
      grid-template-columns: 1fr 480px 1fr;
      gap: 0;
      align-items: start;
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 40px;
    }

    /* ── Cap Map Center ── */
    .cap-map-wrap {
      position: relative;
      width: 480px;
      height: 480px;
      flex-shrink: 0;
    }

    .cap-map-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 24px;
      filter: drop-shadow(0 0 40px rgba(0,229,204,0.15));
    }

    /* ── Sensor dot on cap ── */
    .sensor-dot {
      position: absolute;
      width: 20px; height: 20px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 10;
      transition: transform 0.2s;
    }

    .sensor-dot:hover { transform: translate(-50%, -50%) scale(1.5); }

    .sensor-dot-inner {
      width: 100%; height: 100%;
      border-radius: 50%;
    }

    /* Ping animation */
    .sensor-dot::before,
    .sensor-dot::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid currentColor;
      animation: dotPing 2s ease-out infinite;
    }

    .sensor-dot::after {
      inset: -10px;
      animation-delay: 0.6s;
      opacity: 0.5;
    }

    @keyframes dotPing {
      0%   { transform: scale(0.7); opacity: 0.8; }
      100% { transform: scale(1.9); opacity: 0; }
    }

    /* ── MCU Rectangle indicator ── */
    .mcu-rect {
      position: absolute;
      width: 36px;
      height: 24px;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      z-index: 10;
      cursor: default;
      border: 2px solid #00aaff;
      background: rgba(0,170,255,0.15);
      box-shadow: 0 0 14px #00aaff99, 0 0 28px #00aaff44;
      animation: mcuRectBlink 1.4s ease-in-out infinite;
    }

    @keyframes mcuRectBlink {
      0%,100% { box-shadow: 0 0 14px #00aaff99, 0 0 28px #00aaff44; border-color:#00aaff; background: rgba(0,170,255,0.15); }
      50%      { box-shadow: 0 0 28px #00aaffee, 0 0 56px #00aaff88; border-color:#00e5ff; background: rgba(0,170,255,0.35); }
    }

    /* Small LED dot inside MCU rect */
    .mcu-rect::before {
      content: '';
      position: absolute;
      width: 7px; height: 7px;
      background: #00cfff;
      border-radius: 50%;
      top: 3px; left: 4px;
      box-shadow: 0 0 8px #00cfff;
      animation: mcuLedBlink 0.9s ease-in-out infinite;
    }

    @keyframes mcuLedBlink {
      0%,100% { opacity:1; }
      50%      { opacity:0.2; }
    }

    /* Circuit lines extending from MCU rect */
    .mcu-rect::after {
      content: '';
      position: absolute;
      width: 2px; height: 12px;
      background: linear-gradient(to bottom, #00aaff, transparent);
      top: -14px; left: 50%;
      transform: translateX(-50%);
    }

    /* MCU label */
    .mcu-label {
      position: absolute;
      transform: translate(-50%, calc(-50% + 22px));
      font-size: 10px;
      font-weight: 800;
      color: #00aaff;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 0 8px #00aaff;
      z-index: 11;
    }

    /* ── Sensor side panels ── */
    .sensor-list-left,
    .sensor-list-right {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 30px;
    }

    .sensor-list-left { padding-right: 24px; align-items: flex-end; }
    .sensor-list-right { padding-left: 24px; align-items: flex-start; }

    .sensor-card {
      background: rgba(10,21,32,0.85);
      border: 1.5px solid rgba(26,58,92,0.7);
      border-radius: 16px;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.25s;
      width: 230px;
      position: relative;
    }

    .sensor-card:hover,
    .sensor-card.active {
      border-color: var(--card-color);
      background: rgba(15,32,53,0.95);
      transform: translateX(var(--card-nudge, 0px));
      box-shadow: 0 0 20px rgba(0,0,0,0.4);
    }

    .sensor-list-left  .sensor-card { --card-nudge: -4px; }
    .sensor-list-right .sensor-card { --card-nudge: 4px; }

    .sensor-card-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .sensor-card-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .sensor-card-name {
      font-size: 14px;
      font-weight: 800;
      color: #f0f4f8;
      letter-spacing: -0.2px;
    }

    .sensor-card-chip {
      font-size: 11px;
      font-weight: 700;
      color: #3a6080;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* MCU card in side list */
    .mcu-side-card {
      background: rgba(0,170,255,0.07);
      border: 1.5px solid rgba(0,170,255,0.35);
      border-radius: 16px;
      padding: 14px 16px;
      width: 230px;
    }

    .mcu-side-card-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    /* Blinking rectangle icon */
    .mcu-mini-rect {
      width: 18px; height: 12px;
      border-radius: 3px;
      border: 1.5px solid #00aaff;
      background: rgba(0,170,255,0.2);
      box-shadow: 0 0 8px #00aaff88;
      animation: mcuRectBlink 1.4s ease-in-out infinite;
      flex-shrink: 0;
      position: relative;
    }

    .mcu-mini-rect::before {
      content:'';
      position:absolute;
      width:4px;height:4px;
      background:#00cfff;
      border-radius:50%;
      top:2px;left:2px;
      box-shadow:0 0 4px #00cfff;
      animation: mcuLedBlink 0.9s ease-in-out infinite;
    }

    .mcu-side-name {
      font-size: 14px;
      font-weight: 800;
      color: #00aaff;
      letter-spacing: -0.2px;
    }

    .mcu-side-chip {
      font-size: 11px;
      font-weight: 700;
      color: #3a6080;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ── Popup overlay ── */
    .sensor-popup-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      z-index: 200;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
      animation: overlayFadeIn 0.2s ease;
    }

    .sensor-popup-overlay.open { display: flex; }

    @keyframes overlayFadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }

    .sensor-popup {
      background: linear-gradient(145deg, #0a1520, #0f2035);
      border: 1.5px solid;
      border-radius: 28px;
      padding: 36px;
      max-width: 520px;
      width: 90%;
      position: relative;
      animation: popupIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
      box-shadow: 0 40px 120px rgba(0,0,0,0.7);
    }

    @keyframes popupIn {
      from { opacity: 0; transform: scale(0.6); }
      to   { opacity: 1; transform: scale(1); }
    }

    .popup-close {
      position: absolute;
      top: 16px; right: 20px;
      background: rgba(255,255,255,0.07);
      border: none;
      color: #8ab4cc;
      font-size: 20px;
      width: 34px; height: 34px;
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      font-weight: 700;
    }

    .popup-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

    .popup-img-wrap {
      width: 180px; height: 180px;
      border-radius: 50%;
      margin: 0 auto 24px;
      overflow: hidden;
      border: 3px solid;
      box-shadow: 0 0 40px rgba(0,0,0,0.5);
      animation: popupImgFloat 3s ease-in-out infinite;
    }

    @keyframes popupImgFloat {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }

    .popup-img-wrap img { width: 100%; height: 100%; object-fit: cover; }

    .popup-badge { text-align: center; margin-bottom: 8px; }

    .popup-badge span {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 20px;
      background: rgba(255,255,255,0.07);
    }

    .popup-name {
      text-align: center;
      font-size: 26px;
      font-weight: 900;
      color: #f0f4f8;
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }

    .popup-full {
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      color: #3a6080;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .popup-spec {
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      padding: 10px 16px;
      border-radius: 10px;
      background: rgba(255,255,255,0.05);
      margin-bottom: 16px;
      font-family: 'Courier New', monospace;
    }

    .popup-desc {
      font-size: 15px;
      font-weight: 600;
      color: #8ab4cc;
      line-height: 1.75;
      text-align: center;
    }
  `;
  document.head.appendChild(style);

  // ── Render HTML ─────────────────────────────
  const root = document.getElementById('sensors-root');

  const leftSensors  = SENSORS.slice(0, 4);  // ppg, eis, temp, uv
  const rightSensors = SENSORS.slice(4);     // voc, humidity, nir

  const dotHTML = SENSORS.map(s => `
    <div class="sensor-dot" id="dot-${s.id}"
      style="left:${s.x}%;top:${s.y}%;background:${s.color};color:${s.color};box-shadow:0 0 16px ${s.color}99,0 0 32px ${s.color}44;"
      onclick="openSensorPopup('${s.id}')"
      title="${s.name}">
      <div class="sensor-dot-inner" style="background:${s.color};box-shadow:0 0 10px ${s.color};"></div>
    </div>
  `).join('');

  // MCU rectangle on the cap (module position — right edge of dome)
  const mcuHTML = `
    <div class="mcu-rect" style="left:${MCU.x}%;top:${MCU.y}%;" title="ESP32-S3 MCU Module"></div>
    <div class="mcu-label" style="left:${MCU.x}%;top:${MCU.y}%;">MCU</div>
  `;

  const leftHTML = leftSensors.map(s => `
    <div class="sensor-card" id="card-${s.id}" style="--card-color:${s.color};"
      onclick="openSensorPopup('${s.id}')">
      <div class="sensor-card-top">
        <div class="sensor-card-dot" style="background:${s.color};box-shadow:0 0 8px ${s.color};"></div>
        <span class="sensor-card-name">${s.name}</span>
      </div>
      <div class="sensor-card-chip">${s.chip} · ${s.spec.split('·')[0].trim()}</div>
    </div>
  `).join('');

  const rightHTML = rightSensors.map(s => `
    <div class="sensor-card" id="card-${s.id}" style="--card-color:${s.color};"
      onclick="openSensorPopup('${s.id}')">
      <div class="sensor-card-top">
        <div class="sensor-card-dot" style="background:${s.color};box-shadow:0 0 8px ${s.color};"></div>
        <span class="sensor-card-name">${s.name}</span>
      </div>
      <div class="sensor-card-chip">${s.chip} · ${s.spec.split('·')[0].trim()}</div>
    </div>
  `).join('');

  // MCU card in right list
  const mcuCardHTML = `
    <div class="mcu-side-card">
      <div class="mcu-side-card-top">
        <div class="mcu-mini-rect"></div>
        <span class="mcu-side-name">ESP32-S3 MCU</span>
      </div>
      <div class="mcu-side-chip">BLE 5.0 · Wi-Fi · AI Inference</div>
    </div>
  `;

  root.innerHTML = `
    <div class="sensors-header">
      <div class="section-badge">7 Active Sensors + MCU</div>
      <h2 class="section-heading">What the Cap <span>Sees</span></h2>
      <p class="section-sub" style="margin:0 auto;text-align:center;">
        Every sensor placed at a precise zone across your scalp. Tap any dot or card to explore what it measures.
      </p>
    </div>

    <div class="sensors-body">
      <!-- LEFT CARDS -->
      <div class="sensor-list-left">${leftHTML}</div>

      <!-- CAP MAP -->
      <div class="cap-map-wrap">
        <img src="images/cap-top.png" alt="Cap Top View" class="cap-map-img"/>
        ${dotHTML}
        ${mcuHTML}
      </div>

      <!-- RIGHT CARDS + MCU card -->
      <div class="sensor-list-right">
        ${rightHTML}
        ${mcuCardHTML}
      </div>
    </div>

    <!-- POPUP OVERLAY -->
    <div class="sensor-popup-overlay" id="sensor-popup-overlay" onclick="closeSensorPopup(event)">
      <div class="sensor-popup" id="sensor-popup" onclick="event.stopPropagation()">
        <button class="popup-close" onclick="closeSensorPopup()">✕</button>
        <div class="popup-img-wrap" id="popup-img-wrap">
          <img id="popup-img" src="" alt=""/>
        </div>
        <div class="popup-badge"><span id="popup-chip"></span></div>
        <div class="popup-name" id="popup-name"></div>
        <div class="popup-full" id="popup-full"></div>
        <div class="popup-spec" id="popup-spec"></div>
        <div class="popup-desc" id="popup-desc"></div>
      </div>
    </div>
  `;

  // ── Popup logic ─────────────────────────────
  const sensorsMap = {};
  SENSORS.forEach(s => sensorsMap[s.id] = s);

  window.openSensorPopup = function(id) {
    const s = sensorsMap[id];
    if (!s) return;

    document.getElementById('popup-img').src     = s.img;
    document.getElementById('popup-chip').textContent = s.chip;
    document.getElementById('popup-chip').style.color = s.color;
    document.getElementById('popup-chip').style.background = s.color + '22';
    document.getElementById('popup-name').textContent = s.name;
    document.getElementById('popup-name').style.color = s.color;
    document.getElementById('popup-full').textContent = s.full;
    document.getElementById('popup-spec').textContent = s.spec;
    document.getElementById('popup-spec').style.color = s.color;
    document.getElementById('popup-desc').textContent = s.desc;

    const popup = document.getElementById('sensor-popup');
    popup.style.borderColor = s.color + '60';
    popup.style.boxShadow   = `0 40px 120px rgba(0,0,0,0.7), 0 0 60px ${s.color}22`;

    const imgWrap = document.getElementById('popup-img-wrap');
    imgWrap.style.borderColor = s.color;
    imgWrap.style.boxShadow   = `0 0 40px ${s.color}44`;

    document.getElementById('sensor-popup-overlay').classList.add('open');

    document.querySelectorAll('.sensor-card').forEach(c => c.classList.remove('active'));
    const card = document.getElementById('card-' + id);
    if (card) card.classList.add('active');
  };

  window.closeSensorPopup = function(e) {
    if (!e || e.target === document.getElementById('sensor-popup-overlay')) {
      document.getElementById('sensor-popup-overlay').classList.remove('open');
      document.querySelectorAll('.sensor-card').forEach(c => c.classList.remove('active'));
    }
  };

  // ── Stagger entrance on scroll ───────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = document.querySelectorAll('.sensor-card, .mcu-side-card');
        cards.forEach((c, i) => {
          c.style.opacity   = '0';
          c.style.transform = 'translateY(20px)';
          c.style.transition = `opacity 0.4s ${i*0.07}s, transform 0.4s ${i*0.07}s`;
          requestAnimationFrame(() => {
            c.style.opacity   = '1';
            c.style.transform = 'translateY(0)';
          });
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(document.getElementById('section-sensors'));

})();
