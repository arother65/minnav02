/**
 * 
 * @param {*} param0 
 * @returns 
 */

//* Imports
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

//* main component
export default function CardBoardBox({ size = [2, 1.5, 2], position }) {

   const texture = useTexture('/textures/cardboard.png')
// D:\Dokumente\ar_workspace\reactproj\react-test\bak\minnav\public\textures

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
