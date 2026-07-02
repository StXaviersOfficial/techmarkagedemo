"use client";

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Environment, Lightformer, Float } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   TechMarkage Express — Cinematic 3D hero
   Full-screen 3D: detailed PBR coach, realistic road, floating 3D
   text "TechMarkage Express" + "Book Now", environment-mapped
   reflections, cinematic camera. Works on desktop AND mobile.
   ============================================================ */

/* ---------- Detect mobile (SSR-safe) ---------- */
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

/* ---------- Detailed coach with PBR materials ---------- */
function Coach() {
  const group = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.8) * 0.12;
      group.current.rotation.y = -0.4 + Math.sin(t * 0.25) * 0.06;
    }
    if (wheelsRef.current) {
      wheelsRef.current.children.forEach((child) => {
        (child as THREE.Mesh).rotation.x += 0.03;
      });
    }
  });

  // PBR materials — metallic body that reflects the environment
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D0F0F8",
        metalness: 0.95,
        roughness: 0.12,
        envMapIntensity: 1.5,
      }),
    []
  );
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#06B6D4",
        emissive: "#06B6D4",
        emissiveIntensity: 3.0,
        metalness: 0.5,
        roughness: 0.2,
      }),
    []
  );
  const windowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A1F26",
        emissive: "#22D3EE",
        emissiveIntensity: 2.5,
        metalness: 0.9,
        roughness: 0.05,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );
  const tyreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A0A0A",
        metalness: 0.3,
        roughness: 0.8,
      }),
    []
  );
  const rimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C0C0C0",
        metalness: 1.0,
        roughness: 0.15,
        envMapIntensity: 2.0,
      }),
    []
  );
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFFFFF",
        metalness: 1.0,
        roughness: 0.05,
        envMapIntensity: 2.5,
      }),
    []
  );

  return (
    <group ref={group} position={[0.5, -0.2, 0]} scale={1.3} rotation={[0, -0.4, 0]}>
      {/* ===== Main body ===== */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[6.5, 2.1, 2.3]} />
      </mesh>
      {/* Roof */}
      <mesh material={bodyMat} position={[0, 1.15, 0]}>
        <boxGeometry args={[5.8, 0.3, 2.1]} />
      </mesh>
      {/* AC unit */}
      <mesh material={bodyMat} position={[-0.5, 1.42, 0]}>
        <boxGeometry args={[1.8, 0.25, 1.4]} />
      </mesh>
      <mesh material={accentMat} position={[-0.5, 1.56, 0]}>
        <boxGeometry args={[1.6, 0.04, 1.2]} />
      </mesh>

      {/* ===== Front nose ===== */}
      <mesh material={bodyMat} position={[3.55, -0.15, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[1.0, 1.85, 2.25]} />
      </mesh>
      {/* Windshield */}
      <mesh material={windowMat} position={[3.85, 0.4, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.14, 1.1, 1.9]} />
      </mesh>
      {/* Destination sign */}
      <mesh material={accentMat} position={[3.95, 1.0, 0]}>
        <boxGeometry args={[0.1, 0.35, 1.6]} />
      </mesh>
      {/* Front grille */}
      <mesh material={chromeMat} position={[3.98, -0.5, 0]}>
        <boxGeometry args={[0.08, 0.5, 1.8]} />
      </mesh>

      {/* ===== Side windows ===== */}
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

      {/* ===== Headlights ===== */}
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

      {/* ===== Mirrors ===== */}
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
              <cylinderGeometry args={[0.32, 0.32, 0.4, 12]} />
            </mesh>
            {[0, 1, 2, 3, 4].map((s) => (
              <mesh key={s} material={rimMat} rotation={[0, 0, (s / 5) * Math.PI * 2]}>
                <boxGeometry args={[0.55, 0.06, 0.06]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Underglow */}
      <pointLight position={[0, -1.5, 0]} color="#06B6D4" intensity={8} distance={8} decay={2} />
    </group>
  );
}

/* ---------- Perspective highway with animated dashes ---------- */
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
      });
    }
  });

  const dashPositions = useMemo(() => {
    const arr: number[] = [];
    for (let i = -40; i <= 40; i += 8) arr.push(i);
    return arr;
  }, []);

  return (
    <group position={[0, -2.8, 0]} rotation={[-0.12, 0, 0]}>
      {/* Road surface — dark asphalt with env reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 100]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      {/* Center dashes */}
      <group ref={dashesRef}>
        {dashPositions.map((z, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]} userData={{ z }}>
            <planeGeometry args={[0.3, 1.5]} />
            <meshStandardMaterial color="#22D3EE" emissive="#06B6D4" emissiveIntensity={2.5} />
          </mesh>
        ))}
      </group>
      {/* Edge lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.03, 0]}>
        <planeGeometry args={[0.15, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.03, 0]}>
        <planeGeometry args={[0.15, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

/* ---------- Floating 3D text ---------- */
function SceneText({ isMobile }: { isMobile: boolean }) {
  const titleRef = useRef<THREE.Group>(null);
  const ctaRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (titleRef.current) {
      titleRef.current.position.y = 3.2 + Math.sin(t * 0.6) * 0.15;
      titleRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
    if (ctaRef.current) {
      ctaRef.current.position.y = 2.0 + Math.sin(t * 0.6 + 1) * 0.12;
    }
  });

  const titleSize = isMobile ? 0.5 : 0.8;
  const ctaSize = isMobile ? 0.3 : 0.45;

  return (
    <>
      <group ref={titleRef} position={[0, 3.2, 0]}>
        <Text
          fontSize={titleSize}
          color="#67E8F9"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#042F38"
          outlineOpacity={0.8}
          material-toneMapped={false}
        >
          TechMarkage Express
        </Text>
      </group>
      <group ref={ctaRef} position={[0, 2.0, 0]}>
        <Text
          fontSize={ctaSize}
          color="#06B6D4"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#042F38"
          outlineOpacity={0.6}
          material-toneMapped={false}
        >
          Book Now
        </Text>
      </group>
    </>
  );
}

/* ---------- Instanced particle field ---------- */
function ParticleField({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 28,
      y: Math.random() * 10 - 2,
      z: (Math.random() - 0.5) * 28,
      speed: 0.3 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2,
      scale: 0.2 + Math.random() * 0.5,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      let y = p.y + (t * p.speed) % 12;
      y = ((y + 2) % 12) - 2;
      const x = p.x + Math.sin(t * 0.4 + p.offset) * 0.4;
      dummy.position.set(x, y, p.z);
      const s = p.scale * (0.8 + Math.sin(t * 2 + p.offset) * 0.2);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial
        color="#67E8F9"
        emissive="#22D3EE"
        emissiveIntensity={2.5}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

/* ---------- Camera rig ---------- */
function CameraRig({ isMobile }: { isMobile: boolean }) {
  const { camera, pointer } = useThree();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const orbitX = Math.sin(t * 0.06) * 1.2;
    const orbitY = 1.5 + Math.sin(t * 0.1) * 0.4;
    const mouseX = isMobile ? 0 : pointer.x * 1.5;
    const mouseY = isMobile ? 0 : pointer.y * 0.8;
    camera.position.x += (orbitX + mouseX - camera.position.x) * 0.03;
    camera.position.y += (orbitY + mouseY - camera.position.y) * 0.03;
    camera.position.z = 9.5;
    camera.lookAt(0.3, 0.5, 0);
  });
  return null;
}

/* ---------- The full scene ---------- */
function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <CameraRig isMobile={isMobile} />
      <fog attach="fog" args={["#042F38", 20, 55]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={2.0} color="#ECFEFF" castShadow />
      <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#06B6D4" />
      <pointLight position={[-10, 5, 3]} intensity={8} color="#06B6D4" distance={30} />
      <pointLight position={[10, 4, -3]} intensity={6} color="#22D3EE" distance={28} />

      {/* Environment for realistic reflections (no external files) */}
      <Environment resolution={256}>
        {/* Studio-style light setup for metallic reflections */}
        <Lightformer intensity={2} position={[0, 5, 5]} scale={[10, 5, 1]} color="#ECFEFF" />
        <Lightformer intensity={1.5} position={[-5, 3, 2]} scale={[5, 5, 1]} color="#06B6D4" />
        <Lightformer intensity={1.5} position={[5, 3, -2]} scale={[5, 5, 1]} color="#22D3EE" />
        <Lightformer intensity={1} position={[0, -2, 0]} scale={[10, 3, 1]} color="#0A1F26" />
      </Environment>

      <Coach />
      <Highway />
      <SceneText isMobile={isMobile} />
      <ParticleField count={isMobile ? 50 : 120} />
    </>
  );
}

/* ---------- Public wrapper ---------- */
export function Hero3DBus() {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.5, 9.5], fov: 50 }}
        dpr={isMobile ? [0.5, 1.0] : [0.75, 1.75]}
        frameloop="always"
        shadows={!isMobile}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
