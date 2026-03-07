"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const linesGeoRef = useRef<THREE.BufferGeometry>(null);
  const count = 300; // Less particles but with lines
  const { mouse, viewport } = useThree();

  const [positions, velocities, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel, base];
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const goldColors = [
      [0.96, 0.77, 0.09], // F5C518
      [1.0, 0.84, 0.0],
      [1.0, 0.95, 0.78],
    ];
    for (let i = 0; i < count; i++) {
      const c = goldColors[Math.floor(Math.random() * goldColors.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return col;
  }, []);

  // For connecting lines
  const maxLines = count * 4;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useEffect(() => {
    if (!geoRef.current || !linesGeoRef.current) return;
    geoRef.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geoRef.current.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    
    linesGeoRef.current.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  }, [positions, colors, linePositions]);

  useFrame((state) => {
    if (!meshRef.current || !geoRef.current || !linesGeoRef.current || !linesRef.current) return;
    const posAttr = geoRef.current.attributes.position;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;
    const lArr = linesGeoRef.current.attributes.position.array as Float32Array;

    // Mouse world pos
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      const px = arr[i * 3];
      const py = arr[i * 3 + 1];
      const pz = arr[i * 3 + 2];

      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];

      // Move particles
      arr[i * 3] += velocities[i * 3] + Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.002;
      arr[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.002;
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse repulsion
      const dx = mouseX - px;
      const dy = mouseY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) / 3;
        arr[i * 3] -= dx * force * 0.02;
        arr[i * 3 + 1] -= dy * force * 0.02;
      } else {
        // Return to base gently
        arr[i * 3] += (bx - px) * 0.005;
        arr[i * 3 + 1] += (by - py) * 0.005;
      }

      // Bounds
      for (let j = 0; j < 3; j++) {
        const limit = j === 2 ? 5 : 15;
        if (arr[i * 3 + j] > limit) arr[i * 3 + j] = -limit;
        if (arr[i * 3 + j] < -limit) arr[i * 3 + j] = limit;
      }

      // Connect lines to nearby particles
      for (let j = i + 1; j < count; j++) {
        if (lineIndex >= maxLines * 6) break;
        const p2x = arr[j * 3];
        const p2y = arr[j * 3 + 1];
        const p2z = arr[j * 3 + 2];

        const d = Math.sqrt(Math.pow(px - p2x, 2) + Math.pow(py - p2y, 2) + Math.pow(pz - p2z, 2));

        if (d < 1.5) {
          lArr[lineIndex++] = px;
          lArr[lineIndex++] = py;
          lArr[lineIndex++] = pz;
          lArr[lineIndex++] = p2x;
          lArr[lineIndex++] = p2y;
          lArr[lineIndex++] = p2z;
        }
      }
    }
    
    // Clear out remaining line vertices
    for (let i = lineIndex; i < maxLines * 6; i++) {
        lArr[i] = 0;
    }

    posAttr.needsUpdate = true;
    linesGeoRef.current.attributes.position.needsUpdate = true;
    
    // Global spin based on mouse
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.x * 0.2;
    meshRef.current.rotation.x = mouse.y * 0.1;
    linesRef.current.rotation.y = meshRef.current.rotation.y;
    linesRef.current.rotation.x = meshRef.current.rotation.x;
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry ref={geoRef} />
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry ref={linesGeoRef} />
        <lineBasicMaterial
          color="#F5C518"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-dark-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,24,0.06),transparent_50%)] pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
      >
        <Particles />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
