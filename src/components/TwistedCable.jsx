/**
 * 
 * 
 * 
 */

import * as THREE from "three"
import { useMemo } from "react"


//*
function HelixCurve({ radius = 0.15, turns = 8, height = 5, offset = 0 }) {

   return useMemo(() => {
      class Helix extends THREE.Curve {
         getPoint(t) {
            const angle = t * Math.PI * 2 * turns + offset
            return new THREE.Vector3( Math.cos(angle) * radius, t * height, Math.sin(angle) * radius )
         }
      }  // class

      return new Helix()
   }, [radius, turns, height, offset]
   )  // useMemo()
}  // HelixCurve()

//*
export default function TwistedCable({position=[0, 0, 0], rotation=[0, 0, 0], color='lightsteelblue'}) {
   const strands = 1
   const height = 1

   return (
      <group position={position} rotation={rotation}>

         {Array.from({ length: strands }).map((_, i) => {
            const curve = HelixCurve( { offset: (i / strands) * Math.PI * 2, height })

            return (
               <mesh key={i}>
                  <tubeGeometry args={[curve, 512, 0.05, 128, false]} />
                  <meshStandardMaterial
                     color={color}
                     roughness={0.5}
                     metalness={0.95}
                  />
               </mesh>
            )
         })}
      </group>
   )
}
