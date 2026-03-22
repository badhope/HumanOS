import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles() {
  const mesh = useRef<THREE.Points>(null)
  
  const count = 100
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])
  
  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#f97316'),
      new THREE.Color('#06b6d4'),
    ]
    
    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return colors
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        mesh.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5
        mesh.rotation.x = state.clock.elapsedTime * 0.1 + i
        mesh.rotation.y = state.clock.elapsedTime * 0.15 + i
      })
    }
  })

  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI / 2) * 3,
            Math.sin(i * 0.5) * 2,
            -2 - i * 0.5,
          ]}
        >
          <sphereGeometry args={[0.3 + i * 0.1, 32, 32]} />
          <meshBasicMaterial
            color={['#8b5cf6', '#ec4899', '#f97316', '#06b6d4'][i]}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <FloatingParticles />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
