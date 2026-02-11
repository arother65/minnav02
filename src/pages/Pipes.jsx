/**
 * 
 *  Stand: 10.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import * as THREE from 'three'
import { useState, useRef, useEffect } from "react"

// import * as THREE from 'three'

import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
// import { Html } from "@react-three/drei"
// import { useGLTF, Clone } from '@react-three/drei'

import { Physics, RigidBody, BallCollider, useImpulseJoint, useRevoluteJoint } from '@react-three/rapier'

// import { CuboidCollider } from "@react-three/rapier"

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button, FormGroup, FormControlLabel, Switch } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

// import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
// import "../components/styles.css"

/** ------------------------------------------------------------------------ */
//    Local declarations
/** ------------------------------------------------------------------------ */


/** ------------------------------------------------------------------------ */
//    Local components / functions
/** ------------------------------------------------------------------------ */
function handleOnCollisionEnter(ref) {

   // ref.current?.applyTorqueImpulse({
   //    x: Math.random() * 1,
   //    y: 0,
   //    z: Math.random() * 0.5,
   // })

   ref.current?.applyImpulse(
      // { x: 0, y: 0, z: -impulse },
      { x: 0.5, y: -0.15, z: 0.25 },
      true
   )
}  // Handler for Collision with a Bumper 


//* Pipes page component
export default function Pipes() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction
   const ballRef = useRef(null)

   // 
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
               <Box orientation='col' className='mt-4 bg-dark rounded shadow'
                  sx={{ mt: 2, width: '15%', border: '1px solid green' }}
               >
                  Steuerelemente
                  <Card className='rounded shadow'>
                     <div className="row m-3">
                        <Button variant="outlined"
                           id='idBtn'
                           color="success"
                           className='m-1'
                           // disabled={disabled}
                           onClick={() => { }}>
                           Create Balls
                           {/* {enableCircularProgress && <CircularProgress className='m-1' size={20} color="success" />} */}
                        </Button>
                     </div>
                  </Card>

                  {/** Switches */}
                  <Card className='rounded shadow'>
                     {/** SWITCH for using Ball's Index */}
                     <FormGroup>
                        <FormControlLabel control={
                           <Switch
                              onChange={(e) => {
                                 if (e.target.checked === true) {
                                    // setIndexUsed(true)
                                 }
                                 else {
                                    // setIndexUsed(false)
                                 }
                              }} />
                        }
                           label="With Index" />
                     </FormGroup>

                     {/** SWITCH for using random camo mix */}
                     <FormGroup>
                        <FormControlLabel control={
                           <Switch
                              onChange={(e) => {
                                 if (e.target.checked === true) {
                                    // setCamoUsed(true)
                                 }
                                 else {
                                    // setCamoUsed(false)
                                 }
                              }} />
                        }
                           label="With Camo" />
                     </FormGroup>

                     {/** SWITCH for custom camo mix */}
                     <FormGroup >
                        <FormControlLabel control={
                           <Switch
                              id='idSwitchMixCamo'
                              onChange={(e) => {
                              }
                              } />
                        }
                           label="mix camo" />
                     </FormGroup>
                  </Card>
               </Box>

               {/* COl with the scene / canvas*/}
               <Box orientation='col' className='mt-4 bg-dark-subtle rounded'
                  sx={{ mt: 2, width: '85%', minHeight: '200px', border: '1px solid red' }}
               >
                  <Canvas shadows camera={{ position: [1, 10, 1], fov: 100 }}
                     style={{
                        width: "86vw",
                        height: "100vh",
                        display: "block"
                     }}>
                     <ambientLight intensity={0.85} />
                     <directionalLight position={[0, 5, 5]} castShadow />
                     {/* <pointLight position={[1, 5, 1]} color="orange" /> */}

                     <Physics gravity={[0, -9.81, 0]} > {/** debug> */}

                        <Playfield />
                        <Walls />

                        <Flipper position={[-2.25, 0.7, 5.8]} side="left" />
                        <Flipper position={[2.25, 0.7, 5.8]} side="right" />

                        {/** Bumper oben im Spielfeld */}
                        <Bumper position={[0, 0.45, -3]} ref={ballRef} />
                        <Bumper position={[-2, 0.45, -4]} ref={ballRef} />
                        <Bumper position={[2, 0.45, -4]} ref={ballRef} />

                        {/** Bumper seitlich */}
                        <Bumper position={[3.5, 0.55, -2]} ref={ballRef} />
                        <Bumper position={[-3.5, 0.55, 3]} ref={ballRef} />

                        <ShooterLane x={3.5} />
                        <Ball ref={ballRef} position={[3.5, 0.35, 2.4]} />
                        <Plunger ballRef={ballRef} x={3.5} />

                     </Physics>

                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // Pipes()

function Playfield() {
   return (
      <RigidBody
         type="fixed"
         rotation={[-0.08, 0, 0]} // slope
         colliders="cuboid"
      >
         <mesh receiveShadow position={[0, -0.2, 0]}>
            <boxGeometry args={[9, 0.4, 14]} />
            <meshStandardMaterial color="#0a5c3b" />
         </mesh>
      </RigidBody>
   )
}

function Walls() {

   const wall = (pos, size) => (
      <RigidBody type="fixed" position={pos} colliders="cuboid" restitution={0.85}>
         <mesh>
            <boxGeometry args={size} />
            <meshStandardMaterial color="#444" />
         </mesh>
      </RigidBody>
   )

   return (
      <>
         {wall([-4.5, 0.3, 0], [0.3, 1, 14])}
         {wall([4.5, 0.3, 0], [0.3, 1, 14])}
         {wall([0, 0.3, -7], [9, 1, 0.3])}
      </>
   )
}

function Bumper({ position, ref }) {

   return (
      <RigidBody
         type="fixed"
         colliders="ball"
         // colliders="hull"

         restitution={3.95}
         position={position}
         // enabledTranslations={[true, false, true]}
         onCollisionEnter={() => { handleOnCollisionEnter(ref) }}
      >
         <mesh castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#ff3366" />
         </mesh>
      </RigidBody>
   )
}

function Flipper({ position, side = "left", length = 2 }) {

   const ref = useRef(null)
   const dir = side === "left" ? 1 : -1
   const key = side === "left" ? "ArrowLeft" : "ArrowRight"
   const active = useRef(false)

   // Key controls
   useEffect(() => {
      const down = (e) => {
         if (e.code === key) active.current = true
      }

      const up = (e) => {
         if (e.code === key) active.current = false
      }

      window.addEventListener("keydown", down)
      window.addEventListener("keyup", up)

      return () => {
         window.removeEventListener("keydown", down)
         window.removeEventListener("keyup", up)
      }
   }, [key])

   // Motor logic
   useFrame(() => {
      const body = ref.current
      if (!body) return

      const rot = body.rotation().y
      const min = dir * -0.4
      const max = dir * 0.7

      if (active.current && rot < max) {
         body.setAngvel({ x: 0, y: 15 * dir, z: 0 }, true)

      } else if (!active.current && rot > min) {
         body.setAngvel({ x: 0, y: -10 * dir, z: 0 }, true)

      } else {
         body.setAngvel({ x: 0, y: 0, z: 0 }, true)
      }
   })

   return (
      <RigidBody
         ref={ref}
         type="dynamic"
         colliders="cuboid"
         position={[position[0] + dir * length / 2, position[1], position[2]]}

         angularDamping={0.05}
         restitution={1}
         enabledTranslations={[false, false, false]}
      >
         <mesh>
            <boxGeometry args={[length, 0.25, 0.4]} />
            <meshStandardMaterial color="#ffcc00" />
         </mesh>
      </RigidBody>
   )
}

function Ball({ position, ref }) {

   // so wird der Impuls nicht bei jedem Render erneut erzeugt:
   useEffect(() => {
      ref.current?.applyImpulse({ x: 0, y: 0, z: -10 }, true)
   }, [ref])

   return (
      <RigidBody
         ref={ref}
         type="dynamic"
         colliders="ball"
         restitution={0.85}
         friction={0.5}
         linearDamping={0.05}
         angularDamping={0.05}
         position={position}
         mass={2}
         ccd
      // enabledTranslations={[true, true, true]}
      >
         <mesh castShadow>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial metalness={0.85} roughness={0.25} />
         </mesh>
      </RigidBody>
   )
}

function ShooterLane({ x = 2.5 }) {
   return (
      <>
         {/* Lane floor */}
         <RigidBody
            type="fixed"
            friction={0.05}
            restitution={0}
            position={[x, 0.55, 5]}
         >
            <mesh receiveShadow>
               <boxGeometry args={[0.9, 0.1, 4]} />
               <meshStandardMaterial color="#222" />
            </mesh>
         </RigidBody>

         {/* Left rail */}
         <RigidBody type="fixed" position={[x - 0.55, 0.4, 4]}>
            <mesh>
               <boxGeometry args={[0.1, 0.8, 4]} />
               <meshStandardMaterial color="#333" />
            </mesh>
         </RigidBody>

         {/* Right rail */}
         <RigidBody type="fixed" position={[x + 0.55, 0.4, 4]}>
            <mesh>
               <boxGeometry args={[0.1, 0.8, 4]} />
               <meshStandardMaterial color="#333" />
            </mesh>
         </RigidBody>
      </>
   )
}

function Plunger({ ballRef, x = 2.5 }) {

   const pulling = useRef(false)
   const power = useRef(0)

   useEffect(() => {
      const down = (e) => {
         if (e.code === "ArrowDown") pulling.current = true
      }

      const up = (e) => {
         if (e.code === "ArrowDown") {
            pulling.current = false

            const impulse = Math.min(20, 8 + power.current * 14)

            ballRef.current?.applyImpulse(
               // { x: 0, y: 0, z: -impulse },
               { x: 2, y: 0, z: -1 },
               true
            )
            power.current = 0
         }
      }

      window.addEventListener("keydown", down)
      window.addEventListener("keyup", up)

      return () => {
         window.removeEventListener("keydown", down)
         window.removeEventListener("keyup", up)
      }
   }, [ballRef])

   useFrame((_, delta) => {
      if (pulling.current) {
         power.current = Math.min(1, power.current + delta)
      }
   })

   return (
      <RigidBody
         type="fixed"
         position={[x, 0.45, 4]}
         colliders="cuboid"
      >
         <mesh>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#888" />
         </mesh>
      </RigidBody>
   )
}
