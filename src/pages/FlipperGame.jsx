/**
 * 
 *  Stand: 13.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import * as THREE from 'three'
import { useState, useRef, useEffect, useMemo, forwardRef } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"

import { OrbitControls, Text, useTexture, useGLTF } from "@react-three/drei"
// import { Html } from "@react-three/drei"

import { RigidBody, BallCollider, CuboidCollider, Physics, useRevoluteJoint } from '@react-three/rapier'

import { useNavigate } from 'react-router-dom'
import { AppBar, ButtonGroup, IconButton, Toolbar, Tooltip, Box, Card, Button, Slider, Switch, Typography } from '@mui/material'
import { Fab, Menu, MenuItem } from "@mui/material"

import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'

import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
// import "../components/styles.css"
import MetalSpring, { HelixCurve } from '../components/MetalSpring'

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

/** ------------------------------------------------------------------------ */
//    FlipperGame page component
/** ------------------------------------------------------------------------ */
export default function FlipperGame() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   const ballRef = useRef(null)
   const [noPoints, setNoPoints] = useState(0)
   const [gameOver, setGameOver] = useState(false)
   const [bumperForce, setBumperForce] = useState(1.5)
   const [gameKey, setGameKey] = useState(0)
   const [texture, setTexture] = useState('')
   const [arcadeIntro, setArcadeIntro] = useState(false)

   // object holding all state-variables or constants
   const stateData = {
      ballRef: ballRef,
      noPoints: noPoints,
      gameOver: gameOver,
      bumperForce: bumperForce,
      gameKey: gameKey,
      texture: texture,
      arcadeIntro: arcadeIntro,
      setNoPoints: setNoPoints,
      setGameOver: setGameOver,
      setBumperForce: setBumperForce,
      setGameKey: setGameKey,
      setTexture: setTexture
   }  // stateData

   //* event handler
   function changeBumperForce(event) {
      setBumperForce(event.target.value)
   }  // handleChange() Slider-Components

   //*
   useEffect((e) => {
      console.log('Actual bumperForce: ', bumperForce)
      // setGameOver(e.current.value 
   }, [noPoints, bumperForce, gameOver, gameKey, texture, arcadeIntro])

   //* texture and model preloads:
   useGLTF.preload('/textures/cardboard.png')
   useGLTF.preload('/textures/wood.jpg')
   useGLTF.preload('/textures/rust/speckled-rust_albedo.png')

   // FAB-button with menu
   const [anchorEl, setAnchorEl] = useState(null)
   const handleClick = (event) => { setAnchorEl(event.currentTarget) }
   const handleClose = () => { setAnchorEl(null) }

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
                           onClick={() => {
                              if (gameKey === 0) {
                                 setGameKey(1)
                              }
                              else {
                                 setGameKey(0)
                              }
                              setGameOver(false)
                              setNoPoints(0)
                           }}>
                           New Game
                           {/* {enableCircularProgress && <CircularProgress className='m-1' size={20} color="success" />} */}
                        </Button>
                     </div>

                     {/** Anzeige des Spielstandes */}
                     <Typography
                        className='m-1 border border-success'
                        color='success'
                        variant='h2'
                     >{noPoints}
                     </Typography>
                  </Card>

                  {/** Switches / Slider for restitution on Bumpers, Textures */}
                  <Card className='rounded shadow'>
                     <div className="row m-3 border border-info rounded">
                        <h6>Adjust FORCE of bumpers: </h6>
                        <Slider
                           name='idBumperForce'
                           aria-label="Slider for force"
                           defaultValue={1.5}
                           valueLabelDisplay="auto"
                           step={0.05}
                           min={0.95}
                           max={2}
                           onChange={changeBumperForce}
                           value={bumperForce}
                           disabled={false}
                        />
                     </div>

                     {/** BUTTONGROUP for changing the playfield's texture */}
                     <div className="row m-1 border border-info rounded">
                        <h6>Adjust Texture: </h6>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                           <Button id='idBtnRust' variant='contained'
                              onClick={() => {
                                 setTexture('Rust')
                              }}>
                              Rust
                           </Button>
                           <Button id='idBtnWood' variant='contained'
                              onClick={() => {
                                 setTexture('Wood')
                              }}
                           >
                              Wood
                           </Button>
                           <Button id='idBtnCardBoard' variant='contained'
                              onClick={() => {
                                 setTexture('Cardboard')
                              }}
                           >
                              Cardboard
                           </Button>
                        </ButtonGroup>

                        <Fab color="primary" aria-label="add" onClick={handleClick}>
                           <AddIcon />
                        </Fab>
                        <Menu
                           anchorEl={anchorEl}
                           open={Boolean(anchorEl)}
                           onClose={handleClose}
                           anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                           }}
                           transformOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                           }}
                        >
                           <MenuItem onClick={handleClose}>Option 1</MenuItem>
                           <MenuItem onClick={handleClose}>Option 2</MenuItem>
                           <MenuItem onClick={handleClose}>Option 3</MenuItem>
                        </Menu>
                     </div>
                  </Card>
               </Box>

               {/* COl with the scene / canvas*/}
               <Box orientation='col' className='mt-4 bg-dark-subtle rounded'
                  sx={{ mt: 2, width: '85%', minHeight: '200px', border: '1px solid red' }}
               >
                  <Canvas
                     camera={{ position: [0, 12, 8], fov: 85 }}
                     onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
                     style={{
                        width: "86vw",
                        height: "100vh",
                        display: "block"
                     }}
                     shadows
                  >
                     <ambientLight intensity={0.35} />
                     <directionalLight position={[0, 5, 5]} castShadow />
                     {/* <pointLight position={[1, 5, 1]} color="orange" /> */}

                     {/* <Physics */}
                     <Physics
                        key={gameKey}
                        gravity={[0, -9.81, 0]}
                        timeStep="vary"
                        interpolate
                        colliders={false}
                        solverIterations={30}  // Low solver iterations = soft joints = slow response.
                        maxVelocityIterations={20}
                     // debug
                     >
                        <FlipperScene stateData={stateData} />
                     </Physics>

                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // FlipperGame()

//*
function FlipperScene({ stateData }) {

   const trackPoints = [
      new THREE.Vector3(3.45, 0.05, 4.995),    // entry
      new THREE.Vector3(3.45, 0.15, 4.5),      // climb
      new THREE.Vector3(3, 0.45, -5),     // peak
      new THREE.Vector3(0, 0.15, -6.5),    // drop
      // new THREE.Vector3(0, 5, -7),    // curve right
      // new THREE.Vector3(-2, 5, -8),   // curve left
      // new THREE.Vector3(-3, 3, -7.5)     // exit
   ]

   if (stateData.arcadeIntro) {
      return (
         <ArcadeIntro>
            <mesh>
               <Text
                  position={[0, 6, -5]}
                  fontSize={1.95}
                  anchorX="center"
                  anchorY="middle"
               >
                  {stateData.noPoints}
                  <meshStandardMaterial color={green[200]} metalness={0.95} roughness={0.65} />
               </Text>
            </mesh>

            <Playfield texture={stateData.texture} />
            <Walls />

            <Flipper position={[-2.25, 0.9, 5.8]} side="left" />
            <Flipper position={[2.25, 0.9, 5.8]} side="right" />

            <Ball ref={stateData.ballRef} position={[3.5, 0.3, 5]} onOut={() => { stateData.setGameOver(true) }} />

            {/** DodecahedronGroup */}
            {/* <DodecahedronGroup />  */}

            {/** Bumper oben im Spielfeld */}
            <BumperWithLight position={[0.25, 0.75, -5]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[-2, 0.75, -4]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            <HalvedSphere position={[3.25, 0.15, -5.95]} rotation={[0, 0, 0]} />
            <HalvedSphere position={[-3.25, 0.15, -5.95]} rotation={[0, 0, 0]} />
            <BumperWithLight position={[2.95, 0.75, -4.25]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            {/** Bumper weiter vorne */}
            <BumperWithLight position={[3.75, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[0.25, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[0.25, 0.75, 1.75]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[-3.5, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            <ShooterLane x={3.5} />
            <Plunger ballRef={stateData.ballRef} x={3.5} />

            {/** Texte oberhalb der Spielfläche */}
            {(!stateData.gameOver) &&
               <ScorePopup position={[0, 4.5, -1]} color={green[900]} value='NEW Game!' />
            }
            {(stateData.gameOver) &&
               <ScorePopup position={[0, 4.5, -1]} color={red[500]} value='Game over!' />
            }

            {/** Abweiser unten links */}
            <HalvedSphere position={[-3.75, 0.85, 2.5]} rotation={[1.55, 0, 1]} />
            <HalvedSphere position={[-3.5, 0.85, 3.5]} rotation={[1.55, 0, 1]} />
            <HalvedSphere position={[-3.35, 0.9, 4.5]} rotation={[1.55, 0, 0.95]} />
            <HalvedSphere position={[-2.85, 0.9, 5]} rotation={[1.55, 0, 0.9]} />
         </ArcadeIntro>
      )
   } else {
      return (
         <>
            < mesh >
               <Text
                  position={[0, 6, -5]}
                  fontSize={1.95}
                  anchorX="center"
                  anchorY="middle"
               >
                  {stateData.noPoints}
                  <meshStandardMaterial color={green[200]} metalness={0.95} roughness={0.65} />
               </Text>
            </mesh >

            <Playfield texture={stateData.texture} />
            <Walls />

            <Flipper position={[-2.25, 0.9, 5.8]} side="left" />
            <Flipper position={[2.25, 0.9, 5.8]} side="right" />

            <Ball ref={stateData.ballRef} position={[3.5, 0.3, 5]} onOut={() => { stateData.setGameOver(true) }} />

            {/** Bumper oben im Spielfeld */}
            <BumperWithLight position={[0.25, 0.75, -5]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[-2, 0.75, -4]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            <HalvedSphere position={[3.25, 0.15, -5.95]} rotation={[0, 0, 0]} />
            <HalvedSphere position={[-3.25, 0.15, -5.95]} rotation={[0, 0, 0]} />
            <BumperWithLight position={[2.95, 0.75, -4.25]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            {/** Bumper weiter vorne */}
            <BumperWithLight position={[3.75, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[0.25, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[0.25, 0.75, 1.75]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[-3.5, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            <ShooterLane x={3.5} />
            <Plunger ballRef={stateData.ballRef} x={3.5} />

            {/**  */}
            <RollerCoasterTrack points={trackPoints}/>

            {/** Texte oberhalb der Spielfläche */}
            {
               (!stateData.gameOver) &&
               <ScorePopup position={[0, 4.5, -1]} color={green[900]} value='NEW Game!' />
            }
            {
               (stateData.gameOver) &&
               <ScorePopup position={[0, 4.5, -1]} color={red[500]} value='Game over!' />
            }

            {/** Abweiser unten links */}
            <HalvedSphere position={[-3.75, 0.85, 2.5]} rotation={[1.55, 0, 1]} />
            <HalvedSphere position={[-3.5, 0.85, 3.5]} rotation={[1.55, 0, 1]} />
            <HalvedSphere position={[-3.35, 0.9, 4.5]} rotation={[1.55, 0, 0.95]} />
            <HalvedSphere position={[-2.85, 0.9, 5]} rotation={[1.55, 0, 0.9]} />
         </>
      )
   }
}  // 

//*
function Playfield({ texture = '' }) {

   let meshTexture = null
   let meshTextureRust = useTexture('/textures/rust/speckled-rust_albedo.png')
   let meshTextureWood = useTexture('/textures/wood.jpg')
   let meshTextureCardboard = useTexture('/textures/cardboard.png')

   switch (texture) {
      case 'Rust':
         meshTexture = meshTextureRust
         break;
      case 'Wood':
         meshTexture = meshTextureWood
         break;
      case 'Cardboard':
         meshTexture = meshTextureCardboard
         break;
      default:
         break;
   }

   // useEffect(() => { },
   //    [meshTexture])

   return (
      <RigidBody
         type="fixed"
         rotation={[-0.025, 0, 0]} // slope
         colliders={false}
      >
         {/** Decoration on the lower edge of the playfield */}
         <group name='grpDecoTop'>
            <mesh position={[-3, 3.5, -7]} receiveShadow>
               <dodecahedronGeometry args={[0.95]} />
               <meshStandardMaterial metalness={0} roughness={0.15} color={red[500]} emissive="red" opacity={0.75} transparent
                  emissiveIntensity={0}
               />
               <pointLight color="red" intensity={0} distance={4} decay={0} />
            </mesh>
            <mesh position={[0, 3.5, -7]} receiveShadow>
               <dodecahedronGeometry args={[0.95]} />
               <meshStandardMaterial metalness={0} roughness={0.15} color={yellow[500]} emissive="yellow" opacity={0.75} transparent
                  emissiveIntensity={0} />
               <pointLight color="yellow" intensity={0} distance={4} decay={0} />
            </mesh>
            <mesh position={[3, 3.5, -7]} receiveShadow>
               <dodecahedronGeometry args={[0.95]} />
               <meshStandardMaterial metalness={0} roughness={0.15} color={green[500]} emissive="green" opacity={0.75} transparent
                  emissiveIntensity={0} />
               <pointLight color="green" intensity={0} distance={4} decay={0} />
            </mesh>
         </group>

         {/* Floor */}
         <CuboidCollider
            args={[4.5, 0.2, 7]}   // half sizes!
            position={[0, 0, 0]}
            restitution={0.15}
         />
         <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[9, 0.45, 14]} />
            <meshStandardMaterial
               color={meshTexture ? green[100] : green[200]}
               map={meshTexture ? meshTexture : null}
               metalness={meshTexture ? 0.15 : 0.5}
               roughness={meshTexture ? 0.45 : 0.45}
            />
            <Hole position={[-2.25, 0.15, 4]} />
         </mesh>

         {/** Ceiling / Lid on playfield */}
         <CuboidCollider
            args={[4.5, 0.25, 7]}   // half sizes!
            position={[0, 2.5, 0]}
            restitution={0.1}
         />
         <mesh position={[0, 2.65, 0]} rotation={[0.025, 0, 0]}>
            <boxGeometry args={[9, 0.5, 14]} />
            <meshStandardMaterial color="lightblue" metalness={0} roughness={0.15} opacity={0.15} transparent />
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

function BumperWithLight({ position = [0, 0, 0], noPoints, setNoPoints, bumpPoints = 10, bumperForce = 0.9 }) {

   const bumperBodyRef = useRef()
   const bumperTopRef = useRef()
   const lightRef = useRef()
   const flash = useRef(0)

   // useFrame for flash-effect when a bumper is hit 
   useFrame((_, delta) => {
      if (!bumperBodyRef.current || !lightRef.current) return

      // Fade flash down over time
      flash.current = Math.max(0, flash.current - delta * 4)

      const intensity = flash.current

      // Emissive glow
      bumperBodyRef.current.material.emissiveIntensity = intensity * 3
      bumperTopRef.current.material.emissiveIntensity = intensity * 3

      // Light burst
      lightRef.current.intensity = intensity * 10
   })  // useFrame 

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
               const force = bumperForce  // best between 0.9 and 1.25

               ball.applyImpulse({ x: (dx / len) * force, y: 0, z: (dz / len) * force }, true)
               ball.applyTorqueImpulse({ x: -dz * 10, y: 0, z: dx * 10 }, true)

               // ---- VISUAL FLASH ----
               flash.current = 1

               // ---- just count value for hit / collisions ---- 
               setNoPoints(noPoints + bumpPoints)
            }}
            ccd
         >
            <BallCollider args={[0.65]} />

            <group>
               {/** Body of the bumper */}
               <mesh ref={bumperBodyRef} castShadow>
                  <sphereGeometry args={[0.75, 64, 64]} />
                  <meshStandardMaterial
                     color="red"
                     emissive="red"
                     emissiveIntensity={0}
                     metalness={0.9}
                     roughness={0.4}
                  />
               </mesh>
               {/** Ring on top of the bumper */}
               <mesh ref={bumperTopRef} position={[0, 0.65, 0]} rotation={[1.55, 0, 0]} castShadow>
                  <torusGeometry
                     args={[
                        0.45, // INNER ring radius
                        0.15, // OUTER tube radius = metal thickness
                        32,   // radial segments (low = sharp edge)
                        32,   // tubular segments
                     ]}
                  />
                  <meshStandardMaterial
                     color="orange"
                     emissive="orange"
                     emissiveIntensity={0}
                     metalness={0.9}
                     roughness={0.4}
                  />
               </mesh>
            </group>

            {/* Flash Light */}
            <pointLight
               ref={lightRef}
               color="red"
               intensity={0}
               distance={4}
               decay={2}
            />
         </RigidBody>
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
   const active = useRef(false)

   const dir = side === "left" ? 1 : -1
   const key = side === "left" ? "ArrowLeft" : "ArrowRight"

   // Create hinge joint
   const joint = useRevoluteJoint(
      pivot,
      flipper,
      [
         [0, 0, 0],                 // pivot local anchor
         [-dir * length / 2, 0, 0], // flipper local anchor
         [0, 1, 0]                  // hinge axis (Y axis)
      ],
      //?: 
      (j) => {
         j.setLimits(dir * -0.35, dir * 0.6)
         j.configureMotorVelocity(0, 0)
      }
   )

   // Keyboard controls
   useEffect(() => {
      const down = (e) => {
         e.code === key && (active.current = true)
         // joint.current?.configureMotorVelocity(dir * 45, 64)
      }
      const up = (e) => {
         e.code === key && (active.current = false)
         // joint.current?.configureMotorVelocity(dir * -1, 0)
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


      const activeAngle = dir * 0.75
      const restAngle = dir * -0.25

      if (active.current) {
         // joint.current.configureMotorPosition(targetAngle, stiffness, damping)
         joint.current.configureMotorPosition(
            activeAngle,
            4000,   // stiffness, 3k - 4k
            50      // damping
         )
      } else {
         joint.current.configureMotorPosition(
            restAngle,
            500,
            50
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
            restitution={0.85}
            friction={0.1}
            angularDamping={1}
            linearDamping={0.5}
            // enabledTranslations={[false, false, false]}  {/** creates strange errors */}
            enabledRotations={[false, true, false]}
            canSleep={false}
            mass={2}               // realistic inertia
         // ccd
         >
            <mesh castShadow>
               {/** works; capsuleGeometry, extrudeGeometry does not */}
               {/* <boxGeometry args={[length, 0.35, 0.4, 32, 32, 32]} /> */}

               <boxGeometry args={[length, 0.95, 0.2, 32, 32, 32]} />
               {/* <capsuleGeometry args={[0.2, length - 0.4, 16, 32]} rotation={[Math.PI / 2, 0, 0]}/> */}
               {/* <extrudeGeometry args={[flipperShape(length), { depth: 0.4, bevelEnabled: false }]} /> */}

               <meshStandardMaterial color='orange' metalness={0.95} roughness={0.45} />

               {/** LEFT == 1, RIGHT == -1 */}
               {dir === 1 &&
                  <>
                     {/* <PlanetWithHole position={[-1.175, 0.6, 0.13]}      rotation={[0, 0, -1.55]} textureColors={['darkgreen', 'lightgreen', 'green']} /> */}
                     <HalvedSphere radius={0.35} position={[0.65, 0, 0]} rotation={[-1.55, 0, 0]} />
                  </>
               }
               {dir === -1 &&
                  <>
                     {/* <PlanetWithHole position={[1.175, -0.5, 0.13]} rotation={[0, 0, 1.55]} textureColors={['red', 'darkred', 'pink']} /> */}
                     <HalvedSphere radius={0.35} position={[-0.65, 0, 0]} rotation={[-1.55, 0, 0]} />
                  </>
               }
            </mesh>

            <pointLight color="red" intensity={0.95} distance={5} decay={0} />
         </RigidBody>
      </>
   )
}  // Flipper()

// function Ball({ position, ballRef }) {
const Ball = forwardRef(({ position, onOut }, ref) => {

   // console.log("ballRef:", ref)

   // so wird der Impuls nicht bei jedem Render erneut erzeugt:
   useEffect(() => {
      setTimeout(() => {
         ref.current?.setLinvel({ x: 0, y: 0, z: 0 }, true)
         ref.current?.setAngvel({ x: 0, y: 0, z: 0 }, true)
      }, 2000)
   }, [ref])

   // Position des Balles, um Game Over festzustellen:
   useFrame(() => {
      if (!ref.current) return

      const pos = ref.current.translation()

      // Playfield bounds (must match your field size)
      const X_LIMIT = 4.5  // x-wert des cuboidCollider für den Ball 
      const Z_LIMIT = 7    // z-wert des cuboidCollider für den Ball
      const Y_LIMIT = -1   // y-Wert, Ball fell through

      if (Math.abs(pos.x) > X_LIMIT || Math.abs(pos.z) > Z_LIMIT || pos.y < Y_LIMIT) {
         onOut()
      }
   })

   // 
   return (
      <RigidBody
         ref={ref}
         name='ball'
         type="dynamic"
         colliders={false}
         restitution={0.75}
         friction={0.05}
         linearDamping={0.05}
         angularDamping={0.05}
         position={position}
         mass={5}
         ccd  // collision detection 
      // gravityScale={0.95}  // soll versinken des balls verhindern 
      >
         <BallCollider args={[0.35]} />

         <mesh castShadow >
            <sphereGeometry args={[0.35, 64, 64]} />
            <meshStandardMaterial color={green[500]} metalness={0.95} roughness={0.15} />
         </mesh>
      </RigidBody>
   )
}) // Ball()

//*
function ShooterLane({ x = 2.5 }) {

   return (
      <>
         {/* Lane floor */}
         <RigidBody
            type="fixed"
            friction={0.05}
            restitution={0.5}
            position={[x, 0.5, 6]}
            rotation={[-0.15, 0, 0]}
            colliders="cuboid"
         >
            <mesh receiveShadow>
               <boxGeometry args={[0.75, 0.01, 2]} />
               <meshStandardMaterial color="grey" />
            </mesh>
         </RigidBody>

         {/* Left rail */}
         <RigidBody type="fixed" position={[x - 0.55, 0.65, 6]} colliders="cuboid" restitution={0.5}>
            <mesh>
               <boxGeometry args={[0.1, 0.8, 2]} />
               <meshStandardMaterial color="lightgrey" />
            </mesh>
         </RigidBody>

         {/* Right rail */}
         <RigidBody type="fixed" position={[x + 0.55, 0.65, 6]} colliders="cuboid" restitution={0.5}>
            <mesh>
               <boxGeometry args={[0.1, 0.8, 2]} />
               <meshStandardMaterial color="lightgrey" />
            </mesh>
         </RigidBody>

         {/** tube in front of lane */}
         <Tube position={[x, 0.75, 5.5]} rotation={[0, 1.55, 0]} />
      </>
   )
}  // ShooterLane()

//*
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

            // Forward impulse
            ballRef.current.applyImpulse(
               { x: -1, y: 0, z: -3 },
               true
            )

            // Add proportional topspin
            ballRef.current.applyTorqueImpulse(
               { x: -0.5, y: 0, z: -0.5 },
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
         position={[x, 0.55, 6.75]}
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
function ScorePopup({ position, color = 'darkred', value }) {

   const groupRef = useRef()
   const [life, setLife] = useState(1) // 1 → 0 fade

   useFrame((_, delta) => {
      if (!groupRef.current) return

      // Float upward
      groupRef.current.position.y += delta * 0.5

      // Slight scale pop
      groupRef.current.scale.multiplyScalar(1 + delta * 0.5)

      // Fade out: Länge des Effektes in next
      setLife((prev) => {
         const next = prev - delta * 0.5
         return next
      })

      groupRef.current.children[0].material.opacity = life
   })

   return (
      <group ref={groupRef} position={position}>
         <Text
            fontSize={1.5}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="black"
         >
            {value}
            <meshStandardMaterial
               color={color}
               transparent
               opacity={life}
               emissive="darkred"
               emissiveIntensity={1}
            />
         </Text>
      </group>
   )
}  // ScorePopup

//*
function ArcadeIntro({ children }) {

   const group = useRef()
   const time = useRef(0)

   useFrame((_, delta) => {

      if (!group.current) return

      // deco-group positioned on top of playfield
      let actGrp = group.current.getObjectByName('grpDecoTop')

      time.current += delta
      const t = time.current

      // Drop from above
      const dropHeight = 6
      const duration = 1.75

      if (t < duration) {
         const progress = t / duration

         // Ease out cubic
         const eased = 1 - Math.pow(1 - progress, 3)

         group.current.position.y = dropHeight * (1 - eased)

         // Quick spin while dropping
         group.current.rotation.y = Math.PI * 2 * (1 - eased)

         // Tiny tilt for arcade feel
         group.current.rotation.x = 0.2 * (1 - eased)

         //* illumminate deco-objects
         // actGrp.children[0].material.emissiveIntensity = 3
         // actGrp.children[0].material.intensity = 1.5
         // ...children[1], children[2]

      } else {
         // Bounce settle
         const bounce = Math.sin((t - duration) * 12) * 0.05 * Math.exp(-(t - duration) * 3)
         group.current.position.y = bounce
         group.current.rotation.x = bounce * 0.5

         //* switch off illumination for deco-objects
         // actGrp.children[0].material.emissiveIntensity = 0
         // actGrp.children[0].material.intensity = 0
      }
   })

   return <group ref={group}>{children}</group>
}  // ArcadeIntro()

//*
function LightSweep() {

   const light = useRef()
   const time = useRef(0)

   useFrame((_, delta) => {
      if (!light.current) return

      time.current += delta
      const t = time.current

      const duration = 1.5

      if (t < duration) {
         const progress = t / duration

         // Move left → right across playfield
         light.current.position.x = -6 + progress * 12

         // Slight intensity fade out
         light.current.intensity = 4 * (1 - progress)
      } else {
         light.current.intensity = 0
      }
   })

   return (
      <spotLight
         ref={light}
         position={[0, 3, 0]}
         angle={0.4}
         penumbra={0.8}
         intensity={4}
         castShadow
         color="#ffffff"
      />
   )
}

//*
function HalvedSphere({
   radius = 0.55,
   position = [0, 0.15, 0],
   rotation = [0, 0, 0],
   releaseAfter = 3000 // milliseconds
}) {

   const rigidRef = useRef()

   // useEffect(() => {
   //    const timer = setTimeout(() => {
   //       if (rigidRef.current) {
   //          rigidRef.current.setBodyType("dynamic", true)
   //       }
   //    }, releaseAfter)

   //    return () => clearTimeout(timer)
   // }, [releaseAfter])  // so laßen sich die collider verschieben, der Ball wird nicht gefangen

   return (
      <RigidBody ref={rigidRef} type="fixed" colliders='hull' restitution={0.5}>

         <mesh position={position} rotation={rotation}>
            <sphereGeometry
               args={[
                  radius,       // radius
                  64,         // width segments
                  64,         // height segments
                  0,          // phiStart
                  Math.PI * 2,// phiLength (full around)
                  0,          // thetaStart
                  Math.PI / 2 // thetaLength (half sphere)
               ]}
            />
            <meshStandardMaterial color={grey[100]} metalness={0.95} roughness={0.45} side={2} />
            <pointLight color="white" intensity={0.25} distance={10} decay={0} />
         </mesh>
      </RigidBody>
   )
}  // HalvedSphere()

//*
function Tube({ position = [0, 0.35, 0], rotation = [0, 0, 0] }) {

   const length = 1  //Breite des Bogens / Länge des Rohres
   const halfWidth = length / 2.5

   const radius = 1.5;
   const arc = radius - Math.sqrt(radius * radius - halfWidth * halfWidth);

   const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-length / 2.5, 0, 0),  // x, y, z
      new THREE.Vector3(0, arc, 0),  // rotation of the arc
      new THREE.Vector3(length / 2.5, 0, 0)
   )


   // const geometry = new THREE.TubeGeometry(
   //   curve,
   //   tubularSegments,
   //   tubeRadius,
   //   radialSegments,
   //   closed
   // );

   return (
      <RigidBody type='fixed' position={position} rotation={rotation} colliders='cuboid'>
         <mesh receiveShadow>

            <tubeGeometry args={[curve, 32, 0.5, 32, true]} />
            {/* <meshStandardMaterial color="#444" metalness={0.85} roughness={0.45} /> */}
            <meshStandardMaterial color="red" metalness={0.85} roughness={0.25} />
         </mesh>
      </RigidBody>
   )
}  // Tube()

//*
function Hole({ position = [0, 0, 0] }) {

   const ballRef = useRef(null)
   const timeoutRef = useRef(null)

   const handleEnter = (payload) => {

      const body = payload.rigidBodyObject
      if (!body || timeoutRef.current) return

      ballRef.current = body

      // Freeze ball
      body.setLinvel({ x: 0, y: 0, z: 0 }, true)
      body.setAngvel({ x: 0, y: 0, z: 0 }, true)
      body.setGravityScale(0, true)

      // Hold for 2 seconds
      timeoutRef.current = setTimeout(() => {
         if (!ballRef.current) return

         // Re-enable gravity
         ballRef.current.setGravityScale(1, true)

         // Apply impulse upward + forward
         ballRef.current.applyImpulse(
            { x: 0, y: 5, z: -3 },
            true
         )

         // Apply torque for spin
         ballRef.current.applyTorqueImpulse(
            { x: 2, y: 0, z: 0 },
            true
         )

         timeoutRef.current = null
         ballRef.current = null
      }, 2000)
   }

   return (
      <RigidBody type="fixed" position={position} colliders={false}>
         {/* Visual hole */}
         <mesh>
            <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
            <meshStandardMaterial color="orange" />
         </mesh>

         {/* Sensor area */}
         <CuboidCollider
            args={[0.6, 0.2, 0.6]}
            position={position}
            sensor
            onIntersectionEnter={handleEnter}
         />
      </RigidBody>
   )
}  // Hole for the playfield

//*
function RollerCoasterTrack({
   points = [],
   segments = 200,
   width = 2
}) {

   const curveData = useMemo(() => {
      const curve = new THREE.CatmullRomCurve3(points)
      const divisions = segments

      const data = []

      for (let i = 0; i < divisions; i++) {
         const t1 = i / divisions
         const t2 = (i + 1) / divisions

         const p1 = curve.getPoint(t1)
         const p2 = curve.getPoint(t2)

         const midpoint = new THREE.Vector3()
            .addVectors(p1, p2)
            .multiplyScalar(0.5)

         const direction = new THREE.Vector3()
            .subVectors(p2, p1)

         const length = direction.length()

         const quaternion = new THREE.Quaternion()
         quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.clone().normalize()
         )

         data.push({
            position: midpoint,
            quaternion,
            length
         })
      }

      return data
   }, [points, segments])

   return (
      <RigidBody type="fixed" colliders={false}>
         {curveData.map((segment, i) => (
            <group key={i}>
               <mesh
                  position={segment.position}
                  quaternion={segment.quaternion}
               >
                  <boxGeometry args={[width, segment.length, 0.3]} />
                  <meshStandardMaterial
                     color="orange"
                     metalness={0.85}
                     roughness={0.325}
                  />
               </mesh>

               <CuboidCollider
                  args={[width / 2, segment.length / 2, 0.15]}
                  position={segment.position}
                  quaternion={segment.quaternion}
                  friction={0.15}
               />
            </group>
         ))}
      </RigidBody>
   )
}
