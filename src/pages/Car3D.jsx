/**
 * 
 *  Stand: 23.01.2026
 * 
 */

//
// import { useMemo } from "react" 
// import { useFrame } from "@react-three/fiber" 

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox, RoundedBoxGeometry, Text } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { blue, orange, purple, red, yellow, green } from "@mui/material/colors"

//* customer components
// import WheelBolts from '../components/truckparts/Tyre'  // errs
// import CardBoardBox from '../components/CardBoardBox'
// import WoodenBox from '../components/WoodenBox'

// import AirflowArc from '../components/truckparts/Arcs'
// import GothicWindow from '../components/GothicWindow'
// import Sheet from '../components/GothicWindow'
// import RoseWindow from '../components/GothicWindow'
// import { NatoCamoPlane } from '../components/NatoCamoPattern'
import { CamoBox } from '../components/CamoBox'
import ComicTree from '../components/ComicTree'
import RealisticTree from '../components/RealisticTree'
import { Car } from '../components/ToyCar'

// import Triangle from '../components/Triangle'
// import { MichelinMan, MichelinManInstanced } from '../components/MichelinMan/MichelinMan'

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

//* Testparams curves
const arc = 0,   // ~ Höhe des Bogens 
   length = 1  //Breite des Bogens / Länge des Rohres

const curve = new THREE.QuadraticBezierCurve3(
   new THREE.Vector3(-length / 2, 0, 0),  // x, y, z
   new THREE.Vector3(0, arc, 0),  // rotation of the arc
   new THREE.Vector3(length / 2, 0, 0)
)

//* new THREE.TubeGeometry(
//   path,              // THREE.Curve
//   tubularSegments,   // number
//   radius,            // number
//   radialSegments,    // number
//   closed             // boolean
// )

//* Testparams extrudeGeometry
const shape = new THREE.Shape()
shape.moveTo(0, 0)
shape.lineTo(0.25, 0.001)
shape.lineTo(0.25, 0.001)
shape.closePath()

const shapeArc = new THREE.Shape()  //! creates a big pie
shapeArc.moveTo(0, 0)
shapeArc.arc(0, 0, 0.025, 0, 45)
shapeArc.arc(0, 0, 0.025, 45, 90)
shapeArc.arc(0, 0, 0.025, 90, 135)
shapeArc.arc(0, 0, 0.025, 135, 180)
shapeArc.arc(0, 0, 0.025, 180, 225)
shapeArc.arc(0, 0, 0.025, 225, 270)
shapeArc.arc(0, 0, 0.025, 270, 315)
shapeArc.arc(0, 0, 0.025, 315, 360)
shapeArc.arc(0, 0, 0.025, 360, 0)
shapeArc.closePath()

//
const shapeBezierCurve = new THREE.Shape()  //! creates a big pie
shapeBezierCurve.moveTo(0, 0)
// shapeBezierCurve.arcLengthDivisions = 0.15
shapeBezierCurve.bezierCurveTo(0.5, 0.25, 0.25, 0.25, 0, 0)
shapeBezierCurve.closePath()

const shapeAbsellipse = new THREE.Shape()  //! creates a big pie
shapeAbsellipse.moveTo(0, 0)
shapeAbsellipse.absellipse(0.25, 0.25, 0.1, 0.1, 0, 10, true)
shapeAbsellipse.closePath()


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
               <directionalLight position={[2, 3, 5]} castShadow />

               <Car groupPosition={[0, 0.65, 1.5]} bodyColor={'darkred'} chassisType={'rounded'} />

               {/* <Train groupPosition={[-4.5, 0.55, 3.5]} bodyColor={'lightblue'} />  */}

               {/* load on the truck; args: width, height, depth */}
               <MetalRod position={[-0.25, 1, -6]} args={[0.35, 0.35, 0.75]} rotation={[1.55, 1.585, 0]} color={'orange'} />
               <MetalRod position={[0.25, 0.75, -4]} args={[0.55, 0.05, 3]} color={'yellow'} />

               {/** soft tyres, matt look */}
               <WheelWithSmallSpokes position={[0, 0, -8]} rimColor={'yellow'} />   {/** driver's side */}
               <WheelWithSmallSpokes position={[1.65, 0.75, -8]} rotation={[0, 0, 3.15]} rimColor={'yellow'} />  {/** passenger's side */}
               <WheelWithSmallSpokes position={[1, 0.75, -8]} rotation={[0, 0, 3.15]} rimColor={'orange'} />

               {/** driver's side: wheels with spokes */}
               <WheelWithSmallSpokes position={[1, 0, -8]} rimColor={red[900]} />
               <WheelWithSmallSpokes position={[2, 0, -8]} rimColor={blue[500]} />
               <Text position={[4.5, 1.2, -1.75]} fontSize={0.1}>MUI colors used here, blue[200]</Text>

               {/** driver's side: group with rim and two tyres*/}
               <DoubleTyre position={[-1.25, 0, -7]} />
               <DoubleTyre position={[-1.05, 0, -7.5]} />

               {/** passender's side: group with rim and two tyres */}
               <DoubleTyre position={[-7.25, 0, -6.75]} />
               <DoubleTyre position={[-5.25, 0, -7]} />

               {/** Box with nato camo pattern */}
               <CamoBox position={[2, 1, -5]} size={[0.75, 0.75, 1]} />
               <CamoBox position={[3, 1, -5]} size={[1, 1, 1]} />
               <CamoBox position={[4, 1, -5]} size={[0.5, 0.5, 0.5]} />

               {/** TEST Rohre / tubes */}
               <mesh key={1} position={[3, 0.35, 2]} receiveShadow>
                  <tubeGeometry args={[curve, 32, 0.2, 32, true]} />
                  <meshStandardMaterial color="#444" metalness={0.85} roughness={0.45} />
               </mesh>
               <mesh position={[3, 0.95, 4]} rotation={[0, 0, 1.65]} receiveShadow>
                  <tubeGeometry args={[curve, 32, 0.1, 32, true]} />
                  <meshStandardMaterial color="#444" metalness={0.75} roughness={0.65} />
               </mesh>
               <mesh position={[4, 0.95, 4]} rotation={[0, 0, 1.65]} receiveShadow>
                  <tubeGeometry args={[curve, 32, 0.1, 32, true]} />
                  <meshStandardMaterial color="#446" metalness={0.75} roughness={0.65} />
               </mesh>

               {/** TEST Flachblech, Glas */}
               <mesh position={[4.25, 2.35, 5.5]} rotation={[1, 1.65, 0.25]} receiveShadow>
                  <extrudeGeometry args={[shapeArc,
                     { depth: 0.05, steps: 12, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 16 }]}
                  />
                  <meshStandardMaterial color={red[700]} metalness={0.75} roughness={0.65} />
               </mesh>

               <mesh position={[5, 0.35, 5]} rotation={[1, 1.65, 0.25]} receiveShadow>
                  <extrudeGeometry args={[shapeBezierCurve,
                     { depth: 0.05, steps: 12, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 16 }]}
                  />
                  <meshStandardMaterial color={blue[100]} metalness={0.75} roughness={0.65} />
               </mesh>

               {/* <NatoCamoPlane position={[3, 0.1, 6]} args={[2, 2, 2, 2]} /> */}
               {/* <NatoCamoPlane position={[-4, 0.1, 7]} args={[5, 5, 2, 2]} /> */}

               {/** Wheels  */}
               <Wheel position={[-0.65, -0.25, -6]} />
               {/* Wheels, soft, no rim nor spokes */}
               <Wheel position={[-4, 0.45, -6]} />

               <ComicTree position={[8, 0, -5]} />
               <RealisticTree position={[7, 0, -6]} />

               {/* <MichelinMan /> */}
               {/* <MichelinManInstanced />  */}

               {/* <Triangle position={[-4, 0.65, 3]}/> */}

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
