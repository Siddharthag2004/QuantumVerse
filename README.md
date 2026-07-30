# QuantumVerse
### An Interactive Quantum Computing Education Platform

**WISER Summer Program 2026 — Final Project Submission**  
**Author:** Siddhartha Gurrapu (solo project)  
**Live Demo:** https://quantumverse-84r8.onrender.com  
**Repository:** https://github.com/Siddharthag2004/QuantumVerse  
**Submission deadline:** August 7, 2026

---

## The Challenge

Quantum computing is one of the most important emerging fields in science and technology, yet it remains inaccessible to most learners. Existing resources tend to fall into two extremes: dense academic textbooks that require advanced physics and linear algebra, or shallow overviews that never build real intuition. Students, developers, and educators need a way to learn quantum concepts interactively — through visualization, simulation, and practice — without installing specialized software or setting up complex development environments.

The challenge was to build a complete, browser-based quantum education platform that teaches from first principles (qubits and superposition) through advanced topics (algorithms, cryptography, error correction, and quantum machine learning), while keeping learners engaged through gamification and immediate feedback.

---

## Your Approach

I approached this as a full-stack educational product rather than a static tutorial site. The platform is structured around six progressive learning modules, each combining conceptual explanations, interactive simulations, and adaptive quizzes. Rather than presenting quantum mechanics as abstract equations alone, every major concept is paired with a hands-on lab — a draggable Bloch sphere, a circuit builder, a step-by-step Grover's algorithm visualizer, or a BB84 key distribution simulator.

Engagement is sustained through an XP and achievement system, a skill radar chart that tracks competency across domains, and an AI tutor ("Qubit") that answers questions in context. Progress persists across sessions via localStorage with optional cloud sync through a Node.js backend and MongoDB Atlas, so learners can create accounts and retain their progress when deployed online.

The design prioritizes zero-install access: open a URL, and the full platform runs in the browser.

---

## Methods

### Platform Architecture

```
QuantumVerse/
├── index.html              App shell and HTML structure
├── style.css               Design system (dark quantum theme)
├── app.js                  Router, XP system, progress, i18n, auth
├── server.js               Express API server (signup, signin, sync)
│
├── modules/                Learning module content and logic
│   ├── foundations.js      Qubits, superposition, Bloch sphere, entanglement
│   ├── gates.js            Gate library, simulator, circuit builder
│   ├── algorithms.js       Grover's and Deutsch-Jozsa visualizers
│   ├── cryptography.js     BB84 protocol and quantum teleportation
│   ├── error-correction.js 3-qubit bit-flip code lab
│   └── qml.js              VQE, QAOA, and quantum ML
│
├── components/             Reusable interactive components
│   ├── bloch-sphere.js     Three.js 3D Bloch sphere
│   ├── circuit-builder.js  Drag-and-drop 4-qubit circuit simulator
│   ├── quiz.js             Adaptive quiz engine
│   ├── ai-tutor.js         Context-aware AI chatbot
│   └── radar-chart.js      Skill visualization chart
│
├── data/
│   ├── quiz-questions.js   100+ quiz questions with explanations
│   └── translations.js     i18n support (EN, ES, FR)
│
└── assets/                 Three.js, Chart.js, GSAP, images
```

### Technologies

| Technology | Purpose |
|---|---|
| HTML5, CSS3, Vanilla JavaScript | Core frontend platform |
| Node.js + Express | Backend API for user accounts and progress sync |
| MongoDB Atlas | Cloud database for persistent user data |
| Three.js | 3D Bloch sphere visualization |
| Chart.js | Probability histograms and skill radar |
| GSAP + ScrollTrigger | Animations and scroll effects |
| Render.com | Production deployment |
| localStorage | Offline progress fallback |

### Educational Methodology

1. **Constructivist learning** — learners explore simulations before receiving formal definitions
2. **Scaffolded progression** — conceptual, mathematical, computational, then assessment within each module
3. **Active learning** — every concept has a corresponding interactive simulator
4. **Gamification** — XP, levels, achievements, and a skill radar chart
5. **AI tutor** — Socratic-style answers available 24/7 across all modules
6. **Multilingual support** — English, Spanish, and French

### Deployment

The app is deployed on Render with MongoDB Atlas for cloud persistence. Run locally with:

```bash
npm install
# Set MONGODB_URI in .env (optional — falls back to localStorage)
node server.js
# Visit http://localhost:8080
```

Or open `index.html` directly for frontend-only use (no account sync).

---

## Results

QuantumVerse delivers a fully functional, deployed quantum education platform with:

| Metric | Value |
|---|---|
| Learning modules | 6 (Foundations, Gates, Algorithms, Cryptography, Error Correction, QML) |
| Lessons | 22 |
| Interactive labs and simulations | 20 |
| Quiz questions | 100+ |
| Languages supported | 3 (EN, ES, FR) |
| Live deployment | https://quantumverse-84r8.onrender.com |

### Key interactive features delivered

- **Bloch Sphere Lab** — Three.js 3D sphere with drag-to-rotate, theta/phi sliders, and gate application
- **Circuit Builder** — 4-qubit drag-and-drop simulator with OpenQASM 2.0 export
- **Grover Visualizer** — Step-by-step amplitude bar animation
- **Deutsch-Jozsa Simulator** — Function-type selection with algorithm animation
- **BB84 and Teleportation** — Full Alice/Bob/Eve protocol simulation
- **QEC Lab** — Bit-flip error injection, syndrome measurement, auto-correction
- **VQE and QAOA Visualizers** — Interactive quantum machine learning optimizers
- **AI Tutor** — Context-aware chat with markdown support
- **User accounts** — Sign up, sign in, and cloud progress sync via MongoDB

After completing the platform, learners can describe qubit states, apply quantum gates, build circuits, analyze Grover's and Deutsch-Jozsa algorithms, simulate BB84 key distribution, understand 3-qubit error correction, and explore VQE and QAOA.

---

## Limitations

- **No real quantum hardware integration** — all simulations run classically in the browser; circuits cannot be executed on IBM Quantum or other providers yet
- **AI tutor is rule-based, not LLM-powered** — responses come from a curated knowledge base, not a live language model API
- **Password storage is plaintext** — suitable for a demo/education project but not production-grade security
- **Render free tier cold starts** — the deployed site can take 50+ seconds to respond after periods of inactivity
- **Limited accessibility testing** — keyboard navigation exists but full WCAG compliance has not been verified
- **Shor's algorithm and surface codes** — planned but not yet implemented
- **Offline account sync** — without the backend running, progress is localStorage-only and device-specific

---

## Individual Contributions

This is a solo project. Siddhartha Gurrapu was solely responsible for:

- **Concept and curriculum design** — defining all six modules, lesson structure, and learning progression from beginner to advanced
- **Frontend development** — entire UI, routing, XP/achievement system, dark/light theme, search, and keyboard shortcuts
- **Interactive simulations** — Bloch sphere, circuit builder, algorithm visualizers, BB84 simulator, error correction lab, VQE/QAOA demos
- **Quiz engine** — 100+ questions with adaptive weak-area tracking and explanatory feedback
- **AI tutor** — knowledge base authoring and chat interface
- **Backend and database** — Express API, MongoDB Atlas integration, user auth and progress sync
- **Deployment** — Render.com setup, environment configuration, and production debugging
- **Content verification** — quantum physics accuracy checked against standard references (Nielsen & Chuang, IBM Qiskit Textbook)

AI coding assistants (Cursor) were used as development tools during implementation. All quantum physics content and architectural decisions were made and verified by the author.

---

## Quick Start

```bash
git clone https://github.com/Siddharthag2004/QuantumVerse.git
cd QuantumVerse
npm install
node server.js
# Visit http://localhost:8080
```

Or visit the live deployment: https://quantumverse-84r8.onrender.com

---

## Modules and Content

| Module | Lessons | Topics | Difficulty |
|---|---|---|---|
| Quantum Foundations | 5 | Qubits, superposition, Bloch sphere, entanglement, measurement | Beginner |
| Gates and Circuits | 4 | Single/multi-qubit gates, matrices, 4-qubit circuit builder | Intermediate |
| Quantum Algorithms | 4 | Deutsch-Jozsa, Grover's search, QFT, quantum speedups | Intermediate |
| Quantum Cryptography | 3 | BB84 protocol, QKD, Quantum Teleportation | Advanced |
| Error Correction | 2 | QEC principles, 3-qubit bit-flip code | Advanced |
| Quantum ML | 4 | Variational circuits, VQE optimizer, QAOA, hybrid networks | Advanced |

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | Full support |
| Firefox 88+ | Full support |
| Safari 14+ | Full support |
| Edge 90+ | Full support |

---

## Future Improvements

- Shor's algorithm visualizer and surface code visualizations
- Qiskit integration for real IBM quantum hardware
- Additional languages (Japanese, Arabic, Hindi)
- LMS integration (SCORM export for Canvas/Moodle)
- Production-grade authentication (hashed passwords, OAuth)

---

## Attribution and Licenses

- Three.js — MIT License — https://threejs.org/
- Chart.js — MIT License — https://www.chartjs.org/
- GSAP — Standard License — https://gsap.com/
- Google Fonts — SIL Open Font License
- Educational content based on publicly available quantum computing literature

---

## Contact

Questions about this project: gurrapusiddhartha2004@gmail.com  
WISER program inquiries: hello@thewiser.org
