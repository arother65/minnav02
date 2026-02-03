/**
 * 
 *  Stand: 01.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import * as THREE from 'three'
import { useState, useMemo, useRef, useEffect } from "react"


import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"

import { useFrame } from "@react-three/fiber"  // errs 
import { useAfterPhysicsStep } from "@react-three/rapier"


import { OrbitControls, Text } from "@react-three/drei"
// import { usePlane } from '@react-three/cannon'

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { CuboidCollider } from "@react-three/rapier"
import { useRapier } from "@react-three/rapier"

//* 
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
import { createNatoCamoTexture } from '../components/NatoCamoPattern'

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
function ColliderBox({ position = [0, 0, 0] }) {
   return (
      <RigidBody
         position={position}
         mass={10}
         linearDamping={0}
         angularDamping={0}
      >

         {/* <BallCollider args={[0.25]} restitution={0.55} friction={0.95} /> */}
         <CuboidCollider args={[0.25, 0.25, 0.25]} restitution={0.5} friction={0.95} />

         <mesh >
            <boxGeometry args={[0.75, 1, 0.75]} />
            <meshStandardMaterial metallness={0.9} roughness={0.25} color={getRandomMuiColor()} />
         </mesh>
      </RigidBody>
   )
}  // ColliderBox()

//*
function explode(world, origin, force = 15, radius = 4) {

   world.forEachRigidBody((body) => {
      if (body.isFixed()) return

      const p = body.translation()

      const dx = p.x - origin.x
      const dy = p.y - origin.y
      const dz = p.z - origin.z

      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist === 0 || dist > radius) return

      const strength = (1 - dist / radius) * force * 100

      body.applyImpulse(
         {
            x: (dx / dist) * strength,
            y: (dy / dist) * strength,
            z: (dz / dist) * strength,
         },
         true // wake up body
      )
   })
}

function Fragment({ velocity, color }) {
   const ref = useRef()

   // const geometry = useMemo(
   //    () =>
   //       new THREE.TetrahedronGeometry(0.08, 64),
   //    []
   // )

   useFrame((_, delta) => {
      ref.current.position.addScaledVector(velocity, delta)
      velocity.y -= 3 * delta // gravity

      ref.current.rotation.x += 6 * delta
      ref.current.rotation.y += 8 * delta
   })

   return (
      // <mesh ref={ref} geometry={geometry} castShadow>
      <mesh ref={ref} castShadow>

         {/* <sphereGeometry args={[0.08, 8, 8]} />  */}
         <tetrahedronGeometry args={[0.05]} />
         <meshStandardMaterial color={color} flatShading />
      </mesh>
   )
}  // Fragment()

function ExplodingBox({ position, color }) {

   const [exploded, setExploded] = useState(false)
   // 
   if (!exploded) {
      return (
         <RigidBody position={position} mass={10} >
            <CuboidCollider
               args={[0.5, 0.5, 0.5]}
               // sensor
               onCollisionEnter={(e) => {
                  setExploded(true)
               }}
            />
            <mesh>
               <boxGeometry args={[1, 1, 1]} />
               <meshStandardMaterial color={color} />
            </mesh>
         </RigidBody>
      )
   }  // not exploded

   if (exploded) {
      return (
         Array.from({ length: 80 }).map((_, i) => (
            <Fragment
               key={i}
               velocity={new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6, (Math.random() - 0.5) * 6)}
               color={color}
            />
         ))
      )
   }  // exploded 
}  // ExplodingBox()

//*
function Ball({ position = [0, 3, 0], color = 'green', restitution = 0.75 }) {
   return (
      <RigidBody
         colliders={false}
         position={position}
         mass={10}
         linearDamping={0}
         angularDamping={0}
      // ccd
      >
         <BallCollider args={[0.05]} restitution={restitution} friction={0.95} />

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
      <RigidBody type="fixed" colliders={false} userData={{ isFloor: true }}>
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
function getRandomMuiColor() {

   // returns a randon color of [blue, brown, green, grey, orange, purple, red, yellow], length 8
   const arr = [blue, brown, green, grey, orange, purple, red, yellow]
   const randomIndex = Math.floor(Math.random() * arr.length)
   const randomItem = arr[randomIndex]

   return randomItem[500]
}  // getRandomMuiColor()

//*
function CreateManyBalls({ position = [0, 3, 0], noBalls = 10 }) {

   // useMemo() for better performance with big noBalls
   const geometry = useMemo(() => new THREE.SphereGeometry(0.2, 32, 32), [])

   const camoTexture = useMemo( () => { 
      // return createNatoCamoTexture([getRandomMuiColor(), green[200], grey[500]])
      return createNatoCamoTexture([getRandomMuiColor(), getRandomMuiColor(), getRandomMuiColor()])
   }, [])
   // console.log(camoTexture, camoTexture?.image) 

   const material = useMemo(() =>
      new THREE.MeshStandardMaterial({
         // color:  new THREE.Color(getRandomMuiColor()),
         // color: getRandomMuiColor(),
         metalness: 0.95,
         roughness: 0.1
         // map: camoTexture
      }), [])

   const spawnPositions = useMemo(() =>
      Array.from({ length: noBalls }, (_, index) => [
         position[0] + (index / noBalls),
         position[1] + index / 2,
         position[2] + (index / noBalls)
      ]), [noBalls, position])

   // return Array.from({ length: noBalls }).map((_, index) => (
   return spawnPositions.map((position, index) => (
      <RigidBody
         key={index}
         colliders={false}
         position={position}
         mass={5}
      >
         <BallCollider args={[0.15, 0.15, 0.15]} restitution={0.75} friction={0.25} />
         <mesh geometry={geometry} material={material} castShadow>
            {/* <meshStandardMaterial color={getRandomMuiColor()} map={camoTexture}/> */}
            <meshStandardMaterial map={camoTexture}/>            
         </mesh>
      </RigidBody>
   ))
}  // CreateManyBalls()


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
                  <Canvas shadows camera={{ position: [1, 8, 2], fov: 95 }}
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

                     <Physics gravity={[0, -5.81, 0]} > {/** debug> */}

                        {/* <Ball position={[-1, 6, 0]} color={orange[500]} restitution={0.9} /> */}
                        {/* <Ball position={[0, 6, 0.25]} color={orange[900]} restitution={0.5} /> */}

                        {/* <Ball position={[-1, 7, 0.25]} color={blue[500]} restitution={0.5} /> */}
                        {/* <Ball position={[0, 8, 0.25]} color={blue[900]} restitution={0.9} /> */}

                        {/* <Ball position={[3, 5, 0.25]} color={green[400]} restitution={0.75} /> */}
                        {/* <Ball position={[3.25, 5, 0.25]} color={green[600]} restitution={0.85} /> */}

                        {/* <Ball position={[-0.25, 6, 1]} color={yellow[400]} restitution={0.5} /> */}
                        {/* <Ball position={[0.25, 6, 1]} color={yellow[600]} restitution={0.5} /> */}

                        {/** ab 3.000 wird es langsam... */}
                        {/* <CreateManyBalls position={[0, 5, 0]} noBalls={50} color={green[500]} /> */}
                        <CreateManyBalls position={[0, 5, 0]} noBalls={500} />
                        <CreateManyBalls position={[2, 5, -2]} noBalls={2} />
                        <CreateManyBalls position={[0, 5, -1]} noBalls={2} />

                        <ColliderBox position={[-1, 8, 0]} />
                        {/* <ColliderBox position={[1, 3, 0]} /> */}

                        <ExplodingBox position={[0, 5, 0]} color={getRandomMuiColor()} />

                        {/* <ExplodingBox position={[2, 5, 1]} color={green[500]} /> */}
                        {/* <ExplodingBox position={[-2, 5, -1]} color={yellow[500]} /> */}

                        {/** size wird in WALL für Collider und Geometry verwendet */}
                        <Wall position={[1, 2, 4]} size={[0.25, 5, 3]} color={blue[200]} />
                        <Wall position={[-1, 2, -4]} size={[0.25, 5, 4]} color={blue[400]} />

                        <Wall position={[-4, 1.5, 0]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={orange[200]} />
                        <Wall position={[0.15, 1.75, -2]} rotation={[1.6, 0, -2]} size={[0.25, 3, 2]} color={red[200]} />
                        <Wall position={[4, 1.5, 2.05]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={red[600]} />
                        <Wall position={[4, 1.5, 0]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={red[900]} />

                        <Wall position={[2, 3.25, 3.15]} rotation={[0, 0, 1.55]} size={[0.25, 3, 4]} color={green[400]} />

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
