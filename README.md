# QuantumVerse 🌌
### An Interactive Quantum Computing Education Platform

> **Quantum Education Platform 2026**  
> A browser-based, gamified, AI-assisted quantum computing learning experience.

---

## 🚀 Quick Start

**No installation required.** Just open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

```bash
# Option 1: Open directly
open index.html       # macOS
start index.html      # Windows

# Option 2: Serve locally (recommended for all features)
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

---

## 🎯 Target Audience

| Audience | Background Needed |
|---|---|
| Undergraduate students | Basic linear algebra, complex numbers |
| Software developers | Programming experience |
| Graduate researchers | Technical background, exploring quantum |
| Educators | Teaching quantum computing concepts |
| Career transitioners | STEM background helpful, not required |

**Difficulty progression:** Beginner → Intermediate → Advanced, across all 5 modules.

---

## 📚 Learning Objectives

After completing QuantumVerse, learners will be able to:

1. **Describe** what a qubit is and how it differs from a classical bit
2. **Visualize** qubit states on the Bloch sphere and interpret θ, φ angles
3. **Explain** quantum superposition, entanglement, and interference
4. **Apply** quantum gates (H, X, Y, Z, S, T, CNOT) and compute state transformations
5. **Build** simple quantum circuits and predict measurement outcomes
6. **Analyze** Grover's and Deutsch-Jozsa algorithms step by step
7. **Simulate** the BB84 quantum key distribution protocol
8. **Understand** why quantum error correction is needed and how the 3-qubit code works
9. **Explore** Quantum Machine Learning (QML), VQE, and QAOA
10. **Analyze** advanced protocols like Quantum Fourier Transform (QFT) and Quantum Teleportation

---

## 🏗️ Architecture

```
QuantumVerse/
├── index.html              ← App shell, HTML structure
├── style.css               ← Complete design system (dark quantum theme)
├── app.js                  ← Router, XP system, progress, i18n, localStorage
│
├── modules/                ← Learning module content & logic
│   ├── foundations.js      ← Qubits, superposition, Bloch, entanglement, measurement
│   ├── gates.js            ← Gate library, simulator, circuit builder integration
│   ├── algorithms.js       ← Grover's & Deutsch-Jozsa interactive visualizers
│   ├── cryptography.js     ← BB84 protocol simulator & Quantum Teleportation
│   ├── error-correction.js ← 3-qubit bit-flip code lab
│   └── qml.js              ← Quantum Machine Learning (VQE, QAOA)
│
├── components/             ← Reusable interactive components
│   ├── bloch-sphere.js     ← Three.js 3D Bloch sphere (drag-to-rotate)
│   ├── circuit-builder.js  ← Drag-and-drop 4-qubit circuit simulator with QASM export
│   ├── quiz.js             ← Adaptive quiz engine with weak-area tracking
│   ├── ai-tutor.js         ← Context-aware AI chatbot with markdown & typing animation
│   ├── radar-chart.js      ← Chart.js skill visualization radar chart
│   └── vqa-visualizer.js   ← VQA optimizer visualizer (built into QML module)
│
└── data/
    ├── quiz-questions.js   ← 100+ quiz questions with explanations
    └── translations.js     ← i18n support (EN, ES, FR)
```

---

## 🎓 Educational Methodology

### 1. Constructivist Learning
Each module introduces concepts through exploration before formal definition — learners discover behaviors by interacting with simulations, then receive the mathematical formalization.

### 2. Scaffolded Progression
Content difficulty increases within each module:
- **Level 1 (Conceptual):** Intuitive explanation, analogies
- **Level 2 (Mathematical):** State notation, matrices, equations
- **Level 3 (Computational):** Interactive simulation, parameter exploration
- **Level 4 (Assessment):** Quiz with immediate explanatory feedback

### 3. Active Learning via Simulation
Every concept has a corresponding interactive simulator:
- Superposition → Probability amplitude slider
- Bloch Sphere → Drag-to-rotate 3D visualization with θ/φ controls
- Circuit gates → Real-time matrix display + state update
- Grover's algorithm → Step-by-step amplitude bar animation
- BB84 → Full Alice-Bob-Eve simulation with QBER display

### 4. Gamification (XP + Achievements)
- **XP System:** Earn XP for completing lessons (+10–50), quizzes (+50/question), and labs (+25–40)
- **Levels:** 6 levels from Quantum Novice to Quantum Architect
- **Achievements:** Unlocked by module completion, perfect scores, and interaction milestones
- **Skill Radar:** Visual tracking of competency in different quantum domains
- **Progress Tracking:** Persistent via localStorage across sessions

### 5. AI Tutor (Qubit)
A context-aware chatbot with markdown support, typing animations, and comprehensive knowledge spanning all modules. Provides instant, Socratic-style answers to student questions 24/7.

### 6. Multilingual Support
Interface and navigation available in English, Spanish (ES), and French (FR).

---

## 🛠️ Technologies Used

| Technology | Purpose | License |
|---|---|---|
| HTML5, CSS3, Vanilla JS | Core platform | N/A |
| [Three.js r128](https://threejs.org/) | 3D Bloch sphere | MIT |
| [Chart.js 4.4](https://www.chartjs.org/) | Probability histograms | MIT |
| [Google Fonts](https://fonts.google.com/) | Inter, Space Grotesk, JetBrains Mono | SIL OFL |
| CSS Glassmorphism | Visual design system | N/A |
| localStorage API | Progress persistence | N/A |

**No backend required.** Runs entirely in the browser.

---

## 📊 Modules & Content

| Module | Lessons | Topics | Difficulty |
|---|---|---|---|
| ⚛️ Quantum Foundations | 5 | Qubits, superposition, Bloch sphere, entanglement, measurement | Beginner |
| 🔧 Gates & Circuits | 4 | Single/multi-qubit gates, matrices, 4-qubit circuit builder | Intermediate |
| 🧮 Quantum Algorithms | 4 | Deutsch-Jozsa, Grover's search, QFT, quantum speedups | Intermediate |
| 🔐 Quantum Cryptography | 3 | BB84 protocol, QKD, Quantum Teleportation | Advanced |
| 🛡️ Error Correction | 2 | QEC principles, 3-qubit bit-flip code | Advanced |
| 🤖 Quantum ML | 4 | Variational circuits, VQE optimizer, QAOA, hybrid networks | Advanced |

**Total: 22 lessons, 20 interactive labs/simulations, 100+ quiz questions**

---

## 🎮 Interactive Features

1. **Bloch Sphere** — Three.js 3D sphere, drag to rotate, sliders for θ/φ, click preset states
2. **Circuit Builder** — 4-qubit drag-and-drop simulator with OpenQASM 2.0 export
3. **VQE & QAOA Visualizers** — Interactive optimizers for Quantum Machine Learning
4. **Grover Visualizer** — Amplitude bar chart animating over iterations, step/auto-run modes
5. **Deutsch-Jozsa Simulator** — Select function type, step through algorithm animation
6. **BB84 & Teleportation** — Full Alice/Bob/Eve simulation and quantum state transfer
7. **QEC Lab** — Inject bit-flip errors, trigger syndrome measurement, watch auto-correction
8. **Measurement Simulator** — Repeated measurement with history tracking
9. **Skill Radar Chart** — Dynamic visualization of learning progress across 5 domains
10. **AI Tutor** — Context-aware chat with markdown support for instant explanations

---

## 🌍 Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |

---

## 📈 Future Improvements & Scalability

### Short Term (v1.2)
- [ ] Shor's algorithm visualizer
- [ ] Surface code visualizations

### Medium Term (v2.0)
- [ ] **Qiskit Integration**: Run circuits on real IBM quantum hardware
- [ ] **More Languages**: Japanese, Arabic, Hindi
- [ ] **Lecture Videos**: Embedded animated explainers
- [ ] **Collaborative Mode**: Share circuits with other learners
- [ ] **Assessment Dashboard**: Educator view of class progress

### Long Term (v3.0)
- [ ] **VR Mode**: WebXR Bloch sphere exploration
- [ ] **LMS Integration**: SCORM export for Canvas/Moodle
- [ ] **Community Circuits**: Share/remix quantum circuits

---

## 🏆 Judging Criteria Alignment

| Criterion | Implementation |
|---|---|
| **Educational Impact** | 5 modules, 16 lessons, constructivist pedagogy, scaffolded difficulty |
| **Technical Accuracy** | Correct quantum math (normalization, unitary matrices, syndrome measurement) |
| **Creativity** | Gamification, AI tutor, animated Bloch sphere, step-by-step algorithm visualization |
| **User Engagement** | XP system, achievements, interactive simulations, instant feedback |
| **Implementation Quality** | Modular architecture, responsive design, localStorage persistence |
| **Documentation** | This README, in-app tooltips, AI tutor, math annotations |
| **Adoption Potential** | Zero install, open source, multilingual, educator-ready |
| **Scalability** | Module system allows new topics without architecture changes |

---

## 📄 Attribution & Licenses

- Three.js — MIT License — https://threejs.org/
- Chart.js — MIT License — https://www.chartjs.org/
- Google Fonts — SIL Open Font License
- Educational content based on publicly available quantum computing literature and quantum curriculum materials

**AI Disclosure:** This platform was built with AI coding assistance (Google Antigravity). All quantum physics content was verified against standard quantum computing textbooks (Nielsen & Chuang, IBM Qiskit Textbook). The AI tutor knowledge base was authored and verified by the team.

---

## 👥 Team

Built for the **Quantum Education Platform 2026**  
Submission deadline: August 7, 2026

---

## 📧 User Guide

### Getting Started
1. Open `index.html` — watch the quantum splash animation
2. Click **"Start Learning →"** or any module card from the home screen
3. Navigate lessons via the tab bar within each module
4. **Interact** with every simulator — drag sliders, click buttons, drag gates
5. Click **"Start Quiz →"** at the bottom of each module to test your knowledge
6. Click **"🤖 AI Tutor"** in the top bar to ask questions anytime

### Earning XP & Achievements
- Complete lessons: +10 XP per lesson tab visited
- Run circuit simulations: +25 XP
- Quiz questions correct: +50 XP
- Module completion: +100 XP
- Watch achievements appear as toast notifications!

### Progress is Saved
All your progress, XP, and achievements are automatically saved to your browser's localStorage. Return anytime to continue where you left off.
