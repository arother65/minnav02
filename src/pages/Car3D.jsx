import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'


// Wheel hubs
function WheelHub({ position }) {
   return (
      <group>
         {/* ? wheel hubs */}
         <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 64]} />
            <meshStandardMaterial color={'white'} />
         </mesh>
      </group>
   )
}  // WheelHub() 

// Wheel component 
function Wheel({ position }) {
   return (
      <group>
         {/* <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow> */}
         <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.25, 64]} />
            <meshStandardMaterial color="black" />
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
function Car({ groupPosition, bodyColor }) {

   return (
      <group position={groupPosition}>
         {/* Chassis */}
         <mesh rotation={[0, 0, 0]} castShadow receiveShadow >
            <boxGeometry args={[1, 0.5, 5]} />

            {/* test using RoundedBox */}
            {/* <RoundedBox
               args={[1, 0.01, 5.05]}   // width, height, depth
               radius={0.25}         // corner radius
               smoothness={16}        // segments
            /> */}

            <meshStandardMaterial color={bodyColor}
            // metalness={0.75}
            // roughness={0.15}
            />
         </mesh>

         {/* Cabin */}
         <mesh position={[0, 0.579, 1.5]}>
            <boxGeometry args={[-1, 0.65, 0.75]} />
            <meshStandardMaterial color="darkred" />
         </mesh>

         {/* Cabin level 1 */}
         <mesh position={[0, 0.85, 1.75]}>
            <boxGeometry args={[-1, 0.03, 0.5]} />
            <meshStandardMaterial color="green" />
         </mesh>

         {/* Wheels */}
         <Wheel position={[-0.65, -0.25, 1.5]} />  {/* front, passenger's side */}
         <Wheel position={[0.65, -0.25, 1.5]} />  {/* front, driver's side */}

         <Wheel position={[-0.65, -0.25, -1.5]} />  {/* back/rear */}

         {/* <Wheel position={[0.65, -0.25, -1.5]}  /> */}
         <WheelRear position={[0.75, -0.25, -1.5]} />

         {/* WheelHubs */}
         <WheelHub position={[-0.74, -0.25, 1.5]} />
         <WheelHub position={[0.74, -0.25, 1.5]} />
         <WheelHub position={[-0.74, -0.25, -1.5]} />
         <WheelHub position={[0.74, -0.25, -1.5]} />

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
            <meshStandardMaterial color="darkgrey" />
         </mesh>

         {/* Headlight driver's side */}
         <mesh value={1} position={[0.35, 0.1, 2.54]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.05, 0.1, 64, 64]} />
            <meshStandardMaterial color="darkgrey" />
         </mesh>

         {/* backlight driver's side */}
         <mesh value={1} position={[0.35, 0.1, -2.55]} rotation={[0, 0, 0]}>
            <ringGeometry args={[0.05, 0.1, 64, 64]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* exhaust pipe */}
         <mesh position={[0.35, 0.75, 1.015]}>
            {/* Cylinder is vertical on Y axis */}
            <cylinderGeometry args={[0.05, 0.05, 1, 64]} />
            <meshStandardMaterial color={'white'}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5} />
         </mesh>

         {/* front bumper */}
         <mesh position={[0, -0.15, 2.5]} rotation={[1.75, 0, 1.5]}>
            {/* Cylinder is vertical on Y axis */}
            <cylinderGeometry args={[0.1, 0.1, 1, 64]} />
            <meshStandardMaterial color={'orange'}
               metalness={1}
               roughness={0.55}
               normalScale={[1, 1]} // directional brushing
               envMapIntensity={0.5} />
         </mesh>
      </group>
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
               roughness={0.55}
               envMapIntensity={0.5}
            />
         </RoundedBox>
      </mesh>
   )
}  // MetalRod()

// Car3D page component
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

         <main>
            <div className="row mt-5"></div>

            <div className="row mt-1 min-vh-100">
               <div className="col min-vh-75 min-vw-75">
                  <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
                     <ambientLight intensity={0.4} />
                     <directionalLight position={[5, 5, 5]} castShadow />

                     {/* <Car groupPosition={[-2, 0.5, 0]} bodyColor={'darkgreen'} /> */}
                     <Car groupPosition={[0, 0.5, 0]} bodyColor={'darkred'} />
                     {/* <Car groupPosition={[2, 0.5, 0]} bodyColor={'darkblue'} /> */}

                     {/* load on the truck: args: width, height, depth */}
                     <MetalRod position={[-0.25, 1.1, -0.5]} args={[0.55, 0.05, 3]} color={'orange'} />
                     <MetalRod position={[0.25, 1.1, -0.5]} args={[0.55, 0.05, 3]} color={'yellow'} />
                     <MetalRod position={[0, 1.51, -0.5]} args={[0.25, 0.5, 3]} color={'red'} />

                     {/* top layer of rods on truck */}
                     <MetalRod args={[0.25, 0.05, 3]} position={[0, 1.73, .5]} rotation={[0, -1.5, 0]} color={'blue'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[0, 1.73, -.15]} rotation={[0, -1.5, 0]} color={'lightblue'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[0, 1.73, -.75]} rotation={[0, -1.5, 0]} color={'darkblue'} />


                     {/* rods besides the truck; args: width, height, depth */}
                     <MetalRod args={[0.25, 0.05, 3]} position={[2, 0.25, 1]} color={'lightgrey'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[2.5, 0.25, 1]} color={'grey'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[3, 0.25, 1]} color={'darkgrey'} />
                     <MetalRod args={[0.25, 0.05, 3]} position={[3.5, 0.25, 1]} color={'white'} />

                     {/* Ground */}
                     <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial color="olive" />
                     </mesh>

                     <OrbitControls />
                  </Canvas>
               </div>
            </div>
         </main>
      </>
   )
}  // Car3D()
