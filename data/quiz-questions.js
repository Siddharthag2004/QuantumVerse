// ─── Quiz Questions Database — Enhanced ──────────────────────────────────
const QuizData = {
  foundations: [
    {
      question: "A qubit in the state |ψ⟩ = α|0⟩ + β|1⟩ must satisfy which condition?",
      options: ["|α|² + |β|² = 1", "α + β = 1", "|α| + |β| = 1", "α² + β² = 2"],
      correct: 0,
      explanation: "The normalization condition requires that the sum of squared magnitudes of all amplitudes equals 1. This ensures the total probability of measurement is 100%. So |α|² + |β|² = 1."
    },
    {
      question: "What does the Hadamard gate (H) do to the |0⟩ state?",
      options: ["Leaves it unchanged", "Converts it to |1⟩", "Creates an equal superposition (|0⟩ + |1⟩)/√2", "Creates a phase shift"],
      correct: 2,
      explanation: "H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩, which is an equal superposition of |0⟩ and |1⟩. Each basis state has equal probability of 50% when measured."
    },
    {
      question: "When a qubit in superposition is measured, what happens?",
      options: ["Both 0 and 1 are returned simultaneously", "The superposition is preserved", "The wavefunction collapses to a single classical state (0 or 1)", "The qubit is destroyed"],
      correct: 2,
      explanation: "Measurement causes wavefunction collapse — the qubit jumps to a definite classical state (|0⟩ or |1⟩) with probabilities determined by |α|² and |β|². This is the quantum measurement postulate."
    },
    {
      question: "Which quantum phenomenon allows qubits to be correlated regardless of distance?",
      options: ["Superposition", "Interference", "Decoherence", "Entanglement"],
      correct: 3,
      explanation: "Quantum entanglement links qubits so that measuring one instantly determines the state of the other, regardless of physical distance. Einstein called this 'spooky action at a distance.'"
    },
    {
      question: "On the Bloch sphere, what does the north pole (top) represent?",
      options: ["|1⟩", "|+⟩", "|0⟩", "|−⟩"],
      correct: 2,
      explanation: "By convention, the north pole of the Bloch sphere represents the |0⟩ state (spin up), and the south pole represents |1⟩ (spin down). The equator contains all equal superpositions."
    },
    {
      question: "What is the probability of measuring |0⟩ for the state |ψ⟩ = (3/5)|0⟩ + (4/5)|1⟩?",
      options: ["9/25 = 36%", "3/5 = 60%", "4/5 = 80%", "16/25 = 64%"],
      correct: 0,
      explanation: "P(|0⟩) = |α|² = (3/5)² = 9/25 = 0.36 = 36%. P(|1⟩) = |β|² = (4/5)² = 16/25. Note: 9/25 + 16/25 = 25/25 = 1 (normalization check)."
    },
    {
      question: "The Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 is created by which circuit?",
      options: ["X on q0, then CNOT", "H on q0, then CNOT(q0→q1)", "H on q1, then CNOT(q0→q1)", "CNOT then H"],
      correct: 1,
      explanation: "Applying H to q0 creates (|0⟩+|1⟩)/√2 ⊗ |0⟩. Then CNOT(q0→q1) creates (|00⟩+|11⟩)/√2 — a maximally entangled Bell state."
    },
    {
      question: "What does 'quantum decoherence' refer to?",
      options: ["A qubit getting stuck in state |0⟩", "Unwanted interaction with the environment causing loss of quantum properties", "A gate being applied twice", "The measurement process"],
      correct: 1,
      explanation: "Decoherence occurs when a quantum system interacts with its environment, causing the quantum superposition to effectively collapse. It's the main obstacle to building large scale quantum computers."
    },
    {
      question: "For the state |+⟩ = (|0⟩ + |1⟩)/√2, what is P(|0⟩) and P(|1⟩)?",
      options: ["P(0)=100%, P(1)=0%", "P(0)=75%, P(1)=25%", "P(0)=50%, P(1)=50%", "P(0)=25%, P(1)=75%"],
      correct: 2,
      explanation: "|+⟩ has α = β = 1/√2, so P(|0⟩) = |1/√2|² = 1/2 = 50% and P(|1⟩) = 1/2 = 50%. This is the maximally uncertain state — pure randomness."
    },
    {
      question: "What is quantum parallelism?",
      options: ["Running two classical computers at once", "A qubit processing multiple inputs simultaneously due to superposition", "Using multiple qubits for the same computation", "Parallel classical algorithms"],
      correct: 1,
      explanation: "Quantum parallelism refers to how a quantum system in superposition evaluates a function for all inputs simultaneously. An n-qubit register in superposition can represent 2ⁿ states at once."
    }
  ],

  gates: [
    {
      question: "Which gate is its own inverse (i.e., applying it twice returns to the original state)?",
      options: ["T gate", "S gate", "Hadamard (H) gate", "CNOT gate"],
      correct: 2,
      explanation: "H² = I (identity). Applying H twice returns the qubit to its original state. This is because H is a self inverse unitary matrix — H† = H."
    },
    {
      question: "What is the Pauli-X gate equivalent to classically?",
      options: ["AND gate", "NOT gate (bit flip)", "XOR gate", "NAND gate"],
      correct: 1,
      explanation: "The Pauli-X gate flips |0⟩↔|1⟩, exactly like a classical NOT gate. Its matrix is [[0,1],[1,0]], which swaps the amplitudes of |0⟩ and |1⟩."
    },
    {
      question: "A CNOT gate flips the target qubit when the control qubit is:",
      options: ["Always", "In state |0⟩", "In state |1⟩", "Never"],
      correct: 2,
      explanation: "The CNOT (Controlled NOT) gate applies X to the target only when the control qubit is |1⟩. This is the quantum equivalent of a controlled flip, fundamental to creating entanglement."
    },
    {
      question: "What is the matrix representation of the Hadamard gate?",
      options: ["[[1,0],[0,1]]", "(1/√2)[[1,1],[1,-1]]", "[[0,1],[1,0]]", "[[1,0],[0,-1]]"],
      correct: 1,
      explanation: "H = (1/√2)[[1,1],[1,-1]]. This unitary matrix rotates |0⟩ to |+⟩ and |1⟩ to |−⟩. The 1/√2 normalization ensures the output state is normalized."
    },
    {
      question: "The T gate applies a phase rotation of:",
      options: ["π (180°)", "π/2 (90°)", "π/4 (45°)", "π/8 (22.5°)"],
      correct: 2,
      explanation: "The T gate (also called the π/8 gate) applies a phase of e^(iπ/4) to the |1⟩ component: T = [[1,0],[0,e^(iπ/4)]]. It's essential for universal quantum computation together with H and CNOT."
    },
    {
      question: "What property must all quantum gates satisfy?",
      options: ["They must be reversible (unitary)", "They must increase entropy", "They must have at least 2 inputs", "They must be diagonal matrices"],
      correct: 0,
      explanation: "All quantum gates are unitary (U†U = I), meaning they preserve probability and are reversible. Unlike classical logic gates (like AND), no information is ever lost in a quantum gate."
    },
    {
      question: "Which combination of gates creates a Bell state from |00⟩?",
      options: ["X then CNOT", "H on q0 then CNOT(q0,q1)", "CNOT then H", "Z then SWAP"],
      correct: 1,
      explanation: "H on q0 creates |+0⟩ = (|00⟩+|10⟩)/√2. Then CNOT(q0,q1) creates (|00⟩+|11⟩)/√2 = |Φ⁺⟩, a Bell state."
    },
    {
      question: "The Toffoli gate (CCX) is significant because:",
      options: ["It creates superposition", "It's a 3 qubit gate that enables universal reversible classical computation", "It measures qubits", "It swaps two qubits"],
      correct: 1,
      explanation: "The Toffoli gate flips the target qubit only if both control qubits are |1⟩. Combined with NOT and CNOT, it can implement any classical reversible logic function, making it classically universal."
    }
  ],

  algorithms: [
    {
      question: "What is the key advantage of Grover's algorithm over classical search?",
      options: ["Linear speedup (N/2 steps)", "Exponential speedup", "Quadratic speedup (√N steps)", "Logarithmic speedup"],
      correct: 2,
      explanation: "Grover's algorithm achieves a quadratic speedup: searching N items in O(√N) oracle calls instead of O(N) classically. While not exponential, this is significant for large search spaces."
    },
    {
      question: "The Deutsch Jozsa algorithm determines whether a function is constant or balanced using:",
      options: ["2ⁿ⁻¹ + 1 classical queries", "Exactly 1 query to the quantum oracle", "O(N) operations", "Random sampling"],
      correct: 1,
      explanation: "Deutsch Jozsa solves the problem with just 1 query to the quantum oracle, versus N/2+1 classical queries in the worst case. This was one of the first demonstrations of quantum advantage."
    },
    {
      question: "Which technique is central to Grover's algorithm that amplifies the target state's probability?",
      options: ["Phase kickback", "Quantum Fourier Transform", "Amplitude amplification via the Grover diffusion operator", "Quantum teleportation"],
      correct: 2,
      explanation: "Grover's algorithm uses the Grover diffusion operator (inversion about the mean) to amplify the amplitude of the target state. After O(√N) iterations, the marked item has ~100% measurement probability."
    },
    {
      question: "How many Grover iterations are optimal for searching N = 16 items?",
      options: ["4", "π/4 × √16 ≈ 3", "8", "16"],
      correct: 1,
      explanation: "The optimal number of Grover iterations is approximately π/4 × √N. For N=16: π/4 × √16 = π ≈ 3.14, so ≈3 iterations maximize the probability of finding the target."
    },
    {
      question: "Shor's algorithm achieves which speedup for integer factoring?",
      options: ["Quadratic (√N)", "Polynomial vs. sub-exponential classical", "Exponential speedup", "Linear speedup"],
      correct: 1,
      explanation: "Shor's algorithm factors an n-bit integer in O(n³) quantum operations vs. the best classical sub-exponential algorithms (O(e^(n^1/3))). This exponential gap threatens RSA encryption."
    },
    {
      question: "What is the Quantum Fourier Transform (QFT) used for?",
      options: ["Creating entanglement", "Phase estimation and period finding (Shor's algorithm, QPE)", "Error correction", "Amplitude amplification"],
      correct: 1,
      explanation: "The QFT is the quantum analogue of the discrete Fourier transform and is a core subroutine in Shor's algorithm, quantum phase estimation, and many other quantum algorithms."
    }
  ],

  cryptography: [
    {
      question: "In BB84, why is eavesdropping detectable?",
      options: ["The eavesdropper leaves a digital signature", "Measuring a quantum state disturbs it, introducing detectable errors", "The encryption key is never transmitted", "Classical error checking catches it"],
      correct: 1,
      explanation: "By the no cloning theorem, an eavesdropper cannot copy an unknown quantum state. Measuring it disturbs the qubit, causing detectable statistical anomalies in the QBER (quantum bit error rate)."
    },
    {
      question: "What does 'quantum key distribution' (QKD) guarantee?",
      options: ["Faster encryption than RSA", "Unconditional security based on physics laws, not computational hardness", "Infinite key length", "Secure communication over any classical channel"],
      correct: 1,
      explanation: "QKD provides information-theoretic security. Its security is guaranteed by quantum mechanics (no cloning theorem, measurement disturbance) — not by computational assumptions like RSA or AES."
    },
    {
      id: "c2",
      question: "What makes Quantum Key Distribution (QKD) provably secure?",
      options: ["Complexity of factoring large primes", "Laws of quantum mechanics (no cloning & measurement disturbance)", "AES-256 encryption", "Public key infrastructure"],
      correct: 1,
      explanation: "QKD provides information-theoretic security. Its security is guaranteed by quantum mechanics (no cloning theorem, measurement disturbance) — not by computational assumptions like RSA or AES."
    },
    {
      id: "c3",
      question: "What is Post-Quantum Cryptography (PQC)?",
      options: ["Quantum key distribution using hardware", "Classical cryptographic algorithms resistant to quantum attacks", "A type of quantum gate", "An error-correcting code"],
      correct: 1,
      explanation: "PQC refers to new classical cryptographic algorithms (lattice-based, code-based) that run on standard computers but are mathematically secure against quantum computers."
    },
    {
      id: "c4",
      question: "The no cloning theorem states that:",
      options: ["Quantum computers cannot be cloned", "It is impossible to create an exact copy of an arbitrary unknown quantum state", "All qubits must be identical", "Qubits can be cloned if cold enough"],
      correct: 1,
      explanation: "The no cloning theorem (1982, Wootters & Zurek) proves it's impossible to make a perfect copy of an unknown quantum state. This is fundamental to QKD security — Eve cannot clone qubits without detection."
    },
    {
      id: "c5",
      question: "Why does Shor's algorithm threaten current internet security?",
      options: ["It bypasses firewalls", "It efficiently factors large integers and computes discrete logarithms, breaking RSA and ECC", "It crashes classical servers", "It clones private keys"],
      correct: 1,
      explanation: "Shor's algorithm can break RSA and ECC by efficiently factoring large integers and computing discrete logarithms — tasks that underpin these classical cryptosystems. A fault tolerant quantum computer would render them insecure."
    }
  ],

  error: [
    {
      id: "e1",
      question: "Why can't quantum error correction simply make copies of qubits like classical repetition codes?",
      options: ["It's too computationally expensive", "The no cloning theorem forbids copying unknown quantum states", "There isn't enough memory", "We can — quantum states can be copied freely"],
      correct: 1,
      explanation: "The no cloning theorem (1982, Wootters & Zurek) proves it's impossible to create an identical copy of an arbitrary unknown quantum state. This forces quantum error correction to use entanglement instead."
    },
    {
      id: "e2",
      question: "The 3 qubit bit flip code encodes 1 logical qubit into 3 physical qubits. This corrects:",
      options: ["Any error on all 3 qubits", "Phase flip errors", "A single bit flip error on any one of the 3 qubits", "Decoherence on all qubits"],
      correct: 2,
      explanation: "The 3 qubit repetition code can detect and correct a bit flip on any single qubit by using majority voting: if one qubit differs from the other two, it was flipped and can be corrected."
    },
    {
      id: "e3",
      question: "In the 3 qubit bit flip code, the syndrome for 'no error' is:",
      options: ["s₁=1, s₂=0", "s₁=0, s₂=0", "s₁=1, s₂=1", "s₁=0, s₂=1"],
      correct: 1,
      explanation: "The syndrome bits are s₁ = q₀⊕q₁ and s₂ = q₁⊕q₂. If all qubits agree (no error), all parity checks give 0, so s₁=0, s₂=0. Any non zero syndrome pinpoints the erroneous qubit."
    },
    {
      id: "e4",
      question: "Which quantum error correction code can handle both bit flip AND phase flip errors?",
      options: ["3 qubit repetition code", "Shor code (9 qubits)", "Classical parity code", "Hadamard code"],
      correct: 1,
      explanation: "The Shor code uses 9 physical qubits to encode 1 logical qubit and can correct both bit flip (X) and phase flip (Z) errors. It combines a 3 qubit bit flip code and a 3 qubit phase flip code."
    }
  ],

  qml: [
    {
      question: "What is a Parameterized Quantum Circuit (PQC)?",
      options: ["A circuit with fixed, non adjustable gates", "A quantum circuit with trainable rotation angle parameters θ₁, θ₂, ...", "A classical neural network running on quantum hardware", "A circuit that only measures in the computational basis"],
      correct: 1,
      explanation: "A PQC (also called an Ansatz) contains rotation gates with tunable parameters θ that are optimized by a classical optimizer. This is the quantum analogue of neural network weights — the core of variational quantum algorithms."
    },
    {
      id: "q2",
      question: "What is the primary optimization objective of the Variational Quantum Eigensolver (VQE)?",
      options: ["Maximizing execution speed", "Minimizing the expectation value ⟨ψ(θ)|H|ψ(θ)⟩ to find the ground state energy", "Sorting quantum states", "Correcting bit flip errors"],
      correct: 1,
      explanation: "VQE uses the variational principle: ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀. By minimizing the expectation value of the Hamiltonian over circuit parameters θ, VQE finds the ground state energy — essential for quantum chemistry."
    },
    {
      id: "q3",
      question: "Which type of problem is QAOA (Quantum Approximate Optimization Algorithm) specifically designed to solve?",
      options: ["Linear systems of equations", "Combinatorial optimization problems (like Max-Cut)", "Quantum error correction", "Quantum key distribution"],
      correct: 1,
      explanation: "QAOA targets NP-hard combinatorial optimization problems (Max-Cut, portfolio optimization, scheduling). It uses alternating Cost and Mixer unitaries parameterized by γ and β to approximate the optimal solution."
    },
    {
      question: "What is the 'quantum classical hybrid loop' in VQE?",
      options: ["Using quantum gates inside a classical algorithm", "Running U(θ) on quantum hardware, measuring cost, then updating θ on a classical optimizer", "Alternating between two quantum computers", "A feedback loop between two qubits"],
      correct: 1,
      explanation: "The hybrid loop: (1) prepare |ψ(θ)⟩ on quantum hardware, (2) measure ⟨H⟩, (3) send cost to classical optimizer, (4) optimizer updates θ, (5) repeat. This leverages quantum hardware while offloading optimization classically."
    },
    {
      question: "The variational principle guarantees that:",
      options: ["Any trial state gives the exact ground state energy", "⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀ for any state |ψ(θ)⟩", "VQE always converges to the global minimum", "QAOA is faster than Grover's algorithm"],
      correct: 1,
      explanation: "The variational principle (from quantum mechanics) states that the expectation value of the Hamiltonian for any trial state is always ≥ the true ground state energy E₀. This means minimizing ⟨H⟩ over all θ finds E₀."
    }
  ]
};
window.QuizData = QuizData;


