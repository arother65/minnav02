/**
 * 
 * 
 */

//
import * as THREE from "three"
// import { Instances, Instance } from "@react-three/drei"  // caused errors 

//
const MM = 0.001
const INCH = 0.0254

// const METAL_PRESETS = {
//    zinc: { metalness: 1, roughness: 0.25 },
//    chrome: { metalness: 1, roughness: 0.08 },
//    painted: { metalness: 0.6, roughness: 0.6 }
// }

//
// export function Tyre() {
//    return (
//       <mesh>
//          <latheGeometry args={[tyreProfile, 32]} />
//          <meshStandardMaterial
//             color="#1b1b1b"
//             roughness={0.85}
//             metalness={0.02}
//          />
//       </mesh>
//    )
// }  // Tyre()

//
function tyreFromSpec(spec) {
   const { width, aspect, rim } = spec

   const widthM = width * MM
   const sidewallM = widthM * (aspect / 100)
   const rimRadiusM = (rim * INCH) / 2
   const outerRadiusM = rimRadiusM + sidewallM

   return {
      width: widthM,
      sidewall: sidewallM,
      rimRadius: rimRadiusM,
      outerRadius: outerRadiusM
   }
}

// 
function createTyreProfile({
   width,
   sidewall,
   rimRadius,
   outerRadius,
   bulge = 0.04
}) {
   const halfWidth = width / 2
   const bulgeAmount = sidewall * bulge

   return [
      // Inner bead
      new THREE.Vector2(rimRadius, -halfWidth),

      // Sidewall bulge (inner)
      new THREE.Vector2(
         rimRadius + sidewall * 0.6 + bulgeAmount,
         -halfWidth * 0.6
      ),

      // Shoulder
      new THREE.Vector2(
         outerRadius,
         -halfWidth * 0.2
      ),

      // Tread
      new THREE.Vector2(
         outerRadius,
         halfWidth * 0.2
      ),

      // Sidewall bulge (outer)
      new THREE.Vector2(
         rimRadius + sidewall * 0.6 + bulgeAmount,
         halfWidth * 0.6
      ),

      // Outer bead
      new THREE.Vector2(rimRadius, halfWidth)
   ]
}

//
export function TruckTyre({ spec = "315/80 R22.5", position }) {

   //
   const tyreSpec = {
      width: 425,
      aspect: 85,
      rim: 20
   }
   const dims = tyreFromSpec(tyreSpec)
   const profile = createTyreProfile(dims)

   //
   return (
      <mesh rotation={[Math.PI / 2, 0, 0]} position={position}>
         <latheGeometry args={[profile, 128]} />
         <meshStandardMaterial
            color="black"
            roughness={0.85}
            metalness={0.02}
         />
      </mesh>
   )
}  // TruckTyre()


//* bolt
const ISO_BOLTS = {
   M12: {
      shaft: 12 * MM,
      hex: 19 * MM,
      headHeight: 7.5 * MM,
      length: 32 * MM
   },
   M22: {
      shaft: 22 * MM,
      hex: 33 * MM,
      headHeight: 14 * MM,
      length: 50 * MM
   }
}

function ChamferedHexHead({ hex, height }) {
   return (
      <group>
         {/* top chamfer */}
         <mesh position={[0, height / 2 - 0.001, 0]}>
            <cylinderGeometry args={[hex * 0.92, hex, 0.002, 6]} />
         </mesh>

         {/* main head */}
         <mesh>
            <cylinderGeometry args={[hex, hex, height - 0.004, 6]} />
         </mesh>

         {/* bottom chamfer */}
         <mesh position={[0, -height / 2 + 0.001, 0]}>
            <cylinderGeometry args={[hex, hex * 0.92, 0.002, 6]} />
         </mesh>
      </group>
   )
}

function BoltShaft({ radius, length }) {
   return (
      <mesh position={[0, -length / 2 - 0.003, 0]}>
         <cylinderGeometry args={[radius, radius, length, 16]} />
      </mesh>
   )
}

function ISOBolt({ size = "M22" }) {

   const bolt = ISO_BOLTS[size]

   const METAL_PRESETS = {
      zinc: { metalness: 1, roughness: 0.25 },
      chrome: { metalness: 1, roughness: 0.08 },
      painted: { metalness: 0.6, roughness: 0.6 }
   }

   return (
      <group rotation={[Math.PI / 2, 0, 0]}>
         <mesh position={[0, 0, 0]}>
            <ChamferedHexHead
               hex={bolt.hex / 2}
               height={bolt.headHeight}
            />
            <meshStandardMaterial
               metalness={METAL_PRESETS.chrome.metalness}
               roughness={METAL_PRESETS.chrome.roughness}
               color="blue"  // #b8b8b8
               envMapIntensity={1.2}
            />
         </mesh>
         <mesh position={[0, 0, 0]}>
            <BoltShaft
               radius={bolt.shaft / 2}
               length={bolt.length}
            />
            <meshStandardMaterial
               metalness={METAL_PRESETS.chrome.metalness}
               roughness={METAL_PRESETS.chrome.roughness}
               color="blue"  // #b8b8b8
               envMapIntensity={1.2}
            />
         </mesh>
      </group>

      // <meshStandardMaterial
      //    metalness={METAL_PRESETS.chrome.metalness}
      //    roughness={METAL_PRESETS.chrome.roughness}
      //    color="blue"  // #b8b8b8
      //    envMapIntensity={1.2}
      // />
   )
}

//
export function WheelBolts({ size = "M22", count = 10, radius = 0.28 }) {

   return (

      Array.from({ length: count }).map((_, i) => (

         <instancedMesh>
            <group key={i}
               rotation={[Math.PI / 2, 0, 0]}
               position={
                  [Math.cos((i / count) * Math.PI * 2) * radius,
                     0,
                  Math.sin((i / count) * Math.PI * 2) * radius]
               }>
               <ISOBolt size="M22" />
            </group>
         </instancedMesh>
      ))
   )
}

