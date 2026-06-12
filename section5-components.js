/* ═══════════════════════════════════════════
   SECTION 5 — COMPONENTS & SENSORS
   Sensors, Components, Wiring, Connections
   ═══════════════════════════════════════════ */
(function () {

  const style = document.createElement('style');
  style.textContent = `
    #section-components {
      background:
        radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,170,255,0.07) 0%, transparent 55%),
        linear-gradient(180deg, #050a0f 0%, #080f1a 100%);
      padding: 100px 0 120px;
      overflow: hidden;
    }

    .comp-header { text-align:center; margin-bottom:70px; padding:0 40px; }

    /* ── Tab bar ── */
    .comp-tabs {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 50px;
      flex-wrap: wrap;
      padding: 0 40px;
    }

    .comp-tab {
      padding: 10px 22px;
      border-radius: 12px;
      border: 1.5px solid rgba(26,58,92,0.8);
      background: rgba(10,21,32,0.8);
      color: #8ab4cc;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .comp-tab.active,
    .comp-tab:hover {
      border-color: #00e5cc;
      background: rgba(0,229,204,0.1);
      color: #00e5cc;
    }

    /* ── Sensor/Component grid ── */
    .comp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .comp-card {
      background: rgba(10,21,32,0.9);
      border: 1.5px solid rgba(26,58,92,0.7);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s;
    }

    .comp-card:hover {
      border-color: var(--card-accent);
      transform: translateY(-5px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px var(--card-glow);
    }

    /* Image area */
    .comp-img-wrap {
      background: rgba(5,10,15,0.8);
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      border-bottom: 1px solid rgba(26,58,92,0.5);
    }

    .comp-img {
      max-width: 85%;
      max-height: 85%;
      object-fit: contain;
      transition: transform 0.4s;
    }

    .comp-card:hover .comp-img { transform: scale(1.07); }

    /* Color strip top */
    .comp-color-strip {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
    }

    /* Number badge */
    .comp-num {
      position: absolute;
      top: 12px; left: 12px;
      width: 28px; height: 28px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px;
      font-weight: 900;
      color: #fff;
    }

    /* Price badge */
    .comp-price-badge {
      position: absolute;
      bottom: 10px; right: 10px;
      background: rgba(0,0,0,0.7);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 800;
      backdrop-filter: blur(6px);
    }

    /* Info area */
    .comp-info { padding: 18px 20px; }

    .comp-name {
      font-size: 17px;
      font-weight: 900;
      margin-bottom: 3px;
      letter-spacing: -0.3px;
    }

    .comp-chip {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #3a6080;
      margin-bottom: 10px;
    }

    .comp-desc {
      font-size: 13px;
      font-weight: 600;
      color: #8ab4cc;
      line-height: 1.7;
      margin-bottom: 12px;
    }

    /* Spec pills row */
    .comp-specs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .comp-spec-pill {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      padding: 3px 9px;
      font-size: 11px;
      font-weight: 700;
      color: #94a3b8;
    }

    /* ── Wiring section ── */
    .wiring-section {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .wiring-diagram {
      background: rgba(5,10,15,0.9);
      border: 1px solid rgba(26,58,92,0.7);
      border-radius: 20px;
      padding: 30px;
      margin-top: 50px;
    }

    .wiring-title {
      font-size: 20px;
      font-weight: 900;
      color: #f0f4f8;
      margin-bottom: 6px;
    }

    .wiring-sub {
      font-size: 13px;
      color: #8ab4cc;
      font-weight: 600;
      margin-bottom: 28px;
    }

    .wiring-svg { width:100%; height:auto; }

    /* ── Connection table ── */
    .conn-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .conn-table th {
      background: rgba(0,170,255,0.15);
      color: #00aaff;
      font-size: 13px;
      font-weight: 800;
      padding: 10px 14px;
      text-align: left;
      letter-spacing: 0.5px;
    }

    .conn-table td {
      padding: 9px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #8ab4cc;
      border-bottom: 1px solid rgba(26,58,92,0.4);
    }

    .conn-table tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
    .conn-table tr:hover td { background: rgba(0,229,204,0.04); }

    .pin-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 5px;
      font-size: 11px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
    }

    /* panel visibility */
    .comp-panel { display:none; }
    .comp-panel.active { display:block; }
  `;
  document.head.appendChild(style);

  // ── Data ─────────────────────────────────────
  const SENSORS = [
    {
      id:'ppg', num:1, name:'PPG Sensor', chip:'MAX30102',
      color:'#ff3d6e', glow:'rgba(255,61,110,0.15)',
      img:'images/sensor-chip-ppg.png',
      priceP:'₹220', priceB:'₹75',
      desc:'Shines red and infrared light into the scalp and measures how much bounces back. Blood absorbs more light when it is flowing — so by reading the reflected light 50 times per second, we know exactly how much blood is reaching the hair roots. Same technology as the heart rate sensor in Apple Watch.',
      specs:['50Hz sampling','Red 660nm + IR 880nm','I²C interface','5.6×3.3mm'],
      pin:'I²C (SDA/SCL)',
    },
    {
      id:'eis', num:2, name:'EIS Sensor', chip:'AD5933',
      color:'#ff8c00', glow:'rgba(255,140,0,0.15)',
      img:'images/sensor-chip-eis.png',
      priceP:'₹450', priceB:'₹150',
      desc:'Sends a tiny, completely safe electrical signal through the skin — so small you cannot feel it at all. Oily skin and dry skin conduct electricity differently, so by measuring how the skin resists the signal, we can calculate oiliness and moisture levels precisely. Used in clinical body composition analyzers.',
      specs:['1kHz–100kHz sweep','±0.5% accuracy','I²C interface','<1mA skin current'],
      pin:'I²C (SDA/SCL)',
    },
    {
      id:'temp', num:3, name:'Temperature Sensor', chip:'MLX90614',
      color:'#ff4500', glow:'rgba(255,69,0,0.15)',
      img:'images/sensor-chip-temp.png',
      priceP:'₹180', priceB:'₹60',
      desc:'Reads the scalp temperature without touching it — works like the forehead thermometer used during COVID. Inflammation, poor blood circulation, and infections all change the scalp temperature in ways that are measurable. Accurate to 0.1°C which is precise enough to detect even small changes.',
      specs:['±0.1°C accuracy','Non-contact IR','0.02°C resolution','I²C (SMBus)'],
      pin:'I²C (SDA/SCL)',
    },
    {
      id:'uv', num:4, name:'UV Sensor', chip:'VEML6075',
      color:'#bf5fff', glow:'rgba(191,95,255,0.15)',
      img:'images/sensor-chip-uv.png',
      priceP:'₹150', priceB:'₹50',
      desc:'Measures both UVA (aging rays) and UVB (burning rays) hitting the scalp through the cap fabric. India has some of the highest UV levels in the world — UV Index 10 to 11 is common in summer. High UV directly damages hair follicle DNA and accelerates hair loss. This sensor alerts the user when exposure crosses a safe limit.',
      specs:['UVA 320–400nm','UVB 280–320nm','UV Index 0–11+','I²C interface'],
      pin:'I²C (SDA/SCL)',
    },
    {
      id:'voc', num:5, name:'VOC Sensor', chip:'BME680',
      color:'#ff1dce', glow:'rgba(255,29,206,0.15)',
      img:'images/sensor-chip-voc.png',
      priceP:'₹420', priceB:'₹150',
      desc:'Detects tiny chemical gases released by the scalp — called Volatile Organic Compounds. An unhealthy scalp with inflammation or fungal activity actually releases different chemicals than a healthy one. This chip also measures temperature, humidity, and pressure all in one — making it the most versatile sensor in the cap.',
      specs:['4-in-1 chip','VOC + Temp + Humidity + Pressure','0–500 IAQ index','I²C or SPI'],
      pin:'I²C (SDA/SCL)',
    },
    {
      id:'humidity', num:6, name:'Humidity Sensor', chip:'SHT40',
      color:'#00cfff', glow:'rgba(0,207,255,0.15)',
      img:'images/sensor-chip-humidity.png',
      priceP:'₹250', priceB:'₹90',
      desc:'Measures the moisture level of the air trapped between the scalp and the cap. When the scalp environment stays too humid for too long, bacteria and fungi grow much faster — which worsens dandruff and scalp infections. One of the smallest sensors ever made at just 1.5mm × 1.5mm in size.',
      specs:['±1.8% RH accuracy','0–100% range','±0.2°C temperature','1.5×1.5mm chip'],
      pin:'I²C (SDA/SCL)',
    },
    {
      id:'nir', num:7, name:'NIR Sensor', chip:'AS7265x',
      color:'#39ff14', glow:'rgba(57,255,20,0.15)',
      img:'images/sensor-chip-nir.png',
      priceP:'₹1,000', priceB:'₹380',
      desc:'Near-Infrared light at 850–940nm wavelength can travel 2 to 3mm deep into the scalp tissue — deeper than any other optical method. Water in the tissue absorbs specific NIR wavelengths strongly. By measuring absorption, we know how hydrated the scalp tissue is from the inside — not just the surface. This is clinical-grade measurement.',
      specs:['18 spectral channels','850–940nm NIR range','3mm tissue depth','I²C interface'],
      pin:'I²C (SDA/SCL)',
    },
  ];

  const COMPONENTS = [
    {
      id:'esp32', num:1, name:'ESP32-S3 MCU', chip:'Espressif ESP32-S3',
      color:'#00aaff', glow:'rgba(0,170,255,0.15)',
      img:'images/comp-esp32.png',
      priceP:'₹350', priceB:'₹115',
      desc:'The brain of the entire system. Receives data from all 7 sensors through I²C, runs the AI model to calculate the Hair Health Score, and sends everything to phones via Bluetooth 5.0. Has built-in Wi-Fi too. Powerful enough to run a neural network directly on the chip — no cloud needed.',
      specs:['Dual-core 240MHz','BLE 5.0 + Wi-Fi','8MB PSRAM','AI acceleration'],
      pin:'Central controller',
    },
    {
      id:'battery', num:2, name:'LiPo Battery', chip:'3.7V 500mAh',
      color:'#ff8c00', glow:'rgba(255,140,0,0.15)',
      img:'images/comp-battery.png',
      priceP:'₹300', priceB:'₹110',
      desc:'Flat, flexible Lithium Polymer battery — same type used in smartphones and smartwatches. Sits in the rear band of the cap. At 500mAh capacity, it powers all 7 sensors and the ESP32-S3 for 6 to 8 hours of continuous monitoring. Charges via USB-C in about 2 hours.',
      specs:['3.7V nominal','500mAh capacity','~8hrs runtime','USB-C charging'],
      pin:'Power to PCB',
    },
    {
      id:'thread', num:3, name:'Conductive Thread', chip:'Shieldex 110/34 dtex',
      color:'#00e5cc', glow:'rgba(0,229,204,0.15)',
      img:'images/comp-thread.png',
      priceP:'₹500 (4m)', priceB:'₹120 (4m)',
      desc:'Silver-coated nylon thread that carries electrical signals between sensors and the ESP32 — completely replacing copper wires inside the cap. Looks and feels like normal sewing thread but conducts electricity. Flexible, washable up to 30 times, and naturally antibacterial due to the silver coating. This is what makes ScalpSense a soft, comfortable wearable instead of a rigid device.',
      specs:['Silver-coated nylon','500Ω per meter','150mA current rating','Washable 30× cycles'],
      pin:'Signal carrier — I²C lines',
    },
    {
      id:'pcb', num:4, name:'Flexible PCB', chip:'Polyimide FPC',
      color:'#39ff14', glow:'rgba(57,255,20,0.15)',
      img:'images/comp-pcb.png',
      priceP:'₹300', priceB:'₹80',
      desc:'Unlike a normal rigid circuit board, this flexible PCB is made on a thin plastic film called polyimide. It can bend and curve to fit the shape of the cap without cracking. All the sensors are mounted on this board which curves gently around the inside of the cap dome. Manufactured by JLCPCB in China and shipped to India.',
      specs:['Polyimide substrate','0.1mm thickness','Bends to 2mm radius','Conformal coated'],
      pin:'Sensor mounting board',
    },
    {
      id:'gasket', num:5, name:'Silicone Gasket', chip:'Medical Grade LSR',
      color:'#8ab4cc', glow:'rgba(138,180,204,0.15)',
      img:'images/comp-gasket.png',
      priceP:'₹350 (7pcs)', priceB:'₹80 (7pcs)',
      desc:'Soft transparent silicone rings placed around each sensor contact point — one ring per sensor, seven total. Like a rubber seal around a window. Keeps sweat and water from entering the sensor, creates a gentle cushion so the sensor does not feel like a hard bump, and holds the sensor at a consistent distance from the scalp for accurate readings.',
      specs:['40 Shore A hardness','Medical LSR grade','ISO 10993 biocompatible','Waterproof seal'],
      pin:'Physical seal around each sensor',
    },
    {
      id:'pogo', num:6, name:'Magnetic Pogo Pins', chip:'4-pin connector',
      color:'#fbbf24', glow:'rgba(251,191,36,0.15)',
      img:'images/comp-pogo.png',
      priceP:'₹120', priceB:'₹35',
      desc:'Spring-loaded gold-plated connector pins that attach magnetically — like a MagSafe charger. When the rear module is pressed against the cap, the four pins make reliable electrical contact. When you pull the module off for washing, it detaches smoothly. Rated for 10,000 attachment cycles so it will last the life of the product.',
      specs:['4-pin (VCC/GND/SDA/SCL)','Gold plated contacts','N35 magnet · 3kg pull','10,000 cycle rated'],
      pin:'Module ↔ Cap electrical bridge',
    },
  ];

  // ── Render ─────────────────────────────────────
  const root = document.getElementById('comp-root');
  root.innerHTML = `
    <div class="comp-header">
      <div class="section-badge">Hardware Details</div>
      <h2 class="section-heading">Sensors, <span>Components</span> & Wiring</h2>
      <p class="section-sub" style="margin:0 auto;text-align:center;">
        Every part that goes into the ScalpSense cap — what it is, how it works, what it costs, and how it connects.
      </p>
    </div>

    <!-- TAB BAR -->
    <div class="comp-tabs">
      <button class="comp-tab active" onclick="showCompPanel('sensors',this)">📡 7 Sensors</button>
      <button class="comp-tab" onclick="showCompPanel('components',this)">🔧 Components</button>
      <button class="comp-tab" onclick="showCompPanel('wiring',this)">🔌 Wiring & Connections</button>
    </div>

    <!-- SENSORS PANEL -->
    <div class="comp-panel active" id="panel-sensors">
      <div class="comp-grid" id="sensor-grid"></div>
    </div>

    <!-- COMPONENTS PANEL -->
    <div class="comp-panel" id="panel-components">
      <div class="comp-grid" id="comp-grid"></div>
    </div>

    <!-- WIRING PANEL -->
    <div class="comp-panel" id="panel-wiring">
      <div class="wiring-section">
        <div class="wiring-diagram">
          <div class="wiring-title">🔌 How Everything Connects</div>
          <div class="wiring-sub">All sensors talk to the ESP32-S3 using the same 2-wire I²C protocol through silver conductive thread. Each sensor has a unique address so the MCU knows who is sending data.</div>

          <!-- Wiring SVG -->
          <svg class="wiring-svg" viewBox="0 0 900 340" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="w-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#00e5cc"/>
              </marker>
            </defs>

            <!-- ESP32-S3 box center -->
            <rect x="350" y="120" width="200" height="100" rx="12"
              fill="rgba(0,170,255,0.12)" stroke="#00aaff" stroke-width="2"/>
            <text x="450" y="148" fill="#00aaff" font-family="Arial" font-size="13"
              font-weight="900" text-anchor="middle">ESP32-S3</text>
            <text x="450" y="163" fill="#8ab4cc" font-family="Arial" font-size="9"
              text-anchor="middle">I²C Bus: GPIO8(SDA) + GPIO9(SCL)</text>
            <text x="450" y="178" fill="#8ab4cc" font-family="Arial" font-size="9"
              text-anchor="middle">3.3V Power Rail → All sensors</text>
            <text x="450" y="193" fill="#00e5cc" font-family="Arial" font-size="8"
              text-anchor="middle">BLE 5.0 → Phones</text>
            <text x="450" y="207" fill="#8ab4cc" font-family="Arial" font-size="8"
              text-anchor="middle">Address: each sensor has unique I²C addr</text>

            <!-- Thread label -->
            <text x="450" y="300" fill="#3a6080" font-family="Arial" font-size="10"
              font-weight="700" text-anchor="middle">━━ All connections use Conductive Silver Thread (Shieldex 110/34 dtex) ━━</text>

            <!-- Sensor nodes and connection lines -->
            ${[
              { label:'PPG\nMAX30102', color:'#ff3d6e', addr:'0x57', x:60,  y:60,  ex:350, ey:155 },
              { label:'EIS\nAD5933',   color:'#ff8c00', addr:'0x0D', x:60,  y:140, ex:350, ey:160 },
              { label:'TEMP\nMLX90614',color:'#ff4500', addr:'0x5A', x:60,  y:220, ex:350, ey:165 },
              { label:'UV\nVEML6075',  color:'#bf5fff', addr:'0x10', x:60,  y:300, ex:350, ey:170 },
              { label:'VOC\nBME680',   color:'#ff1dce', addr:'0x76', x:760, y:60,  ex:550, ey:155 },
              { label:'HUM\nSHT40',    color:'#00cfff', addr:'0x44', x:760, y:170, ex:550, ey:165 },
              { label:'NIR\nAS7265x',  color:'#39ff14', addr:'0x49', x:760, y:280, ex:550, ey:175 },
            ].map(s => {
              const cx = s.x + 55, cy = s.y + 25;
              const lines = s.label.split('\n');
              return `
                <rect x="${s.x}" y="${s.y}" width="110" height="50" rx="10"
                  fill="rgba(5,10,15,0.8)" stroke="${s.color}" stroke-width="1.5"/>
                <text x="${cx}" y="${s.y+18}" fill="${s.color}" font-family="Arial"
                  font-size="10" font-weight="800" text-anchor="middle">${lines[0]}</text>
                <text x="${cx}" y="${s.y+30}" fill="#8ab4cc" font-family="Arial"
                  font-size="8" text-anchor="middle">${lines[1]}</text>
                <text x="${cx}" y="${s.y+42}" fill="#3a6080" font-family="Arial"
                  font-size="7" text-anchor="middle">addr ${s.addr}</text>
                <line x1="${s.x > 400 ? s.x : s.x+110}" y1="${cy}"
                  x2="${s.ex}" y2="${s.ey}"
                  stroke="${s.color}" stroke-width="1.5"
                  stroke-dasharray="6 4" marker-end="url(#w-arrow)"/>
              `;
            }).join('')}

            <!-- 3.3V power lines from battery -->
            <rect x="350" y="15" width="200" height="40" rx="8"
              fill="rgba(255,140,0,0.1)" stroke="#ff8c00" stroke-width="1.5"/>
            <text x="450" y="31" fill="#ff8c00" font-family="Arial" font-size="9"
              font-weight="800" text-anchor="middle">LiPo Battery 3.7V → TP4056 Charger</text>
            <text x="450" y="45" fill="#8ab4cc" font-family="Arial" font-size="8"
              text-anchor="middle">AP2112K Regulator → 3.3V stable output</text>
            <line x1="450" y1="55" x2="450" y2="120"
              stroke="#ff8c00" stroke-width="1.5" stroke-dasharray="4 3"
              marker-end="url(#w-arrow)"/>
          </svg>

          <!-- Connection table -->
          <div style="margin-top:24px;">
            <div style="font-size:15px;font-weight:800;color:#f0f4f8;margin-bottom:12px;">Pin Connection Reference</div>
            <table class="conn-table">
              <thead>
                <tr>
                  <th>Sensor / Component</th>
                  <th>VCC Pin</th>
                  <th>GND Pin</th>
                  <th>Data Pin</th>
                  <th>Clock Pin</th>
                  <th>I²C Address</th>
                  <th>Protocol</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ['PPG — MAX30102',      'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x57', 'I²C'],
                  ['EIS — AD5933',        'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x0D', 'I²C'],
                  ['TEMP — MLX90614',     'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x5A', 'I²C'],
                  ['UV — VEML6075',       'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x10', 'I²C'],
                  ['VOC — BME680',        'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x76', 'I²C'],
                  ['HUMIDITY — SHT40',    'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x44', 'I²C'],
                  ['NIR — AS7265x',       'GPIO 3.3V', 'GND', 'GPIO8 SDA', 'GPIO9 SCL', '0x49', 'I²C'],
                  ['LiPo Battery',        '3.7V+',     'GND', '—',         '—',         '—',    'Power'],
                  ['TP4056 Charger',      'USB 5V',    'GND', 'Battery+',  'Battery-',  '—',    'Charge IC'],
                  ['AP2112K Regulator',   'Bat 3.7V',  'GND', '3.3V out',  '—',         '—',    'Voltage Reg'],
                  ['Pogo Pin Connector',  '3.3V',      'GND', 'SDA pass',  'SCL pass',  '—',    'Mechanical'],
                ].map((r,i) => `
                  <tr>
                    ${r.map((cell,ci) => `<td>
                      ${ci >= 2 && ci <= 4 && cell !== '—'
                        ? `<span class="pin-badge" style="background:rgba(0,229,204,0.1);color:#00e5cc;">${cell}</span>`
                        : cell}
                    </td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Thread note -->
          <div style="margin-top:20px;background:rgba(0,229,204,0.06);border:1px solid rgba(0,229,204,0.2);border-radius:12px;padding:16px 20px;">
            <div style="font-size:14px;font-weight:800;color:#00e5cc;margin-bottom:6px;">🧵 Why Conductive Thread Instead of Wires?</div>
            <div style="font-size:13px;font-weight:600;color:#8ab4cc;line-height:1.7;">
              Normal copper wires are rigid — they would make the cap stiff and uncomfortable to wear.
              Silver-coated conductive thread carries the same I²C signals as a copper wire but stays
              completely flexible and soft. It is sewn through the fabric layers by an industrial sewing machine,
              invisible from the outside, and washable. This is the same material used in Google's Jacquard
              smart jacket and NASA space suit electronics.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── Render sensor cards ──────────────────────
  function renderCards(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = data.map(item => `
      <div class="comp-card" style="--card-accent:${item.color};--card-glow:${item.glow};">
        <div class="comp-img-wrap">
          <div class="comp-color-strip" style="background:${item.color};"></div>
          <div class="comp-num" style="background:${item.color}33;color:${item.color};">${item.num}</div>
          <img class="comp-img" src="${item.img}" alt="${item.name}" loading="lazy"/>
          <div class="comp-price-badge" style="color:${item.color};">
            ₹${item.priceP.replace('₹','')} <span style="color:#3a6080;font-size:10px;">/ bulk ${item.priceB.replace('₹','')}</span>
          </div>
        </div>
        <div class="comp-info">
          <div class="comp-name" style="color:${item.color};">${item.name}</div>
          <div class="comp-chip">${item.chip}</div>
          <div class="comp-desc">${item.desc}</div>
          <div class="comp-specs">
            ${item.specs.map(s=>`<span class="comp-spec-pill">${s}</span>`).join('')}
            <span class="comp-spec-pill" style="border-color:rgba(0,229,204,0.3);color:#00e5cc;">${item.pin}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderCards(SENSORS, 'sensor-grid');
  renderCards(COMPONENTS, 'comp-grid');

  // ── Tab switching ────────────────────────────
  window.showCompPanel = function(id, btn) {
    document.querySelectorAll('.comp-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.comp-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('panel-' + id).classList.add('active');
    btn.classList.add('active');
  };

})();
