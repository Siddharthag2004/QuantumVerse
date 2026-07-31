// Drawing Helpers
function drawSuperPip(g, x, y, radius, color, time, label = '') {
  g.save();
  g.shadowColor = color;
  g.shadowBlur = 15;
  const pulse = Math.sin(time * 3) * 2;
  const grad = g.createRadialGradient(x, y, 2, x, y, radius + pulse);
  grad.addColorStop(0, '#fff');
  grad.addColorStop(0.3, color);
  grad.addColorStop(1, 'transparent');
  g.fillStyle = grad;
  g.beginPath();
  g.arc(x, y, radius + pulse + 8, 0, Math.PI * 2);
  g.fill();

  g.strokeStyle = color;
  g.lineWidth = 1;
  g.beginPath();
  g.ellipse(x, y, radius * 1.6, radius * 0.6, time * 0.8, 0, Math.PI * 2);
  g.stroke();
  g.beginPath();
  g.ellipse(x, y, radius * 1.6, radius * 0.6, -time * 0.5, 0, Math.PI * 2);
  g.stroke();

  if (label) {
    g.fillStyle = '#cbd5e1';
    g.font = 'bold 10px "Space Grotesk", sans-serif';
    g.fillText(label, x, y - radius - 15);
  }
  g.restore();
}

function drawQuantumGate(g, x, y, width, height, label, color1, color2) {
  g.save();
  g.shadowColor = color1;
  g.shadowBlur = 12;
  const grad = g.createLinearGradient(x, y, x + width, y + height);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0.85)');
  grad.addColorStop(1, 'rgba(30, 41, 59, 0.85)');
  g.fillStyle = grad;
  g.strokeStyle = color1;
  g.lineWidth = 2;
  g.beginPath();
  g.roundRect(x, y, width, height, 8);
  g.fill();
  g.stroke();

  g.strokeStyle = color2;
  g.lineWidth = 1;
  g.beginPath();
  g.roundRect(x + 4, y + 4, width - 8, height - 8, 6);
  g.stroke();

  g.fillStyle = '#fff';
  g.font = 'bold 14px "Space Grotesk", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(label, x + width / 2, y + height / 2);
  g.restore();
}

function drawSpacePortal(g, x, y, size, time, color) {
  g.save();
  g.shadowColor = color;
  g.shadowBlur = 20;
  for (let i = 0; i < 4; i++) {
    const scale = 0.5 + i * 0.15;
    g.strokeStyle = color;
    g.lineWidth = 1.5;
    g.beginPath();
    g.ellipse(x, y, size * scale, size * scale * 0.5, time * (i + 1) * 0.4, 0, Math.PI * 2);
    g.stroke();
  }
  const grad = g.createRadialGradient(x, y, 2, x, y, size * 0.4);
  grad.addColorStop(0, '#fff');
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, 'transparent');
  g.fillStyle = grad;
  g.beginPath();
  g.arc(x, y, size * 0.5, 0, Math.PI * 2);
  g.fill();
  g.restore();
}

function drawCuteCat(g, x, y, scale = 1, state = 'awake', time = 0) {
  g.save();
  g.translate(x, y);
  g.scale(scale, scale);
  g.shadowColor = 'rgba(0,0,0,0.15)';
  g.shadowBlur = 6;

  const bodyColor = '#cbd5e1';
  const innerEarColor = '#fca5a5';
  const eyeColor = '#0f172a';

  if (state === 'awake') {
    const tailAngle = Math.sin(time * 3) * 0.2;
    g.strokeStyle = bodyColor;
    g.lineWidth = 6;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(-15, 10);
    g.quadraticCurveTo(-30, -5 + tailAngle * 20, -25, -20);
    g.stroke();

    g.fillStyle = bodyColor;
    g.beginPath();
    g.ellipse(0, 10, 20, 16, 0, 0, Math.PI * 2);
    g.fill();

    g.beginPath();
    g.arc(0, -15, 16, 0, Math.PI * 2);
    g.fill();

    g.beginPath();
    g.moveTo(-14, -22); g.lineTo(-18, -36); g.lineTo(-3, -26); g.closePath();
    g.moveTo(14, -22); g.lineTo(18, -36); g.lineTo(3, -26); g.closePath();
    g.fill();

    g.fillStyle = innerEarColor;
    g.beginPath();
    g.moveTo(-12, -24); g.lineTo(-15, -32); g.lineTo(-5, -26); g.closePath();
    g.moveTo(12, -24); g.lineTo(15, -32); g.lineTo(5, -26); g.closePath();
    g.fill();

    const eyePulse = 1 + Math.sin(time * 2) * 0.05;
    g.fillStyle = 'var(--accent-green)';
    g.beginPath();
    g.arc(-6, -16, 3.5 * eyePulse, 0, Math.PI * 2);
    g.arc(6, -16, 3.5 * eyePulse, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = eyeColor;
    g.beginPath();
    g.ellipse(-6, -16, 1, 3, 0, 0, Math.PI * 2);
    g.ellipse(6, -16, 1, 3, 0, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = innerEarColor;
    g.beginPath();
    g.moveTo(0, -12); g.lineTo(-2, -14); g.lineTo(2, -14); g.closePath();
    g.fill();

    g.strokeStyle = '#64748b';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(-10, -11); g.lineTo(-22, -13);
    g.moveTo(-10, -9); g.lineTo(-24, -9);
    g.moveTo(10, -11); g.lineTo(22, -13);
    g.moveTo(10, -9); g.lineTo(24, -9);
    g.stroke();

    g.strokeStyle = '#475569';
    g.lineWidth = 1.5;
    g.beginPath();
    g.arc(-2, -11, 2, 0, Math.PI);
    g.arc(2, -11, 2, 0, Math.PI);
    g.stroke();
  } else {
    g.fillStyle = bodyColor;
    g.beginPath();
    g.arc(0, 0, 24, 0, Math.PI * 2);
    g.fill();

    g.beginPath();
    g.arc(8, -4, 14, 0, Math.PI * 2);
    g.fill();

    g.beginPath();
    g.moveTo(-3, -15); g.lineTo(-8, -25); g.lineTo(4, -18); g.closePath();
    g.moveTo(15, -12); g.lineTo(22, -22); g.lineTo(19, -4); g.closePath();
    g.fill();

    g.strokeStyle = '#475569';
    g.lineWidth = 1.5;
    g.lineCap = 'round';
    g.beginPath();
    g.arc(4, -6, 3, 0, Math.PI);
    g.arc(12, -6, 3, 0, Math.PI);
    g.stroke();

    const zCount = Math.floor((time * 2) % 3);
    g.fillStyle = 'var(--accent-cyan)';
    g.font = 'bold 9px sans-serif';
    for (let i = 0; i <= zCount; i++) {
      g.fillText('Z', 22 + i * 6, -18 - i * 6);
    }
  }
  g.restore();
}

function drawCuteMouse(g, x, y, scale = 1, color = '#94a3b8', label = '', angle = 0) {
  g.save();
  g.translate(x, y);
  g.rotate(angle);
  g.scale(scale, scale);

  g.shadowColor = color;
  g.shadowBlur = 6;

  // Body
  g.fillStyle = color;
  g.beginPath();
  g.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
  g.fill();

  // Snout
  g.beginPath();
  g.moveTo(10, -5);
  g.lineTo(18, 0);
  g.lineTo(10, 5);
  g.closePath();
  g.fill();

  // Nose tip
  g.fillStyle = '#fca5a5';
  g.beginPath();
  g.arc(18, 0, 2.5, 0, Math.PI * 2);
  g.fill();

  // Ears
  g.fillStyle = color;
  g.beginPath();
  g.arc(-2, -8, 7, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#fca5a5';
  g.beginPath();
  g.arc(-2, -8, 4, 0, Math.PI * 2);
  g.fill();

  g.fillStyle = color;
  g.beginPath();
  g.arc(-2, 8, 7, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#fca5a5';
  g.beginPath();
  g.arc(-2, 8, 4, 0, Math.PI * 2);
  g.fill();

  // Eyes
  g.fillStyle = '#0f172a';
  g.beginPath();
  g.arc(7, -3, 1.5, 0, Math.PI * 2);
  g.arc(7, 3, 1.5, 0, Math.PI * 2);
  g.fill();

  // Long Pink Tail
  g.strokeStyle = '#fca5a5';
  g.lineWidth = 1.5;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(-13, 0);
  g.quadraticCurveTo(-25, 5, -20, 15);
  g.stroke();

  if (label) {
    g.fillStyle = '#cbd5e1';
    g.font = 'bold 9px "Space Grotesk", sans-serif';
    g.fillText(label, 0, -18);
  }
  g.restore();
}

// ─── QuantumVerse App ─────────────────────────────────────────────────────
const App = {

  // ── State ──────────────────────────────────────────────────────────────
  // NOTE: guest (signed-out) progress is intentionally NOT persisted.
  // Only signed-in users' progress is saved (see _saveState/_loadStateLocal).
  lang: localStorage.getItem('qv-lang') || 'en',
  darkMode: localStorage.getItem('qv-dark') !== 'false', // default dark
  xp: 0, level: 1, progress: {}, achievements: new Set(), visitedLessons: {},
  currentView: 'home', heroBloch: null,
  _particleScene: null,
  activeUser: localStorage.getItem('qv-active-user') || null,
  users: JSON.parse(localStorage.getItem('qv-users') || '{}'),
  signupAvatar: 'atom',

  // Bloch Sphere Sandbox State
  sandbox: {
    instance: null,
    theta: 0,
    phi: 0
  },

  // ── i18n ───────────────────────────────────────────────────────────────
  t(key) {
    const dict = (typeof Translations !== 'undefined') ? Translations : {};
    const lang = this.lang || 'en';
    return (dict[lang] && dict[lang][key] !== undefined)
      ? dict[lang][key]
      : (dict['en'] && dict['en'][key] !== undefined ? dict['en'][key] : key);
  },

  // ── Init ───────────────────────────────────────────────────────────────
  init() {
    this._loadStateLocal();        // sync — reads localStorage instantly
    this._applyDarkMode(this.darkMode, false);
    this._applySplash();
    this._syncFromServer();        // async — runs in background, doesn't block
  },

  // Synchronous local state load (instant)
  _loadStateLocal() {
    this.users = JSON.parse(localStorage.getItem('qv-users') || '{}');
    this.activeUser = localStorage.getItem('qv-active-user') || null;

    if (this.activeUser && this.users[this.activeUser]) {
      const u = this.users[this.activeUser];
      this.xp = u.xp || 0;
      this.level = u.level || 1;
      this.progress = u.progress || {};
      this.achievements = new Set(u.achievements || []);
      this.visitedLessons = u.visitedLessons || {};
      this.dailyStreak = u.dailyStreak || 0;
      this.lastRiddleSolvedDate = u.lastRiddleSolvedDate || '';
    } else {
      // Guests always start fresh — progress is only saved for signed-in users.
      this.xp = 0;
      this.level = 1;
      this.progress = {};
      this.achievements = new Set();
      this.visitedLessons = {};
      this.dailyStreak = 0;
      this.lastRiddleSolvedDate = '';
    }

    // Validate daily streak
    const todayStr = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    if (this.lastRiddleSolvedDate && this.lastRiddleSolvedDate !== todayStr && this.lastRiddleSolvedDate !== yesterdayStr) {
      this.dailyStreak = 0;
      this._saveState();
    }
    this.checkStreakAchievements();
  },

  // Background server sync (non-blocking)
  async _syncFromServer() {
    if (!this.activeUser) return;
    try {
      const res = await fetch(`/api/user/${encodeURIComponent(this.activeUser)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          const u = data.user;
          this.xp = u.xp || 0;
          this.level = u.level || 1;
          this.progress = u.progress || {};
          this.achievements = new Set(u.achievements || []);
          this.visitedLessons = u.visitedLessons || {};
          this.dailyStreak = u.dailyStreak || 0;
          this.lastRiddleSolvedDate = u.lastRiddleSolvedDate || '';

          this.users[this.activeUser] = {
            password: this.users[this.activeUser] ? this.users[this.activeUser].password : '',
            avatar: u.avatar || 'atom',
            xp: this.xp, level: this.level, progress: this.progress,
            achievements: [...this.achievements], visitedLessons: this.visitedLessons,
            dailyStreak: this.dailyStreak, lastRiddleSolvedDate: this.lastRiddleSolvedDate
          };
          localStorage.setItem('qv-users', JSON.stringify(this.users));

          // Refresh UI with server data
          this._renderXP();
          this._renderProgress();
        }
      }
    } catch (err) {
      console.warn('Backend server offline. Running in local fallback mode.', err.message);
    }
  },

  _saveState() {
    if (this.activeUser) {
      if (!this.users[this.activeUser]) this.users[this.activeUser] = {};
      this.users[this.activeUser].xp = this.xp;
      this.users[this.activeUser].level = this.level;
      this.users[this.activeUser].progress = this.progress;
      this.users[this.activeUser].achievements = [...this.achievements];
      this.users[this.activeUser].visitedLessons = this.visitedLessons;
      this.users[this.activeUser].dailyStreak = this.dailyStreak;
      this.users[this.activeUser].lastRiddleSolvedDate = this.lastRiddleSolvedDate;
      localStorage.setItem('qv-users', JSON.stringify(this.users));

      // Asynchronously send states to Express server
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: this.activeUser,
          xp: this.xp,
          level: this.level,
          progress: this.progress,
          achievements: [...this.achievements],
          visitedLessons: this.visitedLessons,
          dailyStreak: this.dailyStreak,
          lastRiddleSolvedDate: this.lastRiddleSolvedDate
        })
      }).catch(err => console.warn('Sync server unreachable:', err));
    }
    // Guests: intentionally not persisted — progress only sticks after signing in.
    localStorage.setItem('qv-lang', this.lang);
  },

  // ── Splash ─────────────────────────────────────────────────────────────
  _applySplash() {
    const bar = document.getElementById('splashBar');
    const txtEl = document.getElementById('splashText');
    const splash = document.getElementById('splash');

    // Get starting width percentage
    let currentPct = parseFloat(bar?.style.width || '0');
    if (isNaN(currentPct)) currentPct = 0;

    // Clear early interval
    if (window._splashBarInterval) clearInterval(window._splashBarInterval);

    // Smoothly complete the loading bar from currentPct -> 100%
    const duration = 800; // 0.8s smooth finish
    const startTime = performance.now();

    const animateFinish = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const newWidth = currentPct + (100 - currentPct) * easeProgress;

      if (bar) bar.style.width = newWidth + '%';

      if (progress < 1) {
        requestAnimationFrame(animateFinish);
      } else {
        if (txtEl) txtEl.textContent = 'Ready!';
        setTimeout(() => {
          if (splash) splash.classList.add('fade-out');
          setTimeout(() => {
            if (splash) splash.style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
            this._onReady();
          }, 500);
        }, 200);
      }
    };

    requestAnimationFrame(animateFinish);
  },

  _onReady() {
    this._bindEvents();
    this._applyLanguage();
    this.updateAuthUI();
    this._renderXP();
    this._renderProgress();
    this._initQuantumCanvas();
    this._initHeroBloch();
    this.navigate(this.currentView, false);
    this.initSandbox();
    if (typeof Tutor !== 'undefined') Tutor.init();
    if (!this.achievements.has('welcome')) {
      setTimeout(() => {
        this.unlockAchievement('welcome', this.t('ach_welcome_desc'), 'welcome');
      }, 1200);
    }
  },

  // ── Dark / Light Mode ──────────────────────────────────────────────────
  _applyDarkMode(dark, animate = true) {
    this.darkMode = dark;
    localStorage.setItem('qv-dark', dark ? 'true' : 'false');

    // Apply theme class — CSS transitions on body (background 0.35s, color 0.35s)
    // handle the smooth cross-fade. No blank overlay needed.
    document.documentElement.classList.toggle('light-mode', !dark);

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      const moonSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      const sunSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      themeBtn.innerHTML = dark
        ? `${moonSVG}<span class="theme-toggle-label" id="themeLabel">${this.t('dark_mode')}</span>`
        : `${sunSVG}<span class="theme-toggle-label" id="themeLabel">${this.t('light_mode')}</span>`;
    }

    // Re-render radar chart to update its theme colors dynamically
    if (typeof SkillRadar !== 'undefined' && document.getElementById('skillRadarCanvas')) {
      SkillRadar.render('radarChartContainer');
    }
    // Re-render profile radar if on profile page
    if (typeof SkillRadar !== 'undefined' && document.getElementById('profileRadarContainer')) {
      SkillRadar.render('profileRadarContainer');
    }
    // Re-render circuit builder chart if active to apply new theme colors
    if (typeof CircuitBuilder !== 'undefined' && document.getElementById('qcProbChart') && CircuitBuilder._state) {
      CircuitBuilder._initChart(CircuitBuilder._state);
    }
    // Re-render VQE Landscape chart if on QML page to apply new theme colors
    if (typeof QMLModule !== 'undefined' && document.getElementById('vqeCanvas')) {
      QMLModule.drawVQELandscape(QMLModule.vqeTheta || 1.0);
    }
    // Re-render QAOA graph if visible to apply new theme colors
    if (typeof QMLModule !== 'undefined' && document.getElementById('qaoaGraph')) {
      QMLModule.drawQAOAGraph();
    }
  },

  toggleTheme() {
    this._applyDarkMode(!this.darkMode);
  },

  // ── Language ───────────────────────────────────────────────────────────
  setLanguage(lang) {
    this.lang = lang;
    this._applyLanguage();
    this._saveState();

    // Wipe all module views so they are forced to re-render in the new language
    const modules = ['foundations', 'gates', 'algorithms', 'cryptography', 'error', 'qml'];
    modules.forEach(m => {
      const v = document.getElementById(`view-${m}`);
      if (v) v.innerHTML = '';
    });

    if (this.currentView !== 'home') {
      this.navigate(this.currentView, false);
    }
  },

  _applyLanguage() {
    // Static DOM elements
    const map = {
      'label-learning-path': this.t('learning_path'),
      'label-progress': this.t('progress_label'),
      'nav-label-home': this.t('nav_home'),
      'nav-label-foundations': this.t('nav_foundations'),
      'nav-label-gates': this.t('nav_gates'),
      'nav-label-algorithms': this.t('nav_algorithms'),
      'nav-label-cryptography': this.t('nav_cryptography'),
      'nav-label-qml': this.t('nav_qml'),
      'nav-label-profile': this.t('nav_profile'),
      'nav-badge-foundations': `5 ${this.t('lessons_suffix')}`,
      'nav-badge-gates': `4 ${this.t('lessons_suffix')}`,
      'nav-badge-algorithms': `4 ${this.t('lessons_suffix')}`,
      'nav-badge-cryptography': `3 ${this.t('lessons_suffix')}`,
      'nav-badge-error': `2 ${this.t('lessons_suffix')}`,
      'nav-badge-qml': `4 ${this.t('lessons_suffix')}`,
      'prog-label-foundations': `${this.t('nav_foundations')} (${this.getModuleProgress('foundations')}%)`,
      'prog-label-gates': `${this.t('nav_gates').split(' ')[0]} (${this.getModuleProgress('gates')}%)`,
      'prog-label-algorithms': `${this.t('nav_algorithms').split(' ')[0]} (${this.getModuleProgress('algorithms')}%)`,
      'prog-label-cryptography': `${this.t('nav_cryptography').split(' ')[0]} (${this.getModuleProgress('cryptography')}%)`,
      'prog-label-error': `${this.t('nav_error').split(' ')[0]} (${this.getModuleProgress('error')}%)`,
      'prog-label-qml': `${this.t('nav_qml')} (${this.getModuleProgress('qml')}%)`,
      'hero-badge': this.t('badge'),
      'hero-title': this.t('hero_title'),
      'hero-sub': this.t('hero_sub'),
      'btn-start': this.t('start'),
      'btn-circuit': this.t('circuit'),
      'stat-lessons': this.t('s_lessons'),
      'stat-quizzes': this.t('s_quizzes'),
      'stat-labs': this.t('s_labs'),
      'stat-ai': this.t('s_ai'),
      'home-modules-title': 'Learning Modules',
      'card-f-title': this.t('card_f_title'),
      'card-f-desc': this.t('card_f_desc'),
      'card-f-tag': this.t('card_f_tag'),
      'card-f-cta': this.t('card_f_cta'),
      'card-g-title': this.t('card_g_title'),
      'card-g-desc': this.t('card_g_desc'),
      'card-g-tag': this.t('card_g_tag'),
      'card-g-cta': this.t('card_g_cta'),
      'card-a-title': this.t('card_a_title'),
      'card-a-desc': this.t('card_a_desc'),
      'card-a-tag': this.t('card_a_tag'),
      'card-a-cta': this.t('card_a_cta'),
      'card-c-title': this.t('card_c_title'),
      'card-c-desc': this.t('card_c_desc'),
      'card-c-tag': this.t('card_c_tag'),
      'card-c-cta': this.t('card_c_cta'),
      'card-e-title': this.t('card_e_title'),
      'card-e-desc': this.t('card_e_desc'),
      'card-e-tag': this.t('card_e_tag'),
      'card-e-cta': this.t('card_e_cta'),
      'card-qml-title': this.t('card_qml_title'),
      'card-qml-desc': this.t('card_qml_desc'),
      'card-qml-tag': this.t('card_qml_tag'),
      'card-qml-cta': this.t('card_qml_cta'),
      'tutorToggle': this.t('ai_tutor_btn'),
      'tutor-title': this.t('tutor_title'),
      'tutor-online': this.t('tutor_online'),
      'tutor-welcome-msg': this.t('tutor_welcome'),
      'tutor-s1': this.t('tutor_q1'),
      'tutor-s2': this.t('tutor_q2'),
      'tutor-s3': this.t('tutor_q3'),
    };
    Object.entries(map).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el && text) el.innerHTML = text;
    });

    // Tutor input placeholder
    const inp = document.getElementById('tutorInput');
    if (inp) inp.placeholder = this.t('tutor_placeholder');

    // Theme toggle label
    const label = document.getElementById('themeLabel');
    if (label) label.textContent = this.darkMode ? this.t('dark_mode') : this.t('light_mode');
  },

  // ── Navigation / Routing ───────────────────────────────────────────────
  navigate(module, animate = true) {
    const prev = this.currentView;
    this.currentView = module;

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navEl = document.getElementById(`nav-${module}`);
    if (navEl) navEl.classList.add('active');

    // Hide all views
    document.querySelectorAll('.module-view').forEach(v => v.classList.remove('active'));

    const view = document.getElementById(`view-${module}`);
    if (!view) return;

    // Render if empty (or home)
    if (module === 'home') {
      this.renderHomeInteractive();
    } else if (module === 'profile') {
      this._renderProfile(view);
    } else if (module !== 'home' && view.innerHTML.trim() === '') {
      this._renderModule(module, view);
    }

    view.classList.add('active');
    document.getElementById('mainContent').scrollTop = 0;

    if (animate && typeof gsap !== 'undefined') {
      gsap.fromTo(view, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' });
    }

    // Home card animations
    if (module === 'home' && animate && typeof gsap !== 'undefined') {
      gsap.from('.module-card', { opacity: 0, y: 24, duration: 0.5, stagger: 0.07, ease: 'power2.out', clearProps: 'all', delay: 0.1 });
      gsap.from('.stat-card', { opacity: 0, y: 12, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all' });
      gsap.from('.hero-content', { opacity: 0, x: -20, duration: 0.6, ease: 'power2.out', clearProps: 'all' });
    }

    this._renderProgress();
  },

  // ── Authentication & User Profile ──────────────────────────────────────
  updateAuthUI() {
    const authContainer = document.getElementById('authContainer');
    if (!authContainer) return;
    if (this.activeUser) {
      authContainer.innerHTML = `
        <div class="topbar-user-chip" onclick="App.navigate('profile')">
          <span class="topbar-user-logo-mark">⟨ψ|</span>
          <span>${this.activeUser}</span>
        </div>
      `;
    } else {
      authContainer.innerHTML = `
        <button class="topbar-auth-btn" onclick="App.showAuthModal()">
          <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span> Sign In
        </button>
      `;
    }
    this._renderGuestBanner();
  },

  showAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('hidden');
  },

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('hidden');
  },

  switchAuthTab(tab) {
    const tabSignIn = document.getElementById('authTabSignIn');
    const tabSignUp = document.getElementById('authTabSignUp');
    const formSignIn = document.getElementById('signInForm');
    const formSignUp = document.getElementById('signUpForm');

    if (tab === 'signin') {
      tabSignIn.classList.add('active');
      tabSignUp.classList.remove('active');
      formSignIn.classList.remove('hidden');
      formSignUp.classList.add('hidden');
    } else {
      tabSignUp.classList.add('active');
      tabSignIn.classList.remove('active');
      formSignUp.classList.remove('hidden');
      formSignIn.classList.add('hidden');
    }
  },

  selectAvatar(el) {
    document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('active'));
    el.classList.add('active');
    this.signupAvatar = el.getAttribute('data-avatar') || 'atom';
  },

  getUserAvatar() {
    if (this.activeUser && this.users[this.activeUser]) {
      return this.users[this.activeUser].avatar || 'atom';
    }
    return 'atom';
  },

  getAvatarSVG(key, size = 48, strokeWidth = 2) {
    const avatars = {
      atom: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-cyan);"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/></svg>`,
      bloch: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-violet);"><circle cx="12" cy="12" r="10" stroke-dasharray="3,3"/><ellipse cx="12" cy="12" rx="10" ry="3"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 12 L18 7" stroke="var(--accent-orange)" stroke-width="${strokeWidth + 0.5}"/></svg>`,
      cat: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-pink);"><path d="M12 5c-1.6 0-3 1.4-3 3v4c0 1.6 1.4 3 3 3s3-1.4 3-3V8c0-1.6-1.4-3-3-3z"/><path d="M9 7L6 3v4"/><path d="M15 7l3-4v4"/><circle cx="10.5" cy="9.5" r="1" fill="currentColor"/><circle cx="13.5" cy="9.5" r="1" fill="currentColor"/><path d="M11 12s.5.5 1 .5 1-.5 1-.5"/></svg>`,
      chip: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-orange);"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
      wave: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-green);"><path d="M2 10s3-4 6-4 6 8 10 8 4-4 4-4"/><path d="M2 14s3-4 6-4 6 8 10 8 4-4 4-4" opacity="0.5" stroke-dasharray="2,2"/></svg>`,
      entangled: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-purple);"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6" stroke-dasharray="3,3"/><path d="M7.5 10c1.5-2.5 4.5-2.5 6 0" stroke="var(--accent-cyan)"/><path d="M10.5 14c1.5 2.5 4.5 2.5 6 0" stroke="var(--accent-pink)"/></svg>`,
      lock: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-cyan);"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      magnet: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" style="color:var(--accent-orange);"><path d="M17 12h5M2 12h5"/><circle cx="12" cy="12" r="3" fill="var(--accent-cyan)"/><path d="M12 2v7M12 15v7"/></svg>`
    };
    return avatars[key] || avatars['atom'];
  },

  async handleSignIn() {
    const user = document.getElementById('signinUser').value.trim();
    const pass = document.getElementById('signinPass').value;

    if (!user || !pass) return;

    let authSuccess = false;
    let remoteUserData = null;
    let usingRemote = false;

    // Try server authentication first
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          authSuccess = true;
          remoteUserData = data.user;
          usingRemote = true;
        }
      }
    } catch (err) {
      console.warn('Backend server offline. Checking local credentials.', err);
    }

    // Local fallback
    if (!usingRemote) {
      if (this.users[user] && this.users[user].password === pass) {
        authSuccess = true;
      }
    }

    if (authSuccess) {
      this.activeUser = user;
      localStorage.setItem('qv-active-user', user);

      if (usingRemote && remoteUserData) {
        this.xp = remoteUserData.xp || 0;
        this.level = remoteUserData.level || 1;
        this.progress = remoteUserData.progress || {};
        this.achievements = new Set(remoteUserData.achievements || []);
        this.visitedLessons = remoteUserData.visitedLessons || {};
        this.dailyStreak = remoteUserData.dailyStreak || 0;
        this.lastRiddleSolvedDate = remoteUserData.lastRiddleSolvedDate || '';

        this.users[user] = {
          password: pass,
          avatar: remoteUserData.avatar || 'atom',
          xp: this.xp,
          level: this.level,
          progress: this.progress,
          achievements: [...this.achievements],
          visitedLessons: this.visitedLessons,
          dailyStreak: this.dailyStreak,
          lastRiddleSolvedDate: this.lastRiddleSolvedDate
        };
        localStorage.setItem('qv-users', JSON.stringify(this.users));
      }
      this._loadStateLocal();
      this._clearCachedModuleViews();

      this.updateAuthUI();
      this._renderXP();
      this._renderProgress();
      this.closeAuthModal();

      // Clear forms
      document.getElementById('signinUser').value = '';
      document.getElementById('signinPass').value = '';

      this.navigate('profile');
      this.unlockAchievement('account', 'Logged into Quantum Account successfully.', 'account');
    } else {
      alert('Invalid credentials.');
    }
  },

  async handleSignUp() {
    const user = document.getElementById('signupUser').value.trim();
    const pass = document.getElementById('signupPass').value;
    const avatar = this.signupAvatar || 'atom';

    if (!user || !pass) return;
    if (user.length < 3) {
      alert('Username must be at least 3 characters.');
      return;
    }
    if (pass.length < 4) {
      alert('Passcode must be at least 4 characters.');
      return;
    }

    if (this.users[user]) {
      alert('Username is already registered locally.');
      return;
    }

    let success = false;
    let usingRemote = false;
    let remoteUserData = null;

    // Try registering on backend first
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
          pass,
          avatar: this.signupAvatar || 'atom',
          xp: this.xp,
          level: this.level,
          progress: this.progress,
          achievements: [...this.achievements],
          visitedLessons: this.visitedLessons
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          success = true;
          usingRemote = true;
          remoteUserData = data.user;
        }
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to register on backend server.');
        return;
      }
    } catch (err) {
      console.warn('Backend server offline. Registering locally only.', err);
    }

    if (usingRemote && remoteUserData) {
      // Populate the local user record from the server's response so
      // _loadStateLocal() (called below) doesn't fall through to the
      // guest-reset branch and wipe out the data we just saved.
      this.users[user] = {
        password: pass,
        avatar: remoteUserData.avatar || 'atom',
        xp: remoteUserData.xp || 0,
        level: remoteUserData.level || 1,
        progress: remoteUserData.progress || {},
        achievements: remoteUserData.achievements || [],
        visitedLessons: remoteUserData.visitedLessons || {},
        dailyStreak: remoteUserData.dailyStreak || 0,
        lastRiddleSolvedDate: remoteUserData.lastRiddleSolvedDate || ''
      };
    } else if (!usingRemote) {
      // Local fallback signup
      this.users[user] = {
        password: pass,
        avatar: this.signupAvatar || 'atom',
        xp: this.xp,
        level: this.level,
        progress: this.progress,
        achievements: [...this.achievements],
        visitedLessons: this.visitedLessons
      };
      success = true;
    }

    if (success) {
      this.activeUser = user;
      localStorage.setItem('qv-active-user', user);
      localStorage.setItem('qv-users', JSON.stringify(this.users));

      this._loadStateLocal();
      this._clearCachedModuleViews();
      this.updateAuthUI();
      this.closeAuthModal();

      // Clear signup form
      document.getElementById('signupUser').value = '';
      document.getElementById('signupPass').value = '';

      this.navigate('profile');
      this.unlockAchievement('account', 'Created a secure Quantum Profile.', 'account');
    }
  },

  generateCertificate() {
    const allModules = ['foundations', 'gates', 'algorithms', 'cryptography', 'error', 'qml'];
    const allLessonsDone = allModules.every(m => this.isModuleRead(m));
    const allPerfect = allModules.every(m => this.achievements.has(`${m}-perfect`));
    // allHigh = scored >= 80% on every quiz (progress reaches 100 when score >= 80%)
    const allHigh = allModules.every(m => (this.progress[m] || 0) >= 100);
    const isGrandmaster = allLessonsDone && allPerfect;
    const isHonours = allLessonsDone && allHigh && !allPerfect;

    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    if (isGrandmaster) {
      // ── GRANDMASTER CERTIFICATE ────────────────────────────────────────────
      // Rich dark gold background
      const bgGrad = ctx.createLinearGradient(0, 0, 900, 640);
      bgGrad.addColorStop(0, '#0e0900');
      bgGrad.addColorStop(0.5, '#1a1000');
      bgGrad.addColorStop(1, '#0e0900');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 900, 640);

      // Decorative gold grid lines
      ctx.strokeStyle = 'rgba(212,175,55,0.07)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 900; i += 45) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 640); ctx.stroke();
      }
      for (let i = 0; i < 640; i += 45) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(900, i); ctx.stroke();
      }

      // Outer thick gold border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 8;
      ctx.strokeRect(14, 14, 872, 612);

      // Inner thin gold border
      ctx.strokeStyle = '#b8942a';
      ctx.lineWidth = 2;
      ctx.strokeRect(26, 26, 848, 588);

      // Corner ornaments (L-brackets)
      const corners = [[30, 30], [870, 30], [30, 610], [870, 610]];
      const signs = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
      corners.forEach(([cx, cy], i) => {
        const [sx, sy] = signs[i];
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx, cy + sy * 22); ctx.lineTo(cx, cy); ctx.lineTo(cx + sx * 22, cy); ctx.stroke();
      });

      // Top ribbon banner
      const ribGrad = ctx.createLinearGradient(0, 50, 0, 95);
      ribGrad.addColorStop(0, 'rgba(212,175,55,0.25)');
      ribGrad.addColorStop(1, 'rgba(212,175,55,0.0)');
      ctx.fillStyle = ribGrad;
      ctx.fillRect(30, 50, 840, 45);

      // Title
      ctx.fillStyle = '#d4af37';
      ctx.font = "800 15px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.letterSpacing = '0.18em';
      ctx.fillText('QUANTUMVERSE  |  DISTINGUISHED HONOURS', 450, 75);

      // Horizontal rule under title
      const hrGrad = ctx.createLinearGradient(100, 0, 800, 0);
      hrGrad.addColorStop(0, 'transparent');
      hrGrad.addColorStop(0.3, '#d4af37');
      hrGrad.addColorStop(0.7, '#d4af37');
      hrGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = hrGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(100, 88); ctx.lineTo(800, 88); ctx.stroke();

      // GRANDMASTER CERTIFICATE title
      ctx.fillStyle = '#f5e09a';
      ctx.font = "700 38px 'Space Grotesk', sans-serif";
      ctx.fillText('Grandmaster Certificate', 450, 155);

      ctx.fillStyle = 'rgba(212,175,55,0.6)';
      ctx.font = "500 13px 'Space Grotesk', sans-serif";
      ctx.fillText('HIGHEST LEVEL OF ACHIEVEMENT  |  PERFECT MASTERY', 450, 183);

      // Certifies that
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = "italic 15px 'Inter', sans-serif";
      ctx.fillText('This certifies, with the highest distinction, that', 450, 232);

      // User name with gold glow effect
      ctx.shadowColor = '#d4af37';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#d4af37';
      ctx.font = "800 40px 'Space Grotesk', sans-serif";
      ctx.fillText(this.activeUser || 'Quantum Grandmaster', 450, 288);
      ctx.shadowBlur = 0;

      // Description lines
      ctx.fillStyle = 'rgba(255,255,255,0.82)';
      ctx.font = "14px 'Inter', sans-serif";
      ctx.fillText('has achieved a PERFECT score on all 6 module quizzes and read every lesson,', 450, 336);
      ctx.fillText('mastering Quantum Computing from Qubits to Algorithms, Cryptography,', 450, 358);
      ctx.fillText('Error Correction and Quantum Machine Learning. An extraordinary achievement!', 450, 380);

      // Medallion seal (circle with text)
      const sealX = 450, sealY = 455, sealR = 52;
      const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, sealR);
      sealGrad.addColorStop(0, 'rgba(212,175,55,0.35)');
      sealGrad.addColorStop(1, 'rgba(212,175,55,0.05)');
      ctx.beginPath(); ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
      ctx.fillStyle = sealGrad;
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Inner ring
      ctx.beginPath(); ctx.arc(sealX, sealY, sealR - 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212,175,55,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Seal star burst (8 rays)
      for (let r = 0; r < 8; r++) {
        const angle = (r / 8) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(212,175,55,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sealX + Math.cos(angle) * 18, sealY + Math.sin(angle) * 18);
        ctx.lineTo(sealX + Math.cos(angle) * (sealR - 10), sealY + Math.sin(angle) * (sealR - 10));
        ctx.stroke();
      }
      ctx.fillStyle = '#d4af37';
      ctx.font = "800 11px 'Space Grotesk', sans-serif";
      ctx.fillText('PERFECT', sealX, sealY - 7);
      ctx.fillText('SCORE', sealX, sealY + 7);
      ctx.font = "600 8px 'Space Grotesk', sans-serif";
      ctx.fillStyle = 'rgba(212,175,55,0.7)';
      ctx.fillText('ALL 6 MODULES', sealX, sealY + 19);

      // Signatures
      ctx.strokeStyle = 'rgba(212,175,55,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(160, 560); ctx.lineTo(330, 560); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(570, 560); ctx.lineTo(740, 560); ctx.stroke();
      ctx.fillStyle = 'rgba(212,175,55,0.7)';
      ctx.font = "12px 'Space Grotesk', sans-serif";
      ctx.fillText('QUBITBOT AI', 245, 578);
      ctx.fillText('QUANTUMVERSE', 655, 578);

      // Footer
      ctx.fillStyle = 'rgba(212,175,55,0.4)';
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(`GRANDMASTER ID: QV-GM-${Math.random().toString(36).substring(2, 10).toUpperCase()} · ${new Date().toLocaleDateString()}`, 450, 608);

    } else if (isHonours) {
      // \u2500\u2500 HONOURS CERTIFICATE (80%+ on all quizzes) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      const bgGradH = ctx.createLinearGradient(0, 0, 900, 640);
      bgGradH.addColorStop(0, '#03080f');
      bgGradH.addColorStop(0.5, '#060d1a');
      bgGradH.addColorStop(1, '#03080f');
      ctx.fillStyle = bgGradH;
      ctx.fillRect(0, 0, 900, 640);

      ctx.strokeStyle = 'rgba(100,180,255,0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 900; i += 45) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 640); ctx.stroke();
      }
      for (let i = 0; i < 640; i += 45) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(900, i); ctx.stroke();
      }

      ctx.strokeStyle = '#5ba3d9';
      ctx.lineWidth = 7;
      ctx.strokeRect(14, 14, 872, 612);
      ctx.strokeStyle = '#3a7cb5';
      ctx.lineWidth = 2;
      ctx.strokeRect(26, 26, 848, 588);

      const honCorners = [[30, 30], [870, 30], [30, 610], [870, 610]];
      const honSigns = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
      honCorners.forEach(([cx, cy], i) => {
        const [sx, sy] = honSigns[i];
        ctx.strokeStyle = '#5ba3d9'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx, cy + sy * 22); ctx.lineTo(cx, cy); ctx.lineTo(cx + sx * 22, cy); ctx.stroke();
      });

      const honRibGrad = ctx.createLinearGradient(0, 50, 0, 95);
      honRibGrad.addColorStop(0, 'rgba(91,163,217,0.22)');
      honRibGrad.addColorStop(1, 'rgba(91,163,217,0.0)');
      ctx.fillStyle = honRibGrad;
      ctx.fillRect(30, 50, 840, 45);

      ctx.fillStyle = '#5ba3d9';
      ctx.font = "800 15px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('QUANTUMVERSE  |  CERTIFICATE OF DISTINCTION', 450, 75);

      const honHrGrad = ctx.createLinearGradient(100, 0, 800, 0);
      honHrGrad.addColorStop(0, 'transparent'); honHrGrad.addColorStop(0.3, '#5ba3d9');
      honHrGrad.addColorStop(0.7, '#5ba3d9'); honHrGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = honHrGrad; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(100, 88); ctx.lineTo(800, 88); ctx.stroke();

      ctx.fillStyle = '#a8d8f0';
      ctx.font = "700 38px 'Space Grotesk', sans-serif";
      ctx.fillText('Honours Certificate', 450, 155);

      ctx.fillStyle = 'rgba(91,163,217,0.65)';
      ctx.font = "500 13px 'Space Grotesk', sans-serif";
      ctx.fillText('WITH DISTINCTION  |  80% OR ABOVE ON ALL MODULE EXAMINATIONS', 450, 182);

      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = "italic 15px 'Inter', sans-serif";
      ctx.fillText('This certifies, with distinction, that', 450, 230);

      ctx.shadowColor = '#5ba3d9'; ctx.shadowBlur = 16;
      ctx.fillStyle = '#a8d8f0';
      ctx.font = "800 40px 'Space Grotesk', sans-serif";
      ctx.fillText(this.activeUser || 'Quantum Scholar', 450, 285);
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = "14px 'Inter', sans-serif";
      ctx.fillText('has shown excellent mastery of all quantum topics by scoring 80% or above', 450, 333);
      ctx.fillText('on every module quiz. All lessons in Qubits, Gates, Algorithms, Cryptography,', 450, 355);
      ctx.fillText('Error Correction and QML are fully completed. Outstanding dedication!', 450, 377);

      const sX = 450, sY = 452, sR = 48;
      const sGrad = ctx.createRadialGradient(sX, sY, 8, sX, sY, sR);
      sGrad.addColorStop(0, 'rgba(91,163,217,0.30)'); sGrad.addColorStop(1, 'rgba(91,163,217,0.04)');
      ctx.beginPath(); ctx.arc(sX, sY, sR, 0, Math.PI * 2);
      ctx.fillStyle = sGrad; ctx.fill();
      ctx.strokeStyle = '#5ba3d9'; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(sX, sY, sR - 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(91,163,217,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      for (let r = 0; r < 6; r++) {
        const angle = (r / 6) * Math.PI * 2;
        ctx.strokeStyle = 'rgba(91,163,217,0.25)'; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sX + Math.cos(angle) * 16, sY + Math.sin(angle) * 16);
        ctx.lineTo(sX + Math.cos(angle) * (sR - 10), sY + Math.sin(angle) * (sR - 10));
        ctx.stroke();
      }
      ctx.fillStyle = '#5ba3d9'; ctx.font = "800 10px 'Space Grotesk', sans-serif";
      ctx.fillText('HONOURS', sX, sY - 5); ctx.fillText('DISTINCTION', sX, sY + 7);
      ctx.font = "600 8px 'Space Grotesk', sans-serif";
      ctx.fillStyle = 'rgba(91,163,217,0.65)';
      ctx.fillText('80% OR ABOVE', sX, sY + 19);

      ctx.strokeStyle = 'rgba(91,163,217,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(160, 558); ctx.lineTo(330, 558); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(570, 558); ctx.lineTo(740, 558); ctx.stroke();
      ctx.fillStyle = 'rgba(91,163,217,0.7)'; ctx.font = "12px 'Space Grotesk', sans-serif";
      ctx.fillText('QUBITBOT AI', 245, 575); ctx.fillText('QUANTUMVERSE', 655, 575);

      ctx.fillStyle = 'rgba(91,163,217,0.4)'; ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(`HONOURS ID: QV-HON-${Math.random().toString(36).substring(2, 10).toUpperCase()} | ${new Date().toLocaleDateString()}`, 450, 606);

    } else {
      // \u2500\u2500 STANDARD CERTIFICATE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      ctx.fillStyle = '#050303';
      ctx.fillRect(0, 0, 900, 640);

      // Border
      ctx.strokeStyle = '#ee6d4f';
      ctx.lineWidth = 10;
      ctx.strokeRect(15, 15, 870, 610);
      ctx.strokeStyle = '#9a3e26';
      ctx.lineWidth = 2;
      ctx.strokeRect(25, 25, 850, 590);

      // Grid
      ctx.strokeStyle = 'rgba(238, 109, 79, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 900; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 640); ctx.stroke();
      }
      for (let i = 0; i < 640; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(900, i); ctx.stroke();
      }

      ctx.fillStyle = '#ee6d4f';
      ctx.font = "800 24px 'Space Grotesk', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('QUANTUMVERSE', 450, 100);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = "500 11px 'Space Grotesk', sans-serif";
      ctx.fillText('VERIFIED QUANTUM PHYSICS GRADUATE CREDENTIAL', 450, 125);

      ctx.fillStyle = '#ffffff';
      ctx.font = "700 36px 'Space Grotesk', sans-serif";
      ctx.fillText('Certificate of Completion', 450, 205);

      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = "italic 16px 'Inter', sans-serif";
      ctx.fillText('This certifies that', 450, 260);

      ctx.fillStyle = '#f07c64';
      ctx.font = "800 32px 'Space Grotesk', sans-serif";
      ctx.fillText(this.activeUser || 'Quantum Learner', 450, 318);

      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = "14px 'Inter', sans-serif";
      ctx.fillText('has successfully completed the full QuantumVerse learning journey,', 450, 372);
      ctx.fillText('covering Qubits, Bloch Sphere, Logic Gates, Shor and Grover Algorithms,', 450, 396);
      ctx.fillText('QKD Protocols (BB84), Error Correction, and Quantum Machine Learning.', 450, 420);

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillText(`VERIFICATION ID: QV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 450, 490);
      ctx.fillText(`DATE: ${new Date().toLocaleDateString()}`, 450, 510);

      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(200, 555); ctx.lineTo(350, 555); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(550, 555); ctx.lineTo(700, 555); ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = "12px 'Space Grotesk', sans-serif";
      ctx.fillText('QUBITBOT AI', 275, 575);
      ctx.fillText('QUANTUMVERSE', 625, 575);
    }

    const certType = isGrandmaster ? 'Grandmaster' : isHonours ? 'Honours' : 'Graduate';
    const link = document.createElement('a');
    link.download = `QuantumVerse_${certType}_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();

    this._showToast(
      isGrandmaster ? 'Grandmaster Certificate Downloaded!' : isHonours ? 'Honours Certificate Downloaded!' : 'Certificate Downloaded!',
      `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
    );
  },

  handleSignOut() {
    this.activeUser = null;
    localStorage.removeItem('qv-active-user');

    // Reset to default/guest state
    this.xp = 0;
    this.level = 1;
    this.progress = {};
    this.achievements = new Set();
    this.dailyStreak = 0;
    this.lastRiddleSolvedDate = '';
    this._saveState();
    this._loadStateLocal();

    // Module views (Foundations, Gates, Algorithms, etc.) cache their rendered
    // HTML and only re-render when their container is empty (see navigate()).
    // Without clearing them here, a module visited while signed in keeps
    // showing that user's progress/checkmarks even after signing out.
    this._clearCachedModuleViews();

    this.updateAuthUI();
    this._renderXP();
    this._renderProgress();
    this.navigate('home');
  },

  // Forces module views to re-render on next visit instead of showing
  // stale, cached progress from a previous session/user.
  _clearCachedModuleViews() {
    document.querySelectorAll('.module-view').forEach(v => {
      if (v.id !== 'view-home' && v.id !== 'view-profile') {
        v.innerHTML = '';
      }
    });
  },

  changeProfileAvatar(newAvatar) {
    if (!this.activeUser) return;
    if (!this.users[this.activeUser]) this.users[this.activeUser] = {};

    this.users[this.activeUser].avatar = newAvatar;
    localStorage.setItem('qv-users', JSON.stringify(this.users));

    // Sync to backend DB
    fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: this.activeUser,
        avatar: newAvatar
      })
    }).catch(err => console.warn('Could not sync avatar change:', err));

    // Re-render views
    const container = document.getElementById('view-profile');
    if (container) this._renderProfile(container);
    this.updateAuthUI();
  },

  _renderProfile(container) {
    if (!this.activeUser) {
      container.innerHTML = `
        <div style="text-align:center; padding:5rem 2rem; max-width:500px; margin:0 auto;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 1.5rem auto; display:block; filter:drop-shadow(0 0 12px rgba(238,109,79,0.35));"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <h2 style="font-family:'Space Grotesk',sans-serif; font-weight:800; margin-bottom:1rem;">Access Restricted</h2>
          <p style="color:var(--text-muted); margin-bottom:2rem; line-height:1.6;">
            Sign in or register for a free account to view your Quantum Profile dashboard, track achievements, and unlock your radar skill visualization.
          </p>
          <button class="btn-primary" onclick="App.showAuthModal()" style="padding:0.75rem 2rem;">Sign In / Sign Up</button>
        </div>
      `;
      return;
    }

    const u = this.users[this.activeUser] || {};
    const avatarKey = u.avatar || 'atom';
    const xp = this.xp;
    const level = this.level;

    // Level progress calculations
    const currentLevelXP = xp % 1000;
    const levelProgress = (currentLevelXP / 1000) * 100;

    let finishedLessons = 0;
    if (this.visitedLessons) {
      Object.keys(this.visitedLessons).forEach(k => {
        finishedLessons += (this.visitedLessons[k] || []).length;
      });
    }

    const rank = level >= 5 ? 'Quantum Architect' : level >= 4 ? 'Algorithm Designer' : level >= 3 ? 'Gate Operator' : level >= 2 ? 'Superpositionist' : 'Quantum Novice';
    const rankClass = level >= 5 ? 'rank-architect' : level >= 4 ? 'rank-designer' : level >= 3 ? 'rank-operator' : level >= 2 ? 'rank-superpositionist' : 'rank-novice';

    const achievementList = [
      {
        id: 'welcome',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><line x1="9" y1="12" x2="15" y2="12"/><path d="M12 9a3 3 0 0 1 0 6"/></svg>`,
        name: 'First Entanglement',
        desc: 'Started learning QuantumVerse.'
      },
      {
        id: 'quiz-perfect',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        name: 'Coherent Mind',
        desc: 'Scored 100% on any quiz.'
      },
      {
        id: 'all-modules',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18v2H3z"/></svg>`,
        name: 'Master of Qubits',
        desc: 'Completed all quantum modules.'
      },
      {
        id: 'ai-chat',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        name: 'Socratic Spark',
        desc: 'Asked the AI Tutor a question.'
      },
      {
        id: 'account',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        name: 'Superposed Identity',
        desc: 'Created a secure Quantum Profile.'
      },
      {
        id: 'perfect-bell',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`,
        name: 'Entanglement Creator',
        desc: 'Created a Bell state in the Circuit Lab.'
      },
      {
        id: 'qkd-secure',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L20 4m0 0h4m-4 0v4"/></svg>`,
        name: 'QKD Sentinel',
        desc: 'Secured a private key via BB84 protocol.'
      },
      {
        id: 'error-fixed',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
        name: 'Syndrome Buster',
        desc: 'Fixed bit-flip errors in the QEC lab.'
      },
      {
        id: 'vqe-run',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`,
        name: 'VQE Optimizer',
        desc: 'Optimized hybrid parameters in the QML lab.'
      },
      // ── NEW ELITE ACHIEVEMENTS ─────────────────────────────────────────────
      {
        id: 'max-level',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
        name: 'Quantum Architect',
        desc: 'Reached the maximum rank — Level 5+. True mastery!'
      },
      {
        id: 'quiz-grandmaster',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
        name: 'Quiz Grandmaster',
        desc: 'Achieved a perfect 100% on ALL 6 module quizzes!'
      },
      {
        id: 'course-complete',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        name: 'Quantum Scholar',
        desc: 'Read and completed all 21 lessons across every module!'
      },
      {
        id: 'streak-2',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9f43" stroke-width="2" style="display:block;margin:auto;"><path d="M12 2c0 0-4 4.5-4 8.5C8 12.8 9.8 15 12 15s4-2.2 4-4.5C16 6.5 12 2 12 2z"/><path d="M12 7c0 0-2 2-2 4.5 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-2.5-1.8-4.5-1.8-4.5z"/></svg>`,
        name: 'Streak Cadet',
        desc: 'Solved the Daily Quantum Challenge two days in a row.'
      },
      {
        id: 'streak-7',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" style="display:block;margin:auto;"><path d="M12 2c0 0-4 4.5-4 8.5C8 12.8 9.8 15 12 15s4-2.2 4-4.5C16 6.5 12 2 12 2z"/><path d="M12 7c0 0-2 2-2 4.5 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-2.5-1.8-4.5-1.8-4.5z"/></svg>`,
        name: 'Coherence Streak',
        desc: 'Solved the Daily Quantum Challenge seven days in a row.'
      },
      {
        id: 'streak-30',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" style="display:block;margin:auto;"><path d="M12 2c0 0-4 4.5-4 8.5C8 12.8 9.8 15 12 15s4-2.2 4-4.5C16 6.5 12 2 12 2z"/><path d="M12 7c0 0-2 2-2 4.5 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-2.5-1.8-4.5-1.8-4.5z"/></svg>`,
        name: 'Quantum Sentinel',
        desc: 'Maintained a daily quantum challenge streak for 30 days!'
      }
    ];

    let achievementsHTML = '';
    achievementList.forEach(a => {
      const unlocked = this.achievements.has(a.id);
      achievementsHTML += `
        <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon" style="position:relative;">
            ${a.icon}
            ${!unlocked ? `<div class="badge-lock-icon" style="position:absolute; bottom:-3px; right:-3px; background:var(--bg-secondary); border:1px solid var(--border); border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center; color:var(--text-muted);"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>` : ''}
          </div>
          <div class="badge-name">${a.name}</div>
          <div class="badge-desc">${a.desc}</div>
        </div>
      `;
    });

    // Sleek Topic Progress Breakdown list
    const modulesData = [
      { id: 'foundations', name: 'Quantum Foundations', color: 'var(--accent-cyan)' },
      { id: 'gates', name: 'Gates & Circuits', color: 'var(--accent-blue)' },
      { id: 'algorithms', name: 'Quantum Algorithms', color: 'var(--accent-purple)' },
      { id: 'cryptography', name: 'Quantum Cryptography', color: 'var(--accent-gold)' },
      { id: 'error', name: 'Error Correction', color: 'var(--accent-green)' },
      { id: 'qml', name: 'Quantum ML', color: 'var(--accent-pink)' }
    ];

    let topicProgressHTML = `
      <div class="profile-section-card">
        <div class="profile-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Topic Progress Dashboard
        </div>
        <div class="topic-progress-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1.25rem; margin-top:0.5rem;">
    `;

    modulesData.forEach(m => {
      const pct = this.getModuleProgress(m.id);
      topicProgressHTML += `
        <div class="topic-progress-item" style="background:rgba(255,255,255,0.015); border:1px solid var(--border); border-radius:var(--radius-sm); padding:0.85rem; display:flex; flex-direction:column; gap:0.5rem; transition:var(--transition);">
          <div class="topic-progress-info" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="topic-progress-name" style="font-size:0.82rem; font-weight:700; color:var(--text-primary);">${m.name}</span>
            <span class="topic-progress-pct" style="font-size:0.8rem; font-weight:700; color:${m.color};">${pct}%</span>
          </div>
          <div class="topic-progress-bar-bg" style="height:6px; background:var(--border); border-radius:99px; overflow:hidden;">
            <div class="topic-progress-bar-fill" style="height:100%; width:${pct}%; background:${m.color}; border-radius:99px; transition:width 0.6s cubic-bezier(0.4,0,0.2,1);"></div>
          </div>
        </div>
      `;
    });

    topicProgressHTML += `
        </div>
      </div>
    `;

    // Show certificate — 3 tiers: Standard / Honours / Grandmaster
    const allModules = ['foundations', 'gates', 'algorithms', 'cryptography', 'error', 'qml'];
    const allLessonsDone = allModules.every(m => this.isModuleRead(m));
    const totalLessons = 21;
    const allPerfect = allModules.every(m => this.achievements.has(`${m}-perfect`));
    // allHigh = 80%+ on all quizzes (progress set to 100 when score >= 80%)
    const allHigh = allModules.every(m => (this.progress[m] || 0) >= 100);
    const isGrandmaster = allLessonsDone && allPerfect;
    const isHonours = allLessonsDone && allHigh && !allPerfect;

    let certificateHTML = '';
    if (isGrandmaster) {
      // Tier 3: Grandmaster
      certificateHTML = `
        <div class="profile-section-card" style="border: 2px solid #d4af37; background: linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03)); margin-bottom: 1.5rem; box-shadow: 0 0 30px rgba(212,175,55,0.35), 0 0 60px rgba(212,175,55,0.1); position:relative; overflow:hidden;">
          <div style="position:absolute;top:0;right:0;padding:0.3rem 0.8rem;background:#d4af37;color:#050303;font-size:0.65rem;font-weight:800;letter-spacing:0.08em;font-family:'Space Grotesk',sans-serif;border-bottom-left-radius:8px;">GRANDMASTER HONOURS</div>
          <div class="profile-section-title" style="color:#d4af37; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#d4af37" stroke="#d4af37" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
            Distinguished Quantum Grandmaster Certificate!
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.6;">
            Extraordinary! You achieved a perfect score on ALL 6 quizzes AND completed every lesson. You qualify for the elite <strong>Grandmaster Certificate</strong> with Honours.
          </p>
          <button class="btn-primary" onclick="App.generateCertificate()" style="background:#d4af37; border-color:#d4af37; color:#050303; font-weight:700; font-family:'Space Grotesk',sans-serif; text-transform:uppercase; letter-spacing:0.04em;">Download Grandmaster Certificate</button>
        </div>
      `;
    } else if (isHonours) {
      // Tier 2: Honours (80%+ on all)
      certificateHTML = `
        <div class="profile-section-card" style="border: 2px solid #5ba3d9; background: linear-gradient(135deg, rgba(91,163,217,0.1), rgba(91,163,217,0.02)); margin-bottom: 1.5rem; box-shadow: 0 0 25px rgba(91,163,217,0.25), 0 0 50px rgba(91,163,217,0.08); position:relative; overflow:hidden;">
          <div style="position:absolute;top:0;right:0;padding:0.3rem 0.8rem;background:#5ba3d9;color:#020a14;font-size:0.65rem;font-weight:800;letter-spacing:0.08em;font-family:'Space Grotesk',sans-serif;border-bottom-left-radius:8px;">WITH DISTINCTION</div>
          <div class="profile-section-title" style="color:#5ba3d9; display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5ba3d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Honours Certificate Unlocked!
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.6;">
            Excellent work! You scored 80%+ on ALL 6 module quizzes and completed every lesson. You qualify for the <strong>Honours Certificate of Distinction</strong>. Score 100% on all quizzes to unlock the elite Grandmaster level!
          </p>
          <button class="btn-primary" onclick="App.generateCertificate()" style="background:#5ba3d9; border-color:#5ba3d9; color:#020a14; font-weight:700; font-family:'Space Grotesk',sans-serif; text-transform:uppercase; letter-spacing:0.04em;">Download Honours Certificate</button>
        </div>
      `;
    } else if (allLessonsDone) {
      // Tier 1: Standard
      certificateHTML = `
        <div class="profile-section-card" style="border: 2px solid var(--accent-gold); background: linear-gradient(135deg, rgba(212,175,55,0.06), transparent); margin-bottom: 1.5rem; box-shadow: 0 0 15px rgba(212,175,55,0.15); position:relative; overflow:hidden;">
          <div class="profile-section-title" style="color:var(--accent-gold); display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Quantum Certificate Unlocked!
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.6;">
            Congratulations! You completed all 21 lessons. Score 80%+ on all 6 quizzes for the Honours Certificate, or 100% on all for the elite Grandmaster Certificate!
          </p>
          <button class="btn-primary" onclick="App.generateCertificate()" style="background:var(--accent-gold); border-color:var(--accent-gold); color:#050303; font-weight:700; font-family:'Space Grotesk',sans-serif; text-transform:uppercase; letter-spacing:0.04em;">Get Certificate</button>
        </div>
      `;
    } else {
      // Locked
      certificateHTML = `
        <div class="profile-section-card" style="border: 1px dashed var(--border); background: transparent; margin-bottom: 1.5rem; opacity: 0.7;">
          <div class="profile-section-title" style="color:var(--text-secondary); display:flex; align-items:center; gap:8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Quantum Certificate (Locked)
          </div>
          <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;">
            Complete all 21 lessons to unlock the Graduate Certificate. Score 80%+ on all 6 quizzes for the <strong>Honours</strong> Certificate, or 100% on all 6 for the elite <strong>Grandmaster</strong> Certificate! (Progress: <strong>${finishedLessons}/${totalLessons}</strong> lessons)
          </p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="profile-dashboard">
        <div class="profile-sidebar-card">
          <div class="profile-avatar-large" style="display:flex; align-items:center; justify-content:center;">${this.getAvatarSVG(avatarKey, 72, 2.5)}</div>
          <div class="profile-username">${this.activeUser}</div>
          <div class="profile-rank ${rankClass}">${rank}</div>
          
          <!-- Interactive Avatar Quick Changer -->
          <div style="margin-bottom:1.5rem; width:100%;">
            <div style="font-size:0.68rem; color:var(--text-muted); margin-bottom:0.45rem; text-transform:uppercase; letter-spacing:0.06em; font-weight:700;">Change Quantum Avatar</div>
            <div class="avatar-selector" style="justify-content:center; gap:0.35rem; display:flex; flex-wrap:wrap; background:rgba(0,0,0,0.04); padding:0.4rem; border-radius:var(--radius-sm); border:1px solid var(--border);">
              ${['atom', 'bloch', 'cat', 'chip', 'wave', 'entangled', 'lock', 'magnet'].map(av => `
                <div class="avatar-option ${av === avatarKey ? 'active' : ''}" style="padding:0; width:2.2rem; height:2.2rem; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="App.changeProfileAvatar('${av}')">
                  ${this.getAvatarSVG(av, 20, 2)}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="profile-level-container">
            <div class="profile-level-header">
              <span>Level ${level}</span>
              <span>${currentLevelXP} / 1000 XP</span>
            </div>
            <div class="profile-level-bar-bg">
              <div class="profile-level-bar-fill" style="width: ${levelProgress}%"></div>
            </div>
          </div>
          
          <button class="profile-signout-btn" onclick="App.handleSignOut()">Sign Out</button>
        </div>
        
        <div class="profile-main-content">
          ${certificateHTML}
          <div class="profile-section-card">
            <div class="profile-section-title">Training Statistics</div>
            <div class="profile-stats-grid">
              <div class="profile-stat-box">
                <div class="profile-stat-num">${xp}</div>
                <div class="profile-stat-lbl">Total XP</div>
              </div>
              <div class="profile-stat-box">
                <div class="profile-stat-num">${finishedLessons}</div>
                <div class="profile-stat-lbl">Lessons Completed</div>
              </div>
              <div class="profile-stat-box">
                <div class="profile-stat-num">${this.achievements.size}</div>
                <div class="profile-stat-lbl">Achievements</div>
              </div>
            </div>
          </div>
          
          ${topicProgressHTML}
          
          <div class="profile-section-card">
            <div class="profile-section-title">Quantum Skill Profile</div>
            <div style="height:320px;position:relative;">
              <div id="profileRadarContainer" style="width:100%;height:100%;"></div>
            </div>
          </div>
          
          <div class="profile-section-card">
            <div class="profile-section-title">Unlocked Achievements</div>
            <div class="achievements-grid">
              ${achievementsHTML}
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (typeof SkillRadar !== 'undefined') {
        SkillRadar.render('profileRadarContainer');
      }
    }, 150);
  },

  _renderModule(module, container) {
    const moduleMap = {
      foundations: typeof FoundationsModule !== 'undefined' ? FoundationsModule : null,
      gates: typeof GatesModule !== 'undefined' ? GatesModule : null,
      algorithms: typeof AlgorithmsModule !== 'undefined' ? AlgorithmsModule : null,
      cryptography: typeof CryptographyModule !== 'undefined' ? CryptographyModule : null,
      error: typeof ErrorCorrectionModule !== 'undefined' ? ErrorCorrectionModule : null,
      qml: typeof QMLModule !== 'undefined' ? QMLModule : null,
    };
    const mod = moduleMap[module];
    if (mod && typeof mod.render === 'function') mod.render(container);
  },

  // ── XP & Level ────────────────────────────────────────────────────────
  addXP(amount) {
    this.xp += amount;
    const newLevel = Math.floor(this.xp / 1000) + 1;
    if (newLevel > this.level) {
      const oldLevel = this.level;
      this.level = newLevel;
      this.unlockAchievement(`level-${newLevel}`, `Reached Level ${newLevel}!`, '');
      if (newLevel >= 5) {
        this.unlockAchievement('max-level', 'You reached the maximum rank — Quantum Architect (Level 5+)!', 'max-level');
      }

      // Trigger Splashy Level Up Overlay
      const numEl = document.getElementById('levelUpNum');
      const rankEl = document.getElementById('levelUpRank');
      const overlay = document.getElementById('levelUpOverlay');
      if (numEl) numEl.textContent = newLevel;
      if (rankEl) {
        rankEl.textContent = newLevel >= 5 ? 'Quantum Architect' :
          newLevel >= 4 ? 'Algorithm Designer' :
            newLevel >= 3 ? 'Gate Operator' :
              newLevel >= 2 ? 'Superpositionist' : 'Quantum Novice';
      }
      if (overlay) {
        overlay.classList.remove('hidden');
        const card = overlay.querySelector('.level-up-card');
        if (card && typeof gsap !== 'undefined') {
          gsap.fromTo(card, { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
        }
      }
    }
    this._renderXP();
    this._saveState();
  },

  _renderXP() {
    const xpEl = document.getElementById('xpCount');
    const lvEl = document.getElementById('levelBadge');
    const streakCountEl = document.getElementById('streakCount');
    if (xpEl) {
      if (typeof gsap !== 'undefined' && xpEl._xpVal !== undefined) {
        gsap.to(xpEl, {
          textContent: this.xp, duration: 0.4, ease: 'power1.out', snap: { textContent: 1 },
          onUpdate: function () { xpEl.textContent = Math.round(this.targets()[0].textContent); }
        });
      } else {
        xpEl.textContent = this.xp;
      }
      xpEl._xpVal = this.xp;
    }
    if (lvEl) lvEl.textContent = `Lv.${this.level}`;
    if (streakCountEl) {
      streakCountEl.textContent = this.dailyStreak || 0;
    }
  },

  getModuleProgress(m) {
    const lessonsCount = { foundations: 5, gates: 4, algorithms: 4, cryptography: 3, error: 2, qml: 4 }[m] || 3;
    const visitedCount = this.visitedLessons && this.visitedLessons[m] ? this.visitedLessons[m].length : 0;
    const quizScore = this.progress[m] || 0;
    const quizDone = quizScore > 0 ? 1 : 0;
    return Math.round(((visitedCount + quizDone) / (lessonsCount + 1)) * 100);
  },

  // ── Progress ───────────────────────────────────────────────────────────
  updateProgress(module, pct) {
    this.progress[module] = Math.max(this.progress[module] || 0, pct);
    this._renderProgress();
    this._saveState();
  },

  markLessonVisited(module, idx) {
    // Tab switching no longer auto-completes the lesson
  },

  markLessonRead(module, idx, btn) {
    if (!this.visitedLessons) this.visitedLessons = {};
    if (!this.visitedLessons[module]) this.visitedLessons[module] = [];

    if (!this.visitedLessons[module].includes(idx)) {
      this.visitedLessons[module].push(idx);
      this.addXP(15);
      this._saveState();
      this._renderProgress();

      if (btn) {
        btn.disabled = true;
        btn.style.background = 'rgba(16, 185, 129, 0.1)';
        btn.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        btn.style.color = '#10b981';
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polyline points="20 6 9 17 4 12"/></svg> Concept Mastered (+15 XP earned)`;
      }

      this.refreshModuleQuizSection(module);

      // Auto-transition to next lesson or module
      const activeView = document.querySelector('.module-view.active');
      if (activeView) {
        const tabs = Array.from(activeView.querySelectorAll('.lesson-tab'));
        const activeTabIdx = tabs.findIndex(tab => tab.classList.contains('active'));
        if (activeTabIdx !== -1 && activeTabIdx < tabs.length - 1) {
          // Move to the next tab in the current module
          setTimeout(() => {
            tabs[activeTabIdx + 1].click();
            const mainContent = document.getElementById('mainContent');
            if (mainContent) mainContent.scrollTop = 0;
          }, 1000);
        } else {
          // Last lesson in this module was completed, auto-navigate to the next module
          const modules = ['foundations', 'gates', 'algorithms', 'cryptography', 'error', 'qml'];
          const currentIdx = modules.indexOf(module);
          if (currentIdx !== -1 && currentIdx < modules.length - 1) {
            const nextMod = modules[currentIdx + 1];
            setTimeout(() => {
              this.navigateTo(nextMod);
              const nextView = document.getElementById(`view-${nextMod}`);
              if (nextView) {
                const firstTab = nextView.querySelector('.lesson-tab');
                if (firstTab) firstTab.click();
              }
              const mainContent = document.getElementById('mainContent');
              if (mainContent) mainContent.scrollTop = 0;
            }, 1400);
          } else if (currentIdx === modules.length - 1) {
            // Completed QML (the final module), navigate to the Profile page
            setTimeout(() => {
              this.navigateTo('profile');
              const mainContent = document.getElementById('mainContent');
              if (mainContent) mainContent.scrollTop = 0;
            }, 1400);
          }
        }
      }

      // Check if entire course is now complete
      const allModules = ['foundations', 'gates', 'algorithms', 'cryptography', 'error', 'qml'];
      const allDone = allModules.every(m => this.isModuleRead(m));
      if (allDone) {
        this.unlockAchievement('course-complete', 'You completed all 21 lessons across every module!', 'course-complete');
        this.unlockAchievement('all-modules', 'Completed all quantum modules!', 'all-modules');
      }
    }
  },

  isModuleRead(module) {
    const requiredCounts = {
      foundations: 5,
      gates: 4,
      algorithms: 4,
      cryptography: 3,
      error: 2,
      qml: 4
    };
    const required = requiredCounts[module] || 3;
    const visited = this.visitedLessons && this.visitedLessons[module] ? this.visitedLessons[module].length : 0;
    return visited >= required;
  },

  renderMarkCompletedButton(module, idx) {
    const completed = this.visitedLessons && this.visitedLessons[module] && this.visitedLessons[module].includes(idx);
    const checkSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polyline points="20 6 9 17 4 12"/></svg>`;
    if (completed) {
      return `
        <div style="margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--border); display:flex; justify-content:flex-end;">
          <button class="btn-primary" disabled style="background:rgba(16, 185, 129, 0.1); border-color:rgba(16, 185, 129, 0.2); color:#10b981; cursor:default; font-weight:600; padding:0.6rem 1.5rem; display:flex; align-items:center; gap:6px;">
            ${checkSVG} Concept Mastered (+15 XP earned)
          </button>
        </div>
      `;
    } else {
      return `
        <div style="margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--border); display:flex; justify-content:flex-end;">
          <button class="btn-primary mark-read-btn" onclick="App.markLessonRead('${module}', ${idx}, this)" style="background:var(--grad-main); border:none; color:#ffffff; font-weight:600; padding:0.6rem 1.5rem; display:flex; align-items:center; gap:6px;">
            ${checkSVG} Mark Concept as Completed
          </button>
        </div>
      `;
    }
  },

  renderQuizSection(module) {
    const T = (k) => this.t(k);
    const requiredCounts = { foundations: 5, gates: 4, algorithms: 4, cryptography: 2, error: 2, qml: 4 };
    const req = requiredCounts[module] || 3;
    const visited = this.visitedLessons[module] || [];
    const read = visited.length;
    const isUnlocked = read >= req;

    // Retrieve lesson names depending on module
    let conceptNames = [];
    if (module === 'foundations') {
      conceptNames = [T('f_tab1'), T('f_tab2'), T('f_tab3'), T('f_tab4'), T('f_tab5')];
    } else if (module === 'gates') {
      conceptNames = [T('g_tab1'), T('g_tab2'), T('g_tab3'), T('g_tab4')];
    } else if (module === 'algorithms') {
      conceptNames = [T('a_tab1'), T('a_tab2'), 'Quantum Fourier Transform', T('a_tab3')];
    } else if (module === 'cryptography') {
      conceptNames = [T('c_tab1'), T('c_tab2')];
    } else if (module === 'error') {
      conceptNames = [T('e_tab1'), T('e_tab2')];
    } else if (module === 'qml') {
      conceptNames = ['Parameterized Circuits', 'Variational Algorithms (VQE)', 'QAOA Optimization', 'QML vs Classical'];
    }

    // Clean html titles (remove number prefix if exists like "1. ")
    conceptNames = conceptNames.map(name => name.replace(/^\d+\.\s*/, ''));

    if (isUnlocked) {
      return `
        <div class="quiz-launch-section unlocked" style="border: 2px solid var(--accent-green); background: rgba(16, 185, 129, 0.04); text-align: center; padding: 2rem; border-radius: var(--radius-lg); margin-top: 2rem;">
          <div style="margin-bottom: 0.75rem; display: flex; justify-content: center; color: var(--accent-gold);">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 1 6 6v3.5c0 1.66-1.34 3-3 3H9a3 3 0 0 1-3-3V8a6 6 0 0 1 6-6z"/></svg>
          </div>
          <h3 style="font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:1.4rem; color:var(--text-primary); margin-bottom:0.5rem;">Module Quiz Unlocked!</h3>
          <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.9rem;">
            You have mastered all ${req} core concepts! Ready to test your knowledge and claim your XP?
          </p>
          <button class="btn-quiz" onclick="Quiz.launch('${module}')" style="padding:0.75rem 2rem; font-weight:700;">
            ${T('quiz_start')}
          </button>
        </div>
      `;
    } else {
      // Locked state: show checklist!
      let checklistHTML = '';
      for (let i = 0; i < req; i++) {
        const completed = visited.includes(i);
        const checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px;"><polyline points="20 6 9 17 4 12"/></svg>`;
        const lockIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;

        checklistHTML += `
          <div class="quiz-check-item" style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:${completed ? 'var(--text-primary)' : 'var(--text-muted)'};">
            <span style="display:flex; align-items:center;">
              ${completed ? checkIcon : lockIcon}
            </span>
            <span style="${completed ? 'text-decoration: line-through; opacity:0.6;' : ''}">
              Concept ${i + 1}: ${conceptNames[i] || 'Lesson'}
            </span>
          </div>
        `;
      }

      return `
        <div class="quiz-launch-section locked" style="border: 1px dashed var(--border); background: rgba(0,0,0,0.02); padding: 2rem; border-radius: var(--radius-lg); margin-top: 2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
            <div>
              <h3 style="font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:1.25rem; display:flex; align-items:center; gap:8px; margin:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted); display:inline-block;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Module Quiz Locked
              </h3>
              <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.25rem; margin-bottom:0;">
                Read and mark all lessons as completed to unlock the final quiz.
              </p>
            </div>
            <div style="background:var(--bg-secondary); border:1px solid var(--border); padding:0.4rem 1rem; border-radius:99px; font-size:0.8rem; font-weight:700; color:var(--text-secondary);">
              ${read} / ${req} Completed
            </div>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; border-top:1px solid var(--border); padding-top:1.25rem;">
            ${checklistHTML}
          </div>
        </div>
      `;
    }
  },

  refreshModuleQuizSection(module) {
    const el = document.getElementById(`module-quiz-section-${module}`);
    if (el) {
      el.innerHTML = this.renderQuizSection(module);
    }
  },

  _renderProgress() {
    const modules = ['foundations', 'gates', 'algorithms', 'cryptography', 'error', 'qml'];
    modules.forEach(m => {
      const lessonsCount = { foundations: 5, gates: 4, algorithms: 4, cryptography: 3, error: 2, qml: 4 }[m];
      const visitedCount = this.visitedLessons && this.visitedLessons[m] ? this.visitedLessons[m].length : 0;
      const quizScore = this.progress[m] || 0;
      const quizDone = quizScore > 0 ? 1 : 0;
      const modulePct = Math.round(((visitedCount + quizDone) / (lessonsCount + 1)) * 100);

      // Sidebar progress bar
      const bar = document.getElementById(`prog-${m}`);
      if (bar) bar.style.width = modulePct + '%';

      // Sidebar floating percentage badge
      const badge = document.getElementById(`prog-badge-${m}`);
      if (badge) {
        badge.textContent = modulePct + '%';
        if (modulePct === 100) {
          badge.classList.add('completed');
        } else {
          badge.classList.remove('completed');
        }
      }

      // Sidebar text label update
      const label = document.getElementById(`prog-label-${m}`);
      if (label) {
        const transKey = m === 'foundations' ? 'nav_foundations' :
          m === 'qml' ? 'nav_qml' : `nav_${m}`;
        const baseName = (m === 'foundations' || m === 'qml')
          ? this.t(transKey)
          : this.t(transKey).split(' ')[0];
        label.textContent = baseName;
      }

      // Card progress bar on homepage
      const cbar = document.getElementById(`card-prog-${m}`);
      if (cbar) cbar.style.width = modulePct + '%';

      // Homepage card CTA update
      const ctaId = m === 'foundations' ? 'card-f-cta' :
        m === 'gates' ? 'card-g-cta' :
          m === 'algorithms' ? 'card-a-cta' :
            m === 'cryptography' ? 'card-c-cta' :
              m === 'error' ? 'card-e-cta' : 'card-qml-cta';
      const cta = document.getElementById(ctaId);
      if (cta) {
        if (modulePct === 100) {
          cta.textContent = 'Completed ✓';
          cta.style.color = '#10b981';
        } else {
          cta.textContent = m === 'gates' ? 'Build Circuits' : m === 'qml' ? 'Explore QML' : 'Start Learning';
          cta.style.color = '';
        }
      }
    });

    if (typeof CircuitBuilder !== 'undefined') {
      CircuitBuilder.create('mainCircuitCanvas');
    }

    if (typeof SkillRadar !== 'undefined') {
      SkillRadar.update();
    }
  },

  // ── Achievements ───────────────────────────────────────────────────────
  // Public toast alias so external components can call App.showToast()
  showToast(title, body) {
    const icon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    this._showToast(body || title, icon);
  },
  unlockAchievement(id, desc, icon = '') {
    if (this.achievements.has(id)) return;
    this.achievements.add(id);
    this._saveState();

    // Fetch matching SVG icon from list if exists to keep SVGs in toasts
    let toastIcon = icon;
    const matched = [
      { id: 'welcome', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><line x1="9" y1="12" x2="15" y2="12"/><path d="M12 9a3 3 0 0 1 0 6"/></svg>` },
      { id: 'quiz-perfect', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
      { id: 'all-modules', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18v2H3z"/></svg>` },
      { id: 'ai-chat', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
      { id: 'account', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>` },
      { id: 'perfect-bell', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>` },
      { id: 'qkd-secure', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L20 4m0 0h4m-4 0v4"/></svg>` },
      { id: 'error-fixed', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>` },
      { id: 'vqe-run', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>` },
      { id: 'max-level', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>` },
      { id: 'quiz-grandmaster', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>` },
      { id: 'course-complete', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` },
      { id: 'streak-2', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9f43" stroke-width="2" style="display:block;margin:auto;"><path d="M12 2c0 0-4 4.5-4 8.5C8 12.8 9.8 15 12 15s4-2.2 4-4.5C16 6.5 12 2 12 2z"/><path d="M12 7c0 0-2 2-2 4.5 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-2.5-1.8-4.5-1.8-4.5z"/></svg>` },
      { id: 'streak-7', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" stroke-width="2" style="display:block;margin:auto;"><path d="M12 2c0 0-4 4.5-4 8.5C8 12.8 9.8 15 12 15s4-2.2 4-4.5C16 6.5 12 2 12 2z"/><path d="M12 7c0 0-2 2-2 4.5 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-2.5-1.8-4.5-1.8-4.5z"/></svg>` },
      { id: 'streak-30', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" style="display:block;margin:auto;"><path d="M12 2c0 0-4 4.5-4 8.5C8 12.8 9.8 15 12 15s4-2.2 4-4.5C16 6.5 12 2 12 2z"/><path d="M12 7c0 0-2 2-2 4.5 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-2.5-1.8-4.5-1.8-4.5z"/></svg>` }
    ].find(x => x.id === id);

    if (matched) {
      toastIcon = matched.icon;
    } else {
      toastIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 1 6 6v3.5c0 1.66-1.34 3-3 3H9a3 3 0 0 1-3-3V8a6 6 0 0 1 6-6z"/></svg>`;
    }

    this._showToast(desc, toastIcon);
  },

  checkStreakAchievements() {
    if (this.dailyStreak >= 2) {
      this.unlockAchievement('streak-2', 'Maintained a 2-day daily challenge streak! Streak Cadet.');
    }
    if (this.dailyStreak >= 7) {
      this.unlockAchievement('streak-7', 'Maintained a 7-day daily challenge streak! Coherence Streak.');
    }
    if (this.dailyStreak >= 30) {
      this.unlockAchievement('streak-30', 'Maintained a 30-day daily challenge streak! Quantum Sentinel.');
    }
  },

  navigateToDailyRiddle() {
    const scrollToWidget = () => {
      const widget = document.getElementById('daily-riddle-widget');
      if (widget) {
        widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        widget.style.outline = '3px solid var(--accent-orange)';
        widget.style.boxShadow = '0 0 25px rgba(255, 159, 67, 0.45)';
        widget.style.transition = 'all 0.4s ease';
        setTimeout(() => {
          widget.style.outline = 'none';
          widget.style.boxShadow = '';
        }, 2200);
      }
    };

    if (this.currentView === 'home') {
      // Already on home — just scroll, no page switch
      scrollToWidget();
    } else {
      // Navigate to home first, then scroll
      this.navigate('home');
      setTimeout(scrollToWidget, 200);
    }
  },

  _showToast(desc, icon) {
    const toast = document.getElementById('achievementToast');
    const iconEl = document.getElementById('toastIcon');
    const descEl = document.getElementById('toastDesc');
    if (!toast) return;

    if (icon.trim().startsWith('<svg')) {
      iconEl.innerHTML = icon;
    } else {
      iconEl.textContent = icon;
    }
    descEl.textContent = desc;
    toast.classList.add('show');

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(toast,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)',
          onComplete: () => {
            gsap.to(toast, {
              opacity: 0, x: 60, duration: 0.4, delay: 3.5,
              onComplete: () => toast.classList.remove('show')
            });
          }
        }
      );
    } else {
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  },

  // ── Three.js Quantum Particle Canvas ──────────────────────────────────
  _initQuantumCanvas() {
    const canvas = document.getElementById('quantumCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = canvas.parentElement.offsetWidth || 1200;
    canvas.height = canvas.parentElement.offsetHeight || 420;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 100);
    camera.position.z = 5;

    // Create 180 particles representing qubits
    const N = 180;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(N * 3);
    const phases = new Float32Array(N);
    const speeds = new Float32Array(N);
    const colors = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.3 + Math.random() * 0.8;

      // Color: mix between cyan (0,212,255) and violet (139,92,246)
      const mix = Math.random();
      colors[i * 3] = (mix * 139 + (1 - mix) * 0) / 255;
      colors[i * 3 + 1] = (mix * 92 + (1 - mix) * 212) / 255;
      colors[i * 3 + 2] = (mix * 246 + (1 - mix) * 255) / 255;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05, vertexColors: true, transparent: true, opacity: 0.7,
      sizeAttenuation: true
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let t = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.008;
      const pos = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        // Wave motion — each particle oscillates (quantum uncertainty)
        pos[i * 3 + 1] += Math.sin(t * speeds[i] + phases[i]) * 0.004;
        // Slow drift
        pos[i * 3] += Math.cos(t * 0.1 + phases[i] * 0.5) * 0.001;
        // Wrap horizontally
        if (pos[i * 3] > 9) pos[i * 3] = -9;
        if (pos[i * 3] < -9) pos[i * 3] = 9;
      }
      geo.attributes.position.needsUpdate = true;

      // Pulse opacity to simulate superposition flicker
      mat.opacity = 0.45 + Math.sin(t * 1.5) * 0.15;
      points.rotation.y = t * 0.03;
      renderer.render(scene, camera);
    };
    animate();
  },

  // ── Hero Bloch Sphere (home) ───────────────────────────────────────────
  _initHeroBloch() {
    if (typeof BlochSphere !== 'undefined') {
      this.heroBloch = BlochSphere.create('heroBloch');
      // Auto-rotate through states
      const states = [
        [0, 0], [90, 0], [90, 90], [90, 180], [45, 45]
      ];
      let si = 0;
      setInterval(() => {
        si = (si + 1) % states.length;
        if (this.heroBloch && this.heroBloch.setAngles) {
          this.heroBloch.setAngles(states[si][0], states[si][1]);
        }
      }, 2500);
    }
  },

  // ── Bloch Sphere Sandbox ───────────────────────────────────────────────
  initSandbox() {
    if (typeof BlochSphere !== 'undefined') {
      this.sandbox.instance = BlochSphere.create('sandboxBlochCanvas', { width: 340, height: 340 });
      this.sandbox.theta = 0;
      this.sandbox.phi = 0;
      this.updateSandboxUI();
    }
  },

  onSandboxSliderInput() {
    const tSlider = document.getElementById('sandboxThetaSlider');
    const pSlider = document.getElementById('sandboxPhiSlider');
    if (!tSlider || !pSlider) return;

    this.sandbox.theta = parseInt(tSlider.value);
    this.sandbox.phi = parseInt(pSlider.value);

    if (this.sandbox.instance) {
      this.sandbox.instance.setState(this.sandbox.theta, this.sandbox.phi);
    }
    this.updateSandboxUI();
  },

  setSandboxPreset(preset) {
    let t = 0, p = 0;
    if (preset === '0') { t = 0; p = 0; }
    else if (preset === '1') { t = 180; p = 0; }
    else if (preset === '+') { t = 90; p = 0; }
    else if (preset === '-') { t = 90; p = 180; }
    else if (preset === 'i') { t = 90; p = 90; }
    else if (preset === '-i') { t = 90; p = 270; }

    this.sandbox.theta = t;
    this.sandbox.phi = p;

    const tSlider = document.getElementById('sandboxThetaSlider');
    const pSlider = document.getElementById('sandboxPhiSlider');
    if (tSlider) tSlider.value = t;
    if (pSlider) pSlider.value = p;

    if (this.sandbox.instance) {
      this.sandbox.instance.setState(t, p);
    }
    this.updateSandboxUI();
  },

  applyGateToSandbox(gate) {
    const nextState = this._applyGateMath(gate, this.sandbox.theta, this.sandbox.phi);

    this.sandbox.theta = nextState.theta;
    this.sandbox.phi = nextState.phi;

    const tSlider = document.getElementById('sandboxThetaSlider');
    const pSlider = document.getElementById('sandboxPhiSlider');
    if (tSlider) tSlider.value = this.sandbox.theta;
    if (pSlider) pSlider.value = this.sandbox.phi;

    if (this.sandbox.instance) {
      this.sandbox.instance.setState(this.sandbox.theta, this.sandbox.phi);
    }
    this.updateSandboxUI();
  },

  _applyGateMath(gate, theta, phi) {
    const t = (theta * Math.PI) / 180;
    const p = (phi * Math.PI) / 180;

    let x = Math.sin(t) * Math.cos(p);
    let y = Math.sin(t) * Math.sin(p);
    let z = Math.cos(t);

    let xNew = x, yNew = y, zNew = z;

    if (gate === 'X') {
      xNew = x; yNew = -y; zNew = -z;
    } else if (gate === 'Y') {
      xNew = -x; yNew = y; zNew = -z;
    } else if (gate === 'Z') {
      xNew = -x; yNew = -y; zNew = z;
    } else if (gate === 'H') {
      xNew = z; yNew = -y; zNew = x;
    } else if (gate === 'S') {
      xNew = -y; yNew = x; zNew = z;
    } else if (gate === 'T') {
      const cos45 = Math.cos(Math.PI / 4);
      const sin45 = Math.sin(Math.PI / 4);
      xNew = x * cos45 - y * sin45;
      yNew = x * sin45 + y * cos45;
      zNew = z;
    }

    zNew = Math.max(-1, Math.min(1, zNew));
    const newTheta = Math.round((Math.acos(zNew) * 180) / Math.PI);

    let newPhi = Math.round((Math.atan2(yNew, xNew) * 180) / Math.PI);
    if (newPhi < 0) newPhi += 360;

    return { theta: newTheta, phi: newPhi };
  },

  updateSandboxUI() {
    const tVal = document.getElementById('sandboxThetaVal');
    const pVal = document.getElementById('sandboxPhiVal');
    const dirac = document.getElementById('sandboxDiracFormula');
    const pZero = document.getElementById('sandboxProbZero');
    const pOne = document.getElementById('sandboxProbOne');
    const pZeroText = document.getElementById('sandboxProbZeroText');
    const pOneText = document.getElementById('sandboxProbOneText');

    if (tVal) tVal.textContent = this.sandbox.theta + '°';
    if (pVal) pVal.textContent = this.sandbox.phi + '°';

    const tRad = (this.sandbox.theta * Math.PI) / 180;
    const pZeroVal = Math.pow(Math.cos(tRad / 2), 2);
    const pOneVal = Math.pow(Math.sin(tRad / 2), 2);

    const zeroPct = Math.round(pZeroVal * 100);
    const onePct = 100 - zeroPct;

    if (pZero) pZero.style.width = zeroPct + '%';
    if (pOne) pOne.style.width = onePct + '%';
    if (pZeroText) pZeroText.textContent = zeroPct + '%';
    if (pOneText) pOneText.textContent = onePct + '%';

    const c0 = Math.cos(tRad / 2).toFixed(3);
    const c1 = Math.sin(tRad / 2).toFixed(3);
    if (dirac) {
      if (this.sandbox.theta === 0) {
        dirac.innerHTML = '|ψ⟩ = 1.000|0⟩';
      } else if (this.sandbox.theta === 180) {
        dirac.innerHTML = '|ψ⟩ = 1.000|1⟩';
      } else {
        const phiPart = this.sandbox.phi !== 0 ? `e<sup>i${this.sandbox.phi}°</sup>` : '';
        dirac.innerHTML = `|ψ⟩ = ${c0}|0⟩ + ${c1}${phiPart}|1⟩`;
      }
    }
  },



  // ── Events ────────────────────────────────────────────────────────────
  _bindEvents() {
    // Nav items
    document.querySelectorAll('.nav-item[data-module]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(el.getAttribute('data-module'));
      });
    });

    // Menu toggle (sidebar collapse)
    const menuBtn = document.getElementById('menuToggle');
    if (menuBtn) menuBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    // AI Tutor open/close
    const tutorToggle = document.getElementById('tutorToggle');
    const tutorClose = document.getElementById('tutorClose');
    const tutorPanel = document.getElementById('tutorPanel');
    if (tutorToggle) tutorToggle.addEventListener('click', () => {
      if (tutorPanel) {
        tutorPanel.classList.toggle('open');
      }
    });
    if (tutorClose) tutorClose.addEventListener('click', () => {
      if (tutorPanel) {
        tutorPanel.classList.remove('open');
      }
    });

    // Keyboard nav for cards
    document.querySelectorAll('.module-card[tabindex]').forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') card.click();
      });
    });

    // Keyboard shortcuts and shortcuts modal
    this._initKeyboardShortcuts();
    this._initShortcutsModal();
    this._initSearch();
  },
  // ── Search ──────────────────────────────────────────────────────────────
  _searchIndex: [
    // Quantum Foundations
    { title: 'What is Quantum Computing?', meta: 'Qubits, superposition, classical vs quantum', module: 'foundations', nav: 'Foundations' },
    { title: 'Superposition & Interference', meta: 'Wave function, probability amplitudes', module: 'foundations', nav: 'Foundations' },
    { title: 'Bloch Sphere Visualizer', meta: 'Interactive 3D qubit state representation', module: 'foundations', nav: 'Foundations' },
    { title: 'Quantum Entanglement', meta: 'Bell states, EPR paradox, non-locality', module: 'foundations', nav: 'Foundations' },
    { title: 'Quantum Measurement', meta: 'Collapse, Born rule, observables', module: 'foundations', nav: 'Foundations' },
    // Gates & Circuits
    { title: 'Single-Qubit Gates', meta: 'X, Y, Z, H, S, T gates and their matrices', module: 'gates', nav: 'Gates & Circuits' },
    { title: 'Multi-Qubit Gates', meta: 'CNOT, Toffoli, SWAP gate operations', module: 'gates', nav: 'Gates & Circuits' },
    { title: 'Circuit Builder Lab', meta: 'Interactive drag-and-drop circuit editor', module: 'gates', nav: 'Gates & Circuits' },
    { title: 'Quantum Teleportation Circuit', meta: 'Bell measurement, classical communication', module: 'gates', nav: 'Gates & Circuits' },
    // Algorithms
    { title: "Grover's Search Algorithm", meta: 'Quadratic speedup, oracle, amplitude amplification', module: 'algorithms', nav: 'Algorithms' },
    { title: 'Deutsch-Jozsa Algorithm', meta: 'Constant vs balanced function, quantum parallelism', module: 'algorithms', nav: 'Algorithms' },
    { title: "Shor's Factoring Algorithm", meta: 'Period finding, RSA cryptography threat', module: 'algorithms', nav: 'Algorithms' },
    { title: 'QAOA Optimizer', meta: 'Quantum Approximate Optimization, variational', module: 'algorithms', nav: 'Algorithms' },
    // Cryptography
    { title: 'BB84 Quantum Key Distribution', meta: 'QKD protocol, eavesdropping detection', module: 'cryptography', nav: 'Cryptography' },
    { title: 'E91 Entanglement-Based Protocol', meta: 'Bell inequality test, secure key generation', module: 'cryptography', nav: 'Cryptography' },
    { title: 'Post-Quantum Cryptography', meta: 'Lattice-based, hash-based, NIST standards', module: 'cryptography', nav: 'Cryptography' },
    // Error Correction
    { title: '3-Qubit Bit-Flip Code', meta: 'Repetition code, majority voting, stabilizers', module: 'error', nav: 'Error Correction' },
    { title: 'Shor Error Correction Code', meta: '9-qubit code, bit and phase flip protection', module: 'error', nav: 'Error Correction' },
    // Quantum ML
    { title: 'Quantum Neural Networks', meta: 'Parameterized circuits, variational quantum', module: 'qml', nav: 'Quantum ML' },
    { title: 'VQE — H₂ Molecule Simulation', meta: 'Variational Quantum Eigensolver, Morse potential', module: 'qml', nav: 'Quantum ML' },
    { title: 'QSVM Classifier', meta: 'Quantum support vector machine, kernel methods', module: 'qml', nav: 'Quantum ML' },
    { title: 'Quantum Reinforcement Learning', meta: 'Q-learning with quantum amplitude estimation', module: 'qml', nav: 'Quantum ML' },
  ],
  _searchActiveIndex: -1,

  _initSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const toggle = document.getElementById('headerSearch');
    if (!overlay || !input || !results || !toggle) return;

    toggle.addEventListener('click', () => this._toggleSearch(true));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) this._toggleSearch(false); });

    input.addEventListener('input', () => {
      this._searchActiveIndex = -1;
      const q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; return; }

      const hits = this._searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q) ||
        item.nav.toLowerCase().includes(q)
      ).slice(0, 8);

      if (hits.length === 0) {
        results.innerHTML = `<div class="search-no-results">No results for "<strong>${q}</strong>"</div>`;
        return;
      }

      const moduleIcons = {
        foundations: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)"/></svg>`,
        gates: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>`,
        algorithms: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
        cryptography: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        error: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        qml: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
      };

      const highlight = (text) => text.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');

      results.innerHTML = hits.map((item, i) => `
        <div class="search-result-item" data-module="${item.module}" data-idx="${i}">
          <div class="search-result-icon">${moduleIcons[item.module] || ''}</div>
          <div class="search-result-body">
            <div class="search-result-title">${highlight(item.title)}</div>
            <div class="search-result-meta">${highlight(item.meta)}</div>
          </div>
          <div class="search-result-module">${item.nav}</div>
        </div>
      `).join('');

      results.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          this.navigate(el.getAttribute('data-module'));
          this._toggleSearch(false);
        });
      });
    });

    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.search-result-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this._searchActiveIndex = Math.min(this._searchActiveIndex + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('active', i === this._searchActiveIndex));
        if (items[this._searchActiveIndex]) items[this._searchActiveIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this._searchActiveIndex = Math.max(this._searchActiveIndex - 1, 0);
        items.forEach((el, i) => el.classList.toggle('active', i === this._searchActiveIndex));
        if (items[this._searchActiveIndex]) items[this._searchActiveIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        const active = results.querySelector('.search-result-item.active') || results.querySelector('.search-result-item');
        if (active) { this.navigate(active.getAttribute('data-module')); this._toggleSearch(false); }
      } else if (e.key === 'Escape') {
        this._toggleSearch(false);
      }
    });
  },

  _toggleSearch(open) {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    if (!overlay) return;
    overlay.classList.toggle('open', open);
    if (open) { setTimeout(() => input && input.focus(), 50); }
    else { if (input) { input.value = ''; } document.getElementById('searchResults').innerHTML = ''; this._searchActiveIndex = -1; }
  },

  // ── Keyboard Shortcuts ──────────────────────────────────────────────────
  _initKeyboardShortcuts() {
    const moduleMap = { '1': 'foundations', '2': 'gates', '3': 'algorithms', '4': 'cryptography', '5': 'error', '6': 'qml' };

    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input/textarea/select/contenteditable
      const tag = e.target.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;

      // Cmd+K or Ctrl+K or / shortcut for search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this._toggleSearch(true);
        return;
      }

      // Escape → close any open overlay
      if (e.key === 'Escape') {
        const shortcutsModal = document.getElementById('shortcutsModal');
        const tutorPanel = document.getElementById('tutorPanel');
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay && searchOverlay.classList.contains('open')) { this._toggleSearch(false); return; }
        if (shortcutsModal && shortcutsModal.classList.contains('open')) { this._toggleShortcuts(false); return; }
        if (tutorPanel && tutorPanel.classList.contains('open')) { tutorPanel.classList.remove('open'); return; }
        return;
      }

      if (isTyping) return; // Don't fire nav shortcuts while in text inputs

      if (e.key === '/') {
        e.preventDefault();
        this._toggleSearch(true);
        return;
      }

      // Single-key shortcuts
      switch (e.key.toUpperCase()) {
        case 'H': this.navigate('home'); break;
        case 'P': this.navigate('profile'); break;
        case 'D': this.toggleTheme(); break;
        case 'T': {
          const tp = document.getElementById('tutorPanel');
          if (tp) tp.classList.toggle('open');
          break;
        }
        case '?': this._toggleShortcuts(true); break;
        default:
          if (moduleMap[e.key]) this.navigate(moduleMap[e.key]);
      }
    });
  },

  // ── Home Page Upgrades ──────────────────────────────────────────────────
  renderHomeInteractive() {
    this.renderDailyRiddle();
    this.renderQuantumFact();
    this._renderGuestBanner();
  },

  // ── Guest sign-in nudge ──────────────────────────────────────────────────
  // Shown only on the home page for signed-out visitors, since guest
  // progress is no longer persisted across reloads (see _saveState).
  _renderGuestBanner() {
    const el = document.getElementById('guest-banner');
    if (!el) return;

    if (this.activeUser) {
      el.innerHTML = '';
      return;
    }

    el.innerHTML = `
      <div class="guest-banner-bar">
        <span class="guest-banner-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </span>
        <span class="guest-banner-text">You're browsing as a guest — your XP and lesson progress won't be saved. Sign in to keep it.</span>
        <button class="guest-banner-btn" onclick="App.showAuthModal()">Sign In / Sign Up</button>
      </div>
    `;
  },

  // ── Daily Quantum Fact Card ─────────────────────────────────────────────
  renderQuantumFact() {
    const tagEl = document.getElementById('qfTag');
    const textEl = document.getElementById('qfText');
    const srcEl = document.getElementById('qfSource');
    const dateEl = document.getElementById('qfDatePill');
    if (!tagEl || !textEl) return;

    const facts = [
      { tag: 'Superposition', text: 'A qubit can exist as |0⟩ and |1⟩ simultaneously — only when you measure it does it "choose" a value. This is not a limitation of knowledge; the qubit genuinely has no definite state before observation.', source: 'Quantum Foundations' },
      { tag: 'Entanglement', text: 'Two entangled qubits share quantum state across any distance. Measuring one instantly determines the other\'s outcome — Einstein called this "spooky action at a distance," yet experiments confirm it is real.', source: 'Bell\'s Theorem (1964)' },
      { tag: 'Quantum Speedup', text: 'Grover\'s algorithm searches an unsorted database of N items in O(√N) steps instead of O(N) classically. For a trillion entries, that\'s 1 million steps vs. 1 trillion — a 1,000,000× speedup.', source: 'Grover, 1996' },
      { tag: 'Cryptography', text: 'Shor\'s algorithm can factor large integers in polynomial time on a quantum computer, breaking RSA encryption. This is why post-quantum cryptography standards are being developed right now by NIST.', source: 'Shor, 1994' },
      { tag: 'Quantum Supremacy', text: 'In 2019, Google\'s Sycamore chip performed a specific sampling task in 200 seconds. The same task would take the world\'s best classical supercomputer approximately 10,000 years.', source: 'Google AI, Nature (2019)' },
      { tag: 'No-Cloning Theorem', text: 'It is mathematically impossible to perfectly copy an arbitrary unknown quantum state. This is not an engineering limitation — it is a fundamental law of quantum mechanics that makes quantum cryptography unconditionally secure.', source: 'Wootters & Zurek, 1982' },
      { tag: 'Decoherence', text: 'Qubits lose their quantum state when they interact with the environment — a process called decoherence. Current superconducting qubits maintain coherence for only microseconds, which is why error correction is the #1 challenge in quantum computing.', source: 'Quantum Hardware Research' },
      { tag: 'Hadamard Gate', text: 'Applying a Hadamard gate to |0⟩ creates a perfect 50/50 superposition: (|0⟩ + |1⟩)/√2. It is the quantum equivalent of flipping a perfectly fair coin — but the coin stays "both heads and tails" until you look.', source: 'Quantum Gates' },
      { tag: 'Topological Qubits', text: 'Topological qubits store information in the braiding of quasi-particles called Majorana fermions. They are theoretically immune to local noise — the quantum information is encoded in the global topology of the system, not any one particle.', source: 'Microsoft Research' },
      { tag: 'VQE', text: 'The Variational Quantum Eigensolver (VQE) is a hybrid quantum-classical algorithm that could simulate molecular drug interactions. Accurately modeling caffeine\'s molecular structure classically requires 10^48 parameters — VQE could do it with hundreds of qubits.', source: 'Quantum Machine Learning' },
      { tag: 'Quantum Teleportation', text: 'Quantum teleportation transfers a qubit\'s exact state to a distant qubit using entanglement and classical communication. No information travels faster than light, but the quantum state is perfectly reconstructed at the destination.', source: 'Bennett et al., 1993' },
      { tag: 'Error Correction', text: 'To build one fault-tolerant logical qubit, you may need 1,000+ physical qubits for error correction. IBM\'s 2023 roadmap targets millions of physical qubits to support large-scale quantum algorithms.', source: 'IBM Quantum Roadmap' },
      { tag: 'Quantum Tunneling', text: 'Quantum particles can tunnel through energy barriers that are classically impossible to cross. This powers nuclear fusion in stars, scanning tunneling microscopes, and even enzyme reactions in your body right now.', source: 'Quantum Mechanics' },
      { tag: 'Bell States', text: 'The four Bell states are the most entangled two-qubit states possible: |Φ+⟩, |Φ-⟩, |Ψ+⟩, and |Ψ-⟩. They form a complete basis for two-qubit systems and are the building blocks of quantum communication protocols.', source: 'Quantum Information Theory' },
      { tag: 'Neutral Atoms', text: 'Neutral atom quantum computers use optical tweezers — tightly focused laser beams — to trap individual rubidium atoms in programmable arrays. They can reconfigure qubit connectivity on the fly, something superconducting chips cannot do.', source: 'Neutral Atom Hardware' },
      { tag: 'Quantum Walk', text: 'A quantum random walk spreads across a graph exponentially faster than a classical random walk. This quantum parallelism is the basis for element distinctness algorithms and some graph search algorithms that beat classical approaches.', source: 'Quantum Algorithms' },
      { tag: 'Quantum Phase', text: 'The phase of a qubit (the angle φ in |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩) is invisible to a single measurement but governs how qubits interfere with each other — and interference is the engine of every quantum algorithm.', source: 'Bloch Sphere' },
      { tag: 'Ion Traps', text: 'Trapped ion quantum computers have demonstrated 99.9% two-qubit gate fidelity — the highest in the industry. Individual ytterbium or barium ions are suspended in electromagnetic fields and manipulated with precision lasers at millikelvin temperatures.', source: 'IonQ / Quantinuum Research' },
      { tag: 'QAOA', text: 'The Quantum Approximate Optimization Algorithm (QAOA) is designed for combinatorial optimization — problems like routing, scheduling, and portfolio optimization. Even shallow QAOA circuits (low depth) may achieve quantum advantage on near-term hardware.', source: 'Farhi et al., 2014' },
      { tag: 'Quantum Memory', text: 'Quantum memory stores quantum states in atomic ensembles or crystals for later retrieval. Achieving long quantum memory lifetimes (seconds to minutes) is essential for quantum repeaters — the foundation of a future quantum internet.', source: 'Quantum Networking' },
      { tag: 'Hilbert Space', text: 'The state space of n qubits is a 2ⁿ-dimensional complex Hilbert space. Just 300 qubits span a space with more dimensions than there are atoms in the observable universe — this exponential scaling is the heart of quantum computational power.', source: 'Quantum Theory' },
      { tag: 'Photonic QC', text: 'Photonic quantum computers use single photons as qubits, routed through silicon waveguides at room temperature. They require no cryogenic cooling, making them ideal for quantum networking and satellite-based quantum communication links.', source: 'PsiQuantum / QuiX Research' },
      { tag: 'Quantum Zeno', text: 'The Quantum Zeno Effect states that frequently measuring a quantum system can "freeze" it and prevent it from evolving. Conversely, anti-Zeno measurements can accelerate decay. Measurement is not passive in quantum mechanics — it actively shapes reality.', source: 'Misra & Sudarshan, 1977' },
      { tag: 'Stabilizer Codes', text: 'The surface code is a leading quantum error correction scheme — it encodes one logical qubit in a 2D lattice of physical qubits and can correct errors as long as fewer than half the qubits fail per round. Google\'s recent "below threshold" result validated this approach.', source: 'Google Quantum AI, 2023' },
      { tag: 'Quantum Sensing', text: 'Quantum sensors exploit superposition and entanglement to achieve measurement precision beyond classical limits (the Heisenberg limit). They are already used in atomic clocks accurate to 1 second in 300 million years, and next-generation MRI machines.', source: 'Quantum Technology' },
      { tag: 'BB84 Protocol', text: 'BB84 was the first quantum key distribution protocol (1984). Alice sends photons in random polarization bases; any eavesdropping by Eve disturbs the quantum states in a detectable way. It is unconditionally secure by the laws of physics alone.', source: 'Bennett & Brassard, 1984' },
      { tag: 'Quantum Annealing', text: 'D-Wave\'s quantum annealers use quantum tunneling to explore energy landscapes and find low-energy solutions to optimization problems. With 5,000+ qubits, they are the largest quantum processors by qubit count, though not universal quantum computers.', source: 'D-Wave Systems' },
      { tag: 'Deutsch Algorithm', text: 'The Deutsch-Jozsa algorithm was the first proof that quantum computers can solve a problem exponentially faster than any classical computer — in one query vs. 2^(n-1)+1. It launched the entire field of quantum algorithms research in 1992.', source: 'Deutsch & Jozsa, 1992' },
      { tag: 'Wavefunction', text: 'The wavefunction |ψ⟩ is not something a particle "has" — it is a complete description of all possible measurement outcomes and their probabilities. When you measure, the wavefunction "collapses" — but many interpretations dispute what this physically means.', source: 'Foundations of QM' },
    ];

    // ── Infinite non-repeating daily sequence ──────────────────────────
    // Use absolute day count since a fixed epoch as the global day index.
    // Every full cycle through all facts (29 days) reshuffles the array
    // using a different seed, so no fact repeats within any cycle AND
    // consecutive cycles have a different order → effectively infinite.
    const EPOCH = new Date('2024-01-01').getTime();
    const dayIndex = Math.floor((Date.now() - EPOCH) / 86400000); // absolute day #
    const cycleIndex = Math.floor(dayIndex / facts.length);       // which 29-day round
    const posInCycle = dayIndex % facts.length;                   // position in round

    // Seeded LCG pseudo-random generator (deterministic per cycle)
    const lcg = (() => {
      let s = (cycleIndex * 1664525 + 1013904223) & 0x7fffffff;
      return () => { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s / 0x7fffffff; };
    })();

    // Fisher-Yates shuffle of indices using LCG
    const indices = facts.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(lcg() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const fact = facts[indices[posInCycle]];


    // Colour the tag based on category
    const tagColors = {
      'Superposition': 'rgba(0,212,255,0.15)', 'Entanglement': 'rgba(238,109,79,0.15)',
      'Quantum Speedup': 'rgba(78,205,196,0.15)', 'Cryptography': 'rgba(212,175,55,0.15)',
      'Quantum Supremacy': 'rgba(238,109,79,0.15)', 'No-Cloning Theorem': 'rgba(154,62,38,0.15)',
      'Decoherence': 'rgba(99,110,114,0.2)', 'Hadamard Gate': 'rgba(0,212,255,0.15)',
    };
    const tagBgr = tagColors[fact.tag] || 'rgba(99,62,154,0.15)';
    tagEl.style.background = tagBgr;
    tagEl.style.color = 'var(--accent-cyan)';
    tagEl.style.borderColor = tagBgr.replace('0.15', '0.4');
    tagEl.textContent = fact.tag;
    textEl.textContent = fact.text;
    if (srcEl) srcEl.textContent = fact.source ? `— ${fact.source}` : '';

    if (dateEl) {
      const d = new Date();
      dateEl.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  },

  // ── Module Progress Roadmap ─────────────────────────────────────────────
  renderModuleRoadmap() {
    const track = document.getElementById('roadmapTrack');
    if (!track) return;

    const modules = [
      {
        id: 'foundations', label: 'Quantum\nFoundations', color: 'var(--accent-cyan)',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)"/></svg>`
      },
      {
        id: 'gates', label: 'Gates &\nCircuits', color: 'var(--accent-orange)',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>`
      },
      {
        id: 'algorithms', label: 'Quantum\nAlgorithms', color: 'var(--accent-pink)',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`
      },
      {
        id: 'cryptography', label: 'Quantum\nCrypto', color: 'var(--accent-gold)',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
      },
      {
        id: 'error', label: 'Error\nCorrection', color: 'var(--accent-green)',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
      },
      {
        id: 'qml', label: 'Quantum\nML', color: 'var(--accent-purple)',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>`
      },
    ];

    const circumference = 2 * Math.PI * 29; // r=29 on 64px circle
    let html = '';

    modules.forEach((mod, i) => {
      const pct = this.getModuleProgress(mod.id);
      const offset = circumference - (pct / 100) * circumference;
      const state = pct >= 100 ? 'done' : pct > 0 ? 'started' : '';
      const labelLines = mod.label.split('\n');

      html += `
        <div class="roadmap-node" onclick="App.navigate('${mod.id}')" title="${labelLines.join(' ')} — ${pct}% complete">
          <div class="roadmap-circle ${state}" style="border-color:${state ? mod.color : ''}">
            <svg style="color:${mod.color}">${mod.icon.match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1] || ''}</svg>
            <svg class="roadmap-pct-ring" viewBox="0 0 64 64">
              <circle class="track" cx="32" cy="32" r="29"/>
              <circle class="fill" cx="32" cy="32" r="29"
                stroke="${mod.color}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset.toFixed(1)}"/>
            </svg>
          </div>
          <div class="roadmap-label">${labelLines.map(l => `<span style="display:block">${l}</span>`).join('')}</div>
          <div class="roadmap-pct-text">${pct}%</div>
        </div>`;

      if (i < modules.length - 1) {
        html += `<div class="roadmap-connector ${pct >= 100 ? 'done' : ''}"></div>`;
      }
    });

    track.innerHTML = html;
  },

  getOrGenerateDailyRiddle(todayStr) {
    // ── Absolute day-number seed (same approach as fact card) ──────────────
    // This gives a unique, deterministic seed per calendar day that grows
    // forever, so the same date always produces the same question.
    const EPOCH = new Date('2024-01-01').getTime();
    const dayIndex = Math.floor((Date.now() - EPOCH) / 86400000);

    // LCG seeded by absolute day number — fast, deterministic, no repeats
    let _s = (dayIndex * 1664525 + 1013904223) & 0x7fffffff;
    const rng = () => { _s = (_s * 1664525 + 1013904223) & 0x7fffffff; return _s / 0x7fffffff; };

    // ── 5 quantum gates (was 3 → more unique combinations) ────────────────
    const gatesList = [
      {
        name: 'X (NOT)',
        action: (s) => ({ r0: s.r1, i0: s.i1, r1: s.r0, i1: s.i0 })
      },
      {
        name: 'Z (Phase Flip)',
        action: (s) => ({ r0: s.r0, i0: s.i0, r1: -s.r1, i1: -s.i1 })
      },
      {
        name: 'H (Hadamard)',
        action: (s) => ({
          r0: (s.r0 + s.r1) / Math.sqrt(2), i0: (s.i0 + s.i1) / Math.sqrt(2),
          r1: (s.r0 - s.r1) / Math.sqrt(2), i1: (s.i0 - s.i1) / Math.sqrt(2)
        })
      },
      {
        name: 'Y',
        // Y|0⟩ = i|1⟩, Y|1⟩ = -i|0⟩  →  (r0+i*i0)|0⟩+(r1+i*i1)|1⟩
        action: (s) => ({ r0: -s.i1, i0: s.r1, r1: s.i0, i1: -s.r0 })
      },
      {
        name: 'S (Phase)',
        // S applies phase π/2 to |1⟩: |1⟩ → i|1⟩
        action: (s) => ({ r0: s.r0, i0: s.i0, r1: -s.i1, i1: s.r1 })
      },
    ];

    // ── Starting state: |0⟩ or |1⟩ ──────────────────────────────────────
    const startAt1 = rng() > 0.5;
    let state = startAt1
      ? { r0: 0, i0: 0, r1: 1, i1: 0 }
      : { r0: 1, i0: 0, r1: 0, i1: 0 };
    const startLabel = startAt1 ? '|1⟩' : '|0⟩';

    // ── Variable gate count: 1, 2, or 3 gates ────────────────────────────
    // 1 gate  → 2 × 5 = 10 combos
    // 2 gates → 2 × 5×4 = 40 combos
    // 3 gates → 2 × 5×4×3 = 120 combos
    // × 2 question types = 340 total unique daily questions (~11 months)
    const gateCount = [1, 2, 2, 3][Math.floor(rng() * 4)]; // weighted toward 2-3 gates
    const usedIndices = [];
    const chosenGates = [];
    for (let g = 0; g < gateCount; g++) {
      let pick;
      do { pick = Math.floor(rng() * gatesList.length); }
      while (usedIndices.includes(pick));
      usedIndices.push(pick);
      chosenGates.push(gatesList[pick]);
      state = gatesList[pick].action(state);
    }

    // ── Question target: ask for |0⟩ or |1⟩ probability ─────────────────
    const askFor1 = rng() > 0.5;
    const pTarget = Math.round(
      askFor1
        ? (state.r1 * state.r1 + state.i1 * state.i1) * 100
        : (state.r0 * state.r0 + state.i0 * state.i0) * 100
    );
    const targetLabel = askFor1 ? '|1⟩' : '|0⟩';
    const answerVal = `${pTarget}%`;

    // ── Build the gate sequence string for the question ───────────────────
    const gateSeqHtml = chosenGates
      .map((g, i) => `<strong>${g.name}</strong>${i < chosenGates.length - 1 ? (i === chosenGates.length - 2 ? ' and then a ' : ', ') : ''}`)
      .join('');

    const question = gateCount === 1
      ? `A qubit starts in state <strong>${startLabel}</strong>. A single <strong>${chosenGates[0].name}</strong> gate is applied. What is the probability of measuring <strong>${targetLabel}</strong>?`
      : `A qubit is initialized in state <strong>${startLabel}</strong>. We apply a ${gateSeqHtml} gate in sequence. What is the probability of measuring the qubit in state <strong>${targetLabel}</strong>?`;

    // ── Answer choices (always include correct answer) ────────────────────
    const allChoices = ['0%', '25%', '50%', '75%', '100%'];
    const choices = allChoices.includes(answerVal)
      ? allChoices.filter(c => c !== answerVal).sort(() => rng() - 0.5).slice(0, 3).concat(answerVal)
      : ['0%', '50%', '100%', answerVal];

    // Shuffle
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    const correctIndex = choices.indexOf(answerVal);
    const gateNames = chosenGates.map(g => g.name).join(' → ');

    return {
      question,
      choices,
      answer: correctIndex,
      explanation: `Starting from <strong>${startLabel}</strong>, applying gates <strong>${gateNames}</strong> produces a final quantum state where the probability of measuring <strong>${targetLabel}</strong> is <strong>${pTarget}%</strong>.`
    };
  },


  renderDailyRiddle() {
    const container = document.getElementById('daily-riddle-widget');
    if (!container) return;

    const todayStr = new Date().toDateString();
    this.currentDailyRiddle = this.getOrGenerateDailyRiddle(todayStr);

    const isSolved = this.lastRiddleSolvedDate === todayStr;

    if (isSolved) {
      container.innerHTML = `
        <div class="riddle-success-state">
          <div class="riddle-success-icon">✨</div>
          <h4 class="riddle-success-title">Daily Challenge Complete!</h4>
          <p class="riddle-success-desc">You've successfully solved today's mathematical quantum riddle and earned +15 XP. Check back tomorrow for a new puzzle!</p>
          <div class="riddle-explanation-box">
            <strong>Explanation:</strong><br>
            ${this.currentDailyRiddle.explanation}
          </div>
        </div>
      `;
      return;
    }

    let choicesHtml = this.currentDailyRiddle.choices.map((choice, idx) => `
      <button class="riddle-choice-btn" onclick="App.solveRiddle(${idx})">
        <span class="choice-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="choice-text">${choice}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="riddle-question-box">
        <p class="riddle-text">${this.currentDailyRiddle.question}</p>
        <div class="riddle-choices">
          ${choicesHtml}
        </div>
        <div id="riddle-feedback" class="riddle-feedback hidden"></div>
      </div>
    `;
  },

  solveRiddle(choiceIndex) {
    if (!this.currentDailyRiddle) return;
    const feedbackEl = document.getElementById('riddle-feedback');
    if (!feedbackEl) return;

    if (choiceIndex === this.currentDailyRiddle.answer) {
      feedbackEl.className = "riddle-feedback success-text";
      feedbackEl.innerHTML = `🎉 Correct! +15 XP earned!`;
      feedbackEl.classList.remove('hidden');

      this.addXP(15);

      const todayStr = new Date().toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      // Update streak
      if (this.lastRiddleSolvedDate === yesterdayStr) {
        this.dailyStreak = (this.dailyStreak || 0) + 1;
      } else if (this.lastRiddleSolvedDate !== todayStr) {
        this.dailyStreak = 1;
      }

      this.lastRiddleSolvedDate = todayStr;

      if (this.activeUser && this.users[this.activeUser]) {
        this.users[this.activeUser].lastRiddleSolvedDate = todayStr;
        this.users[this.activeUser].dailyStreak = this.dailyStreak;
      }
      this._saveState();
      this.checkStreakAchievements();
      this._renderXP();

      setTimeout(() => {
        this.renderDailyRiddle();
      }, 1500);
    } else {
      feedbackEl.className = "riddle-feedback error-text";
      feedbackEl.innerHTML = `❌ Incorrect. Try again!`;
      feedbackEl.classList.remove('hidden');

      const btn = document.querySelectorAll('.riddle-choice-btn')[choiceIndex];
      if (btn) {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 500);
      }
    }
  },

  _initShortcutsModal() {
    const modal = document.getElementById('shortcutsModal');
    const closeBtn = document.getElementById('shortcutsClose');
    const toggleBtn = document.getElementById('shortcutsToggle');
    if (!modal) return;
    if (closeBtn) closeBtn.addEventListener('click', () => this._toggleShortcuts(false));
    if (toggleBtn) toggleBtn.addEventListener('click', () => this._toggleShortcuts(true));
    modal.addEventListener('click', (e) => { if (e.target === modal) this._toggleShortcuts(false); });
  },

  _toggleShortcuts(open) {
    const modal = document.getElementById('shortcutsModal');
    if (modal) modal.classList.toggle('open', open);
  },

}; // end App
window.App = App;

// ── Kick Off ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());