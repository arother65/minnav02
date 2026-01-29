/**
 * 
 *  January 2026 
 * 
 */

import * as THREE from 'three'

import { Text } from "@react-three/drei"
import { blue, brown, orange, purple, red, yellow, green } from "@mui/material/colors"

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

const catmullCurve = new THREE.CatmullRomCurve3([
   new THREE.Vector3(2, 0, 0),
   new THREE.Vector3(2, 2, 0),
   new THREE.Vector3(6, 3, 1)
])

/**  new THREE.TubeGeometry(
   path,            // THREE.Curve
   tubularSegments, // number
   radius,          // number
   radialSegments,  // number
   closed           // boolean
   ) */

//
export default function Tube({ position, rotation }) {

   return (
      <mesh position={position} rotation={rotation} receiveShadow>
         <tubeGeometry args={[catmullCurve, 8, 0.15, 8, false]} />
         <meshStandardMaterial color="grey" metalness={0.75} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
   )
}
