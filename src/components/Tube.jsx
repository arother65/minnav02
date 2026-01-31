/**
 * 
 *  January 2026 
 * 
 */

import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { Text } from "@react-three/drei"
import { purple } from "@mui/material/colors"

//* Testparams curves
const arc = 0.15,   // ~ Höhe des Bogens / Biegewinkel
   length = 0.225  //Breite des Bogens / Länge des Rohres

//                      ( StartPoint, ControlPoint, EndPoint )
const curve = new THREE.QuadraticBezierCurve3(
   new THREE.Vector3(-length, 0, 0),  // x, y, z

   //           links?, Biegung, rechts?                     
   new THREE.Vector3(0, arc, 0),  // rotation and bending of the arc

   //
   new THREE.Vector3(1, 0, 0)  // x= Biegung im Raum; y= Biegung in der Vertikalen; z= Streckung in der Horizontalen
)

/**  new THREE.TubeGeometry(
   path,            // THREE.Curve
   tubularSegments, // number
   radius,          // number
   radialSegments,  // number
   closed           // boolean
   ) */

//
export default function Tube({ position, rotation, curve, color = purple[100] }) {

   let texture = useTexture('/textures/rust/speckled-rust_albedo.png')
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   texture.repeat.set(4, 4)

   return (
      <mesh position={position} rotation={rotation} receiveShadow>
         <tubeGeometry args={[curve, 16, 0.15, 16, false]} />
         <meshStandardMaterial 
            color={color} 
            map={texture}
            metalness={0.85} 
            roughness={0.45} 
            side={THREE.DoubleSide} 
            wireframe={false}/>
      </mesh>
   )
}
