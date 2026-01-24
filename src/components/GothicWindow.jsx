/**
 * 
 * 
 * 
 */

import * as THREE from 'three'
import { useMemo } from 'react'


//
export default function GothicWindow({ position, color }) {

   // Function to create the pointed arch geometry
   const createArchShape = () => {
      const shape = new THREE.Shape();

      // Base rectangle
      shape.moveTo(-1, 0);
      shape.lineTo(-1, 2);

      // Pointed arch using quadratic curve
      shape.quadraticCurveTo(0, 3.5, 1, 2);
      shape.lineTo(1, 0);
      shape.lineTo(-1, 0);

      return shape;
   };

   return (
      <mesh position={position}>
         <shapeGeometry args={[createArchShape()]} />

         <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            metalness={0.3}
            roughness={0.7}

         />
      </mesh>
   );
}


//
export function Sheet({ position, color }) {

   let radius = 0

   // -------- OUTER CIRCLE SHAPE --------
   const outerShape = useMemo(() => {
      const shape = new THREE.Shape()
      shape.absarc(0, 0, radius, 0, Math.PI * 2, false)
      return shape
   }, [radius])

   // -------- EXTRUDE SETTINGS --------
   const frameSettings = {
      depth: 0.35,
      bevelEnabled: false,
   }

   // Function to create the pointed arch geometry
   const createArchShape = () => {

      //*                     THREE.Vector2[]
      const shape = new THREE.Shape()

      //* Base rectangle: moveTo(x,y)
      // shape.moveTo(-1, 0);
      // shape.lineTo(-1, 2);

      //* Pointed arch using quadratic curve
      // shape.quadraticCurveTo(1, 1, 0, 0)

      // shape.lineTo(1, 0);
      // shape.lineTo(-1, 0);

      //* Test 
      shape.absarc(0, 0, 2, 0, Math.PI * 2, false)

      return shape
   }  // createArchShape()

   return (
      <mesh position={position}>
         {/* <shapeGeometry args={[createArchShape()]} /> */}

         <extrudeGeometry args={[outerShape, frameSettings]} />

         <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            metalness={0.3}
            roughness={0.7}

         />
      </mesh>
   );
}
