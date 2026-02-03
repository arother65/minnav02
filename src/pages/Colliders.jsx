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
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button, FormGroup, FormControlLabel, Switch, CircularProgress, Slider } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { CuboidCollider } from "@react-three/rapier"
// import { useRapier } from "@react-three/rapier"

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
         <BallCollider args={[0.15]} restitution={restitution} friction={0.95} />

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
            args={[5, 0.4, 5]}
            restitution={0.95}
            friction={0.2}
         />
         <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0]} receiveShadow>
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
function CreateManyBalls({ position = [0, 3, 0], noBalls = 10, size = 0.35, withCamo = false, onDone }) {

   // useMemo() for better performance with big noBalls
   const geometry = useMemo(() => new THREE.SphereGeometry(size, 16, 16), [size])

   const camoTexture = useMemo(() => {
      // return createNatoCamoTexture([getRandomMuiColor(), green[200], grey[500]])
      return createNatoCamoTexture([getRandomMuiColor(), getRandomMuiColor(), getRandomMuiColor()])
   }, [])

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
         position[1] + (index / 10),
         position[2] + (index / noBalls)
      ]), [noBalls, position])

   //* ohne diesen Aufruf wird die Szene im Parent (Colliders.jsx) zu schnell gelöscht...
   let lengthTimeout = 8500
   if (noBalls >= 1000) {
      lengthTimeout = 28000
   }
   useEffect(() => {
      const id = setTimeout(() => onDone?.(), lengthTimeout)
      return () => clearTimeout(id)
   }, [lengthTimeout, onDone])

   // 
   return spawnPositions.map((position, index) => (
      <RigidBody
         key={index}
         colliders={false}
         position={position}
         mass={10}
      >
         <BallCollider args={[
            geometry.parameters.radius * 0.85,
            geometry.parameters.radius * 0.85,
            geometry.parameters.radius * 0.85,
         ]}
            restitution={0.75} friction={0.25} />
         <mesh geometry={geometry} material={material} castShadow>
            {!withCamo &&
               <meshStandardMaterial color={getRandomMuiColor()} />
            }
            {withCamo &&
               <meshStandardMaterial map={camoTexture} />
            }
         </mesh>
      </RigidBody>
   ))
}  // CreateManyBalls()


//* Colliders page component
export default function Colliders() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction
   const [camoUsed, setCamoUsed] = useState(false)  // camo for the Balls created?
   const [createBalls, setCreateBalls] = useState(false)  // start creating Balls?
   const [disabled, setDisabled] = useState(false)  // state of the CREATE button 
   const [enableCircularProgress, setCircularProgress] = useState(false)  // state of CircularProgress
   const [size, setSize] = useState(0.15)  // SIZE of the Balls created 
   const [noBalls, setNoBalls] = useState(5)  // NUMBER of Balls created

   const handleChange = (event) => {
      setSize(event.target.value)
   }  // handleChange() Slider-Components

   useEffect(() => {
      console.log('useEffect(): createBalls:', createBalls, 'camoUsed: ', camoUsed)
   }, [camoUsed, createBalls])

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
                  sx={{ width: '15%', border: '1px solid green', mt: 2 }}
               >
                  Steuerelemente
                  <Card className='rounded shadow'>
                     <Button variant="outlined"
                        id='idBtn'
                        color="success"
                        className='m-1'
                        disabled={disabled}
                        onClick={() => {
                           setCreateBalls(true)
                           setDisabled(true)
                           setCircularProgress(true)
                        }}>
                        Create Balls
                     </Button>
                     {enableCircularProgress && <CircularProgress className='m-1' color="success" />}
                     <div className="row m-3 border border-info rounded">
                        <h6>Adjust SIZE of balls: </h6>
                        <Slider
                           name='idRadius'
                           aria-label="Slider for radius"
                           defaultValue={0.15}
                           valueLabelDisplay="auto"
                           step={0.05}
                           min={0.15}
                           max={1}
                           onChange={handleChange}
                           value={size}
                           disabled={disabled}
                        />
                     </div>
                     <div className="row m-3 border border-info rounded">
                        <h6>Adjust NUMBER of balls: </h6>
                        <Slider
                           name='idNoBalls'
                           aria-label="Slider for number of balls"
                           defaultValue={1}
                           valueLabelDisplay="auto"
                           step={1}
                           min={1}
                           max={500}
                           onChange={(event)=>{ setNoBalls(event.target.value) }}
                           value={noBalls}
                           disabled={disabled}
                        />
                     </div>
                  </Card>
                  <Card>
                     <Button variant="outlined" color="warning" className='m-1' disabled
                        onClick={() => {
                        }}>
                        disabled
                     </Button>
                  </Card>

                  <Card className='rounded shadow'>
                     <FormGroup>
                        <FormControlLabel control={
                           <Switch
                              onChange={(e) => {
                                 if (e.target.checked === true) {
                                    setCamoUsed(true)
                                 }
                                 else {
                                    setCamoUsed(false)
                                 }
                              }} />
                        }
                           label="With Camo" />
                        {/* <FormControlLabel required control={<Switch />} label="Required" /> */}
                        <FormControlLabel disabled control={<Switch />} label="Disabled" />
                     </FormGroup>
                  </Card>
               </Box>

               {/* COl with the scene */}
               <Box orientation='col' className='mt-4 bg-dark-subtle rounded'
                  sx={{ width: '85%', minHeight: '200px', border: '1px solid red', mt: 2 }}
               >
                  <Canvas shadows camera={{ position: [1, 8, 2], fov: 95 }}
                     style={{
                        width: "86vw",
                        height: "100vh",
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

                        {createBalls &&
                           <CreateManyBalls position={[0, 8, 1]} size={size} noBalls={noBalls} withCamo={camoUsed}
                              onDone={() => {
                                 setCreateBalls(prev => {
                                    console.log('onDone, previous value:', prev)
                                    return false
                                 })
                                 setDisabled(false)  // setzt den Button zur Erzeugung von Bällen wieder auf aktiv
                                 setCircularProgress(false)  // CircularProgress neben Button "Create" aus 
                              }}
                           />
                        }

                        {/* <CreateManyBalls position={[2, 5, -2]} noBalls={100} /> */}
                        {/* <CreateManyBalls position={[0, 5, -1]} noBalls={200} /> */}

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
                        <Wall position={[4, 1.5, 2.5]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={red[600]} />
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
