'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* Stylized human torso built from primitives */
function HumanBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={1.1}>
      {/* Head */}
      <Float speed={1} floatIntensity={0.2}>
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#c0d8f0"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.6}
          />
        </mesh>
      </Float>

      {/* Neck */}
      <mesh position={[0, 2.25, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.35, 16]} />
        <meshStandardMaterial color="#b8cfe8" transparent opacity={0.3} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.55, 1.2, 16, 32]} />
        <meshStandardMaterial
          color="#a8c4e0"
          transparent
          opacity={0.2}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* Heart glow core */}
      <Float speed={2} floatIntensity={0.1}>
        <mesh position={[0.1, 1.6, 0.2]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <MeshDistortMaterial
            color="#FF2D55"
            emissive="#FF2D55"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
            distort={0.3}
            speed={3}
          />
        </mesh>
      </Float>

      {/* Heart glow aura */}
      <mesh position={[0.1, 1.6, 0.15]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#FF2D55"
          emissive="#FF2D55"
          emissiveIntensity={0.8}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Chest glow spread */}
      <mesh position={[0, 1.5, 0.1]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#FF4D6D"
          emissive="#FF2D55"
          emissiveIntensity={0.3}
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Left shoulder */}
      <mesh position={[-0.7, 1.95, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#b0c8e0" transparent opacity={0.25} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Right shoulder */}
      <mesh position={[0.7, 1.95, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#b0c8e0" transparent opacity={0.25} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.85, 1.25, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.1, 1.2, 8, 16]} />
        <meshStandardMaterial color="#a0c0d8" transparent opacity={0.18} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.85, 1.25, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.1, 1.2, 8, 16]} />
        <meshStandardMaterial color="#a0c0d8" transparent opacity={0.18} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Ribcage lines - subtle */}
      {[0.15, 0.35, 0.55, 0.75].map((offset, i) => (
        <mesh key={`rib-${i}`} position={[0, 1.85 - offset, 0.3]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.35 + i * 0.04, 0.008, 8, 32, Math.PI]} />
          <meshStandardMaterial
            color="#FF6B8A"
            emissive="#FF2D55"
            emissiveIntensity={0.5}
            transparent
            opacity={0.2 - i * 0.03}
          />
        </mesh>
      ))}

      {/* Spine line */}
      <mesh position={[0, 1.2, -0.35]}>
        <cylinderGeometry args={[0.025, 0.025, 1.8, 8]} />
        <meshStandardMaterial
          color="#88b0d0"
          emissive="#88b0d0"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Vascular particles around the body */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const r = 0.3 + Math.random() * 0.3;
        const y = 0.8 + Math.random() * 1.6;
        return (
          <mesh key={`vessel-${i}`} position={[Math.cos(angle) * r, y, Math.sin(angle) * r * 0.5]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshStandardMaterial
              color="#FF4D6D"
              emissive="#FF2D55"
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* Pulsing glow rings around the body */
function PulseRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.05;
        child.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={ref} position={[0, 0.5, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.005, 8, 64]} />
        <meshStandardMaterial color="#FF2D55" emissive="#FF2D55" emissiveIntensity={1} transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[2.3, 0.004, 8, 64]} />
        <meshStandardMaterial color="#FF6B8A" emissive="#FF6B8A" emissiveIntensity={0.8} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 4, 4]} intensity={1.2} color="#FF2D55" />
        <pointLight position={[-3, 2, 2]} intensity={0.6} color="#6BB8FF" />
        <pointLight position={[0, 1.5, 3]} intensity={0.8} color="#FF4D6D" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} color="#ffffff" />

        <HumanBody />
        <PulseRings />

        <Stars radius={40} depth={60} count={800} factor={2} saturation={0.2} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
