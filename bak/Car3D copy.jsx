/**
 * 
 *  Stand: 23.01.2026
 * 
 */

//
import { useMemo } from "react";
// import { useFrame } from "@react-three/fiber" 

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox, RoundedBoxGeometry } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

// customer components
// import WheelBolts from '../components/truckparts/Tyre'  // errs
import CardBoardBox from '../src/components/CardBoardBox'
import WoodenBox from '../src/components/WoodenBox'

// import AirflowArc from '../components/truckparts/Arcs'
// import GothicWindow from '../components/GothicWindow'
// import Sheet from '../components/GothicWindow'
// import RoseWindow from '../components/GothicWindow'
import { NatoCamoPlane } from '../src/components/NatoCamoPattern'
import { CamoBox } from '../src/components/CamoBox'
import { blue, orange, purple, red } from "@mui/material/colors"


// Wheel hubs
function WheelHub({ position }) {
   return (
      <group>
         <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 64]} />
            <meshStandardMaterial color={'white'} />
         </mesh>
      </group >
   )
}  // WheelHub() 

// Wheel component 
function Wheel({ position, color = 'black' }) {
   return (
      <group>
         {/* <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow> */}
         <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.25, 64]}>
            </cylinderGeometry>
            <meshStandardMaterial color={color} />
         </mesh>

         {/* <mesh position={[0, 0, 2]} rotation={[0, 0, 0]} castShadow>
            <ringGeometry args={[1, 1, 32]} />
            <meshStandardMaterial color="blue" />
         </mesh> */}
      </group>
   )
}  // Wheel() 

// Wheel component 
function WheelRear({ position }) {
   return (
      <group>
         <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 64]} />
            <meshStandardMaterial color="black" />
         </mesh>
      </group>
   )
}  // WheelRear() 

// Car component 
function Car({ groupPosition, bodyColor, chassisType }) {

   return (
      <group position={groupPosition}>

         {/* Chassis */}
         <mesh rotation={[0, 0, 0]} castShadow receiveShadow >
            <directionalLight
               position={[0, 5, 0]}
               intensity={8}
               target-position={[0, 0, 0]} />

            {chassisType === 'box' &&
               <boxGeometry args={[1, 0.5, 5]} />
            }
            <meshStandardMaterial color={bodyColor}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.45}
            />

            {/* test using RoundedBox */}
            {chassisType === 'rounded' &&
               <RoundedBox
                  args={[1, 1, 5.05]}   // width, height, depth
                  radius={0.35}         // corner radius
                  smoothness={64}        // segments
               >
                  <meshStandardMaterial color={bodyColor}
                     metalness={1}
                     roughness={0.55}
                     envMapIntensity={0.45}
                  />
               </RoundedBox>
            }
         </mesh>

         {/* Cabin */}
         <mesh position={[0, 0.75, 1.5]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.65, 0.75]} />
            <meshStandardMaterial color="darkred"
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.45} />
         </mesh>

         {/** bulbs on the cabin's roof top  */}
         <mesh position={[0.5, 1.125, 1.25]} rotation={[1.5, 0, 0]}>
            { /** width, height, depth, segments, radius */}
            <RoundedBoxGeometry args={[0.15, 0.1, 0.1, 8, 1]} />

            <meshStandardMaterial color="orange"
               metalness={0}
               roughness={0.5}
               envMapIntensity={0.45}
               transparent
               opacity={0.75} />
         </mesh>
         <mesh position={[-0.5, 1.125, 1.25]} rotation={[1.5, 0, 0]}>
            { /** width, height, depth, segments, radius */}
            <RoundedBoxGeometry args={[0.15, 0.1, 0.1, 8, 1]} />

            <meshStandardMaterial color="orange"
               metalness={0}
               roughness={0.5}
               envMapIntensity={0.45}
               transparent
               opacity={0.75} />
         </mesh>


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

         {/* Cabin front wind screen */}
         <mesh position={[0, 0.85, 1.9]} rotation={[1.5, 0, 0]}>
            <boxGeometry args={[0.65, 0.02, 0.25]} />
            <meshStandardMaterial color="white"
               metalness={0.5}
               roughness={0.55}
               envMapIntensity={0.45}
               transparent
               opacity={0.5} />
         </mesh>


         {/* Wheels */}
         <Wheel position={[-0.65, -0.25, 1.5]} />  {/* front, passenger's side */}

         {/* <Wheel position={[0.65, -0.25, 1.5]} />  front, driver's side */}
         <WheelWithSpokes wheelPosition={[0.55, -0.25, 1.55]} />

         <Wheel position={[-0.65, -0.25, -1.5]} />  {/* back/rear */}

         {/* <Wheel position={[0.65, -0.25, -1.5]}  /> */}
         <WheelRear position={[0.75, -0.25, -1.5]} />

         {/* WheelHubs */}
         {/* <WheelHub position={[-0.74, -0.25, 1.5]} /> */}
         {/* <WheelHub position={[0.74, -0.25, 1.5]} /> */}
         {/* <WheelHub position={[-0.74, -0.25, -1.5]} /> */}
         {/* <WheelHub position={[0.74, -0.25, -1.5]} /> */}

         {/* fuel tanks, driver's side */}
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.65, 0.1, 0.85]} receiveShadow castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
            <meshStandardMaterial color="white"
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5}
            />
         </mesh>
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.65, 0.1, 0.25]} receiveShadow castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
            <meshStandardMaterial color="lightblue"
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5}
            />
         </mesh>

         {/* fuel tanks, passenger's side */}
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.65, 0.1, 0.85]} receiveShadow castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
            <meshStandardMaterial color="lightblue" />
         </mesh>
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.65, 0.1, 0.25]} receiveShadow castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.45, 32]} />
            <meshStandardMaterial color="lightblue" />
         </mesh>

         {/* Headlight passenger's side */}
         <mesh value={1} position={[-0.35, 0.1, 2.54]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.05, 0.1, 64, 64]} />
            <meshStandardMaterial color="darkgrey" transparent opacity={0.75} />
         </mesh>

         {/* Headlight driver's side */}
         <mesh value={1} position={[0.35, 0.1, 2.54]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.05, 0.1, 64, 64]} />
            <meshStandardMaterial color="darkgrey" transparent opacity={0.75} />
         </mesh>

         {/* backlight driver's side */}
         <mesh value={1} position={[0.35, 0.1, -2.55]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.05, 0.1, 64, 64]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* exhaust pipe */}
         <mesh position={[0.3, 0.75, 1.015]} receiveShadow castShadow>
            {/* Cylinder is vertical on Y axis */}
            <cylinderGeometry args={[0.05, 0.05, 1, 64]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
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

      </group >
   )
}  // Car()

function MetalRod({ args, position, rotation, color }) {
   return (
      <mesh position={position} rotation={rotation}>
         <RoundedBox
            args={args}   // width, height, depth
            radius={0.15}         // corner radius
            smoothness={32}        // segments
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

function WheelWithSpokes({
   rimRadius = 0.2,
   rimTube = 0.15,
   spokeCount = 40,
   spokeRadius = 0.002,
   spokeLength = 0.2,
   // rotationSpeed = 0.01,
   wheelPosition = [5, 0.5, 6.5]
}) {

   const spokes = useMemo(() => {
      const arr = [];
      for (let i = 0; i < spokeCount; i++) {

         const angle = (i / spokeCount) * Math.PI * 2
         arr.push({ angle })
      }
      return arr;
   }, [spokeCount])

   // Optional animation
   // useFrame(({ clock }, mesh) => {
   //    mesh.rotation.z = clock.getElapsedTime() * rotationSpeed;
   // })

   return (
      <group>
         {/* Rim */}
         <mesh position={wheelPosition} rotation={[0.25, 1.6, 0]} >
            <torusGeometry args={[rimRadius, rimTube, 50, 150]} />
            <meshStandardMaterial color="#555" metalness={0.7} roughness={0.2} />
         </mesh>

         {/* Rim middle part */}
         <mesh value={1} position={[0.71, -0.25, 1.6]} rotation={[0.25, 1.65, 0]}>
            <ringGeometry args={[0.125, 0.225, 64, 64]} />
            <meshStandardMaterial color="white" metalness={1} roughness={0.55} />
         </mesh>

         {/* Spokes */}
         {spokes.map(({ angle }, i) => (
            <mesh
               key={i}
               rotation-z={angle}
               position={wheelPosition}
               rotation={[0.25, 1.6, 0]}
            >
               <cylinderGeometry args={[spokeRadius, spokeRadius, spokeLength, 32]} />
               <meshStandardMaterial color="white" metalness={0.95} roughness={0.75} />
            </mesh>
         ))}
      </group>
   )  // return()
}  // WheelWithSpokes()

// Train component
function Train({ groupPosition, bodyColor }) {
   return (
      <group position={groupPosition}>

         {/* Chassis */}
         <mesh rotation={[0, 0, 0]} castShadow receiveShadow>
            {/* */}
            <RoundedBox
               args={[0.25, 1, 5.05]}   // width, height, depth
               radius={0.35}         // corner radius
               smoothness={64}        // segments
            >
               <meshStandardMaterial color={'darkred'}
                  metalness={0.55}
                  roughness={0.1}
                  envMapIntensity={0.95}
               />
            </RoundedBox>
         </mesh>

         {/* Cabin */}
         <mesh position={[0, 0.5, 0.65]} castShadow receiveShadow>
            <RoundedBox
               args={[1, 1, 3.99]}   // width, height, depth
               radius={0.35}         // corner radius
               smoothness={64}        // segments
            >
               <meshStandardMaterial color={bodyColor}
                  metalness={1}
                  roughness={0.55}
                  envMapIntensity={0.45}
               />
            </RoundedBox>
         </mesh>

         {/* rear cabin */}
         <mesh position={[0, 1.05, -1.95]} castShadow receiveShadow>
            <boxGeometry
               args={[1.05, 1.75, 1]}   // width, height, depth
               smoothness={64}        // segments
            >
            </boxGeometry>
            <meshStandardMaterial color={'red'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.45}
            />
         </mesh>

         {/* Wheels */}
         <Wheel position={[-0.65, -0.25, 1.5]} color={'darkred'} />  {/* front, passenger's side */}
         <Wheel position={[-0.65, -0.25, 0.85]} color={'black'} />  {/* front, passenger's side */}

         <Wheel position={[0.65, -0.25, 1.5]} />  {/* front, driver's side */}
         <Wheel position={[0.65, -0.25, 0.85]} color={'black'} />

         <Wheel position={[-0.65, -0.25, -1.5]} />  {/* back/rear */}
         <Wheel position={[0.65, -0.25, -1.5]} />

         {/* WheelHubs */}
         <WheelHub position={[-0.74, -0.25, 1.5]} />
         <WheelHub position={[0.74, -0.25, 1.5]} />
         <WheelHub position={[-0.74, -0.25, -1.5]} />
         <WheelHub position={[0.74, -0.25, -1.5]} />

         {/* Headlight front side, lower light */}
         <mesh value={1} position={[0, 0.45, 2.67]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.085, 0.1, 64, 64]} />
            <meshStandardMaterial color="white" />
         </mesh>
         <mesh value={1} position={[0, 0.45, 2.67]} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.075, 32]} />
            <meshStandardMaterial color="orange" />
         </mesh>

         {/* upper light */}
         <mesh value={1} position={[0, 0.65, 2.67]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.085, 0.1, 64, 64]} />
            <meshStandardMaterial color="white" />
         </mesh>
         <mesh position={[0, 0.65, 2.67]} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.075, 32]} />
            <meshStandardMaterial color="orange" />
         </mesh>

         {/* exhaust pipe */}
         <mesh position={[0, 1, 2]}>
            {/* Cylinder is vertical on Y axis */}
            <cylinderGeometry args={[0.15, 0.15, 1, 64]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
         </mesh>

         <mesh position={[0, 1.5, 2]}>
            <cylinderGeometry args={[0.35, 0.15, 0.25, 64]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
         </mesh>
         <mesh position={[0, 1.75, 2]}>
            <cylinderGeometry args={[0.15, 0.35, 0.25, 64]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
         </mesh>

         {/* hatches */}
         <mesh position={[0, 1, 1.5]}>
            {/* Cylinder is vertical on Y axis */}
            <cylinderGeometry args={[0.15, 0.3, 0.05, 32]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
         </mesh>

         <mesh position={[0, 1, -0.5]}>
            {/* Cylinder is vertical on Y axis */}
            <cylinderGeometry args={[0.15, 0.3, 0.05, 32]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
         </mesh>
      </group>
   )
}  // Train()

/** ------------------------------------------------------------------------ */
//   Side-project: TruckWHeel)() 
/** ------------------------------------------------------------------------ */

// function TruckWheel() {
//   return (
//     <group scale={1.2}>
//       <Tyre />
//       <Rim />
//       <Bolts />
//     </group>
//   )
// }  // TruckWheel()

/** ------------------------------------------------------------------------ */
//   Group with a complete wheel.
/** ------------------------------------------------------------------------ */
function WheelWithAxis({ position = [1, 0, 0], rimColor = 'red' }) {

   return (
      <group position={position}>
         {/** rim */}
         <mesh rotation={[Math.PI / 2, 0, 1.55]} position={[3, 0.375, 5.5]}>
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

         {/* axis */}
         <mesh position={[2.5, 0.385, 5.55]} rotation={[1.75, 0, 1.5]}>
            <cylinderGeometry args={[0.13, 0.13, 1, 32]} />
            <meshStandardMaterial
               metalness={1}
               roughness={0.35}
               // normalScale={[1, 1]} // directional brushing
               envMapIntensity={1}
               color={'grey'} />
         </mesh>
      </group>
   )  // return()
}  // WheelWithAxis

function WheelWithSmallSpokes({ position = [0, 0, 0], rotation, rimColor = 'red' }) {

   {/** wheel with one tyre on rim  */ }
   return (
      <group position={position} rotation={rotation}>
         {/** rim in metal */}
         <mesh rotation={[Math.PI / 2, 0, 1.65]} position={[3.25, 0.375, 5.5]}>
            <latheGeometry args={[rimProfileSM, 64]} />
            <meshStandardMaterial
               metalness={1}
               roughness={0.35}
               envMapIntensity={0.5}
               color={rimColor}
            />
         </mesh>

         {/* inner rim, wireframe */}
         <instancedMesh
            args={[0, 0, 12]}
            rotation={[Math.PI / 2, 0, 1.55]}
            position={[2.95, 0.375, 5.5]}
         >
            <cylinderGeometry args={[0.15, 0.125, LEGO.STUD_HEIGHT, 16]} />
            <meshStandardMaterial
               wireframe={true}
               roughness={0.95}
               metalness={1}
               envMapIntensity={0.5}
               color={rimColor} />
         </instancedMesh>

         {/* tyre */}
         <mesh rotation={[0.15, 1.5, 0]} position={[2.9, 0.4, 5.5]}>
            <torusGeometry args={[0.3, 0.2, 40, 75]} />
            <meshStandardMaterial color="black" metalness={0} roughness={0.9} />
         </mesh>
      </group>
   )
}  // WheelWithSmallSpokes()

function DoubleTyre({ position = [0, 0, 0] }) {

   {/** group with rim and two tyres */ }
   return (
      <group position={position}>
         {/* rim */}
         <mesh rotation={[Math.PI / 2, 0, 1.55]} position={[3, 0.38, 4]}>
            <latheGeometry args={[rimProfile, 128]} />
            <meshStandardMaterial
               metalness={1}
               roughness={0.25}
               envMapIntensity={1.5}
               color='red'
            />
         </mesh>
         {/* inner tyre */}
         <mesh rotation={[0.15, 1.5, 0]} position={[2.3, 0.38, 4]}>
            <torusGeometry args={[0.3, 0.2, 40, 75]} />
            <meshStandardMaterial color="#555" metalness={0.7} roughness={0.2} />
         </mesh>
         {/* outer tyre */}
         <mesh rotation={[0.15, 1.5, 0]} position={[2.7, 0.38, 4]}>
            <torusGeometry args={[0.3, 0.2, 40, 75]} />
            <meshStandardMaterial color="#555" metalness={0.7} roughness={0.2} />
         </mesh>
      </group>
   )
}  // DoubleTyre()

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

const LEGO = {
   STUD_SPACING: 1,
   STUD_RADIUS: 0.24,
   STUD_HEIGHT: 0.18,
   BRICK_HEIGHT: 0.96,
}

//* Car3D page component
export default function Car3D() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   return (
      <>
         <header>
            <AppBar
               /* className='App-bar' */ // no effect
               sx={{ backgroundColor: 'rgba(40, 45, 60, 0.75)', position: 'fixed' }}
            >
               <Toolbar>
                  <Tooltip title='Home' arrow sx={{}}>
                     <IconButton
                        id="idBtnNavHome"
                        size="medium"
                        edge="start"
                        aria-label="nav to home"
                        sx={{ mr: 2 }}
                        onClick={() => { fnNavigate('/') }}
                     >
                        <HomeIcon sx={{ color: 'green' }} />
                     </IconButton>
                  </Tooltip>
               </Toolbar>
            </AppBar>
         </header>

         <main className="App-main">
            <div className="row mt-5"></div>

            <Canvas shadows camera={{ position: [5, 5, 5], fov: 75 }}
               style={{
                  width: "90vw",
                  height: "90vh",
                  display: "block"
               }}>
               <ambientLight intensity={1} />
               <directionalLight position={[5, 5, 5]} castShadow />

               {/* <Car groupPosition={[4.75, 0.5, 0]} bodyColor={'orange'} chassisType={'box'} /> */}

               <Car groupPosition={[0, 0.95, 3.5]} bodyColor={'darkred'} chassisType={'rounded'} />
               {/* <Car groupPosition={[-3.25, 0.55, -5]} bodyColor={'red'} chassisType={'rounded'} />  */}

               {/* <Train groupPosition={[-4.5, 0.55, 3.5]} bodyColor={'lightblue'} /> */}

               {/* load on the truck; args: width, height, depth */}
               <MetalRod position={[-0.25, 0.75, -1.5]} args={[0.55, 0.05, 3]} color={'orange'} />
               <MetalRod position={[0.25, 0.75, -1.5]} args={[0.55, 0.05, 3]} color={'yellow'} />
               <MetalRod position={[0, 1.5, -1.5]} args={[0.25, 0.5, 3]} color={'red'} />

               {/* top layer of rods on truck */}
               <MetalRod position={[0, 0.15, 0.5]} args={[0.25, 0.05, 3]} rotation={[0, -1.5, 0]} color={'blue'} />
               <MetalRod position={[0, 0.15, -0.15]} args={[0.25, 0.05, 3]} rotation={[0, -1.5, 0]} color={'lightblue'} />
               <MetalRod position={[0, 0.15, -0.75]} args={[0.25, 0.05, 3]} rotation={[0, -1.5, 0]} color={'darkblue'} />

               <MetalRod position={[2.5, 1.45, -3]} args={[0.15, 0.55, 4]} color={'lightgrey'} />


               {/* rods besides the truck; args: width, height, depth */}
               {/* <MetalRod args={[0.25, 0.05, 3]} position={[2, 0.25, 1]} color={'lightgrey'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[2.5, 0.25, 1]} color={'grey'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[3, 0.25, 1]} color={'darkgrey'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[3.5, 0.25, 1]} color={'white'} />  */}

               {/** wheel with rim and axis in metal */}
               {/**                <group position={[1, 0, 0]}>
                  <mesh rotation={[Math.PI / 2, 0, 1.55]} position={[3, 0.375, 5.5]}>
                     <latheGeometry args={[rimProfileSM, 32]} />
                     <meshStandardMaterial
                        metalness={1}
                        roughness={0.35}
                        envMapIntensity={0.5}
                        color='blue'
                     />
                  </mesh>
                  <mesh position={[2.65, 0.4, 5.5]} rotation={[0.2, 1.55, 0]} >
                     <torusGeometry args={[0.3, 0.2, 40, 64]} />
                     <meshStandardMaterial color="black" metalness={0.01} roughness={0.5} />
                  </mesh>
                  <mesh position={[2.5, 0.385, 5.55]} rotation={[1.75, 0, 1.5]}>
                     <cylinderGeometry args={[0.095, 0.095, 1, 32]} />
                     <meshStandardMaterial
                        metalness={1}
                        roughness={0.35}
                        normalScale={[1, 1]} // directional brushing
                        envMapIntensity={1}
                        color={'grey'} />
                  </mesh>
               </group> */}

               {/** hard tyres, glossy */}
               <WheelWithAxis position={[1, 2, 0]} rimColor='white' />
               <WheelWithAxis position={[2, 2.5, 0]} rimColor='blue' />
               <WheelWithAxis position={[2, 1.5, 0]} rimColor='orange' />
               <WheelWithAxis position={[1, 1, 0]} rimColor='yellow' />

               {/** soft tyres, matt look */}
               <WheelWithSmallSpokes position={[0, 0, 0]} rimColor={'yellow'} />   {/** driver's side */}
               <WheelWithSmallSpokes position={[1.65, 0.75, -0.75]} rotation={[0, 0, 3.15]} rimColor={'yellow'} />  {/** passenger's side */}
               <WheelWithSmallSpokes position={[1, 0.75, -0.75]} rotation={[0, 0, 3.15]} rimColor={'orange'} />

               {/** passender's side: wheels with spokes */}
               <WheelWithSmallSpokes position={[1, 0, 0]} rimColor={'orange'} />
               <WheelWithSmallSpokes position={[2, 0, 0]} rimColor={'red'} />

               {/** driver's side: group with rim and two tyres*/}
               <DoubleTyre position={[-1.25, 0, 0.99]} />
               <DoubleTyre position={[-1.05, 0, -2.05]} />

               {/** passender's side: group with rim and two tyres */}
               <DoubleTyre position={[-4.25, 0, -2.025]} />
               <DoubleTyre position={[-4.25, 0, 2.025]} />

               {/* <CardBoardBox position={[4.25, 0.25, 2]} size={[0.5, 0.5, 0.5]} /> */}
               {/* <CardBoardBox position={[4.25, 0.25, 3.5]} size={[0.5, 0.5, 0.5]}/> */}
               {/* <WoodenBox position={[6.25, 0.75, 2]} size={[1, 1.5, 1]} /> */}
               {/* <CamoBox position={[2.25, 0.75, 7]} size={[1, 1, 1]} /> */}

               {/** Box with nato camo pattern */}
               <CamoBox position={[4.25, 0.5, 7]} size={[1, 1, 1]} />

               {/** Box with custom colors */}
               {/* <CamoBox position={[4.25, 0.75, 7]} size={[0.25, 0.25, 0.25]} ivColors={['red', 'orange', 'yellow']} /> */}
               {/* <CamoBox position={[3.25, 0.75, 1]} size={[2, 2, 2]} ivColors={['hotpink', 'red', 'white']} /> */}
               {/* <CamoBox position={[2.25, 0.75, 7]} size={[0.5, 0.5, 0.5]} ivColors={['blue', 'darkblue', 'grey']} /> */}

               <CamoBox position={[1, 0.75, -3]} size={[0.5, 0.5, 0.5]} ivColors={[red[200], red[600], red[900]]} />

               <CamoBox position={[-1, 0.75, -4]} size={[0.5, 0.5, 0.5]} ivColors={[blue[200], blue[500], blue[900]]} />

               {/* <CamoBox position={[0, 0.8, 6.095]} size={[0.5, 0.25, 0.005]} ivColors={[orange[200], orange[600], orange[900]]} /> */}

               <CamoBox position={[-2, 0.8, 8]} size={[0.5, 0.25, 0.005]} ivColors={[purple[200], purple[600], purple[900]]} />

               {/* Bolts  */}
               {/* <instancedMesh rotation={[1.5, 0, 0]} position={[2, 0.35, 6.25]}>
                  <WheelBolts />
               </instancedMesh> */}

               {/* <AirflowArc /> */}
               {/* <GothicWindow position={[-5, 0.05, 3]} color={'red'}/> */}
               {/* <Sheet position={[-4, 0.05, 5]} color={'green'}/> */}

               {/* Cathedral glow from behind */}
               {/* <pointLight
                  position={[0, 0, -2]}
                  intensity={3}
                  color="#6fa8ff"
               /> */}
               {/* <RoseWindow position={[-4, 0.35, 4]} radius={2.2} spokes={16} /> */}

               <NatoCamoPlane position={[3, 0.1, 7]} args={[2, 2, 2, 2]} />
               <NatoCamoPlane position={[-4, 0.1, 5.5]} args={[5, 5, 2, 2]} />

               {/* Ground */}
               <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="black" />
               </mesh>

               <OrbitControls />
            </Canvas>
         </main>
      </>
   )
}  // Car3D()
