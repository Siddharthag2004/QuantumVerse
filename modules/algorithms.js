// ─── Module 3: Quantum Algorithms ────────────────────────────────────────
const AlgorithmsModule = {
  groverStep: 0,
  groverN: 8,
  deutschStep: 0,

  render(container) {
    const T = (k) => App.t(k);
    container.innerHTML = `
      <div class="module-header">
        <div class="module-breadcrumb"><span class="breadcrumb-link" onclick="App.navigate('home')">${T('nav_home')}</span> → <span>${T('nav_algorithms')}</span></div>
        <h1>${T('a_header')}</h1>
        <p>${T('a_sub')}</p>
      </div>

      <div class="lesson-tabs">
        <button class="lesson-tab active" onclick="AlgorithmsModule.showLesson(0,this)">${T('a_tab1')}</button>
        <button class="lesson-tab" onclick="AlgorithmsModule.showLesson(1,this)">${T('a_tab2')}</button>
        <button class="lesson-tab" onclick="AlgorithmsModule.showLesson(2,this)">3. QFT & Phase Estimation</button>
        <button class="lesson-tab" onclick="AlgorithmsModule.showLesson(3,this)">${T('a_tab3')}</button>
      </div>

      <!-- Lesson 1: Deutsch-Jozsa -->
      <div class="lesson-content active" id="lesson-a-0">
        <h2 class="lesson-h2">${T('a_l1_h')}</h2>
        <p class="lesson-text">${T('a_l1_p1')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('a_prob_h')}</h3>
            <p>${T('a_prob_p')}</p>
            <p style="margin-top:0.5rem;"><strong>${T('a_const')}:</strong> ${T('a_const_desc')}</p>
            <p style="margin-top:0.5rem;"><strong>${T('a_bal')}:</strong> ${T('a_bal_desc')}</p>
          </div>
          <div class="info-card highlight">
            <h3>${T('a_cvsq')}</h3>
            <p><strong>${T('a_class_worst')}:</strong> ${T('a_class_q')}</p>
            <p style="margin-top:0.5rem;"><strong>${T('a_quant')}:</strong> <span class="text-cyan">${T('a_quant_q')}</span></p>
            <p style="margin-top:0.5rem;">${T('a_n100')}</p>
          </div>
        </div>

        <h3 class="lesson-h3">${T('a_dj_sim_h')}</h3>
        <div id="deutschSim">
          <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem;">
            <button class="algo-step-btn active" onclick="AlgorithmsModule.setDeutschType('constant0',this)">f(x)=0 (${T('a_const')})</button>
            <button class="algo-step-btn" onclick="AlgorithmsModule.setDeutschType('constant1',this)">f(x)=1 (${T('a_const')})</button>
            <button class="algo-step-btn" onclick="AlgorithmsModule.setDeutschType('balanced',this)">${T('a_bal')} f(x)</button>
          </div>
          
          <div class="algo-step-display" id="deutschDisplay">
            <div id="deutschCircuit">
              <p class="lesson-text" style="margin-bottom:1rem;">${T('a_dj_sel')}</p>
              <div class="math-block" style="text-align:left;font-size:0.82rem;line-height:2.2;">
                |x⟩: ─[H⊗n]─────[Uf]─────[H⊗n]─────[M]─<br>
                |y⟩: ──────[X]──[H]──[Uf]──────────────────<br>
              </div>
              <p class="lesson-text" style="margin-top:1rem;">${T('a_dj_res1')} → <strong class="text-cyan">${T('a_const')}</strong><br>
              ${T('a_dj_res2')} → <strong class="text-purple">${T('a_bal')}</strong></p>
            </div>
          </div>

          <div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap;">
            <button class="run-btn" onclick="AlgorithmsModule.runDeutsch()" style="padding:0.6rem 1.5rem;">${T('run_algo')}</button>
            <button class="clear-btn" onclick="AlgorithmsModule.resetDeutsch()">${T('reset')}</button>
          </div>
          <div id="deutschResult" style="margin-top:1rem;display:none;" class="info-card"></div>
        </div>
        ${App.renderMarkCompletedButton('algorithms', 0)}
      </div>

      <!-- Lesson 2: Grover's Search -->
      <div class="lesson-content" id="lesson-a-1">
        <h2 class="lesson-h2">${T('a_l2_h')}</h2>
        <p class="lesson-text">${T('a_l2_p1')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('a_prob_h')}</h3>
            <p>${T('a_grover_prob')}</p>
          </div>
          <div class="info-card highlight">
            <h3>${T('a_grover_opt')}</h3>
            <div class="math-block">t ≈ (π/4)√N</div>
            <p>${T('a_grover_opt_desc')}</p>
          </div>
        </div>

        <h3 class="lesson-h3">${T('a_grover_sim_h')}</h3>
        <p class="lesson-text">${T('a_grover_sim_p')}</p>
        
        <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;margin-bottom:1.5rem;">
          <div>
            <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">N (${T('a_db_size')})</label>
            <select id="groverN" onchange="AlgorithmsModule.groverReset()" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-primary);padding:0.4rem 0.6rem;border-radius:8px;">
              <option value="4">N=4 (2 ${T('a_qubits')})</option>
              <option value="8" selected>N=8 (3 ${T('a_qubits')})</option>
              <option value="16">N=16 (4 ${T('a_qubits')})</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">${T('a_target')}</label>
            <select id="groverTarget" onchange="AlgorithmsModule.groverReset()" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-primary);padding:0.4rem 0.6rem;border-radius:8px;">
              <option>0</option><option>1</option><option>2</option><option selected>3</option>
              <option>4</option><option>5</option><option>6</option><option>7</option>
            </select>
          </div>
          <div style="margin-top:1.2rem;display:flex;gap:0.5rem;">
            <button class="run-btn" onclick="AlgorithmsModule.groverStep(1)" style="padding:0.6rem 1rem;">${T('step')}</button>
            <button class="run-btn" onclick="AlgorithmsModule.groverAutoRun()" style="padding:0.6rem 1rem;">${T('auto_run')}</button>
            <button class="clear-btn" onclick="AlgorithmsModule.groverReset()">${T('reset')}</button>
          </div>
        </div>

        <div class="algo-step-display">
          <div id="groverStepInfo">
            <div class="step-title">${T('a_gr_st0')}</div>
            <div class="step-desc">${T('a_gr_st0_desc')}</div>
          </div>
          <div id="groverVis" class="amplitude-vis" style="margin-top:1.5rem;"></div>
          <div style="margin-top:1rem;font-size:0.85rem;color:var(--text-muted);" id="groverStats"></div>
        </div>
        
        <div id="groverResult" style="margin-top:1rem;display:none;" class="info-card"></div>
        ${App.renderMarkCompletedButton('algorithms', 1)}
      </div>

      <!-- Lesson 3: QFT & Phase Estimation -->
      <div class="lesson-content" id="lesson-a-2">
        <h2 class="lesson-h2">The Quantum Fourier Transform (QFT)</h2>
        <p class="lesson-text">The QFT shifts information from <strong>computational states</strong> to <strong>relative wave phases</strong>. It acts like a lens to reveal hidden frequencies and repeating patterns.</p>

        <div class="info-grid">
          <div class="info-card">
            <h3> Phase Encoding</h3>
            <p>Instead of scaling values, QFT encodes inputs as <strong>rotational phases</strong> of the superposition state.</p>
            <div class="math-block" style="margin-top:0.75rem;">QFT|x⟩ = (1/√N) ∑ e^(2πixy/N)|y⟩</div>
          </div>
          <div class="info-card highlight">
            <h3> Exponential Speedup</h3>
            <p>Classical FFT takes O(N log N) steps. The QFT takes just O(n²) steps on n qubits! This turns impossibly slow calculations into instant ones.</p>
          </div>
        </div>

        <h3 class="lesson-h3">Where is it used?</h3>
        <p class="lesson-text">QFT is the main engine behind the most famous quantum algorithms:</p>
        
        <div class="info-card" style="margin-top:1rem;">
          <h4 style="color:var(--accent-cyan);margin-bottom:0.3rem;font-size:0.95rem;">1. Phase Estimation (QPE)</h4>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">Extracts eigenvalues of quantum systems, crucial for quantum chemistry and physics simulations.</p>
          
          <h4 style="color:var(--accent-purple);margin-bottom:0.3rem;font-size:0.95rem;">2. Shor's Factoring Algorithm</h4>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">Uses QPE to find periods of numbers, factoring large codes instantly and posing a threat to RSA encryption.</p>

          <h4 style="color:var(--accent-pink);margin-bottom:0.3rem;font-size:0.95rem;">3. Hidden Subgroups</h4>
          <p style="font-size:0.85rem;color:var(--text-secondary);">Finds hidden repeating algebraic structures in math groups.</p>
        </div>
        ${App.renderMarkCompletedButton('algorithms', 2)}
      </div>

      <!-- Lesson 4: Quantum Speedups -->
      <div class="lesson-content" id="lesson-a-3">
        <h2 class="lesson-h2">${T('a_l3_h')}</h2>
        <p class="lesson-text">${T('a_l3_p1')}</p>
        <table class="gate-ref-table">
          <thead>
            <tr><th>${T('a_th1')}</th><th>${T('a_th2')}</th><th>${T('a_th3')}</th><th>${T('a_th4')}</th><th>${T('a_th5')}</th></tr>
          </thead>
          <tbody>
            <tr><td>Shor's</td><td>${T('a_ref_s_prob')}</td><td>O(e^(n^⅓))</td><td>O(n³)</td><td>${T('a_exp')}</td></tr>
            <tr><td>Grover's</td><td>${T('a_ref_g_prob')}</td><td>O(N)</td><td>O(√N)</td><td>${T('a_quad')}</td></tr>
            <tr><td>Deutsch-Jozsa</td><td>${T('a_ref_d_prob')}</td><td>O(2^(n-1))</td><td>O(1)</td><td>${T('a_exp')}</td></tr>
            <tr><td>HHL</td><td>${T('a_ref_h_prob')}</td><td>O(N³)</td><td>O(log N)</td><td>${T('a_exp')}*</td></tr>
            <tr><td>QFT</td><td>${T('a_ref_q_prob')}</td><td>O(N log N)</td><td>O(log²N)</td><td>${T('a_exp')}</td></tr>
            <tr><td>VQE</td><td>${T('a_ref_v_prob')}</td><td>O(e^N)</td><td>O(poly)</td><td>${T('a_exp')}*</td></tr>
          </tbody>
        </table>
        <p class="lesson-text" style="margin-top:1rem;">*${T('a_caveats')}</p>
        
        <div class="info-card" style="margin-top:1.5rem;">
          <h3>${T('a_nisq_h')}</h3>
          <p>${T('a_nisq_p')}</p>
          <div class="timeline" style="margin-top:1rem;">
            <div class="tl-item"><div class="tl-title" style="font-size:0.85rem;">${T('a_tl1_t')}</div><div class="tl-desc">${T('a_tl1_d')}</div></div>
            <div class="tl-item"><div class="tl-title" style="font-size:0.85rem;">${T('a_tl2_t')}</div><div class="tl-desc">${T('a_tl2_d')}</div></div>
            <div class="tl-item"><div class="tl-title" style="font-size:0.85rem;">${T('a_tl3_t')}</div><div class="tl-desc">${T('a_tl3_d')}</div></div>
          </div>
        </div>
        ${App.renderMarkCompletedButton('algorithms', 3)}
      </div>

      <!-- Quiz Section -->
      <div id="module-quiz-section-algorithms">
        ${App.renderQuizSection('algorithms')}
      </div>
    `;

    this.groverState = null;
    this.deutschType = 'constant0';
    setTimeout(() => {
      this._initGrover();
      if (typeof App !== 'undefined') App.markLessonVisited('algorithms', 0);
    }, 200);
  },

  showLesson(idx, btn) {
    document.querySelectorAll('#view-algorithms .lesson-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#view-algorithms .lesson-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`lesson-a-${idx}`).classList.add('active');
    btn.classList.add('active');

    if (typeof App !== 'undefined') App.markLessonVisited('algorithms', idx);

    if (idx === 1) setTimeout(() => this._initGrover(), 100);
  },

  // ── Deutsch-Jozsa ──
  deutschType: 'constant0',
  setDeutschType(type, btn) {
    this.deutschType = type;
    document.querySelectorAll('#deutschSim .algo-step-btn').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('deutschResult').style.display = 'none';
  },

  runDeutsch() {
    const isConstant = this.deutschType.startsWith('constant');
    const display = document.getElementById('deutschDisplay');
    const result = document.getElementById('deutschResult');
    const T = (k) => App.t(k);

    const steps = [
      { title: T('a_dj_s1_t'), desc: T('a_dj_s1_d'), state: T('a_dj_s1_s') },
      { title: T('a_dj_s2_t'), desc: T('a_dj_s2_d'), state: T('a_dj_s2_s') },
      { title: T('a_dj_s3_t'), desc: T('a_dj_s3_d').replace('{0}', this.deutschType), state: T('a_dj_s3_s') },
      { title: T('a_dj_s4_t'), desc: T('a_dj_s4_d'), state: T('a_dj_s4_s') },
      { title: T('a_dj_s5_t'), desc: T('a_dj_s5_d'), state: T('a_dj_s5_s') }
    ];

    let stepIdx = 0;
    const runStep = () => {
      if (stepIdx >= steps.length) {
        result.style.display = 'block';
        result.innerHTML = `
          <h3 style="color:${isConstant ? 'var(--accent-cyan)' : 'var(--accent-purple)'}">
            ${isConstant ? T('a_dj_r_c') : T('a_dj_r_b')}
          </h3>
          <p>${T('a_dj_r_p1')} <strong>${isConstant ? T('a_const') : T('a_bal')}</strong> ${T('a_dj_r_p2')}</p>
          <p style="margin-top:0.5rem;color:var(--text-muted);font-size:0.85rem;">
            ${T('a_dj_r_p3')}
          </p>
        `;
        App.addXP(30);
        return;
      }
      const s = steps[stepIdx];
      display.innerHTML = `
        <div class="step-title">${s.title}</div>
        <div class="step-desc" style="margin-top:0.5rem;">${s.desc}</div>
        <div class="state-vector-display" style="margin-top:1rem;">${s.state}</div>
        <div style="margin-top:1rem;font-size:0.8rem;color:var(--text-muted);">${stepIdx+1}/${steps.length}</div>
      `;
      stepIdx++;
      setTimeout(runStep, 1200);
    };
    runStep();
  },

  resetDeutsch() {
    document.getElementById('deutschResult').style.display = 'none';
    document.getElementById('deutschDisplay').innerHTML = `<p class="lesson-text">${App.t('a_dj_sel')}</p>`;
  },

  // ── Grover's ──
  _groverState: null,
  _groverIteration: 0,

  _initGrover() {
    const N = parseInt(document.getElementById('groverN')?.value || 8);
    this._groverN = N;
    this._groverIteration = 0;
    this._groverAmps = Array(N).fill(1 / Math.sqrt(N));
    this._renderGroverVis();
    const info = document.getElementById('groverStepInfo');
    if (info) {
      info.innerHTML = `
        <div class="step-title">${App.t('a_gr_st0')}</div>
        <div class="step-desc">${App.t('a_gr_st0_desc')}</div>
      `;
    }
    const stats = document.getElementById('groverStats');
    if (stats) stats.textContent = `${App.t('a_gr_iters')}: 0 | ${App.t('a_gr_opt')}: ~${Math.round(Math.PI/4 * Math.sqrt(N))}`;
    document.getElementById('groverResult').style.display = 'none';
  },

  groverStep(steps = 1) {
    const N = this._groverN || 8;
    const target = parseInt(document.getElementById('groverTarget')?.value || 3);
    const optIter = Math.round(Math.PI / 4 * Math.sqrt(N));

    for (let s = 0; s < steps; s++) {
      if (this._groverIteration >= optIter + 2) return;
      this._groverAmps[target] *= -1;
      const mean = this._groverAmps.reduce((a, b) => a + b, 0) / N;
      this._groverAmps = this._groverAmps.map(a => 2 * mean - a);
      this._groverIteration++;
    }

    this._renderGroverVis();
    const targetProb = this._groverAmps[target] ** 2;
    const info = document.getElementById('groverStepInfo');
    if (info) {
      info.innerHTML = `
        <div class="step-title">${App.t('a_gr_iter')} ${this._groverIteration}</div>
        <div class="step-desc">${App.t('a_gr_targ')} ${target}: amp = ${this._groverAmps[target].toFixed(3)}, 
        <strong style="color:var(--accent-green)">P = ${(targetProb * 100).toFixed(1)}%</strong></div>
      `;
    }
    const stats = document.getElementById('groverStats');
    if (stats) stats.textContent = `${App.t('a_gr_iter')}: ${this._groverIteration}/${Math.round(Math.PI/4*Math.sqrt(N))} ${App.t('a_gr_opt').toLowerCase()} | ${App.t('a_target')} P=${(targetProb*100).toFixed(1)}%`;

    if (targetProb > 0.85) {
      const result = document.getElementById('groverResult');
      result.style.display = 'block';
      result.innerHTML = `
        <h3 class="text-green"> ${App.t('a_gr_found')}</h3>
        <p>${App.t('a_gr_item')} <strong>${target}</strong> ${App.t('a_gr_f_prob')} <strong>${(targetProb*100).toFixed(1)}%</strong> ${App.t('a_gr_after')} <strong>${this._groverIteration} ${App.t('a_gr_iters').toLowerCase()}</strong>.</p>
        <p style="margin-top:0.5rem;color:var(--text-muted);font-size:0.85rem;">
          ${App.t('a_gr_class')} ${N}. ${App.t('a_gr_quant')} ≈√${N} ≈ ${Math.round(Math.sqrt(N))}.
          ${App.t('a_gr_speedup')}: ${(N / this._groverIteration).toFixed(1)}×
        </p>
      `;
      App.addXP(40);
    }
  },

  groverAutoRun() {
    this.groverReset();
    const N = this._groverN || 8;
    const optIter = Math.round(Math.PI / 4 * Math.sqrt(N));
    let i = 0;
    const run = () => {
      if (i++ >= optIter) return;
      this.groverStep(1);
      setTimeout(run, 600);
    };
    setTimeout(run, 300);
  },

  groverReset() {
    this._initGrover();
  },

  _renderGroverVis() {
    const vis = document.getElementById('groverVis');
    if (!vis || !this._groverAmps) return;
    const target = parseInt(document.getElementById('groverTarget')?.value || 3);
    const maxAmp = Math.max(...this._groverAmps.map(Math.abs));

    vis.innerHTML = this._groverAmps.map((amp, i) => {
      const prob = amp * amp;
      const heightPct = maxAmp > 0 ? (Math.abs(amp) / maxAmp) * 100 : 0;
      const isTarget = i === target;
      return `
        <div class="amp-bar-wrap">
          <div class="amp-bar" style="height:${heightPct}%;background:${isTarget ? 'var(--accent-green)' : 'linear-gradient(180deg,var(--accent-cyan),var(--accent-purple))'};"
            title="Item ${i}: amp=${amp.toFixed(3)}, P=${(prob*100).toFixed(1)}%"></div>
          <div class="amp-label" style="color:${isTarget ? 'var(--accent-green)' : 'var(--text-muted)'};">
            ${isTarget ? '' : i}
          </div>
        </div>
      `;
    }).join('');
  }
};
window.AlgorithmsModule = AlgorithmsModule;
