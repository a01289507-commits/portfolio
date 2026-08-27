'use client';

import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

export default function HeroShape() {
  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere args={[1, 100, 200]} scale={1.4}>
            <MeshDistortMaterial
              color="#c9a227"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.6}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}