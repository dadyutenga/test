import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const heartCurve = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0.5, 0.5),
  new THREE.Vector3(0.5, 0.8, 0),
  new THREE.Vector3(0, 1, 0)
);

function Heart({ color, position, scale = 1, pulse = 0.15, delay = 0 }) {
  const mesh = useRef();
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0,
      y = 0;
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.2, y + 1.4, x + 0.5, y + 1.7);
    shape.bezierCurveTo(x + 1.2, y + 1.4, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    const geometry = new THREE.ShapeGeometry(shape, 32);
    geometry.center();
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    const s = scale + Math.sin(t * 2) * pulse;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.6;
      mesh.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      mesh.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={mesh} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={new THREE.Color(color).multiplyScalar(0.6)}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  );
}

function MemoryStream({ color }) {
  const group = useRef();
  const lines = useMemo(() => {
    const pts = Array.from({ length: 50 }, (_, i) => {
      const t = i / 50;
      const point = heartCurve.getPoint(t);
      return new THREE.Vector3(point.x * 3 - 1.5, point.y * 2 - 1, Math.sin(t * Math.PI) * 0.4);
    });
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.4;
      group.current.rotation.x = Math.cos(t * 0.18) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <line key={idx} rotation={[0, (Math.PI * 2 * idx) / 6, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={lines.length}
              array={new Float32Array(lines.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} linewidth={1} />
        </line>
      ))}
    </group>
  );
}

function FloatingFragments({ color, count = 60 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 6
        ),
        speed: 0.2 + Math.random() * 0.6,
        scale: 0.1 + Math.random() * 0.3,
      })),
    [count]
  );

  return (
    <group>
      {items.map((item, index) => (
        <Float speed={item.speed} rotationIntensity={0.5} floatIntensity={1.2} key={index}>
          <mesh position={item.position} scale={item.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function SceneContent({ variant }) {
  const variants = {
    love: {
      ambient: '#f472b6',
      accent: '#fbcfe8',
      sparkles: '#f9a8d4',
    },
    regret: {
      ambient: '#38bdf8',
      accent: '#bae6fd',
      sparkles: '#0ea5e9',
    },
    forgiveness: {
      ambient: '#a3e635',
      accent: '#facc15',
      sparkles: '#bef264',
    },
  };

  const palette = variants[variant] ?? variants.love;

  return (
    <>
      <ambientLight intensity={0.4} color={palette.ambient} />
      <spotLight
        position={[4, 6, 6]}
        angle={0.6}
        penumbra={0.8}
        color={palette.accent}
        intensity={1.2}
        castShadow
      />
      <Sparkles count={120} speed={0.4} opacity={0.8} color={palette.sparkles} scale={[10, 6, 10]} />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
        <Heart color={palette.accent} position={[0, 0.6, 0]} scale={1.4} />
      </Float>
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
        <Heart color={palette.ambient} position={[-1.8, -0.2, -0.6]} scale={0.9} delay={1.2} />
        <Heart color={palette.ambient} position={[1.7, -0.4, 0.7]} scale={0.9} delay={0.6} />
      </Float>
      <MemoryStream color={palette.accent} />
      <FloatingFragments color={palette.sparkles} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}
