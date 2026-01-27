/**
 * 
 * 
 * 
 */

//* Imports
import * as THREE from 'three'
import { RoundedBox, RoundedBoxGeometry, Text } from '@react-three/drei'
import { blue, orange, purple, red, yellow, green } from "@mui/material/colors"

//* Imports customer components
import { CamoBox } from './CamoBox'
import LeafSpringMesh from './truckparts/LeafSprings'

//* Local declarations
const shape = new THREE.Shape()
shape.moveTo(0, 0)
shape.lineTo(0.25, 0.001)
shape.lineTo(0.25, 0.001)
shape.closePath()

const shapeAbsellipse = new THREE.Shape()  //! creates a big pie
shapeAbsellipse.moveTo(0, 0)
shapeAbsellipse.absellipse(0.25, 0.25, 0.1, 0.1, 0, 10, true)
shapeAbsellipse.closePath()

const rimProfile = [
   [0.1, 0],
   [0.28, 0.05],
   [0.32, 0.15],
   [0.35, 0.5],
   [0.32, 0.85],
   [0.28, 0.95],
   [0.1, 1]
].map(([x, y]) => new THREE.Vector2(x, y))

const rimProfileSM = [
   [0.2, 0.15],
   [0.32, 0.15],


   [0.32, 0.6],  //? Aussenradius
   [0.2, 0.15]
].map(([x, y]) => new THREE.Vector2(x, y))


/** ------------------------------------------------------------------------ */
//   local functions 
/** ------------------------------------------------------------------------ */
function MetalRod({ args, position, rotation, color }) {
   return (
      <mesh position={position} rotation={rotation}>
         <RoundedBox
            args={args}   // width, height, depth
            radius={0.15}         // corner radius
            smoothness={64}        // segments
         >
            <meshStandardMaterial
               color={color}
               metalness={1}
               roughness={0.45}
               envMapIntensity={0.75}
            />
         </RoundedBox>
      </mesh>
   )
}  // MetalRod()

/** ------------------------------------------------------------------------ */
//   wheel components
/** ------------------------------------------------------------------------ */
function WheelGlossyRim({ position = [1, 0, 0], rotation = [0, 0, 0], rimColor = 'red' }) {

   return (
      <group position={position} rotation={rotation}>
         {/** rim */}
         <mesh position={[3, 0.375, 5.5]} rotation={[Math.PI / 2, 0, 1.55]}>
            <latheGeometry args={[rimProfileSM, 32]} />
            <meshStandardMaterial
               metalness={1}
               roughness={0.35}
               envMapIntensity={0.5}
               color={rimColor}
            />
         </mesh>
         {/* tyre */}
         <mesh position={[2.65, 0.4, 5.5]} rotation={[0.2, 1.55, 0]} >
            <torusGeometry args={[0.3, 0.2, 40, 32]} />
            <meshStandardMaterial color={"black"} metalness={0.1} roughness={0.25} />
         </mesh>
      </group>
   )  // return()
}  // WheelGlossyRim


function WheelWithRim({ groupPosition = [0, 2, 0], groupRotation = [0, 0, 0], rimRadius = 0.25, rimTube = 0.15 }) {

   return (
      // <group position={[0.7, -0.35, 0.65]}>
      <group position={groupPosition} rotation={groupRotation}>

         {/* Tyre, plastic look */}
         <mesh position={[0, 0, 1]} rotation={[0.25, 1.5, 0]} >
            <torusGeometry args={[rimRadius, rimTube, 128, 256]} />
            <meshStandardMaterial color="#555" metalness={0.7} roughness={0.25} />
         </mesh>

         {/* Rim, outer part */}
         <mesh position={[0.155, 0, 1]} rotation={[0.25, 1.5, 0.35]}>
            <ringGeometry args={[0.125, 0.225, 32, 32]} />
            <meshStandardMaterial color="white" metalness={0.1} roughness={0.5} />
         </mesh>
      </group>
   )  // return()
}  // WheelWithRim()

//* Car component 
export function ToyCar({ groupPosition, groupRotation = [0, 0, 0], bodyColor, chassisType }) {

   return (
      <group position={groupPosition} rotation={groupRotation}>

         {/* Chassis, front, cabin */}
         <mesh castShadow receiveShadow >
            <directionalLight
               position={[0, 5, 0]}
               intensity={8}
               target-position={[0, 0, 0]} />

            {chassisType === 'box' &&
               <boxGeometry args={[1, 0.5, 5]} >
                  <meshStandardMaterial color={bodyColor}
                     metalness={1}
                     roughness={0.55}
                     envMapIntensity={0.45}
                  />
               </boxGeometry>
            }

            {/* Chassis using RoundedBox */}
            {chassisType === 'rounded' &&
               <RoundedBox
                  args={[1, 1, 2]}   // width, height, depth
                  position={[0, 0, 1.5]}
                  radius={0.35}         // corner radius
                  smoothness={32}        // segments
               >
                  <meshStandardMaterial color={bodyColor}
                     metalness={1}
                     roughness={0.55}
                     envMapIntensity={0.45}
                  />
               </RoundedBox>
            }

            {/* Front axle, driver's side */}
            <WheelWithRim groupPosition={[0.7, -0.35, 0.65]} />
            {/* Front axle, front, passenger's side */}
            <WheelWithRim groupPosition={[-0.7, -0.35, 0.65]} groupRotation={[0, 0, 3.15]} />

            {/* Headlight passenger's side */}
            <mesh value={1} position={[-0.3, 0.25, 2.45]} rotation={[0, 0, 0]}>
               <ringGeometry args={[0.05, 0.1, 32, 32]} />
               <meshStandardMaterial color="grey" transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>

            {/* Headlight driver's side */}
            <mesh value={1} position={[0.3, 0.25, 2.45]} rotation={[0, 0, 0]}>
               <ringGeometry args={[0.05, 0.1, 32, 32]} />
               <meshStandardMaterial color="grey" transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>

            {/** Blinker, Fahrerseite */}
            <mesh position={[0.5, 0, 2.4]} rotation={[0, 0, 1.35]} receiveShadow>
               <extrudeGeometry args={[shapeAbsellipse,
                  { depth: 0.05, steps: 12, bevelEnabled: false }]}
               />
               <meshStandardMaterial color="orange" metalness={0.5} roughness={0.25} transparent opacity={0.55} />
            </mesh>

            {/** Blinker, Beifahrerseite */}
            <mesh position={[-0.5, 0, 2.45]} rotation={[0, 3.15, 1.35]} receiveShadow>
               <extrudeGeometry args={[shapeAbsellipse,
                  { depth: 0.05, steps: 12, bevelEnabled: false }]}
               />
               <meshStandardMaterial color="orange" metalness={0.5} roughness={0.25} transparent opacity={0.55} />
            </mesh>

            {/* front bumper */}
            <mesh position={[0, -0.15, 2.5]} rotation={[1.15, 0, 1.59]}>
               {/* Cylinder is vertical on Y axis */}
               <cylinderGeometry args={[0.1, 0.1, 1.25, 32]} />
               <meshStandardMaterial color={'orange'}
                  metalness={1}
                  roughness={0.35}
                  normalScale={[1, 1]} // directional brushing
                  envMapIntensity={1} />
            </mesh>
            {/* Number plate */}
            <CamoBox position={[0, 0, 2.55]} size={[0.5, 0.25, 0.005]} ivColors={[orange[200], orange[600], orange[900]]} />

            {/* exhaust pipe */}
            <mesh position={[0.3, 0.95, 1.015]} receiveShadow>
               {/* Cylinder is vertical on Y axis */}
               <cylinderGeometry args={[0.05, 0.05, 1, 64]} />
               <meshStandardMaterial color={'white'}
                  metalness={1}
                  roughness={0.55}
                  envMapIntensity={0.5} />
            </mesh>
         </mesh>

         {/* Cabin */}
         <mesh position={[0, 0.65, 1.5]} receiveShadow>
            <boxGeometry args={[1, 0.65, 0.75]} />
            <meshStandardMaterial color={red[800]} metalness={1} roughness={0.55} envMapIntensity={0.45} />

            {/** Scheibe, frontseite, Glas */}
            <mesh position={[-0.125, 0.07, 0.4]} rotation={[1.5, 0, 0]} receiveShadow>
               <extrudeGeometry args={[shape,
                  { depth: 0.001, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 16 }]}
               />
               <meshStandardMaterial color="white" metalness={0.5} roughness={0.25} transparent opacity={0.5} />
            </mesh>
            {/** Rückscheibe */}
            <mesh position={[-0.125, 0.06, -0.39]} rotation={[1.5, 0, 0]} receiveShadow>
               <extrudeGeometry args={[shape,
                  { depth: 0.001, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 16 }]}
               />
               <meshStandardMaterial color="white" metalness={0.5} roughness={0.25} transparent opacity={0.5} />
            </mesh>

            {/** bulbs on the cabin's roof top  */}
            <mesh position={[0.4, 0.35, -0.25]} rotation={[1.5, 0, 0]}>
               { /** width, height, depth, segments, radius */}
               <RoundedBoxGeometry args={[0.15, 0.1, 0.1, 8, 1]} />

               <meshStandardMaterial color="orange"
                  metalness={0}
                  roughness={0.5}
                  envMapIntensity={0.45}
                  transparent
                  opacity={0.75} />
            </mesh>
            <mesh position={[-0.4, 0.35, -0.25]} rotation={[1.5, 0, 0]}>
               { /** width, height, depth, segments, radius */}
               <RoundedBoxGeometry args={[0.15, 0.1, 0.1, 8, 1]} />

               <meshStandardMaterial color="orange"
                  metalness={0}
                  roughness={0.5}
                  envMapIntensity={0.45}
                  transparent
                  opacity={0.75} />
            </mesh>

            {/** Group for the shunshield */}
            <group position={[0, -0.765, -1.5]}>
               {/** mount for green sunshield */}
               <mesh position={[0, 1.15, 1.90]} rotation={[1.5, 0, 0]}>
                  { /** width, height, depth, segments, radius */}
                  <RoundedBoxGeometry args={[0.75, 0.125, 0.2, 16, 0.5]} />

                  <meshStandardMaterial color="white"
                     metalness={0}
                     roughness={0.55}
                     envMapIntensity={0.45}
                     transparent
                     opacity={0.95} />
               </mesh>
               {/* Cabin sunshield on roof of the cabin */}
               <mesh position={[0, 1.05, 2]} rotation={[0.25, 0, 0]}>
                  <boxGeometry args={[1, 0.025, 0.25]} />
                  <meshStandardMaterial color="green"
                     metalness={1}
                     roughness={0.55}
                     envMapIntensity={0.45}
                     transparent
                     opacity={0.5} />
               </mesh>
            </group>


         </mesh> {/** end Cabin */}

         {/** Frame / rear chassis */}
         <group>
            {/** Frame / rear chassis, driver's side */}
            <MetalRod position={[0.7, 0, -0.85]} rotation={[0, 0, 0]} args={[0.15, 0.1, 3]} color={'red'} />

            {/** connecting rods non-lateral */}
            <MetalRod position={[0, 0, 0.55]} rotation={[0, 1.575, 0]} args={[0.15, 0.1, 1.5]} color={'grey'} />
            <MetalRod position={[0, 0, 0]} rotation={[0, 1.575, 0]} args={[0.15, 0.1, 1.5]} color={'grey'} />

            <MetalRod position={[0, 0, -1]} rotation={[0, 1.575, 0]} args={[0.15, 0.1, 1.5]} color={'grey'} />
            <MetalRod position={[0, 0, -2.25]} rotation={[0, 1.575, 0]} args={[0.15, 0.1, 1.5]} color={'grey'} />

            {/** Frame / rear chassis, passenger's side */}
            <MetalRod position={[-0.7, 0, -0.85]} rotation={[0, 0, 0]} args={[0.15, 0.1, 3]} color={'red'} />

            {/** chassis, rear frame, cargo area */}
            <RoundedBox
               args={[2.25, 0.1, 3.5]}   // width, height, depth
               position={[0, 0.15, -1.1]}
               radius={0.05}         // corner radius
               smoothness={8}        // segments
            >
               <meshStandardMaterial color={bodyColor} metalness={1} roughness={0.55} envMapIntensity={0.45} />
            </RoundedBox>

            {/* fuel tanks, driver's side */}
            <mesh position={[1, 0, -0.25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
               <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
               <meshStandardMaterial color={blue[500]}
                  metalness={0.95}
                  roughness={0.5}
               // envMapIntensity={0.5}
               />
            </mesh>
            <mesh position={[1, 0, -0.85]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
               <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
               <meshStandardMaterial color={blue[700]}
                  metalness={0.95}
                  roughness={0.55}
                  envMapIntensity={0.5}
               />
            </mesh>
            {/* fuel tanks, passenger's side */}
            <mesh position={[-1, 0, -0.85]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
               <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
               <meshStandardMaterial color={blue[700]} />
            </mesh>
            <mesh position={[-1, 0, -0.25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
               <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
               <meshStandardMaterial color={blue[700]} />
            </mesh>

            {/** side wall, driver's side */}
            <RoundedBox
               args={[1, 0.05, 3.5]}   // width, height, depth
               position={[1, 0.5, -1.1]}
               rotation={[0, 0, 1.55]}
               radius={0.025}         // corner radius
               smoothness={8}        // segments
            >
               <meshStandardMaterial color={red[300]} metalness={1} roughness={0.45} envMapIntensity={0.15} />
            </RoundedBox>

            {/** side wall, passenger's side */}
            <RoundedBox
               args={[1, 0.05, 3.5]}   // width, height, depth
               position={[-1, 0.5, -1.1]}
               rotation={[0, 0, 1.55]}
               radius={0.025}         // corner radius
               smoothness={8}        // segments
            >
               <meshStandardMaterial color={red[300]} metalness={1} roughness={0.45} envMapIntensity={0.15} />
            </RoundedBox>

            {/** Rear Axle, wheels with axle */}
            <mesh>
               <WheelGlossyRim position={[-1.25, -0.65, -7.5]} rimColor={blue[500]} />
               {/* axis, rear */}
               <mesh position={[0.05, -0.25, -2]} rotation={[1.5, 0, 1.55]}>
                  <cylinderGeometry args={[0.15, 0.15, 3.25, 16]} />
                  <meshStandardMaterial
                     metalness={1}
                     roughness={0.35}
                     // normalScale={[1, 1]} // directional brushing
                     envMapIntensity={1}
                     color={'darkgrey'} />
               </mesh>
               {/** hard tyres, glossy, passenger's side */}
               <WheelGlossyRim position={[1.35, 0, -7.5]} rotation={[0, 0, 3.095]} rimColor={blue[500]} />

               <LeafSpringMesh position={[0.8, 0, -2.15]} rotation={[0, 1.5, 3.15]} />
               <LeafSpringMesh position={[-0.8, 0, -2.15]} rotation={[0, 1.5, 3.15]} />
            </mesh>

            {/* rear bumper */}
            <mesh position={[0, 0.075, -2.85]} rotation={[1.15, 0, 1.59]}>
               {/* Cylinder is vertical on Y axis */}
               <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
               <meshStandardMaterial color={orange[500]}
                  metalness={1}
                  roughness={0.35}
                  normalScale={[1, 1]} // directional brushing
                  envMapIntensity={0.75} />
            </mesh>

            {/* backlight driver's side */}
            <group position={[0, 0, 0]}>
               <mesh position={[0.825, 0.1, -2.95]} rotation={[0.2, 0, 0]}>
                  <ringGeometry args={[0.1, 0.15, 32, 32]} />
                  <meshStandardMaterial color="red" side={THREE.DoubleSide} />
               </mesh>
               {/* backlight driver's side */}
               <mesh position={[0.825, 0.1, -2.95]} rotation={[0.2, 0, 0]}>
                  <ringGeometry args={[0.05, 0.1, 32, 32]} />
                  <meshStandardMaterial color="white" side={THREE.DoubleSide} />
               </mesh>
            </group>
            {/* backlight passenger's side */}
            <group position={[0, 0, 0]}>
               <mesh position={[-0.825, 0.1, -2.99]} rotation={[0.2, 0, 0]}>
                  <ringGeometry args={[0.1, 0.15, 32, 32]} />
                  <meshStandardMaterial color="red" side={THREE.DoubleSide} />
               </mesh>
               {/* backlight driver's side */}
               <mesh position={[-0.825, 0.1, -2.99]} rotation={[0.2, 0, 0]}>
                  <ringGeometry args={[0.05, 0.1, 32, 32]} />
                  <meshStandardMaterial color="white" side={THREE.DoubleSide} />
               </mesh>
            </group>
         </group> {/** Frame, rear chassis */}
      </group >
   )
}  // Car()
