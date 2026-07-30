// ─── Module 1: Quantum Foundations ───────────────────────────────────────
const FoundationsModule = {
  currentLesson: 0,
  lessons: ['intro', 'superposition', 'bloch', 'entanglement', 'measurement'],

  render(container) {
    const T = (k) => App.t(k);
    container.innerHTML = `
      <div class="module-header">
        <div class="module-breadcrumb"><span class="breadcrumb-link" onclick="App.navigate('home')">${T('nav_home')}</span> → <span>${T('nav_foundations')}</span></div>
        <h1>${T('f_header')}</h1>
        <p>${T('f_sub')}</p>
      </div>

      <div class="lesson-tabs">
        <button class="lesson-tab active" onclick="FoundationsModule.showLesson(0, this)" data-lesson="0">${T('f_tab1')}</button>
        <button class="lesson-tab" onclick="FoundationsModule.showLesson(1, this)" data-lesson="1">${T('f_tab2')}</button>
        <button class="lesson-tab" onclick="FoundationsModule.showLesson(2, this)" data-lesson="2">${T('f_tab3')}</button>
        <button class="lesson-tab" onclick="FoundationsModule.showLesson(3, this)" data-lesson="3">${T('f_tab4')}</button>
        <button class="lesson-tab" onclick="FoundationsModule.showLesson(4, this)" data-lesson="4">${T('f_tab5')}</button>
      </div>

      <!-- Lesson 1: What is Quantum -->
      <div class="lesson-content active" id="lesson-f-0">
        <h2 class="lesson-h2">${T('f_h1')}</h2>
        <p class="lesson-text">${T('f_p1')}</p>
        <p class="lesson-text">${T('f_p2')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-blue);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span> ${T('f_bit_title')}</h3>
            <p>${T('f_bit_desc')}</p>
            <div class="math-block" style="font-size:2rem;margin-top:1rem;">0 ${T('f_or')} 1</div>
          </div>
          <div class="info-card highlight">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-pink);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="2"/></svg></span> ${T('f_qubit_title')}</h3>
            <p>${T('f_qubit_desc')}</p>
            <div class="math-block" style="margin-top:1rem;">|ψ⟩ = α|0⟩ + β|1⟩<br><small style="color:var(--text-muted)">${T('f_norm')}</small></div>
          </div>
        </div>
        <h3 class="lesson-h3">${T('f_pillars')}</h3>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-title text-cyan">${T('f_pillar1_title')}</div>
            <div class="tl-desc">${T('f_pillar1_desc')}</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">${T('f_pillar2_title')}</div>
            <div class="tl-desc">${T('f_pillar2_desc')}</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">${T('f_pillar3_title')}</div>
            <div class="tl-desc">${T('f_pillar3_desc')}</div>
          </div>
        </div>
        <h3 class="lesson-h3">${T('f_impl_title')}</h3>
        <p class="lesson-text">${T('f_impl_desc')}</p>
        ${App.renderMarkCompletedButton('foundations', 0)}
      </div>

      <!-- Lesson 2: Superposition -->
      <div class="lesson-content" id="lesson-f-1">
        <h2 class="lesson-h2">${T('f_super_h')}</h2>
        <p class="lesson-text">${T('f_super_p1')}</p>
        <div class="math-block">|ψ⟩ = α|0⟩ + β|1⟩</div>
        <p class="lesson-text">${T('f_super_p2')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('f_super_ex_title')}</h3>
            <p>|0⟩ ${T('f_super_state')}: α=1, β=0 → P(0) = 100%</p>
            <p style="margin-top:0.5rem;">|1⟩ ${T('f_super_state')}: α=0, β=1 → P(1) = 100%</p>
            <p style="margin-top:0.5rem;">|+⟩ ${T('f_super_state')}: α=β=1/√2 → P(0) = P(1) = 50%</p>
          </div>
          <div class="info-card highlight">
            <h3>${T('f_super_interactive')}</h3>
            <p>${T('f_super_slider')}</p>
            <div style="margin-top:1rem;">
              <label style="font-size:0.8rem;color:var(--text-muted);">P(|0⟩): <span id="prob0Display">50</span>%</label>
              <input type="range" id="superposSlider" min="0" max="100" value="50"
                style="width:100%;margin:0.5rem 0;accent-color:var(--accent-purple);"
                oninput="FoundationsModule.updateSuperposition(this.value)">
              <label style="font-size:0.8rem;color:var(--text-muted);">P(|1⟩): <span id="prob1Display">50</span>%</label>
            </div>
            <div class="state-vector-display" id="superposState" style="margin-top:0.5rem;font-size:0.85rem;">
              |ψ⟩ = 0.707|0⟩ + 0.707|1⟩
            </div>
          </div>
        </div>
        <h3 class="lesson-h3">${T('f_super_parallel')}</h3>
        <p class="lesson-text">${T('f_super_parallel_desc')}</p>
        ${App.renderMarkCompletedButton('foundations', 1)}
      </div>

      <!-- Lesson 3: Bloch Sphere -->
      <div class="lesson-content" id="lesson-f-2">
        <h2 class="lesson-h2">${T('f_bloch_h')}</h2>
        <p class="lesson-text">${T('f_bloch_p1')}</p>
        <div class="math-block">|ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup>sin(θ/2)|1⟩</div>
        <div class="bloch-widget">
          <h3>${T('f_bloch_interactive')}</h3>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">${T('f_bloch_drag')}</p>
          <div class="bloch-layout">
            <div class="bloch-3d-wrap">
              <canvas id="blochInteractive" width="260" height="260"></canvas>
            </div>
            <div class="bloch-info">
              <div class="bloch-state-display" id="blochStateLabel">|ψ⟩ = |0⟩</div>
              <table class="bloch-stats">
                <tr class="bloch-stat-row"><td class="bloch-stat-label">θ (theta)</td><td class="bloch-stat-val" id="blochTheta">0°</td></tr>
                <tr class="bloch-stat-row"><td class="bloch-stat-label">φ (phi)</td><td class="bloch-stat-val" id="blochPhi">0°</td></tr>
                <tr class="bloch-stat-row"><td class="bloch-stat-label">P(|0⟩)</td><td class="bloch-stat-val" id="blochP0">100%</td></tr>
                <tr class="bloch-stat-row"><td class="bloch-stat-label">P(|1⟩)</td><td class="bloch-stat-val" id="blochP1">0%</td></tr>
                <tr class="bloch-stat-row"><td class="bloch-stat-label">${T('f_bloch_state')}</td><td class="bloch-stat-val" id="blochStateName">|0⟩</td></tr>
              </table>
              <div class="bloch-presets">
                <button class="bloch-preset-btn" onclick="FoundationsModule.setBlochState(0,0)">|0⟩</button>
                <button class="bloch-preset-btn" onclick="FoundationsModule.setBlochState(180,0)">|1⟩</button>
                <button class="bloch-preset-btn" onclick="FoundationsModule.setBlochState(90,0)">|+⟩</button>
                <button class="bloch-preset-btn" onclick="FoundationsModule.setBlochState(90,180)">|−⟩</button>
                <button class="bloch-preset-btn" onclick="FoundationsModule.setBlochState(90,90)">|i⟩</button>
              </div>
            </div>
          </div>
          <div class="bloch-controls" style="margin-top: 1rem;">
            <div class="bloch-slider-wrap">
              <div class="bloch-slider-label"><span>θ (${T('f_bloch_polar')}):</span> <b><span id="thetaVal">0</span>°</b></div>
              <input type="range" class="bloch-slider" id="thetaSlider" min="0" max="180" value="0" oninput="FoundationsModule.updateBloch()">
            </div>
            <div class="bloch-slider-wrap">
              <div class="bloch-slider-label"><span>φ (${T('f_bloch_azimuthal')}):</span> <b><span id="phiVal">0</span>°</b></div>
              <input type="range" class="bloch-slider" id="phiSlider" min="0" max="360" value="0" oninput="FoundationsModule.updateBloch()">
            </div>
          </div>
        </div>
        ${App.renderMarkCompletedButton('foundations', 2)}
      </div>

      <!-- Lesson 4: Entanglement -->
      <div class="lesson-content" id="lesson-f-3">
        <h2 class="lesson-h2">${T('f_ent_h')}</h2>
        <p class="lesson-text">${T('f_ent_p1')}</p>
        <div class="math-block">|Φ⁺⟩ = (|00⟩ + |11⟩) / √2</div>
        <p class="lesson-text">${T('f_ent_p2')}</p>
        <h3 class="lesson-h3">${T('f_ent_create')}</h3>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('f_ent_circuit')}</h3>
            <p>${T('f_ent_circuit_desc')}</p>
            <div class="math-block" style="font-size:0.85rem;text-align:left;line-height:2">
              q0: ─[H]─●─<br>
              q1: ──────⊕─
            </div>
          </div>
          <div class="info-card highlight">
            <h3>${T('f_ent_steps')}</h3>
            <div class="timeline" style="padding-left:1rem;">
              <div class="tl-item"><div class="tl-title" style="font-size:0.85rem;">${T('f_ent_step1')}:</div><div class="tl-desc">|00⟩</div></div>
              <div class="tl-item"><div class="tl-title" style="font-size:0.85rem;">${T('f_ent_step2')}:</div><div class="tl-desc">(|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩+|10⟩)/√2</div></div>
              <div class="tl-item"><div class="tl-title" style="font-size:0.85rem;">${T('f_ent_step3')}:</div><div class="tl-desc">(|00⟩+|11⟩)/√2 = |Φ⁺⟩ </div></div>
            </div>
          </div>
        </div>
        <div id="entanglementSimWrapper" style="margin-top:1.5rem;">
          <h3 class="lesson-h3">${T('f_ent_sim_title')}</h3>
          <p class="lesson-text">${T('f_ent_sim_desc')}</p>
          <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem;">
            <button class="run-btn" onclick="FoundationsModule.createBellState()" style="padding:0.6rem 1.5rem;">${T('f_ent_bell_btn')}</button>
            <button class="run-btn" onclick="FoundationsModule.measureBellState()" style="padding:0.6rem 1.5rem;background:var(--gradient-card);color:var(--accent-cyan);box-shadow:none;border:1px solid var(--border-accent);">${T('f_ent_measure_btn')}</button>
            <button class="clear-btn" onclick="FoundationsModule.resetBell()">${T('reset')}</button>
          </div>
          <div id="bellDisplay" class="state-vector-display">${T('f_ent_status_init')}</div>
          <div id="bellResult" style="display:none;margin-top:1rem;" class="info-card"></div>
        </div>
        ${App.renderMarkCompletedButton('foundations', 3)}
      </div>

      <!-- Lesson 5: Measurement -->
      <div class="lesson-content" id="lesson-f-4">
        <h2 class="lesson-h2">${T('f_meas_h')}</h2>
        <p class="lesson-text">${T('f_meas_p1')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('f_meas_postulate')}</h3>
            <p>${T('f_meas_post_desc')}</p>
            <p style="margin-top:0.5rem;">• P(0) = |α|² — ${T('f_meas_prob0')}</p>
            <p style="margin-top:0.5rem;">• P(1) = |β|² — ${T('f_meas_prob1')}</p>
            <p style="margin-top:0.5rem;">${T('f_meas_collapse')}</p>
          </div>
          <div class="info-card highlight">
            <h3>${T('f_meas_sim_title')}</h3>
            <p>${T('f_meas_sim_desc')}</p>
            <button class="run-btn" onclick="FoundationsModule.simulateMeasurement()" style="margin-top:1rem;padding:0.5rem 1.2rem;font-size:0.9rem;">
               ${T('f_meas_btn')}
            </button>
            <div id="measureResult" style="margin-top:1rem;font-size:1.2rem;font-family:var(--font-mono);text-align:center;min-height:2rem;"></div>
            <div id="measureHistory" style="margin-top:0.5rem;font-size:0.75rem;color:var(--text-muted);"></div>
          </div>
        </div>
        <h3 class="lesson-h3">${T('f_meas_why')}</h3>
        <p class="lesson-text">${T('f_meas_why_desc')}</p>
        <p class="lesson-text">${T('f_meas_algo_desc')}</p>
        ${App.renderMarkCompletedButton('foundations', 4)}
      </div>

      <!-- Quiz Section -->
      <div id="module-quiz-section-foundations">
        ${App.renderQuizSection('foundations')}
      </div>
    `;

    // Initialize Bloch sphere
    setTimeout(() => {
      this.blochInst = BlochSphere.create('blochInteractive');
      if (typeof App !== 'undefined') App.markLessonVisited('foundations', 0);
    }, 100);
  },

  showLesson(idx, btn) {
    document.querySelectorAll('#view-foundations .lesson-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#view-foundations .lesson-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`lesson-f-${idx}`).classList.add('active');
    btn.classList.add('active');
    this.currentLesson = idx;

    if (typeof App !== 'undefined') App.markLessonVisited('foundations', idx);

    if (idx === 2 && !this.blochInst) {
      setTimeout(() => { this.blochInst = BlochSphere.create('blochInteractive'); }, 100);
    }
  },

  updateBloch() {
    const theta = parseInt(document.getElementById('thetaSlider').value);
    const phi = parseInt(document.getElementById('phiSlider').value);
    document.getElementById('thetaVal').textContent = theta;
    document.getElementById('phiVal').textContent = phi;

    const t = (theta * Math.PI) / 180;
    const p0 = Math.cos(t / 2) ** 2;
    const p1 = Math.sin(t / 2) ** 2;

    document.getElementById('blochTheta').textContent = `${theta}°`;
    document.getElementById('blochPhi').textContent = `${phi}°`;
    document.getElementById('blochP0').textContent = `${(p0 * 100).toFixed(1)}%`;
    document.getElementById('blochP1').textContent = `${(p1 * 100).toFixed(1)}%`;

    const stateName = theta === 0 ? '|0⟩' : theta === 180 ? '|1⟩' :
      (theta === 90 && phi === 0) ? '|+⟩' : (theta === 90 && phi === 180) ? '|−⟩' : 'custom';
    document.getElementById('blochStateName').textContent = stateName;

    const alpha = Math.cos(t / 2).toFixed(3);
    const beta = Math.sin(t / 2).toFixed(3);
    document.getElementById('blochStateLabel').textContent = `|ψ⟩ = ${alpha}|0⟩ + e^(i${phi}°)·${beta}|1⟩`;

    if (this.blochInst) this.blochInst.setState(theta, phi);
  },

  setBlochState(theta, phi) {
    document.getElementById('thetaSlider').value = theta;
    document.getElementById('phiSlider').value = phi;
    this.updateBloch();
  },

  updateSuperposition(val) {
    const p0 = parseInt(val);
    const p1 = 100 - p0;
    document.getElementById('prob0Display').textContent = p0;
    document.getElementById('prob1Display').textContent = p1;
    const a = Math.sqrt(p0 / 100).toFixed(3);
    const b = Math.sqrt(p1 / 100).toFixed(3);
    document.getElementById('superposState').textContent = `|ψ⟩ = ${a}|0⟩ + ${b}|1⟩`;
  },

  bellEntangled: false,

  createBellState() {
    this.bellEntangled = true;
    document.getElementById('bellDisplay').textContent =
      '|Φ⁺⟩ = (|00⟩ + |11⟩)/√2 — ' + App.t('f_ent_entangled_msg');
    document.getElementById('bellResult').style.display = 'none';
    App.addXP(10);
  },

  measureBellState() {
    if (!this.bellEntangled) {
      document.getElementById('bellDisplay').textContent = '️ ' + App.t('f_ent_no_bell');
      return;
    }
    const r = Math.random() > 0.5 ? 1 : 0;
    const res = document.getElementById('bellResult');
    res.style.display = 'block';
    res.innerHTML = `
      <h3>${App.t('f_meas_result')}</h3>
      <p>Qubit 0: <strong style="color:var(--accent-cyan);">|${r}⟩</strong></p>
      <p>Qubit 1: <strong style="color:var(--accent-cyan);">|${r}⟩</strong> (${App.t('f_ent_instant')})</p>
      <p style="margin-top:0.5rem;color:var(--text-muted);font-size:0.85rem;">
        ${App.t('f_ent_both_collapsed')} ${r === 0 ? '|00⟩' : '|11⟩'}.
      </p>
    `;
    document.getElementById('bellDisplay').textContent =
      `${App.t('f_ent_collapsed')} |${r}${r}⟩`;
    this.bellEntangled = false;
  },

  resetBell() {
    this.bellEntangled = false;
    document.getElementById('bellDisplay').textContent = App.t('f_ent_status_init');
    document.getElementById('bellResult').style.display = 'none';
  },

  measureHistory: [],
  simulateMeasurement() {
    const result = Math.random() > 0.5 ? 1 : 0;
    const el = document.getElementById('measureResult');
    const spinUpSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-left:4px;"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`;
    const spinDownSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-left:4px;"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
    el.innerHTML = `<span style="color:${result === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}">
      ${App.t('f_meas_collapsed')} |${result}⟩ ${result === 0 ? spinUpSVG : spinDownSVG}
    </span>`;
    el.style.animation = 'none'; el.offsetHeight;
    el.style.animation = 'fadeSlideIn 0.3s ease';

    this.measureHistory.push(result);
    const total = this.measureHistory.length;
    const zeros = this.measureHistory.filter(v => v === 0).length;
    document.getElementById('measureHistory').textContent =
      `${App.t('f_meas_history')}: ${this.measureHistory.slice(-10).join(', ')} | P(0)≈${(zeros/total*100).toFixed(0)}%, P(1)≈${((total-zeros)/total*100).toFixed(0)}% (${total} ${App.t('f_meas_trials')})`;
  }
};
window.FoundationsModule = FoundationsModule;
