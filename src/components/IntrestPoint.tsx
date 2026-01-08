import { Html } from "@react-three/drei";

import { type InterestPointData } from "../types/index";

export const InterestPoint: React.FC<{ data: InterestPointData; isActive: boolean; onClick: () => void }> = ({ data, isActive, onClick }) => (
  <group position={data.position}>
    <Html center distanceFactor={10} zIndexRange={[0, 10]}>
      <div 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`cursor-pointer transform transition-all duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}
      >
        <div className={`bg-white p-1 rounded-full shadow-lg border-2 ${isActive ? 'border-blue-600 ring-4 ring-blue-100' : 'border-blue-500'} w-9 h-9 flex items-center justify-center overflow-hidden`}>
          <img src="icon info.png" alt="info" className="w-full h-full object-contain" />
        </div>
      </div>
    </Html>
  </group>
);
