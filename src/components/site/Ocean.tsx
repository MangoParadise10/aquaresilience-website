import { useEffect, useRef } from "react";

/*
 * The storm beneath the glass: a full-screen WebGL ocean rendered behind every page.
 * Original shader: domain-warped swell + fbm chop, seen in perspective, shaded in
 * abyssal blue with violet troughs, silver sky reflections and white crest foam.
 * Falls back to a static gradient without WebGL, and freezes for reduced motion.
 */

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 uR;
uniform float uT;
uniform float uS;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), f.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a*noise(p); p = mat2(1.6,1.2,-1.2,1.6)*p + vec2(3.1, 1.7); a *= 0.5; }
  return v;
}
float sea(vec2 p){
  float t = uT;
  vec2 w = p + 1.1*vec2(fbm(p*0.22 + vec2(t*0.05, 0.0)), fbm(p*0.22 + vec2(5.2, -t*0.04)));
  float h = 0.0;
  h += 0.55*sin(dot(w, vec2(0.80, 0.60))*1.10 - t*1.30);
  h += 0.30*sin(dot(w, vec2(-0.55, 0.83))*1.90 - t*1.75);
  h += 0.16*sin(dot(w, vec2(0.15, -0.99))*3.30 - t*2.40);
  float chop = fbm(w*1.4 + vec2(t*0.35, t*0.18));
  h = h*0.55 + chop*1.05;
  return h - abs(sin(w.x*0.9 + w.y*0.5 - t*1.2))*0.25;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uR) / uR.y;
  float y = uv.y + 0.95;
  float depth = 1.0 / max(y*0.55 + 0.12, 0.02);
  vec2 p = vec2(uv.x*depth*1.6, depth*2.2 + uT*0.6 + uS*0.0025);

  float e = 0.03*depth*0.35 + 0.01;
  float h = sea(p);
  float hx = sea(p + vec2(e, 0.0));
  float hy = sea(p + vec2(0.0, e));
  vec3 n = normalize(vec3(-(hx - h)/e, 1.4, -(hy - h)/e));

  vec3 V = normalize(vec3(0.0, 0.75, -0.65));
  vec3 L = normalize(vec3(-0.35, 0.8, 0.45));

  vec3 abyss  = vec3(0.004, 0.012, 0.05);
  vec3 deep   = vec3(0.012, 0.06, 0.24);
  vec3 ultra  = vec3(0.05, 0.22, 0.72);
  vec3 violet = vec3(0.22, 0.07, 0.48);
  vec3 silver = vec3(0.72, 0.80, 0.92);
  vec3 foamC  = vec3(0.92, 0.96, 1.0);

  float hh = smoothstep(-0.35, 1.25, h);
  vec3 col = mix(abyss, deep, hh);
  col = mix(col, ultra, pow(hh, 2.2));
  col = mix(col, violet, smoothstep(0.35, -0.4, h)*0.45);

  float diff = clamp(dot(n, L), 0.0, 1.0);
  col *= 0.55 + 0.75*diff;

  float fres = pow(1.0 - clamp(dot(n, V), 0.0, 1.0), 4.0);
  col += silver*fres*0.55;

  vec3 R = reflect(-L, n);
  float spec = pow(clamp(dot(R, V), 0.0, 1.0), 40.0);
  col += silver*spec*0.7;

  float foam = smoothstep(1.0, 1.5, h + 0.25*fbm(p*1.1 + uT*0.4));
  col = mix(col, foamC, foam*0.55);

  float horizon = smoothstep(0.55, 1.05, uv.y + 0.5);
  col = mix(col, vec3(0.03, 0.07, 0.2), horizon*0.65);

  float vig = smoothstep(1.35, 0.2, length(uv*vec2(0.85, 1.0)));
  col *= 0.55 + 0.45*vig;
  col *= 0.82;

  gl_FragColor = vec4(pow(col, vec3(0.92)), 1.0);
}
`;

export const Ocean = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "uR");
    const uT = gl.getUniformLocation(prog, "uT");
    const uS = gl.getUniformLocation(prog, "uS");

    // Render below native resolution: the water is soft by nature and this keeps phones cool.
    const scale = Math.min(window.devicePixelRatio || 1, 2) * (window.innerWidth < 768 ? 0.45 : 0.6);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      gl.uniform1f(uT, still ? 12.0 : (now - start) / 1000);
      gl.uniform1f(uS, window.scrollY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const onScroll = () => { if (still) requestAnimationFrame(frame); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !still) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 ocean-fallback">
      <canvas ref={ref} className="h-full w-full" />
      {/* The glass floor: tile seams in perspective, catching silver light. */}
      <div className="glass-floor" />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_80%_3%/0.55)] via-transparent to-[hsl(222_80%_3%/0.6)]" />
    </div>
  );
};
