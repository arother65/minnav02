/**
 * 
 * 
 * 
 */

//* Imports
import * as THREE from "three"

// import { useMemo } from "react"

//*
//                    Durchmesser, Anzahl Windungen, ?, ?
// function HelixCurve({ radius = 0.65, turns = 4, height = 0.5, offset = 0.15 }) {

//    return useMemo(() => {

//       class Helix extends THREE.Curve {
//          getPoint(t) {
//             const angle = t * Math.PI * 2 * turns + offset
//             return new THREE.Vector3( Math.cos(angle) * radius, t * height, Math.sin(angle) * radius )
//          }
//       }  // class

//       return new Helix()
//    }, [radius, turns, height, offset]
//    )  // useMemo()
// }  // HelixCurve()

class HelixCurve extends THREE.Curve {

   constructor({ radius, turns, height, offset }) {
      super()
      this.radius = radius
      this.turns = turns
      this.height = height
      this.offset = offset
   }  // Class constructor()

   getPoint(t) {
      const angle = t * Math.PI * 2 * this.turns + this.offset

      return new THREE.Vector3(Math.cos(angle) * this.radius, t * this.height, Math.sin(angle) * this.radius)
   }  // Method getPoint()
}  // class HelixCurve


//* Main Component
export default function MetalSpring({ position = [0, 0, 0], rotation = [0, 0, 0], color = 'lightsteelblue' }) {

   const strands = 1  //? DURCHMESSER der einzelnen Windungen

   return (
      <group position={position} rotation={rotation}>

         {Array.from({ length: strands }).map((_, i) => {

            // const curve = HelixCurve( { offset: (i / strands) * Math.PI * 2, height })
            // let lvOffset = (i / strands) * Math.PI * 2, height 

            const curve = new HelixCurve({
               radius: 0.025,  // DURCHMESSER, außen der gesamten Feder
               turns: 6,  // ANZAHL der Wicklungen
               height: 0.15,  // LÄNGE der zu erzeugenden Feder

               // offset: (i / strands) * Math.PI * 2,
               offset: 0  // verschiebt die Feder in deren Längsachse
            })
            // let curve = oCurve.getPoint(1)  // errs

            // 
            return (
               <mesh key={i}>
                  {/**                      | RenderObj, Durchmesser, ?, ? */}
                  <tubeGeometry args={[curve, 256, 0.0045, 128, false]} />
                  <meshStandardMaterial
                     color={color}
                     metalness={0.85}
                     roughness={0.95}
                     side={2}
                  />
               </mesh>
            )
         })}
      </group>
   )
}
