/**
 * SpinningWheel.jsx
 */

import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, Box, Button, Toolbar, Tooltip, IconButton } from '@mui/material'
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

   // reload of scenes
   const [reload, setReload] = useState(true)  // reload trigger
   useEffect(() => {
      // fetch data here
   }, [reload])

   const [reload01, setReload01] = useState(true)  // reload trigger
   useEffect(() => {
      // fetch data here
   }, [reload01])

   // 
   function PhysicsBall({ position, color }) {
      // Create a physics-enabled sphere
      const [ref, api] = useSphere(() => ({
         mass: 20,
         // position: [0, 2, 0],
         position: position,
         args: [1.25], // radius of the Ball
      }))

      return (
         // Anzahl der Segmente des Balles in: args={[1.5, 16, 16] 
         <Sphere ref={ref} args={[1.25, 64, 64]}>
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
         <div className='row m-5'></div>

         {/* Wheel  */}
         <div className='row mt-1 m-1 w-100'>
            <Box orientation='col' className='m-1 bg-dark rounded shadow ' sx={{ width: '15%', border: '1px solid green' }}>
               <Tooltip title='press to spin' arrow>
                  <Button className='m-1' variant="contained" color="primary"
                     onClick={() => {
                        //
                     }}>
                     spin wheel
                  </Button>
               </Tooltip>
               {/* <HtmlOverlay spin={spin} winner={winner} /> */}
            </Box>
            <Box orientation='col' className='m-1 bg-dark-subtle rounded shadow' sx={{ width: '83%', minHeight: '200px', border: '1px solid red' }}>
               <Canvas camera={{ position: [0, 4, 5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} />

                  <SpinWheel spinRef={spinRef} />
                  <OrbitControls />
               </Canvas>
            </Box>
         </div>

         {/* Ball /Bälle */}
         <div className='row mt-1 m-1 w-100'>
            <Box orientation='col'
               className='m-1 bg-dark rounded shadow '
               sx={{ width: '15%', border: '1px solid green' }}
            >
               <Tooltip title='press 2x to reload' arrow>
                  <Button className='m-1' variant="contained" color="primary"
                     onClick={() => {
                        setReload(reload => !reload)
                     }}>
                     Reload Scene
                  </Button>
               </Tooltip>
            </Box>
            <Box orientation='col'
               className='m-1 bg-dark-subtle rounded shadow '
               sx={{ width: '83%', minHeight: '200px', border: '1px solid red' }}
            >
               {/* von oben die Szene betrachten: camera={{ position: [0, 5, 0] }} */}
               {reload &&
                  <Canvas camera={{ position: [0, 1, 20] }}>
                     <ambientLight intensity={0.5} />
                     <directionalLight position={[5, 5, 5]} />

                     {/* gravity ca.: x = unklar; y = horizontal; vertical = z */}
                     <Physics gravity={[0, -10, 10]}>
                        <PhysicsBall position={[-1, 0, -1]} color={'blue'} />
                        <PhysicsBall position={[-1.5, 0, -2]} color={'lightblue'} />
                        <PhysicsBall position={[-2, 0, -3]} color={'darkblue'} />

                        {/* <PhysicsBall position={[1, 0, -1]} color={'green'} />
                  <PhysicsBall position={[2, 0, -1]} color={'grey'} />
                  <PhysicsBall position={[3, 0, -1]} color={'purple'} /> */}

                        {/* <PhysicsBall position={[-7, 0, -1]} color={'darkpurple'} /> */}
                        {/* <Ground /> */}
                     </Physics>
                  </Canvas>
               }
            </Box>
         </div>

         {/* Ball /Bälle */}
         <div className='row mt-1 m-1 w-100'>
            <Box orientation='col'
               className='m-1 bg-dark rounded shadow '
               sx={{ width: '15%', border: '1px solid green' }}
            >
               <Tooltip title='press 2x to reload' arrow>
                  <Button className='m-1' variant="contained" color="primary"
                     onClick={() => {
                        setReload01(reload01 => !reload01)
                     }}>
                     Reload Scene
                  </Button>
               </Tooltip>
            </Box>
            <Box orientation='col'
               className='m-1 bg-dark-subtle rounded shadow '
               sx={{ width: '83%', minHeight: '200px', border: '1px solid green' }}
            >
               {/* von oben die Szene betrachten: camera={{ position: [0, 5, 0] }} */}
               {reload01 &&
                  <Canvas camera={{ position: [0, 1, 10] }}>
                     <ambientLight intensity={0.5} />
                     <directionalLight position={[5, 5, 5]} />

                     {/* gravity ca.: x = unklar; y = horizontal; vertical = z */}
                     <Physics gravity={[0, -10, 10]}>
                        {/*                         <PhysicsBall position={[1, 0, -10]} color={'blue'} />
                        <PhysicsBall position={[1, 0, -20]} color={'lightblue'} />
                        <PhysicsBall position={[1, 0, -20]} color={'darkblue'} /> */}
                        {/* <PhysicsBall position={[-7, 0, -1]} color={'darkpurple'} /> */}
                        <Ground />
                     </Physics>

                     <Physics gravity={[0, 0, 10]}>
                        <PhysicsBall position={[1, 0, -3]} color={'green'} />
                        <PhysicsBall position={[1, 0, -4]} color={'lightgreen'} />
                        <PhysicsBall position={[1, 0, 1]} color={'darkgreen'} />
                     </Physics>
                  </Canvas>
               }
            </Box>
         </div>
      </>
   )
}  // SpinningWheel()
