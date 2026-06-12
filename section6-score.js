/* ═══════════════════════════════════════════
   SECTION 6 — HAIR HEALTH SCORE CALCULATOR
   Formula explanation + live interactive demo
   ═══════════════════════════════════════════ */
(function () {

  const style = document.createElement('style');
  style.textContent = `
    #section-score {
      background:
        radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,229,204,0.08) 0%, transparent 55%),
        linear-gradient(180deg, #080f1a 0%, #050a0f 100%);
      padding: 100px 0 120px;
      overflow: hidden;
    }

    .score-header { text-align:center; margin-bottom:70px; padding:0 40px; }

    .score-main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 40px;
      align-items: start;
    }

    /* ── Formula left side ── */
    .formula-panel {}

    .formula-title {
      font-size: 22px;
      font-weight: 900;
      color: #f0f4f8;
      margin-bottom: 6px;
      letter-spacing: -0.4px;
    }

    .formula-sub {
      font-size: 14px;
      font-weight: 600;
      color: #8ab4cc;
      margin-bottom: 28px;
      line-height: 1.6;
    }

    /* Formula box */
    .formula-box {
      background: rgba(5,10,15,0.95);
      border: 1px solid rgba(0,229,204,0.2);
      border-radius: 16px;
      padding: 24px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #e2e8f0;
      line-height: 2;
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
    }

    .formula-box::before {
      content: 'FORMULA';
      position: absolute;
      top: 10px; right: 14px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #3a6080;
      font-family: Arial;
    }

    .f-comment { color: #3a6080; }
    .f-var     { color: #00e5cc; font-weight: 700; }
    .f-weight  { color: #fbbf24; }
    .f-op      { color: #f0f4f8; }
    .f-result  { color: #39ff14; font-weight: 700; }
    .f-func    { color: #bf5fff; }

    /* Sensor contribution bars */
    .contrib-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 28px;
    }

    .contrib-row {
      display: grid;
      grid-template-columns: 130px 1fr 60px;
      gap: 12px;
      align-items: center;
    }

    .contrib-label {
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .contrib-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .contrib-bar-wrap {
      background: rgba(255,255,255,0.05);
      border-radius: 6px;
      height: 10px;
      overflow: hidden;
    }

    .contrib-bar-fill {
      height: 100%;
      border-radius: 6px;
      transition: width 1s ease;
    }

    .contrib-pct {
      font-size: 12px;
      font-weight: 800;
      color: #f0f4f8;
      text-align: right;
    }

    /* Score range table */
    .range-table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 12px;
      overflow: hidden;
    }

    .range-table th {
      background: rgba(0,170,255,0.15);
      color: #00aaff;
      font-size: 12px;
      font-weight: 800;
      padding: 10px 14px;
      text-align: left;
      letter-spacing: 0.5px;
    }

    .range-table td {
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 600;
      border-bottom: 1px solid rgba(26,58,92,0.3);
    }

    /* ── Live calculator right side ── */
    .calc-panel {
      background: rgba(10,21,32,0.9);
      border: 1.5px solid rgba(26,58,92,0.8);
      border-radius: 24px;
      padding: 28px;
      position: sticky;
      top: 80px;
    }

    .calc-title {
      font-size: 16px;
      font-weight: 900;
      color: #f0f4f8;
      margin-bottom: 4px;
      text-align: center;
    }

    .calc-sub {
      font-size: 12px;
      color: #3a6080;
      text-align: center;
      font-weight: 600;
      margin-bottom: 20px;
    }

    /* Big score ring */
    .calc-ring-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      position: relative;
    }

    .calc-ring-svg { transition: all 0.5s; }

    /* Slider controls */
    .calc-sliders {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .slider-row {
      display: grid;
      grid-template-columns: 90px 1fr 40px;
      align-items: center;
      gap: 10px;
    }

    .slider-label {
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .slider-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .score-slider {
      width: 100%;
      height: 4px;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      background: rgba(255,255,255,0.08);
    }

    .score-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px; height: 14px;
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.15s;
    }

    .score-slider::-webkit-slider-thumb:hover { transform: scale(1.3); }

    .slider-val {
      font-size: 12px;
      font-weight: 800;
      text-align: right;
    }

    /* Step by step breakdown */
    .calc-breakdown {
      margin-top: 20px;
      background: rgba(5,10,15,0.8);
      border: 1px solid rgba(26,58,92,0.5);
      border-radius: 12px;
      padding: 14px;
      font-family: 'Courier New', monospace;
      font-size: 11px;
      color: #8ab4cc;
      line-height: 1.9;
    }

    .bd-line-result {
      color: #00e5cc;
      font-weight: 700;
      border-top: 1px solid rgba(26,58,92,0.5);
      margin-top: 6px;
      padding-top: 6px;
    }

    /* How it works steps */
    .how-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      max-width: 1100px;
      margin: 50px auto 0;
      padding: 0 40px;
    }

    .how-step {
      background: rgba(10,21,32,0.8);
      border: 1px solid rgba(26,58,92,0.6);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
      transition: all 0.3s;
    }

    .how-step:hover { transform: translateY(-4px); border-color: rgba(0,229,204,0.35); }

    .how-step-num {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(0,229,204,0.15), rgba(0,170,255,0.15));
      border: 1.5px solid rgba(0,229,204,0.4);
      font-size: 15px; font-weight: 900; color: #00e5cc;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 12px;
    }

    .how-step-title {
      font-size: 14px; font-weight: 800; color: #f0f4f8;
      margin-bottom: 7px; letter-spacing: -0.2px;
    }

    .how-step-desc {
      font-size: 12px; font-weight: 600; color: #8ab4cc; line-height: 1.65;
    }

    /* Temp score explainer */
    .temp-explainer {
      background: rgba(255,140,0,0.06);
      border: 1px solid rgba(255,140,0,0.2);
      border-radius: 12px;
      padding: 16px 20px;
      margin: 20px 0;
    }

    .temp-explainer-title {
      font-size: 14px; font-weight: 800; color: #ff8c00;
      margin-bottom: 8px;
    }

    .temp-explainer-text {
      font-size: 13px; font-weight: 600; color: #8ab4cc;
      line-height: 1.7;
    }
  `;
  document.head.appendChild(style);

  // ── Sensor config ─────────────────────────────
  const SENSORS = [
    { id:'bloodFlow',   label:'Blood Flow',   color:'#ff3d6e', weight:0.25, min:0,    max:100,  unit:'%',   default:68, inverted:false },
    { id:'moisture',    label:'Moisture',     color:'#4ade80', weight:0.20, min:0,    max:100,  unit:'%',   default:55, inverted:false },
    { id:'oiliness',    label:'Oiliness',     color:'#ff8c00', weight:0.15, min:0,    max:100,  unit:'%',   default:72, inverted:true  },
    { id:'voc',         label:'VOC',          color:'#ff1dce', weight:0.15, min:0,    max:100,  unit:'ppm', default:28, inverted:true  },
    { id:'uv',          label:'UV Exposure',  color:'#bf5fff', weight:0.10, min:0,    max:100,  unit:'%',   default:18, inverted:true  },
    { id:'infrared',    label:'NIR Hydration',color:'#39ff14', weight:0.10, min:0,    max:100,  unit:'%',   default:60, inverted:false },
    { id:'temperature', label:'Temperature',  color:'#ff4500', weight:0.05, min:35.0, max:40.0, unit:'°C',  default:36.4, inverted:false, istemp:true },
  ];

  function scoreColor(s) {
    if (s >= 85) return '#22c55e';
    if (s >= 70) return '#84cc16';
    if (s >= 50) return '#f59e0b';
    if (s >= 30) return '#f97316';
    return '#ef4444';
  }

  function scoreLabel(s) {
    if (s >= 85) return 'Excellent';
    if (s >= 70) return 'Good';
    if (s >= 50) return 'Fair';
    if (s >= 30) return 'Poor';
    return 'Critical';
  }

  function scoreAction(s) {
    if (s >= 85) return 'Keep your current routine going.';
    if (s >= 70) return 'Drink more water and adjust diet.';
    if (s >= 50) return 'Use recommended scalp treatment.';
    if (s >= 30) return 'See a hair specialist soon.';
    return 'Visit a dermatologist immediately.';
  }

  function calcTempScore(t) {
    return Math.max(0, (37.5 - Math.abs(t - 36.5)) / 37.5 * 100);
  }

  function calcScore(vals) {
    const contributions = SENSORS.map(s => {
      const v = parseFloat(vals[s.id]);
      let contribution;
      if (s.istemp) {
        const ts = calcTempScore(v);
        contribution = ts * s.weight;
      } else if (s.inverted) {
        contribution = (100 - v) * s.weight;
      } else {
        contribution = v * s.weight;
      }
      return contribution;
    });
    const raw = contributions.reduce((a,b) => a+b, 0);
    return { score: Math.min(100, Math.max(0, Math.round(raw))), contributions };
  }

  // ── Render HTML ────────────────────────────────
  const root = document.getElementById('score-root');
  root.innerHTML = `
    <div class="score-header">
      <div class="section-badge">AI Scoring Engine</div>
      <h2 class="section-heading">How the <span>Hair Health Score</span> Works</h2>
      <p class="section-sub" style="margin:0 auto;text-align:center;">
        A single number from 0 to 100 — calculated by combining all 7 sensor readings using a weighted formula.
        Move the sliders on the right to see it recalculate live.
      </p>
    </div>

    <div class="score-main">

      <!-- LEFT: Formula & explanation -->
      <div class="formula-panel">

        <div class="formula-title">The Weighted Formula</div>
        <div class="formula-sub">
          Each sensor contributes a different percentage to the final score based on how much that measurement
          affects hair health. Blood flow matters most (25%) because poor blood supply to follicles is the
          leading cause of hair loss. Temperature matters least (5%) because it is the most variable.
        </div>

        <!-- Formula code block -->
        <div class="formula-box">
<span class="f-comment">// Step 1 — Calculate each sensor's contribution</span>
<span class="f-result">Score</span> <span class="f-op">=</span> <span class="f-op">(</span><span class="f-var">BloodFlow</span>     <span class="f-op">×</span> <span class="f-weight">0.25</span><span class="f-op">)</span>   <span class="f-comment">// 25% weight</span>
     <span class="f-op">+</span> <span class="f-op">(</span><span class="f-var">Moisture</span>      <span class="f-op">×</span> <span class="f-weight">0.20</span><span class="f-op">)</span>   <span class="f-comment">// 20% weight</span>
     <span class="f-op">+</span> <span class="f-op">((</span><span class="f-weight">100</span> <span class="f-op">-</span> <span class="f-var">Oiliness</span><span class="f-op">)</span> <span class="f-op">×</span> <span class="f-weight">0.15</span><span class="f-op">)</span>  <span class="f-comment">// 15% (inverted)</span>
     <span class="f-op">+</span> <span class="f-op">((</span><span class="f-weight">100</span> <span class="f-op">-</span> <span class="f-var">VOC</span><span class="f-op">)</span>      <span class="f-op">×</span> <span class="f-weight">0.15</span><span class="f-op">)</span>  <span class="f-comment">// 15% (inverted)</span>
     <span class="f-op">+</span> <span class="f-op">((</span><span class="f-weight">100</span> <span class="f-op">-</span> <span class="f-var">UV</span><span class="f-op">)</span>       <span class="f-op">×</span> <span class="f-weight">0.10</span><span class="f-op">)</span>  <span class="f-comment">// 10% (inverted)</span>
     <span class="f-op">+</span> <span class="f-op">(</span><span class="f-var">NIR_Hydration</span> <span class="f-op">×</span> <span class="f-weight">0.10</span><span class="f-op">)</span>   <span class="f-comment">// 10% weight</span>
     <span class="f-op">+</span> <span class="f-op">(</span><span class="f-func">TempScore</span><span class="f-op">(</span><span class="f-var">T</span><span class="f-op">)</span>   <span class="f-op">×</span> <span class="f-weight">0.05</span><span class="f-op">)</span>   <span class="f-comment">// 5% weight</span>

<span class="f-comment">// Step 2 — Temperature needs special treatment</span>
<span class="f-func">TempScore</span><span class="f-op">(</span><span class="f-var">T</span><span class="f-op">) =</span> <span class="f-op">(</span><span class="f-weight">37.5</span> <span class="f-op">-</span> |<span class="f-var">T</span> <span class="f-op">-</span> <span class="f-weight">36.5</span>|<span class="f-op">) /</span> <span class="f-weight">37.5</span> <span class="f-op">×</span> <span class="f-weight">100</span>

<span class="f-comment">// Step 3 — Clamp result between 0 and 100</span>
<span class="f-result">Final Score</span> <span class="f-op">=</span> <span class="f-func">clamp</span><span class="f-op">(</span><span class="f-result">Score</span><span class="f-op">, </span><span class="f-weight">0</span><span class="f-op">, </span><span class="f-weight">100</span><span class="f-op">)</span>
        </div>

        <!-- Temp explainer -->
        <div class="temp-explainer">
          <div class="temp-explainer-title">🌡️ Why Temperature Uses a Different Formula</div>
          <div class="temp-explainer-text">
            The ideal scalp temperature is 36.5°C. Too cold means poor blood circulation.
            Too hot means inflammation. So temperature does not get better as it goes higher —
            it peaks at 36.5°C and drops in both directions. The formula |T - 36.5| measures
            how far away the reading is from the ideal. The closer to zero, the better.
          </div>
        </div>

        <!-- Why some sensors are inverted -->
        <div style="background:rgba(255,61,110,0.06);border:1px solid rgba(255,61,110,0.2);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:14px;font-weight:800;color:#ff3d6e;margin-bottom:8px;">↔️ Why Some Sensors Are Inverted</div>
          <div style="font-size:13px;font-weight:600;color:#8ab4cc;line-height:1.7;">
            For Blood Flow, Moisture, and NIR — higher readings are better for hair health,
            so they contribute directly to the score.<br/><br/>
            For Oiliness, VOC, and UV — higher readings are worse for hair health.
            So they are subtracted from 100 before being used. A VOC of 80 (bad) becomes
            (100–80) = 20 contribution. A VOC of 10 (good) becomes (100–10) = 90 contribution.
            This way every sensor always contributes more when the scalp is healthier.
          </div>
        </div>

        <!-- Weight contributions visual -->
        <div style="font-size:16px;font-weight:800;color:#f0f4f8;margin-bottom:16px;">Sensor Weight Breakdown</div>
        <div class="contrib-list">
          ${SENSORS.map(s => `
            <div class="contrib-row">
              <div class="contrib-label" style="color:${s.color};">
                <div class="contrib-dot" style="background:${s.color};box-shadow:0 0 6px ${s.color};"></div>
                ${s.label}
              </div>
              <div class="contrib-bar-wrap">
                <div class="contrib-bar-fill" style="width:${s.weight*100}%;background:${s.color};"></div>
              </div>
              <div class="contrib-pct">${(s.weight*100).toFixed(0)}%</div>
            </div>
          `).join('')}
        </div>

        <!-- Score range table -->
        <div style="font-size:16px;font-weight:800;color:#f0f4f8;margin:28px 0 14px;">Score Ranges — What They Mean</div>
        <table class="range-table">
          <thead>
            <tr>
              <th>Score Range</th>
              <th>Status</th>
              <th>What It Means</th>
              <th>What to Do</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['85 – 100', 'Excellent', '22c55e', 'All sensors are in healthy range. Scalp is well hydrated, blood flow is good, oiliness is balanced.', 'Keep your current routine. No treatment needed.'],
              ['70 – 84',  'Good',      '84cc16', 'One or two sensors are slightly outside ideal range. Minor imbalance detected.', 'Drink more water. Check diet for biotin and iron.'],
              ['50 – 69',  'Fair',      'f59e0b', 'Multiple sensors showing early warning signs. Could be stress, diet, or environmental causes.', 'Use a recommended scalp treatment. Consult doctor.'],
              ['30 – 49',  'Poor',      'f97316', 'Clear signs of scalp problem. Blood flow or oiliness significantly out of range.', 'See a hair specialist or trichologist.'],
              ['0 – 29',   'Critical',  'ef4444', 'Serious scalp condition detected. Multiple readings severely abnormal.', 'Visit a dermatologist immediately.'],
            ].map(([range, status, color, what, action], i) => `
              <tr>
                <td><span style="color:#${color};font-weight:800;">${range}</span></td>
                <td><span style="background:#${color}22;color:#${color};padding:2px 10px;border-radius:6px;font-weight:800;font-size:12px;">${status}</span></td>
                <td style="color:#8ab4cc;font-size:12px;">${what}</td>
                <td style="color:#f0f4f8;font-size:12px;">${action}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- RIGHT: Live Calculator -->
      <div class="calc-panel">
        <div class="calc-title">Live Score Calculator</div>
        <div class="calc-sub">Move any slider to recalculate instantly</div>

        <!-- Score ring -->
        <div class="calc-ring-wrap">
          <svg class="calc-ring-svg" width="180" height="180" viewBox="0 0 180 180" id="calc-ring-svg">
            <circle cx="90" cy="90" r="72" fill="none"
              stroke="rgba(255,255,255,0.06)" stroke-width="12"/>
            <circle cx="90" cy="90" r="72" fill="none"
              id="calc-ring-fill"
              stroke="#22c55e" stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="452.4"
              stroke-dashoffset="113"
              transform="rotate(-90 90 90)"
              style="transition:stroke-dashoffset 0.8s ease,stroke 0.4s;"/>
            <text x="90" y="82" fill="#f0f4f8" font-family="Arial"
              font-size="38" font-weight="900" text-anchor="middle" id="calc-score-num">75</text>
            <text x="90" y="102" fill="#8ab4cc" font-family="Arial"
              font-size="11" text-anchor="middle" id="calc-score-label">Good</text>
            <text x="90" y="118" fill="#8ab4cc" font-family="Arial"
              font-size="9" text-anchor="middle" id="calc-score-action">Drink more water</text>
          </svg>
        </div>

        <!-- Sliders -->
        <div class="calc-sliders">
          ${SENSORS.map(s => `
            <div class="slider-row">
              <div class="slider-label" style="color:${s.color};">
                <div class="slider-dot" style="background:${s.color};box-shadow:0 0 5px ${s.color};"></div>
                ${s.label.split(' ')[0]}
              </div>
              <input type="range"
                class="score-slider"
                id="slider-${s.id}"
                min="${s.id==='temperature'?350:0}"
                max="${s.id==='temperature'?400:100}"
                value="${s.id==='temperature'?Math.round(s.default*10):s.default}"
                oninput="recalcScore()"
                style="accent-color:${s.color};"
              />
              <div class="slider-val" style="color:${s.color};" id="val-${s.id}">
                ${s.default}${s.unit}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Breakdown -->
        <div class="calc-breakdown" id="calc-breakdown">
          Calculating...
        </div>

        <!-- Reset button -->
        <button onclick="resetSliders()"
          style="width:100%;margin-top:14px;background:rgba(0,229,204,0.1);border:1.5px solid rgba(0,229,204,0.3);color:#00e5cc;font-size:13px;font-weight:700;padding:10px;border-radius:10px;cursor:pointer;transition:all 0.2s;"
          onmouseover="this.style.background='rgba(0,229,204,0.18)'"
          onmouseout="this.style.background='rgba(0,229,204,0.1)'">
          ↺ Reset to Default Values
        </button>
      </div>
    </div>

    <!-- How it works steps -->
    <div class="how-steps">
      <div class="how-step">
        <div class="how-step-num">1</div>
        <div class="how-step-title">Sensors Read</div>
        <div class="how-step-desc">All 7 sensors collect data from the scalp continuously. Each produces a number — e.g. blood flow 68%, temperature 36.4°C.</div>
      </div>
      <div class="how-step">
        <div class="how-step-num">2</div>
        <div class="how-step-title">Inverted Where Needed</div>
        <div class="how-step-desc">Sensors where high = bad (oiliness, VOC, UV) are subtracted from 100 so they all point in the same direction: higher = healthier.</div>
      </div>
      <div class="how-step">
        <div class="how-step-num">3</div>
        <div class="how-step-title">Weights Applied</div>
        <div class="how-step-desc">Each converted value is multiplied by its importance weight — blood flow gets 25%, temperature gets 5%, and so on.</div>
      </div>
      <div class="how-step">
        <div class="how-step-num">4</div>
        <div class="how-step-title">Score Delivered</div>
        <div class="how-step-desc">All weighted contributions are added together and clamped between 0 and 100. The AI sends this score to the user's phone in real time.</div>
      </div>
    </div>
  `;

  // ── Calculator logic ──────────────────────────
  const SENSORS_MAP = {};
  SENSORS.forEach(s => SENSORS_MAP[s.id] = s);

  function getVals() {
    const vals = {};
    SENSORS.forEach(s => {
      const el = document.getElementById('slider-' + s.id);
      if (!el) return;
      vals[s.id] = s.id === 'temperature'
        ? parseFloat(el.value) / 10
        : parseFloat(el.value);
    });
    return vals;
  }

  window.recalcScore = function () {
    const vals = getVals();

    // Update value labels
    SENSORS.forEach(s => {
      const v = vals[s.id];
      const el = document.getElementById('val-' + s.id);
      if (el) el.textContent = s.id === 'temperature'
        ? v.toFixed(1) + s.unit
        : Math.round(v) + s.unit;
    });

    const { score, contributions } = calcScore(vals);
    const color = scoreColor(score);
    const label = scoreLabel(score);
    const action = scoreAction(score);

    // Update ring
    const circ = 2 * Math.PI * 72;
    const offset = circ - (score / 100) * circ;
    const ringFill = document.getElementById('calc-ring-fill');
    const scoreNum  = document.getElementById('calc-score-num');
    const scoreLbl  = document.getElementById('calc-score-label');
    const scoreAct  = document.getElementById('calc-score-action');
    if (ringFill)  { ringFill.setAttribute('stroke-dashoffset', offset); ringFill.setAttribute('stroke', color); }
    if (scoreNum)  { scoreNum.textContent  = score; scoreNum.setAttribute('fill', color); }
    if (scoreLbl)  { scoreLbl.textContent  = label; }
    if (scoreAct)  { scoreAct.textContent  = action.length > 30 ? action.slice(0,28)+'…' : action; }

    // Update breakdown
    const bd = document.getElementById('calc-breakdown');
    if (bd) {
      const lines = SENSORS.map((s, i) => {
        const v = vals[s.id];
        const raw = s.istemp
          ? `TempScore(${v.toFixed(1)})=${calcTempScore(v).toFixed(1)}`
          : s.inverted
            ? `(100-${Math.round(v)})=${100-Math.round(v)}`
            : Math.round(v);
        const contrib = contributions[i].toFixed(2);
        return `<span style="color:#3a6080;">${s.label.padEnd(14)}</span> <span style="color:#8ab4cc;">${String(raw).padEnd(16)} × ${s.weight}</span> = <span style="color:${s.color};">${contrib}</span>`;
      });
      bd.innerHTML = lines.join('\n') +
        `\n<div class="bd-line-result">Final Score = ${score} / 100 — ${label}</div>`;
    }
  };

  window.resetSliders = function () {
    SENSORS.forEach(s => {
      const el = document.getElementById('slider-' + s.id);
      if (el) el.value = s.id === 'temperature'
        ? Math.round(s.default * 10)
        : s.default;
    });
    recalcScore();
  };

  // Initial calculation
  setTimeout(recalcScore, 100);

})();
