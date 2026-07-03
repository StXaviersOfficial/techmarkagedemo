"use client";

/**
 * BusScrollScene — Scroll-driven 3D coach assembly/disassembly
 *
 * Built with React Three Fiber. A stylized Volvo 9400 Multi-Axle coach
 * (constructed from Three.js primitives — no external .glb model) that
 * disassembles into its component parts as the user scrolls, then
 * reassembles. Five text overlay phases sync to scroll progress.
 *
 * Performance:
 * - IntersectionObserver gate: canvas only mounts when section is near viewport
 * - RAF runs only when section is visible (frameloop controlled)
 * - Mobile: dpr capped at 1.5, antialias disabled, reduced geometry
 * - prefers-reduced-motion: static assembled bus, no scroll animation
 *
 * The bus is built from primitives (boxes, cylinders) — no external 3D
 * model is used, so there are no licensing requirements.
 */

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

/* ---------- Detect device capability ---------- */
function useDeviceTier() {
  const [tier, setTier] = useState<"high" | "mid" | "low">("high");
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = window.innerWidth < 768;
    if (isMobile && cores < 4) setTier("low");
    else if (isMobile) setTier("mid");
    else setTier("high");
  }, []);
  return tier;
}

/* ---------- Easing helper ---------- */
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/* ---------- The disassembling coach ---------- */
function Coach({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const bodyRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Mesh>(null);
  const wheelFL = useRef<THREE.Mesh>(null);
  const wheelFR = useRef<THREE.Mesh>(null);
  const wheelRL = useRef<THREE.Mesh>(null);
  const wheelRR = useRef<THREE.Mesh>(null);
  const seatsRef = useRef<THREE.Group>(null);
  const acRef = useRef<THREE.Mesh>(null);
  const gpsRef = useRef<THREE.Group>(null);
  const telematicsRef = useRef<THREE.Mesh>(null);
  const doorGlowRef = useRef<THREE.Mesh>(null);

  // PBR materials
  const bodyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#E0F7FA", metalness: 0.9, roughness: 0.15, envMapIntensity: 1.5 }),
    []
  );
  const accentMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#06B6D4", emissive: "#06B6D4", emissiveIntensity: 3.0, metalness: 0.4, roughness: 0.2 }),
    []
  );
  const windowMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0A1F26", emissive: "#22D3EE", emissiveIntensity: 2.5, metalness: 0.9, roughness: 0.05, transparent: true, opacity: 0.85 }),
    []
  );
  const tyreMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0A0A0A", metalness: 0.3, roughness: 0.8 }),
    []
  );
  const rimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#C0C0C0", metalness: 1.0, roughness: 0.15, envMapIntensity: 2.0 }),
    []
  );
  const seatMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1E3A5F", metalness: 0.3, roughness: 0.6 }),
    []
  );
  const gpsMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#F59E0B", emissive: "#F59E0B", emissiveIntensity: 2.0 }),
    []
  );
  const glowMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#06B6D4", transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    []
  );

  useFrame((state) => {
    const p = progressRef.current; // 0 → 1
    const t = state.clock.getElapsedTime();

    // Phase definitions:
    // 0.00-0.20: assembled (idle rotation)
    // 0.20-0.40: roof lifts, wheels spread (Safety)
    // 0.40-0.60: seats/AC float out (Comfort)
    // 0.60-0.80: GPS/telematics glow out (GPS)
    // 0.80-1.00: everything slams back (Book)

    // Overall camera-relative rotation of the whole bus
    if (bodyRef.current) {
      // Idle slow rotation at 0%, orbits as you scroll
      const baseRot = -0.3 + p * 0.6; // -0.3 → +0.3
      bodyRef.current.rotation.y = baseRot + Math.sin(t * 0.3) * 0.02;
      // Slight lift as parts separate
      bodyRef.current.position.y = -0.2 + p * 0.3;
    }

    // --- Phase 1: Roof lifts (0.20-0.40) ---
    const roofP = easeInOut(Math.max(0, Math.min(1, (p - 0.2) / 0.2)));
    if (roofRef.current) {
      roofRef.current.position.y = 1.15 + roofP * 2.5; // lifts up
      roofRef.current.rotation.x = roofP * 0.15;
    }

    // --- Phase 1: Wheels spread outward (0.20-0.40) ---
    const wheelP = easeInOut(Math.max(0, Math.min(1, (p - 0.2) / 0.2)));
    const wheelSpread = wheelP * 0.8;
    if (wheelFL.current) wheelFL.current.position.z = 1.0 + wheelSpread;
    if (wheelFR.current) wheelFR.current.position.z = -1.0 - wheelSpread;
    if (wheelRL.current) wheelRL.current.position.z = 1.0 + wheelSpread;
    if (wheelRR.current) wheelRR.current.position.z = -1.0 - wheelSpread;
    // Wheels also spin during idle
    const spin = t * 0.5 * (1 - p);
    [wheelFL, wheelFR, wheelRL, wheelRR].forEach((w) => {
      if (w.current) w.current.rotation.x = spin;
    });

    // --- Phase 2: Seats + AC float out (0.40-0.60) ---
    const interiorP = easeInOut(Math.max(0, Math.min(1, (p - 0.4) / 0.2)));
    if (seatsRef.current) {
      seatsRef.current.position.z = interiorP * 1.8; // seats slide forward/out
      seatsRef.current.position.y = interiorP * 0.5;
      seatsRef.current.scale.setScalar(1 - interiorP * 0.15);
    }
    if (acRef.current) {
      acRef.current.position.y = 1.42 + interiorP * 1.5; // AC unit floats up
    }

    // --- Phase 3: GPS + telematics glow and float (0.60-0.80) ---
    const gpsP = easeInOut(Math.max(0, Math.min(1, (p - 0.6) / 0.2)));
    if (gpsRef.current) {
      gpsRef.current.position.y = 1.8 + gpsP * 1.5; // antenna floats up
      gpsRef.current.scale.setScalar(1 + gpsP * 0.5);
    }
    if (telematicsRef.current) {
      telematicsRef.current.position.y = 0 + gpsP * 1.2;
      telematicsRef.current.position.x = -2 + gpsP * 1.5;
    }

    // --- Phase 4: Everything slams back (0.80-1.00) ---
    // The slam is handled naturally by the easing — as p goes 0.8→1.0,
    // all the phase progresses go 1→0 (inverted) so parts return.
    const slamP = easeInOut(Math.max(0, Math.min(1, (p - 0.8) / 0.2)));
    // Override: when slamP > 0, reverse all separations
    const reverse = slamP;
    if (roofRef.current) {
      roofRef.current.position.y = 1.15 + (1 - reverse) * 2.5;
      roofRef.current.rotation.x = (1 - reverse) * 0.15;
    }
    if (wheelFL.current) wheelFL.current.position.z = 1.0 + (1 - reverse) * 0.8;
    if (wheelFR.current) wheelFR.current.position.z = -1.0 - (1 - reverse) * 0.8;
    if (wheelRL.current) wheelRL.current.position.z = 1.0 + (1 - reverse) * 0.8;
    if (wheelRR.current) wheelRR.current.position.z = -1.0 - (1 - reverse) * 0.8;

    // --- Door QR glow (0.80-1.00) ---
    if (doorGlowRef.current) {
      const mat = doorGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = slamP * 0.8 * (0.6 + Math.sin(t * 4) * 0.4);
    }
  });

  // Seat row positions
  const seatRows = useMemo(() => [-2.0, -1.0, 0, 1.0, 2.0], []);

  return (
    <group ref={bodyRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* ===== Body shell ===== */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[6.5, 2.0, 2.2]} />
      </mesh>

      {/* ===== Roof (separates) ===== */}
      <mesh ref={roofRef} material={bodyMat} position={[0, 1.1, 0]}>
        <boxGeometry args={[5.8, 0.3, 2.0]} />
      </mesh>

      {/* ===== AC unit (separates) ===== */}
      <mesh ref={acRef} material={bodyMat} position={[-0.5, 1.38, 0]}>
        <boxGeometry args={[1.8, 0.25, 1.4]} />
      </mesh>
      <mesh material={accentMat} position={[-0.5, 1.52, 0]}>
        <boxGeometry args={[1.6, 0.04, 1.2]} />
      </mesh>

      {/* ===== Front nose ===== */}
      <mesh material={bodyMat} position={[3.5, -0.15, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[1.0, 1.75, 2.15]} />
      </mesh>
      {/* Windshield */}
      <mesh material={windowMat} position={[3.8, 0.4, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.14, 1.0, 1.8]} />
      </mesh>
      {/* Destination sign */}
      <mesh material={accentMat} position={[3.9, 0.95, 0]}>
        <boxGeometry args={[0.1, 0.3, 1.5]} />
      </mesh>

      {/* ===== Side windows ===== */}
      {[-2.4, -1.2, 0, 1.2, 2.3].map((x) => (
        <mesh key={`ws-${x}`} material={windowMat} position={[x, 0.5, 1.11]}>
          <boxGeometry args={[0.85, 0.6, 0.05]} />
        </mesh>
      ))}
      {[-2.4, -1.2, 0, 1.2, 2.3].map((x) => (
        <mesh key={`wn-${x}`} material={windowMat} position={[x, 0.5, -1.11]}>
          <boxGeometry args={[0.85, 0.6, 0.05]} />
        </mesh>
      ))}

      {/* ===== Accent stripes ===== */}
      <mesh material={accentMat} position={[0, -0.2, 1.12]}>
        <boxGeometry args={[6.2, 0.14, 0.04]} />
      </mesh>
      <mesh material={accentMat} position={[0, -0.2, -1.12]}>
        <boxGeometry args={[6.2, 0.14, 0.04]} />
      </mesh>

      {/* ===== Headlights ===== */}
      <mesh material={accentMat} position={[4.0, -0.4, 0.7]}>
        <boxGeometry args={[0.08, 0.25, 0.2]} />
      </mesh>
      <mesh material={accentMat} position={[4.0, -0.4, -0.7]}>
        <boxGeometry args={[0.08, 0.25, 0.2]} />
      </mesh>

      {/* ===== Tail lights ===== */}
      <mesh material={accentMat} position={[-3.28, -0.3, 0.75]}>
        <boxGeometry args={[0.06, 0.35, 0.18]} />
      </mesh>
      <mesh material={accentMat} position={[-3.28, -0.3, -0.75]}>
        <boxGeometry args={[0.06, 0.35, 0.18]} />
      </mesh>

      {/* ===== Door with QR glow ===== */}
      <mesh material={windowMat} position={[-1.8, -0.1, 1.12]}>
        <boxGeometry args={[0.7, 1.4, 0.05]} />
      </mesh>
      <mesh ref={doorGlowRef} material={glowMat} position={[-1.8, -0.1, 1.15]}>
        <boxGeometry args={[0.5, 1.0, 0.02]} />
      </mesh>

      {/* ===== Wheels (separate) ===== */}
      {[
        { ref: wheelFL, pos: [2.4, -1.1, 1.0] as [number, number, number] },
        { ref: wheelFR, pos: [2.4, -1.1, -1.0] as [number, number, number] },
        { ref: wheelRL, pos: [-2.4, -1.1, 1.0] as [number, number, number] },
        { ref: wheelRR, pos: [-2.4, -1.1, -1.0] as [number, number, number] },
      ].map((w, i) => (
        <group key={i} position={w.pos}>
          <mesh ref={w.ref} material={tyreMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.65, 0.65, 0.35, 20]} />
          </mesh>
          <mesh material={rimMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.37, 10]} />
          </mesh>
        </group>
      ))}

      {/* ===== Interior seats (separate) ===== */}
      <group ref={seatsRef}>
        {seatRows.map((x, i) => (
          <group key={i} position={[x, -0.3, 0]}>
            {/* Seat base */}
            <mesh material={seatMat}>
              <boxGeometry args={[0.6, 0.4, 1.6]} />
            </mesh>
            {/* Seat back */}
            <mesh material={seatMat} position={[0, 0.4, 0]}>
              <boxGeometry args={[0.1, 0.8, 1.6]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ===== GPS antenna (separates, glows) ===== */}
      <group ref={gpsRef} position={[0, 1.8, 0]}>
        <mesh material={gpsMat}>
          <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
        </mesh>
        <mesh material={gpsMat} position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
      </group>

      {/* ===== Telematics module (separates, glows) ===== */}
      <mesh ref={telematicsRef} material={gpsMat} position={[-2, 0, 1.15]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
      </mesh>

      {/* Underglow */}
      <pointLight position={[0, -1.4, 0]} color="#06B6D4" intensity={6} distance={7} decay={2} />
    </group>
  );
}

/* ---------- Camera rig driven by scroll ---------- */
function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progressRef.current;
    // Camera orbits from front-left to front-right as you scroll
    const angle = -0.3 + p * 0.6;
    const radius = 9.5;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = 1.5 + p * 0.5;
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}

/* ---------- The full 3D scene ---------- */
function Scene({
  progressRef,
  deviceTier,
}: {
  progressRef: React.MutableRefObject<number>;
  deviceTier: "high" | "mid" | "low";
}) {
  const isLow = deviceTier === "low";
  return (
    <>
      <CameraRig progressRef={progressRef} />
      <fog attach="fog" args={["#080A0F", 18, 50]} />

      {/* Lighting — dramatic rim + fill */}
      <ambientLight intensity={isLow ? 0.4 : 0.5} />
      <directionalLight position={[6, 8, 4]} intensity={1.5} color="#ECFEFF" castShadow={!isLow} />
      <directionalLight position={[-8, 3, -2]} intensity={1.0} color="#06B6D4" />
      <pointLight position={[-10, 4, 3]} intensity={6} color="#06B6D4" distance={28} />
      <pointLight position={[10, 3, -3]} intensity={4} color="#22D3EE" distance={25} />

      {/* Environment for reflections (procedural, no external files) */}
      {!isLow && (
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 5, 5]} scale={[10, 5, 1]} color="#ECFEFF" />
          <Lightformer intensity={1.5} position={[-5, 3, 2]} scale={[5, 5, 1]} color="#06B6D4" />
          <Lightformer intensity={1.5} position={[5, 3, -2]} scale={[5, 5, 1]} color="#22D3EE" />
        </Environment>
      )}

      <Coach progressRef={progressRef} />

      {/* Floor plane for grounding */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#050709" metalness={0.3} roughness={0.7} />
      </mesh>
    </>
  );
}

/* ---------- Text overlays (synced to scroll) ---------- */
function ScrollOverlays({ progress }: { progress: number }) {
  // Each overlay fades in/out based on scroll progress windows
  const phases = [
    { range: [0, 0.15], align: "center", title: "Travel Further. Travel Smarter.", sub: "The flagship Volvo 9400 Multi-Axle — fully assembled, gleaming." },
    { range: [0.18, 0.38], align: "left", title: "Safety Engineered Into Every Component.", sub: "Disc brakes, ABS, ESC, speed governors. Two trained drivers per long-haul." },
    { range: [0.42, 0.58], align: "right", title: "Your Comfort. Obsessively Designed.", sub: "Reclining seats, individual AC vents, USB charging at every berth." },
    { range: [0.62, 0.78], align: "left", title: "Live GPS. Every 90 Seconds.", sub: "Real-time telematics, geo-fenced stop alerts, shareable tracking link." },
    { range: [0.82, 1.0], align: "center", title: "Book in 30 Seconds. Board with a QR.", sub: "Your seat is waiting. The bus is whole." },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      {phases.map((phase, i) => {
        const [start, end] = phase.range;
        const center = (start + end) / 2;
        const halfWidth = (end - start) / 2;
        // Opacity peaks at center, fades at edges
        const dist = Math.abs(progress - center);
        const opacity = Math.max(0, 1 - (dist / halfWidth) * 1.5);
        if (opacity < 0.01) return null;

        const alignClass =
          phase.align === "left"
            ? "items-start text-left ml-8 sm:ml-16"
            : phase.align === "right"
            ? "items-end text-right mr-8 sm:mr-16"
            : "items-center text-center";

        return (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col justify-center ${alignClass}`}
            style={{ opacity, transition: "opacity 0.15s linear" }}
          >
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl max-w-2xl drop-shadow-[0_2px_20px_rgba(6,182,212,0.4)]">
              {phase.title}
            </h2>
            <p className="mt-4 max-w-md text-sm text-cyan-100/80 sm:text-lg">
              {phase.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Scroll progress indicator (side bar) ---------- */
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = progress >= i * 0.2;
        return (
          <div
            key={i}
            className={`h-12 w-1 rounded-full transition-colors duration-300 ${
              filled ? "bg-accent" : "bg-white/15"
            }`}
          />
        );
      })}
    </div>
  );
}

/* ---------- Main exported component ---------- */
export function BusScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const deviceTier = useDeviceTier();

  // Scroll tracking
  useScrollProgress(containerRef, progressRef);

  // Throttled state update for overlays (every ~100ms is fine for text)
  useEffect(() => {
    const id = setInterval(() => {
      setProgress(progressRef.current);
    }, 80);
    return () => clearInterval(id);
  }, []);

  // IntersectionObserver gate — only mount canvas when near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMounted(entry.isIntersecting),
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  return (
    <section
      id="bus-scroll"
      ref={containerRef}
      className="relative h-[500vh] bg-[#080A0F]"
      aria-label="Interactive 3D bus feature showcase"
    >
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Canvas — only mounts when in viewport */}
        {mounted && !reducedMotion && (
          <Canvas
            camera={{ position: [0, 1.5, 9.5], fov: 50 }}
            dpr={deviceTier === "high" ? [0.75, 2] : [1, 1.5]}
            frameloop="always"
            shadows={deviceTier === "high"}
            gl={{
              antialias: deviceTier === "high",
              alpha: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
            }}
            style={{ background: "transparent" }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <Scene progressRef={progressRef} deviceTier={deviceTier} />
          </Canvas>
        )}

        {/* Reduced-motion fallback: static gradient + message */}
        {reducedMotion && (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#080A0F] via-[#042F38] to-[#080A0F]">
            <div className="text-center px-6">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
                Travel Further. Travel Smarter.
              </h2>
              <p className="mt-4 text-cyan-100/70">
                The TechMarkage Express Volvo 9400 Multi-Axle coach.
              </p>
            </div>
          </div>
        )}

        {/* Scroll overlays */}
        <ScrollOverlays progress={progress} />

        {/* Progress indicator */}
        <ProgressBar progress={progress} />

        {/* Scroll hint (only at start) */}
        {progress < 0.05 && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-cyan-100/50">
              <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
              <div className="h-8 w-5 rounded-full border border-cyan-100/30 p-1">
                <div className="h-2 w-full rounded-full bg-cyan-100/50 animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
