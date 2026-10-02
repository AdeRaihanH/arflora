"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform float u_time;
uniform vec2 u_res;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.055;
  vec2 q = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 + vec2(5.2, 1.3) - t));
  float f = fbm(p * 1.9 + q * 1.5);

  vec3 dark = vec3(0.078, 0.208, 0.086);
  vec3 mid = vec3(0.243, 0.518, 0.251);
  vec3 sprout = vec3(0.729, 0.867, 0.498);
  vec3 pink = vec3(0.937, 0.675, 0.647);
  vec3 cream = vec3(0.969, 0.937, 0.855);

  vec3 col = mix(dark, mid, smoothstep(0.12, 0.85, f));
  col = mix(col, sprout, smoothstep(0.48, 0.92, f) * 0.45);
  col = mix(col, pink, smoothstep(0.62, 1.0, f) * 0.52);
  col = mix(col, cream, smoothstep(0.85, 1.0, f) * 0.28);

  float d = distance(uv, vec2(0.62, 0.45));
  col *= smoothstep(1.25, 0.15, d) * 0.5 + 0.6;

  col += (hash(uv * u_res + u_time) - 0.5) * 0.035;

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const start = performance.now();
    let frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      resize();
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, width, height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-dark to-brand" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
