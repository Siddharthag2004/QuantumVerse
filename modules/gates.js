// ─── Module 2: Quantum Gates & Circuits ──────────────────────────────────
const GatesModule = {
  currentLesson: 0,

  render(container) {
    const T = (k) => App.t(k);
    container.innerHTML = `
      <div class="module-header">
        <div class="module-breadcrumb"><span class="breadcrumb-link" onclick="App.navigate('home')">${T('nav_home')}</span> → <span>${T('nav_gates')}</span></div>
        <h1>${T('g_header')}</h1>
        <p>${T('g_sub')}</p>
      </div>

      <div class="lesson-tabs">
        <button class="lesson-tab active" onclick="GatesModule.showLesson(0,this)">${T('g_tab1')}</button>
        <button class="lesson-tab" onclick="GatesModule.showLesson(1,this)">${T('g_tab2')}</button>
        <button class="lesson-tab" onclick="GatesModule.showLesson(2,this)">${T('g_tab3')}</button>
        <button class="lesson-tab" onclick="GatesModule.showLesson(3,this)">${T('g_tab4')}</button>
      </div>

      <!-- Lesson 1: Single Qubit Gates -->
      <div class="lesson-content active" id="lesson-g-0">
        <h2 class="lesson-h2">${T('g_l1_h')}</h2>
        <p class="lesson-text">${T('g_l1_p1')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('g_pauli_h')}</h3>
            <p>${T('g_pauli_p')}</p>
            <div class="math-block" style="text-align:left;font-size:0.78rem;line-height:2;">
              X = [[0,1],[1,0]]  — 180° rot. around X-axis<br>
              Y = [[0,-i],[i,0]] — 180° rot. around Y-axis<br>
              Z = [[1,0],[0,-1]] — 180° rot. around Z-axis
            </div>
          </div>
          <div class="info-card highlight">
            <h3>${T('g_hadamard_h')}</h3>
            <p>${T('g_hadamard_p')}</p>
            <div class="math-block" style="font-size:0.85rem;">
              H = (1/√2)[[1,1],[1,-1]]<br><br>
              H|0⟩ = |+⟩ = (|0⟩+|1⟩)/√2<br>
              H|1⟩ = |−⟩ = (|0⟩−|1⟩)/√2
            </div>
          </div>
        </div>
        <h3 class="lesson-h3">${T('g_phase_h')}</h3>
        <p class="lesson-text">${T('g_phase_p')}</p>
        <div class="math-block">
          S = [[1,0],[0,i]] — adds π/2 phase  &nbsp;&nbsp;&nbsp;&nbsp;
          T = [[1,0],[0,e^(iπ/4)]] — adds π/4 phase
        </div>
        <h3 class="lesson-h3">${T('g_sim_h')}</h3>
        <p class="lesson-text">${T('g_sim_p')}</p>
        <div id="singleGateSim">
          <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
            <button class="algo-step-btn" onclick="GatesModule.setSimState('|0⟩')">Start: |0⟩</button>
            <button class="algo-step-btn" onclick="GatesModule.setSimState('|1⟩')">Start: |1⟩</button>
            <button class="algo-step-btn" onclick="GatesModule.setSimState('|+⟩')">Start: |+⟩</button>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
            ${['X','Y','Z','H','S','T'].map(g => `
              <button class="gate-btn" onclick="GatesModule.applySimGate('${g}')" 
                style="width:auto;padding:0 1rem;height:44px;" id="simGate${g}">${g}</button>
            `).join('')}
          </div>
          <div class="state-vector-display" id="simStateDisplay">
            ${T('g_sim_state')}: |0⟩ (α=1.000, β=0.000)
          </div>
          <div style="margin-top:0.5rem;font-size:0.8rem;color:var(--text-muted);" id="simHistory">
            ${T('g_sim_hist')}: (${T('g_sim_none')})
          </div>
          <div style="margin-top:1rem;">
            <canvas id="simBloch" width="200" height="200"></canvas>
          </div>
        </div>
        ${App.renderMarkCompletedButton('gates', 0)}
      </div>

      <!-- Lesson 2: Multi Qubit Gates -->
      <div class="lesson-content" id="lesson-g-1">
        <h2 class="lesson-h2">${T('g_l2_h')}</h2>
        <p class="lesson-text">${T('g_l2_p1')}</p>
        <div class="info-grid">
          <div class="info-card highlight">
            <h3>${T('g_cnot_h')}</h3>
            <p>${T('g_cnot_p')}</p>
            <div class="math-block" style="font-size:0.78rem;text-align:left;line-height:1.8;">
              CNOT = [[1,0,0,0],<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0,1,0,0],<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0,0,0,1],<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0,0,1,0]]
            </div>
          </div>
          <div class="info-card">
            <h3>${T('g_cnot_table')}</h3>
            <table class="gate-ref-table">
              <tr><th>${T('g_in')} q0</th><th>${T('g_in')} q1</th><th>${T('g_out')} q0</th><th>${T('g_out')} q1</th></tr>
              <tr><td>|0⟩</td><td>|0⟩</td><td>|0⟩</td><td>|0⟩</td></tr>
              <tr><td>|0⟩</td><td>|1⟩</td><td>|0⟩</td><td>|1⟩</td></tr>
              <tr><td>|1⟩</td><td>|0⟩</td><td>|1⟩</td><td>|1⟩</td></tr>
              <tr><td>|1⟩</td><td>|1⟩</td><td>|1⟩</td><td>|0⟩</td></tr>
            </table>
          </div>
        </div>
        <h3 class="lesson-h3">${T('g_toffoli_h')}</h3>
        <p class="lesson-text">${T('g_toffoli_p')}</p>
        <div class="math-block">Toffoli: |c₁c₂t⟩ → |c₁c₂(t ⊕ c₁c₂)⟩</div>
        <h3 class="lesson-h3">${T('g_swap_h')}</h3>
        <p class="lesson-text">${T('g_swap_p')}</p>
        ${App.renderMarkCompletedButton('gates', 1)}
      </div>

      <!-- Lesson 3: Gate Reference -->
      <div class="lesson-content" id="lesson-g-2">
        <h2 class="lesson-h2">${T('g_l3_h')}</h2>
        <p class="lesson-text">${T('g_l3_p1')}</p>
        <table class="gate-ref-table">
          <thead>
            <tr><th>${T('g_th1')}</th><th>${T('g_th2')}</th><th>${T('g_th3')}</th><th>${T('g_th4')}</th><th>${T('g_th5')}</th><th>${T('g_th6')}</th></tr>
          </thead>
          <tbody>
            <tr><td>Hadamard</td><td>H</td><td>(1/√2)[[1,1],[1,-1]]</td><td>|+⟩</td><td>|−⟩</td><td>${T('g_ref_h')}</td></tr>
            <tr><td>Pauli-X</td><td>X</td><td>[[0,1],[1,0]]</td><td>|1⟩</td><td>|0⟩</td><td>${T('g_ref_x')}</td></tr>
            <tr><td>Pauli-Y</td><td>Y</td><td>[[0,-i],[i,0]]</td><td>i|1⟩</td><td>-i|0⟩</td><td>${T('g_ref_y')}</td></tr>
            <tr><td>Pauli-Z</td><td>Z</td><td>[[1,0],[0,-1]]</td><td>|0⟩</td><td>-|1⟩</td><td>${T('g_ref_z')}</td></tr>
            <tr><td>S gate</td><td>S</td><td>[[1,0],[0,i]]</td><td>|0⟩</td><td>i|1⟩</td><td>${T('g_ref_s')}</td></tr>
            <tr><td>T gate</td><td>T</td><td>[[1,0],[0,e^iπ/4]]</td><td>|0⟩</td><td>e^(iπ/4)|1⟩</td><td>${T('g_ref_t')}</td></tr>
            <tr><td>CNOT</td><td>CX</td><td>4×4 matrix</td><td>|00⟩→|00⟩, |10⟩→|11⟩</td><td>—</td><td>${T('g_ref_cnot')}</td></tr>
            <tr><td>Toffoli</td><td>CCX</td><td>8×8 matrix</td><td>${T('g_ref_ccx_eff')}</td><td>—</td><td>${T('g_ref_ccx')}</td></tr>
          </tbody>
        </table>
        <div class="info-card" style="margin-top:1.5rem;">
          <h3>${T('g_univ_h')}</h3>
          <p>${T('g_univ_p1')}</p>
          <p style="margin-top:0.5rem;">${T('g_univ_p2')}</p>
        </div>
        ${App.renderMarkCompletedButton('gates', 2)}
      </div>

      <!-- Lesson 4: Circuit Builder Lab -->
      <div class="lesson-content" id="lesson-g-3">
        <h2 class="lesson-h2">${T('g_lab_h')}</h2>
        <p class="lesson-text">${T('g_lab_desc2')}</p>
        <div id="circuitBuilderContainer"></div>
        
        <div class="info-card" style="margin-top:1.5rem;">
          <h3><span style="display:inline-block; vertical-align:middle; margin-right:8px; color:var(--accent-gold);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg></span> ${T('g_chal_h')}</h3>
          <p style="margin-bottom:0.5rem;"><strong>${T('g_chal1_h')}:</strong> ${T('g_chal1_p')}</p>
          <p style="margin-bottom:0.5rem;"><strong>${T('g_chal2_h')}:</strong> ${T('g_chal2_p')}</p>
          <p><strong>${T('g_chal3_h')}:</strong> ${T('g_chal3_p')}</p>
        </div>
        ${App.renderMarkCompletedButton('gates', 3)}
      </div>

      <!-- Quiz Section -->
      <div id="module-quiz-section-gates">
        ${App.renderQuizSection('gates')}
      </div>
    `;

    // Init Bloch for gate sim
    setTimeout(() => {
      this.simBloch = BlochSphere.create('simBloch');
      this.simState = { alpha: 1, beta: 0, theta: 0, phi: 0 };
      if (typeof App !== 'undefined') App.markLessonVisited('gates', 0);
    }, 100);
  },

  showLesson(idx, btn) {
    document.querySelectorAll('#view-gates .lesson-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#view-gates .lesson-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`lesson-g-${idx}`).classList.add('active');
    btn.classList.add('active');

    if (typeof App !== 'undefined') App.markLessonVisited('gates', idx);

    if (idx === 3) {
      setTimeout(() => CircuitBuilder.create('circuitBuilderContainer'), 100);
    }
    if (idx === 0 && !this.simBloch) {
      setTimeout(() => {
        this.simBloch = BlochSphere.create('simBloch');
        this.simState = { alpha: 1, beta: 0, theta: 0, phi: 0 };
      }, 100);
    }

    // Progress requires actual simulator use and quiz — not just tab navigation
  },

  simState: { alpha: 1, beta: 0, theta: 0, phi: 0 },
  simHistory: [],

  setSimState(state) {
    this.simHistory = [state];
    if (state === '|0⟩') { this.simState = { alpha: 1, beta: 0, theta: 0, phi: 0 }; }
    else if (state === '|1⟩') { this.simState = { alpha: 0, beta: 1, theta: 180, phi: 0 }; }
    else if (state === '|+⟩') { this.simState = { alpha: 0.707, beta: 0.707, theta: 90, phi: 0 }; }
    this._updateSimDisplay();
  },

  applySimGate(gate) {
    const s = this.simState;
    this.simHistory.push(gate);

    if (gate === 'X') { [s.alpha, s.beta] = [s.beta, s.alpha]; s.theta = 180 - s.theta; }
    else if (gate === 'Z') { s.beta = -s.beta; s.phi = (s.phi + 180) % 360; }
    else if (gate === 'H') {
      const a = s.alpha, b = s.beta;
      s.alpha = (a + b) / Math.SQRT2;
      s.beta = (a - b) / Math.SQRT2;
      s.theta = Math.acos(Math.max(-1, Math.min(1, s.alpha))) * 2 * 180 / Math.PI;
    }
    else if (gate === 'S') { s.phi = (s.phi + 90) % 360; }
    else if (gate === 'T') { s.phi = (s.phi + 45) % 360; }
    // Y ≈ iXZ
    else if (gate === 'Y') { [s.alpha, s.beta] = [-s.beta, s.alpha]; s.theta = 180 - s.theta; s.phi = (s.phi + 180) % 360; }

    this._updateSimDisplay();
  },

  _updateSimDisplay() {
    const s = this.simState;
    const p0 = (s.alpha * s.alpha).toFixed(3);
    const p1 = (s.beta * s.beta).toFixed(3);
    const display = document.getElementById('simStateDisplay');
    if (display) {
      display.textContent = `${App.t('g_sim_state')}: ${s.alpha.toFixed(3)}|0⟩ + ${s.beta.toFixed(3)}|1⟩  |  P(0)=${(p0*100).toFixed(1)}%, P(1)=${(p1*100).toFixed(1)}%`;
    }
    const hist = document.getElementById('simHistory');
    if (hist) hist.textContent = `${App.t('g_sim_hist')}: ${this.simHistory.join(' → ')}`;
    if (this.simBloch) this.simBloch.setState(s.theta, s.phi);
  }
};
window.GatesModule = GatesModule;
