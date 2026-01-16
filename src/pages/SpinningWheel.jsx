/**
 * SpinningWheel.jsx
 */

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, AppBar, Toolbar, Tooltip, IconButton } from '@mui/material'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SpinWheel from "../components/spinwheel/SpinWheel";
import HomeIcon from '@mui/icons-material/Home'
import logo from '../logo.svg'

// animating Ball
import { Sphere } from '@react-three/drei'
import { Physics, useSphere } from '@react-three/cannon'

//
export default function SpinningWheel() {

   const spinRef = useRef();
   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   // 
   function PhysicsBall({ position, color }) {
      // Create a physics-enabled sphere
      const [ref, api] = useSphere(() => ({
         mass: 2,
         // position: [0, 2, 0],
         position: position,
         args: [1.5], // radius of the Ball
      }))

      return (
         // Anzahl der Segmente des Balles in: args={[1.5, 16, 16] 
         <Sphere ref={ref} args={[1.5, 64, 64]}>
            <meshStandardMaterial color={color} />
         </Sphere>
      )
   }

   function Ground() {
      const [ref] = useSphere(() => ({
         type: 'Static',
         position: [0, -20, 0],
         args: [10],
      }))

      return (
         <mesh ref={ref} position={[0, -15, 0]}>
            <boxGeometry args={[50, 1, 50]} />
            <meshStandardMaterial color="#555" />
         </mesh>
      )
   }

   //
   return (
      <>
         <header>
            <AppBar
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
                  <Tooltip title='ReactJS home' arrow >
                     <nav>
                        <a href="https://reactnative.dev/" rel='noreferrer' target='_blank'>
                           <img src={logo} className="App-logo" alt="logo" />
                        </a>
                     </nav>
                  </Tooltip>
               </Toolbar>
            </AppBar>
         </header>
         <div className='row m-4'></div>

         {/* Wheel  */}
         <Box orientation='row'
            className='m-5 bg-dark-subtle rounded shadow vh-100'
            sx={{ width: '95%', border: '1px solid red' }}
         >
            <Canvas camera={{ position: [0, 4, 5], fov: 50 }}>
               <ambientLight intensity={0.6} />
               <directionalLight position={[5, 5, 5]} />

               <SpinWheel spinRef={spinRef} />

               <OrbitControls />
            </Canvas>
         </Box>

         {/* Ball /Bälle */}
         <Box orientation='row'
            className='m-5 bg-dark-subtle rounded shadow vh-100'
            sx={{ width: '95%', border: '1px solid red' }}
         >
            {/* von oben die Szene betrachten: camera={{ position: [0, 5, 0] }} */}
            <Canvas camera={{ position: [0, 1, 20] }}>

               <ambientLight intensity={0.5} />
               <directionalLight position={[5, 5, 5]} />

               <Physics gravity={[0, -5, 0]}>
                  <PhysicsBall position={[-1, 0, -2]} color={'blue'} />
                  <PhysicsBall position={[-2, 0, -2]} color={'orange'} />
                  <PhysicsBall position={[-3, 0, -2]} color={'red'} />
                  <PhysicsBall position={[-4, 0, -2]} color={'green'} />
                  <PhysicsBall position={[-5, 0, -2]} color={'grey'} />
                  <PhysicsBall position={[-6, 0, -2]} color={'purple'} />
                  <PhysicsBall position={[-7, 0, -2]} color={'darkpurple'} />
                  <Ground />
               </Physics>
            </Canvas>
         </Box>
      </>
   )
}  // SpinningWheel()
