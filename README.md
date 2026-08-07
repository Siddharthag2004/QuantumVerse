# QuantumVerse

### An Interactive Quantum Computing Education Platform

* **WISER Summer Program 2026 — Final Project Submission**
* **Author:** Siddhartha Gurrapu (solo project)
* **Live Demo:** https://quantumverse-84r8.onrender.com
* **Repository:** https://github.com/Siddharthag2004/QuantumVerse
* **Demo Video:** https://drive.google.com/file/d/1v0gj3ri5rUwTt2tDp4UCbYZNZn61_Q0o/view?usp=sharing
---

## Why I Built This

Quantum computing is one of the most important emerging fields in tech, but most of the material out there is either a dense textbook full of linear algebra or a shallow blog post that never really builds intuition. I wanted to build something in between a place where someone could open a browser, no installs, no setup, and actually *play* with quantum concepts until they click.

That's what QuantumVerse is: a full browser based platform that takes a learner from the very basics (what even is a qubit) all the way up to algorithms, cryptography, error correction, and quantum machine learning through simulations, visual labs, and quizzes rather than just reading.

---

## Target Audience

QuantumVerse is built for:

- **Undergraduate students** encountering quantum computing for the first time, who need visual intuition before the math
- **Self taught developers** who want to learn quantum concepts through code and interaction rather than a physics course
- **Educators** looking for a ready to use interactive resource they can point students to without setting up software
- **Anyone curious about quantum computing** who wants a low barrier, zero install way to explore the field

No prior quantum physics background is assumed the Foundations module starts from scratch.

---

## Learning Objectives

By the end of the platform, a learner should be able to:

1. Describe a qubit state and explain superposition using the Bloch sphere
2. Apply single qubit and multi qubit gates and predict their effect on a circuit
3. Build and simulate a quantum circuit using the drag and drop circuit builder
4. Explain and trace through Grover's algorithm and the Deutsch Jozsa algorithm
5. Understand the BB84 quantum key distribution protocol and quantum teleportation
6. Explain how 3 qubit bit-flip error correction detects and fixes errors
7. Understand the basic structure of VQE and QAOA and how variational circuits are used in quantum ML

---

## My Approach / Educational Methodology

I treated this as a full product, not a static tutorial page. The platform is organized into six progressive modules, and every module pairs a conceptual explanation with a hands on lab with a draggable Bloch sphere, a circuit builder, a step by step Grover's visualizer, a BB84 simulator, and so on.

The teaching approach I followed:

1. **Constructivist learning** — learners explore the simulation first, then get the formal definition, rather than the other way around
2. **Scaffolded progression** — each module moves from conceptual → mathematical → computational → assessment
3. **Active learning** — every concept has a matching interactive simulator, not just a diagram
4. **Gamification** — XP, levels, achievements, and a skill radar chart to keep learners motivated and show them where they're weak
5. **An AI tutor ("Qubit")** — answers contextual questions as learners work through modules

Progress is only saved for learners who create an account — signing up syncs XP, level, and lesson progress to MongoDB Atlas through the Node.js backend. Without an account, progress isn't retained between sessions.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5, CSS3, Vanilla JavaScript | Core frontend platform |
| Node.js + Express | Backend API for accounts and progress sync |
| MongoDB Atlas | Cloud database for persistent user data |
| Three.js | 3D Bloch sphere visualization |
| Chart.js | Probability histograms and the skill radar chart |
| GSAP + ScrollTrigger | Animations and scroll effects |
| Render.com | Production deployment |

---

## Project Structure

```
QuantumVerse/
├── index.html              App shell and HTML structure
├── style.css               Design system (dark quantum theme)
├── app.js                  Router, XP system, progress tracking, auth
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
│   └── quiz-questions.js   100+ quiz questions with explanations
│
└── assets/                 Three.js, Chart.js, GSAP, images
```

---

## Installation and Execution Instructions

**Option 1 — Just use the live demo:**
Visit https://quantumverse-84r8.onrender.com — nothing to install.

**Option 2 — Run it locally:**

```bash
git clone https://github.com/Siddharthag2004/QuantumVerse.git
cd QuantumVerse
npm install
node server.js
# Visit http://localhost:8080
```

Progress is now account-based only, so you'll need a working `MONGODB_URI` in a `.env` file for signup/signin and progress sync to actually work. Without it, sign-up will fail and progress won't be saved.

**Option 3 — Frontend only, no backend at all:**
Just open `index.html` directly in a browser. Every module, simulator, and quiz runs fine, but since accounts require the backend, no progress will be saved in this mode.

---

## User Guide (Quick Start)

1. Open the live demo (or run it locally) and land on the home screen.
2. Pick a module from the six available I'd recommend starting with **Quantum Foundations** if you're new to this.
3. Read through the short conceptual explanation, then jump into the interactive lab for that lesson (e.g., drag the Bloch sphere, apply a gate, watch what happens).
4. Take the quiz at the end of each lesson it adapts based on which areas you're weaker in.
5. Watch your XP, level, and skill radar chart update as you go this is meant to show you where you're strong and where to focus next.
6. Create an account to save your progress — XP, levels, and lesson completion only persist once you sign up. Without an account, progress won't carry over between sessions.
7. Chat with "Qubit," the built in tutor, any time you get stuck on a concept.

---

## Key Interactive Features

- **Bloch Sphere Lab** — 3D sphere (Three.js) with drag to rotate, theta/phi sliders, and gate application
- **Circuit Builder** — 4-qubit drag and drop simulator
- **Grover Visualizer** — step by step amplitude bar animation
- **Deutsch-Jozsa Simulator** — function type selection with algorithm animation
- **BB84 and Teleportation** — full Alice/Bob/Eve protocol simulation
- **QEC Lab** — bit flip error injection, syndrome measurement, auto correction
- **VQE and QAOA Visualizers** — interactive quantum ML optimizers
- **AI Tutor** — context aware chat with markdown support
- **User accounts** — sign up, sign in, and cloud progress sync via MongoDB

### Results Snapshot

| Metric | Value |
|---|---|
| Learning modules | 6 (Foundations, Gates, Algorithms, Cryptography, Error Correction, QML) |
| Lessons | 22 |
| Interactive labs and simulations | 20 |
| Quiz questions | 100+ |
| Live deployment | https://quantumverse-84r8.onrender.com |

---

## Limitations

- **No real quantum hardware integration** — all simulations run classically in the browser; circuits can't yet be run on IBM Quantum or similar providers
- **AI tutor is rule based, not LLM-powered** — it answers from a curated knowledge base, not a live language model
- **Password storage is plaintext** — fine for a demo/education project, not production grade security
- **Render free tier cold starts** — the deployed site can take 50+ seconds to wake up after inactivity
- **Limited accessibility testing** — keyboard navigation exists, but I haven't fully verified WCAG compliance
- **Shor's algorithm and surface codes** — planned but not implemented yet
- **No offline progress** — progress only saves through an account; if the backend or MongoDB connection isn't available, progress isn't saved at all

---

## Future Improvements and Scalability

- Add a Shor's algorithm visualizer and surface code visualizations
- Integrate Qiskit so circuits can actually run on real IBM Quantum hardware, not just a classical simulator
- Move to production-grade authentication (hashed passwords, OAuth) so it's safe to scale beyond a class demo
- Add SCORM export / LMS integration (Canvas, Moodle) so educators can drop this straight into an existing course
- Add lightweight analytics on quiz performance so educators can see where a whole class is struggling, not just an individual learner
- Because the frontend runs entirely client side and the backend is a thin optional layer, the platform can scale to many concurrent learners just by scaling the Render/MongoDB tier no architectural rework needed for growth

---

## Team Contributions

This is a solo submission  I'm a one person team, so every part of the project below is my own work:

- **Concept and curriculum design** — defining all six modules, lesson structure, and the learning progression from beginner to advanced
- **Frontend development** — the entire UI, routing, XP/achievement system, dark/light theme, and navigation
- **Interactive simulations** — the Bloch sphere, circuit builder, algorithm visualizers, BB84 simulator, error correction lab, and VQE/QAOA demos
- **Quiz engine** — 100+ questions with adaptive weak area tracking and explanatory feedback
- **AI tutor** — knowledge base authoring and the chat interface
- **Backend and database** — the Express API, MongoDB Atlas integration, and user auth/progress sync
- **Deployment** — Render.com setup, environment configuration, and production debugging
- **Content verification** — checked all quantum physics content against standard references (Nielsen & Chuang, IBM Qiskit Textbook)

---

## Use of AI Tools

I used an AI coding assistant (Cursor) during implementation to speed up parts of the frontend and boilerplate. All quantum physics content, module design, and architectural decisions were made and verified by me I checked the physics against standard references (Nielsen & Chuang, and the IBM Qiskit Textbook) to make sure nothing technically incorrect slipped through.

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
