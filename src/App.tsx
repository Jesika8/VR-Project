import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  useGLTF, 
  useProgress, 
  Html 
} from '@react-three/drei';
import { InfoCard } from './components/InfoCard';
import { InterestPoint } from './components/IntrestPoint';
import { Sphere360 } from './components/Sphere360';
import { INTEREST_POINTS } from './data/intrestPointdata';
import { type AppState } from './types/index';
import { useControls, Leva } from 'leva';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-white/90 p-4 rounded-2xl shadow-xl min-w-[120px]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-2"></div>
        <div className="text-gray-600 text-xs font-bold">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
};

const SceneModel = () => {
  const { scene } = useGLTF('/models/scene.glb');
  return <primitive object={scene} scale={5} />;
};

const GroundPlan = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
    <planeGeometry args={[20, 20]} /> 
    <meshStandardMaterial color="#f0f0f0" transparent opacity={0.5} />
  </mesh>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    activePointId: null,
    is360Mode: false,
    current360Image: null
  });

  const { light1Int, light1Pos, light2Int, light2Pos } = useControls('Lighting', {
    light1Int: { value: 4, min: 0, max: 10 },
    light1Pos: { value: [5, 5, 5] },
    light2Int: { value: 4, min: 0, max: 10 },
    light2Pos: { value: [-5, 5, -5] },
  });

  const activePoint = INTEREST_POINTS.find(p => p.id === state.activePointId);

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden font-sans">
      <Leva hidden={true} />

      {/* VIEWPORT AREA */}
      <div className="relative flex-grow h-full order-1">
        
        {/* Persistent Header UI - Hidden in 360 Mode */}
        {!state.is360Mode && (
          <div className="absolute top-4 left-4 z-[110] bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-gray-100 animate-in fade-in duration-300">
            <h1 className="text-sm font-bold text-gray-900 leading-tight">Sunway Virtual Tour Demo</h1>
            <img src="sunwaybanner.png" className='w-40 my-2 object-cover rounded-md' alt="sunway logo" />
            <p className="text-[10px] text-gray-500 font-medium"> Left click drage to move around <br />(i) Click points to see info <br /> Right click drage to move position</p>
          </div>
        )}

        {/* Info Card - Stays at bottom in 360 Mode with transparency */}
        {activePoint && (
          <InfoCard 
            point={activePoint} 
            is360Mode={state.is360Mode}
            onClose={() => setState(s => ({ ...s, activePointId: null }))}
            onView360={() => setState(s => ({ ...s, is360Mode: true, current360Image: activePoint.image360 || null }))}
          />
        )}

        {!state.is360Mode && (
          <Canvas camera={{ position: [8, 5, 8], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={light1Pos} intensity={light1Int} />
            <directionalLight position={light2Pos} intensity={light2Int} />
            <Suspense fallback={<Loader />}>
              <SceneModel />
              <GroundPlan />
              {INTEREST_POINTS.map((point) => (
                <InterestPoint
                  key={point.id}
                  data={point}
                  isActive={state.activePointId === point.id}
                  onClick={() => setState(s => ({ ...s, activePointId: s.activePointId === point.id ? null : point.id }))}
                />
              ))}
            </Suspense>
            <OrbitControls minDistance={3} maxDistance={20} enableDamping />
          </Canvas>
        )}
      </div>

      {/* SIDEBAR */}
      {!state.is360Mode && (
        <div className="w-full md:w-72 h-24 md:h-full bg-white border-t md:border-t-0 md:border-l border-gray-200 z-20 flex flex-col order-2 shadow-2xl">
          <div className="hidden md:block p-6 border-b border-gray-100 font-bold text-gray-800 uppercase tracking-wider text-[10px]">Locations List</div>
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-3 md:p-6 gap-3 no-scrollbar">
            {INTEREST_POINTS.map((point) => (
              <button
                key={point.id}
                onClick={() => setState(s => ({ ...s, activePointId: point.id }))}
                className={`flex-shrink-0 w-36 md:w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all ${
                  state.activePointId === point.id ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-gray-50 border-transparent text-gray-600 active:bg-gray-100'
                }`}
              >
                <p className="font-bold text-[11px] md:text-sm truncate">{point.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 360 View Mode */}
      {state.is360Mode && state.current360Image && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-700">
          <button 
            onClick={() => setState(s => ({ ...s, is360Mode: false }))}
            className="absolute top-4 right-4 z-[140] bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full border border-white/20 active:scale-90 transition-all shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />
            <OrbitControls enableZoom={false} rotateSpeed={-0.4} enableDamping />
            <Suspense fallback={<Loader />}>
              <Sphere360 imagePath={state.current360Image} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default App;