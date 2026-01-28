/** 
 * 
 *  RealisticTree.jsx  
 * 
 */

import { brown } from "@mui/material/colors"

//
export default function RealisticTree({ position, baseColor = 'green[900]', map }) {
   return (
      <group position={position}>
         {/* 🌲 Trunk */}
         <mesh position={[0, 0.75, 0]} rotation={[0, 0, 0.03]} receiveShadow>
            <cylinderGeometry args={[0.25, 0.35, 1.75, 32]} />
            <meshStandardMaterial
               color={brown[900]}
               roughness={0.9}
               metalness={0}
               map={map}
            />
         </mesh>

         {/* 🍃 Foliage */}
         <mesh position={[0, 2.7, 0]} receiveShadow>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.8}
               map={map}
            />
         </mesh>

         <mesh position={[-0.8, 2.3, 0.5]} receiveShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.85}
               map={map}
            />
         </mesh>

         <mesh position={[0.9, 2.4, -0.4]} receiveShadow>
            <sphereGeometry args={[0.9, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.8}
               map={map}
            />
         </mesh>

         <mesh position={[0, 3.5, 0]} receiveShadow>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.7}
               map={map}
            />
         </mesh>
      </group>
   )
}  // RealisticTree()

//
export function SmallTree({ position, baseColor = 'green[900]', map }) {
   return (
      <group position={position}>
         {/* 🌲 Trunk */}
         <mesh position={[0, 0.75, 0]} rotation={[0, 0, 0.03]} receiveShadow>
            <cylinderGeometry args={[0.15, 0.25, 1.5, 32]} />
            <meshStandardMaterial
               color={brown[900]}
               roughness={0.9}
               metalness={0}
               map={map}
            />
         </mesh>

         {/* 🍃 Foliage */}
         <mesh position={[0, 2.2, 0]} receiveShadow>
            <sphereGeometry args={[0.75, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.95}
               map={map}
            />
         </mesh>

         <mesh position={[-0.7, 2.3, 0.5]} receiveShadow>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.85}
               map={map}
            />
         </mesh>

         <mesh position={[0.7, 2.4, -0.4]} receiveShadow>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.8}
               map={map}
            />
         </mesh>

         <mesh position={[0, 3.05, 0]} receiveShadow>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.7}
               map={map}
            />
         </mesh>
      </group>
   )
}  // SmallTree()

//
export function Hedge({ position = [1, 0, 1], baseColor = 'green[900]', map }) {
   return (
      <group position={position}>
         {/* 🌲 Trunk */}
         <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0.03]} receiveShadow>
            <cylinderGeometry args={[0.05, 0.15, 0.5, 32]} />
            <meshStandardMaterial
               color={brown[900]}
               roughness={0.9}
               metalness={0}
               map={map}
            />
         </mesh>

         {/* 🍃 Foliage */}
         <mesh position={[0, 0.5, 0]} receiveShadow>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.95}
               map={map}
            />
         </mesh>

         <mesh position={[-0.25, 0.5, 0.05]} receiveShadow>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.85}
               map={map}
            />
         </mesh>
         <mesh position={[0.25, 0.5, 0.05]} receiveShadow>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.8}
               map={map}
            />
         </mesh>
         <mesh position={[-0.1, 0.5, +0.25]} receiveShadow>
            <sphereGeometry args={[0.145, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.85}
               map={map}
            />
         </mesh>
         <mesh position={[0.1, 0.5, -0.25]} receiveShadow>
            <sphereGeometry args={[0.145, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.8}
               map={map}
            />
         </mesh>

         <mesh position={[0, 0.75, 0]} receiveShadow>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial
               color={baseColor}
               roughness={0.7}
               map={map}
            />
         </mesh>
      </group>
   )
}  // Hedge()
