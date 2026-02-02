/**
 * 
 *  Stand: 01.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import * as THREE from 'three'
// import { useState } from "react"
import { useMemo } from "react"

// import { useFrame } from "@react-three/fiber" 
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
// import { usePlane } from '@react-three/cannon'

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { CuboidCollider } from "@react-three/rapier"

//* 
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */


/** ------------------------------------------------------------------------ */
//    Local declarations / components
/** ------------------------------------------------------------------------ */
function Ground({ onClick }) {
   return (
      <RigidBody type="fixed" colliders="cuboid">
         <mesh
            position={[0, -1, 0]}
            receiveShadow

         // onClick={(e) => {
         //    e.stopPropagation()
         //    alert('in fn Ground')
         //    // onClick(e.point)
         // }}
         >
            <boxGeometry args={[10, 1, 10]} />
            <meshStandardMaterial color="lightblue" />
         </mesh>
      </RigidBody>
   )
}

//*
function ColliderBox({ position }) {
   return (
      <RigidBody colliders="cuboid" position={position}>
         <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
         </mesh>
      </RigidBody>
   )
}  // ColliderBox()

//*
function Ball({ position = [0, 3, 0], color = 'green', restitution = 0.75 }) {
   return (
      <RigidBody
         colliders={false}
         position={position}
         mass={10}
         linearDamping={0}
         angularDamping={0}
         ccd
      >
         <BallCollider args={[0.25]} restitution={restitution} friction={0.95} />

         <mesh castShadow>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color={color} />
         </mesh>
      </RigidBody>
   )
}  // Ball()

//*
function Floor() {

   return (
      <RigidBody type="fixed" colliders={false}>
         <CuboidCollider
            args={[5, 0.5, 5]}
            restitution={0.95}
            friction={0.2}
         />

         <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[10, 0.75, 10]} />
            <meshStandardMaterial color="lightblue" />
         </mesh>
      </RigidBody>
   )
}

//*
function Wall({ position, rotation = [1.55, 0, 1.55], size, color }) {
   return (
      <RigidBody type="fixed"
         position={position}
         rotation={rotation}
         colliders={false}
      >
         <CuboidCollider
            args={[
               size[0] * 0.5,
               size[1] * 0.5,
               size[2] * 0.5,
            ]}
            restitution={0.9}
            friction={0}
         />
         <mesh receiveShadow>
            <boxGeometry
               position={position}
               rotation={rotation}
               args={[
                  size[0] * 1,
                  size[1] * 1,
                  size[2] * 1,
               ]} />
            <meshStandardMaterial color={color} />
         </mesh>
      </RigidBody>
   )
}

//*
function getRandomColor() {

   // returns a randon color of [blue, brown, green, grey, orange, purple, red, yellow], length 8
   const arr = [blue, brown, green, grey, orange, purple, red, yellow]
   const randomIndex = Math.floor(Math.random() * arr.length)
   const randomItem = arr[randomIndex]

   return randomItem[500]
}  // getRandomColor()

//*
function CreateMassBalls({ noBalls = 10, color = red[500] }) {

   // useMemo() for better performance with big noBalls

   // <sphereGeometry args={[0.25, 32, 32]} />
   const geometry = useMemo(() => new THREE.SphereGeometry(0.2, 32, 32), [])

   const material = useMemo(() =>
      new THREE.MeshStandardMaterial({
         color: getRandomColor(),
         metalness: 0,
         roughness: 0.25
      }), [])

   //
   return Array.from({ length: noBalls }).map((_, index) => (
      <RigidBody
         key={index}
         colliders={false}
         position={[0.5 + index / noBalls, 6 + index / 2, 1]}
         mass={2}
      >
         <BallCollider args={[0.25]} restitution={0.3} friction={0.8} />

         <mesh geometry={geometry} material={material} castShadow />
      </RigidBody>
   ))
}  // CreateMassBalls()

//* Colliders page component
export default function Colliders() {

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
            <div className="row mt-5">

               {/* COl with buttons controlling the scene */}
               <Box orientation='col' className='m-1 mt-2 bg-dark rounded shadow'
                  sx={{ width: '14%', border: '1px solid green', mt: 2 }}
               >
                  Steuerelemente
                  <Card className='m-1 rounded shadow'>
                     <Button variant="outlined"
                        color="success"
                        className='m-1'
                        onClick={() => {
                        }}>
                        inactive
                     </Button>
                     <Button variant="outlined" color="warning" className='m-1'
                        onClick={() => {
                        }}>
                        inactive
                     </Button>
                  </Card>
               </Box>

               {/* COl with the scene */}
               <Box orientation='col' className='m-1 mt-2 bg-dark-subtle rounded'
                  sx={{ width: '84%', minHeight: '200px', border: '1px solid red', mt: 2 }}
               >
                  <Canvas shadows camera={{ position: [3, 3, 3], fov: 95 }}
                     style={{
                        width: "85vw",
                        height: "88vh",
                        display: "block"
                     }}>
                     <ambientLight intensity={0.85} />
                     <directionalLight position={[0, 5, 5]} castShadow />

                     {/* <Physics gravity={[0, -9.81, 0]}> */}
                     {/* <ColliderBox position={[0, 2, 0]} /> */}
                     {/* Ground */}
                     {/* <Ground /> */}
                     {/* </Physics> */}

                     <Physics gravity={[0, -9.81, 0]} > {/** debug> */}

                        <Ball position={[0, 4, 0]} color={red[500]} restitution={0.5} />
                        <Ball position={[0, 6, 1]} color={red[900]} restitution={0.85} />

                        <Ball position={[-1, 6, 0]} color={orange[500]} restitution={0.9} />
                        <Ball position={[0, 6, 0.25]} color={orange[900]} restitution={0.5} />

                        <Ball position={[-1, 7, 0.25]} color={blue[500]} restitution={0.5} />
                        <Ball position={[0, 8, 0.25]} color={blue[900]} restitution={0.9} />

                        <Ball position={[3, 5, 0.25]} color={green[400]} restitution={0.75} />
                        <Ball position={[3.25, 5, 0.25]} color={green[600]} restitution={0.85} />

                        <Ball position={[-0.25, 6, 1]} color={yellow[400]} restitution={0.5} />
                        <Ball position={[0.25, 6, 1]} color={yellow[600]} restitution={0.5} />

                        {/** ab 5.000 wird es langsam... */}
                        <CreateMassBalls noBalls={2000} />

                        {/* <Ball position={[-0.5, 6, 1]} color={grey[400]} restitution={0.5} /> */}
                        {/* <Ball position={[0.5, 6, 1]} color={grey[600]} restitution={0.5} /> */}

                        {/** size wird in WALL für Collider und Geometry verwendet */}
                        <Wall position={[1, 2, 3]} size={[0.25, 5, 3]} color={blue[200]} />
                        <Wall position={[-1, 2, -3]} size={[0.25, 5, 4]} color={blue[400]} />

                        <Wall position={[-4, 1.5, 0]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={orange[500]} />
                        <Wall position={[4, 1.5, 0]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={red[500]} />

                        <Floor />
                     </Physics>

                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // PartsTestground()
