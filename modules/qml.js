// ─── Module 6: Quantum Machine Learning ──────────────────────────────────
const QMLModule = {
  currentLesson: 0,
  vqeRunning: false,
  vqeR: 1.20,
  vqeTheta: 1.0,

  render(container) {
    const T = (k) => App.t(k);
    container.innerHTML = `
      <div class="module-header">
        <div class="module-breadcrumb"><span class="breadcrumb-link" onclick="App.navigate('home')">Home</span> → <span>Quantum ML</span></div>
        <h1 style="display:flex; align-items:center; gap:0.5rem;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg> Quantum Machine Learning</h1>
        <p>Explore how quantum computing supercharges artificial intelligence — from parameterized circuits to VQE and optimization.</p>
      </div>

      <div class="lesson-tabs">
        <button class="lesson-tab active" onclick="QMLModule.showLesson(0,this)">1. What is QML?</button>
        <button class="lesson-tab" onclick="QMLModule.showLesson(1,this)">2. Variational Circuits</button>
        <button class="lesson-tab" onclick="QMLModule.showLesson(2,this)">3. VQE Lab</button>
        <button class="lesson-tab" onclick="QMLModule.showLesson(3,this)">4. QAOA</button>
      </div>

      <!-- Lesson 1: What is QML -->
      <div class="lesson-content active" id="lesson-q-0">
        <h2 class="lesson-h2">What is Quantum Machine Learning?</h2>
        <p class="lesson-text">QML merges quantum physics with AI. By replacing classical bits with qubits, we can train models on massive datasets using quantum parallelism.</p>

        <div class="info-grid">
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-blue);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span> Classical ML Limits</h3>
            <p style="margin-top:0.5rem;">• Extreme compute power required to train models.</p>
            <p style="margin-top:0.25rem;">• Slow matrix math (scaling cubicly with data size).</p>
            <p style="margin-top:0.25rem;">• Struggling with massive, high-dimensional datasets.</p>
          </div>
          <div class="info-card highlight">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-pink);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="2"/></svg></span> Quantum ML Promise</h3>
            <p>• Encode giant feature spaces into a few qubits.</p>
            <div class="math-block" style="font-size:0.85rem;margin-top:0.75rem;">2<sup>n</sup> combinations in just n qubits</div>
            <p style="margin-top:0.5rem;">• Run systems exponentially faster (logarithmic speedups).</p>
          </div>
        </div>

        <h3 class="lesson-h3">The Four QML Paradigms</h3>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-title text-cyan">CC: Classical Data → Classical AI</div>
            <div class="tl-desc">Standard AI we use today (baseline).</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">CQ: Classical Data → Quantum AI</div>
            <div class="tl-desc">Converting normal data into qubits. The most popular near-term setup.</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">QC: Quantum Data → Classical AI</div>
            <div class="tl-desc">Using regular AI to analyze quantum chemistry sensor data.</div>
          </div>
          <div class="tl-item">
            <div class="tl-title text-cyan">QQ: Quantum Data → Quantum AI</div>
            <div class="tl-desc">Pure quantum processing (the holy grail, requires future systems).</div>
          </div>
        </div>

        <h3 class="lesson-h3">Key QML Applications</h3>
        <div class="info-grid">
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-green);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M4.5 10.5C5 7.5 8 4.5 12 4.5s7 3 7.5 6m-15 3c.5 3 3.5 6 7.5 6s7-3 7.5-6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="6" x2="15" y2="18"/></svg></span> Drug Discovery</h3>
            <p>Simulating molecule bindings with quantum accuracy to design new treatments in days instead of years.</p>
          </div>
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-gold);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></span> Portfolio Optimization</h3>
            <p>Finding the absolute best investment strategies under extreme constraints faster than classical algorithms.</p>
          </div>
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-blue);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span> Image Recognition</h3>
            <p>Applying quantum filters (Quanvolutions) to analyze images using fewer parameters.</p>
          </div>
          <div class="info-card">
            <h3><span style="display:inline-block; vertical-align:middle; margin-right:6px; color:var(--accent-pink);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span> Fraud Detection</h3>
            <p>Scanning high-dimensional transaction data to spot anomalies instantly.</p>
          </div>
        </div>
        ${App.renderMarkCompletedButton('qml', 0)}
      </div>

      <!-- Lesson 2: Variational Circuits (PQC) -->
      <div class="lesson-content" id="lesson-q-1">
        <h2 class="lesson-h2">Parameterized Quantum Circuits</h2>
        <p class="lesson-text">A <strong>Parameterized Quantum Circuit (PQC)</strong> is a quantum circuit with tunable rotation gates. Think of these rotations as the <strong>weights</strong> in a neural network!</p>

        <div class="math-block">U(θ) = Rₓ(θ₁) ⊗ Rᵧ(θ₂) → Measure Cost</div>

        <div class="info-grid">
          <div class="info-card highlight">
            <h3> The Hybrid Loop</h3>
            <div class="timeline" style="padding-left:0.5rem;margin-top:0.5rem;">
              <div class="tl-item"><div class="tl-title" style="font-size:0.82rem;">1. Initialize rotation angles randomly</div></div>
              <div class="tl-item"><div class="tl-title" style="font-size:0.82rem;">2. Run circuit on the quantum chip</div></div>
              <div class="tl-item"><div class="tl-title" style="font-size:0.82rem;">3. Measure outcomes & calculate error (cost)</div></div>
              <div class="tl-item"><div class="tl-title" style="font-size:0.82rem;">4. Classical PC updates angles to reduce error</div></div>
              <div class="tl-item"><div class="tl-title" style="font-size:0.82rem;">5. Repeat until the model learns!</div></div>
            </div>
          </div>
          <div class="info-card">
            <h3> Common Layouts (Ansatz)</h3>
            <p style="margin-bottom:0.5rem;"><strong>Hardware Efficient:</strong> Uses native gates to minimize hardware noise.</p>
            <p style="margin-bottom:0.5rem;"><strong>UCCSD (Chemistry):</strong> Physically modeled to calculate molecular energies.</p>
            <p><strong>QAOA (Optimization):</strong> Alternates problem constraints to find optimal solutions.</p>
          </div>
        </div>

        <h3 class="lesson-h3">Interactive PQC Simulator</h3>
        <p class="lesson-text">Adjust the rotation sliders (θ₁ and θ₂) to tune the weights. Try to maximize the output probability of the target state |11⟩ and minimize the cost!</p>

        <div class="info-card" style="margin-top:1rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
            <div>
              <label style="font-size:0.82rem;color:var(--text-muted);display:block;margin-bottom:0.25rem;">θ₁ (Rx weight on q₀): <strong id="pqcTheta1Val">π/4</strong></label>
              <input type="range" id="pqcTheta1" min="0" max="628" value="157"
                style="width:100%;accent-color:var(--accent-cyan);"
                oninput="QMLModule.updatePQC()">
              <label style="font-size:0.82rem;color:var(--text-muted);display:block;margin-top:0.75rem;margin-bottom:0.25rem;">θ₂ (Ry weight on q₁): <strong id="pqcTheta2Val">π/2</strong></label>
              <input type="range" id="pqcTheta2" min="0" max="628" value="314"
                style="width:100%;accent-color:var(--accent-purple);"
                oninput="QMLModule.updatePQC()">
            </div>
            <div>
              <div class="state-vector-display" id="pqcOutput" style="font-size:0.8rem;line-height:1.8;min-height:120px;">
                Adjust sliders to see circuit output...
              </div>
            </div>
          </div>
          <div style="margin-top:1rem;">
            <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.5rem;">Probability Distribution:</div>
            <div id="pqcBars" style="display:flex;gap:6px;align-items:flex-end;height:80px;"></div>
            <div style="display:flex;gap:6px;margin-top:4px;">
              ${['|00⟩','|01⟩','|10⟩','|11⟩'].map(s => `<div style="flex:1;text-align:center;font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);">${s}</div>`).join('')}
            </div>
          </div>
          <div style="margin-top:1rem;padding:0.75rem;background:rgba(0,212,255,0.05);border-radius:8px;">
            <div style="font-size:0.82rem;color:var(--text-muted);">Cost function (target |11⟩): <strong id="pqcCost" style="color:var(--accent-cyan);">0.500</strong></div>
            <div style="font-size:0.82rem;color:var(--text-muted);margin-top:0.25rem;">Circuit flow: Rx(θ₁) ⊗ Ry(θ₂) → CNOT → Measure</div>
          </div>
        </div>
        ${App.renderMarkCompletedButton('qml', 1)}
      </div>

      <!-- Lesson 3: VQE Lab -->
      <div class="lesson-content" id="lesson-q-2">
        <h2 class="lesson-h2"> VQE: Variational Quantum Eigensolver</h2>
        <p class="lesson-text">VQE is a powerful hybrid algorithm that finds the ground state energy (lowest energy configuration) of molecules. This is key to solving chemical bonding problems.</p>

        <div class="info-grid">
          <div class="info-card highlight">
            <h3>The Variational Principle</h3>
            <div class="math-block" style="font-size:0.9rem;">E₀ ≤ ⟨ψ(θ)|H|ψ(θ)⟩</div>
            <p style="margin-top:0.5rem;">The measured energy of any trial state is always <strong>greater than or equal to</strong> the true minimum energy (E₀).</p>
            <p style="margin-top:0.5rem;">So, by adjusting the quantum state to <strong>minimize the energy</strong>, we find the exact molecular ground state!</p>
          </div>
          <div class="info-card">
            <h3>Real-World Uses</h3>
            <p>• <strong>Battery Design</strong>: Creating better lithium cells.</p>
            <p style="margin-top:0.5rem;">• <strong>Drug Discovery</strong>: Simulating protein-ligand bonds at atomic scales.</p>
            <p style="margin-top:0.5rem;">• <strong>Superconductors</strong>: Designing strong, zero-loss electrical grids.</p>
          </div>
        </div>

        <h3 class="lesson-h3">Interactive VQE Optimizer</h3>
        <p class="lesson-text">Watch the algorithm minimize the energy of a 1-qubit system. Click <strong>Auto Optimize</strong> to trigger classical gradient descent, driving the quantum state to its absolute minimum energy (-1.0 at θ = 0).</p>

        <div class="info-card" style="margin-top:1rem;" id="vqePanel">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
            <div>
              <div style="margin-bottom:1.25rem;">
                <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.5rem;">Hamiltonian: <span style="font-family:var(--font-mono);color:var(--accent-cyan);">H(R) (Hydrogen Molecular Ansatz)</span></div>
                <div style="font-size:0.82rem;color:var(--text-muted);">Minimum energy at R: <span style="font-family:var(--font-mono);color:var(--accent-green);" id="vqeGroundStateText">E₀(R) = −1.1219 Hartree</span></div>
              </div>
              <div style="margin-bottom:1.25rem;">
                <label style="font-size:0.82rem;color:var(--text-muted);display:block;margin-bottom:0.25rem;">H-H Bond Distance R: <strong id="vqeRDisplay">1.20 Å</strong></label>
                <input type="range" id="vqeManualR" min="40" max="250" value="120"
                  style="width:100%;accent-color:var(--accent-cyan);margin-bottom:0.5rem;"
                  oninput="QMLModule.updateVQER(this.value)">
                <!-- Molecule visualization container -->
                <div style="height:52px;background:var(--bg-app);border-radius:8px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border:1px solid var(--border);box-shadow:inset 0 2px 4px rgba(0,0,0,0.03);margin-bottom:0.5rem;">
                  <!-- Dotted center axis line -->
                  <div style="position:absolute;width:100%;height:1px;border-top:1px dashed var(--border);z-index:0;"></div>
                  <!-- Vertical scale ticks -->
                  <div style="position:absolute;left:10%;height:10px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;left:25%;height:6px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;left:40%;height:6px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;left:50%;height:14px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;left:60%;height:6px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;left:75%;height:6px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;left:90%;height:10px;width:1px;background:var(--border);z-index:0;"></div>
                  <div style="position:absolute;bottom:4px;font-size:0.6rem;color:var(--text-muted);letter-spacing:0.1em;font-family:var(--font-mono);z-index:0;text-transform:uppercase;">Nuclear Separation</div>

                  <div id="vqeAtom1" style="width:16px;height:16px;border-radius:50%;background:#ee6d4f;box-shadow:0 0 10px rgba(238,109,79,0.7);border:2px solid #fff2ef;position:absolute;left:calc(50% - 30px);transition:left 0.1s ease-out;z-index:2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:bold;font-family:var(--font-sans);">H</div>
                  <div id="vqeAtom2" style="width:16px;height:16px;border-radius:50%;background:#ee6d4f;box-shadow:0 0 10px rgba(238,109,79,0.7);border:2px solid #fff2ef;position:absolute;left:calc(50% + 30px);transition:left 0.1s ease-out;z-index:2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:bold;font-family:var(--font-sans);">H</div>
                  <div id="vqeElectronCloud" style="height:24px;border-radius:12px;background:radial-gradient(circle, rgba(238,109,79,0.35) 0%, rgba(238,109,79,0.02) 80%);filter:blur(2px);position:absolute;width:84px;left:calc(50% - 42px);transition:all 0.1s ease-out;z-index:1;"></div>
                </div>
              </div>
              <div>
                <label style="font-size:0.82rem;color:var(--text-muted);display:block;margin-bottom:0.25rem;">Ansatz Parameter θ: <strong id="vqeThetaDisplay">1.00 rad</strong></label>
                <input type="range" id="vqeManualTheta" min="0" max="628" value="100"
                  style="width:100%;accent-color:var(--accent-purple);"
                  oninput="QMLModule.updateVQEManual(this.value)">
              </div>
              <div style="margin-top:1.25rem;">
                <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.3rem;">Current Energy ⟨H⟩:</div>
                <div style="font-size:1.8rem;font-weight:700;font-family:var(--font-mono);" id="vqeEnergy">−0.540</div>
              </div>
              <div style="margin-top:0.75rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button class="run-btn" onclick="QMLModule.runVQE()" id="vqeRunBtn" style="padding:0.5rem 1.2rem;">▶ Auto Optimize</button>
                <button class="clear-btn" onclick="QMLModule.resetVQE()">Reset</button>
              </div>
              <div style="margin-top:0.75rem;font-size:0.8rem;color:var(--text-muted);" id="vqeStatus">Manual mode: drag slider to explore</div>
            </div>
            <div style="display:flex;flex-direction:column;height:100%;">
              <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.5rem;">Energy Landscape E(θ) = −cos(θ)</div>
              <div style="position:relative;height:260px;width:100%;border-radius:12px;overflow:hidden;background:var(--bg-card);">
                <canvas id="vqeCanvas"></canvas>
              </div>
            </div>
          </div>
          <div style="margin-top:1rem;padding:0.75rem;border-radius:8px;background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);display:none;" id="vqeConvergencePanel">
            <div style="font-size:0.82rem;" id="vqeConvergenceMsg"></div>
          </div>
        </div>
        ${App.renderMarkCompletedButton('qml', 2)}
      </div>

      <!-- Lesson 4: QAOA -->
      <div class="lesson-content" id="lesson-q-3">
        <h2 class="lesson-h2"> QAOA: Quantum Approximate Optimization Algorithm</h2>
        <p class="lesson-text">QAOA is a hybrid algorithm designed to solve tough <strong>combinatorial optimization problems</strong>—like delivery routes, scheduling, and graph coloring—which are NP hard classically.</p>

        <div class="math-block">|γ,β⟩ = U<sub>M</sub>(β) U<sub>C</sub>(γ) |+⟩<sup>n</sup></div>

        <div class="info-grid">
          <div class="info-card">
            <h3> Max Cut Problem</h3>
            <p>Divide graph nodes into two groups to maximize the number of cut connections between them.</p>
            <p style="margin-top:0.5rem;">• NP hard for large graphs.</p>
            <p style="margin-top:0.25rem;">• Used in logistics, chip layout design, and networking.</p>
          </div>
          <div class="info-card highlight">
            <h3> QAOA Mechanics</h3>
            <p><strong>Cost Phase Uᶜ(γ):</strong> Marks the constraints and errors of our problem.</p>
            <p style="margin-top:0.5rem;"><strong>Mixer Uᴹ(β):</strong> Entangles qubits to create quantum wave interference between pathways.</p>
          </div>
        </div>

        <h3 class="lesson-h3">QAOA on a 4 Node Max Cut Problem</h3>
        <p class="lesson-text">Adjust the QAOA depth (p layers) and click <strong>Run</strong> to simulate. Higher layers explore more pathways, yielding better approximations.</p>

        <div class="info-card" id="qaoaPanel">
          <div style="display:grid;grid-template-columns:200px 1fr;gap:1.5rem;align-items:start;">
            <div>
              <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;font-weight:600;">Graph G</div>
              <canvas id="qaoaGraph" width="180" height="180" style="border-radius:8px;"></canvas>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem;">Nodes: {0,1,2,3}<br>Edges: {(0,1),(1,2),(2,3),(0,3),(0,2)}</div>
            </div>
            <div>
              <div style="display:flex;gap:0.75rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap;">
                <div>
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.3rem;">QAOA Depth p</div>
                  <select id="qaoaDepth" style="background:var(--bg-card);border:1px solid var(--border);color:var(--text-primary);padding:0.4rem 0.6rem;border-radius:8px;" onchange="QMLModule.runQAOA()">
                    <option value="1">p = 1</option>
                    <option value="2" selected>p = 2</option>
                    <option value="3">p = 3</option>
                    <option value="5">p = 5</option>
                  </select>
                </div>
                <button class="run-btn" onclick="QMLModule.runQAOA()" style="margin-top:1.2rem;padding:0.5rem 1.2rem;">▶ Run QAOA</button>
                <button class="clear-btn" onclick="QMLModule.resetQAOA()" style="margin-top:1.2rem;">Reset</button>
              </div>
              <div id="qaoaResult" class="state-vector-display" style="min-height:120px;font-size:0.82rem;line-height:1.8;">
                Click "Run QAOA" to simulate the algorithm...
              </div>
              <div style="margin-top:0.75rem;display:none;" id="qaoaCutDisplay"></div>
            </div>
          </div>
          <div class="info-card" style="margin-top:1.5rem;">
            <h3> Why QAOA Matters</h3>
            <p>QAOA works on noisy, near-term hardware (<strong>NISQ</strong>). Unlike Shor's or Grover's algorithms which require perfect qubits, QAOA tolerates errors while searching for optimal paths.</p>
          </div>
        </div>
        ${App.renderMarkCompletedButton('qml', 3)}
      </div>

      <!-- Quiz Section -->
      <div id="module-quiz-section-qml">
        ${App.renderQuizSection('qml')}
      </div>
    `;

    // Initialize all interactive components after render
    setTimeout(() => {
      this.updatePQC();
      this.initVQECanvas();
      this.updateVQEManual(100);
      this.drawQAOAGraph();
      if (typeof App !== 'undefined') App.markLessonVisited('qml', 0);
    }, 150);
  },

  showLesson(idx, btn) {
    document.querySelectorAll('#view-qml .lesson-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#view-qml .lesson-tab').forEach(el => el.classList.remove('active'));
    const lesson = document.getElementById(`lesson-q-${idx}`);
    if (lesson) lesson.classList.add('active');
    btn.classList.add('active');
    this.currentLesson = idx;

    if (typeof App !== 'undefined') App.markLessonVisited('qml', idx);

    if (idx === 2) {
      setTimeout(() => {
        this.initVQECanvas();
        this.updateVQEManual(document.getElementById('vqeManualTheta')?.value || 100);
      }, 100);
    }
    if (idx === 3) {
      setTimeout(() => this.drawQAOAGraph(), 100);
    }
  },

  // ── PQC Simulator ──────────────────────────────────────────
  updatePQC() {
    const t1El = document.getElementById('pqcTheta1');
    const t2El = document.getElementById('pqcTheta2');
    if (!t1El || !t2El) return;

    const theta1 = parseInt(t1El.value) / 100;  // 0-6.28
    const theta2 = parseInt(t2El.value) / 100;

    document.getElementById('pqcTheta1Val').textContent = `${(theta1).toFixed(2)} rad`;
    document.getElementById('pqcTheta2Val').textContent = `${(theta2).toFixed(2)} rad`;

    // Simulate: Rx(θ1) on q0, Ry(θ2) on q1, then CNOT
    // Start: |00⟩ = [1,0,0,0]
    // After Rx(θ1) on q0: cos(θ1/2)|0⟩ - i·sin(θ1/2)|1⟩
    // After Ry(θ2) on q1: cos(θ2/2)|0⟩ + sin(θ2/2)|1⟩
    // Combined (before CNOT): product state
    const a = Math.cos(theta1 / 2);
    const b = -Math.sin(theta1 / 2); // i component (simplified as real for display)
    const c = Math.cos(theta2 / 2);
    const d = Math.sin(theta2 / 2);

    // |ψ⟩ = (a|0⟩ + ib|1⟩) ⊗ (c|0⟩ + d|1⟩)
    let amps = [a * c, a * d, b * c, b * d];

    // Apply CNOT (|10⟩ → |11⟩, |11⟩ → |10⟩)
    const cnotAmps = [amps[0], amps[1], amps[3], amps[2]];
    const probs = cnotAmps.map(x => x * x);
    const total = probs.reduce((s, p) => s + p, 0);
    const normProbs = probs.map(p => total > 0 ? p / total : 0.25);

    // Update output display
    const output = document.getElementById('pqcOutput');
    if (output) {
      const states = ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];
      output.innerHTML = states.map((s, i) =>
        `<div style="color:${normProbs[i] > 0.3 ? 'var(--accent-cyan)' : 'var(--text-secondary)'};">${s}: P = ${(normProbs[i] * 100).toFixed(1)}%</div>`
      ).join('');
    }

    // Update probability bars
    const bars = document.getElementById('pqcBars');
    if (bars) {
      const colors = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-pink)', 'var(--accent-green)'];
      bars.innerHTML = normProbs.map((p, i) => `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:80px;">
          <div style="width:80%;background:${colors[i]};height:${Math.max(2, p * 80)}px;border-radius:4px 4px 0 0;transition:height 0.3s ease;opacity:0.85;"></div>
        </div>
      `).join('');
    }

    const cost = document.getElementById('pqcCost');
    if (cost) {
      const p11 = normProbs[3];
      cost.textContent = (1 - p11).toFixed(3);
      cost.style.color = p11 > 0.7 ? 'var(--accent-green)' : p11 > 0.4 ? 'var(--accent-cyan)' : 'var(--accent-pink)';
    }
  },

  // ── VQE ────────────────────────────────────────────────────
  vqeR: 1.20,
  vqeTheta: 1.00,
  vqeChart: null,
  vqeCanvas: null,
  vqeIterations: [],

  updateVQER(val) {
    const R = val / 100;
    this.vqeR = R;
    const rDisplay = document.getElementById('vqeRDisplay');
    if (rDisplay) rDisplay.textContent = `${R.toFixed(2)} Å`;

    const pxSpacing = R * 55;
    const atom1 = document.getElementById('vqeAtom1');
    const atom2 = document.getElementById('vqeAtom2');
    const cloud = document.getElementById('vqeElectronCloud');
    if (atom1 && atom2 && cloud) {
      atom1.style.left = `calc(50% - ${pxSpacing / 2}px - 8px)`;
      atom2.style.left = `calc(50% + ${pxSpacing / 2}px - 8px)`;
      cloud.style.width = `${pxSpacing + 24}px`;
      cloud.style.left = `calc(50% - ${(pxSpacing + 24) / 2}px)`;
    }

    const E0 = 0.4 * Math.pow(1 - Math.exp(-1.4 * (R - 0.74)), 2) - 1.175;
    const gText = document.getElementById('vqeGroundStateText');
    if (gText) gText.textContent = `E₀(R) = ${E0.toFixed(4)} Hartree`;

    const manualTheta = document.getElementById('vqeManualTheta');
    if (manualTheta) {
      this.updateVQEManual(manualTheta.value);
    }
  },

  initVQECanvas() {
    const canvas = document.getElementById('vqeCanvas');
    if (!canvas) return;
    this.vqeCanvas = canvas;
    if (this.vqeChart) {
      this.vqeChart.destroy();
      this.vqeChart = null;
    }
    this.drawVQELandscape(1.0);
  },

  drawVQELandscape(currentTheta) {
    const canvas = this.vqeCanvas;
    if (!canvas) return;

    const R = this.vqeR || 1.20;
    const E0 = 0.4 * Math.pow(1 - Math.exp(-1.4 * (R - 0.74)), 2) - 1.175;
    const H_scale = (1.2 + 0.4 / R);

    const isLight = document.documentElement.classList.contains('light-mode');

    // Match theme values
    const gridColor = isLight ? 'rgba(154, 62, 38, 0.08)' : 'rgba(235, 103, 71, 0.08)';
    const textColor = isLight ? '#69463d' : '#d5c7c2';
    const curveColor = isLight ? '#eb6747' : '#ee6d4f';
    const targetColor = isLight ? '#c8830a' : '#d4af37';
    const chartBg = isLight ? '#ffffff' : 'rgba(55, 26, 18, 0.2)';

    canvas.style.background = chartBg;

    // Generate curve points
    const curveData = [];
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const thetaVal = (i / steps) * 2 * Math.PI;
      const energyVal = E0 + H_scale * Math.pow(Math.sin(thetaVal / 2), 2);
      curveData.push({ x: thetaVal, y: energyVal });
    }

    // Current State Point
    const currentEnergy = E0 + H_scale * Math.pow(Math.sin(currentTheta / 2), 2);
    const activePoint = [{ x: currentTheta, y: currentEnergy }];

    // Target E₀ line
    const targetLine = [
      { x: 0, y: E0 },
      { x: 2 * Math.PI, y: E0 }
    ];

    // Iteration trail
    const trailData = [];
    if (this.vqeIterations && this.vqeIterations.length > 0) {
      this.vqeIterations.forEach(thetaVal => {
        const energyVal = E0 + H_scale * Math.pow(Math.sin(thetaVal / 2), 2);
        trailData.push({ x: thetaVal, y: energyVal });
      });
    }

    if (!this.vqeChart) {
      const ctx = canvas.getContext('2d');
      this.vqeChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Energy Curve',
              data: curveData,
              showLine: true,
              borderColor: curveColor,
              borderWidth: 3,
              pointRadius: 0,
              fill: false,
              tension: 0.35
            },
            {
              label: 'Optimization Trail',
              data: trailData,
              showLine: true,
              borderColor: isLight ? 'rgba(154, 62, 38, 0.45)' : 'rgba(238, 109, 79, 0.45)',
              borderWidth: 2,
              borderDash: [3, 3],
              pointRadius: 0,
              fill: false,
              tension: 0.1
            },
            {
              label: 'Target Energy E₀',
              data: targetLine,
              showLine: true,
              borderColor: targetColor,
              borderWidth: 1.5,
              borderDash: [5, 5],
              pointRadius: 0,
              fill: false
            },
            {
              label: 'Current Parameter θ',
              data: activePoint,
              borderColor: isLight ? '#ffffff' : '#fbf8f7',
              backgroundColor: curveColor,
              pointRadius: 8,
              pointHoverRadius: 10,
              borderWidth: 2,
              showLine: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function(context) {
                  return `θ: ${context.parsed.x.toFixed(2)} rad, E: ${context.parsed.y.toFixed(4)} Hartree`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'linear',
              min: 0,
              max: 2 * Math.PI,
              ticks: {
                stepSize: Math.PI / 2,
                callback: function(value) {
                  if (value === 0) return '0';
                  if (Math.abs(value - Math.PI / 2) < 0.1) return 'π/2';
                  if (Math.abs(value - Math.PI) < 0.1) return 'π';
                  if (Math.abs(value - 1.5 * Math.PI) < 0.1) return '3π/2';
                  if (Math.abs(value - 2 * Math.PI) < 0.1) return '2π';
                  return '';
                },
                color: textColor,
                font: { family: 'Space Grotesk', weight: '600', size: 10 }
              },
              grid: { color: gridColor }
            },
            y: {
              type: 'linear',
              min: -1.25,
              max: 1.75,
              ticks: {
                color: textColor,
                font: { family: 'Space Grotesk', weight: '600', size: 10 },
                callback: function(value) {
                  return value.toFixed(2) + ' H';
                }
              },
              grid: { color: gridColor },
              title: {
                display: true,
                text: 'Energy (Hartree)',
                color: textColor,
                font: { family: 'Space Grotesk', weight: '700', size: 11 }
              }
            }
          }
        }
      });
    } else {
      const chart = this.vqeChart;
      chart.data.datasets[0].data = curveData;
      chart.data.datasets[1].data = trailData;
      chart.data.datasets[2].data = targetLine;
      chart.data.datasets[3].data = activePoint;

      chart.data.datasets[0].borderColor = curveColor;
      chart.data.datasets[1].borderColor = isLight ? 'rgba(154, 62, 38, 0.45)' : 'rgba(238, 109, 79, 0.45)';
      chart.data.datasets[2].borderColor = targetColor;
      chart.data.datasets[3].backgroundColor = curveColor;

      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.x.grid.color = gridColor;
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
      chart.options.scales.y.title.color = textColor;

      chart.update('none');
    }
  },

  updateVQEManual(val) {
    const theta = parseInt(val) / 100;
    this.vqeTheta = theta;

    const R = this.vqeR || 1.20;
    const E0 = 0.4 * Math.pow(1 - Math.exp(-1.4 * (R - 0.74)), 2) - 1.175;
    const H_scale = (1.2 + 0.4 / R);
    const energy = E0 + H_scale * Math.pow(Math.sin(theta / 2), 2);

    const energyEl = document.getElementById('vqeEnergy');
    if (energyEl) {
      energyEl.textContent = energy.toFixed(4) + ' Hartree';
      energyEl.style.color = energy < -0.9 ? 'var(--accent-green)' :
        energy < 0 ? 'var(--accent-cyan)' : 'var(--accent-pink)';
    }

    const thetaEl = document.getElementById('vqeThetaDisplay');
    if (thetaEl) thetaEl.textContent = `${theta.toFixed(2)} rad (${(theta * 180 / Math.PI).toFixed(0)}°)`;

    if (this.vqeCanvas) this.drawVQELandscape(theta);
  },

  runVQE() {
    if (this.vqeRunning) return;
    this.vqeRunning = true;
    this.vqeIterations = [];
    const btn = document.getElementById('vqeRunBtn');
    if (btn) btn.textContent = '⏸ Running...';

    const R = this.vqeR || 1.20;
    const E0 = 0.4 * Math.pow(1 - Math.exp(-1.4 * (R - 0.74)), 2) - 1.175;
    const H_scale = (1.2 + 0.4 / R);

    let theta = this.vqeTheta !== undefined ? this.vqeTheta : 1.00;
    const lr = 0.15;
    let iter = 0;
    const maxIter = 30;

    const step = () => {
      if (!this.vqeRunning || iter >= maxIter) {
        this.vqeRunning = false;
        if (btn) btn.textContent = '▶ Auto Optimize';
        const status = document.getElementById('vqeStatus');
        const finalEnergy = E0 + H_scale * Math.pow(Math.sin(theta / 2), 2);
        if (status) status.textContent = `Converged! θ = ${theta.toFixed(3)} rad, E = ${finalEnergy.toFixed(4)} Hartree`;
        App.addXP(40);
        App.unlockAchievement('vqe-run', 'VQE Master', '');
        const panel = document.getElementById('vqeConvergencePanel');
        const msg = document.getElementById('vqeConvergenceMsg');
        if (panel && msg) {
          panel.style.display = 'block';
          msg.innerHTML = `VQE converged in ${iter} iterations! Bond distance: <strong>${R.toFixed(2)} Å</strong>. Final energy: <strong>${finalEnergy.toFixed(4)} Hartree</strong> (target E₀: ${E0.toFixed(4)}). Error: ${Math.abs(finalEnergy - E0).toFixed(6)}`;
        }
        return;
      }

      const grad = H_scale * Math.sin(theta / 2) * Math.cos(theta / 2);
      theta = theta - lr * grad;
      theta = Math.max(0, Math.min(2 * Math.PI, theta));
      this.vqeIterations.push(theta);
      iter++;

      const slider = document.getElementById('vqeManualTheta');
      if (slider) slider.value = Math.round(theta * 100);
      this.updateVQEManual(Math.round(theta * 100));

      const status = document.getElementById('vqeStatus');
      const curEnergy = E0 + H_scale * Math.pow(Math.sin(theta / 2), 2);
      if (status) status.textContent = `Iteration ${iter}: θ = ${theta.toFixed(3)}, E = ${curEnergy.toFixed(4)} Hartree`;

      setTimeout(step, 120);
    };
    step();
  },

  resetVQE() {
    this.vqeRunning = false;
    this.vqeIterations = [];
    const slider = document.getElementById('vqeManualTheta');
    if (slider) slider.value = 100;
    
    const rSlider = document.getElementById('vqeManualR');
    if (rSlider) rSlider.value = 120;
    
    this.updateVQER(120);
    this.updateVQEManual(100);
    const status = document.getElementById('vqeStatus');
    if (status) status.textContent = 'Manual mode: drag sliders to explore';
    const panel = document.getElementById('vqeConvergencePanel');
    if (panel) panel.style.display = 'none';
  },

  // ── QAOA ───────────────────────────────────────────────────
  drawQAOAGraph() {
    const canvas = document.getElementById('qaoaGraph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const isLight = document.documentElement.classList.contains('light-mode');

    ctx.clearRect(0, 0, W, H);

    // Theme-aware background
    const bgColor = isLight ? '#f5ece9' : 'rgba(0,0,0,0.2)';
    const edgeColor = isLight ? 'rgba(154,62,38,0.35)' : 'rgba(0,212,255,0.4)';
    const nodeLabelColor = isLight ? '#fff' : '#fff';
    const nodeStroke = isLight ? 'rgba(154,62,38,0.4)' : '#fff';

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 8);
    ctx.fill();

    const nodes = [
      { x: W / 2, y: 25, label: '0' },
      { x: W - 20, y: H / 2, label: '1' },
      { x: W / 2, y: H - 25, label: '2' },
      { x: 20, y: H / 2, label: '3' }
    ];
    const edges = [[0, 1], [1, 2], [2, 3], [0, 3], [0, 2]];

    // Edges
    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Nodes
    nodes.forEach((n, i) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(n.x, n.y, 2, n.x, n.y, 16);
      g.addColorStop(0, '#9a3e26');
      g.addColorStop(1, '#ee6d4f');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = nodeStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = nodeLabelColor;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y);
    });
  },

  runQAOA() {
    const p = parseInt(document.getElementById('qaoaDepth')?.value || 2);
    const result = document.getElementById('qaoaResult');
    if (!result) return;

    result.innerHTML = `<span style="opacity:0.5;">⏳ Running QAOA with p=${p} layers...</span>`;

    setTimeout(() => {
      // Simulate QAOA on the 4-node graph
      // Optimal Max-Cut: {0,2} vs {1,3} or {0,1,3} vs {2} — cut value 4 or 3
      // Approximation ratio improves with p
      const approximationRatios = { 1: 0.75, 2: 0.87, 3: 0.93, 5: 0.98 };
      const approxRatio = approximationRatios[p] || 0.75;
      const optCut = 4; // optimal cut for this graph
      const achievedCut = Math.round(optCut * approxRatio);

      // Simulate probability distribution over bitstrings
      const cuts = [
        { state: '0101', cut: 4, prob: 0.05 + 0.3 * (p / 5) },
        { state: '1010', cut: 4, prob: 0.05 + 0.3 * (p / 5) },
        { state: '0110', cut: 3, prob: 0.1 + 0.1 * (p / 5) },
        { state: '1001', cut: 3, prob: 0.1 + 0.1 * (p / 5) },
        { state: '0011', cut: 2, prob: 0.15 - 0.05 * (p / 5) },
        { state: '1100', cut: 2, prob: 0.15 - 0.05 * (p / 5) },
        { state: '0000', cut: 0, prob: 0.15 - 0.1 * (p / 5) },
        { state: '1111', cut: 0, prob: 0.15 - 0.1 * (p / 5) }
      ];

      // Normalize
      const total = cuts.reduce((s, c) => s + c.prob, 0);
      cuts.forEach(c => c.prob /= total);

      result.innerHTML = `
        <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">
          QAOA p=${p} result | Approximation ratio: <strong style="color:var(--accent-green)">${approxRatio.toFixed(2)}</strong>
        </div>
        ${cuts.sort((a, b) => b.prob - a.prob).map(c => `
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;">
            <span style="font-family:var(--font-mono);color:var(--accent-cyan);width:50px;">|${c.state}⟩</span>
            <div style="flex:1;height:16px;background:var(--bg-secondary);border-radius:4px;overflow:hidden;">
              <div style="height:100%;width:${(c.prob * 100).toFixed(0)}%;background:${c.cut === 4 ? 'var(--accent-green)' : 'linear-gradient(90deg,var(--accent-cyan),var(--accent-purple))'};transition:width 0.5s;"></div>
            </div>
            <span style="font-size:0.75rem;color:var(--text-muted);width:45px;">P=${(c.prob * 100).toFixed(0)}%</span>
            <span style="font-size:0.75rem;color:${c.cut === 4 ? 'var(--accent-green)' : 'var(--text-muted)'};width:55px;">cut=${c.cut}${c.cut === 4 ? ' ' : ''}</span>
          </div>
        `).join('')}
        <div style="margin-top:0.75rem;padding:0.5rem;background:rgba(16,185,129,0.08);border-radius:8px;font-size:0.82rem;">
           Most likely outcome: cut value = <strong>${achievedCut}</strong> (optimal = 4). 
          Quantum advantage over random: ${Math.round(approxRatio * 100 - 50)}% better than random baseline.
        </div>
      `;

      App.addXP(25);
    }, 1000);
  },

  resetQAOA() {
    const result = document.getElementById('qaoaResult');
    if (result) result.innerHTML = 'Click "Run QAOA" to simulate the algorithm...';
  }
};
window.QMLModule = QMLModule;
