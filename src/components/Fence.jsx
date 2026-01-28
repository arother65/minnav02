/**
 * 
 * 
 * 
 */

//*
// import { MeshStandardMaterial } from "three"
import { Instances, Instance } from "@react-three/drei"

import { blue, brown, orange, purple, red, yellow, green } from "@mui/material/colors"


//*
function FencePost({ position, color }) {
   return (
      <mesh position={position}>
         <boxGeometry args={[0.1, 2, 0.1]} />
         <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.3}
         />
      </mesh>
   )
}

//*
export default function Fence({ position = [0, 1, 0], count = 5, color = blue[100] }) {
   return (
      <group position={position}>
         {Array.from({ length: count }).map((_, i) => (
            <FencePost key={i} position={[i * 0.5, 1, 0]} color={color} />
         ))}
      </group>
   )
}  // Fence()


//*
export function GridFence3D({ position = [0, 0, 0], count = 5, spacing = 0.2, color = green[500] }) {
   return (
      <group position={[position]} >
         <Instances >
            <cylinderGeometry args={[0.015, 0.015, 2]} />
            <meshStandardMaterial color={color} metalness={1} roughness={0.25} />

            {Array.from({ length: count }).map((_, i) => (
               <Instance key={i} position={[i * spacing, 1, 0]} />
            ))}
         </Instances>
      </group >
   )
}  // GridFence3D

{/* <planeGeometry position={[0, 1, 0]} args={[20, 10]} /> */}
