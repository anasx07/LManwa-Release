"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position; // -1 to 1
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // Pseudo-random function
  float hash21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p + 23.45);
    return fract(p.x * p.y);
  }

  // 2D Noise based on hash
  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( hash21( i + vec2(0.0,0.0) ), 
                     hash21( i + vec2(1.0,0.0) ), u.x),
                mix( hash21( i + vec2(0.0,1.0) ), 
                     hash21( i + vec2(1.0,1.0) ), u.x), u.y);
  }

  // Fractal Brownian Motion for volumetric nebula
  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    for(int i=0; i<5; i++){
      f += amp * noise(p);
      p = m * p;
      amp *= 0.5;
    }
    return f;
  }

  // Draw a star shape
  float star(vec2 uv, float flare) {
    float d = length(uv);
    float m = 0.05 / d;
    m *= smoothstep(1.0, 0.1, d); // Taper off to avoid square bounding boxes
    
    float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare;
    
    // Rotate for diagonal rays
    uv *= mat2(0.7071, -0.7071, 0.7071, 0.7071);
    rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * 0.3 * flare;

    return m * smoothstep(1.0, 0.1, d);
  }

  vec3 starLayer(vec2 uv) {
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    for(int y=-1; y<=1; y++) {
      for(int x=-1; x<=1; x++) {
        vec2 offs = vec2(float(x), float(y));
        float n = hash21(id + offs); // random value between 0 and 1
        
        float size = fract(n * 345.32);
        vec2 p = offs - gv + vec2(n, fract(n * 34.0)) - 0.5;
        
        float flare = smoothstep(0.9, 1.0, size);
        float starVal = star(p, flare) * size;
        
        // Color variation (Premium AutaKimi palette: deep indigos, lavenders, pinks)
        vec3 color = sin(vec3(0.2, 0.5, 0.9) * fract(n * 2345.2) * 123.2) * 0.5 + 0.5;
        color = mix(color, vec3(0.8, 0.4, 1.0), 0.6); // Bias towards vivid purple/pink
        
        // Atmospheric Twinkle
        starVal *= sin(uTime * 2.0 + n * 6.2831) * 0.4 + 0.8;
        
        col += starVal * color;
      }
    }
    return col;
  }

  void main() {
    // Normalize and fix aspect ratio
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    
    float t = uTime * 2.8; // Base speed of the spaceship
    vec3 col = vec3(0.0);
    
    // Cinematic Spaceship Translation
    // User requested ship travelling Right to Left (-X).
    // Therefore, the background elements must scroll Left to Right (+X).
    // Subtracting from the UV causes the texture to pan rightwards.
    vec2 globalOffset = vec2(-t * 0.15, 0.0);

    // Abstract volumetric nebula background (The deepest layer, moving incredibly slowly)
    vec2 nebUv = uv * 1.5 + globalOffset * 0.1;
    float dust1 = fbm(nebUv + vec2(t * 0.05, sin(t * 0.05) * 0.1));
    float dust2 = fbm(nebUv * 3.0 - vec2(cos(t * 0.08) * 0.1, t * 0.04));
    
    // Multi-layered deep space clouds colored with Kiwi Night tokens
    vec3 nebColor1 = vec3(0.04, 0.01, 0.15) * dust1 * 3.0; // Deep space indigo
    vec3 nebColor2 = vec3(0.25, 0.05, 0.45) * dust2 * 1.5; // Neon purple hues
    col += nebColor1 + nebColor2;

    // Fixed-depth Parallax Star Layers (Spaceship Window Effect)
    for(float i=1.0; i<=5.0; i+=1.0) {
      // Depth calculation: 1.0 is closest, 5.0 is furthest away
      float layerDepth = i;
      float parallaxScale = layerDepth * 2.5; 
      
      // Speed divides by depth: Closer elements whip past, distant stars barely move
      vec2 layerOffset = globalOffset / layerDepth;
      
      // Add a microscopic camera float/sway (simulates ship vibrating or orbiting)
      layerOffset.y += sin(t * 0.2 + i * 1.2) * 0.01 / layerDepth;
      
      vec2 layerUv = uv + layerOffset;
      
      // Distant stars fade out physically into the nebula fog
      float fade = smoothstep(5.5, 0.5, layerDepth);
      
      // Offset each plane randomly so stars don't stack
      col += starLayer(layerUv * parallaxScale + vec2(i * 453.2, i * 123.5)) * fade;
    }
    
    // Spaceship glass window vignette (focuses the center)
    float vignette = 1.0 - length(uv) * 0.5;
    col *= smoothstep(0.0, 1.0, vignette);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function StarfieldShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "uTime");
    const resLoc = gl.getUniformLocation(program, "uResolution");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = (time: number) => {
      const deltaT = (time - startTime) / 1000;

      gl.useProgram(program);
      gl.uniform1f(timeLoc, deltaT);
      gl.uniform2f(resLoc, canvas.width, canvas.height);


      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] w-full h-full pointer-events-none" />;
}
