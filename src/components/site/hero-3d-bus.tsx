"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================================
   TechMarkage Express — 3D hero scene
   A stylized low-poly coach that drives across the screen on a
   glowing road, with rotating wheels, emissive windows, a cyan
   particle trail, dynamic fog, and subtle mouse-parallax camera.
   Built entirely from primitives — no external 3D assets needed.
   ============================================================ */

/* ---------- The coach ---------- */
function Coach() {
  const group = useRef<THREE.Group>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelRL = useRef<THREE.Mesh>(null);
  const wheelRR = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Drive across the screen in a loop, slight bob
      const cycle = (t * 0.12) % 1;
      group.current.position.x = -14 + cycle * 28;
      group.current.position.y = 0.15 + Math.sin(t * 2.2) * 0.04;
      // Slight lean into the motion
      group.current.rotation.z = Math.sin(t * 2.2) * 0.015;
    }
    // Wheels spin
    const spin = delta * 14;
    [wheelFL, wheelFR, wheelRL, wheelRR].forEach((w) => {
      if (w.current) w.current.rotation.x += spin;
    });
  });

  // Body materials — dark teal body with metallic finish, pops via emissive accents
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0B2A35",
        metalness: 0.8,
        roughness: 0.25,
        emissive: "#042F38",
        emissiveIntensity: 0.4,
      }),
    []
  );
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#06B6D4",
        emissive: "#06B6D4",
        emissiveIntensity: 1.2,
        metalness: 0.4,
        roughness: 0.3,
      }),
    []
  );
  const windowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#67E8F9",
        emissive: "#22D3EE",
        emissiveIntensity: 2.2,
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.95,
      }),
    []
  );
  const tyreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0A1F26",
        metalness: 0.3,
        roughness: 0.7,
      }),
    []
  );
  const hubMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22D3EE",
        emissive: "#06B6D4",
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group ref={group} position={[-14, 0, 0]} scale={1.1}>
      {/* Main body */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[5.2, 1.7, 1.9]} />
      </mesh>
      {/* Roof curve — a slightly smaller box on top for a coach silhouette */}
      <mesh material={bodyMat} position={[0, 0.95, 0]}>
        <boxGeometry args={[4.6, 0.25, 1.7]} />
      </mesh>
      {/* Front nose (driver cabin) — angled box */}
      <mesh material={bodyMat} position={[2.85, -0.1, 0]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.8, 1.5, 1.85]} />
      </mesh>
      {/* Windshield */}
      <mesh material={windowMat} position={[3.15, 0.35, 0]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.12, 0.9, 1.6]} />
      </mesh>
      {/* Side windows — row of glowing panes */}
      {[-1.9, -0.9, 0.1, 1.1, 2.1].map((x) => (
        <mesh key={x} material={windowMat} position={[x, 0.45, 0.96]}>
          <boxGeometry args={[0.7, 0.55, 0.04]} />
        </mesh>
      ))}
      {[-1.9, -0.9, 0.1, 1.1, 2.1].map((x) => (
        <mesh key={`r-${x}`} material={windowMat} position={[x, 0.45, -0.96]}>
          <boxGeometry args={[0.7, 0.55, 0.04]} />
        </mesh>
      ))}
      {/* Accent stripe along the side */}
      <mesh material={accentMat} position={[0, -0.15, 0.97]}>
        <boxGeometry args={[5.0, 0.12, 0.03]} />
      </mesh>
      <mesh material={accentMat} position={[0, -0.15, -0.97]}>
        <boxGeometry args={[5.0, 0.12, 0.03]} />
      </mesh>
      {/* Headlights */}
      <mesh material={accentMat} position={[3.28, -0.35, 0.65]}>
        <boxGeometry args={[0.08, 0.22, 0.18]} />
      </mesh>
      <mesh material={accentMat} position={[3.28, -0.35, -0.65]}>
        <boxGeometry args={[0.08, 0.22, 0.18]} />
      </mesh>
      {/* Headlight beams — two spotlight cones projecting forward */}
      <spotLight
        position={[3.4, -0.3, 0.65]}
        target-position={[10, -0.5, 0.65]}
        angle={0.35}
        penumbra={0.6}
        intensity={8}
        distance={14}
        color="#67E8F9"
      />
      <spotLight
        position={[3.4, -0.3, -0.65]}
        target-position={[10, -0.5, -0.65]}
        angle={0.35}
        penumbra={0.6}
        intensity={8}
        distance={14}
        color="#67E8F9"
      />
      {/* Wheels */}
      {[
        { ref: wheelFL, pos: [2.0, -0.95, 1.0] },
        { ref: wheelFR, pos: [2.0, -0.95, -1.0] },
        { ref: wheelRL, pos: [-2.0, -0.95, 1.0] },
        { ref: wheelRR, pos: [-2.0, -0.95, -1.0] },
      ].map((w, i) => (
        <group key={i} position={w.pos as [number, number, number]}>
          <mesh ref={w.ref} material={tyreMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.55, 0.55, 0.32, 18]} />
          </mesh>
          <mesh material={hubMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.34, 10]} />
          </mesh>
        </group>
      ))}
      {/* Underglow — a cyan point light beneath the bus */}
      <pointLight
        position={[0, -1.2, 0]}
        color="#06B6D4"
        intensity={6}
        distance={6}
        decay={2}
      />
    </group>
  );
}

/* ---------- The glowing road ---------- */
function Road() {
  const dashesRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (dashesRef.current) {
      // Scroll the dashes toward the camera to imply forward motion
      dashesRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const base = (mesh.userData.x as number) ?? 0;
        const offset = (t * 6) % 4;
        mesh.position.x = ((base - offset + 20) % 20) - 10;
      });
    }
  });

  const dashPositions = useMemo(() => {
    const arr: number[] = [];
    for (let i = -10; i <= 10; i += 2) arr.push(i);
    return arr;
  }, []);

  return (
    <group position={[0, -1.1, 0]}>
      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 8]} />
        <meshStandardMaterial
          color="#0A1F26"
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>
      {/* Center dashed line */}
      <group ref={dashesRef}>
        {dashPositions.map((x, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, 0]}>
            <planeGeometry args={[0.8, 0.12]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#06B6D4"
              emissiveIntensity={1.4}
            />
          </mesh>
        ))}
      </group>
      {/* Edge glow lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 3.8]}>
        <planeGeometry args={[60, 0.08]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -3.8]}>
        <planeGeometry args={[60, 0.08]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

/* ---------- Particle trail behind the bus ---------- */
function ParticleTrail({ count = 220 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 4 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.z = Math.sin(t * 0.2) * 0.05;
      const geo = points.current.geometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < count; i++) {
        // Drift particles rightward and wrap
        arr[i * 3] += 0.06;
        if (arr[i * 3] > 15) arr[i * 3] = -15;
        arr[i * 3 + 1] += Math.sin(t * 1.5 + i) * 0.002;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#67E8F9"
        size={0.08}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Mouse-parallax camera rig ---------- */
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 2.5 - camera.position.x) * 0.04;
    camera.position.y += (1.6 + pointer.y * 1.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------- The full scene ---------- */
function Scene() {
  return (
    <>
      <CameraRig />
      <fog attach="fog" args={["#042F38", 12, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#ECFEFF" />
      <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#06B6D4" />
      <pointLight position={[-8, 4, 2]} intensity={5} color="#06B6D4" distance={22} />
      <pointLight position={[8, 3, -3]} intensity={4} color="#22D3EE" distance={20} />
      <Coach />
      <Road />
      <ParticleTrail />
    </>
  );
}

/* ---------- Public wrapper with lazy Canvas ---------- */
export function Hero3DBus() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.6, 9], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
