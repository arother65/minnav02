/**
 * 
 *  Stand: 10.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import * as THREE from 'three'
import { useState, useRef, useEffect, forwardRef, createContext, useContext } from "react"
import * as THREE from "three"
import { RoundedBoxGeometry, Text } from "@react-three/drei"

// import * as THREE from 'three'

import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Html } from "@react-three/drei"
// import { useGLTF, Clone } from '@react-three/drei'

import { RigidBody, BallCollider, CuboidCollider, Physics, useRevoluteJoint } from '@react-three/rapier'

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button, FormGroup, FormControlLabel, Switch } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
// import "../components/styles.css"

import MetalSpring, { HelixCurve } from '../components/MetalSpring'
import { MetalRod } from './PartsTestground'
// MetalRod from PartsTestground.jsx 

import CreateExtrudeGeometry from '../components/InstancedGeometry'
// CreateExtrudeGeometry from InstancedGeometry.jsx

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
      { x: 1.5, y: 0, z: 1.25 },
      true
   )
   // ref.current?.addForce({ x: 0.5, y: 0, z: 0 })

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

                     {/* <Physics gravity={[0, -9.81, 0]} > debug */}
                     <Physics
                        gravity={[0, -9.81, 0]}
                        timeStep="vary"
                        interpolate
                        colliders={false}
                        solverIterations={30}  // Low solver iterations = soft joints = slow response.
                     >

                        <Playfield />
                        <Walls />

                        <Flipper position={[-2.25, 0.7, 5.8]} side="left" />
                        <Flipper position={[2.25, 0.7, 5.8]} side="right" />

                        <Ball ref={ballRef} position={[3.5, 0.45, 4]} />

                        {/** Bumper oben im Spielfeld */}
                        <BumperWithLight position={[0, 0.35, -1]} />
                        {/* <Bumper position={[0, 0.35, -1]} ballRef={ballRef} /> */}

                        <BumperWithLight position={[-2, 0.35, -3]} />
                        {/* <Bumper position={[-2, 0.35, -3]} ballRef={ballRef} /> */}

                        <BumperWithLight position={[3, 0.35, -3]} />
                        {/* <Bumper position={[2, 0.35, -3]} ballRef={ballRef} /> */}

                        {/** Bumper seitlich */}

                        <ShooterLane x={3.5} />
                        <Plunger ballRef={ballRef} x={3.5} />

                        {/** Deckel der Bumper */}
                        {/* <CreateExtrudeGeometry position={[-0.25, 1, -0.75]} rotation={[0, 0, -0.75]} color={orange[500]} /> */}

                        {/* <ScorePopup position={[0, 5, 0]} value={100} onDone={(e) => { console.log('onDone...') }} /> */}

                        {/** Abweiser unten links */}
                        <RigidBody type="fixed" colliders='hull' restitution={0.5}>
                           {/* <CreateExtrudeGeometry position={[-3.15, 0.65, 5]} rotation={[-0.5, 2, 0]} color={orange[100]} /> */}

                           <mesh position={[-3.15, 0.75, 4.5]}  rotation={[0, -0.75, 0]}>
                              <ringGeometry args={[0.25, 0.8, 64]} />
                              <meshStandardMaterial
                                 color="red"
                                 // emissive="orange"
                                 // emissiveIntensity={0.5}
                                 metalness={0.95}
                                 roughness={0.45}
                                 side={THREE.DoubleSide}
                              />
                           </mesh>
                        </RigidBody>

                     </Physics>

                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // Pipes()

//*
function Playfield() {
   return (
      <RigidBody
         type="fixed"
         rotation={[-0.08, 0, 0]} // slope
         colliders="cuboid"
      >
         <mesh position={[0, -0.4, 0]} receiveShadow >
            <boxGeometry args={[9, 0.45, 14]} />
            <meshStandardMaterial color="#0a5c3b" metalness={0.25} roughness={0.75}/>
         </mesh>
      </RigidBody>
   )
}  // PlayField()

function Walls() {

   const wall = (pos, size) => (
      <RigidBody type="fixed" position={pos} colliders="cuboid" restitution={0.65} friction={0.05}>

         {/* <CuboidCollider args={[0.5, 0.35, 0.5]} restitution={1.5} friction={0.05} /> */}

         <mesh>
            <boxGeometry args={size} />
            <meshStandardMaterial color="lightgreen" opacity={0.25} transparent />
         </mesh>
      </RigidBody>
   )

   return (
      <>
         {/**   pos,            size      */}
         {wall([-4.5, 0.75, 0], [0.3, 3, 14])}
         {wall([4.5, 0.75, 0], [0.3, 3, 14])}
         {wall([0, 0.75, -7], [9, 3, 0.3])}
      </>
   )
}  // Walls()

function Bumper({ ballRef, position }) {

   return (
      <RigidBody
         type="fixed"
         colliders={false}
         position={position}
         restitution={1}
         friction={0.05}
         // onCollision={() => {
         //    ballRef.current?.setAngvel({ x: -2, y: 0, z: -1 }, true)
         // }}
         onCollisionEnter={({ other }) => {
            const ball = other.rigidBody

            if (!ball) return

            // Direction from bumper to ball
            const ballPos = ball.translation()
            const dx = ballPos.x - position[0]
            const dz = ballPos.z - position[2]
            const length = Math.sqrt(dx * dx + dz * dz) || 1

            const force = 3

            // Radial outward impulse
            ball.applyImpulse(
               { x: (dx / length) * force, y: 0, z: (dz / length) * force },
               true
            )

            // Add spin based on direction
            ball.applyTorqueImpulse(
               { x: -dz * 2, y: 0, z: dx * 2 },
               true
            )

            // popup anzeigen...

         }}
      >

         <BallCollider args={[0.65]} />
         {/* <CuboidCollider args={[0.35, 0.35, 0.35]} /> */}

         <mesh castShadow>
            <sphereGeometry args={[0.75, 64, 64]} />
            <meshStandardMaterial color={red[900]} metalness={0.95} roughness={0.45} />
         </mesh>
      </RigidBody>
   )
}  // Bumper()

function BumperWithLight({ position }) {

   const meshRef = useRef()
   const lightRef = useRef()
   const flash = useRef(0)

   //* for showing the score
   // const [showPopup, setShowPopup] = useState(false)
   // const ScoreContext = createContext()
   // const useScore = () => useContext(ScoreContext)
   // const spawnRef = useScore()

   // useFrame for flash-effect when a bumper is hit 
   useFrame((_, delta) => {
      if (!meshRef.current || !lightRef.current) return

      // Fade flash down over time
      flash.current = Math.max(0, flash.current - delta * 4)

      const intensity = flash.current

      // Emissive glow
      meshRef.current.material.emissiveIntensity = intensity * 3

      // Light burst
      lightRef.current.intensity = intensity * 10

      // show value when bumper is hit ?

   })

   return (
      <>
         <RigidBody
            type="fixed"
            colliders={false}
            position={position}
            restitution={0.95}
            friction={0.05}
            onCollisionEnter={({ other }) => {
               const ball = other.rigidBody
               if (!ball) return

               // ---- PHYSICS IMPULSE ----
               const ballPos = ball.translation()
               const dx = ballPos.x - position[0]
               const dz = ballPos.z - position[2]

               const len = Math.sqrt(dx * dx + dz * dz) || 1
               const force = 1.25

               ball.applyImpulse({ x: (dx / len) * force, y: 0, z: (dz / len) * force }, true)
               ball.applyTorqueImpulse({ x: -dz * 3, y: 0, z: dx * 3 }, true)

               // ---- VISUAL FLASH ----
               flash.current = 1

               // ---- show value for hit / collision ---- 
               // spawnRef.current([position[0], position[1] + 1, position[2]], 100)  //?
               // setShowPopup(true)

            }}
         >
            <BallCollider args={[0.65]} />

            <mesh ref={meshRef} castShadow>
               <sphereGeometry args={[0.75, 64, 64]} />
               <meshStandardMaterial
                  color="red"
                  emissive="red"
                  emissiveIntensity={0}
                  metalness={0.9}
                  roughness={0.4}
               />
            </mesh>

            {/* Flash Light */}
            <pointLight
               ref={lightRef}
               color="red"
               intensity={0}
               distance={4}
               decay={2}
            />

            {/* <Text fontSize={0.5}
               anchorX="center"
               anchorY="middle">
               hit!
            </Text> */}
         </RigidBody>
         {/* { showPopup && <ScorePopup position={[0, 3, 0]} value={10} onDone={() => { }} /> } */}
      </>
   )
}  // BumperWithLight

//*
function flipperShape(length) {
   const shape = new THREE.Shape()

   const baseWidth = 0.5
   const tipWidth = 0.35

   shape.moveTo(0, -baseWidth / 2)
   shape.lineTo(length * 0.8, -tipWidth / 2)
   shape.quadraticCurveTo(length, 0, length * 0.8, tipWidth / 2)
   shape.lineTo(0, baseWidth / 2)
   shape.quadraticCurveTo(-0.3, 0, 0, -baseWidth / 2)

   return shape
}

//*
function Flipper({ position, side = "left", length = 2 }) {

   const pivot = useRef()
   const flipper = useRef()

   const dir = side === "left" ? 1 : -1
   const key = side === "left" ? "ArrowLeft" : "ArrowRight"
   const active = useRef(false)

   // Create hinge joint
   const joint = useRevoluteJoint(
      pivot,
      flipper,
      [
         [0, 0, 0],                 // pivot local anchor
         [-dir * length / 2, 0, 0], // flipper local anchor
         [0, 1, 0]                  // hinge axis (Y axis)
      ]
   )

   // Keyboard controls
   useEffect(() => {
      const down = (e) => {
         e.code === key && (active.current = true)
         // joint.current?.configureMotorVelocity(dir * 45, 64)
      }
      const up = (e) => {
         e.code === key && (active.current = false)
         // joint.current?.configureMotorVelocity(dir * -10, 10)
      }

      window.addEventListener("keydown", down)
      window.addEventListener("keyup", up)

      return () => {
         window.removeEventListener("keydown", down)
         window.removeEventListener("keyup", up)
      }
   }, [key, joint, dir])

   // Motor control
   useFrame(() => {
      if (!joint.current) return

      const restAngle = dir * -0.3
      const activeAngle = dir * 0.5

      if (active.current) {
         // joint.current.configureMotorPosition(targetAngle, stiffness, damping)
         joint.current.configureMotorPosition(
            activeAngle,
            500,   // stiffness
            10     // damping
         )
      } else {
         joint.current.configureMotorPosition(
            restAngle,
            500,
            10
         )
      }
   })  // useFrame()

   // joint.current.setLimits(dir * -0.4, dir * 0.7)

   return (
      <>
         {/* Invisible fixed pivot */}
         <RigidBody type="fixed" ref={pivot} position={position} />

         {/* Flipper */}
         <RigidBody
            ref={flipper}
            type="dynamic"
            colliders="cuboid"
            restitution={0.75}
            friction={0.1}
            angularDamping={2}
            linearDamping={1}
            // enabledTranslations={[false, false, false]}  {/** creates strange errors */}
            enabledRotations={[false, true, false]}
            canSleep={false}
            mass={1}               // realistic inertia
         >
            <mesh castShadow>

               {/** works; capsuleGeometry, extrudeGeometry does not */}
               <boxGeometry args={[length, 0.35, 0.4]} />

               {/* <capsuleGeometry args={[0.2, length - 0.4, 16, 32]} rotation={[Math.PI / 2, 0, 0]}/> */}
               {/* <extrudeGeometry args={[flipperShape(length), { depth: 0.4, bevelEnabled: false }]} /> */}

               <meshStandardMaterial color='yellow' metalness={0.85} roughness={0.5} />
            </mesh>

            <pointLight
               //   ref={lightRef}
               color="red"
               intensity={0.75}
               distance={3}
               decay={0}
            />

         </RigidBody>
      </>
   )
}  // Flipper()

// function Ball({ position, ballRef }) {
const Ball = forwardRef(({ position }, ref) => {

   // console.log("ballRef:", ref)

   // so wird der Impuls nicht bei jedem Render erneut erzeugt:
   useEffect(() => {
      setTimeout(() => {
         ref.current?.setLinvel({ x: 0, y: 0, z: 0 }, true)
         ref.current?.setAngvel({ x: 0, y: 0, z: 0 }, true)
      }, 100)
   }, [ref])

   return (
      <RigidBody
         ref={ref}
         name='ball'
         type="dynamic"
         colliders={false}
         restitution={0.85}
         friction={0.15}
         linearDamping={0.05}
         angularDamping={0.05}
         position={position}
         mass={4}
         ccd
      >
         <BallCollider args={[0.35]} />

         <mesh castShadow>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color='white' metalness={0.85} roughness={0.15} />
         </mesh>
      </RigidBody>
   )
}) // Ball()

function ShooterLane({ x = 2.5 }) {

   return (
      <>
         {/* Lane floor */}
         <RigidBody
            type="fixed"
            friction={0.05}
            restitution={0.15}
            position={[x, 0.15, 4.5]}
            rotation={[-0.15, 0, 0]}
            colliders="cuboid"
         >
            <mesh receiveShadow>
               <boxGeometry args={[0.9, 0.05, 4]} />
               <meshStandardMaterial color="grey" />
            </mesh>
         </RigidBody>

         {/* Left rail */}
         <RigidBody type="fixed" position={[x - 0.55, 0.4, 5.5]} colliders="cuboid" restitution={0.15}>
            <mesh>
               <boxGeometry args={[0.1, 0.8, 3]} />
               <meshStandardMaterial color="lightgrey" />
            </mesh>
         </RigidBody>

         {/* Right rail */}
         <RigidBody type="fixed" position={[x + 0.55, 0.4, 5.5]} colliders="cuboid" restitution={0.15}>
            <mesh>
               <boxGeometry args={[0.1, 0.8, 3]} />
               <meshStandardMaterial color="lightgrey" />
            </mesh>
         </RigidBody>
      </>
   )
}  // ShooterLane()

function Plunger({ ballRef, x = 2.5 }) {

   // console.log("ballRef in fn Plunger(): ", ballRef)

   const pulling = useRef(false)
   const power = useRef(0)

   const curve = new HelixCurve({
      radius: 0.25,  // DURCHMESSER, außen der gesamten Feder
      turns: 8,  // ANZAHL der Wicklungen
      height: 0.75,  // LÄNGE der zu erzeugenden Feder

      // offset: (i / strands) * Math.PI * 2,
      offset: 0  // verschiebt die Feder in deren Längsachse
   })

   useEffect(() => {
      const down = (e) => {
         if (e.code === "ArrowDown") pulling.current = true
      }

      const up = (e) => {
         if (e.code === "ArrowDown") {
            pulling.current = false

            if (!ballRef.current) return

            // const launchPower = 10 + power.current * 25 // zustark

            // Forward impulse
            ballRef.current.applyImpulse(
               { x: 0, y: 0, z: -2 },
               true
            )

            // Add proportional topspin
            ballRef.current.applyTorqueImpulse(
               { x: -2, y: 0, z: -1 },
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

   return (
      <RigidBody
         type="fixed"
         position={[x, 0.55, 6.25]}
         colliders="cuboid"
      >
         <mesh>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color='darkgrey' metalness={0.85} roughness={0.65} />
         </mesh>
         <MetalSpring position={[0, 0.15, -1]} rotation={[1.55, -0.15, 0]} color='red' helixCurve={curve} />
      </RigidBody>
   )
}  // Plunger()


/** ------------------------------------------------------------------------ */
//* experimental 
/** ------------------------------------------------------------------------ */

//* Score and display
function ScorePopup({ position, value, onDone }) {

   const groupRef = useRef()
   const [life, setLife] = useState(1) // 1 → 0 fade

   useFrame((_, delta) => {
      if (!groupRef.current) return

      // Float upward
      groupRef.current.position.y += delta * 2

      // Slight scale pop
      groupRef.current.scale.multiplyScalar(1 + delta * 0.6)

      // Fade out
      setLife((prev) => {
         const next = prev - delta * 1.2
         if (next <= 0) onDone()
         return next
      })

      groupRef.current.children[0].material.opacity = life
   })

   return (
      <group ref={groupRef} position={position}>
         <Text
            fontSize={0.5}
            anchorX="center"
            anchorY="middle"
         >
            {value}
            <meshStandardMaterial
               color="yellow"
               transparent
               opacity={life}
               emissive="orange"
               emissiveIntensity={5}
            />
         </Text>
      </group>
   )
}  // ScorePopup

function FlipperTemp({ position, side = "left", length = 2 }) {

   const pivot = useRef()
   const flipper = useRef()
   const joint = useRef()

   const dir = side === "left" ? 1 : -1
   const key = side === "left" ? "ArrowLeft" : "ArrowRight"
   const active = useRef(false)

   /*
     IMPORTANT:
     - Use limits
     - Use velocity motor (more stable than position motor for flippers)
   */

   useRevoluteJoint(
      pivot,
      flipper,
      [
         [0, 0, 0],
         [-dir * length / 2, 0, 0],
         [0, 1, 0]
      ],
      (j) => {
         joint.current = j

         // HARD LIMITS (prevents wobble)
         j.setLimits(dir * -0.4, dir * 0.6)

         // Enable motor
         j.configureMotorVelocity(0, 0)
      }
   )

   // Keyboard
   useEffect(() => {
      const down = (e) => e.code === key && (active.current = true)
      const up = (e) => e.code === key && (active.current = false)

      window.addEventListener("keydown", down)
      window.addEventListener("keyup", up)

      return () => {
         window.removeEventListener("keydown", down)
         window.removeEventListener("keyup", up)
      }
   }, [key])

   // Motor control (velocity-based = MUCH more stable)
   useFrame(() => {
      if (!joint.current) return

      const speed = active.current ? dir * 25 : dir * -20

      joint.current.configureMotorVelocity(
         speed,
         2000 // MAX TORQUE — critical for no wobble
      )
   })

   return (
      <>
         {/* Pivot */}
         <RigidBody type="fixed" ref={pivot} position={position} />

         {/* Flipper */}
         <RigidBody
            ref={flipper}
            type="dynamic"
            colliders="cuboid"
            restitution={0.2}
            friction={0.9}
            angularDamping={4}      // kill oscillation
            linearDamping={1}
            canSleep={false}        // important
         >
            <mesh castShadow>
               <boxGeometry args={[length, 0.35, 0.4]} />
               <meshStandardMaterial
                  color={yellow[400]}
                  metalness={0.85}
                  roughness={0.25}
               />
            </mesh>
         </RigidBody>
      </>
   )
}  // Flipper()