// ─── Quantum Circuit Builder — Qiskit-style ───────────────────────────────
const CircuitBuilder = {
  GATES: {
    H:    { label:'H',   color:'#ee6d4f', group:'single', desc:'Hadamard — creates superposition ½|0⟩+½|1⟩' },
    X:    { label:'X',   color:'#ec4899', group:'single', desc:'Pauli-X — bit flip (quantum NOT gate)' },
    Y:    { label:'Y',   color:'#f59e0b', group:'single', desc:'Pauli-Y — bit + phase flip' },
    Z:    { label:'Z',   color:'#9a3e26', group:'single', desc:'Pauli-Z — phase flip |1⟩ → -|1⟩' },
    S:    { label:'S',   color:'#10b981', group:'single', desc:'S gate — π/2 phase rotation' },
    T:    { label:'T',   color:'#f07c64', group:'single', desc:'T gate — π/4 phase rotation' },
    SDG:  { label:'S†',  color:'#10b981', group:'single', desc:'S† gate — -π/2 phase rotation' },
    TDG:  { label:'T†',  color:'#f07c64', group:'single', desc:'T† gate — -π/4 phase rotation' },
    CX:   { label:'CX',  color:'#ee6d4f', group:'two',    desc:'CNOT — controlled NOT (entangles qubits)' },
    CZ:   { label:'CZ',  color:'#ee6d4f', group:'two',    desc:'Controlled-Z — phase flip on |11⟩' },
    SWAP: { label:'SW',  color:'#64748b', group:'two',    desc:'SWAP — swap two qubits' },
    M:    { label:'M',   color:'#475569', group:'meas',   desc:'Measure — collapse qubit to 0 or 1' },
  },

  SLOT_COUNT: 10,
  QUBIT_COUNT: 4,
  _state: null,

  create(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const state = {
      slots: Array.from({ length: this.QUBIT_COUNT }, () => Array(this.SLOT_COUNT).fill(null)),
      dragGate: null,
      chart: null,
      amplitude: Array.from({ length: 1 << this.QUBIT_COUNT }, (_, idx) => idx === 0 ? { re: 1, im: 0 } : { re: 0, im: 0 }),
      ran: false,
    };
    this._state = state;

    container.innerHTML = this._buildUI();
    this._initChart(state);
    this._bindEvents(state, container);
    this._updateQASM(state);
    this._renderAllSlots(state);
    this.circuits = this.circuits || {};
    this.circuits[containerId] = state;
  },

  _buildUI() {
    const groups = [
      { title: 'Single-Qubit', keys: ['H','X','Y','Z','S','T','SDG','TDG'] },
      { title: 'Two-Qubit',    keys: ['CX','CZ','SWAP'] },
      { title: 'Measure',      keys: ['M'] },
    ];

    const paletteHTML = groups.map(grp => `
      <div class="qc-palette-group">
        <div class="qc-palette-group-title">${grp.title}</div>
        <div class="qc-palette-row">
          ${grp.keys.map(k => `
            <div class="qc-gate-chip" draggable="true" data-gate="${k}"
                 style="--gc:${this.GATES[k].color};"
                 title="${this.GATES[k].desc}">${this.GATES[k].label}</div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const wireRows = Array.from({ length: this.QUBIT_COUNT }, (_, qi) => {
      const slots = Array.from({ length: this.SLOT_COUNT }, (_, si) => `
        <div class="qc-slot" data-qubit="${qi}" data-slot="${si}" id="qcs-${qi}-${si}"></div>
      `).join('');
      return `
        <div class="qc-wire-row">
          <div class="qc-qubit-label">q<sub>${qi}</sub> <span class="qc-ket">|0⟩</span></div>
          <div class="qc-wire-line">
            <div class="qc-wire-track"></div>
            <div class="qc-slots-container">${slots}</div>
          </div>
          <div class="qc-meas-icon" id="meas-${qi}" style="display:none;"></div>
        </div>
      `;
    }).join('');

    return `
      <div class="qc-composer">
        <!-- LEFT: Gate Palette -->
        <div class="qc-palette-panel">
          <div class="qc-panel-title"><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-blue);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span> Operations</div>
          ${paletteHTML}
          <div class="qc-palette-hint">Drag gates onto wires →</div>
        </div>

        <!-- CENTER: Circuit Canvas + Controls + Bottom Panels -->
        <div class="qc-center-panel">
          <!-- Toolbar -->
          <div class="qc-toolbar">
            <div class="qc-circuit-title">Untitled circuit</div>
            <div class="qc-toolbar-right" style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
              <select id="qcPreset" style="background:var(--bg-secondary); border:1px solid var(--border); color:var(--text-primary); border-radius:var(--radius-sm); padding:0.35rem 0.5rem; font-size:0.75rem; font-family:'Space Grotesk',sans-serif; cursor:pointer;">
                <option value="">Load Algorithm Preset...</option>
                <option value="bell">Bell State (Entanglement)</option>
                <option value="ghz">GHZ State (3-Qubit Entanglement)</option>
                <option value="superposition">Superposition State</option>
                <option value="teleportation">Quantum Teleportation (Simplified)</option>
              </select>
              <button class="qc-btn-run" id="qcRun" style="padding:0.35rem 0.8rem; font-size:0.75rem;">▶ Run Circuit</button>
              <button class="qc-btn-clear" id="qcClear" style="padding:0.35rem 0.8rem; font-size:0.75rem;"> Clear</button>
            </div>
          </div>

          <!-- Wire Canvas -->
          <div class="qc-canvas" id="qcCanvas">
            <!-- Slot index ruler -->
            <div class="qc-ruler">
              <div class="qc-ruler-offset"></div>
              ${Array.from({length: this.SLOT_COUNT}, (_,i)=>`<div class="qc-ruler-tick">${i+1}</div>`).join('')}
            </div>
            ${wireRows}
          </div>

          <!-- Bottom Panels -->
          <div class="qc-bottom-panels">
            <!-- Probabilities -->
            <div class="qc-bottom-card" style="flex:1.3;">
              <div class="qc-bottom-card-title"><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-blue);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span> Probabilities <span id="qcProbSub">(initial state)</span></div>
              <div style="position:relative;height:160px;overflow-x:auto;">
                <div style="min-width: 400px; height: 100%;">
                  <canvas id="qcProbChart"></canvas>
                </div>
              </div>
              <div class="qc-state-display" id="qcStateVec">|ψ⟩ = |0000⟩</div>
            </div>

            <!-- Bloch Sphere q0 -->
            <div class="qc-bottom-card" style="flex:0.7;">
              <div class="qc-bottom-card-title"><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-blue);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span> Bloch q₀</div>
              <canvas id="qcBloch0" width="160" height="160" style="display:block;margin:auto;"></canvas>
            </div>
          </div>

          <!-- Gate info tooltip -->
          <div class="qc-gate-tooltip" id="qcGateTip" style="display:none;">
            <div class="qc-gate-tip-name" id="qcTipName"></div>
            <div class="qc-gate-tip-desc" id="qcTipDesc"></div>
          </div>
      </div>
    `;
  },

  _initChart(state) {
    setTimeout(() => {
      const canvas = document.getElementById('qcProbChart');
      if (!canvas || !window.Chart) return;
      if (canvas._chartInstance) { canvas._chartInstance.destroy(); }
      const labels = Array.from({length: 1<<this.QUBIT_COUNT}, (_,i) => '|'+i.toString(2).padStart(this.QUBIT_COUNT,'0')+'⟩');
      const data = [1, ...Array((1<<this.QUBIT_COUNT)-1).fill(0)];
      const isLight = document.documentElement.classList.contains('light-mode');
      const axisColor = isLight ? '#69463d' : '#94a3b8';
      const gridColor = isLight ? 'rgba(154, 62, 38, 0.12)' : 'rgba(255, 255, 255, 0.05)';

      state.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: 'rgba(238, 109, 79, 0.75)',
            borderColor: '#ee6d4f',
            borderWidth: 1, borderRadius: 4,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, animation: { duration: 400 },
          plugins: { 
            legend: { display: false }, 
            tooltip: { 
              backgroundColor: isLight ? 'rgba(255, 243, 240, 0.95)' : 'rgba(20, 10, 6, 0.95)',
              titleColor: isLight ? '#371a12' : '#fbf8f7',
              bodyColor: isLight ? '#9a3e26' : '#ee6d4f',
              borderColor: isLight ? 'rgba(238,109,79,0.3)' : 'rgba(238,109,79,0.2)',
              borderWidth: 1,
              callbacks: { label: c => `${(c.raw*100).toFixed(1)}%` } 
            } 
          },
          scales: {
            y: { min:0, max:1, ticks: { color: axisColor, callback: v=>`${(v*100).toFixed(0)}%`, stepSize:0.25 }, grid: { color: gridColor } },
            x: { ticks: { color: axisColor, maxRotation: 90, minRotation: 45, font:{ family:'JetBrains Mono, monospace', size:9 } }, grid: { display:false } }
          }
        }
      });
      canvas._chartInstance = state.chart;
    }, 150);
  },

  _bindEvents(state, container) {
    // ── Drag from palette ──────────────────────────────────────────────
    container.addEventListener('dragstart', e => {
      const chip = e.target.closest('[data-gate]');
      if (!chip) return;
      state.dragGate = chip.dataset.gate;
      chip.style.opacity = '0.5';
      e.dataTransfer.effectAllowed = 'copy';
      
      // Dismiss tooltip when dragging a gate
      const tip = document.getElementById('qcGateTip');
      if (tip) tip.style.display = 'none';
    });
    container.addEventListener('dragend', e => {
      const chip = e.target.closest('[data-gate]');
      if (chip) chip.style.opacity = '1';
    });

    // ── Drop onto slots ────────────────────────────────────────────────
    container.addEventListener('dragover', e => {
      const slot = e.target.closest('.qc-slot');
      if (slot) { e.preventDefault(); slot.classList.add('qcs-over'); }
    });
    container.addEventListener('dragleave', e => {
      e.target.closest('.qc-slot')?.classList.remove('qcs-over');
    });
    container.addEventListener('drop', e => {
      e.preventDefault();
      const slot = e.target.closest('.qc-slot');
      if (!slot || !state.dragGate) return;
      slot.classList.remove('qcs-over');
      const qi = +slot.dataset.qubit, si = +slot.dataset.slot;
      state.slots[qi][si] = state.dragGate;
      this._renderSlotEl(slot, state.dragGate);
      this._updateQASM(state);
      state.dragGate = null;
    });

    // ── Click placed gate → remove ─────────────────────────────────────
    container.addEventListener('click', e => {
      const placed = e.target.closest('.qcs-placed');
      if (placed) {
        const slot = placed.closest('.qc-slot');
        const qi = +slot.dataset.qubit, si = +slot.dataset.slot;
        state.slots[qi][si] = null;
        slot.innerHTML = '';
        this._updateQASM(state);
        
        // Hide tooltip when removing placed gates
        const tip = document.getElementById('qcGateTip');
        if (tip) tip.style.display = 'none';
        return;
      }
      
      // Gate chip hover info or dismiss
      const chip = e.target.closest('.qc-gate-chip');
      const tip = document.getElementById('qcGateTip');
      if (chip) {
        const g = this.GATES[chip.dataset.gate];
        if (tip) {
          document.getElementById('qcTipName').textContent = `${chip.dataset.gate} — ${chip.textContent}`;
          document.getElementById('qcTipDesc').textContent = g.desc;
          tip.style.display = 'block';
        }
        return;
      } else {
        // If clicking anywhere else, hide the tooltip
        if (tip) tip.style.display = 'none';
      }
      // Run / Clear / Copy / Download
      if (e.target.id === 'qcRun')   this._runSim(state);
      if (e.target.id === 'qcClear') this._clearAll(state);
      

    });

    const presetSelect = container.querySelector('#qcPreset');
    if (presetSelect) {
      presetSelect.addEventListener('change', e => {
        this._loadPreset(state, e.target.value);
      });
    }
  },

  _renderSlotEl(slot, gateKey) {
    const qi = +slot.dataset.qubit;
    const g = this.GATES[gateKey];
    const is2Q = (gateKey === 'CX' || gateKey === 'CZ' || gateKey === 'SWAP');
    
    if (is2Q) {
      const isDown = qi < this.QUBIT_COUNT - 1;
      const isSwap = gateKey === 'SWAP';
      const targetChar = isSwap ? '×' : (gateKey === 'CX' ? '⊕' : '●');
      const cChar = isSwap ? '×' : '';
      
      const dist = 57.6; // Approx distance between wire centers in px
      const lineTop = isDown ? '50%' : `calc(50% - ${dist}px)`;
      const targetTop = isDown ? `calc(50% + ${dist}px)` : `calc(50% - ${dist}px)`;

      slot.innerHTML = `
        <div class="qcs-placed ${!isSwap ? 'qcs-ctrl' : ''}" style="--gc:${g.color}; position:relative; z-index:10; ${isSwap ? 'background:transparent; border:none; box-shadow:none; width:24px; height:24px;' : ''}">
          ${isSwap ? `<span style="font-size:1.4rem; font-family:'Space Grotesk',sans-serif; font-weight:bold; position:relative; z-index:2; line-height:1; color:${g.color}; display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:var(--bg-card); border-radius:50%;">${cChar}</span>` : ''}
          <!-- Vertical line -->
          <div style="position:absolute; width:2px; height:${dist}px; background:var(--text-muted); opacity:0.65; top:${lineTop}; left:50%; transform:translateX(-50%); z-index:1;"></div>
          <!-- Target symbol -->
          <div style="position:absolute; top:${targetTop}; left:50%; transform:translate(-50%, -50%); color:${g.color}; font-size:${isSwap ? '1.4rem' : '1.6rem'}; font-family:${isSwap ? '"Space Grotesk",sans-serif' : 'inherit'}; font-weight:${isSwap ? 'bold' : 'normal'}; pointer-events:none; z-index:2; background:var(--bg-card); border-radius:50%; display:flex; align-items:center; justify-content:center; width:24px; height:24px;">
            ${targetChar}
          </div>
        </div>`;
    } else {
      slot.innerHTML = `
        <div class="qcs-placed" style="--gc:${g.color};">
          ${g.label}
        </div>`;
    }
  },

  _renderAllSlots(state) {
    for (let qi=0; qi<this.QUBIT_COUNT; qi++) {
      for (let si=0; si<this.SLOT_COUNT; si++) {
        const el = document.getElementById(`qcs-${qi}-${si}`);
        const gate = state.slots[qi][si];
        if (el && gate) this._renderSlotEl(el, gate);
        else if (el) el.innerHTML = '';
      }
    }
  },

  _updateQASM(state) {
    // QASM panel removed — no-op
    return;
    const lines = ['OPENQASM 2.0;', 'include "qelib1.inc";', '', `qreg q[${this.QUBIT_COUNT}];`, `creg c[${this.QUBIT_COUNT}];`];
    let hasOps = false;
    for (let si=0; si<this.SLOT_COUNT; si++) {
      for (let qi=0; qi<this.QUBIT_COUNT; qi++) {
        const g = state.slots[qi][si];
        if (!g) continue;
        hasOps = true;
        const qasmMap = { H:'h', X:'x', Y:'y', Z:'z', S:'s', T:'t', SDG:'sdg', TDG:'tdg', CX:'cx', CZ:'cz', SWAP:'swap', M:'measure' };
        const op = qasmMap[g] || g.toLowerCase();
        if (g === 'M') {
          lines.push(`measure q[${qi}] -> c[${qi}];`);
        } else if (g === 'CX' || g === 'CZ' || g === 'SWAP') {
          const q2 = qi < this.QUBIT_COUNT - 1 ? qi + 1 : qi - 1;
          lines.push(`${op} q[${qi}],q[${q2}];`);
        } else {
          lines.push(`${op} q[${qi}];`);
        }
      }
    }
    if (!hasOps) lines.push('');
    el.textContent = lines.join('\n');
  },

  _runSim(state) {
    const N = 1 << this.QUBIT_COUNT;
    let amp = Array.from({ length: N }, (_, idx) => idx === 0 ? { re: 1, im: 0 } : { re: 0, im: 0 });

    for (let si=0; si<this.SLOT_COUNT; si++) {
      for (let qi=0; qi<this.QUBIT_COUNT; qi++) {
        const g = state.slots[qi][si];
        if (!g) continue;

        if (g === 'CX' || g === 'CZ' || g === 'SWAP') {
          const q2 = qi < this.QUBIT_COUNT - 1 ? qi + 1 : qi - 1;
          amp = this._apply2Q(amp, qi, q2, g);
        } else {
          amp = this._apply1Q(amp, qi, g);
        }
      }
    }

    state.amplitude = amp;
    const probs = amp.map(a => a.re * a.re + a.im * a.im);
    const tot = probs.reduce((s,v)=>s+v,0);
    const norm = tot>0 ? probs.map(p=>p/tot) : probs;

    if (state.chart) {
      state.chart.data.datasets[0].data = norm;
      state.chart.update('active');
    }

    const labels = Array.from({length: N}, (_,i) => '|'+i.toString(2).padStart(this.QUBIT_COUNT,'0')+'⟩');
    const sv = norm.map((p,i) => p>0.001 ? `${Math.sqrt(p).toFixed(2)}${labels[i]}` : null).filter(Boolean).join(' + ');
    const svEl = document.getElementById('qcStateVec');
    if (svEl) svEl.textContent = `|ψ⟩ = ${sv || labels[0]}`;

    const sub = document.getElementById('qcProbSub');
    if (sub) sub.textContent = '(after simulation)';

    // Update bloch sphere for q0
    this._updateBloch(amp);

    // Check for Bell State creation on q0 & q1: (|00⟩ + |11⟩) / √2
    if (norm[0] > 0.45 && norm[0] < 0.55 && norm[3] > 0.45 && norm[3] < 0.55) {
      if (typeof App !== 'undefined') {
        App.unlockAchievement('perfect-bell', 'Entanglement Creator: Built a Bell state!', '');
      }
    }

    App.addXP(25);
    App.updateProgress('gates', 25);
  },

  _apply1Q(amp, qubit, gateKey) {
    const N = amp.length;
    const r = [...amp];
    const bit = 1 << (this.QUBIT_COUNT - 1 - qubit);
    
    for (let i = 0; i < N; i++) {
      if ((i & bit) === 0) {
        const a = i, b = i | bit;
        const va = amp[a], vb = amp[b];
        switch(gateKey) {
          case 'H':
            r[a] = { re: (va.re + vb.re) / Math.SQRT2, im: (va.im + vb.im) / Math.SQRT2 };
            r[b] = { re: (va.re - vb.re) / Math.SQRT2, im: (va.im - vb.im) / Math.SQRT2 };
            break;
          case 'X':
            r[a] = { re: vb.re, im: vb.im };
            r[b] = { re: va.re, im: va.im };
            break;
          case 'Z':
            r[a] = { re: va.re, im: va.im };
            r[b] = { re: -vb.re, im: -vb.im };
            break;
          case 'Y':
            r[a] = { re: vb.im, im: -vb.re };
            r[b] = { re: -va.im, im: va.re };
            break;
          case 'S':
            r[a] = { re: va.re, im: va.im };
            r[b] = { re: -vb.im, im: vb.re };
            break;
          case 'T':
            r[a] = { re: va.re, im: va.im };
            r[b] = { re: (vb.re - vb.im) / Math.SQRT2, im: (vb.re + vb.im) / Math.SQRT2 };
            break;
          case 'SDG':
            r[a] = { re: va.re, im: va.im };
            r[b] = { re: vb.im, im: -vb.re };
            break;
          case 'TDG':
            r[a] = { re: va.re, im: va.im };
            r[b] = { re: (vb.re + vb.im) / Math.SQRT2, im: (-vb.re + vb.im) / Math.SQRT2 };
            break;
        }
      }
    }
    return r;
  },

  _apply2Q(amp, q1, q2, gateKey) {
    const N = amp.length;
    const r = [...amp];
    const b1 = 1 << (this.QUBIT_COUNT - 1 - q1);
    const b2 = 1 << (this.QUBIT_COUNT - 1 - q2);

    for (let i = 0; i < N; i++) {
      if ((i & b1) !== 0) { // If control is 1
        if (gateKey === 'CX') {
          const flipped = i ^ b2;
          r[flipped] = amp[i];
        } else if (gateKey === 'CZ') {
          if ((i & b2) !== 0) {
            r[i] = { re: -amp[i].re, im: -amp[i].im };
          }
        }
      }
    }
    if (gateKey === 'SWAP') {
      for (let i = 0; i < N; i++) {
        const bit1 = (i & b1) !== 0;
        const bit2 = (i & b2) !== 0;
        if (bit1 !== bit2) {
          const swapped = i ^ b1 ^ b2;
          r[swapped] = amp[i];
        }
      }
    }
    return r;
  },

  _updateBloch(amp) {
    const canvas = document.getElementById('qcBloch0');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height, cx = W/2, cy = H/2, R = W*0.38;
    ctx.clearRect(0,0,W,H);

    const isLight = document.documentElement.classList.contains('light-mode');
    
    // Theme-dependent colors for the 2D Bloch Sphere representation
    const borderStroke = isLight ? 'rgba(238, 109, 79, 0.45)' : 'rgba(238, 109, 79, 0.35)';
    const equatorStroke = isLight ? 'rgba(238, 109, 79, 0.25)' : 'rgba(238, 109, 79, 0.2)';
    const axesStroke = isLight ? 'rgba(154, 62, 38, 0.38)' : 'rgba(238, 109, 79, 0.4)';
    const textFill = isLight ? '#9a3e26' : '#ee6d4f';

    // Background circle
    ctx.beginPath();
    ctx.arc(cx,cy,R,0,Math.PI*2);
    ctx.strokeStyle = borderStroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Equator ellipse
    ctx.beginPath();
    ctx.ellipse(cx,cy,R,R*0.3,0,0,Math.PI*2);
    ctx.strokeStyle = equatorStroke;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Axes
    const ax = (dx,dy,label) => {
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+dx,cy+dy);
      ctx.strokeStyle = axesStroke; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle = textFill; ctx.font='700 9px "Space Grotesk", sans-serif';
      ctx.fillText(label,cx+dx+4,cy+dy+4);
    };
    ax(0,-R-8,0,'|0⟩'); ax(0,R+8,'|1⟩'); ax(R+8,0,'|+⟩');

    // State vector
    // Compute reduced density matrix probabilities for qubit 0 (MSB)
    let prob0 = 0;
    let prob1 = 0;
    const bit = 1 << (this.QUBIT_COUNT - 1);
    for (let i = 0; i < amp.length; i++) {
      const a = amp[i];
      const re = (typeof a === 'number') ? a : (a ? a.re : 0);
      const im = (typeof a === 'number') ? 0 : (a ? a.im : 0);
      const p = re * re + im * im;
      if ((i & bit) === 0) {
        prob0 += p;
      } else {
        prob1 += p;
      }
    }
    const a0 = Math.sqrt(prob0);
    const theta = 2*Math.acos(Math.min(1,Math.max(-1,a0)));
    const bx = cx + R*Math.sin(theta)*0.6;
    const by = cy - R*Math.cos(theta);

    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(bx,by);
    ctx.strokeStyle='#ee6d4f'; ctx.lineWidth=2.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(bx,by,5,0,Math.PI*2);
    ctx.fillStyle='#ee6d4f'; ctx.fill();
  },

  _clearAll(state) {
    for (let qi=0; qi<this.QUBIT_COUNT; qi++) {
      state.slots[qi] = Array(this.SLOT_COUNT).fill(null);
    }
    this._renderAllSlots(state);
    this._updateQASM(state);
    if (state.chart) {
      state.chart.data.datasets[0].data = [1, ...Array((1<<this.QUBIT_COUNT)-1).fill(0)];
      state.chart.update('active');
    }
    const svEl = document.getElementById('qcStateVec');
    const z = '0'.repeat(this.QUBIT_COUNT);
    if (svEl) svEl.textContent = `|ψ⟩ = |${z}⟩`;
    const sub = document.getElementById('qcProbSub');
    if (sub) sub.textContent = '(initial state)';
    this._updateBloch(Array.from({ length: 1 << this.QUBIT_COUNT }, (_, idx) => idx === 0 ? { re: 1, im: 0 } : { re: 0, im: 0 }));
    const tip = document.getElementById('qcGateTip');
    if (tip) tip.style.display = 'none';
  },

  _loadPreset(state, presetName) {
    this._clearAll(state);
    if (!presetName) return;

    if (presetName === 'bell') {
      state.slots[0][0] = 'H';
      state.slots[0][1] = 'CX'; // Control q0, target q1
    } else if (presetName === 'ghz') {
      state.slots[0][0] = 'H';
      state.slots[0][1] = 'CX'; // Control q0, target q1
      state.slots[1][2] = 'CX'; // Control q1, target q2
    } else if (presetName === 'superposition') {
      state.slots[0][0] = 'H';
      state.slots[1][0] = 'H';
      state.slots[2][0] = 'H';
      state.slots[3][0] = 'H';
    } else if (presetName === 'teleportation') {
      // Simplified teleportation protocol:
      // Bell pair between q1 and q2
      state.slots[1][0] = 'H';
      state.slots[1][1] = 'CX';
      // Entangling source state on q0 with q1
      state.slots[0][3] = 'CX';
      state.slots[0][4] = 'H';
      // Classically controlled correction
      state.slots[1][6] = 'CX'; // CNOT corrective target q2
      state.slots[0][7] = 'CZ'; // CZ corrective target q2
    }

    this._renderAllSlots(state);
    this._updateQASM(state);
    this._runSim(state);
  }
};
