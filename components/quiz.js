// ─── Quiz Engine Component ────────────────────────────────────────────────
const Quiz = {
  state: null,

  questionCounts: {
    foundations: 5,
    gates: 4,
    algorithms: 3,
    cryptography: 2,
    error: 2,
    qml: 2
  },

  launch(module) {
    if (typeof App !== 'undefined' && !App.isModuleRead(module)) {
      const requiredCounts = { foundations: 5, gates: 4, algorithms: 4, cryptography: 2, error: 2, qml: 4 };
      const req = requiredCounts[module] || 3;
      const read = App.visitedLessons[module] ? App.visitedLessons[module].length : 0;
      
      const modal = document.getElementById('quizModal');
      modal.classList.add('open');
      
      const container = document.getElementById('quizContainer');
      container.innerHTML = `
        <div style="text-align:center; padding:2rem 1.5rem;">
          <div style="color:var(--accent-pink); margin-bottom:1.5rem; display:flex; justify-content:center;">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 style="font-family:'Space Grotesk',sans-serif; font-weight:800; margin-bottom:0.75rem; color:var(--accent-pink);">Quiz Locked</h2>
          <p style="color:var(--text-secondary); margin-bottom:1.5rem; line-height:1.6; font-size:0.9rem;">
            Please read all concepts and interactive tabs in this module before taking the quiz!
          </p>
          <div style="background:var(--bg-secondary); border:1px solid var(--border); border-radius:var(--radius); padding:1rem; margin-bottom:2rem; font-size:0.85rem;">
            <strong>Concepts Viewed:</strong> ${read} / ${req} completed
          </div>
          <button class="btn-primary" onclick="Quiz.close()" style="padding:0.6rem 2rem; width:100%;">Go Back</button>
        </div>
      `;
      
      if (typeof gsap !== 'undefined') {
        gsap.fromTo('#quizContainer',
          { scale:0.92, opacity:0, y:20 },
          { scale:1, opacity:1, y:0, duration:0.35, ease:'back.out(1.5)' }
        );
      }
      return;
    }

    let questions = QuizData[module];
    if (!questions || questions.length === 0) return;

    // Dynamically sample (shuffle and slice) to expected question count
    const limit = this.questionCounts[module] || 3;
    questions = [...questions]
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);

    this.state = {
      module,
      questions,
      current: 0,
      score: 0,
      answered: false
    };

    const modal = document.getElementById('quizModal');
    modal.classList.add('open');
    this._renderQuestion();

    // GSAP entrance
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('#quizContainer',
        { scale:0.92, opacity:0, y:20 },
        { scale:1, opacity:1, y:0, duration:0.35, ease:'back.out(1.5)' }
      );
    }
  },

  _renderQuestion() {
    const { state } = this;
    const q = state.questions[state.current];
    const container = document.getElementById('quizContainer');
    const progress = (state.current / state.questions.length) * 100;
    const labels = ['A', 'B', 'C', 'D'];
    const T = (k) => App.t(k);

    const isLast = state.current === state.questions.length - 1;
    const nextLabel = isLast ? T('quiz_see_results') : T('quiz_next');

    const moduleLabels = {
      foundations: 'Quantum Foundations', gates: 'Gates & Circuits',
      algorithms: 'Algorithms', cryptography: 'Cryptography',
      error: 'Error Correction', qml: 'Quantum ML'
    };
    const moduleLabel = moduleLabels[state.module] || state.module;

    container.innerHTML = `
      <div class="quiz-header">
        <div>
          <div class="quiz-header-title">${moduleLabel}</div>
          <div style="font-size:1rem;font-weight:800;margin-top:1px;">${T('quiz_modal_title')}</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="quiz-progress-text">${state.current + 1} <span style="opacity:0.4">/</span> ${state.questions.length}</div>
          <button onclick="Quiz.close()"
            style="background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--text-muted);width:30px;height:30px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;"
            onmouseover="this.style.borderColor='var(--accent-pink)';this.style.color='var(--accent-pink)'"
            onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-muted)'">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" id="quizProgFill" style="width:${progress}%"></div>
      </div>
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" data-idx="${i}" onclick="Quiz.answer(${i})" id="quiz-opt-${i}">
            <span class="quiz-option-label">${labels[i]}</span>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="quizExplanation">
        <strong style="color:var(--accent-blue);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;">Explanation</strong>
        <div style="margin-top:0.35rem;">${q.explanation}</div>
      </div>
      <div class="quiz-actions">
        <button class="quiz-next-btn" id="quizNextBtn" onclick="Quiz.next()">
          ${nextLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    `;
    state.answered = false;

    // ★ Key fix: stagger:0 so all 4 options pop in simultaneously — no lag
    if (typeof gsap !== 'undefined') {
      gsap.from('.quiz-option', {
        opacity: 0, y: 14, scale: 0.97,
        duration: 0.28, stagger: 0,
        ease: 'power2.out', clearProps: 'all'
      });
      gsap.from('.quiz-question', {
        opacity: 0, y: -8, duration: 0.25, ease: 'power2.out', clearProps: 'all'
      });
    }
  },

  answer(idx) {
    if (this.state.answered) return;
    this.state.answered = true;
    const q = this.state.questions[this.state.current];
    const opts = document.querySelectorAll('.quiz-option');

    opts[q.correct].classList.add('correct');
    if (idx !== q.correct) {
      opts[idx].classList.add('wrong');
    } else {
      this.state.score++;
      App.addXP(50);
    }

    opts.forEach(o => o.style.pointerEvents = 'none');

    const expEl  = document.getElementById('quizExplanation');
    const nextBtn = document.getElementById('quizNextBtn');
    expEl.classList.add('show');
    nextBtn.classList.add('show');

    if (typeof gsap !== 'undefined') {
      gsap.from('#quizExplanation', { opacity:0, y:8, duration:0.3, ease:'power2.out' });
      gsap.from('#quizNextBtn',     { opacity:0, y:6, duration:0.25, delay:0.1, ease:'power2.out' });
    }
  },

  next() {
    this.state.current++;
    if (this.state.current >= this.state.questions.length) {
      this._renderResults();
    } else {
      if (typeof gsap !== 'undefined') {
        gsap.to('#quizContainer', { opacity:0, x:10, duration:0.2, ease:'power2.in',
          onComplete: () => {
            this._renderQuestion();
            gsap.fromTo('#quizContainer',
              { opacity:0, x:-10 },
              { opacity:1, x:0, duration:0.25, ease:'power2.out', clearProps:'all' }
            );
          }
        });
      } else {
        this._renderQuestion();
      }
    }
  },

  _renderResults() {
    const { state } = this;
    const pct = Math.round((state.score / state.questions.length) * 100);
    const passed = pct >= 60;
    const T = (k) => App.t(k);

    const grade = pct >= 80 ? T('quiz_excellent') : pct >= 60 ? T('quiz_passed') : T('quiz_fail');
    let visualIcon = '';
    if (pct >= 80) {
      visualIcon = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 1 6 6v3.5c0 1.66-1.34 3-3 3H9a3 3 0 0 1-3-3V8a6 6 0 0 1 6-6z"/></svg>`;
    } else if (pct >= 60) {
      visualIcon = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
      visualIcon = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
    }

    const moduleNames = {
      foundations: T('nav_foundations'), gates: T('nav_gates'),
      algorithms:  T('nav_algorithms'), cryptography: T('nav_cryptography'),
      error: T('nav_error'), qml: T('nav_qml') || 'Quantum ML'
    };

    const container = document.getElementById('quizContainer');
    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji" style="margin-bottom:1rem; min-height:48px; display:flex; align-items:center; justify-content:center;">${visualIcon}</div>
        <div class="quiz-result-score${!passed ? ' fail' : ''}">${pct}%</div>
        <div class="quiz-result-grade">${grade}</div>
        <div class="quiz-result-sub">${state.score} / ${state.questions.length} correct</div>

        <div style="display:flex;gap:5px;justify-content:center;margin:1rem 0 0.4rem;">
          ${state.questions.map((_, i) =>
            `<div style="width:28px;height:7px;border-radius:4px;background:${i < state.score ? '#10b981' : '#ef4444'};opacity:0.82;transition:all 0.3s;"></div>`
          ).join('')}
        </div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.25rem;">
          ${state.score} correct &nbsp;·&nbsp; ${state.questions.length - state.score} incorrect
        </div>

        <div class="quiz-result-tip ${passed ? 'pass' : 'fail'}">
          ${!passed
            ? `<strong>Tip:</strong> ${T('quiz_tip')}`
            : `<strong>${moduleNames[state.module]}</strong> ${T('quiz_updated')}`
          }
        </div>

        <div class="quiz-result-actions">
          <button class="quiz-close-btn" onclick="Quiz.close()">${T('close')}</button>
          <button class="btn-primary" onclick="Quiz.launch('${state.module}')" style="padding:0.7rem 1.75rem;font-size:0.9rem;">
            ${T('quiz_retry')}
          </button>
        </div>
      </div>
    `;

    if (typeof gsap !== 'undefined') {
      gsap.from('.quiz-result', { scale:0.9, opacity:0, duration:0.4, ease:'back.out(1.5)' });
      gsap.from('[style*="border-radius:4px"]', {
        scaleX: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        transformOrigin: 'left center', delay: 0.3, clearProps: 'all'
      });
    }

    if (passed) {
      App.addXP(pct);
      const progressGrant = pct >= 80 ? 100 : 70;
      App.updateProgress(state.module, progressGrant);

      if (pct === 100) {
        App.unlockAchievement(`${state.module}-perfect`, `Perfect score on ${moduleNames[state.module]}!`, '');
        // Generic "first 100%" achievement
        App.unlockAchievement('quiz-perfect', 'Scored 100% on a quiz!', '');
        // Check if ALL 6 modules now have perfect scores
        const allModules = ['foundations','gates','algorithms','cryptography','error','qml'];
        const allPerfect = allModules.every(m => App.achievements.has(`${m}-perfect`));
        if (allPerfect) {
          App.unlockAchievement('quiz-grandmaster', 'Perfect 100% on ALL 6 module quizzes! Legendary!', 'quiz-grandmaster');
        }
      } else {
        App.unlockAchievement(`${state.module}-pass`, `Passed ${moduleNames[state.module]}!`, '');
      }
    } else {
      App.addXP(10);
    }
  },

  close() {
    const modal = document.getElementById('quizModal');
    if (typeof gsap !== 'undefined') {
      gsap.to('#quizContainer', { scale:0.92, opacity:0, duration:0.25, ease:'power2.in',
        onComplete: () => {
          modal.classList.remove('open');
          this.state = null;
          gsap.set('#quizContainer', { scale:1, opacity:1 });
        }
      });
    } else {
      modal.classList.remove('open');
      this.state = null;
    }
  }
};
