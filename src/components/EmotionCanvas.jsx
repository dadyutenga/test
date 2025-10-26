import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { SceneContent } from './EmotionScene.jsx';

export default function EmotionCanvas({ variant }) {
  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio, 2);
  }, []);

  return (
    <div className="h-[400px] sm:h-[480px] lg:h-[560px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }} dpr={dpr}>
        <color attach="background" args={[variant === 'regret' ? '#0b1120' : '#0f172a']} />
        <Suspense fallback={null}>
          <SceneContent variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
