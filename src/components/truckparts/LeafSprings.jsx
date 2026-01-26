/**
 * 
 *  January 2026
 * 
 */

import * as THREE from 'three'

//
export default function LeafSpringMesh({
   length = 0.75,
   arc = 0.25,
   count = 3,
   position = [0, 0.35, 0],
   rotation = [0, 0, 0]
}) {

   const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-length / 2, 0, 0),
      new THREE.Vector3(0, arc, 0),
      new THREE.Vector3(length / 2, 0, 0)
   )

   return (
      <group position={position} rotation={rotation}>
         
         {Array.from({ length: count }).map((_, i) => (
            <mesh key={i} position={[0, -i * 0.03, 0]}>

               <tubeGeometry args={[curve, 20, 0.03, 8, false]} />
               <meshStandardMaterial color="#444" metalness={0.85} roughness={0.4} />
            </mesh>
         ))}
      </group>
   )
}  // LeafSpringMesh()
