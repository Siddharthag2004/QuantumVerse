// ─── AI Tutor Component — Enhanced ───────────────────────────────────────
const Tutor = {
  isOpen: false,

  // Knowledge base — structured Q&A covering all 6 modules
  knowledge: [
    {
      keywords: ['qubit', 'quantum bit', 'what is qubit', 'what is a qubit'],
      answer: `A **qubit** (quantum bit) is the fundamental unit of quantum information. Unlike a classical bit that is either 0 or 1, a qubit can exist in a **superposition** of both states simultaneously:

|ψ⟩ = α|0⟩ + β|1⟩

where α and β are complex probability amplitudes satisfying |α|² + |β|² = 1.

Physical qubits can be implemented using superconducting circuits (IBM, Google), trapped ions (IonQ), or photons. When measured, the qubit collapses to |0⟩ with probability |α|² or |1⟩ with probability |β|².`
    },
    {
      keywords: ['superposition', 'what is superposition'],
      answer: `**Superposition** is one of the most powerful principles in quantum mechanics. A quantum system can exist in multiple states simultaneously until it is measured.

For a qubit: |ψ⟩ = α|0⟩ + β|1⟩

The Hadamard gate creates superposition: H|0⟩ = (|0⟩ + |1⟩)/√2

This is fundamentally different from classical uncertainty — the qubit isn't secretly in one state. It *genuinely is* in both states at once, and this enables quantum parallelism.`
    },
    {
      keywords: ['entanglement', 'quantum entanglement', 'bell state'],
      answer: `**Quantum entanglement** occurs when two or more qubits become correlated in a way that the state of one instantly determines the state of another, regardless of distance.

A Bell state (maximally entangled): |Φ⁺⟩ = (|00⟩ + |11⟩)/√2

To create it: Apply H to qubit 0, then CNOT(0→1). If you measure qubit 0 as |0⟩, qubit 1 is also |0⟩; if qubit 0 is |1⟩, qubit 1 is also |1⟩.

Einstein called this "spooky action at a distance." It's used in quantum teleportation, QKD, and quantum computing.`
    },
    {
      keywords: ['hadamard', 'h gate', 'hadamard gate'],
      answer: `The **Hadamard gate** is one of the most important quantum gates. Its matrix is:

H = (1/√2) [[1, 1], [1, -1]]

Effects:
• H|0⟩ = |+⟩ = (|0⟩ + |1⟩)/√2 (equal superposition)
• H|1⟩ = |−⟩ = (|0⟩ − |1⟩)/√2
• H² = I (H is self-inverse)

It's the quantum "coin flip" — creating equal probability between |0⟩ and |1⟩. Used at the start of almost every quantum algorithm.`
    },
    {
      keywords: ['grover', "grover's algorithm", 'search algorithm', "grover's search"],
      answer: `**Grover's Algorithm** provides a quadratic speedup for unstructured search problems.

Classical search: O(N) steps in the worst case
Grover: O(√N) oracle queries

**Steps:**
1. Initialize all N states in equal superposition using H⊗n
2. Apply the Oracle (marks the target state with a phase flip)
3. Apply Grover Diffusion Operator (inversion about the mean)
4. Repeat steps 2-3 approximately π/4 × √N times
5. Measure — target state appears with high probability

It's a quadratic speedup, not exponential, but significant for large N (e.g., searching 1 million items in ~1000 steps).`
    },
    {
      keywords: ['deutsch', 'deutsch-jozsa', 'deutsch jozsa'],
      answer: `The **Deutsch-Jozsa Algorithm** was one of the first quantum algorithms to demonstrate quantum advantage.

**Problem:** Given a function f: {0,1}ⁿ → {0,1}, determine if it is *constant* (same output for all inputs) or *balanced* (half inputs give 0, half give 1).

**Classical:** Needs up to 2ⁿ⁻¹ + 1 queries in the worst case.
**Quantum:** Solves it with exactly **1 oracle query**.

The algorithm uses quantum parallelism and interference to cancel out all constant-function outcomes, leaving a non-zero result only for balanced functions.`
    },
    {
      keywords: ['bb84', 'quantum cryptography', 'quantum key', 'qkd', 'key distribution'],
      answer: `**BB84** (Bennett-Brassard 1984) is the first quantum key distribution protocol.

**How it works:**
1. Alice sends random qubits in random bases (+ or ×)
2. Bob measures in random bases
3. Alice and Bob compare bases publicly (not values)
4. They keep bits where bases matched → shared secret key
5. A small subset is compared to check for eavesdropping

**Security guarantee:** Any eavesdropper (Eve) must measure the qubits, which disturbs them (no-cloning theorem). This causes a ~25% QBER — easily detectable.

BB84 provides *information-theoretic security* — safe even against a quantum computer!`
    },
    {
      keywords: ['error correction', 'qec', 'quantum error', 'no cloning', 'syndrome'],
      answer: `**Quantum Error Correction (QEC)** is essential because qubits are fragile — they interact with the environment (decoherence).

**The challenge:** Classical ECC uses redundancy (copy the bit). But the *no-cloning theorem* forbids copying unknown quantum states!

**3-qubit bit-flip code:**
• Encode |0⟩ as |000⟩, encode |1⟩ as |111⟩
• If one qubit flips: |010⟩ → majority vote reveals the error
• Syndrome measurement tells which qubit has the error without collapsing the logical qubit

Modern codes (Surface Code, Steane Code) can correct both bit-flip AND phase-flip errors.`
    },
    {
      keywords: ['bloch sphere', 'bloch'],
      answer: `The **Bloch sphere** is a geometric representation of a single qubit's state space.

|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩

Where:
• θ (theta) = polar angle (0° to 180°)
• φ (phi) = azimuthal angle (0° to 360°)

**Key points:**
• North pole (0,0,1) = |0⟩
• South pole (0,0,-1) = |1⟩
• Equator = equal superpositions
• |+⟩ = (1,0,0), |−⟩ = (-1,0,0)

Quantum gates = rotations on the Bloch sphere! H = 180° rotation around the X+Z axis.`
    },
    {
      keywords: ['cnot', 'controlled not', 'two qubit gate', '2-qubit', 'cx gate'],
      answer: `The **CNOT (Controlled-NOT) gate** is the fundamental two-qubit gate.

**Truth table:**
• |00⟩ → |00⟩ (no flip)
• |01⟩ → |01⟩ (no flip)
• |10⟩ → |11⟩ (flip target!)
• |11⟩ → |10⟩ (flip target!)

The **control qubit** (first) determines if the **target qubit** (second) is flipped.

Combined with H, CNOT creates entanglement: H|0⟩ ⊗ |0⟩ → CNOT → Bell state (|00⟩ + |11⟩)/√2`
    },
    {
      keywords: ['quantum computer', 'quantum advantage', 'quantum supremacy', 'nisq'],
      answer: `A **quantum computer** uses quantum mechanical phenomena (superposition, entanglement, interference) to process information.

**Quantum advantage** exists for:
• Integer factoring: Shor's algorithm (exponential speedup vs. classical)
• Unstructured search: Grover's (quadratic speedup)
• Quantum simulation: simulating molecules and materials
• Optimization: QAOA, VQE, quantum annealing

**Current state (2026):** We're in the NISQ (Noisy Intermediate-Scale Quantum) era — 100-1000 qubits but with noise. Fault-tolerant quantum computing requires millions of physical qubits per logical qubit.

Google, IBM, IonQ, and others are racing toward practical quantum advantage.`
    },
    {
      keywords: ['qml', 'quantum machine learning', 'quantum ai', 'quantum neural'],
      answer: `**Quantum Machine Learning (QML)** combines quantum computing with classical ML to tackle problems intractable on classical hardware.

**Key concepts:**
• **PQC (Parameterized Quantum Circuit):** Like neural network weights, these are tunable rotation angles θ in quantum gates optimized by classical algorithms.
• **VQE:** Finds ground state energies of quantum systems — critical for drug discovery and materials science.
• **QAOA:** Solves combinatorial optimization (Max-Cut, scheduling) using alternating cost/mixer unitaries.

The hybrid quantum-classical loop: run the quantum circuit → measure cost → update parameters classically → repeat.

QML is especially promising for quantum chemistry, financial optimization, and anomaly detection.`
    },
    {
      keywords: ['vqe', 'variational quantum eigensolver', 'variational'],
      answer: `**VQE (Variational Quantum Eigensolver)** finds the minimum energy (ground state) of a quantum Hamiltonian.

**The Variational Principle:**
E₀ ≤ ⟨ψ(θ)|H|ψ(θ)⟩

For any trial state |ψ(θ)⟩, the expectation value ≥ true ground state energy E₀.

**So:** Minimize ⟨H⟩ over θ → find E₀!

**Applications:**
• H₂ molecule simulation (already done on real quantum hardware)
• Drug design: protein-ligand binding energies
• Battery materials: lithium cathode optimization

VQE is one of the most practical near-term quantum algorithms — it tolerates noise better than fault-tolerant algorithms.`
    },
    {
      keywords: ['qaoa', 'max-cut', 'combinatorial optimization', 'quantum optimization'],
      answer: `**QAOA (Quantum Approximate Optimization Algorithm)** solves hard combinatorial problems like Max-Cut, graph coloring, and scheduling.

**Structure:**
|γ,β⟩ = U_M(βₚ)U_C(γₚ)...U_M(β₁)U_C(γ₁)|+⟩⊗n

• **Cost Unitary Uᶜ(γ):** Encodes the problem (phase rotations proportional to objective)
• **Mixer Unitary U_M(β):** Creates interference between candidate solutions

With p layers: higher p → better approximation ratio (p→∞ → optimal solution via adiabatic theorem).

**Why it matters:** Unlike Shor/Grover which need fault-tolerant hardware, QAOA is designed for NISQ devices. Could show practical quantum advantage in optimization.`
    },
    {
      keywords: ['teleportation', 'quantum teleportation'],
      answer: `**Quantum Teleportation** transfers an unknown qubit state |ψ⟩ = α|0⟩ + β|1⟩ from Alice to Bob using:
• 1 pre-shared Bell pair (entanglement)
• 2 classical bits

**Protocol:**
1. Alice has |ψ⟩ and one half of a Bell pair
2. Alice performs Bell measurement on her two qubits
3. Alice sends 2 classical bits to Bob
4. Bob applies correction operations (X and/or Z)
5. Bob now has exactly |ψ⟩!

Note: No faster-than-light communication — the 2 classical bits must be sent conventionally. The quantum state itself isn't "moved" — it's recreated at Bob's end.`
    },
    {
      keywords: ['shor', "shor's algorithm", 'factoring', 'rsa'],
      answer: `**Shor's Algorithm** (Peter Shor, 1994) can factor large numbers exponentially faster than classical computers.

**Classical best:** O(e^(n^1/3)) for n-bit numbers (sub-exponential but slow)
**Shor's:** O(n³) — polynomial time!

**Why it matters:** RSA encryption (used in HTTPS, banking) relies on the hardness of factoring. A large fault-tolerant quantum computer could break RSA-2048 in hours.

**Core technique:** Quantum Fourier Transform (QFT) for period finding. The period of f(x) = aˣ mod N reveals the factors of N via classical number theory.

**Timeline:** Breaking RSA-2048 requires ~4000 logical qubits. Currently not feasible, but post-quantum cryptography (CRYSTALS-Kyber) is being standardized now.`
    }
  ],

  init() {
    const sendBtn = document.getElementById('tutorSend');
    const input   = document.getElementById('tutorInput');
    if (sendBtn) sendBtn.addEventListener('click', () => this.send());
    if (input)   input.addEventListener('keydown', e => { if (e.key === 'Enter') this.send(); });
  },

  open() {
    const panel = document.getElementById('tutorPanel');
    if (panel) panel.classList.add('open');
  },

  close() {
    const panel = document.getElementById('tutorPanel');
    if (panel) panel.classList.remove('open');
  },

  send() {
    const input = document.getElementById('tutorInput');
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    this.addMessage(query, 'user');
    this._showTyping();
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      this._removeTyping();
      const answer = this._findAnswer(query);
      this.addMessage(answer, 'bot');
      this._showSuggestedFollowUps(query);
    }, delay);
  },

  askQuestion(q) {
    this.open();
    document.getElementById('tutorInput').value = q;
    this.send();
  },

  addMessage(text, role) {
    const messages = document.getElementById('tutorMessages');
    const div = document.createElement('div');
    div.className = `tutor-msg ${role}`;

    // Enhanced markdown rendering
    const formatted = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(0,212,255,0.1);padding:0.1em 0.3em;border-radius:4px;font-family:var(--font-mono);font-size:0.85em;">$1</code>')
      .replace(/\n\n/g, '</p><p style="margin-top:0.5rem;">')
      .replace(/\n/g, '<br>');
    div.innerHTML = `<p>${formatted}</p>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;

    if (typeof gsap !== 'undefined') {
      gsap.from(div, { opacity:0, y:10, duration:0.3, ease:'power2.out' });
    }
  },

  _showSuggestedFollowUps(query) {
    const q = query.toLowerCase();
    const messages = document.getElementById('tutorMessages');

    // Dynamic follow-up suggestions based on topic
    let followUps = [];
    if (q.includes('qubit') || q.includes('superposition')) {
      followUps = ['How does the Bloch sphere work?', "What is quantum entanglement?", "What is the Hadamard gate?"];
    } else if (q.includes('grover') || q.includes('algorithm')) {
      followUps = ['How does Deutsch-Jozsa work?', "What is Shor's algorithm?", 'What is quantum advantage?'];
    } else if (q.includes('bb84') || q.includes('crypto')) {
      followUps = ['What is quantum teleportation?', "What is Shor's algorithm?", 'What is no-cloning theorem?'];
    } else if (q.includes('vqe') || q.includes('qml') || q.includes('qaoa')) {
      followUps = ['What is a parameterized quantum circuit?', 'How does QAOA work?', 'What is quantum advantage?'];
    }

    if (followUps.length > 0) {
      const suggestDiv = document.createElement('div');
      suggestDiv.className = 'tutor-msg bot';
      suggestDiv.style.cssText = 'background:transparent;padding:0.25rem 0;border:none;box-shadow:none;';
      suggestDiv.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.25rem;">
          ${followUps.map(f => `<button class="tutor-suggestion" style="font-size:0.72rem;padding:0.3rem 0.6rem;" onclick="Tutor.askQuestion('${f}')">${f}</button>`).join('')}
        </div>
      `;
      messages.appendChild(suggestDiv);
      messages.scrollTop = messages.scrollHeight;
    }
  },

  _showTyping() {
    const messages = document.getElementById('tutorMessages');
    const div = document.createElement('div');
    div.className = 'tutor-msg bot';
    div.id = 'typingIndicator';
    // Animated typing dots
    div.innerHTML = `
      <span style="display:inline-flex;gap:4px;align-items:center;">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-cyan);animation:tutorDot 1.2s 0s infinite;"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-cyan);animation:tutorDot 1.2s 0.2s infinite;"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--accent-cyan);animation:tutorDot 1.2s 0.4s infinite;"></span>
      </span>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    if (typeof gsap !== 'undefined') {
      gsap.from(div, { opacity:0, y:8, duration:0.25 });
    }
  },

  _removeTyping() {
    const ind = document.getElementById('typingIndicator');
    if (ind) ind.remove();
  },

  _findAnswer(query) {
    const q = query.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const item of this.knowledge) {
      let score = 0;
      for (const kw of item.keywords) {
        if (q.includes(kw)) score += kw.length;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && bestScore > 2) {
      return bestMatch.answer;
    }

    // Context-aware fallbacks based on current module
    const module = (typeof App !== 'undefined') ? App.currentView : 'home';
    const contextHints = {
      foundations: "Based on your current module (Quantum Foundations), you might want to ask about qubits, superposition, the Bloch sphere, entanglement, or quantum measurement.",
      gates: "In the Gates & Circuits module, try asking about specific gates (H, X, Y, Z, CNOT), their matrices, or how to compose circuits.",
      algorithms: "In the Algorithms module, I can explain Grover's algorithm, Deutsch-Jozsa, Shor's algorithm, or the Quantum Fourier Transform.",
      cryptography: "In Quantum Cryptography, try asking about BB84, QKD, quantum teleportation, or how Shor's algorithm threatens RSA.",
      error: "In Error Correction, ask about the no-cloning theorem, syndrome measurement, the 3-qubit code, or the surface code.",
      qml: "In the Quantum ML module, I can explain PQC, VQE, QAOA, the hybrid quantum-classical loop, or quantum advantage for AI."
    };

    const hint = contextHints[module] || "I'm Qubit, your quantum AI tutor! I can answer questions about qubits, superposition, entanglement, quantum gates, Grover's algorithm, BB84, error correction, VQE, QAOA, and more. What would you like to learn?";

    return hint;
  }

}; // end Tutor
window.Tutor = Tutor;


