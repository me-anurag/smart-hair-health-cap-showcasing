/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */
(function () {

  // ── Inject CSS ──────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #section-hero {
      padding-top: 64px;
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,204,0.12) 0%, transparent 60%),
        linear-gradient(180deg, #050a0f 0%, #080f1a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }

    .hero-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      max-width: 1200px;
      width: 100%;
      padding: 80px 60px;
    }

    /* ── Left: Text ── */
    .hero-text { }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,229,204,0.1);
      border: 1px solid rgba(0,229,204,0.25);
      color: #00e5cc;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 7px 16px;
      border-radius: 30px;
      margin-bottom: 24px;
      animation: fadeSlideUp 0.8s ease both;
    }

    .hero-dot {
      width: 7px; height: 7px;
      background: #00e5cc;
      border-radius: 50%;
      animation: heroDotPulse 1.5s infinite;
    }

    @keyframes heroDotPulse {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.3; transform:scale(0.7); }
    }

    .hero-title {
      font-size: clamp(40px, 5.5vw, 68px);
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1.02;
      color: #f0f4f8;
      margin-bottom: 20px;
      animation: fadeSlideUp 0.8s 0.1s ease both;
    }

    .hero-title .hl {
      background: linear-gradient(90deg, #00e5cc 0%, #00aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-desc {
      font-size: 17px;
      font-weight: 600;
      color: #8ab4cc;
      line-height: 1.75;
      margin-bottom: 36px;
      max-width: 480px;
      animation: fadeSlideUp 0.8s 0.2s ease both;
    }

    /* ── Spec Pills ── */
    .hero-specs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 36px;
      animation: fadeSlideUp 0.8s 0.3s ease both;
    }

    .spec-pill {
      background: rgba(15,32,53,0.9);
      border: 1px solid rgba(0,170,255,0.25);
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .spec-pill-icon {
      font-size: 18px;
    }

    .spec-pill-text {
      display: flex;
      flex-direction: column;
    }

    .spec-pill-val {
      font-size: 15px;
      font-weight: 800;
      color: #f0f4f8;
      letter-spacing: -0.3px;
    }

    .spec-pill-label {
      font-size: 11px;
      font-weight: 700;
      color: #3a6080;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    /* ── CTA ── */
    .hero-cta {
      display: flex;
      gap: 14px;
      animation: fadeSlideUp 0.8s 0.4s ease both;
    }

    .btn-primary {
      background: linear-gradient(135deg, #00e5cc, #00aaff);
      color: #050a0f;
      font-size: 15px;
      font-weight: 800;
      padding: 14px 28px;
      border-radius: 14px;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      letter-spacing: 0.2px;
    }

    .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }

    .btn-outline {
      background: transparent;
      color: #00e5cc;
      font-size: 15px;
      font-weight: 800;
      padding: 14px 28px;
      border-radius: 14px;
      border: 1.5px solid rgba(0,229,204,0.4);
      cursor: pointer;
      transition: all 0.2s;
      letter-spacing: 0.2px;
    }

    .btn-outline:hover { border-color: #00e5cc; background: rgba(0,229,204,0.07); }

    /* ── Right: Cap Visual ── */
    .hero-visual {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeSlideUp 0.8s 0.2s ease both;
    }

    .cap-float-wrap {
      position: relative;
      width: 520px;
      height: 520px;
    }

    /* Glow ring behind cap */
    .cap-glow-ring {
      position: absolute;
      inset: 60px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,229,204,0.15) 0%, transparent 70%);
      animation: glowPulse 3s ease-in-out infinite;
    }

    @keyframes glowPulse {
      0%,100% { transform: scale(1);   opacity: 0.6; }
      50%      { transform: scale(1.1); opacity: 1;   }
    }

    /* Orbit rings */
    .orbit-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(0,229,204,0.15);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation: orbitSpin linear infinite;
    }

    .orbit-ring:nth-child(1) { width: 340px; height: 340px; animation-duration: 20s; }
    .orbit-ring:nth-child(2) { width: 420px; height: 420px; animation-duration: 30s; border-color: rgba(0,170,255,0.1); animation-direction: reverse; }
    .orbit-ring:nth-child(3) { width: 500px; height: 500px; animation-duration: 45s; border-color: rgba(0,229,204,0.07); }

    @keyframes orbitSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }

    /* Orbit dots on rings */
    .orbit-dot {
      position: absolute;
      width: 7px; height: 7px;
      background: #00e5cc;
      border-radius: 50%;
      top: -3.5px; left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 10px #00e5cc, 0 0 20px rgba(0,229,204,0.5);
    }

    .orbit-dot-blue {
      background: #00aaff;
      box-shadow: 0 0 10px #00aaff, 0 0 20px rgba(0,170,255,0.5);
    }

    /* Cap image */
    .cap-hero-img {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 380px;
      height: 380px;
      object-fit: contain;
      animation: capFloat 4s ease-in-out infinite;
      filter: drop-shadow(0 20px 60px rgba(0,229,204,0.3));
      z-index: 2;
    }

    @keyframes capFloat {
      0%,100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
      33%      { transform: translate(-50%, -50%) translateY(-16px) rotate(1deg); }
      66%      { transform: translate(-50%, -50%) translateY(-8px) rotate(-0.5deg); }
    }

    /* Floating spec tags around cap */
    .float-tag {
      position: absolute;
      background: rgba(10,20,35,0.92);
      border: 1px solid rgba(0,229,204,0.3);
      border-radius: 12px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 800;
      color: #f0f4f8;
      white-space: nowrap;
      z-index: 3;
      backdrop-filter: blur(10px);
      animation: floatTagBob ease-in-out infinite;
    }

    .float-tag::before {
      content: '';
      display: inline-block;
      width: 7px; height: 7px;
      border-radius: 50%;
      margin-right: 7px;
      vertical-align: middle;
    }

    .float-tag.t1  { top: 8%;  left: -2%;  animation-duration: 3.5s; animation-delay: 0s; }
    .float-tag.t1::before  { background: #00e5cc; box-shadow: 0 0 8px #00e5cc; }

    .float-tag.t2  { top: 22%; right: -4%; animation-duration: 4.2s; animation-delay: 0.5s; }
    .float-tag.t2::before  { background: #ff3d6e; box-shadow: 0 0 8px #ff3d6e; }

    .float-tag.t3  { bottom: 28%; left: -6%; animation-duration: 3.8s; animation-delay: 1s; }
    .float-tag.t3::before  { background: #00aaff; box-shadow: 0 0 8px #00aaff; }

    .float-tag.t4  { bottom: 12%; right: 0%; animation-duration: 4.5s; animation-delay: 1.5s; }
    .float-tag.t4::before  { background: #bf5fff; box-shadow: 0 0 8px #bf5fff; }

    .float-tag.t5  { top: 55%; left: -8%; animation-duration: 3.2s; animation-delay: 0.8s; }
    .float-tag.t5::before  { background: #39ff14; box-shadow: 0 0 8px #39ff14; }

    @keyframes floatTagBob {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-8px); }
    }

    /* ── Features row ── */
    .hero-features {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 16px;
      margin-top: 60px;
      padding: 0 60px 60px;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      animation: fadeSlideUp 0.8s 0.5s ease both;
    }

    .feature-card {
      background: rgba(10,21,32,0.8);
      border: 1px solid rgba(26,58,92,0.8);
      border-radius: 20px;
      padding: 24px;
      transition: all 0.3s;
    }

    .feature-card:hover {
      border-color: rgba(0,229,204,0.4);
      transform: translateY(-4px);
      background: rgba(15,32,53,0.9);
    }

    .feature-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
      margin-bottom: 14px;
    }

    .feature-title {
      font-size: 17px;
      font-weight: 800;
      color: #f0f4f8;
      margin-bottom: 6px;
      letter-spacing: -0.3px;
    }

    .feature-desc {
      font-size: 13px;
      font-weight: 600;
      color: #8ab4cc;
      line-height: 1.6;
    }

    /* ── Animations ── */
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // ── Render HTML ─────────────────────────────
  const root = document.getElementById('hero-root');
  root.innerHTML = `
    <div class="hero-inner">

      <!-- LEFT: TEXT -->
      <div class="hero-text">
        <div class="hero-tag">
          <div class="hero-dot"></div>
          World's First 7-Sensor Scalp Wearable
        </div>

        <h1 class="hero-title">
          Know Your<br/>
          Scalp.<br/>
          <span class="hl">Before It's</span><br/>
          <span class="hl">Too Late.</span>
        </h1>

        <p class="hero-desc">
          ScalpSense is a smart cap that continuously monitors 7 biological 
          markers of your scalp health — in real time — and delivers 
          a personalised Hair Health Score directly to your phone.
        </p>

        <div class="hero-specs">
          <div class="spec-pill">
            <span class="spec-pill-icon">📡</span>
            <div class="spec-pill-text">
              <span class="spec-pill-val">7 Sensors</span>
              <span class="spec-pill-label">Simultaneous</span>
            </div>
          </div>
          <div class="spec-pill">
            <span class="spec-pill-icon">⚡</span>
            <div class="spec-pill-text">
              <span class="spec-pill-val">Real-Time</span>
              <span class="spec-pill-label">BLE 5.0 Sync</span>
            </div>
          </div>
          <div class="spec-pill">
            <span class="spec-pill-icon">🧠</span>
            <div class="spec-pill-text">
              <span class="spec-pill-val">91% AI</span>
              <span class="spec-pill-label">Accuracy</span>
            </div>
          </div>
          <div class="spec-pill">
            <span class="spec-pill-icon">🔋</span>
            <div class="spec-pill-text">
              <span class="spec-pill-val">8 hrs</span>
              <span class="spec-pill-label">Battery Life</span>
            </div>
          </div>
          <div class="spec-pill">
            <span class="spec-pill-icon">⚖️</span>
            <div class="spec-pill-text">
              <span class="spec-pill-val">~84g</span>
              <span class="spec-pill-label">Total Weight</span>
            </div>
          </div>
          <div class="spec-pill">
            <span class="spec-pill-icon">💧</span>
            <div class="spec-pill-text">
              <span class="spec-pill-val">IPX4</span>
              <span class="spec-pill-label">Sweat Proof</span>
            </div>
          </div>
        </div>

        <div class="hero-cta">
          <button class="btn-primary" onclick="document.getElementById('section-sensors').scrollIntoView({behavior:'smooth'})">
            Explore Sensors ↓
          </button>
          <button class="btn-outline" onclick="document.getElementById('section-flow').scrollIntoView({behavior:'smooth'})">
            See How It Works
          </button>
        </div>
      </div>

      <!-- RIGHT: CAP VISUAL -->
      <div class="hero-visual">
        <div class="cap-float-wrap">
          <div class="cap-glow-ring"></div>
          <div class="orbit-ring"><div class="orbit-dot"></div></div>
          <div class="orbit-ring"><div class="orbit-dot orbit-dot-blue"></div></div>
          <div class="orbit-ring"><div class="orbit-dot"></div></div>
          <img src="images/cap-hero.png" alt="ScalpSense Smart Cap" class="cap-hero-img"/>
          <!-- Floating spec tags -->
          <div class="float-tag t1">ESP32-S3 MCU</div>
          <div class="float-tag t2">PPG 50Hz Sampling</div>
          <div class="float-tag t3">BLE 5.0 · Wi-Fi</div>
          <div class="float-tag t4">4-Zone Coverage</div>
          <div class="float-tag t5">NIR 940nm</div>
        </div>
      </div>
    </div>

    <!-- FEATURES ROW -->
    <div class="hero-features">
      <div class="feature-card">
        <div class="feature-icon" style="background:rgba(0,229,204,0.12);">🎯</div>
        <div class="feature-title">Continuous Monitoring</div>
        <div class="feature-desc">Sensors read your scalp up to 100 times per second. Never miss an early warning sign.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon" style="background:rgba(0,170,255,0.12);">👨‍⚕️</div>
        <div class="feature-title">Doctor Connected</div>
        <div class="feature-desc">Reports sent instantly to your dermatologist. Recommendations arrive on your phone in real time.</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon" style="background:rgba(191,95,255,0.12);">🧬</div>
        <div class="feature-title">AI Hair Health Score</div>
        <div class="feature-desc">Trained on 50,000+ scalp profiles. Predicts issues before visible symptoms appear.</div>
      </div>
    </div>
  `;

})();
