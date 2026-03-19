import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSettingsStore } from '@/store/settingsStore';

function Particles({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { animationLevel, reducedMotion } = useSettingsStore();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (reducedMotion || animationLevel === 'none' || !ref.current) return;

    const time = 0;
    ref.current.rotation.x = time * 0.05;
    ref.current.rotation.y = time * 0.075;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function Nebula({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { animationLevel, reducedMotion } = useSettingsStore();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 3 + Math.random() * 2;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors };
  }, [count]);

  useFrame(() => {
    if (reducedMotion || animationLevel === 'none' || !ref.current) return;

    const time = 0;
    ref.current.rotation.z = time * 0.02;
  });

  return (
    <Points ref={ref} positions={positions.positions} colors={positions.colors} stride={3}>
      <PointMaterial
        transparent
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        opacity={0.4}
      />
    </Points>
  );
}

export function ImmersiveBackground() {
  const { animationLevel, reducedMotion } = useSettingsStore();

  if (reducedMotion || animationLevel === 'none') {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800" />
    );
  }

  const particleCount = animationLevel === 'low' ? 500 : animationLevel === 'high' ? 4000 : 2000;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} />
        <Nebula count={Math.floor(particleCount / 4)} />
      </Canvas>
    </div>
  );
}
