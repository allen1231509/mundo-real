"use client";

import {
  Environment,
  Float,
  Lightformer,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BRAND = {
  pink: "#e0218a",
  purple: "#8b2fc9",
  orange: "#ff7a1a",
  yellow: "#ffcf1a",
  teal: "#12c2c2",
  green: "#18b56b",
  ink: "#2a2440",
  cream: "#fffdf8",
} as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Procedural conic-gradient texture for the palette disc — no external assets. */
function usePaletteTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const cx = size / 2;
    const cy = size / 2;
    const stops: Array<[number, string]> = [
      [0, BRAND.pink],
      [1 / 6, BRAND.purple],
      [2 / 6, BRAND.teal],
      [3 / 6, BRAND.green],
      [4 / 6, BRAND.yellow],
      [5 / 6, BRAND.orange],
      [1, BRAND.pink],
    ];
    if (typeof ctx.createConicGradient === "function") {
      const grad = ctx.createConicGradient(-Math.PI / 2, cx, cy);
      for (const [offset, color] of stops) grad.addColorStop(offset, color);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    } else {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
      for (const [offset, color] of stops) grad.addColorStop(offset, color);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const glow = ctx.createRadialGradient(
      cx,
      cy,
      size * 0.04,
      cx,
      cy,
      size * 0.48,
    );
    glow.addColorStop(0, "rgba(255,253,248,0.85)");
    glow.addColorStop(0.4, "rgba(255,253,248,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/** Soft radial blur behind the composition to ground it against the page background. */
function useShadowBlobTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    grad.addColorStop(0, "rgba(42,36,64,0.38)");
    grad.addColorStop(0.6, "rgba(42,36,64,0.14)");
    grad.addColorStop(1, "rgba(42,36,64,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

function StudioEnvironment() {
  return (
    <Environment resolution={512}>
      <group rotation={[-Math.PI / 3, 0.2, 1]}>
        <Lightformer
          form="ring"
          intensity={2.6}
          color={BRAND.cream}
          position={[0, 4, -6]}
          scale={12}
        />
        <Lightformer
          form="circle"
          intensity={1.6}
          color={BRAND.pink}
          rotation-y={Math.PI / 2}
          position={[-7, 1, -1]}
          scale={9}
        />
        <Lightformer
          form="circle"
          intensity={1.6}
          color={BRAND.teal}
          rotation-y={-Math.PI / 2}
          position={[7, 0, 1]}
          scale={9}
        />
        <Lightformer
          form="ring"
          intensity={2}
          color={BRAND.yellow}
          position={[0, -7, 4]}
          scale={10}
        />
      </group>
    </Environment>
  );
}

function PaletteDisc({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const texture = usePaletteTexture();
  const shadowTexture = useShadowBlobTexture();
  const blobColors = [
    BRAND.pink,
    BRAND.purple,
    BRAND.teal,
    BRAND.green,
    BRAND.yellow,
    BRAND.orange,
  ];

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.18) * 0.22;
    group.current.rotation.x = Math.sin(t * 0.13) * 0.05;
  });

  return (
    <group ref={group}>
      {shadowTexture && (
        <mesh position={[0.15, -0.25, -1.4]}>
          <planeGeometry args={[4.6, 4.6]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
      <mesh position={[0, 0, -0.08]}>
        <circleGeometry args={[1.42, 64]} />
        <meshPhysicalMaterial
          color={BRAND.ink}
          roughness={0.45}
          clearcoat={0.3}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.42, 1.42, 0.16, 96]} />
        <meshPhysicalMaterial
          color={BRAND.ink}
          roughness={0.4}
          clearcoat={0.4}
          envMapIntensity={1}
        />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <circleGeometry args={[1.4, 64]} />
        {texture ? (
          <meshPhysicalMaterial
            map={texture}
            roughness={0.22}
            clearcoat={0.55}
            clearcoatRoughness={0.25}
            envMapIntensity={1.1}
          />
        ) : (
          <meshPhysicalMaterial color={BRAND.purple} roughness={0.3} />
        )}
      </mesh>
      {blobColors.map((color, i) => {
        const angle = (i / blobColors.length) * Math.PI * 2;
        const r = 1.02;
        return (
          <mesh
            key={color}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.22]}
          >
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshPhysicalMaterial
              color={color}
              roughness={0.18}
              clearcoat={0.7}
              clearcoatRoughness={0.35}
              envMapIntensity={1.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Brush({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0, 0.55]}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.055, 0.065, 0.85, 20]} />
        <meshPhysicalMaterial color="#c98a4b" roughness={0.45} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.12, 20]} />
        <meshPhysicalMaterial
          color="#dfe2e6"
          roughness={0.2}
          metalness={1}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.09, 0.3, 20]} />
        <meshPhysicalMaterial color={BRAND.pink} roughness={0.28} clearcoat={0.6} />
      </mesh>
    </group>
  );
}

function Pencil({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0, -0.5]}>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.16, 6]} />
        <meshPhysicalMaterial color={BRAND.pink} roughness={0.35} clearcoat={0.4} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.11, 0.11, 0.85, 6]} />
        <meshPhysicalMaterial color={BRAND.yellow} roughness={0.35} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.11, 0.26, 6]} />
        <meshPhysicalMaterial color="#e8b98a" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <coneGeometry args={[0.04, 0.1, 6]} />
        <meshStandardMaterial color={BRAND.ink} roughness={0.55} />
      </mesh>
    </group>
  );
}

function GemAccent({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} rotation={[0.4, 0.6, 0]}>
      <icosahedronGeometry args={[0.26, 0]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.12}
        clearcoat={0.9}
        clearcoatRoughness={0.15}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function SwirlAccent({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} rotation={[0.6, 0.3, 0]}>
      <torusKnotGeometry args={[0.16, 0.055, 120, 16]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.35}
        clearcoat={0.8}
        envMapIntensity={1.3}
      />
    </mesh>
  );
}

function Crayon({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0, 0.3]}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.72, 24]} />
        <meshPhysicalMaterial color={BRAND.green} roughness={0.35} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <coneGeometry args={[0.12, 0.2, 24]} />
        <meshPhysicalMaterial color={BRAND.green} roughness={0.35} clearcoat={0.4} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <torusGeometry args={[0.122, 0.02, 8, 32]} />
        <meshStandardMaterial color={BRAND.cream} roughness={0.5} />
      </mesh>
    </group>
  );
}

function ThreadSpool({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[1.15, 0.15, 0.25]}>
      <mesh>
        <cylinderGeometry args={[0.09, 0.09, 0.34, 24]} />
        <meshPhysicalMaterial color="#dfc9a3" roughness={0.55} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.13, 0.1, 20, 48]} />
        <meshPhysicalMaterial color={BRAND.yellow} roughness={0.28} clearcoat={0.5} />
      </mesh>
      {[0.185, -0.185].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.035, 32]} />
          <meshPhysicalMaterial color={BRAND.orange} roughness={0.3} clearcoat={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingTool({
  children,
  speed,
  floatIntensity,
  reducedMotion,
}: {
  children: ReactNode;
  speed: number;
  floatIntensity: number;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return <>{children}</>;
  return (
    <Float speed={speed} floatIntensity={floatIntensity} rotationIntensity={0.25}>
      {children}
    </Float>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <StudioEnvironment />

      <PresentationControls
        global
        cursor
        snap
        speed={1.2}
        rotation={[0, 0, 0]}
        polar={[-0.25, 0.25]}
        azimuth={[-0.4, 0.4]}
        damping={0.25}
      >
        <group scale={1.05}>
          <PaletteDisc reducedMotion={reducedMotion} />

          <FloatingTool speed={1.4} floatIntensity={0.8} reducedMotion={reducedMotion}>
            <Brush position={[-1.3, 0.95, 0.55]} />
          </FloatingTool>
          <FloatingTool speed={1.7} floatIntensity={0.75} reducedMotion={reducedMotion}>
            <Pencil position={[1.25, 1.0, 0.5]} />
          </FloatingTool>
          <FloatingTool speed={1.5} floatIntensity={0.85} reducedMotion={reducedMotion}>
            <ThreadSpool position={[1.5, -0.55, 0.5]} />
          </FloatingTool>
          <FloatingTool speed={1.9} floatIntensity={0.8} reducedMotion={reducedMotion}>
            <Crayon position={[0.85, -1.2, 0.45]} />
          </FloatingTool>
          <FloatingTool speed={1.3} floatIntensity={0.7} reducedMotion={reducedMotion}>
            <GemAccent position={[-1.15, -1.1, 0.5]} color={BRAND.purple} />
          </FloatingTool>
          <FloatingTool speed={1.6} floatIntensity={0.8} reducedMotion={reducedMotion}>
            <SwirlAccent position={[-1.5, -0.1, 0.55]} color={BRAND.teal} />
          </FloatingTool>
        </group>
      </PresentationControls>

      {!reducedMotion && (
        <Sparkles count={16} scale={4.2} size={2.2} speed={0.25} opacity={0.5} color={BRAND.cream} />
      )}

      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.85}
            luminanceSmoothing={0.25}
            intensity={0.18}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 30 }}
      gl={{ alpha: true, antialias: true, toneMappingExposure: 1.3 }}
      style={{ touchAction: "pan-y" }}
    >
      <Scene reducedMotion={reducedMotion} />
    </Canvas>
  );
}
