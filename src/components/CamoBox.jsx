/**
 * 
 * @param 
 * @returns 
 */

//* Imports
// import * as THREE from 'three'
import { createNatoCamoTexture } from '../components/NatoCamoPattern'
import { useMemo } from "react"

//* main component
export function CamoBox({ size = [2, 1.5, 2], position = [1, 1, 1], ivColors = []}) {

   //* create texture here: errs 
   // let texture = useTexture(createNatoCamoTexture())
   // texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   // texture.repeat.set(1, 1)

 const camoTexture = useMemo(() => createNatoCamoTexture(ivColors), []);

   return (
      <mesh position={position} castShadow receiveShadow>
         <boxGeometry args={size} />

         <meshStandardMaterial
            color="#c8a165"
            roughness={0.9}
            metalness={0.0}
            map={camoTexture}
         />
      </mesh>
   )
}  // CamoBox.jsx
