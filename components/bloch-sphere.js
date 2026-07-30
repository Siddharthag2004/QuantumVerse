// ─── Bloch Sphere Component (Three.js) ───────────────────────────────────
const BlochSphere = {
  instances: {},

  create(canvasId, opts = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.THREE) return null;
    const w = opts.width || canvas.width || 300;
    const h = opts.height || canvas.height || 300;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    if (typeof renderer.setPixelRatio === 'function') renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (typeof renderer.setClearColor === 'function') renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(2.8, 1.8, 2.8);
    camera.lookAt(0, 0, 0);

    // Premium Lighting
    const ambient = new THREE.AmbientLight(0xdbeafe, 0.6); // soft blue-white
    scene.add(ambient);
    
    const dirLight1 = new THREE.DirectionalLight(0xee6d4f, 1.8); // bright cyan
    dirLight1.position.set(4, 6, 4);
    scene.add(dirLight1);
    
    const purpleLight = new THREE.PointLight(0xf07c64, 2.5, 12); // pink-purple point light
    purpleLight.position.set(-3, -3, 3);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x9a3e26, 2, 10); // indigo point light
    blueLight.position.set(3, -2, -3);
    scene.add(blueLight);

    // Coordinate Group (contains all sphere elements for smooth rotation)
    const group = new THREE.Group();
    scene.add(group);

    // Outer Glass Sphere
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a, // slate glass by default
      transparent: true,
      opacity: 0.22,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.95, // high refraction transparency
      thickness: 1.2,
      ior: 1.52, // refractive index of glass
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphere);

    // Fine wireframe overlay for grid style
    const wireMat = new THREE.MeshBasicMaterial({ 
      color: 0xee6d4f, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.08,
      blending: THREE.AdditiveBlending
    });
    const wireframe = new THREE.Mesh(new THREE.SphereGeometry(1.002, 24, 24), wireMat);
    group.add(wireframe);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x9a3e26, // purple glow
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Equator and Meridian Rings
    const makeRing = (rotX, rotY, rotZ, color, opacity = 0.45) => {
      const ringGeo = new THREE.TorusGeometry(1, 0.006, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(rotX, rotY, rotZ);
      group.add(ring);
      return ring;
    };
    const eqRing = makeRing(Math.PI / 2, 0, 0, 0xee6d4f, 0.55); // Equator (Cyan)
    const m1Ring = makeRing(0, Math.PI / 2, 0, 0x9a3e26, 0.45); // Meridian (Purple)
    const m2Ring = makeRing(0, 0, 0, 0xf07c64, 0.35); // Horizontal Meridian (Pink)

    // Axes lines
    const makeAxis = (dir, color) => {
      const axisMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const axisGeo = new THREE.CylinderGeometry(0.006, 0.006, 2.3, 8);
      const axis = new THREE.Mesh(axisGeo, axisMat);
      if (dir === 'x') axis.rotation.z = Math.PI / 2;
      if (dir === 'z') axis.rotation.x = Math.PI / 2;
      group.add(axis);
      return axis;
    };
    const xAxis = makeAxis('x', 0xf07c64); // X-axis (Pink)
    const yAxis = makeAxis('y', 0xee6d4f); // Z-axis (Cyan, vertical)
    const zAxis = makeAxis('z', 0x10b981); // Y-axis (Green)

    // High resolution crisp labels
    const labels = [];
    const makeLabel = (text, pos) => {
      const cv = document.createElement('canvas');
      cv.width = 128; cv.height = 128;
      const ctx = cv.getContext('2d');
      const tex = new THREE.CanvasTexture(cv);
      const spMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sp = new THREE.Sprite(spMat);
      sp.position.set(...pos);
      sp.scale.set(0.3, 0.3, 1);
      group.add(sp);

      const redraw = (isLight) => {
        ctx.clearRect(0, 0, 128, 128);
        if (isLight) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          ctx.font = 'bold 44px "Space Grotesk", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // White stroke outline
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 10;
          ctx.strokeText(text, 64, 64);
          
          // Deep slate/dark blue fill for contrast
          ctx.fillStyle = '#0f172a';
          ctx.fillText(text, 64, 64);
        } else {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          
          ctx.font = 'bold 40px "Space Grotesk", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Dark outline
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 6;
          ctx.strokeText(text, 64, 64);
          
          // Bright white fill
          ctx.fillStyle = '#ffffff';
          ctx.fillText(text, 64, 64);
        }
        tex.needsUpdate = true;
      };
      
      labels.push({ redraw });
    };

    makeLabel('|0⟩', [0, 1.35, 0]);
    makeLabel('|1⟩', [0, -1.35, 0]);
    makeLabel('X', [1.35, 0, 0]);
    makeLabel('Y', [0, 0, 1.35]);
    makeLabel('Z', [0, 0, -1.35]);

    // Orbiting Quantum Particle Dust Field
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.05 + Math.random() * 0.12;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      posArr[i*3] = r * Math.sin(phi) * Math.cos(theta);
      posArr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      posArr[i*3+2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.024,
      color: 0xee6d4f, // Cyan glowing dust
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Premium State Vector (Custom Mesh Group instead of basic ArrowHelper)
    const vectorGroup = new THREE.Group();
    const vectorMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber Gold
      emissive: 0xd97706,
      roughness: 0.1,
      metalness: 0.85
    });
    
    // Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.85, 16);
    shaftGeo.translate(0, 0.425, 0); // Position so base is at origin
    const shaft = new THREE.Mesh(shaftGeo, vectorMat);
    vectorGroup.add(shaft);
    
    // Cone head
    const coneGeo = new THREE.ConeGeometry(0.038, 0.12, 16);
    coneGeo.translate(0, 0.9, 0); // Position at the tip of the cylinder
    const cone = new THREE.Mesh(coneGeo, vectorMat);
    vectorGroup.add(cone);
    
    group.add(vectorGroup);

    // State Vector indicator (Tip Glow)
    const dotGeo = new THREE.SphereGeometry(0.06, 32, 32);
    const dotMat = new THREE.MeshBasicMaterial({ 
      color: 0xf59e0b, 
      transparent: true, 
      opacity: 0.95,
      blending: THREE.AdditiveBlending 
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    group.add(dot);
    
    const glowGeo = new THREE.SphereGeometry(0.14, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ 
      color: 0xf59e0b, 
      transparent: true, 
      opacity: 0.35, 
      blending: THREE.AdditiveBlending, 
      side: THREE.BackSide 
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    dot.add(glow);

    const stateLight = new THREE.PointLight(0xf59e0b, 2.0, 3);
    dot.add(stateLight);
    
    dot.position.set(0, 1, 0);

    // Dynamic Theme Color Updater
    const updateThemeColors = (isLight) => {
      const bNormal = THREE.NormalBlending;
      const bAdd = THREE.AdditiveBlending;

      if (isLight) {
        // Light Mode styling (dark, crisp, charcoal lines with Normal blending)
        sphereMat.color.setHex(0x0f172a); // dark slate glass tint
        sphereMat.opacity = 0.09;
        sphereMat.roughness = 0.08;
        
        wireMat.color.setHex(0x0f172a); // dark slate wireframe
        wireMat.opacity = 0.45;
        wireMat.blending = bNormal;
        wireMat.needsUpdate = true;
        
        coreMat.color.setHex(0x9a3e26); // indigo core
        coreMat.opacity = 0.5;
        coreMat.blending = bNormal;
        coreMat.needsUpdate = true;
        
        // Update equator & meridian rings
        eqRing.material.color.setHex(0x0f172a); // dark slate equator
        eqRing.material.opacity = 0.65;
        eqRing.material.blending = bNormal;
        eqRing.material.needsUpdate = true;
        
        m1Ring.material.color.setHex(0x371a12); // deep purple meridian
        m1Ring.material.opacity = 0.35;
        m1Ring.material.blending = bNormal;
        m1Ring.material.needsUpdate = true;
        
        m2Ring.material.color.setHex(0x475569); // grey meridian
        m2Ring.material.opacity = 0.3;
        m2Ring.material.blending = bNormal;
        m2Ring.material.needsUpdate = true;
        
        // Update axes to dark slate/charcoal
        xAxis.material.color.setHex(0x334155);
        xAxis.material.opacity = 0.4;
        xAxis.material.blending = bNormal;
        xAxis.material.needsUpdate = true;
        
        yAxis.material.color.setHex(0x0f172a);
        yAxis.material.opacity = 0.5;
        yAxis.material.blending = bNormal;
        yAxis.material.needsUpdate = true;
        
        zAxis.material.color.setHex(0x475569);
        zAxis.material.opacity = 0.4;
        zAxis.material.blending = bNormal;
        zAxis.material.needsUpdate = true;
        
        // Particles
        particleMat.color.setHex(0x371a12);
        particleMat.opacity = 0.4;
        particleMat.blending = bNormal;
        particleMat.needsUpdate = true;

        // Dot & glow blending
        dotMat.blending = bNormal;
        dotMat.needsUpdate = true;
        glowMat.blending = bNormal;
        glowMat.needsUpdate = true;
      } else {
        // Dark Mode styling (original cyan/pink neon theme)
        sphereMat.color.setHex(0x0f172a); // Dark slate glass
        sphereMat.opacity = 0.35;
        sphereMat.roughness = 0.05;
        
        wireMat.color.setHex(0xee6d4f); // Coral wireframe
        wireMat.opacity = 0.65;
        wireMat.blending = bAdd;
        wireMat.needsUpdate = true;
        
        coreMat.color.setHex(0x9a3e26); // Rust core
        coreMat.opacity = 0.75;
        coreMat.blending = bAdd;
        coreMat.needsUpdate = true;
        
        // Update equator & meridian rings
        eqRing.material.color.setHex(0xee6d4f); // Coral Equator
        eqRing.material.opacity = 0.85;
        eqRing.material.blending = bAdd;
        eqRing.material.needsUpdate = true;
        
        m1Ring.material.color.setHex(0x9a3e26); // Rust Meridian
        m1Ring.material.opacity = 0.75;
        m1Ring.material.blending = bAdd;
        m1Ring.material.needsUpdate = true;
        
        m2Ring.material.color.setHex(0xf07c64); // Peach Meridian
        m2Ring.material.opacity = 0.65;
        m2Ring.material.blending = bAdd;
        m2Ring.material.needsUpdate = true;
        
        // Update axes
        xAxis.material.color.setHex(0xf07c64); // Peach X-axis
        xAxis.material.opacity = 0.85;
        xAxis.material.blending = bAdd;
        xAxis.material.needsUpdate = true;
        
        yAxis.material.color.setHex(0xee6d4f); // Coral Y-axis
        yAxis.material.opacity = 0.85;
        yAxis.material.blending = bAdd;
        yAxis.material.needsUpdate = true;
        
        zAxis.material.color.setHex(0x10b981); // Green Z-axis
        zAxis.material.opacity = 0.85;
        zAxis.material.blending = bAdd;
        zAxis.material.needsUpdate = true;
        
        particleMat.color.setHex(0xee6d4f); // Coral particles
        particleMat.opacity = 0.75;
        particleMat.blending = bAdd;
        particleMat.needsUpdate = true;

        // Dot & glow blending
        dotMat.blending = bAdd;
        dotMat.needsUpdate = true;
        glowMat.blending = bAdd;
        glowMat.needsUpdate = true;
      }
      
      // Update labels
      labels.forEach(lbl => lbl.redraw(isLight));
    };

    // Orbit drag controls (Smooth Lerping)
    let isDragging = false, prevX = 0, prevY = 0;
    let targetRotX = 0.3, targetRotY = 0.5;
    let currentRotX = 0.3, currentRotY = 0.5;
    
    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - prevX, dy = e.clientY - prevY;
      targetRotY += dx * 0.007; targetRotX += dy * 0.007;
      prevX = e.clientX; prevY = e.clientY;
    });

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    }, { passive: true });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', e => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX, dy = e.touches[0].clientY - prevY;
      targetRotY += dx * 0.007; targetRotX += dy * 0.007;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    }, { passive: true });

    let theta = 0, phi = 0;

    // Arrow Mock helper for backwards compatibility
    const arrowMock = {
      setDirection(dir) {
        const vSource = new THREE.Vector3(0, 1, 0);
        vectorGroup.quaternion.setFromUnitVectors(vSource, dir);
      }
    };

    const inst = { 
      scene, camera, renderer, 
      arrow: arrowMock, 
      dot, sphere, theta, phi, 
      rotX: currentRotX, rotY: currentRotY, 
      animId: null 
    };

    // Track theme dynamically
    let isLightTheme = null;

    const animate = () => {
      inst.animId = requestAnimationFrame(animate);
      
      // Dynamic theme checks
      const checkLight = document.documentElement.classList.contains('light-mode');
      if (isLightTheme !== checkLight) {
        isLightTheme = checkLight;
        updateThemeColors(isLightTheme);
      }

      if (!isDragging) { 
        targetRotY += 0.003; // Auto slow rotation
      }
      
      // Interpolate for buttery-smooth mouse drag
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      
      inst.rotX = currentRotX;
      inst.rotY = currentRotY;
      
      group.rotation.y = currentRotY;
      group.rotation.x = currentRotX;
      
      const time = Date.now() * 0.004;
      glow.scale.setScalar(1 + Math.sin(time) * 0.2);
      glowMat.opacity = 0.35 + Math.sin(time) * 0.15;
      
      // Rotate the quantum particles field independently
      particles.rotation.y = time * 0.12;
      
      // Pulse core core opacity
      coreMat.opacity = 0.5 + Math.sin(time * 2) * 0.15;
      
      renderer.render(scene, camera);
    };
    animate();

    inst.setState = (thetaDeg, phiDeg) => {
      const t = (thetaDeg * Math.PI) / 180;
      const p = (phiDeg * Math.PI) / 180;
      const x = Math.sin(t) * Math.cos(p);
      const y = Math.cos(t);
      const z = Math.sin(t) * Math.sin(p);
      const dir = new THREE.Vector3(x, y, z).normalize();
      
      inst.arrow.setDirection(dir);
      dot.position.set(x, y, z);
      
      // Flash glowing tip to emphasize state change
      glowMat.color.setHex(0xffffff);
      dotMat.color.setHex(0xffffff);
      setTimeout(() => {
        glowMat.color.setHex(0xf59e0b);
        dotMat.color.setHex(0xf59e0b);
      }, 200);
    };

    this.instances[canvasId] = inst;
    return inst;
  },

  destroy(canvasId) {
    const inst = this.instances[canvasId];
    if (inst) {
      cancelAnimationFrame(inst.animId);
      inst.renderer.dispose();
      delete this.instances[canvasId];
    }
  }
};
