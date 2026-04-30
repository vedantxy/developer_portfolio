import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

/* ─── Floating wireframe icosahedron core ─── */
function CoreOrb() {
  const outer = useRef();
  const inner = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    outer.current.rotation.x = t * 0.12;
    outer.current.rotation.y = t * 0.18;
    inner.current.rotation.x = -t * 0.2;
    inner.current.rotation.y = t * 0.25;
  });

  return (
    <group>
      {/* Outer icosahedron */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Inner octahedron */}
      <mesh ref={inner}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Orbital torus ring ─── */
function OrbitRing({ radius = 2.5, speed = 0.3, tilt = Math.PI / 4, opacity = 0.15, dotCount = 4 }) {
  const ringRef = useRef();
  const dotsRef = useRef();
  const dotAngles = useMemo(() => Array.from({ length: dotCount }, (_, i) => (i / dotCount) * Math.PI * 2), [dotCount]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ringRef.current.rotation.y = t * speed;
    ringRef.current.rotation.x = tilt;
    if (dotsRef.current) {
      dotsRef.current.rotation.y = t * speed;
      dotsRef.current.rotation.x = tilt;
    }
  });

  return (
    <>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.006, 2, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
      </mesh>
      <group ref={dotsRef}>
        {dotAngles.map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius * Math.sin(tilt), Math.sin(angle) * radius * Math.cos(tilt)]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ─── Sphere particle field ─── */
function StarField({ count = 320 }) {
  const ref = useRef();

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r     = 3.5 + Math.random() * 2.5;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions };
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.025;
  });

  const posAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...posAttr} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ─── Mouse-reactive wrapper ─── */
function MouseTracker({ children }) {
  const groupRef = useRef();
  const mouse = useRef([0, 0]);
  const { size } = useThree();

  useEffect(() => {
    const handler = (e) => {
      mouse.current = [
        (e.clientX / size.width  - 0.5) * 2,
        -(e.clientY / size.height - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [size]);

  useFrame(() => {
    if (!groupRef.current) return;
    const [mx, my] = mouse.current;
    groupRef.current.rotation.y += (mx * 0.18 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (my * 0.09 - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ─── Main exported scene ─── */
function HeroThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#aaaaaa" />

      <MouseTracker>
        <CoreOrb />
        <OrbitRing radius={2.2} speed={0.25}   tilt={Math.PI / 6}   opacity={0.2} dotCount={1} />
        <OrbitRing radius={3.2} speed={-0.15}  tilt={Math.PI / 3}   opacity={0.15} dotCount={2} />
        <OrbitRing radius={1.8} speed={0.4}    tilt={Math.PI / 8}   opacity={0.1} dotCount={3} />
        <StarField count={450} />
      </MouseTracker>
    </Canvas>
  );
}

export default HeroThreeScene;
