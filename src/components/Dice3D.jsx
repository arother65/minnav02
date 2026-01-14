/**
 * 
 */

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
// import * as THREE from "three"
import { RoundedBox } from "@react-three/drei"

const pipPositions = {
   1: [[0, 0]],
   2: [[-0.25, -0.25], [0.25, 0.25]],
   3: [[-0.25, -0.25], [0, 0], [0.25, 0.25]],
   4: [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]],
   5: [[-0.25, -0.25], [0.25, -0.25], [0, 0], [-0.25, 0.25], [0.25, 0.25]],
   6: [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0], [0.25, 0], [-0.25, 0.25], [0.25, 0.25]],
};

function Face({ value, position, rotation }) {
   return (
      <group position={position} rotation={rotation}>
         {pipPositions[value].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.51]}>
               <sphereGeometry args={[0.05, 16, 16]} />
               <meshStandardMaterial color="black" />
            </mesh>
         ))}
      </group>
   );
}

export default function Dice({ rolling = false }) {
   const ref = useRef();

   useFrame(() => {
      if (rolling && ref.current) {
         ref.current.rotation.x += 0.05;
         ref.current.rotation.y += 0.07;
      }
   });

   return (
      <>
         {/* <mesh ref={ref} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="white" />

            {/* Faces */}
            {/* <Face value={1} position={[0, 0, 0.5]} /> */}
            {/* <Face value={6} position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]} /> */}
            {/* <Face value={2} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} /> */}
            {/* <Face value={5} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} /> */}
            {/* <Face value={3} position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} /> */}
            {/* <Face value={4} position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /> */}
         {/* </mesh> */}

         <group ref={ref} castShadow>
            {/* Rounded cube */}
            <RoundedBox
               args={[1, 1, 1]}
               radius={0.12}       // edge roundness
               smoothness={8}      // geometry quality
               castShadow
            >
               <meshStandardMaterial color="#ffffff" />
            </RoundedBox>

            {/* Faces & pips */}
            <Face value={1} rotation={[0, 0, 0]} />
            <Face value={6} rotation={[0, Math.PI, 0]} />
            <Face value={2} rotation={[-Math.PI / 2, 0, 0]} />
            <Face value={5} rotation={[Math.PI / 2, 0, 0]} />
            <Face value={3} rotation={[0, Math.PI / 2, 0]} />
            <Face value={4} rotation={[0, -Math.PI / 2, 0]} />
         </group>
      </>
   );
}
