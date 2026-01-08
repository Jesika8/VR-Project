import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export const Sphere360: React.FC<{ imagePath: string }> = ({ imagePath }) => {
  const texture = useTexture(imagePath);
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};