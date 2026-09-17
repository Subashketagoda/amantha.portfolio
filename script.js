/**
 * AMANTHA PERERA — LUXURY EDITORIAL JAVASCRIPT
 * Custom Lerp Cursor, Parallax Depth, Dynamic Accordions, Metric Counters, Currency Toggle
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 00. MINIMALIST ARCHITECTURAL EDITORIAL PRELOADER (APPLE / PENTAGRAM)
  // Masked typography reveal, 1px hairline track, dual shutter exit unveil
  // ========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderCounter = document.getElementById('preloaderCounter');
  const preloaderProgressBar = document.getElementById('preloaderProgressBar');
  const preloaderStatus = document.getElementById('preloaderStatus');

  if (preloader && preloaderCounter && preloaderProgressBar) {
    document.body.classList.add('is-loading');

    // Trigger vertical masked reveal on initial frame
    requestAnimationFrame(() => {
      setTimeout(() => {
        preloader.classList.add('active-reveal');
      }, 40);
    });

    let progress = 0;
    const phrases = [
      { at: 0, text: 'BUILDING BRANDS THE ORGANIC WAY' },
      { at: 32, text: 'CULTURE · PERFORMANCE · SCALE' },
      { at: 65, text: '4.9M+ AUDIENCE REACH' },
      { at: 88, text: 'COLLECTION // VOL. 01' },
      { at: 98, text: 'AMANTHA PERERA PORTFOLIO' }
    ];

    const startTime = performance.now();
    const duration = 2000; // Always 2s on every reload — luxurious, intentional

    function updatePreloader(currentTime) {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(1, elapsed / duration);

      // Smooth custom ease-out curve
      const easedProgress = Math.pow(rawProgress, 0.9);
      progress = Math.min(100, Math.floor(easedProgress * 100));

      // Clean two-digit formatting: 00, 01, ... 99, 100
      preloaderCounter.textContent = progress < 10 ? `0${progress}` : `${progress}`;
      preloaderProgressBar.style.width = `${progress}%`;

      // Update understated brand phrases
      if (preloaderStatus) {
        for (let i = phrases.length - 1; i >= 0; i--) {
          if (progress >= phrases[i].at) {
            if (preloaderStatus.textContent !== phrases[i].text) {
              preloaderStatus.textContent = phrases[i].text;
            }
            break;
          }
        }
      }

      if (rawProgress < 1) {
        requestAnimationFrame(updatePreloader);
      } else {
        // Finalize 100% state
        preloaderCounter.textContent = '100';
        preloaderProgressBar.style.width = '100%';
        if (preloaderStatus) {
          preloaderStatus.textContent = 'AMANTHA PERERA PORTFOLIO';
        }

        // Cinematic pause at 100% before split shutter exit
        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.classList.remove('is-loading');

          // Clean up DOM state after split curtain transition finishes (850ms)
          setTimeout(() => {
            preloader.setAttribute('aria-hidden', 'true');
            preloader.style.display = 'none';
          }, 900);
        }, 200);
      }
    }

    requestAnimationFrame(updatePreloader);
  }

  // ========================================================================
  // 01. AWWWARDS-WINNING LUXURY FLUID MAGNETIC CURSOR ENGINE
  // ========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorBadge = document.getElementById('cursorBadgeText');

  if (cursorDot && cursorRing && cursorBadge) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let hasBadge = false;
    let isClicking = false;
    let isInitialized = false;

    function activateCustomCursor(e) {
      if (window.innerWidth > 768) {
        document.documentElement.classList.add('has-custom-cursor');
        if (!isInitialized) {
          isInitialized = true;
          mouseX = e.clientX;
          mouseY = e.clientY;
          ringX = mouseX;
          ringY = mouseY;
        }
      }
    }

    // Viewport mouse tracking
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) {
        if (document.documentElement.classList.contains('has-custom-cursor')) {
          document.documentElement.classList.remove('has-custom-cursor');
        }
        return;
      }

      activateCustomCursor(e);

      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check hovered interactive elements
      const target = e.target.closest('a, button, [role="button"], .work-item, .editorial-pkg-item, .service-card, .production-card, .scroll-link, .nav-brand, .pkg-select-btn, .foot-link, .editorial-btn, [data-cursor]');

      if (target) {
        isHovering = true;
        cursorRing.classList.add('is-hovering');
        cursorDot.classList.add('is-hovering');

        const badgeText = target.getAttribute('data-cursor');
        if (badgeText) {
          hasBadge = true;
          cursorBadge.textContent = badgeText;
          cursorRing.classList.add('has-badge');
          cursorDot.classList.add('has-badge');
        } else {
          hasBadge = false;
          cursorRing.classList.remove('has-badge');
          cursorDot.classList.remove('has-badge');
        }
      } else {
        isHovering = false;
        hasBadge = false;
        cursorRing.classList.remove('is-hovering', 'has-badge');
        cursorDot.classList.remove('is-hovering', 'has-badge');
      }
    }, { passive: true });

    // Click Spring Tactile Feedback
    window.addEventListener('mousedown', () => {
      isClicking = true;
      cursorRing.classList.add('is-clicking');
    });

    window.addEventListener('mouseup', () => {
      isClicking = false;
      cursorRing.classList.remove('is-clicking');
    });

    // Touch detection — immediately deactivate custom cursor on touch
    window.addEventListener('touchstart', () => {
      document.documentElement.classList.remove('has-custom-cursor');
    }, { passive: true });

    // Window resize — deactivate if resized to mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        document.documentElement.classList.remove('has-custom-cursor');
      }
    }, { passive: true });

    // Cursor Smooth Lerp Loop
    function renderCursor() {
      if (document.documentElement.classList.contains('has-custom-cursor')) {
        // Pinpoint dot follows mouse instantly (0ms latency, zero lag)
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        // Smooth outer ring lerp
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        const clickScale = isClicking ? 0.82 : 1.0;
        cursorRing.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${clickScale})`;
      }

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Fade when cursor leaves or enters window
    document.addEventListener('mouseleave', () => {
      document.documentElement.classList.remove('has-custom-cursor');
    });
  }

  // ========================================================================
  // 02. TRENDING 3D SPATIAL SCROLLING BACKGROUND ENGINE (HERO ONLY)
  // ========================================================================
  const heroCanvas = document.getElementById('hero3dCanvas');
  const heroWrap = document.getElementById('hero3dWrap');
  const heroSection = document.getElementById('hero');
  const typeAmantha = document.getElementById('typeAmantha');
  const typePerera = document.getElementById('typePerera');

  if (heroCanvas && heroWrap && typeof THREE !== 'undefined') {
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. WebGL Renderer Initialization
    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
    renderer.setSize(heroWrap.offsetWidth, heroWrap.offsetHeight);
    if (renderer.toneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    }

    // 2. Scene, Fog & Perspective Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.022);

    const aspect = heroWrap.offsetWidth / (heroWrap.offsetHeight || 1);
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 120);
    camera.position.set(0, 0.8, 22);
    camera.lookAt(0, 0, 0);

    // 3. Procedural Luxury Monochrome Studio Softbox Environment
    function createStudioEnvironment() {
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 1024;
      envCanvas.height = 512;
      const ctx = envCanvas.getContext('2d');

      const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
      bgGrad.addColorStop(0, '#0a0a0d');
      bgGrad.addColorStop(0.5, '#050506');
      bgGrad.addColorStop(1, '#020202');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Key Overhead Softbox (Silvery White)
      const g1 = ctx.createRadialGradient(340, 140, 20, 340, 140, 280);
      g1.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      g1.addColorStop(0.35, 'rgba(242, 242, 247, 0.55)');
      g1.addColorStop(0.7, 'rgba(180, 180, 195, 0.15)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(40, 0, 600, 300);

      // High-Contrast Rim Softbox (Right Flank)
      const g2 = ctx.createRadialGradient(840, 260, 10, 840, 260, 200);
      g2.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      g2.addColorStop(0.45, 'rgba(210, 215, 225, 0.35)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(720, 40, 260, 440);

      // Fill Softbox (Bottom Left)
      const g3 = ctx.createRadialGradient(480, 440, 10, 480, 440, 220);
      g3.addColorStop(0, 'rgba(180, 185, 195, 0.45)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.fillRect(260, 320, 440, 180);

      const texture = new THREE.CanvasTexture(envCanvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      return texture;
    }
    const envMap = createStudioEnvironment();
    scene.environment = envMap;

    // 4. Soft Cinematic Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(14, 18, 14);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa3a3b0, 0.8);
    rimLight.position.set(-16, -10, -12);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x18181c, 0.65);
    scene.add(ambientLight);

    // 5. Shaders for Fluid Liquid Chrome / Dark Metallic Silk Waves
    const waveVertexShader = `
      uniform float uTime;
      uniform float uScroll;
      uniform float uSurge;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;
        float x = pos.x;
        float y = pos.y;

        // Multi-frequency harmonic liquid silk waves
        float w1 = sin(x * 0.13 + uTime * 0.55) * cos(y * 0.11 + uTime * 0.42) * (2.6 + uSurge * 2.2);
        float w2 = sin(x * 0.26 - y * 0.18 + uTime * 0.85) * 1.15;
        float w3 = cos(x * 0.50 + y * 0.35 - uTime * 1.3) * 0.38;
        float w4 = cos(x * 0.07 + y * 0.09 - uScroll * 0.0035) * 1.8;

        pos.z += (w1 + w2 + w3 + w4);

        // Analytical normal calculation for accurate metallic specular sheen
        float dx = cos(x * 0.13 + uTime * 0.55) * 0.13 * cos(y * 0.11 + uTime * 0.42) * (2.6 + uSurge * 2.2)
                 + cos(x * 0.26 - y * 0.18 + uTime * 0.85) * 0.26
                 - sin(x * 0.50 + y * 0.35 - uTime * 1.3) * 0.50 * 0.38
                 - sin(x * 0.07 + y * 0.09 - uScroll * 0.0035) * 0.07 * 1.8;

        float dy = -sin(x * 0.13 + uTime * 0.55) * (2.6 + uSurge * 2.2) * sin(y * 0.11 + uTime * 0.42) * 0.11
                 - cos(x * 0.26 - y * 0.18 + uTime * 0.85) * 0.18
                 - sin(x * 0.50 + y * 0.35 - uTime * 1.3) * 0.35 * 0.38
                 - sin(x * 0.07 + y * 0.09 - uScroll * 0.0035) * 0.09 * 1.8;

        vec3 objectNormal = normalize(vec3(-dx, -dy, 1.0));
        vNormal = normalize(normalMatrix * objectNormal);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const waveFragmentShader = `
      uniform sampler2D uEnvMap;
      uniform float uScroll;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec2 vUv;

      void main() {
        vec3 normal = normalize(vNormal);
        if (!gl_FrontFacing) normal = -normal;

        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

        vec3 refl = reflect(-viewDir, normal);
        float phi = atan(refl.z, refl.x);
        float theta = asin(clamp(refl.y, -1.0, 1.0));
        vec2 envCoord = vec2(phi / (2.0 * 3.14159265) + 0.5, theta / 3.14159265 + 0.5);

        vec3 envColor = texture2D(uEnvMap, envCoord).rgb;

        // Dark obsidian silk & liquid platinum chrome blend
        vec3 darkSilk = vec3(0.04, 0.04, 0.06);
        vec3 liquidChrome = mix(darkSilk, envColor * 1.6, 0.65 + fresnel * 0.35) * uIntensity;

        // Silky edge transparency falloff
        float edgeFade = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x)
                       * smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);

        gl_FragColor = vec4(liquidChrome, edgeFade * 0.95);
      }
    `;

    // Primary Sweeping Liquid Chrome Wave (Midground Landscape)
    const waveMat1 = new THREE.ShaderMaterial({
      vertexShader: waveVertexShader,
      fragmentShader: waveFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uSurge: { value: 0 },
        uIntensity: { value: 1.0 },
        uEnvMap: { value: envMap }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    const waveGeom1 = new THREE.PlaneGeometry(64, 40, isMobile ? 60 : 100, isMobile ? 45 : 75);
    const primaryWave = new THREE.Mesh(waveGeom1, waveMat1);
    primaryWave.rotation.x = -Math.PI * 0.38;
    primaryWave.rotation.z = Math.PI * 0.05;
    primaryWave.position.set(0, -2.8, -3.5);
    scene.add(primaryWave);

    // Secondary High-Altitude Silk Wave / Ribbon (Upper Background Counter-Flow)
    let secondaryWave = null;
    let waveMat2 = null;

    if (!isMobile) {
      waveMat2 = new THREE.ShaderMaterial({
        vertexShader: waveVertexShader,
        fragmentShader: waveFragmentShader,
        uniforms: {
          uTime: { value: 2.0 },
          uScroll: { value: 0 },
          uSurge: { value: 0 },
          uIntensity: { value: 0.72 },
          uEnvMap: { value: envMap }
        },
        transparent: true,
        side: THREE.DoubleSide
      });

      const waveGeom2 = new THREE.PlaneGeometry(52, 24, 75, 45);
      secondaryWave = new THREE.Mesh(waveGeom2, waveMat2);
      secondaryWave.rotation.x = -Math.PI * 0.28;
      secondaryWave.rotation.z = -Math.PI * 0.06;
      secondaryWave.position.set(2.0, 5.2, -9.5);
      scene.add(secondaryWave);
    }

    // Layer 1: Deep Microscopic Stardust / Particles (Distant Universe)
    const deepParticleCount = isMobile ? 100 : 360;
    const deepPositions = new Float32Array(deepParticleCount * 3);
    for (let i = 0; i < deepParticleCount; i++) {
      deepPositions[i * 3] = (Math.random() - 0.5) * 58;
      deepPositions[i * 3 + 1] = (Math.random() - 0.5) * 44;
      deepPositions[i * 3 + 2] = -15 - Math.random() * 55;
    }
    const deepGeom = new THREE.BufferGeometry();
    deepGeom.setAttribute('position', new THREE.BufferAttribute(deepPositions, 3));
    const deepMat = new THREE.PointsMaterial({
      color: 0x888892,
      size: 0.09,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });
    const deepParticles = new THREE.Points(deepGeom, deepMat);
    scene.add(deepParticles);

    // Layer 5: Very Subtle Foreground Particles (Near Floating Luminous Motes)
    const nearCount = isMobile ? 15 : 32;
    const nearPositions = new Float32Array(nearCount * 3);
    for (let i = 0; i < nearCount; i++) {
      nearPositions[i * 3] = (Math.random() - 0.5) * 24;
      nearPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      nearPositions[i * 3 + 2] = 6 + Math.random() * 12;
    }
    const nearGeom = new THREE.BufferGeometry();
    nearGeom.setAttribute('position', new THREE.BufferAttribute(nearPositions, 3));
    const nearMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.40,
      depthWrite: false
    });
    const nearParticles = new THREE.Points(nearGeom, nearMat);
    scene.add(nearParticles);

    // 6. Continuous Scroll & Velocity Physics Engine
    let targetScroll = window.scrollY;
    let smoothedScroll = window.scrollY;
    let scrollVelocity = 0;
    let lastScroll = window.scrollY;
    let waveTime = 0;
    let currentSurge = 0;

    window.addEventListener('scroll', () => {
      targetScroll = window.scrollY;
    }, { passive: true });

    let isHeroActive = true;
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroActive = entry.isIntersecting;
      });
    }, { threshold: 0 });
    heroObserver.observe(heroSection);

    function tickHero3D() {
      const scrollDiff = targetScroll - smoothedScroll;
      smoothedScroll += scrollDiff * 0.075;
      scrollVelocity = (smoothedScroll - lastScroll);
      lastScroll = smoothedScroll;

      const heroHeight = heroSection.offsetHeight || window.innerHeight;
      const normScroll = Math.min(1.5, Math.max(0, smoothedScroll / heroHeight));

      // Dynamic liquid wave time & velocity surge
      waveTime += 0.016 + Math.abs(scrollVelocity) * 0.003;
      const targetSurge = Math.min(2.5, Math.abs(scrollVelocity) * 0.06);
      currentSurge += (targetSurge - currentSurge) * 0.12;

      waveMat1.uniforms.uTime.value = waveTime;
      waveMat1.uniforms.uScroll.value = smoothedScroll;
      waveMat1.uniforms.uSurge.value = currentSurge;

      if (waveMat2) {
        waveMat2.uniforms.uTime.value = waveTime * 0.85;
        waveMat2.uniforms.uScroll.value = smoothedScroll;
        waveMat2.uniforms.uSurge.value = currentSurge * 0.8;
      }

      if (!prefersReducedMotion) {
        // Camera Subtle Orbit & Forward/Backward Movement through space
        camera.position.x = Math.sin(smoothedScroll * 0.0008) * 1.5;
        camera.position.y = 0.8 - smoothedScroll * 0.0068;
        camera.position.z = 22.0 - normScroll * 4.8;
        camera.rotation.x = -smoothedScroll * 0.00022;
        camera.rotation.y = Math.sin(smoothedScroll * 0.0006) * 0.04;

        // Wave subtle vertical parallax
        primaryWave.position.y = -2.8 + smoothedScroll * 0.005;
        if (secondaryWave) {
          secondaryWave.position.y = 5.2 + smoothedScroll * 0.008;
        }

        // Particle Layers Parallax
        deepParticles.position.y = smoothedScroll * 0.003;
        nearParticles.position.y = -smoothedScroll * 0.015;

        // Subtle Typography Parallax (Layered Depth)
        if (typeAmantha && typePerera && normScroll < 1.2) {
          typeAmantha.style.transform = `translate3d(0, ${(smoothedScroll * 0.06).toFixed(1)}px, 0)`;
          typePerera.style.transform = `translate3d(0, ${(smoothedScroll * 0.09).toFixed(1)}px, 0)`;
        }
      }
    }

    function animateHero3D() {
      if (isHeroActive) {
        tickHero3D();
        renderer.render(scene, camera);
      }
      requestAnimationFrame(animateHero3D);
    }

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      requestAnimationFrame(animateHero3D);
    }

    // Window Resize Handler
    window.addEventListener('resize', () => {
      const w = heroWrap.offsetWidth;
      const h = heroWrap.offsetHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }, { passive: true });
  }

  // ========================================================================
  // 03. 3D SCROLLING PERSPECTIVE & SPATIAL INERTIA ENGINE
  // ========================================================================
  const editorialSections = document.querySelectorAll('.section-editorial');
  const cards3D = document.querySelectorAll(
    '.stat-cell, .work-item, .editorial-pkg-item, .service-card, .production-card, .booking-calendar-card, .spread-image-wrapper'
  );

  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let currentVelTilt = 0;
  let ticking = false;

  // 3D Scroll Reveal Initialization
  editorialSections.forEach((sec) => {
    sec.classList.add('reveal-3d-init');
  });

  const section3DObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-3d-active');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  editorialSections.forEach((sec) => section3DObserver.observe(sec));

  // Continuous 3D Scroll Perspective Loop
  function update3DScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 1. Hero Natural Fade on Scroll (3D space moves independently via WebGL)
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight || windowHeight;
      if (scrollY <= heroHeight) {
        const p = Math.min(1, Math.max(0, scrollY / heroHeight));
        const op = Math.max(0.08, 1 - p * 0.92);
        heroSection.style.opacity = op.toFixed(3);
      } else {
        heroSection.style.opacity = '0.08';
      }
    }

    // 2. Velocity Inertia Decay
    const targetVelTilt = Math.max(-5, Math.min(5, scrollVelocity * 0.045));
    currentVelTilt += (targetVelTilt - currentVelTilt) * 0.14;
    scrollVelocity *= 0.88; // decay velocity

    // 3. Section 3D Spatial Curvature along Z-axis (Desktop only for 120Hz smooth touch)
    if (window.innerWidth > 768) {
      editorialSections.forEach((sec) => {
        if (sec.classList.contains('reveal-3d-active')) {
          const rect = sec.getBoundingClientRect();
          if (rect.top < windowHeight && rect.bottom > 0) {
            const secCenter = rect.top + rect.height / 2;
            const normDist = (secCenter - windowHeight / 2) / (windowHeight / 2); // -1 to 1
            const posTilt = Math.max(-3.5, Math.min(3.5, normDist * 2.8));
            const totalPitch = posTilt + currentVelTilt;
            const depthZ = -Math.abs(normDist) * 15;

            sec.style.transform = `perspective(1200px) rotateX(${totalPitch.toFixed(2)}deg) translateZ(${depthZ.toFixed(1)}px)`;

            // Subtle multi-plane parallax on large background section numbers
            const metaNum = sec.querySelector('.meta-number');
            if (metaNum) {
              const numShiftY = (normDist * -18).toFixed(1);
              metaNum.style.transform = `translate3d(0, ${numShiftY}px, 28px)`;
            }
          }
        }
      });
    } else {
      // Clean reset on mobile
      editorialSections.forEach((sec) => {
        if (sec.style.transform) {
          sec.style.transform = '';
        }
      });
    }

    requestAnimationFrame(update3DScroll);
  }
  requestAnimationFrame(update3DScroll);

  // Scroll listener for velocity calculation
  window.addEventListener(
    'scroll',
    () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  // 4. Interactive 3D Holographic Card Mouse Tilt
  cards3D.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = ((y - 0.5) * -15).toFixed(2);
      const tiltY = ((x - 0.5) * 15).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(16px) scale3d(1.025, 1.025, 1.025)`;
      card.style.setProperty('--mouse-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${(y * 100).toFixed(1)}%`);
      card.classList.add('card-hover-elevated');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      card.classList.remove('card-hover-elevated');
    });
  });

  // ========================================================================
  // 03. NAVIGATION SCROLL BLUR & SCROLL SPY
  // ========================================================================
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // ========================================================================
  // 04. MOBILE FULL-SCREEN MENU
  // ========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    if (mobileOverlay) {
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileOverlay) {
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Close when tapping on the overlay backdrop
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Close when pressing Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ========================================================================
  // 05. STATISTIC COUNTERS (INTERSECTION OBSERVER)
  // ========================================================================
  const statCounters = document.querySelectorAll('.counter');
  let statsTriggered = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        animateCounters();
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateCounters() {
    statCounters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target === 98200 || target === 4900000 || target === 1200000;
      let displayTarget = target;
      
      if (target === 98200) displayTarget = 98.2;
      else if (target === 4900000) displayTarget = 4.9;
      else if (target === 1200000) displayTarget = 1.2;
      else if (target === 35) displayTarget = 35;

      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentVal = (displayTarget * easeOutQuad).toFixed(isDecimal ? 1 : 0);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = displayTarget;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  // ========================================================================
  // 06. RATE CARD CURRENCY SWITCHER (LKR <-> USD)
  // ========================================================================
  const btnCurrLKR = document.getElementById('btnCurrLKR');
  const btnCurrUSD = document.getElementById('btnCurrUSD');
  const priceVals = document.querySelectorAll('.price-val');
  const accRates = document.querySelectorAll('.acc-rate[data-lkr]');

  let currentCurr = 'LKR';

  function updateCurrency(curr) {
    currentCurr = curr;

    if (curr === 'LKR') {
      if (btnCurrLKR) btnCurrLKR.classList.add('active');
      if (btnCurrUSD) btnCurrUSD.classList.remove('active');

      priceVals.forEach(pv => {
        pv.textContent = `LKR ${pv.getAttribute('data-lkr')}`;
      });

      accRates.forEach(ar => {
        ar.textContent = ar.getAttribute('data-lkr');
      });
    } else {
      if (btnCurrUSD) btnCurrUSD.classList.add('active');
      if (btnCurrLKR) btnCurrLKR.classList.remove('active');

      priceVals.forEach(pv => {
        pv.textContent = `$${pv.getAttribute('data-usd')} USD`;
      });

      accRates.forEach(ar => {
        ar.textContent = ar.getAttribute('data-usd');
      });
    }
  }

  if (btnCurrLKR) btnCurrLKR.addEventListener('click', () => updateCurrency('LKR'));
  if (btnCurrUSD) btnCurrUSD.addEventListener('click', () => updateCurrency('USD'));

  // ========================================================================
  // 07. DELIVERABLES ACCORDION
  // ========================================================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const panel = item.querySelector('.accordion-panel');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items for clean editorial elegance
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.accordion-trigger');
          const otherPanel = other.querySelector('.accordion-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 30 + 'px';
      }
    });
  });

  // ========================================================================
  // 08. PACKAGE SELECTION & CONTACT INTEGRATION
  // ========================================================================
  const pkgButtons = document.querySelectorAll('.pkg-select-btn');
  const inputTier = document.getElementById('inputTier');

  pkgButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkg = btn.getAttribute('data-pkg');
      if (inputTier) {
        for (let opt of inputTier.options) {
          if (opt.value.includes(pkg)) {
            opt.selected = true;
            break;
          }
        }
      }
    });
  });

  const editorialForm = document.getElementById('editorialInquiryForm');
  const formNote = document.getElementById('formNote');

  if (editorialForm) {
    editorialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const brand = document.getElementById('inputBrand').value.trim();
      const email = document.getElementById('inputEmail').value.trim();
      const tier = inputTier ? inputTier.value : 'Partnership Inquiry';
      const brief = document.getElementById('inputBrief').value.trim();

      const subject = encodeURIComponent(`Partnership Intake: ${brand} x Amantha Perera`);
      const body = encodeURIComponent(
        `Hi Amantha,\n\nBrand/Entity: ${brand}\nContact Email: ${email}\nFormat: ${tier}\n\nCampaign Brief / Launch Window:\n${brief}\n\nLooking forward to hearing from you!`
      );

      const mailto = `mailto:notamanthaperera27@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;

      if (formNote) {
        formNote.classList.add('show');
        setTimeout(() => formNote.classList.remove('show'), 7000);
      }
    });
  }

});
