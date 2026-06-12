/* ═══════════════════════════════════════════
   SECTION 4 — SYSTEM ARCHITECTURE
   ═══════════════════════════════════════════ */
(function () {

  const style = document.createElement('style');
  style.textContent = `
    #section-arch {
      background: linear-gradient(180deg,#080f1a 0%,#050a0f 100%);
      padding: 100px 0 120px;
      overflow: hidden;
    }

    .arch-header { text-align:center; margin-bottom:70px; padding:0 40px; }

    /* ── Architecture SVG canvas ── */
    .arch-canvas {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 40px;
      position: relative;
    }

    .arch-svg {
      width: 100%;
      height: auto;
      display: block;
      overflow: visible;
    }

    /* ── Layer legend below diagram ── */
    .arch-layers {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 16px;
      max-width: 1100px;
      margin: 50px auto 0;
      padding: 0 40px;
    }

    .arch-layer-card {
      background: rgba(10,21,32,0.85);
      border: 1px solid rgba(26,58,92,0.7);
      border-radius: 16px;
      padding: 20px;
      border-top: 3px solid;
      transition: transform 0.25s;
    }

    .arch-layer-card:hover { transform: translateY(-4px); }

    .arch-layer-title {
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 8px;
      letter-spacing: -0.2px;
    }

    .arch-layer-desc {
      font-size: 13px;
      font-weight: 600;
      color: #8ab4cc;
      line-height: 1.65;
    }

    /* ── Pulse animation for live nodes ── */
    .arch-node-pulse {
      animation: archPulse 2s ease-out infinite;
    }

    @keyframes archPulse {
      0%   { opacity:0.7; transform:scale(0.85); }
      100% { opacity:0;   transform:scale(1.5);  }
    }

    .arch-data-flow {
      animation: archDash 1.2s linear infinite;
    }

    @keyframes archDash {
      to { stroke-dashoffset: -32; }
    }

    .arch-data-flow-rev {
      animation: archDash 1.8s linear infinite reverse;
      opacity: 0.4;
    }
  `;
  document.head.appendChild(style);

  const root = document.getElementById('arch-root');
  root.innerHTML = `
    <div class="arch-header">
      <div class="section-badge">System Design</div>
      <h2 class="section-heading">Complete <span>Architecture</span></h2>
      <p class="section-sub" style="margin:0 auto;text-align:center;">
        How every part connects — from sensors stitched into fabric all the way to the doctor's phone.
      </p>
    </div>

    <div class="arch-canvas">
      <svg class="arch-svg" viewBox="0 0 1020 560" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-teal">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="arrow-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#00e5cc"/>
          </marker>
          <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#00aaff"/>
          </marker>
          <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#39ff14"/>
          </marker>
          <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#bf5fff"/>
          </marker>
        </defs>

        <!-- ════════════════════════════════════ -->
        <!-- OUTER CAP BOUNDARY BOX              -->
        <!-- ════════════════════════════════════ -->
        <rect x="20" y="40" width="580" height="480" rx="20"
          fill="rgba(0,229,204,0.04)" stroke="#00e5cc" stroke-width="1.5"
          stroke-dasharray="8 4" opacity="0.6"/>
        <text x="40" y="30" fill="#00e5cc" font-family="Arial" font-size="13"
          font-weight="800" letter-spacing="2">SMART CAP — HARDWARE LAYER</text>

        <!-- ════════════════════════════════════ -->
        <!-- SENSOR NODES — Left column          -->
        <!-- ════════════════════════════════════ -->

        <!-- PPG -->
        <circle cx="90" cy="110" r="28" fill="rgba(255,61,110,0.15)" stroke="#ff3d6e" stroke-width="2"/>
        <circle cx="90" cy="110" r="28" fill="none" stroke="#ff3d6e" stroke-width="2"
          class="arch-node-pulse" opacity="0.5"/>
        <text x="90" y="104" fill="#ff3d6e" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">PPG</text>
        <text x="90" y="116" fill="#ff3d6e" font-family="Arial" font-size="8" text-anchor="middle">MAX30102</text>
        <text x="90" y="127" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">Blood Flow</text>

        <!-- EIS -->
        <circle cx="90" cy="195" r="28" fill="rgba(255,140,0,0.15)" stroke="#ff8c00" stroke-width="2"/>
        <circle cx="90" cy="195" r="28" fill="none" stroke="#ff8c00" stroke-width="2"
          class="arch-node-pulse" opacity="0.5" style="animation-delay:0.3s"/>
        <text x="90" y="189" fill="#ff8c00" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">EIS</text>
        <text x="90" y="201" fill="#ff8c00" font-family="Arial" font-size="8" text-anchor="middle">AD5933</text>
        <text x="90" y="212" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">Oiliness</text>

        <!-- TEMP -->
        <circle cx="90" cy="280" r="28" fill="rgba(255,69,0,0.15)" stroke="#ff4500" stroke-width="2"/>
        <circle cx="90" cy="280" r="28" fill="none" stroke="#ff4500" stroke-width="2"
          class="arch-node-pulse" opacity="0.5" style="animation-delay:0.6s"/>
        <text x="90" y="274" fill="#ff4500" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">TEMP</text>
        <text x="90" y="286" fill="#ff4500" font-family="Arial" font-size="8" text-anchor="middle">MLX90614</text>
        <text x="90" y="297" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">Temperature</text>

        <!-- UV -->
        <circle cx="90" cy="365" r="28" fill="rgba(191,95,255,0.15)" stroke="#bf5fff" stroke-width="2"/>
        <circle cx="90" cy="365" r="28" fill="none" stroke="#bf5fff" stroke-width="2"
          class="arch-node-pulse" opacity="0.5" style="animation-delay:0.9s"/>
        <text x="90" y="359" fill="#bf5fff" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">UV</text>
        <text x="90" y="371" fill="#bf5fff" font-family="Arial" font-size="8" text-anchor="middle">VEML6075</text>
        <text x="90" y="382" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">UV Index</text>

        <!-- VOC -->
        <circle cx="90" cy="450" r="28" fill="rgba(255,29,206,0.15)" stroke="#ff1dce" stroke-width="2"/>
        <circle cx="90" cy="450" r="28" fill="none" stroke="#ff1dce" stroke-width="2"
          class="arch-node-pulse" opacity="0.5" style="animation-delay:1.2s"/>
        <text x="90" y="444" fill="#ff1dce" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">VOC</text>
        <text x="90" y="456" fill="#ff1dce" font-family="Arial" font-size="8" text-anchor="middle">BME680</text>
        <text x="90" y="467" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">Chemicals</text>

        <!-- HUM — second column -->
        <circle cx="210" cy="365" r="28" fill="rgba(0,207,255,0.15)" stroke="#00cfff" stroke-width="2"/>
        <circle cx="210" cy="365" r="28" fill="none" stroke="#00cfff" stroke-width="2"
          class="arch-node-pulse" opacity="0.5" style="animation-delay:1.5s"/>
        <text x="210" y="359" fill="#00cfff" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">HUM</text>
        <text x="210" y="371" fill="#00cfff" font-family="Arial" font-size="8" text-anchor="middle">SHT40</text>
        <text x="210" y="382" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">Humidity</text>

        <!-- NIR -->
        <circle cx="210" cy="450" r="28" fill="rgba(57,255,20,0.15)" stroke="#39ff14" stroke-width="2"/>
        <circle cx="210" cy="450" r="28" fill="none" stroke="#39ff14" stroke-width="2"
          class="arch-node-pulse" opacity="0.5" style="animation-delay:1.8s"/>
        <text x="210" y="444" fill="#39ff14" font-family="Arial" font-size="9" font-weight="800" text-anchor="middle">NIR</text>
        <text x="210" y="456" fill="#39ff14" font-family="Arial" font-size="8" text-anchor="middle">AS7265x</text>
        <text x="210" y="467" fill="#8ab4cc" font-family="Arial" font-size="7" text-anchor="middle">Hydration</text>

        <!-- ════════════════════════════════════ -->
        <!-- CONDUCTIVE THREAD LINES             -->
        <!-- ════════════════════════════════════ -->
        <!-- Label -->
        <text x="310" y="490" fill="#3a6080" font-family="Arial" font-size="10" font-weight="700"
          text-anchor="middle">━━ Conductive Silver Thread (I²C) ━━</text>

        <!-- PPG → I2C bus -->
        <line x1="118" y1="110" x2="310" y2="110"
          stroke="#ff3d6e" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>
        <!-- EIS → I2C bus -->
        <line x1="118" y1="195" x2="310" y2="195"
          stroke="#ff8c00" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>
        <!-- TEMP → I2C bus -->
        <line x1="118" y1="280" x2="310" y2="280"
          stroke="#ff4500" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>
        <!-- UV → I2C bus -->
        <line x1="118" y1="365" x2="310" y2="365"
          stroke="#bf5fff" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>
        <!-- VOC → I2C bus -->
        <line x1="118" y1="450" x2="310" y2="450"
          stroke="#ff1dce" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>
        <!-- HUM → I2C bus -->
        <line x1="238" y1="365" x2="310" y2="365"
          stroke="#00cfff" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>
        <!-- NIR → I2C bus -->
        <line x1="238" y1="450" x2="310" y2="450"
          stroke="#39ff14" stroke-width="1.5" stroke-dasharray="5 3"
          class="arch-data-flow"/>

        <!-- Vertical I2C bus line -->
        <line x1="310" y1="90" x2="310" y2="470"
          stroke="#00e5cc" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <rect x="297" y="85" width="26" height="14" rx="4"
          fill="rgba(0,229,204,0.15)" stroke="#00e5cc" stroke-width="1"/>
        <text x="310" y="95" fill="#00e5cc" font-family="Arial" font-size="8"
          font-weight="800" text-anchor="middle">I²C</text>

        <!-- ════════════════════════════════════ -->
        <!-- MCU / ESP32-S3 BOX                  -->
        <!-- ════════════════════════════════════ -->
        <rect x="360" y="160" width="200" height="220" rx="16"
          fill="rgba(0,170,255,0.1)" stroke="#00aaff" stroke-width="2"/>

        <!-- MCU inner glow -->
        <rect x="375" y="175" width="170" height="190" rx="12"
          fill="rgba(0,170,255,0.06)" stroke="rgba(0,170,255,0.3)" stroke-width="1"/>

        <text x="460" y="200" fill="#00aaff" font-family="Arial" font-size="14"
          font-weight="900" text-anchor="middle">ESP32-S3</text>
        <text x="460" y="216" fill="#8ab4cc" font-family="Arial" font-size="9"
          text-anchor="middle">Main Microcontroller</text>

        <!-- Sub blocks inside MCU -->
        <rect x="385" y="228" width="70" height="38" rx="7"
          fill="rgba(0,229,204,0.1)" stroke="#00e5cc" stroke-width="1"/>
        <text x="420" y="244" fill="#00e5cc" font-family="Arial" font-size="8"
          font-weight="800" text-anchor="middle">AI Engine</text>
        <text x="420" y="256" fill="#8ab4cc" font-family="Arial" font-size="7"
          text-anchor="middle">CNN-LSTM</text>

        <rect x="465" y="228" width="70" height="38" rx="7"
          fill="rgba(0,170,255,0.1)" stroke="#00aaff" stroke-width="1"/>
        <text x="500" y="244" fill="#00aaff" font-family="Arial" font-size="8"
          font-weight="800" text-anchor="middle">BLE 5.0</text>
        <text x="500" y="256" fill="#8ab4cc" font-family="Arial" font-size="7"
          text-anchor="middle">Transmit</text>

        <rect x="385" y="278" width="70" height="38" rx="7"
          fill="rgba(57,255,20,0.08)" stroke="#39ff14" stroke-width="1"/>
        <text x="420" y="294" fill="#39ff14" font-family="Arial" font-size="8"
          font-weight="800" text-anchor="middle">Memory</text>
        <text x="420" y="306" fill="#8ab4cc" font-family="Arial" font-size="7"
          text-anchor="middle">8MB Flash</text>

        <rect x="465" y="278" width="70" height="38" rx="7"
          fill="rgba(255,140,0,0.08)" stroke="#ff8c00" stroke-width="1"/>
        <text x="500" y="294" fill="#ff8c00" font-family="Arial" font-size="8"
          font-weight="800" text-anchor="middle">Power Mgr</text>
        <text x="500" y="306" fill="#8ab4cc" font-family="Arial" font-size="7"
          text-anchor="middle">Sleep/Wake</text>

        <!-- Score output label -->
        <text x="460" y="345" fill="#00e5cc" font-family="Arial" font-size="10"
          font-weight="800" text-anchor="middle">Hair Health Score: 0–100</text>
        <text x="460" y="358" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Calculated every update cycle</text>

        <!-- I2C Bus → MCU connector line -->
        <line x1="323" y1="280" x2="360" y2="280"
          stroke="#00e5cc" stroke-width="2.5" marker-end="url(#arrow-teal)"
          class="arch-data-flow"/>
        <text x="341" y="274" fill="#00e5cc" font-family="Arial" font-size="8"
          text-anchor="middle">I²C</text>

        <!-- Battery box inside cap -->
        <rect x="360" y="80" width="120" height="55" rx="10"
          fill="rgba(255,140,0,0.1)" stroke="#ff8c00" stroke-width="1.5"/>
        <text x="420" y="100" fill="#ff8c00" font-family="Arial" font-size="10"
          font-weight="800" text-anchor="middle">LiPo Battery</text>
        <text x="420" y="113" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">3.7V · 500mAh · ~8hrs</text>
        <text x="420" y="126" fill="#8ab4cc" font-family="Arial" font-size="7"
          text-anchor="middle">Powers all sensors + MCU</text>
        <!-- Battery → MCU -->
        <line x1="420" y1="135" x2="420" y2="160"
          stroke="#ff8c00" stroke-width="1.5" stroke-dasharray="4 3"
          marker-end="url(#arrow-teal)" class="arch-data-flow-rev"/>
        <text x="435" y="150" fill="#ff8c00" font-family="Arial" font-size="8">3.3V</text>

        <!-- Pogo / module box -->
        <rect x="495" y="80" width="100" height="55" rx="10"
          fill="rgba(0,229,204,0.07)" stroke="#00e5cc" stroke-width="1.5"/>
        <text x="545" y="99" fill="#00e5cc" font-family="Arial" font-size="9"
          font-weight="800" text-anchor="middle">Pogo Pins</text>
        <text x="545" y="112" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Magnetic Detach</text>
        <text x="545" y="124" fill="#8ab4cc" font-family="Arial" font-size="7"
          text-anchor="middle">Module connector</text>

        <!-- ════════════════════════════════════ -->
        <!-- BLE TRANSMISSION                    -->
        <!-- ════════════════════════════════════ -->
        <!-- BLE waves -->
        <path d="M 575 270 Q 610 250 610 270 Q 610 290 575 270" fill="none"
          stroke="#00aaff" stroke-width="1.5" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <path d="M 575 270 Q 625 240 625 270 Q 625 300 575 270" fill="none"
          stroke="#00aaff" stroke-width="1.5" opacity="0.4">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
        </path>
        <path d="M 575 270 Q 642 228 642 270 Q 642 312 575 270" fill="none"
          stroke="#00aaff" stroke-width="1" opacity="0.2">
          <animate attributeName="opacity" values="0.05;0.3;0.05" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
        </path>
        <text x="620" y="222" fill="#00aaff" font-family="Arial" font-size="10"
          font-weight="800" text-anchor="middle">BLE 5.0</text>
        <text x="620" y="234" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Encrypted · &lt;50ms</text>

        <!-- ════════════════════════════════════ -->
        <!-- RIGHT SIDE — PHONES                 -->
        <!-- ════════════════════════════════════ -->

        <!-- User Phone -->
        <rect x="720" y="80" width="140" height="160" rx="16"
          fill="rgba(57,255,20,0.08)" stroke="#39ff14" stroke-width="2"/>
        <text x="790" y="106" fill="#39ff14" font-family="Arial" font-size="11"
          font-weight="900" text-anchor="middle">User Phone</text>
        <text x="790" y="120" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Patient App</text>
        <rect x="738" y="130" width="104" height="90" rx="8"
          fill="rgba(57,255,20,0.05)" stroke="rgba(57,255,20,0.3)" stroke-width="1"/>
        <text x="790" y="150" fill="#39ff14" font-family="Arial" font-size="9"
          text-anchor="middle">Live Score</text>
        <text x="790" y="165" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Sensor Readings</text>
        <text x="790" y="178" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Alerts</text>
        <text x="790" y="191" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Doctor Advice</text>
        <text x="790" y="205" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Appointments</text>
        <text x="790" y="218" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Trend History</text>

        <!-- Doctor Phone -->
        <rect x="720" y="300" width="140" height="160" rx="16"
          fill="rgba(191,95,255,0.08)" stroke="#bf5fff" stroke-width="2"/>
        <text x="790" y="326" fill="#bf5fff" font-family="Arial" font-size="11"
          font-weight="900" text-anchor="middle">Doctor Phone</text>
        <text x="790" y="340" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Dr. Atul Kumar</text>
        <rect x="738" y="350" width="104" height="90" rx="8"
          fill="rgba(191,95,255,0.05)" stroke="rgba(191,95,255,0.3)" stroke-width="1"/>
        <text x="790" y="370" fill="#bf5fff" font-family="Arial" font-size="9"
          text-anchor="middle">Patient List</text>
        <text x="790" y="385" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Live Vitals</text>
        <text x="790" y="398" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Alerts Inbox</text>
        <text x="790" y="411" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Send Advice</text>
        <text x="790" y="424" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Book Appointment</text>
        <text x="790" y="438" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">View Reports</text>

        <!-- MCU → User phone line -->
        <path d="M 660 230 Q 690 160 720 160"
          fill="none" stroke="#39ff14" stroke-width="2"
          stroke-dasharray="8 5" marker-end="url(#arrow-green)"
          class="arch-data-flow"/>
        <text x="688" y="178" fill="#39ff14" font-family="Arial" font-size="9"
          font-weight="700">Data</text>

        <!-- MCU → Doctor phone line -->
        <path d="M 660 310 Q 690 380 720 380"
          fill="none" stroke="#bf5fff" stroke-width="2"
          stroke-dasharray="8 5" marker-end="url(#arrow-purple)"
          class="arch-data-flow" style="animation-delay:0.5s"/>
        <text x="688" y="366" fill="#bf5fff" font-family="Arial" font-size="9"
          font-weight="700">Data</text>

        <!-- Return: Doctor → MCU recommendation -->
        <path d="M 720 430 Q 690 450 660 330"
          fill="none" stroke="#bf5fff" stroke-width="1.5"
          stroke-dasharray="5 6" opacity="0.45"
          class="arch-data-flow-rev"/>
        <text x="686" y="445" fill="#bf5fff" font-family="Arial" font-size="8"
          opacity="0.7">Advice</text>

        <!-- ════════════════════════════════════ -->
        <!-- LOCAL SERVER LABEL (laptop/server)  -->
        <!-- ════════════════════════════════════ -->
        <rect x="720" y="490" width="260" height="50" rx="10"
          fill="rgba(0,170,255,0.07)" stroke="rgba(0,170,255,0.4)" stroke-width="1"/>
        <text x="850" y="511" fill="#00aaff" font-family="Arial" font-size="10"
          font-weight="800" text-anchor="middle">Local Server (Node.js + Socket.IO)</text>
        <text x="850" y="527" fill="#8ab4cc" font-family="Arial" font-size="8"
          text-anchor="middle">Laptop · Same WiFi Network · Port 3000</text>

        <!-- Connection lines to server -->
        <line x1="790" y1="490" x2="820" y2="540"
          stroke="#00aaff" stroke-width="1" stroke-dasharray="3 4" opacity="0.4"/>
        <line x1="790" y1="460" x2="850" y2="490"
          stroke="#00aaff" stroke-width="1" stroke-dasharray="3 4" opacity="0.3"/>

      </svg>
    </div>

    <!-- Layer cards -->
    <div class="arch-layers">
      <div class="arch-layer-card" style="border-top-color:#00e5cc;">
        <div class="arch-layer-title" style="color:#00e5cc;">🧢 Sensor Layer</div>
        <div class="arch-layer-desc">
          7 sensor nodes stitched into the cap fabric using conductive silver thread.
          Each sensor communicates with the MCU over the I²C protocol — like a shared telephone line
          where each sensor has its own address so the MCU knows who is talking.
        </div>
      </div>
      <div class="arch-layer-card" style="border-top-color:#00aaff;">
        <div class="arch-layer-title" style="color:#00aaff;">⚙ Processing Layer</div>
        <div class="arch-layer-desc">
          ESP32-S3 microcontroller receives all sensor data, runs the AI model on-device,
          calculates the Hair Health Score, and manages power. The battery provides 3.7V which
          is regulated down to a stable 3.3V for all sensors and chips.
        </div>
      </div>
      <div class="arch-layer-card" style="border-top-color:#39ff14;">
        <div class="arch-layer-title" style="color:#39ff14;">📱 Communication Layer</div>
        <div class="arch-layer-desc">
          BLE 5.0 broadcasts encrypted data packets from the cap to both phones in under 50ms.
          A local Node.js server on the laptop routes data between all three devices over WiFi,
          enabling real-time doctor-patient communication.
        </div>
      </div>
    </div>
  `;
})();
