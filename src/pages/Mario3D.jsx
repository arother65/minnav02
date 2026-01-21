/**
 * 
 *  Stand: 21.01.2026
 * 
 */

import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

//
// import { useMemo } from "react";
// import { useFrame } from "@react-three/fiber";


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

function Mario() {
   return (
      <group position={[0, 1, 0]}>
         {/* Head */}
         <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#f1c27d" />
         </mesh>

         {/* Hat */}
         <mesh position={[0, 2.7, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.3, 32]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* Body */}
         <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
            <meshStandardMaterial color="blue" />
         </mesh>

         {/* Arms */}
         <mesh position={[-0.9, 1.4, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshStandardMaterial color="red" />
         </mesh>
         <mesh position={[0.9, 1.4, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* Legs */}
         <mesh position={[-0.3, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
            <meshStandardMaterial color="brown" />
         </mesh>
         <mesh position={[0.3, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
            <meshStandardMaterial color="brown" />
         </mesh>
      </group>
   )
}  // Mario()


// Car3D page component
export default function Mario3D() {

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

               <Mario />

               {/* Ground */}
               <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="olive" />
               </mesh>

               <OrbitControls />
            </Canvas>
         </main>
      </>
   )
}  // Mario3D()
