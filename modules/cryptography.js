// ─── Module 4: Quantum Cryptography ──────────────────────────────────────
const CryptographyModule = {
  bb84State: null,

  render(container) {
    const T = (k) => App.t(k);
    container.innerHTML = `
      <div class="module-header">
        <div class="module-breadcrumb"><span class="breadcrumb-link" onclick="App.navigate('home')">${T('nav_home')}</span> → <span>${T('nav_cryptography')}</span></div>
        <h1>${T('c_header')}</h1>
        <p>${T('c_sub')}</p>
      </div>

      <div class="lesson-tabs">
        <button class="lesson-tab active" onclick="CryptographyModule.showLesson(0,this)">${T('c_tab1')}</button>
        <button class="lesson-tab" onclick="CryptographyModule.showLesson(1,this)">${T('c_tab2')}</button>
        <button class="lesson-tab" onclick="CryptographyModule.showLesson(2,this)">3. Quantum Teleportation</button>
      </div>

      <!-- Lesson 1: Why Quantum Cryptography -->
      <div class="lesson-content active" id="lesson-c-0">
        <h2 class="lesson-h2">${T('c_l1_h')}</h2>
        <p class="lesson-text">${T('c_l1_p1')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:8px; color:var(--accent-red);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> ${T('c_class_threat_h')}</h3>
            <p><strong>RSA-2048:</strong> ${T('c_rsa')}</p>
            <p style="margin-top:0.5rem;"><strong>${T('c_shor')}:</strong> ${T('c_shor_desc')}</p>
            <p style="margin-top:0.5rem;">${T('c_harvest')}</p>
          </div>
          <div class="info-card highlight">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:8px; color:var(--accent-green);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span> ${T('c_qkd_h')}</h3>
            <p>${T('c_qkd_p1')}</p>
            <p style="margin-top:0.5rem;">${T('c_qkd_p2')}</p>
            <p style="margin-top:0.5rem;">${T('c_qkd_p3')}</p>
          </div>
        </div>
        <h3 class="lesson-h3">${T('c_princi_h')}</h3>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-title text-cyan">${T('c_tl1_t')}</div>
            <div class="tl-desc">${T('c_tl1_d')}</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">${T('c_tl2_t')}</div>
            <div class="tl-desc">${T('c_tl2_d')}</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">${T('c_tl3_t')}</div>
            <div class="tl-desc">${T('c_tl3_d')}</div>
          </div>
        </div>
        <div class="info-card" style="margin-top:1.5rem;">
          <h3>${T('c_pqc_h')}</h3>
          <p>${T('c_pqc_p')}</p>
        </div>
        ${App.renderMarkCompletedButton('cryptography', 0)}
      </div>

      <!-- Lesson 2: BB84 Simulator -->
      <div class="lesson-content" id="lesson-c-1">
        <h2 class="lesson-h2">${T('c_l2_h')}</h2>
        <p class="lesson-text">${T('c_l2_p')}</p>
        <div class="info-grid">
          <div class="info-card">
            <h3>${T('c_bases_h')}</h3>
            <p><strong>${T('c_rect')}:</strong><br>|0⟩ → 0, |1⟩ → 1</p>
            <p style="margin-top:0.5rem;"><strong>${T('c_diag')}:</strong><br>|+⟩ → 0, |−⟩ → 1</p>
          </div>
          <div class="info-card highlight">
            <h3>${T('c_sim_set')}</h3>
            <div style="margin-top:0.5rem;">
              <label style="font-size:0.8rem;color:var(--text-muted);display:block;margin-bottom:0.25rem;">${T('c_key_len')}</label>
              <input type="range" id="keyLengthSlider" min="8" max="20" value="12"
                style="width:100%;accent-color:var(--accent-purple);"
                oninput="document.getElementById('keyLengthVal').textContent=this.value">
              <span style="font-size:0.85rem;">${T('c_len')}: <strong id="keyLengthVal">12</strong></span>
            </div>
            <div style="margin-top:0.75rem;display:flex;align-items:center;gap:0.5rem;">
              <input type="checkbox" id="eveCheckbox" style="accent-color:var(--accent-pink);">
              <label for="eveCheckbox" style="font-size:0.85rem;">${T('c_eve')} ️</label>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin:1.5rem 0;">
          <button class="run-btn" onclick="CryptographyModule.runBB84()" id="runBB84Btn">
            ▶ ${T('c_run_bb84')}
          </button>
          <button class="clear-btn" onclick="CryptographyModule.resetBB84()">${T('reset')}</button>
        </div>

        <div id="bb84Steps" style="display:none;">
          <div class="algo-stepper">
            <div class="algo-step-controls">
              <button class="algo-step-btn active" id="bb84-step-0" onclick="CryptographyModule.showBB84Step(0,this)">${T('c_st1')}</button>
              <button class="algo-step-btn" id="bb84-step-1" onclick="CryptographyModule.showBB84Step(1,this)">${T('c_st2')}</button>
              <button class="algo-step-btn" id="bb84-step-2" onclick="CryptographyModule.showBB84Step(2,this)">${T('c_st3')}</button>
              <button class="algo-step-btn" id="bb84-step-3" onclick="CryptographyModule.showBB84Step(3,this)">${T('c_st4')}</button>
            </div>
          </div>

          <!-- Step 0: Alice -->
          <div class="algo-step-display" id="bb84-panel-0">
            <div class="step-title">${T('c_p0_t')}</div>
            <div class="step-desc" style="margin-bottom:1rem;">${T('c_p0_d')}</div>
            <div class="bb84-grid" id="aliceGrid"></div>
          </div>

          <!-- Step 1: Bob -->
          <div class="algo-step-display" id="bb84-panel-1" style="display:none;">
            <div class="step-title">${T('c_p1_t')}</div>
            <div class="step-desc" style="margin-bottom:1rem;">${T('c_p1_d')}</div>
            <div class="bb84-grid" id="bobGrid"></div>
          </div>

          <!-- Step 2: Sifting -->
          <div class="algo-step-display" id="bb84-panel-2" style="display:none;">
            <div class="step-title">${T('c_p2_t')}</div>
            <div class="step-desc" style="margin-bottom:1rem;">${T('c_p2_d')}</div>
            <div class="bb84-grid" id="siftGrid"></div>
            <div class="bb84-key-display" id="sharedKeyDisplay">${T('c_shared_key')}: —</div>
          </div>

          <!-- Step 3: Security Check -->
          <div class="algo-step-display" id="bb84-panel-3" style="display:none;">
            <div id="securityDisplay"></div>
          </div>
        </div>
        ${App.renderMarkCompletedButton('cryptography', 1)}
      </div>

      <!-- Lesson 3: Quantum Teleportation -->
      <div class="lesson-content" id="lesson-c-2">
        <h2 class="lesson-h2">Quantum Teleportation</h2>
        <p class="lesson-text">Quantum Teleportation transmits the exact state of a qubit from Alice to Bob instantly without physically moving the particle itself!</p>

        <div class="info-grid">
          <div class="info-card highlight">
            <h3>Not Science Fiction </h3>
            <p>We don't move physical matter—we move <strong>quantum information</strong>. It requires a mix of pre-shared <strong>entangled qubits</strong> and a <strong>classical text message</strong> (2 bits).</p>
          </div>
          <div class="info-card">
            <h3>Destructive Copying</h3>
            <p>Because of the <strong>No-Cloning law</strong>, copying a qubit destroys its original state. Teleporting "dematerializes" the state at Alice's end and reconstructs it at Bob's end.</p>
          </div>
        </div>

        <h3 class="lesson-h3">The 3-Step Protocol</h3>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-title text-cyan">Step 1: Entangle & Share</div>
            <div class="tl-desc">Alice and Bob share an entangled Bell pair ($|00\rangle + |11\rangle$). Alice holds the secret qubit $|\psi\rangle$ she wants to send.</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-purple">Step 2: Alice Measures</div>
            <div class="tl-desc">Alice entangles her secret qubit with her half of the Bell pair, then measures both. This destroys her copy and instantly shifts Bob's distant qubit into a correlated state.</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-green">Step 3: Bob Decodes</div>
            <div class="tl-desc">Alice texts Bob her 2-bit measurement result. Bob uses these bits to apply corrective gates (X and/or Z) to his qubit, restoring it perfectly to the secret state $|\psi\rangle$!</div>
          </div>
        </div>

        <div class="info-card" style="margin-top:1.5rem;">
          <h3><span style="display:inline-block; vertical-align:middle; margin-right:8px; color:var(--accent-blue);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span> Building the Quantum Internet</h3>
          <p>Teleportation is the backbone of future quantum networks. It routes information securely across the globe and enables perfectly secure <strong>blind quantum computing</strong> in the cloud.</p>
        </div>
        ${App.renderMarkCompletedButton('cryptography', 2)}
      </div>

      <!-- Quiz Section -->
      <div id="module-quiz-section-cryptography">
        ${App.renderQuizSection('cryptography')}
      </div>
    `;
    if (typeof App !== 'undefined') App.markLessonVisited('cryptography', 0);
  },

  showLesson(idx, btn) {
    document.querySelectorAll('#view-cryptography .lesson-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#view-cryptography .lesson-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`lesson-c-${idx}`).classList.add('active');
    btn.classList.add('active');

    if (typeof App !== 'undefined') App.markLessonVisited('cryptography', idx);
  },

  bb84Data: null,

  runBB84() {
    const n = parseInt(document.getElementById('keyLengthSlider').value);
    const eveEnabled = document.getElementById('eveCheckbox').checked;
    const bases = ['+', '×'];

    // Generate Alice's random bits and bases
    const aliceBits = Array.from({ length: n }, () => Math.round(Math.random()));
    const aliceBases = Array.from({ length: n }, () => bases[Math.round(Math.random())]);

    // Eve intercepts (if enabled)
    let eveBits = null, eveBases = null;
    if (eveEnabled) {
      eveBases = Array.from({ length: n }, () => bases[Math.round(Math.random())]);
      eveBits = aliceBits.map((bit, i) =>
        eveBases[i] === aliceBases[i] ? bit : Math.round(Math.random()) 
      );
    }

    // Bob measures in random bases
    const bobBases = Array.from({ length: n }, () => bases[Math.round(Math.random())]);
    const bobBits = aliceBits.map((bit, i) => {
      const sentBit = eveEnabled ? eveBits[i] : bit;
      const sentBase = eveEnabled ? eveBases[i] : aliceBases[i];
      return sentBase === bobBases[i] ? sentBit : Math.round(Math.random());
    });

    // Sift
    const matching = aliceBases.map((b, i) => b === bobBases[i]);
    const aliceKey = aliceBits.filter((_, i) => matching[i]);
    const bobKey = bobBits.filter((_, i) => matching[i]);

    const errors = aliceKey.filter((b, i) => b !== bobKey[i]).length;
    const qber = aliceKey.length > 0 ? (errors / aliceKey.length) : 0;

    this.bb84Data = { n, aliceBits, aliceBases, bobBases, bobBits, matching, aliceKey, bobKey, errors, qber, eveEnabled };

    document.getElementById('bb84Steps').style.display = 'block';
    this.showBB84Step(0, document.getElementById('bb84-step-0'));
    App.addXP(30);
  },

  showBB84Step(step, btn) {
    ['bb84-panel-0','bb84-panel-1','bb84-panel-2','bb84-panel-3'].forEach((id, i) => {
      document.getElementById(id).style.display = i === step ? 'block' : 'none';
    });
    document.querySelectorAll('#view-cryptography .algo-step-btn').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');

    const d = this.bb84Data;
    if (!d) return;
    const T = (k) => App.t(k);

    if (step === 0) {
      document.getElementById('aliceGrid').innerHTML = d.aliceBits.map((bit, i) => `
        <div class="bb84-bit">
          <div class="bb84-bit-label">Bit ${i}</div>
          <div class="bb84-bit-val text-cyan">${bit}</div>
          <div class="bb84-bit-label" style="margin-top:0.25rem;">${T('c_base')}: <strong>${d.aliceBases[i]}</strong></div>
          <div class="bb84-bit-label">Qubit: ${d.aliceBases[i] === '+' ? (bit ? '|1⟩' : '|0⟩') : (bit ? '|−⟩' : '|+⟩')}</div>
        </div>
      `).join('');
    } else if (step === 1) {
      document.getElementById('bobGrid').innerHTML = d.bobBits.map((bit, i) => `
        <div class="bb84-bit ${d.matching[i] ? 'match' : 'mismatch'}">
          <div class="bb84-bit-label">Bit ${i}</div>
          <div class="bb84-bit-val">${bit}</div>
          <div class="bb84-bit-label" style="margin-top:0.25rem;">${T('c_base')}: <strong>${d.bobBases[i]}</strong></div>
          <div class="bb84-bit-label">${d.matching[i] ? ' '+T('c_match') : ' '+T('c_diff')}</div>
        </div>
      `).join('');
    } else if (step === 2) {
      document.getElementById('siftGrid').innerHTML = d.aliceBits.map((bit, i) => {
        if (!d.matching[i]) return `<div class="bb84-bit" style="opacity:0.3;"><div class="bb84-bit-label">Bit ${i}</div><div class="bb84-bit-val">—</div><div class="bb84-bit-label">${T('c_discard')}</div></div>`;
        return `
          <div class="bb84-bit match">
            <div class="bb84-bit-label">Bit ${i}</div>
            <div class="bb84-bit-val text-green">${bit}</div>
            <div class="bb84-bit-label" style="margin-top:0.25rem;"> ${T('c_kept')}</div>
          </div>
        `;
      }).join('');
      document.getElementById('sharedKeyDisplay').textContent =
        `${T('c_shared_key')} (${d.aliceKey.length} bits): ${d.aliceKey.join('')}`;
    } else if (step === 3) {
      const eveDetected = d.qber > 0.1;
      if (!eveDetected && typeof App !== 'undefined') {
        App.unlockAchievement('qkd-secure', 'QKD Sentinel: Secured a quantum key!', '');
      }
      document.getElementById('securityDisplay').innerHTML = `
        <div class="step-title" style="color:${eveDetected ? 'var(--accent-pink)' : 'var(--accent-green)'}">
          ${eveDetected ? '️ '+T('c_eve_det') : ' '+T('c_sec_ok')}
        </div>
        <div class="step-desc" style="margin-top:1rem;">
          <p><strong>${T('c_raw_len')}:</strong> ${d.aliceKey.length} bits</p>
          <p><strong>QBER:</strong> ${(d.qber * 100).toFixed(1)}%</p>
          <p><strong>${T('c_thresh')}:</strong> >11% QBER → ${T('c_thresh_desc')}</p>
          <p style="margin-top:1rem;"><strong>${d.eveEnabled ? '️ '+T('c_eve_act') : ' '+T('c_eve_no')}</strong> — 
            ${eveDetected ? T('c_eve_caught') : T('c_eve_safe')}</p>
        </div>
        ${!eveDetected ? `<div class="bb84-key-display"> ${T('c_fin_key')}: ${d.aliceKey.join('')}</div>` : ''}
        <div class="info-card" style="margin-top:1rem;">
          <h3>${T('c_how_eve')}</h3>
          <p>${T('c_how_eve_desc')}</p>
        </div>
      `;
    }
  },

  resetBB84() {
    this.bb84Data = null;
    document.getElementById('bb84Steps').style.display = 'none';
  }
};
window.CryptographyModule = CryptographyModule;
