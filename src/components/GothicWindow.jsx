/**
 * 
 * 
 * 
 */

import * as THREE from 'three'
import { useMemo } from 'react'

//*
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

//*
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

//*
function RadialTracery({ radius, spokes }) {
   return (
      <group position={[0, 0, 0.18]}>
         {Array.from({ length: spokes }).map((_, i) => {
            const angle = (i / spokes) * Math.PI * 2

            return (
               <mesh
                  key={i}
                  rotation={[0, 0, angle]}
                  position={[0, radius / 2, 0]}
               >
                  <boxGeometry args={[0.08, radius, 0.3]} />
                  <meshStandardMaterial color="grey" roughness={0.9} />
               </mesh>
            )
         })}
      </group>
   )
}

function InnerRing({ r }) {
   return (
      <mesh position={[0, 0, 0.16]}>
         <torusGeometry args={[r, 0.06, 12, 48]} />
         <meshStandardMaterial color="grey" roughness={0.85} />
      </mesh>
   )
}


export function RoseWindow({ position = [0, 0, 0], radius = 2, spokes = 12 }) {

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

   return (

      <group position={position}>
         {/* STONE FRAME */}
         <mesh>
            <extrudeGeometry args={[outerShape, frameSettings]} />

            <meshStandardMaterial
               color="black"
               roughness={0.85}
            />
         </mesh>

         {/* STAINED GLASS */}
         <mesh position={[0, 0, 0.02]}>
            <circleGeometry args={[radius - 0.05, 64]} />

            <meshPhysicalMaterial
               color="#8bbcff"
               transmission={0.9}
               transparent
               opacity={0.85}
               roughness={0}
               thickness={0.2}
               emissive="#3355aa"
               emissiveIntensity={0.45}
            />
         </mesh>

         {/* RADIAL TRACERY */}
         <RadialTracery radius={radius} spokes={spokes} />

         {/* INNER RINGS */}
         <InnerRing r={radius * 0.55} />
         <InnerRing r={radius * 0.3} />
      </group>
   )
}

