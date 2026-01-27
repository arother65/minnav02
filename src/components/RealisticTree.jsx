/** 
 * 
 * 
 * 
 */

// import * as THREE from "three"
import { brown, green } from "@mui/material/colors"


//
export default function RealisticTree({ position }) {
   return (
      <group position={position}>
         {/* 🌲 Trunk */}
         <mesh position={[0, 0.75, 0]} rotation={[0, 0, 0.03]} receiveShadow>
            <cylinderGeometry args={[0.25, 0.35, 1.75, 32]} />
            <meshStandardMaterial
               color={brown[800]}
               roughness={0.9}
               metalness={0}
            />
         </mesh>

         {/* 🍃 Foliage */}
         <mesh position={[0, 2.7, 0]} receiveShadow>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial
               color={green[700]}
               roughness={0.8}
            />
         </mesh>

         <mesh position={[-0.8, 2.3, 0.5]} receiveShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
               color={green[700]}
               roughness={0.85}
            />
         </mesh>

         <mesh position={[0.9, 2.4, -0.4]} receiveShadow>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial
               color={green[700]}
               roughness={0.8}
            />
         </mesh>

         <mesh position={[0, 3.5, 0]} receiveShadow>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
               color={green[700]}
               roughness={0.7}
            />
         </mesh>
      </group>
   )
}  // RealisticTree()
