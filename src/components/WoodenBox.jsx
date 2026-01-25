/**
 * 
 * @param 
 * @returns 
 */

//* Imports
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

//* main component
export default function WoodenBox({ size = [2, 1.5, 2], position }) {

   // 
   const [map, normalMap] = useTexture([
      '/textures/wood_aged_scratched.jpg',
      '/textures/wood_aged_normal.jpg',
   ])
   map.colorSpace = THREE.SRGBColorSpace

   return (
      <mesh position={position} castShadow receiveShadow>
         <boxGeometry args={size} />

         <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            normalScale={[0.6, 0.6]}
            roughness={0.85}
            metalness={0}
         />
      </mesh>
   )
}  // WoodenBox