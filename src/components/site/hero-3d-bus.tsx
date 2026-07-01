"use client";

import { useMemo, useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================================
   TechMarkage Express — Cinematic 3D hero
   A full-screen 3D scene: a detailed coach on a perspective
   highway, surrounded by drifting particles, floating geometric
   shapes, 3D text labels, a starfield, and bloom post-processing.
   Works on desktop AND mobile with adaptive quality.
   ============================================================ */

/* ---------- Responsive quality hook ---------- */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ---------- Detailed coach model ---------- */
function Coach() {
  const group = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Slow dramatic hover: gentle bob + slight rotation
      group.current.position.y = Math.sin(t * 0.8) * 0.15;
      group.current.rotation.y = -0.35 + Math.sin(t * 0.3) * 0.08;
      group.current.rotation.z = Math.sin(t * 0.6) * 0.02;
    }
    // Wheels slowly spin
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach((child) => {
        (child as THREE.Mesh).rotation.x += 0.04;
      });
    }
  });

  // Materials
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0B2A35",
        metalness: 0.85,
        roughness: 0.22,
        emissive: "#042F38",
        emissiveIntensity: 0.3,
      }),
    []
  );
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#06B6D4",
        emissive: "#06B6D4",
        emissiveIntensity: 2.5,
        metalness: 0.4,
        roughness: 0.2,
      }),
    []
  );
  const windowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#67E8F9",
        emissive: "#22D3EE",
        emissiveIntensity: 3.0,
        metalness: 0.1,
        roughness: 0.05,
        transparent: true,
        opacity: 0.95,
      }),
    []
  );
  const tyreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#050E13",
        metalness: 0.4,
        roughness: 0.65,
      }),
    []
  );
  const rimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22D3EE",
        emissive: "#06B6D4",
        emissiveIntensity: 1.5,
        metalness: 0.9,
        roughness: 0.15,
      }),
    []
  );
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E0F7FA",
        metalness: 1.0,
        roughness: 0.1,
      }),
    []
  );
  const destSignMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A1F26",
        emissive: "#22D3EE",
        emissiveIntensity: 1.8,
      }),
    []
  );

  return (
    <group ref={group} position={[0.5, -0.3, 0]} scale={1.3} rotation={[0, -0.35, 0]}>
      {/* ===== Main body ===== */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[6.5, 2.1, 2.3]} />
      </mesh>
      {/* Roof — slightly smaller box on top for coach silhouette */}
      <mesh material={bodyMat} position={[0, 1.15, 0]}>
        <boxGeometry args={[5.8, 0.3, 2.1]} />
      </mesh>
      {/* AC unit on roof */}
      <mesh material={bodyMat} position={[-0.5, 1.42, 0]}>
        <boxGeometry args={[1.8, 0.25, 1.4]} />
      </mesh>
      <mesh material={accentMat} position={[-0.5, 1.56, 0]}>
        <boxGeometry args={[1.6, 0.04, 1.2]} />
      </mesh>

      {/* ===== Front nose (driver cabin) ===== */}
      <mesh material={bodyMat} position={[3.55, -0.15, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[1.0, 1.85, 2.25]} />
      </mesh>
      {/* Windshield — large raked glass */}
      <mesh material={windowMat} position={[3.85, 0.4, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.14, 1.1, 1.9]} />
      </mesh>
      {/* Destination sign above windshield */}
      <mesh material={destSignMat} position={[3.95, 1.0, 0]}>
        <boxGeometry args={[0.1, 0.35, 1.6]} />
      </mesh>
      {/* Front grille */}
      <mesh material={chromeMat} position={[3.98, -0.5, 0]}>
        <boxGeometry args={[0.08, 0.5, 1.8]} />
      </mesh>

      {/* ===== Side windows — two rows ===== */}
      {[-2.4, -1.2, 0, 1.2, 2.3].map((x) => (
        <mesh key={`ws-${x}`} material={windowMat} position={[x, 0.55, 1.16]}>
          <boxGeometry args={[0.85, 0.65, 0.05]} />
        </mesh>
      ))}
      {[-2.4, -1.2, 0, 1.2, 2.3].map((x) => (
        <mesh key={`wn-${x}`} material={windowMat} position={[x, 0.55, -1.16]}>
          <boxGeometry args={[0.85, 0.65, 0.05]} />
        </mesh>
      ))}

      {/* ===== Accent stripes ===== */}
      <mesh material={accentMat} position={[0, -0.2, 1.17]}>
        <boxGeometry args={[6.2, 0.14, 0.04]} />
      </mesh>
      <mesh material={accentMat} position={[0, -0.2, -1.17]}>
        <boxGeometry args={[6.2, 0.14, 0.04]} />
      </mesh>
      {/* Lower skirt accent */}
      <mesh material={accentMat} position={[0, -0.95, 1.17]}>
        <boxGeometry args={[6.2, 0.06, 0.04]} />
      </mesh>
      <mesh material={accentMat} position={[0, -0.95, -1.17]}>
        <boxGeometry args={[6.2, 0.06, 0.04]} />
      </mesh>

      {/* Headlight glow meshes (no spotlights — too expensive for perf) */}
      <mesh material={accentMat} position={[4.05, -0.4, 0.75]}>
        <boxGeometry args={[0.08, 0.28, 0.22]} />
      </mesh>
      <mesh material={accentMat} position={[4.05, -0.4, -0.75]}>
        <boxGeometry args={[0.08, 0.28, 0.22]} />
      </mesh>

      {/* ===== Tail lights ===== */}
      <mesh material={accentMat} position={[-3.28, -0.3, 0.8]}>
        <boxGeometry args={[0.06, 0.4, 0.2]} />
      </mesh>
      <mesh material={accentMat} position={[-3.28, -0.3, -0.8]}>
        <boxGeometry args={[0.06, 0.4, 0.2]} />
      </mesh>

      {/* ===== Side mirrors ===== */}
      <mesh material={bodyMat} position={[3.1, 0.3, 1.45]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
      </mesh>
      <mesh material={chromeMat} position={[3.15, 0.3, 1.55]}>
        <boxGeometry args={[0.2, 0.5, 0.08]} />
      </mesh>
      <mesh material={bodyMat} position={[3.1, 0.3, -1.45]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
      </mesh>
      <mesh material={chromeMat} position={[3.15, 0.3, -1.55]}>
        <boxGeometry args={[0.2, 0.5, 0.08]} />
      </mesh>

      {/* ===== Wheels ===== */}
      <group ref={wheelsRef}>
        {[
          [2.4, -1.15, 1.2],
          [2.4, -1.15, -1.2],
          [-2.4, -1.15, 1.2],
          [-2.4, -1.15, -1.2],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh material={tyreMat} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.68, 0.68, 0.38, 24]} />
            </mesh>
            <mesh material={rimMat} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.4, 12]} />
            </mesh>
            {/* Spokes */}
            {[0, 1, 2, 3, 4].map((s) => (
              <mesh
                key={s}
                material={rimMat}
                rotation={[0, 0, (s / 5) * Math.PI * 2]}
                position={[0, 0, 0]}
              >
                <boxGeometry args={[0.5, 0.06, 0.06]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ===== Underglow ===== */}
      <pointLight
        position={[0, -1.5, 0]}
        color="#06B6D4"
        intensity={10}
        distance={8}
        decay={2}
      />
      {/* Interior glow (through windows) */}
      <pointLight
        position={[0, 0.3, 0]}
        color="#67E8F9"
        intensity={3}
        distance={5}
        decay={2}
      />
    </group>
  );
}

/* ---------- Perspective highway ---------- */
function Highway() {
  const dashesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dashesRef.current) {
      dashesRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const baseZ = (mesh.userData.z as number) ?? 0;
        const offset = (t * 8) % 8;
        mesh.position.z = ((baseZ + offset + 40) % 80) - 40;
        // Scale dashes based on distance for perspective
        const dist = Math.abs(mesh.position.z);
        mesh.scale.set(1 - dist / 100, 1, 1 - dist / 100);
      });
    }
  });

  const dashPositions = useMemo(() => {
    const arr: number[] = [];
    for (let i = -40; i <= 40; i += 8) arr.push(i);
    return arr;
  }, []);

  return (
    <group position={[0, -2.8, 0]} rotation={[-0.15, 0, 0]}>
      {/* Road surface — wide plane receding into distance */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 100]} />
        <meshStandardMaterial
          color="#030C12"
          metalness={0.6}
          roughness={0.5}
        />
      </mesh>
      {/* Center dashes — scrolling toward camera */}
      <group ref={dashesRef}>
        {dashPositions.map((z, i) => (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.02, z]}
            userData={{ z }}
          >
            <planeGeometry args={[0.3, 1.5]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#06B6D4"
              emissiveIntensity={2.0}
            />
          </mesh>
        ))}
      </group>
      {/* Edge glow lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.03, 0]}>
        <planeGeometry args={[0.12, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.03, 0]}>
        <planeGeometry args={[0.12, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.0} />
      </mesh>
      {/* Roadside glow posts — fewer for performance */}
      {[-30, -15, 15, 30].map((z, i) => (
        <group key={i} position={[6, 0, z]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 2, 6]} />
            <meshStandardMaterial color="#0A1F26" />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color="#67E8F9"
              emissive="#22D3EE"
              emissiveIntensity={3.0}
            />
          </mesh>
        </group>
      ))}
      {[-30, -15, 15, 30].map((z, i) => (
        <group key={`r-${i}`} position={[-6, 0, z]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 2, 6]} />
            <meshStandardMaterial color="#0A1F26" />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color="#67E8F9"
              emissive="#22D3EE"
              emissiveIntensity={3.0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Instanced particle field (hundreds of glowing particles) ---------- */
function ParticleField({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: Math.random() * 12 - 3,
      z: (Math.random() - 0.5) * 30,
      speed: 0.3 + Math.random() * 0.8,
      offset: Math.random() * Math.PI * 2,
      scale: 0.3 + Math.random() * 0.6,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      // Drift upward, wrap around
      let y = p.y + (t * p.speed) % 15;
      y = ((y + 3) % 15) - 3;
      const x = p.x + Math.sin(t * 0.5 + p.offset) * 0.5;
      const z = p.z + Math.cos(t * 0.3 + p.offset) * 0.5;
      dummy.position.set(x, y, z);
      const s = p.scale * (0.8 + Math.sin(t * 2 + p.offset) * 0.2);
      dummy.scale.set(s, s, s);
      dummy.rotation.y = t * 0.5 + p.offset;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshStandardMaterial
        color="#67E8F9"
        emissive="#22D3EE"
        emissiveIntensity={2.5}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ---------- Floating geometric shapes ---------- */
function FloatingGeometry() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.2 + i * 0.05);
        child.rotation.z = t * (0.15 + i * 0.03);
        child.position.y = child.userData.baseY + Math.sin(t * 0.5 + i) * 0.5;
      });
    }
  });

  const shapes = useMemo(
    () => [
      { pos: [-7, 2, -3] as [number, number, number], type: "torus", scale: 0.8 },
      { pos: [7, 3, -2] as [number, number, number], type: "octa", scale: 0.6 },
      { pos: [-6, -1, 2] as [number, number, number], type: "tetra", scale: 0.5 },
      { pos: [8, 0, 3] as [number, number, number], type: "torus", scale: 0.4 },
      { pos: [-8, 4, -1] as [number, number, number], type: "octa", scale: 0.45 },
      { pos: [6, -2, -4] as [number, number, number], type: "tetra", scale: 0.7 },
    ],
    []
  );

  const wireMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22D3EE",
        emissive: "#06B6D4",
        emissiveIntensity: 1.5,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh
          key={i}
          material={wireMat}
          position={s.pos}
          scale={s.scale}
          userData={{ baseY: s.pos[1] }}
        >
          {s.type === "torus" && <torusGeometry args={[1, 0.3, 8, 16]} />}
          {s.type === "octa" && <octahedronGeometry args={[1, 0]} />}
          {s.type === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Floating glowing rings (replaces 3D text for perf) ---------- */
function FloatingRings({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.1) * 0.1;
      group.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.2 + i * 0.05);
        child.rotation.z = t * (0.15 + i * 0.03);
        child.position.y = child.userData.baseY + Math.sin(t * 0.4 + i * 1.5) * 0.3;
      });
    }
  });

  const rings = useMemo(
    () =>
      isMobile
        ? [
            { pos: [-3, 2, -2] as [number, number, number], scale: 0.6 },
            { pos: [3, -1, -1] as [number, number, number], scale: 0.5 },
          ]
        : [
            { pos: [-7, 2.5, -3] as [number, number, number], scale: 0.8 },
            { pos: [6, 3.5, -4] as [number, number, number], scale: 0.6 },
            { pos: [-6, -1, -1] as [number, number, number], scale: 0.5 },
            { pos: [7, 0, -3] as [number, number, number], scale: 0.7 },
          ],
    [isMobile]
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#67E8F9",
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh
          key={i}
          material={ringMat}
          position={r.pos}
          scale={r.scale}
          userData={{ baseY: r.pos[1] }}
        >
          <torusGeometry args={[1, 0.04, 6, 24]} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Distant starfield ---------- */
function Starfield({ count = 400 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#A5F3FC"
        size={0.15}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Cinematic camera rig ---------- */
function CameraRig({ isMobile }: { isMobile: boolean }) {
  const { camera, pointer } = useThree();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Slow cinematic auto-orbit
    const orbitX = Math.sin(t * 0.08) * 1.5;
    const orbitY = 1.8 + Math.sin(t * 0.12) * 0.5;
    // Mouse parallax on desktop
    const mouseX = isMobile ? 0 : pointer.x * 2.0;
    const mouseY = isMobile ? 0 : pointer.y * 1.0;
    camera.position.x += (orbitX + mouseX - camera.position.x) * 0.03;
    camera.position.y += (orbitY + mouseY - camera.position.y) * 0.03;
    camera.position.z = 9 + Math.sin(t * 0.06) * 1.0;
    camera.lookAt(0.3, 0, 0);
  });
  return null;
}

/* ---------- The full scene ---------- */
function Scene({ isMobile }: { isMobile: boolean }) {
  const particleCount = isMobile ? 60 : 150;
  const starCount = isMobile ? 100 : 200;

  return (
    <>
      <CameraRig isMobile={isMobile} />
      <fog attach="fog" args={["#042F38", 14, 40]} />
      {/* Lighting — kept lean for performance (each light adds shader cost) */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 6]} intensity={1.2} color="#ECFEFF" />
      <pointLight position={[-10, 5, 3]} intensity={6} color="#06B6D4" distance={30} />
      <pointLight position={[10, 4, -3]} intensity={5} color="#22D3EE" distance={28} />

      <Coach />
      <Highway />
      <ParticleField count={particleCount} />
      <FloatingGeometry />
      <FloatingRings isMobile={isMobile} />
      <Starfield count={starCount} />
    </>
  );
}

/* ---------- Public wrapper ---------- */
export function Hero3DBus() {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.8, 9], fov: 50 }}
        dpr={isMobile ? [0.5, 1.0] : [0.75, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
