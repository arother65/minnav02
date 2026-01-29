/**
 * 
 * 
 * 
 */

//* Imports
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { blue, brown, orange, purple, red, yellow, green } from "@mui/material/colors"
import { Environment } from "@react-three/drei"
import { RoundedBoxGeometry, Text } from "@react-three/drei"

//* Globals
// const effects = { color: 'lightsteelblue', metalness: 0.95, roughness: 0.15 }
// const effects = { color: 'white', metalness: 0.95, roughness: 0.15 }

//
export default function TBeam({
   position = [0, 0, 0],
   effects = { color: blue[500], metalness: 0.95, roughness: 0.25 } }) {

   return (
      <group position={position}>
         {/* Top flange */}
         <mesh position={[0, 0.15, 0]} rotation={[0, 0, 1.55]} receiveShadow>
            <boxGeometry args={[0.05, 0.5, 1]} />
            <meshStandardMaterial {...effects} />
         </mesh>

         {/* Vertical stem */}
         <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[0.045, 0.3, 1]} />
            <meshStandardMaterial {...effects} />
         </mesh>

         {/* Lower flange */}
         <mesh position={[0, -0.15, 0]} rotation={[0, 0, 1.55]} receiveShadow>
            <boxGeometry args={[0.05, 0.5, 1]} />
            <meshStandardMaterial {...effects} />
         </mesh>
         <Environment preset="warehouse" />
      </group>
   )
}  // TBeam()

//
export function TBeamRusted({ position = [0, 0, 0], effects = { color: brown[400], metalness: 0.85, roughness: 0.45 } }) {

   // create texture here
   let texture = useTexture('../textures/grimy-metal-albedo.png')
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   texture.repeat.set(1, 1)

   return (
      <group position={position}>
         {/* Top flange */}
         <mesh position={[0, 0.15, 0]} rotation={[0, 0, 1.55]}>
            <boxGeometry args={[0.05, 0.5, 1]} />
            <meshStandardMaterial
               {...effects}
               map={texture} />
         </mesh>

         {/* Vertical stem */}
         <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.045, 0.3, 1]} />
            <meshStandardMaterial
               {...effects}
               map={texture} />
         </mesh>

         {/* Lower flange */}
         <mesh position={[0, -0.15, 0]} rotation={[0, 0, 1.55]}>
            <boxGeometry args={[0.05, 0.5, 1]} />
            <meshStandardMaterial
               {...effects}
               map={texture} />
         </mesh>
      </group>
   )
}  // TBeamRusted()

export function TBeamRusted2({ position = [0, 0, 0], effects = { color: orange[900], metalness: 0.85, roughness: 0.45 } }) {

   // create texture here
   const textures = useTexture({
      // map: "/textures/grimy-metal-albedo.png",
      normalMap: "/textures/rust/speckled-rust_normal.png",
      roughnessMap: "/textures/rust/speckled-rust_roughness.png",
      // metalnessMap: "/textures/rust/speckled-rust_albedo.png",
      // aoMap: "/textures/rust/speckled-rust_ao.png", // optional
   })
   // Make textures tile nicely
   Object.values(textures).forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(2, 2)
   })

   //
   return (
      <group position={position}>
         {/* Top flange */}
         <mesh position={[0, 0.15, 0]} rotation={[0, 0, 1.55]}>
            <boxGeometry args={[0.05, 0.5, 1]} />
            <meshStandardMaterial
               {...effects}
               {...textures} />
         </mesh>

         {/* Vertical stem */}
         <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.045, 0.3, 1]} />
            <meshStandardMaterial
               {...effects}
               {...textures} />
         </mesh>

         {/* Lower flange */}
         <mesh position={[0, -0.15, 0]} rotation={[0, 0, 1.55]}>
            <boxGeometry args={[0.05, 0.5, 1]} />
            <meshStandardMaterial
               {...effects}
               {...textures} />
         </mesh>
      </group>
   )
}  // TBeamRusted2()

export function TBeam3({
   position = [0, 0, 0],
   rotation = [0, 0, 0],
   length = 1,
   // effects = { color: blue[500], metalness: 0.95, roughness: 0.25 } 
   effects
}) 
   
   {

   return (
      <group position={position} rotation={rotation}>
         {/* Top flange */}
         <mesh position={[0, 0.15, -0.3]} rotation={[0, 0, 1.6]} receiveShadow>
            <RoundedBoxGeometry args={[0.005, 0.01, 0.25]} />
            <meshStandardMaterial {...effects} />
         </mesh>

         {/* Vertical stem */}
         <mesh position={[0, 0.125, 0.15]} receiveShadow>
            <RoundedBoxGeometry args={[0.045, 0.3, 0.7]} />
            <meshStandardMaterial {...effects} />
         </mesh>

         <mesh position={[0, 0.25, 0.15 ]} rotation={[0, 0, 1.6]} receiveShadow>
            <RoundedBoxGeometry args={[0.005, 0.01, 0.75]} />
            <meshStandardMaterial {...effects} />
         </mesh>

         {/* Lower flange */}
         <mesh position={[0, 0, 0]} rotation={[0, 0, 1.55]} receiveShadow>
            <RoundedBoxGeometry args={[0.05, 0.5, length]} />
            <meshStandardMaterial {...effects} />
         </mesh>
         {/* <Environment preset="warehouse" /> */}
      </group>
   )
}  // TBeam3()