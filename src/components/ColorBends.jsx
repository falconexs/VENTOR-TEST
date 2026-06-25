import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  #define MAX_COLORS 8

  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColors[MAX_COLORS];
  uniform int uColorCount;
  uniform vec3 uBaseColor;
  uniform float uRotation;
  uniform float uScale;
  uniform float uFrequency;
  uniform float uWarpStrength;
  uniform float uNoise;
  uniform float uIterations;
  uniform float uIntensity;
  uniform float uBandWidth;
  uniform float uTransparent;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform float uParallax;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.5;
    vec2 shift = vec2(11.7, 23.4);

    for (int i = 0; i < 6; i++) {
      if (float(i) >= uIterations + 0.5) break;
      total += valueNoise(p) * amp;
      p = p * 2.03 + shift;
      amp *= 0.52;
    }

    return total;
  }

  vec3 palette(float t) {
    float scaled = clamp(t, 0.0, 1.0) * float(max(uColorCount - 1, 1));
    vec3 result = uColors[0];

    for (int i = 0; i < MAX_COLORS - 1; i++) {
      if (i < uColorCount - 1) {
        float blend = smoothstep(float(i), float(i + 1), scaled);
        result = mix(result, uColors[i + 1], blend);
      }
    }

    return result;
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv * 2.0 - 1.0;
    centered.x *= uResolution.x / max(uResolution.y, 1.0);

    vec2 mouseOffset = (uMouse - 0.5) * vec2(0.38, -0.28);
    centered += mouseOffset * uMouseInfluence * 0.35;
    centered += mouseOffset * uParallax * 0.12;

    vec2 p = rotate2d(uRotation) * centered;
    p *= max(uScale, 0.001);

    float n = fbm(p * max(uFrequency, 0.001) + vec2(uTime * 0.08, -uTime * 0.05));
    float warp = sin((p.x * 1.9) + (p.y * 0.8) + n * 6.2831) * uWarpStrength;
    float bend = sin((p.y + warp * 0.24 + uTime * 0.06) * uBandWidth);
    float sweep = p.x * 0.18 + p.y * 0.42 + bend * 0.24 + n * 0.28 + uTime * 0.025;
    float t = fract(sweep * 0.42 + 0.5);

    vec3 color = palette(t);
    float band = smoothstep(-0.64, 0.72, bend);
    float glow = pow(1.0 - abs(bend), 2.4);
    vec3 mixed = mix(uBaseColor, color, 0.38 + band * 0.42);
    mixed += color * glow * 0.18 * uIntensity;

    float vignette = 1.0;
    float alpha = 1.0;
    float grain = (hash(uv * uResolution + uTime) - 0.5) * uNoise;

    vec3 finalColor = mixed * 2.4 + grain;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function toColorArray(colors) {
  return colors.slice(0, 8).map((value) => new THREE.Color(value));
}

export default function ColorBends({
  colors = ['#ff5c7a', '#8a5cff', '#00ffd1'],
  rotation = 90,
  speed = 0.2,
  scale = 1.5,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 0,
  noise = 0.25,
  parallax = 0,
  iterations = 1,
  intensity = 2,
  bandWidth = 6.5,
  transparent = false,
  autoRotate = 0,
  color = '#c92424',
  className = '',
}) {
  const mountRef = useRef(null);
  const propsRef = useRef({});
  const palette = useMemo(() => toColorArray(colors), [colors]);
  const classNames = ['color-bends', className].filter(Boolean).join(' ');

  useEffect(() => {
    propsRef.current = {
      palette,
      rotation,
      speed,
      scale,
      frequency,
      warpStrength,
      mouseInfluence,
      noise,
      parallax,
      iterations,
      intensity,
      bandWidth,
      transparent,
      autoRotate,
      baseColor: new THREE.Color(color),
    };
  }, [autoRotate, bandWidth, color, frequency, intensity, iterations, mouseInfluence, noise, palette, parallax, rotation, scale, speed, transparent, warpStrength]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.tabIndex = -1;
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uColors: { value: Array.from({ length: 8 }, () => new THREE.Color('#000000')) },
      uColorCount: { value: 0 },
      uBaseColor: { value: new THREE.Color(color) },
      uRotation: { value: THREE.MathUtils.degToRad(rotation) },
      uScale: { value: scale },
      uFrequency: { value: frequency },
      uWarpStrength: { value: warpStrength },
      uNoise: { value: noise },
      uIterations: { value: iterations },
      uIntensity: { value: intensity },
      uBandWidth: { value: bandWidth },
      uTransparent: { value: transparent ? 1 : 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseInfluence: { value: mouseInfluence },
      uParallax: { value: parallax },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.floor(width));
      const nextHeight = Math.max(1, Math.floor(height));
      renderer.setSize(nextWidth, nextHeight, false);
      uniforms.uResolution.value.set(nextWidth, nextHeight);
    };

    const syncUniforms = (timeSeconds) => {
      const current = propsRef.current;
      const activePalette = current.palette.length ? current.palette : [new THREE.Color('#c92424')];
      uniforms.uColorCount.value = activePalette.length;
      uniforms.uColors.value.forEach((uniformColor, index) => {
        uniformColor.copy(activePalette[index] || activePalette[activePalette.length - 1]);
      });
      uniforms.uBaseColor.value.copy(current.baseColor);
      uniforms.uRotation.value = THREE.MathUtils.degToRad(current.rotation + timeSeconds * current.autoRotate);
      uniforms.uScale.value = current.scale;
      uniforms.uFrequency.value = current.frequency;
      uniforms.uWarpStrength.value = current.warpStrength;
      uniforms.uNoise.value = current.noise;
      uniforms.uIterations.value = Math.min(Math.max(current.iterations, 1), 6);
      uniforms.uIntensity.value = current.intensity;
      uniforms.uBandWidth.value = current.bandWidth;
      uniforms.uTransparent.value = current.transparent ? 1 : 0;
      uniforms.uMouseInfluence.value = current.mouseInfluence;
      uniforms.uParallax.value = current.parallax;
    };

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      uniforms.uMouse.value.set(
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
      );
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    resize();

    let frameId = 0;
    const start = performance.now();
    const render = () => {
      const elapsed = (performance.now() - start) / 1000;
      const current = propsRef.current;
      uniforms.uTime.value = reduceMotion ? 0 : elapsed * current.speed;
      syncUniforms(elapsed);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [bandWidth, color, frequency, intensity, iterations, mouseInfluence, noise, parallax, rotation, scale, speed, transparent, warpStrength]);

  return <div ref={mountRef} className={classNames} aria-hidden="true" />;
}
