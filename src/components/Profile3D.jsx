import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import profilePhoto from '../assets/Web_Photo_Editor.jpg';

function Scene() {
  const groupRef = useRef();
  const texture = useTexture(profilePhoto);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Continuous subtle floating rotation for the whole group
    groupRef.current.rotation.y = Math.sin(t / 4) / 4;
    groupRef.current.rotation.x = Math.cos(t / 4) / 8;
    
    // Smooth mouse parallax
    const targetX = (state.mouse.x * 0.8);
    const targetY = (state.mouse.y * 0.8);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <pointLight position={[-10, 0, -5]} intensity={3} color="#60a5fa" />
      <pointLight position={[10, -10, 5]} intensity={2} color="#e2e8f0" />
      
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={groupRef}>
          {/* Glass Sphere Centerpiece */}
          <mesh>
            <sphereGeometry args={[2.5, 64, 64]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={2}
              roughness={0.05}
              ior={1.4}
              transmission={1}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.3}
              temporalDistortion={0.1}
              color="#ffffff"
            />
          </mesh>

          {/* Solid Core Profile Image */}
          <mesh position={[0, 0, 0]}>
            <circleGeometry args={[1.8, 64]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </Float>

      {/* Floating 3D Particles */}
      <Sparkles count={100} scale={10} size={3} speed={0.4} opacity={0.4} color="#93c5fd" />
    </>
  );
}

export default function Profile3D() {
  return (
    <div className="w-[360px] h-[360px] md:w-[500px] md:h-[500px] relative z-10 mx-auto cursor-pointer group">
      <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-400/20 transition-all duration-700" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
