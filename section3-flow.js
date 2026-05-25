/* ═══════════════════════════════════════════
   SECTION 3 — SYSTEM FLOW ANIMATION
   Full-width Y-shape layout:
   Cap (far left) ──── MCU (center) ─┬─ User Phone (top right)
                                      └─ Doctor Phone (bottom right)
   ═══════════════════════════════════════════ */
(function () {

  const style = document.createElement('style');
  style.textContent = `
    #section-flow {
      background:
        radial-gradient(ellipse 60% 40% at 15% 50%, rgba(0,229,204,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 60% 40% at 85% 50%, rgba(0,170,255,0.07) 0%, transparent 55%),
        linear-gradient(180deg, #050a0f 0%, #080f1a 50%, #050a0f 100%);
      padding: 100px 0 120px;
      overflow: hidden;
    }

    .flow-header {
      text-align: center;
      margin-bottom: 70px;
      padding: 0 40px;
    }

    /* ── Y-Shape canvas wrapper ── */
    .flow-canvas-wrap {
      position: relative;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      height: 520px;
      padding: 0 40px;
    }

    /* SVG lines layer — sits behind everything */
    .flow-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: visible;
    }

    /* ── Node common ── */
    .flow-node {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      z-index: 5;
      transform: translate(-50%, -50%);
    }

    .node-img-wrap {
      position: relative;
    }

    .node-img {
      display: block;
      object-fit: cover;
      transition: transform 0.3s, filter 0.3s;
    }

    .node-img:hover { transform: scale(1.06); }

    /* Individual node styles */
    .node-cap .node-img {
      width: 170px; height: 170px;
      border-radius: 26px;
      border: 3px solid #00e5cc;
      box-shadow: 0 0 36px rgba(0,229,204,0.45), 0 0 80px rgba(0,229,204,0.15);
    }

    .node-mcu .node-img {
      width: 130px; height: 130px;
      border-radius: 50%;
      border: 3px solid #00aaff;
      box-shadow: 0 0 30px rgba(0,170,255,0.5), 0 0 70px rgba(0,170,255,0.18);
    }

    .node-user .node-img {
      width: 155px; height: 155px;
      border-radius: 26px;
      border: 3px solid #39ff14;
      box-shadow: 0 0 34px rgba(57,255,20,0.45), 0 0 80px rgba(57,255,20,0.15);
    }

    .node-doctor .node-img {
      width: 155px; height: 155px;
      border-radius: 26px;
      border: 3px solid #bf5fff;
      box-shadow: 0 0 34px rgba(191,95,255,0.45), 0 0 80px rgba(191,95,255,0.15);
    }

    /* Pulse rings */
    .node-pulse {
      position: absolute;
      border-radius: inherit;
      border: 2px solid;
      animation: nodePulseRing 2.5s ease-out infinite;
      pointer-events: none;
    }

    .node-pulse-2 { animation-delay: 0.9s; opacity: 0.45; }

    @keyframes nodePulseRing {
      0%   { transform: scale(0.88); opacity: 0.7; }
      100% { transform: scale(1.28); opacity: 0;   }
    }

    .node-label {
      font-size: 17px;
      font-weight: 900;
      color: #f0f4f8;
      letter-spacing: -0.3px;
      text-align: center;
      text-shadow: 0 0 20px rgba(0,0,0,0.8);
    }

    .node-sublabel {
      font-size: 12px;
      font-weight: 700;
      color: #3a6080;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: -6px;
    }

    /* ── SVG animated signal path ── */
    .sig-line-track {
      fill: none;
      stroke-width: 2;
      opacity: 0.25;
    }

    .sig-line-dash {
      fill: none;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-dasharray: 10 8;
      animation: dashScroll 1s linear infinite;
      opacity: 0.7;
    }

    .sig-line-dash.rev {
      animation-direction: reverse;
      opacity: 0.45;
      stroke-dasharray: 6 12;
    }

    @keyframes dashScroll {
      to { stroke-dashoffset: -36; }
    }

    /* Travelling dot on path */
    .travel-dot {
      animation: travelAlong linear infinite;
    }

    @keyframes travelAlong {
      0%   { opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { opacity: 0; }
    }

    /* ── Live ticker strip ── */
    .live-ticker {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 44px;
      padding: 0 40px;
    }

    .ticker-chip {
      background: rgba(10,21,32,0.9);
      border: 1.5px solid rgba(26,58,92,0.7);
      border-radius: 14px;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 110px;
    }

    .ticker-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      animation: tickBlink 1.3s ease-in-out infinite;
      flex-shrink: 0;
    }

    @keyframes tickBlink {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.25; transform:scale(0.65); }
    }

    .ticker-val {
      font-size: 19px;
      font-weight: 900;
      letter-spacing: -0.5px;
      line-height: 1;
    }

    .ticker-lbl {
      font-size: 11px;
      font-weight: 700;
      color: #3a6080;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ── Score cards ── */
    .score-display {
      display: flex;
      gap: 24px;
      justify-content: center;
      margin-top: 40px;
      flex-wrap: wrap;
      padding: 0 40px;
    }

    .score-card {
      background: rgba(10,21,32,0.9);
      border-radius: 22px;
      padding: 22px 32px;
      text-align: center;
      border: 1.5px solid;
      min-width: 170px;
    }

    .score-card-name {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
      opacity: 0.85;
    }

    .score-card-val {
      font-size: 52px;
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1;
      margin-bottom: 4px;
    }

    .score-card-label {
      font-size: 13px;
      font-weight: 700;
      opacity: 0.55;
    }

    /* ── Steps ── */
    .flow-steps {
      display: grid;
      grid-template-columns: repeat(4,1fr);
      gap: 20px;
      max-width: 1200px;
      margin: 52px auto 0;
      padding: 0 40px;
    }

    .step-card {
      background: rgba(10,21,32,0.8);
      border: 1px solid rgba(26,58,92,0.6);
      border-radius: 20px;
      padding: 24px 20px;
      text-align: center;
      transition: all 0.3s;
    }

    .step-card:hover {
      border-color: rgba(0,229,204,0.35);
      transform: translateY(-4px);
    }

    .step-num {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg,rgba(0,229,204,0.15),rgba(0,170,255,0.15));
      border: 1.5px solid rgba(0,229,204,0.4);
      font-size: 15px;
      font-weight: 900;
      color: #00e5cc;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 14px;
    }

    .step-title {
      font-size: 16px;
      font-weight: 800;
      color: #f0f4f8;
      margin-bottom: 8px;
      letter-spacing: -0.2px;
    }

    .step-desc {
      font-size: 13px;
      font-weight: 600;
      color: #8ab4cc;
      line-height: 1.65;
    }

    /* Signal particles */
    .sig-particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      animation: sigFloat linear infinite;
      opacity: 0;
    }

    @keyframes sigFloat {
      0%   { transform: translateY(0) scale(1);   opacity: 0; }
      10%  { opacity: 0.8; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-70px) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ── Render skeleton ──────────────────────────
  const root = document.getElementById('flow-root');
  root.innerHTML = `
    <div class="flow-header">
      <div class="section-badge">Real-Time System</div>
      <h2 class="section-heading">How <span>ScalpSense</span> Works</h2>
      <p class="section-sub" style="margin:0 auto;text-align:center;">
        From sensor to scalp score in milliseconds. Live data travels from cap to both phones simultaneously.
      </p>
    </div>

    <!-- Y-SHAPE CANVAS -->
    <div class="flow-canvas-wrap" id="flow-canvas-wrap">

      <!-- SVG signal lines -->
      <svg class="flow-svg" id="flow-svg" viewBox="0 0 1320 520" preserveAspectRatio="none"></svg>

      <!-- NODE: Smart Cap — far left -->
      <div class="flow-node node-cap" id="node-cap" style="left:13%;top:50%;">
        <div class="node-img-wrap">
          <img src="images/cap-side.png" class="node-img" alt="Smart Cap"/>
          <div class="node-pulse" style="border-color:#00e5cc55;border-radius:26px;inset:-12px;"></div>
          <div class="node-pulse node-pulse-2" style="border-color:#00e5cc22;border-radius:30px;inset:-22px;"></div>
        </div>
        <div class="node-label">Smart Cap</div>
        <div class="node-sublabel">7 Sensors Active</div>
      </div>

      <!-- NODE: MCU — center -->
      <div class="flow-node node-mcu" id="node-mcu" style="left:48%;top:50%;">
        <div class="node-img-wrap">
          <img src="images/mcu-board.png" class="node-img" alt="MCU"/>
          <div class="node-pulse" style="border-color:#00aaff55;border-radius:50%;inset:-12px;"></div>
          <div class="node-pulse node-pulse-2" style="border-color:#00aaff22;border-radius:50%;inset:-22px;"></div>
        </div>
        <div class="node-label">ESP32-S3</div>
        <div class="node-sublabel">AI · BLE 5.0</div>
      </div>

      <!-- NODE: User Phone — top right -->
      <div class="flow-node node-user" id="node-user" style="left:83%;top:25%;">
        <div class="node-img-wrap">
          <img src="images/phone-user.png" class="node-img" alt="User Phone"/>
          <div class="node-pulse" style="border-color:#39ff1455;border-radius:26px;inset:-12px;"></div>
        </div>
        <div class="node-label" style="color:#39ff14;">User App</div>
        <div class="node-sublabel">Patient · Live Score</div>
      </div>

      <!-- NODE: Doctor Phone — bottom right -->
      <div class="flow-node node-doctor" id="node-doctor" style="left:83%;top:75%;">
        <div class="node-img-wrap">
          <img src="images/phone-doctor.png" class="node-img" alt="Doctor Phone"/>
          <div class="node-pulse" style="border-color:#bf5fff55;border-radius:26px;inset:-12px;"></div>
        </div>
        <div class="node-label" style="color:#bf5fff;">Doctor App</div>
        <div class="node-sublabel">Dr. Atul Kumar</div>
      </div>

    </div>

    <!-- LIVE TICKER -->
    <div class="live-ticker">
      <div class="ticker-chip" style="border-color:#ff3d6e44;">
        <div class="ticker-dot" style="background:#ff3d6e;box-shadow:0 0 8px #ff3d6e;"></div>
        <div>
          <div class="ticker-val" id="tick-ppg" style="color:#ff3d6e;">68%</div>
          <div class="ticker-lbl">Blood Flow</div>
        </div>
      </div>
      <div class="ticker-chip" style="border-color:#ff450044;">
        <div class="ticker-dot" style="background:#ff4500;box-shadow:0 0 8px #ff4500;animation-delay:.2s;"></div>
        <div>
          <div class="ticker-val" id="tick-temp" style="color:#ff4500;">36.4°C</div>
          <div class="ticker-lbl">Temperature</div>
        </div>
      </div>
      <div class="ticker-chip" style="border-color:#ff8c0044;">
        <div class="ticker-dot" style="background:#ff8c00;box-shadow:0 0 8px #ff8c00;animation-delay:.4s;"></div>
        <div>
          <div class="ticker-val" id="tick-oil" style="color:#ff8c00;">72%</div>
          <div class="ticker-lbl">Oiliness</div>
        </div>
      </div>
      <div class="ticker-chip" style="border-color:#00cfff44;">
        <div class="ticker-dot" style="background:#00cfff;box-shadow:0 0 8px #00cfff;animation-delay:.6s;"></div>
        <div>
          <div class="ticker-val" id="tick-hum" style="color:#00cfff;">58%</div>
          <div class="ticker-lbl">Humidity</div>
        </div>
      </div>
      <div class="ticker-chip" style="border-color:#bf5fff44;">
        <div class="ticker-dot" style="background:#bf5fff;box-shadow:0 0 8px #bf5fff;animation-delay:.8s;"></div>
        <div>
          <div class="ticker-val" id="tick-uv" style="color:#bf5fff;">UV 8</div>
          <div class="ticker-lbl">UV Index</div>
        </div>
      </div>
      <div class="ticker-chip" style="border-color:#39ff1444;">
        <div class="ticker-dot" style="background:#39ff14;box-shadow:0 0 8px #39ff14;animation-delay:1s;"></div>
        <div>
          <div class="ticker-val" id="tick-nir" style="color:#39ff14;">62%</div>
          <div class="ticker-lbl">NIR Hydration</div>
        </div>
      </div>
      <div class="ticker-chip" style="border-color:#ff1dce44;">
        <div class="ticker-dot" style="background:#ff1dce;box-shadow:0 0 8px #ff1dce;animation-delay:1.2s;"></div>
        <div>
          <div class="ticker-val" id="tick-voc" style="color:#ff1dce;">28ppm</div>
          <div class="ticker-lbl">VOC</div>
        </div>
      </div>
    </div>

    <!-- SCORES -->
    <div class="score-display">
      <div class="score-card" style="border-color:#22c55e44;">
        <div class="score-card-name" style="color:#22c55e;">Vijay · Male 26</div>
        <div class="score-card-val" id="score-vijay" style="color:#22c55e;">72</div>
        <div class="score-card-label">Hair Health Score</div>
      </div>
      <div class="score-card" style="border-color:#f59e0b44;">
        <div class="score-card-name" style="color:#f59e0b;">Sheetal · Female 24</div>
        <div class="score-card-val" id="score-sheetal" style="color:#f59e0b;">65</div>
        <div class="score-card-label">Hair Health Score</div>
      </div>
    </div>

    <!-- STEPS -->
    <div class="flow-steps">
      <div class="step-card">
        <div class="step-num">1</div>
        <div class="step-title">Sensors Capture</div>
        <div class="step-desc">7 sensors read scalp simultaneously — blood flow at 50Hz, temperature every 10s, VOC every 20s.</div>
      </div>
      <div class="step-card">
        <div class="step-num">2</div>
        <div class="step-title">AI Processes</div>
        <div class="step-desc">ESP32-S3 fuses all readings and runs CNN-LSTM on-device to calculate your Hair Health Score instantly.</div>
      </div>
      <div class="step-card">
        <div class="step-num">3</div>
        <div class="step-title">BLE Broadcasts</div>
        <div class="step-desc">Bluetooth 5.0 splits the signal — encrypted packet reaches both phones simultaneously in under 50ms.</div>
      </div>
      <div class="step-card">
        <div class="step-num">4</div>
        <div class="step-title">Doctor Responds</div>
        <div class="step-desc">Doctor reviews live data, sends recommendations. User sees all responses and appointments instantly.</div>
      </div>
    </div>
  `;

  // ── Build SVG Y-shape after DOM ready ────────
  // We draw in the viewBox coordinate space: 1320 × 520
  // Node centres (matching CSS left%/top% × 1320/520):
  //   Cap:    left=13% → x=172,  top=50% → y=260
  //   MCU:    left=48% → x=634,  top=50% → y=260
  //   User:   left=83% → x=1096, top=25% → y=130
  //   Doctor: left=83% → x=1096, top=75% → y=390

  const VW = 1320, VH = 520;
  const CAP    = { x: 172,  y: 260 };
  const MCU    = { x: 634,  y: 260 };
  const USER   = { x: 1096, y: 130 };
  const DOCTOR = { x: 1096, y: 390 };

  // Y-branch point — where the split happens (slightly right of MCU)
  const BRANCH = { x: 820, y: 260 };

  function buildSVG() {
    const svg = document.getElementById('flow-svg');
    if (!svg) return;

    // ── Line 1: Cap → MCU (horizontal) ──
    // Track
    addPath(svg,
      `M ${CAP.x} ${CAP.y} L ${MCU.x} ${MCU.y}`,
      { stroke: '#00e5cc', cls: 'sig-line-track' }
    );
    // Animated dash forward
    addPath(svg,
      `M ${CAP.x} ${CAP.y} L ${MCU.x} ${MCU.y}`,
      { stroke: '#00e5cc', cls: 'sig-line-dash', dashOffset: 0 }
    );

    // ── Line 2: MCU → Branch point ──
    addPath(svg,
      `M ${MCU.x} ${MCU.y} L ${BRANCH.x} ${BRANCH.y}`,
      { stroke: '#00aaff', cls: 'sig-line-track' }
    );
    addPath(svg,
      `M ${MCU.x} ${MCU.y} L ${BRANCH.x} ${BRANCH.y}`,
      { stroke: '#00aaff', cls: 'sig-line-dash', dashOffset: 0 }
    );

    // ── Branch arm UP: Branch → User phone ──
    // Curve upward to user
    const curvUp = `M ${BRANCH.x} ${BRANCH.y} C ${BRANCH.x+80} ${BRANCH.y} ${USER.x-80} ${USER.y} ${USER.x} ${USER.y}`;
    addPath(svg, curvUp, { stroke: '#39ff14', cls: 'sig-line-track' });
    addPath(svg, curvUp, { stroke: '#39ff14', cls: 'sig-line-dash', delay: '0s' });

    // ── Branch arm DOWN: Branch → Doctor phone ──
    const curvDown = `M ${BRANCH.x} ${BRANCH.y} C ${BRANCH.x+80} ${BRANCH.y} ${DOCTOR.x-80} ${DOCTOR.y} ${DOCTOR.x} ${DOCTOR.y}`;
    addPath(svg, curvDown, { stroke: '#bf5fff', cls: 'sig-line-track' });
    addPath(svg, curvDown, { stroke: '#bf5fff', cls: 'sig-line-dash', delay: '0.6s' });

    // ── Return signal: Doctor → MCU (faint reverse) ──
    const retDoc = `M ${DOCTOR.x} ${DOCTOR.y} C ${DOCTOR.x-80} ${DOCTOR.y} ${BRANCH.x+80} ${BRANCH.y} ${BRANCH.x} ${BRANCH.y}`;
    addPath(svg, retDoc, { stroke: '#bf5fff', cls: 'sig-line-dash rev', delay: '1s' });

    // ── Y-branch dot ──
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', BRANCH.x);
    circle.setAttribute('cy', BRANCH.y);
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', '#00aaff');
    circle.setAttribute('filter', 'drop-shadow(0 0 8px #00aaff)');
    circle.style.animation = 'nodePulseRing 2s ease-out infinite';
    svg.appendChild(circle);

    // Outer glow ring on branch dot
    const ring = document.createElementNS('http://www.w3.org/2000/svg','circle');
    ring.setAttribute('cx', BRANCH.x);
    ring.setAttribute('cy', BRANCH.y);
    ring.setAttribute('r', '14');
    ring.setAttribute('fill', 'none');
    ring.setAttribute('stroke', '#00aaff');
    ring.setAttribute('stroke-width', '1.5');
    ring.setAttribute('opacity', '0.4');
    ring.style.animation = 'branchRingPulse 2s ease-out infinite';
    svg.appendChild(ring);

    // Add keyframes for branch ring
    if (!document.getElementById('branchKF')) {
      const kf = document.createElement('style');
      kf.id = 'branchKF';
      kf.textContent = `
        @keyframes branchRingPulse {
          0%   { r:14; opacity:0.5; }
          100% { r:32; opacity:0; }
        }
      `;
      document.head.appendChild(kf);
    }

    // ── Travelling data packets along paths ──
    spawnPackets(svg);
  }

  function addPath(svg, d, opts) {
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', d);
    path.setAttribute('class', opts.cls || '');
    path.setAttribute('stroke', opts.stroke || '#fff');
    if (opts.delay) path.style.animationDelay = opts.delay;
    svg.appendChild(path);
    return path;
  }

  // Animated circles travelling along paths
  function spawnPackets(svg) {
    const PATHS = [
      { d: `M ${CAP.x} ${CAP.y} L ${MCU.x} ${MCU.y}`,                                                                         color:'#00e5cc', dur:2.2, delay:0   },
      { d: `M ${CAP.x} ${CAP.y} L ${MCU.x} ${MCU.y}`,                                                                         color:'#00e5cc', dur:2.2, delay:1.1 },
      { d: `M ${MCU.x} ${MCU.y} L ${BRANCH.x} ${BRANCH.y}`,                                                                    color:'#00aaff', dur:1.4, delay:0.3 },
      { d: `M ${BRANCH.x} ${BRANCH.y} C ${BRANCH.x+80} ${BRANCH.y} ${USER.x-80} ${USER.y} ${USER.x} ${USER.y}`,               color:'#39ff14', dur:1.8, delay:0   },
      { d: `M ${BRANCH.x} ${BRANCH.y} C ${BRANCH.x+80} ${BRANCH.y} ${USER.x-80} ${USER.y} ${USER.x} ${USER.y}`,               color:'#39ff14', dur:1.8, delay:0.9 },
      { d: `M ${BRANCH.x} ${BRANCH.y} C ${BRANCH.x+80} ${BRANCH.y} ${DOCTOR.x-80} ${DOCTOR.y} ${DOCTOR.x} ${DOCTOR.y}`,      color:'#bf5fff', dur:1.8, delay:0.5 },
      { d: `M ${BRANCH.x} ${BRANCH.y} C ${BRANCH.x+80} ${BRANCH.y} ${DOCTOR.x-80} ${DOCTOR.y} ${DOCTOR.x} ${DOCTOR.y}`,      color:'#bf5fff', dur:1.8, delay:1.4 },
    ];

    PATHS.forEach(p => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
      circle.setAttribute('r', '6');
      circle.setAttribute('fill', p.color);
      circle.setAttribute('filter', `drop-shadow(0 0 6px ${p.color})`);

      const anim = document.createElementNS('http://www.w3.org/2000/svg','animateMotion');
      anim.setAttribute('dur', p.dur + 's');
      anim.setAttribute('repeatCount', 'indefinite');
      anim.setAttribute('begin', p.delay + 's');

      const mpath = document.createElementNS('http://www.w3.org/2000/svg','mpath');
      // Inline path for animateMotion
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg','path');
      pathEl.setAttribute('d', p.d);
      // Give it an id
      const pid = 'animpath_' + Math.random().toString(36).slice(2);
      pathEl.setAttribute('id', pid);
      pathEl.setAttribute('fill', 'none');
      pathEl.style.display = 'none';
      svg.appendChild(pathEl);
      mpath.setAttributeNS('http://www.w3.org/1999/xlink','href','#' + pid);

      // Opacity animation
      const opAnim = document.createElementNS('http://www.w3.org/2000/svg','animate');
      opAnim.setAttribute('attributeName','opacity');
      opAnim.setAttribute('values','0;1;1;0');
      opAnim.setAttribute('keyTimes','0;0.05;0.92;1');
      opAnim.setAttribute('dur', p.dur + 's');
      opAnim.setAttribute('repeatCount','indefinite');
      opAnim.setAttribute('begin', p.delay + 's');

      anim.appendChild(mpath);
      circle.appendChild(anim);
      circle.appendChild(opAnim);
      svg.appendChild(circle);
    });
  }

  // Build after brief delay so DOM is ready
  setTimeout(buildSVG, 50);

  // ── Animate live tickers ─────────────────────
  function rnd(min, max, dec) {
    return +(Math.random()*(max-min)+min).toFixed(dec||0);
  }

  function animateTickers() {
    const set = (id, v) => { const e = document.getElementById(id); if(e) e.textContent = v; };
    set('tick-ppg',  rnd(55,80)+'%');
    set('tick-temp', rnd(35.8,37.2,1)+'°C');
    set('tick-oil',  rnd(60,85)+'%');
    set('tick-hum',  rnd(48,72)+'%');
    set('tick-uv',   'UV '+rnd(5,11));
    set('tick-nir',  rnd(50,75)+'%');
    set('tick-voc',  rnd(18,40)+'ppm');

    const sv = document.getElementById('score-vijay');
    const ss = document.getElementById('score-sheetal');
    if(sv){ const v=rnd(68,78); sv.textContent=v; sv.style.color=v>=70?'#22c55e':'#f59e0b'; }
    if(ss){ const s=rnd(60,72); ss.textContent=s; ss.style.color=s>=70?'#22c55e':'#f59e0b'; }
  }

  setInterval(animateTickers, 2200);

  // ── Floating signal particles ─────────────────
  const PCOLORS = ['#00e5cc','#00aaff','#39ff14','#bf5fff','#ff3d6e','#ff8c00','#ff1dce','#00cfff'];

  function spawnParticle() {
    const wrap = document.getElementById('flow-canvas-wrap');
    if(!wrap) return;
    const p = document.createElement('div');
    p.className = 'sig-particle';
    const sz  = rnd(4,9);
    const col = PCOLORS[Math.floor(Math.random()*PCOLORS.length)];
    const dur = rnd(2,4,1);
    p.style.cssText = `
      width:${sz}px;height:${sz}px;
      background:${col};
      box-shadow:0 0 ${sz*2}px ${col};
      left:${rnd(5,95)}%;
      top:${rnd(10,90)}%;
      animation-duration:${dur}s;
      animation-delay:${rnd(0,1,1)}s;
    `;
    wrap.appendChild(p);
    setTimeout(()=>p.remove(),(dur+1.2)*1000);
  }

  setInterval(spawnParticle, 280);

})();
