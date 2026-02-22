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

import { Center, OrbitControls, Text, Text3D, useTexture, useGLTF, Html } from "@react-three/drei"
import { RoundedBox } from "@react-three/drei"
import { Trail, Float, Line, Sphere, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

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
// import { ExplodingBox } from './Colliders'


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
   const [texture, setTexture] = useState('')
   const [arcadeIntro, setArcadeIntro] = useState(false)
   const [physicsKey, setPhysicsKey] = useState(0)  // for resetting physics state  

   // object holding all state-variables or constants
   const stateData = {
      ballRef: ballRef,
      noPoints: noPoints,
      gameOver: gameOver,
      bumperForce: bumperForce,
      texture: texture,
      arcadeIntro: arcadeIntro,
      setNoPoints: setNoPoints,
      setGameOver: setGameOver,
      setBumperForce: setBumperForce,
      setTexture: setTexture,
      setPhysicsKey: setPhysicsKey
   }  // stateData

   //* event handler
   function changeBumperForce(event) {
      setBumperForce(event.target.value)
   }  // handleChange() Slider-Components

   //*
   useEffect((e) => {
      console.log('Actual bumperForce: ', bumperForce)
      // setGameOver(e.current.value 
   }, [noPoints, bumperForce, gameOver, texture, arcadeIntro, physicsKey])

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
                           onClick={() => {
                              setGameOver(false)
                              setNoPoints(0)
                              setPhysicsKey(prev => prev + 1)  // changing physicsKey remounts the Physics component and thus resets the physics world 
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
                        sx={{ textAlign: 'center' }}
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
                  </Card>

                  {/** BUTTONGROUP for changing the playfield's texture */}
                  <Card className='rounded shadow'>
                     <div className="row m-1 border border-info rounded">
                        <h6>Adjust Texture: </h6>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                           <Button id='idBtnRust' variant='contained'
                              onClick={() => {
                                 setTexture('Rust')
                                 setPhysicsKey(prev => prev + 1)
                              }}>
                              Rust
                           </Button>
                           <Button id='idBtnWood' variant='contained'
                              onClick={() => {
                                 setTexture('Wood')
                                 setPhysicsKey(prev => prev + 1)
                              }}
                           >
                              Wood
                           </Button>
                           <Button id='idBtnCardBoard' variant='contained'
                              onClick={() => {
                                 setTexture('Cardboard')
                                 setPhysicsKey(prev => prev + 1)
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

                     {/* <Physics 
                     Changing physicsKey completely destroys and remounts the Rapier physics world
                     */}
                     <Physics
                        key={physicsKey}
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
      new THREE.Vector3(3.45, 0.45, 2),      // climb
      // new THREE.Vector3(0, 0.95, -2.5),     // peak
      // new THREE.Vector3(0, 0.75, -3.5),    // drop
      // new THREE.Vector3(0, 5, -7),    // curve right
      new THREE.Vector3(-2, 5, -8),   // curve left
      // new THREE.Vector3(-3, 3, -7.5)     // exit
   ]  // data for RollerCoasterTrack 

   const tubeTrackPoints = [
      new THREE.Vector3(0, 2, 5),
      new THREE.Vector3(0, 5, 0),
      new THREE.Vector3(0, 8, -5),
      // new THREE.Vector3(3, 4, -12),
      // new THREE.Vector3(-3, 6, -18),
      // new THREE.Vector3(0, 3, -25)
   ]  // data for TubeTrack

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

            {/* <EffectComposer>
               <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
            </EffectComposer> */}
            {/* <Electron position={[0, 5, -7]} rotation={[0, 0, 0]} /> */}
            {/* <Float speed={4} rotationIntensity={1} floatIntensity={2}>
               <Electron position={[0, 5, -7]} rotation={[0, 0, 0]} />
            </Float> */}

            {/** Display for points */}
            <PointsDisplay noPoints={stateData.noPoints} gameOver={stateData.gameOver} />

            {/* <Text3D font="/fonts/helvetiker_regular.typeface.json" position={[0, 5, 0]} rotation={[0, 0, 0]}>
               R3F 3d Text 
            </Text3D> */}

            {/** Spielfeld */}
            <Playfield texture={stateData.texture} />
            <Walls />

            <Flipper position={[-2.25, 0.95, 5.8]} side="left" />
            <Flipper position={[2.25, 0.95, 5.8]} side="right" />

            {(!stateData.gameOver) && <Ball ref={stateData.ballRef} position={[3.5, 0.3, 5]} stateData={stateData} />}

            {/** Bumper oben im Spielfeld */}
            <BumperWithLight position={[0.25, 0.75, -5]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[-2, 0.75, -4]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            {/** Bumper im Spielfeld hinten rechts  */}
            <BumperWithLight position={[5.95, 0.75, -5.25]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[6.05, 0.75, -8.25]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            {/** Bumper weiter vorne */}
            <BumperWithLight position={[3.75, 0.75, -3]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[0.25, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />
            <BumperWithLight position={[0.25, 0.75, 1.75]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            <BumperWithLight position={[-3.5, 0.75, -1]} noPoints={stateData.noPoints} setNoPoints={stateData.setNoPoints} bumperForce={stateData.bumperForce} />

            {/**  */}
            {/* <RollerCoasterTrack points={trackPoints}/> */}

            <ShooterLane x={3.5} />
            <Plunger ballRef={stateData.ballRef} x={3.5} />

            {/* Ringe vor der Feder des Plunger*/}
            <RubberRing position={[3.5, 0.95, 4.95]} args={[0.75, 0.05, 16, 64]} color="#666" />
            <RubberRing position={[3.5, 0.95, 5.10]} args={[0.75, 0.15, 16, 64]} color="grey" />
            <RubberRing position={[3.5, 0.95, 5.35]} args={[0.75, 0.2, 16, 64]} color="darkgrey" />

            {/** Ringe im hinteren Bereich */}
            <RubberRing position={[-3.25, 0.95, -6.5]} args={[0.5, 0.45, 16, 64]} color="darkgreen" withCollider={true} />

            {/** Ring im Spielfeldbereich hinten rechts */}
            <RubberRing position={[3.95, 0.85, -10.5]} args={[0.5, 0.45, 16, 64]} color="darkred" withCollider={true} />
            <RubberRing position={[7.25, 0.85, -10.5]} args={[0.5, 0.45, 16, 64]} color="darkred" withCollider={true} />

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
}  // FlipperScene()

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

   return (
      <RigidBody
         type="fixed"
         rotation={[-0.025, 0, 0]} // slope
         colliders={false}
      >
         {/** Decoration on the upper edge of the playfield */}
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
            args={[5, 0.225, 7.5]}   // half sizes!
            position={[0, 0, 0]}
            restitution={0.15}
         />
         <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[10, 0.45, 15]} />
            <meshStandardMaterial
               color={meshTexture ? green[100] : green[200]}
               map={meshTexture ? meshTexture : null}
               metalness={meshTexture ? 0.15 : 0.5}
               roughness={meshTexture ? 0.45 : 0.45}
            />
            <Hole position={[-2.25, 0.15, 4]} />
         </mesh>

         {/** zone upper right */}
         <CuboidCollider
            args={[2.5, 0.2, 3.85]}   // half sizes of the geometry used
            position={[5.5, 0.05, -7.25]}  // must match with position of the mesh 
            restitution={0.15}
         />
         <mesh position={[5.5, 0.05, -7.25]} receiveShadow>
            <boxGeometry args={[5, 0.4, 7.70]} />
            <meshStandardMaterial
               color={meshTexture ? red[100] : red[500]}
               map={meshTexture ? meshTexture : null}
               metalness={meshTexture ? 0.15 : 0.5}
               roughness={meshTexture ? 0.25 : 0.15}
            />
         </mesh>

         {/** Ceiling / Lid on main playfield */}
         <CuboidCollider
            args={[4.5, 0.25, 7]}   // half sizes!
            position={[0, 2.5, 0]}
            restitution={0.1}
         />
         <mesh position={[0, 2.65, 0]} rotation={[0.025, 0, 0]}>
            <boxGeometry args={[9, 0.5, 14]} />
            <meshStandardMaterial color="lightblue" metalness={0} roughness={0.15} opacity={0.15} transparent />
         </mesh>

         {/** Ceiling / Lid on playfield upper right*/}
         <CuboidCollider
            args={[2.5, 0.25, 3.85]}   // half sizes!
            position={[6, 2.5, -5]}
            restitution={0.1}
         />
         <mesh position={[5.5, 2.65, -7.25]} rotation={[0.025, 0, 0]}>
            <boxGeometry args={[5, 0.5, 7.75]} />
            <meshStandardMaterial color="red" metalness={0} roughness={0.15} opacity={0.15} transparent />
         </mesh>

      </RigidBody>
   )
}  // PlayField()

function Walls() {

   const wall = (pos, size) => (
      // <RigidBody type="fixed" position={pos} rotation={[0, 0, 0]} colliders="cuboid" restitution={0.65} friction={0.05}>
      <RigidBody type="fixed" position={pos} rotation={[0, 0, 0]} colliders={false}>

         <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} restitution={0.5} friction={0.05} />

         <mesh>
            <boxGeometry args={size} />
            <meshStandardMaterial color="lightgreen" opacity={0.5} transparent />
         </mesh>
      </RigidBody>
   )

   return (
      <>
         {/**   pos,            size      */}
         {wall([-4.5, 0.75, 0], [0.3, 3, 14])}

         {wall([4.5, 0.75, 2], [0.3, 3, 10])}

         {/** Rückwand Hauptfeld */}
         {wall([-0.75, 0.75, -7], [7, 3, 0.3])}

         {/** Umrandung vorne rechts */}
         {wall([6.15, 0.75, -3.5], [3.75, 3, 0.3])}
         {/** Umrandung hinten rechts */}
         {wall([5.5, 0.75, -11], [5, 3, 0.3])}
         {/** Umrandung hinten links */}
         {wall([3, 0.75, -9], [0.3, 3, 4])}
         {/** Umrandung hinten links */}
         {wall([3, 0.75, -9], [0.3, 3, 4])}
         {/** Umrandung hinten rechts außen */}
         {wall([8, 0.75, -7.25], [0.3, 3, 7])}
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
               ball.applyTorqueImpulse({ x: -dz * 10, y: 0, z: -dx * 10 }, true)

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
                     roughness={0.25}
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
         {/* Invisible fixed pivot / axis*/}
         <RigidBody type="fixed" ref={pivot} position={position} />

         {/* Flipper */}
         <RigidBody
            ref={flipper}
            type="dynamic"
            colliders="hull"  // using trimesh causes error
            restitution={0.9}
            friction={0.1}
            angularDamping={0.5}
            linearDamping={0.25}
            // enabledTranslations={[false, false, false]}  {/** creates strange errors */}
            enabledRotations={[false, true, false]}
            canSleep={false}
            mass={2}               // realistic inertia
         // ccd
         >
            <mesh castShadow>
               {/** works; capsuleGeometry, extrudeGeometry does not */}
               <boxGeometry args={[length, 0.95, 0.15, 32, 32, 32]} />

               <meshStandardMaterial color='orange' metalness={0.95} roughness={0.45} />

               {/* <RoundedBox args={[4, 1.25, 1]} radius={0.25} smoothness={4}></RoundedBox> */}

               {/* <RoundedBox args={[4, 1.25, 1]} radius={0.25} smoothness={4} >
                  <meshStandardMaterial color={green[100]} metalness={0.85} roughness={0.35} opacity={0.95} transparent />
               </RoundedBox> */}

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
const Ball = forwardRef(({ position, stateData }, ref) => {

   // so wird der Impuls nicht bei jedem Render erneut erzeugt:
   useEffect(() => {
      if (!ref.current) return

      const timer = setTimeout(() => {
         ref.current.wakeUp()
         ref.current.setLinvel({ x: 0, y: 0, z: -1 }, true)
         ref.current.setAngvel({ x: 0, y: 0, z: 2 }, true)
      }, 3000)

      return () => clearTimeout(timer)
   }, [ref])

   // Position des Balles ermitteln, um Game Over festzustellen:
   useFrame(() => {
      // if (!ref.current) return
      if (!ref.current?.isValid()) return

      const pos = ref.current.translation()  // aktuelle Position des Balles 

      // Playfield bounds (must match your field size)
      const X_LIMIT = 20    // x-wert des cuboidCollider für den Ball 
      const Y_LIMIT = -1.25   // y-Wert, Ball fell through
      const Z_LIMIT = 22      // z-wert des cuboidCollider für den Ball

      if (Math.abs(pos.x) > X_LIMIT || pos.y < Y_LIMIT || Math.abs(pos.z) > Z_LIMIT) {
         ref.current = null  // Ball-Referenz zurücksetzen  //???
         stateData.setPhysicsKey(prev => prev + 1)  // Physics World neu starten, um "toten" Ball zu entfernen 
         stateData.setGameOver(true)
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
            position={[x, 0.45, 6]}
            rotation={[-0.05, 0, 0]}
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

   const pulling = useRef(false)
   const power = useRef(0)

   const springRef = useRef()
   const boxRef = useRef()

   const curve = new HelixCurve({
      radius: 0.2,  // DURCHMESSER, außen der gesamten Feder
      turns: 6,  // ANZAHL der Wicklungen
      height: 0.65,  // LÄNGE der zu erzeugenden Feder

      // offset: (i / strands) * Math.PI * 2,
      offset: 0  // verschiebt die Feder in deren Längsachse
   })

   useEffect(() => {

      const down = (e) => {
         if (!ballRef.current) return
         if (e.code === "ArrowDown") pulling.current = true
      }

      const up = (e) => {
         if (!ballRef.current) return

         if (e.code === "ArrowDown") {
            pulling.current = false

            // Forward impulse
            ballRef.current?.applyImpulse(
               { x: -0.15, y: 0, z: -4 },
               true
            )

            // Add proportional topspin
            ballRef.current?.applyTorqueImpulse(
               { x: -0.15, y: 0, z: -0.15 },
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
         position={[x, 0.65, 6.75]}

         colliders="cuboid"
         onClick={() => {
            if (!ballRef.current) return
            if (!boxRef.current) return
            if (!springRef.current) return

            //* Hammer und Feder animieren
            console.log(boxRef.current.rotation)
            console.log(springRef.current.scale)

            // boxRef.current.rotation = { isEuler: true, _x: 0, _y: 0, _z: 0, _order: 'XYZ', x: 0, y: 0, z: -2 }
            // let springScale = springRef.current.scale.y

            if (boxRef.current.rotation.x === 0) {

               boxRef.current.rotation.set(Math.PI / 2, 0, 0)  // nach vorne klappen 
               springRef.current.scale.set(1, 1, 2)  // Feder nach vorne animieren

               setTimeout(() => {
                  boxRef.current.rotation.set(0, 0, 0)  // zurücksetzen auf Ausgangswert 
                  springRef.current.scale.set(1, 1, 1)
               }, 500)
            }

            // else {
            //    boxRef.current.rotation.set(0, 0, 0)  // zurücksetzen auf Ausgangswert 
            //    springRef.current.scale.set(1, 1, 1)
            // }

            console.log(boxRef.current.position)
            // boxRef.current.position.set(boxRef.current.position[0], boxRef.current.position[1] + 0.5, boxRef.current.position[2] + 0.5)

            // box.position.y -= 0.35

            // ballRef.current.applyImpulse(
            //    { x: -0.1, y: 0, z: -2.5 },
            //    true
            // )
         }}
      >
         <mesh ref={boxRef}>
            <boxGeometry
               args={[0.4, 0.85, 0.4]}
               // position={[x, 1.15, 6.95]}
               rotation={[0, 0, -2]} />

            <meshStandardMaterial color='darkgrey' metalness={0.85} roughness={0.65} />
         </mesh>
         <mesh ref={springRef}>
            <MetalSpring
               helixCurve={curve}
               position={[0, 0.15, -0.75]}
               rotation={[1.55, -0.15, 0]}
               color={red[200]} />
         </mesh>
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
   width = 1.5
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

//*
function TubeTrack({
   points = [],
   tubularSegments = 5,
   radius = 2,
   tubeRadius = 1.5,
   radialSegments = 64
}) {

   const segments = useMemo(() => {
      const curve = new THREE.CatmullRomCurve3(points)
      const data = []

      for (let i = 0; i < tubularSegments; i++) {

         const t = i / tubularSegments
         const nextT = (i + 1) / tubularSegments

         const center = curve.getPoint(t)
         const next = curve.getPoint(nextT)

         const tangent = new THREE.Vector3()
            .subVectors(next, center)
            .normalize()

         const quaternion = new THREE.Quaternion()
         quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            tangent
         )

         data.push({ center, quaternion })
      }

      return data
   }, [points, tubularSegments])

   return (
      <RigidBody type="fixed" colliders={false} rotation={[1, 0, 0]}>

         {segments.map((seg, i) => (
            <group
               key={i}
               position={seg.center}
               quaternion={seg.quaternion}
            >
               {/* Ring of colliders */}
               {Array.from({ length: radialSegments }).map((_, j) => {
                  const angle = (j / radialSegments) * Math.PI * 2

                  const x = Math.cos(angle) * tubeRadius
                  const z = Math.sin(angle) * tubeRadius

                  return (
                     <CuboidCollider
                        key={j}
                        args={[0.2, 0.5, 0.2]}
                        position={[x, 0, z]}
                        friction={0.4}
                     />
                  )
               })}  {/**  Array.from() */}

               {/* Optional visible tube */}
               <mesh>
                  <torusGeometry
                     args={[tubeRadius, 0.05, 8, radialSegments]}
                  />
                  <meshStandardMaterial
                     color="#666"
                     metalness={0.7}
                     roughness={0.3}
                  />
               </mesh>
            </group>
         ))}
      </RigidBody>
   )
}

//*
function RubberRing({ position = [0, 0, 0], rotation = [0, 0, 0], args = [0.75, 0.05, 16, 64], color = '#666', withCollider = false }) {

   if (withCollider) {
      return (
         <RigidBody
            position={position}
            rotation={rotation}
            type="fixed"
            colliders="cuboid" >

            {/* <mesh position={position} rotation={rotation}> */}
            <mesh>
               <torusGeometry
                  // args={[tubeRadius, 0.05, 8, radialSegments]}
                  args={args}
               />
               <meshStandardMaterial
                  color={color}
                  metalness={0.7}
                  roughness={0.3}
               // emissive="black"
               // emissiveIntensity={0.5}
               />
            </mesh>
         </RigidBody>
      )
   }

   return (
      <mesh position={position} rotation={rotation}>
         <torusGeometry
            // args={[tubeRadius, 0.05, 8, radialSegments]}
            args={args}
         />
         <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.3}
         // emissive="black"
         // emissiveIntensity={0.5}
         />
      </mesh>
   )
}  // RubberRing()

//*
function HalfBentTube({ position = [0, 0, 0], rotation = [0, 0, 0], gameOver = false }) {

   // Create a half-circle curve
   const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 50 }, (_, i) => {
         
         const t = (i / 49) * Math.PI // 0 → 180°
         const radius = 6  // inner radius of the curve

         return new THREE.Vector3(
            Math.cos(t) * radius,
            Math.sin(t) * radius,
            0
         )
      })
   )

   const geometry = new THREE.TubeGeometry(
      curve,
      100,   // tubular segments
      0.5,   // tube radius
      32,    // radial segments
      false  // closed
   )

   return (
      <mesh geometry={geometry} position={position} rotation={rotation}>
         <meshStandardMaterial color={gameOver ? red[500] : green[500]}
            emissive={gameOver ? red[500] : null}
            emissiveIntensity={gameOver ? 0.95 : null}
            metalness={0.95}
            roughness={0.35}
            opacity={gameOver ? 0.65 : 0.85}
            transparent />
      </mesh>
   )
}

//*
function PointsDisplay({ noPoints, gameOver }) {

   let tubeRef = useRef()

   return (
      <group position={[0, 1, -0.25]}>
         <HalfBentTube ref={tubeRef}
            position={[1.7, 1.5, -6.95]}
            rotation={[0, 0, 0]}
            gameOver={gameOver} />

         <mesh>
            {/* <Html>
                  <Card position={[0, 6, -5]}>
                     <Typography variant="h2" color={green[800]} align="center">{stateData.noPoints}</Typography>
                  </Card>
               </Html> */}
            <Text
               position={[1.75, 6, -5.4]}
               fontSize={1.95}
               anchorX="center"
               anchorY="middle"
               outlineWidth={0.15}
               outlineColor={orange[100]}
            >
               {noPoints}
               <meshStandardMaterial color={green[900]} metalness={0.75} roughness={0.45} />
            </Text>

            {/* <Text3D position={[-4, 5, -5]} rotation={[0, 0, 0]}
               font="/fonts/helvetiker_regular.typeface.json"
               fontSize={1.95}
               anchorX="center"
               anchorY="middle"
               outlineWidth={0.15}
               outlineColor={orange[200]}>
               {noPoints}
               <meshStandardMaterial color={red[500]} metalness={0.75} roughness={0.45} />
            </Text3D> */}

            {/* <PulsingNeon position={[-4, 5, -5]} rotation={[0, 0, 0]} />  */}
            {/* <GlassNeonText position={[0, 5, -5]} rotation={[0, 0, 0]}/> */}

         </mesh >
         <mesh position={[1.75, 6, -5.95]}>
            {/** args={[width, height, depth]} */}
            <RoundedBox args={[6, 2.25, 1]} radius={0.25} smoothness={4} >
               <meshStandardMaterial color={green[500]} metalness={0.95} roughness={0.35} opacity={0.85} transparent />
            </RoundedBox>
         </mesh>
      </group>
   )
}

//*
function Electron({ radius = 2.75, speed = 6, position, rotation }) {
   const ref = useRef()

   useFrame((state) => {
      const t = state.clock.getElapsedTime() * speed
      ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0)

      // ref.current.position.set(position[0], position[1], position[2])
   })

   return (
      <group position={position} rotation={rotation}>
         <Trail local width={5} length={10} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
            <mesh ref={ref} >
               <sphereGeometry args={[0.55]} position={[0, 5, -5]} />
               <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
            </mesh>
         </Trail>
      </group>
   )
}

//*
function PulsingNeon({ position, rotation }) {

   const mat = useRef()

   useFrame((state) => {
      if (!mat.current) return

      mat.current.emissiveIntensity =
         1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5  //?
   })

   return (
      <Text3D font="/fonts/helvetiker_regular.typeface.json" position={position} rotation={rotation}>
         GLOW Text3D
         <meshStandardMaterial
            ref={mat}
            color="#ff00ff"
            emissive="#ff00ff"
            toneMapped={false}
         />
      </Text3D>
   )
}

//*
function GlassNeonText({ position = [0, 5, -5], rotation = [0, 0, 0] }) {

   return (
      <mesh position={position} rotation={rotation}>
         <color attach="background" args={["#050505"]} />

         <Center>
            {/* 🔥 Inner glowing gas core */}
            <Text3D
               font="/fonts/helvetiker_regular.typeface.json"
               size={1}
               height={0.2}
               bevelEnabled
               bevelSize={0.03}
               bevelThickness={0.08}
            >
               OPEN
               <meshStandardMaterial
                  color="#ff4dff"
                  emissive="#ff00ff"
                  emissiveIntensity={3}
                  toneMapped={false}
                  roughness={0}
               />
            </Text3D>

            {/* 🧊 Outer glass tube */}
            <Text3D
               font="/fonts/helvetiker_regular.typeface.json"
               size={1}
               height={0.25}
               bevelEnabled
               bevelSize={0.04}
               bevelThickness={0.1}
               scale={1.02}
            >
               OPEN
               <meshPhysicalMaterial
                  transmission={1}
                  thickness={0.6}
                  roughness={0}
                  metalness={0}
                  transparent
                  opacity={0.25}
                  clearcoat={1}
                  clearcoatRoughness={0}
               />
            </Text3D>
         </Center>

         {/* ✨ Bloom glow */}
         {/* <EffectComposer>
            <Bloom
               intensity={2}
               luminanceThreshold={0}
               luminanceSmoothing={0.8}
            />
         </EffectComposer> */}
      </mesh>
   )
}  // 
