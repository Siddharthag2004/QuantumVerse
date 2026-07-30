// ─── Module 5: Quantum Error Correction ──────────────────────────────────
const ErrorCorrectionModule = {
  qecState: null,

  render(container) {
    const T = (k) => App.t(k);
    container.innerHTML = `
      <div class="module-header">
        <div class="module-breadcrumb"><span class="breadcrumb-link" onclick="App.navigate('home')">${T('nav_home')}</span> → <span>${T('nav_error')}</span></div>
        <h1>${T('e_header')}</h1>
        <p>${T('e_sub')}</p>
      </div>

      <div class="lesson-tabs">
        <button class="lesson-tab active" onclick="ErrorCorrectionModule.showLesson(0,this)">${T('e_tab1')}</button>
        <button class="lesson-tab" onclick="ErrorCorrectionModule.showLesson(1,this)">${T('e_tab2')}</button>
      </div>

      <!-- Lesson 1: Why QEC is Hard -->
      <div class="lesson-content active" id="lesson-e-0">
        <h2 class="lesson-h2">${T('e_l1_h')}</h2>
        <p class="lesson-text">${T('e_l1_p1')}</p>

        <div class="info-grid">
          <div class="info-card">
            <h3>${T('e_types_h')}</h3>
            <div class="timeline" style="margin-top:0.5rem;">
              <div class="tl-item">
                <div class="tl-title" style="font-size:0.85rem;">${T('e_x_t')}</div>
                <div class="tl-desc">${T('e_x_d')}</div>
              </div>
              <div class="tl-item">
                <div class="tl-title" style="font-size:0.85rem;">${T('e_z_t')}</div>
                <div class="tl-desc">${T('e_z_d')}</div>
              </div>
              <div class="tl-item">
                <div class="tl-title" style="font-size:0.85rem;">${T('e_y_t')}</div>
                <div class="tl-desc">${T('e_y_d')}</div>
              </div>
              <div class="tl-item">
                <div class="tl-title" style="font-size:0.85rem;">${T('e_deco_t')}</div>
                <div class="tl-desc">${T('e_deco_d')}</div>
              </div>
            </div>
          </div>
          <div class="info-card highlight">
            <h3>${T('e_chal_h')}</h3>
            <p style="margin-bottom:0.75rem;"><strong>${T('e_c1_t')}</strong></p>
            <p style="margin-bottom:0.75rem;"><strong>${T('e_c2_t')}</strong></p>
            <p><strong>${T('e_c3_t')}</strong></p>
          </div>
        </div>

        <h3 class="lesson-h3">${T('e_sol_h')}</h3>
        <p class="lesson-text">${T('e_sol_p')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('e_codes_h')}</h3>
            <table class="gate-ref-table">
              <tr><th>${T('e_th1')}</th><th>${T('e_th2')}</th><th>${T('e_th3')}</th></tr>
              <tr><td>${T('e_c1_n')}</td><td>3</td><td>${T('e_c1_e')}</td></tr>
              <tr><td>${T('e_c2_n')}</td><td>9</td><td>${T('e_c2_e')}</td></tr>
              <tr><td>${T('e_c3_n')}</td><td>7</td><td>${T('e_c3_e')}</td></tr>
              <tr><td>${T('e_c4_n')}</td><td>~1000+</td><td>${T('e_c4_e')}</td></tr>
            </table>
          </div>
          <div class="info-card">
            <h3>${T('e_thresh_h')}</h3>
            <p>${T('e_thresh_p1')}</p>
            <div class="math-block" style="font-size:0.85rem;">p<sub>logical</sub> ∝ (p<sub>physical</sub> / p<sub>threshold</sub>)<sup>(d/2)</sup></div>
            <p>${T('e_thresh_p2')}</p>
          </div>
        </div>
        ${App.renderMarkCompletedButton('error', 0)}
      </div>

      <!-- Lesson 2: Bit-Flip Code Lab -->
      <div class="lesson-content" id="lesson-e-1">
        <h2 class="lesson-h2"> ${T('e_l2_h')}</h2>
        <p class="lesson-text">${T('e_l2_p1')}</p>
        <div class="math-block">|0<sub>L</sub>⟩ = |000⟩  &nbsp;&nbsp;&nbsp;  |1<sub>L</sub>⟩ = |111⟩</div>
        <p class="lesson-text">${T('e_l2_p2')}</p>

        <div class="info-grid">
          <div class="info-card">
            <h3>${T('e_enc_h')}</h3>
            <div class="math-block" style="text-align:left;font-size:0.8rem;line-height:2.2;">
              |ψ⟩─────●─────●─<br>
              |0⟩─CNOT─|───────<br>
              |0⟩─────CNOT──────<br>
            </div>
            <p style="font-size:0.85rem;color:var(--text-secondary);">|0<sub>L</sub>⟩ = |000⟩, |1<sub>L</sub>⟩ = |111⟩</p>
          </div>
          <div class="info-card highlight">
            <h3>${T('e_syn_h')}</h3>
            <p>${T('e_syn_p1')}</p>
            <p style="margin-top:0.5rem;"><strong>${T('e_syn_p2')}</strong></p>
            <p style="margin-top:0.25rem;"><strong>${T('e_syn_p3')}</strong></p>
            <p style="margin-top:0.5rem;">${T('e_syn_p4')}</p>
          </div>
        </div>

        <h3 class="lesson-h3">${T('e_sim_h')}</h3>
        <p class="lesson-text">${T('e_sim_p')}</p>

        <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;margin-bottom:1.5rem;">
          <div>
            <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">${T('e_log_bit')}</label>
            <div style="display:flex;gap:0.5rem;">
              <button class="algo-step-btn active" id="logicalBit0" onclick="ErrorCorrectionModule.setLogical(0,this)">|0_L⟩</button>
              <button class="algo-step-btn" id="logicalBit1" onclick="ErrorCorrectionModule.setLogical(1,this)">|1_L⟩</button>
            </div>
          </div>
          <div>
            <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:0.3rem;">${T('e_inj_err')}</label>
            <div style="display:flex;gap:0.5rem;">
              <button class="algo-step-btn" onclick="ErrorCorrectionModule.injectError(0)" id="errQ0">q₀</button>
              <button class="algo-step-btn" onclick="ErrorCorrectionModule.injectError(1)" id="errQ1">q₁</button>
              <button class="algo-step-btn" onclick="ErrorCorrectionModule.injectError(2)" id="errQ2">q₂</button>
              <button class="algo-step-btn" onclick="ErrorCorrectionModule.injectError(-1)">${T('e_no_err')}</button>
            </div>
          </div>
        </div>

        <div class="qec-visual">
          <div>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.5rem;">${T('e_phys_q')}</div>
            <div class="qec-qubit-display" id="qecQubits">
              <div class="qec-qubit zero" id="qec-q0">q₀<br>|0⟩</div>
              <div class="qec-qubit zero" id="qec-q1">q₁<br>|0⟩</div>
              <div class="qec-qubit zero" id="qec-q2">q₂<br>|0⟩</div>
            </div>
          </div>
          <div style="flex:1;min-width:200px;">
            <div class="state-vector-display" id="qecStatus" style="margin-bottom:1rem;">
              ${T('e_log_state').replace('{0}', 0).replace('{1}', '000')}
            </div>
            <div id="qecSyndrome" style="display:none;margin-bottom:1rem;" class="info-card">
              <h3>${T('e_syn_meas')}</h3>
              <p id="qecSyndromeText"></p>
            </div>
            <div id="qecCorrectionResult" style="display:none;" class="info-card"></div>
          </div>
        </div>

        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.5rem;">
          <button class="run-btn" onclick="ErrorCorrectionModule.detectAndCorrect()" style="padding:0.6rem 1.5rem;"> ${T('e_det_cor')}</button>
          <button class="clear-btn" onclick="ErrorCorrectionModule.resetQEC()">${T('reset')}</button>
        </div>
        ${App.renderMarkCompletedButton('error', 1)}
      </div>

      <!-- Quiz Section -->
      <div id="module-quiz-section-error">
        ${App.renderQuizSection('error')}
      </div>
    `;

    this.logicalBit = 0;
    this.errorQubit = -1;
    if (typeof App !== 'undefined') App.markLessonVisited('error', 0);
  },

  showLesson(idx, btn) {
    document.querySelectorAll('#view-error .lesson-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#view-error .lesson-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`lesson-e-${idx}`).classList.add('active');
    btn.classList.add('active');

    if (typeof App !== 'undefined') App.markLessonVisited('error', idx);
  },

  logicalBit: 0,
  errorQubit: -1,

  setLogical(bit, btn) {
    this.logicalBit = bit;
    document.getElementById('logicalBit0').classList.remove('active');
    document.getElementById('logicalBit1').classList.remove('active');
    btn.classList.add('active');
    this.errorQubit = -1;
    this._updateDisplay();
  },

  injectError(q) {
    this.errorQubit = q;
    this._updateDisplay(true);
  },

  _updateDisplay(showError = false) {
    const lb = this.logicalBit;
    const eq = this.errorQubit;
    const baseVal = lb === 0 ? 0 : 1;
    const T = (k) => App.t(k);

    for (let i = 0; i < 3; i++) {
      const el = document.getElementById(`qec-q${i}`);
      const val = (eq === i) ? (1 - baseVal) : baseVal;
      el.className = 'qec-qubit';

      if (eq === i) {
        el.classList.add('error');
        el.innerHTML = `q${i === 0 ? '₀' : i === 1 ? '₁' : '₂'}<br>|${val}⟩ `;
      } else {
        el.classList.add(val === 0 ? 'zero' : 'one');
        el.innerHTML = `q${i === 0 ? '₀' : i === 1 ? '₁' : '₂'}<br>|${val}⟩`;
      }
    }

    const status = document.getElementById('qecStatus');
    if (eq === -1) {
      status.textContent = T('e_log_state').replace('{0}', lb).replace('{1}', `${baseVal}${baseVal}${baseVal}`);
    } else {
      const vals = [baseVal, baseVal, baseVal];
      vals[eq] = 1 - baseVal;
      status.textContent = T('e_err_on').replace('{0}', eq) + ' ' + T('e_st_is').replace('{0}', vals.join(''));
    }

    document.getElementById('qecSyndrome').style.display = 'none';
    document.getElementById('qecCorrectionResult').style.display = 'none';
  },

  detectAndCorrect() {
    const lb = this.logicalBit;
    const eq = this.errorQubit;
    const baseVal = lb === 0 ? 0 : 1;
    const qubits = [baseVal, baseVal, baseVal];
    if (eq >= 0) qubits[eq] = 1 - baseVal;
    const T = (k) => App.t(k);

    // Syndrome
    const s1 = qubits[0] ^ qubits[1];
    const s2 = qubits[1] ^ qubits[2];

    const syndEl = document.getElementById('qecSyndrome');
    const syndText = document.getElementById('qecSyndromeText');
    syndEl.style.display = 'block';

    let errorLoc = -1;
    let syndrome = `s₁ = q₀⊕q₁ = ${s1}, s₂ = q₁⊕q₂ = ${s2} → `;
    if (s1 === 0 && s2 === 0) syndrome += T('e_s_no_err') + ' ';
    else if (s1 === 1 && s2 === 0) { syndrome += T('e_s_q0') + '!'; errorLoc = 0; }
    else if (s1 === 1 && s2 === 1) { syndrome += T('e_s_q1') + '!'; errorLoc = 1; }
    else if (s1 === 0 && s2 === 1) { syndrome += T('e_s_q2') + '!'; errorLoc = 2; }

    syndText.textContent = syndrome;

    // Correct
    setTimeout(() => {
      if (errorLoc >= 0) {
        qubits[errorLoc] = 1 - qubits[errorLoc];
        const el = document.getElementById(`qec-q${errorLoc}`);
        el.className = 'qec-qubit corrected';
        el.innerHTML = `q${errorLoc === 0 ? '₀' : errorLoc === 1 ? '₁' : '₂'}<br>|${qubits[errorLoc]}⟩ `;
      }

      const result = document.getElementById('qecCorrectionResult');
      result.style.display = 'block';
      result.innerHTML = `
        <h3 class="text-green">${eq === -1 ? ' '+T('e_cor_no') : ' '+T('e_cor_yes')}</h3>
        <p>${eq === -1 ? T('e_cor_p1') :
          T('e_cor_p2').replace('{0}', eq).replace('{1}', eq) + '<br>' +
          T('e_log_state').replace('{0}', lb).replace('{1}', `${baseVal}${baseVal}${baseVal}`) + ' ' + T('e_cor_p3')}</p>
        <p style="margin-top:0.5rem;color:var(--text-muted);font-size:0.85rem;">
          ${T('e_cor_st')}
        </p>
      `;

      document.getElementById('qecStatus').textContent =
        T('e_cor_yes').replace('!', '') + '! ' + T('e_log_state').replace('{0}', lb).replace('{1}', qubits.join('')) + ' ';

      App.addXP(30);
      if (eq >= 0) App.unlockAchievement('error-fixed', 'Bug Squasher', '️');
    }, 800);
  },

  resetQEC() {
    this.logicalBit = 0;
    this.errorQubit = -1;
    this._updateDisplay();
  }
};
window.ErrorCorrectionModule = ErrorCorrectionModule;
window.ErrorModule = ErrorCorrectionModule;

