/**
 * 
 */

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { RoundedBox } from "@react-three/drei"
// import { RigidBody } from "@react-three/rapier"

//
const pipPositions = {
   1: [[0, 0]],
   2: [[-0.25, -0.25], [0.25, 0.25]],
   3: [[-0.25, -0.25], [0, 0], [0.25, 0.25]],
   4: [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]],
   5: [[-0.25, -0.25], [0.25, -0.25], [0, 0], [-0.25, 0.25], [0.25, 0.25]],
   6: [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0], [0.25, 0], [-0.25, 0.25], [0.25, 0.25]],
}

function Face({ value, position, rotation }) {
   return (
      <group position={position} rotation={rotation}>
         {pipPositions[value].map(([x, y], i) => (

            <mesh key={i} position={[x, y, 0.51]}>
               {/* <sphereGeometry args={[0.05, 16, 16]} /> */}

               <circleGeometry args={[.05, 32]} />
               <meshStandardMaterial color="darkred" />
            </mesh>
         ))}
      </group>
   )
}

// const's for readDiceValue()
const FACE_NORMALS = [
   { value: 1, normal: new THREE.Vector3(0, 0, 1) },   // front
   { value: 6, normal: new THREE.Vector3(0, 0, -1) },  // back
   { value: 2, normal: new THREE.Vector3(0, 1, 0) },   // top
   { value: 5, normal: new THREE.Vector3(0, -1, 0) },  // bottom
   { value: 3, normal: new THREE.Vector3(1, 0, 0) },   // right
   { value: 4, normal: new THREE.Vector3(-1, 0, 0) },  // left
];

const WORLD_UP = new THREE.Vector3(0, 1, 0);

function readDiceValue(quaternion) {
   let bestDot = -Infinity;
   let result = null;

   for (const face of FACE_NORMALS) {
      const worldNormal = face.normal
         .clone()
         .applyQuaternion(quaternion);

      const dot = worldNormal.dot(WORLD_UP);

      if (dot > bestDot) {
         bestDot = dot;
         result = face.value;
      }
   }
   return result;
}  // readDiceValue()

//
export default function Dice({ position, onResult, rolling = false }) {

   const ref = useRef()

   useFrame(() => {
      if (rolling && ref.current) {
         ref.current.rotation.x += 0.05;
         ref.current.rotation.y += 0.07;
      }
   })

   // 
   return (
      <>
         {/* Rounded cube, Faces & pips */}
         <group ref={ref} castShadow>
            <RoundedBox
               args={[1, 1, 1]}    // size of the object
               radius={0.12}       // edge roundness
               smoothness={8}      // geometry quality
               castShadow
            >
               <meshStandardMaterial color="#ffffff" />
            </RoundedBox>

            <Face value={1} rotation={[0, 0, 0]} />
            <Face value={6} rotation={[0, Math.PI, 0]} />
            <Face value={2} rotation={[-Math.PI / 2, 0, 0]} />
            <Face value={5} rotation={[Math.PI / 2, 0, 0]} />
            <Face value={3} rotation={[0, Math.PI / 2, 0]} />
            <Face value={4} rotation={[0, -Math.PI / 2, 0]} />
         </group>
      </>
   )  // return()
}  // Dice()
