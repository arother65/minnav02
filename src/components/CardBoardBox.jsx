/**
 * 
 *
 * 
 */

//* Imports
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

//* main component
export default function CardBoardBox({ size = [2, 1.5, 2], position }) {

   // create texture here
   let texture = useTexture('/textures/cardboard.png')

   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   texture.repeat.set(1, 1)

   return (
      <mesh position={position} castShadow receiveShadow>
         <boxGeometry args={size} />
         <meshStandardMaterial
            color="#c8a165"
            roughness={0.9}
            metalness={0.0}
            map={texture}
         />
      </mesh>
   )
}
