/**
 * 
 *  Stand: 01.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import * as THREE from 'three'
import { useState, useMemo, useRef, useEffect, Suspense } from "react"


import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"  // errs 

import { OrbitControls } from "@react-three/drei"
import { Html } from "@react-three/drei"
import { useGLTF, Clone, useTexture } from '@react-three/drei'
// import { usePlane } from '@react-three/cannon'

import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { CuboidCollider } from "@react-three/rapier"

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button, FormGroup, FormControlLabel, Switch, CircularProgress, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
import { createNatoCamoTexture } from '../components/NatoCamoPattern'
// import BouncingBalls, { BouncingBalls01 } from '../components/BouncingBalls'
// import Connectors from '../components/Connectors'
// import DodecahedronGroup from '../components/DodecahedronGroup'
// import OpenableBox from '../components/boxes/OpenableBox'

import "../components/styles.css"

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
}  // Ground()

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

function ExplodingBox({ position = [0, 0, 0], color = orange[500] }) {

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

//* je nach Stand von hitCount explodiert der Ball...
function Ball({ position = [0, 5, 0], radius = 1, color = 'green', restitution = 0.75 }) {

   // corrugated_iron_diff_2k
   const texture = CreateFloorTexture('/textures/corrugated_iron_diff_2k.jpg')
   const rigidBody = useRef()

   let [hitCount, setHitCount] = useState(0)
   useEffect(() => {
      //?
   }, [hitCount])

   let [explode, setExplode] = useState(false)

   // useEffect(() => {
   //    //?
   // }, [explode])

   if (!explode) {
      return (
         <RigidBody
            ref={rigidBody}
            colliders={false}
            position={position}
            mass={1}
            restitutionCombineRule="max"
            linearDamping={0}
            angularDamping={0}
            // ccd  // Continuous Collision Detection
            // softCcdPrediction={0.2}

            onCollisionEnter={() => {
               rigidBody.current?.applyTorqueImpulse({
                  x: Math.random() * 0.5,
                  y: Math.random() * 0.05,
                  z: Math.random() * 0.05,
               })

               // ref.current.applyForce({ x, y, z }, wake)
               // ref.current.setRotation({ x, y, z, w }, wake)

               rigidBody.current.setRotation({ x: 2, y: 0, z: 0 }, true)
               // rigidBody.current.applyForce({ x: 1, y: 0, z: 0 }, true)

               // increase hit-counter
               hitCount++
               setHitCount(hitCount)
               if (hitCount > 5) {
                  // set "content-critical" on HTML-tag
                  let HTMLTag = document.getElementById('idHTMLTag')
                  HTMLTag.setAttribute('class', '')
                  HTMLTag.setAttribute('class', 'content-critical')
               }
               if (hitCount === 12) {
                  setExplode(true)
               }
            }}
         >
            <BallCollider args={[radius * 0.85, radius * 0.85, radius * 0.85]} restitution={restitution} friction={0.15} />

            < mesh castShadow receiveShadow>
               <sphereGeometry args={[radius, 64, 64]} />

               <Html distanceFactor={8}>
                  <div id='idHTMLTag' className="content">
                     {hitCount}
                  </div>
               </Html>
               <meshStandardMaterial map={texture} metalness={0.95} roughness={0.65} />
            </mesh>
         </RigidBody >
      )
   }

   if (explode) {
      return (
         Array.from({ length: 80 }).map((_, i) => (
            <Fragment
               key={i}
               velocity={new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6, (Math.random() - 0.5) * 6)}
               color={color}
            />
         ))
      )
   }
}  // Ball()

//*(
function Floor() {

   return (
      // mit collider={false} wird kein Auto-collider gesetzt
      <RigidBody type="fixed" colliders={false} userData={{ isFloor: true }}>
         <CuboidCollider
            args={[20, 0, 20]}
            position={[0, 0, 0]}
            restitution={0.75}
            friction={0.15}
            restitutionCombineRule="max"
            ccd
         />

         <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[30, 0.5, 30]} />
            {/* <meshStandardMaterial map={CreateFloorTexture('/textures/grimy-metal-albedo.png')}/> */}
            <meshStandardMaterial color="lightblue" />
         </mesh>
      </RigidBody>
   )
}

//*
function Wall({ position, rotation = [1.55, 0, 1.55], size, color, rotate = false }) {

   const rigidBodyRef = useRef()
   const meshRef = useRef()

   useFrame((_, delta) => {
      const body = rigidBodyRef.current

      if (!body || !meshRef.current || !rotate) return

      // meshRef.current.rotation.x += delta * 0.75
      meshRef.current.rotation.y += delta * 0.95
      // meshRef.current.position.x -= 0.005  // dreht die Wall weg vom FLoor...

      // meshRef.current.rotation.z += delta * 0.95
      body.setNextKinematicRotation(meshRef.current.rotation)
   })

   return (
      <RigidBody
         ref={rigidBodyRef}
         type="kinematicPosition"  // wegen Verwendung von setNextKinematicRotation()
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
         <mesh ref={meshRef} receiveShadow>
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
function getMuiColorObj(ivColor) {
   const arr = [blue, brown, green, grey, orange, purple, red, yellow]

   switch (ivColor) {
      case 'blue':
         return arr[0][500]
      case 'brown':
         return arr[1][500]
      case 'green':
         return arr[2][500]
      case 'grey':
         return arr[3][500]
      case 'orange':
         return arr[4][500]
      case 'purple':
         return arr[5][500]
      case 'red':
         return arr[6][500]
      case 'yellow':
         return arr[7][500]
      default:
         return arr[0][500]  // blue[500]
   }
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
function CreateManyBalls({ position = [0, 5, 0], noBalls = 10, size = 0.35, withCamo = false, withIndex = false, customCamoMix, onDone, lengthScene }) {

   // useMemo() for better performance with big noBalls
   const geometry = useMemo(() => new THREE.SphereGeometry(size, 16, 16), [size])

   const camoTexture = useMemo(() => {
      // return createNatoCamoTexture([getRandomMuiColor(), green[200], grey[500]])
      if (customCamoMix.length > 0) {
         return createNatoCamoTexture([customCamoMix[0], customCamoMix[1], customCamoMix[2]])
      }
      return createNatoCamoTexture([getRandomMuiColor(), getRandomMuiColor(), getRandomMuiColor()])
   }, [customCamoMix])

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
         (position[0] % 2) ? position[0] + (index / 150) : position[0] - (index / 150),
         position[1] + (index),
         (position[2] % 2) ? position[2] + (index / 150) : position[2] - (index / 150)
      ]), [noBalls, position])

   //* ohne diesen Aufruf wird die Szene im Parent (Colliders.jsx) zu schnell gelöscht...
   let lengthTimeout = lengthScene * 1000
   if (noBalls >= 1000) {
      lengthTimeout = 50000
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
         mass={2}
      >
         <BallCollider args={[
            geometry.parameters.radius * 0.5,
            geometry.parameters.radius * 0.5,
            geometry.parameters.radius * 0.5,
         ]}
            restitution={0.75} friction={0.15}
         />
         <mesh geometry={geometry} material={material} castShadow>
            {!withCamo &&
               <>
                  <meshStandardMaterial color={getRandomMuiColor()} />
                  {withIndex &&
                     <Html distanceFactor={10}>
                        <div className="content">
                           {index}
                        </div>
                     </Html>
                  }
               </>}

            {withCamo &&
               <>
                  <meshStandardMaterial map={camoTexture} />
                  {withIndex &&
                     <Html distanceFactor={10}>
                        <div className="content">
                           {index}
                        </div>
                     </Html>
                  }
               </>}
         </mesh>
      </RigidBody>
   ))
}  // CreateManyBalls()

//* making Select-boxes visible or invisible
function setSelectsVisible() {
   let eleFrmColor = document.getElementById('idFrmColor01')
   let classList = eleFrmColor.getAttribute('class')
   classList = classList.replace('invisible', '')
   classList = classList.replace('d-none', '')
   eleFrmColor.setAttribute('class', classList)

   eleFrmColor = document.getElementById('idFrmColor02')
   classList = eleFrmColor.getAttribute('class')
   classList = classList.replace('invisible', '')
   classList = classList.replace('d-none', '')
   eleFrmColor.setAttribute('class', classList)

   eleFrmColor = document.getElementById('idFrmColor03')
   classList = eleFrmColor.getAttribute('class')
   classList = classList.replace('invisible', '')
   classList = classList.replace('d-none', '')
   eleFrmColor.setAttribute('class', classList)
}

function setSelectsInvisible() {
   let eleFrmColor = document.getElementById('idFrmColor01')
   let classList = eleFrmColor.getAttribute('class')
   let newClassList = ''
   newClassList = newClassList.concat(classList, ' invisible d-none')
   eleFrmColor.setAttribute('class', newClassList)

   newClassList = ''
   eleFrmColor = document.getElementById('idFrmColor02')
   classList = eleFrmColor.getAttribute('class')
   newClassList = newClassList.concat(classList, ' invisible d-none')
   eleFrmColor.setAttribute('class', newClassList)

   newClassList = ''
   eleFrmColor = document.getElementById('idFrmColor03')
   classList = eleFrmColor.getAttribute('class')
   newClassList = newClassList.concat(classList, ' invisible d-none')
   eleFrmColor.setAttribute('class', newClassList)
}

//* crashes since RigidBody is used:
function CreateOZRim({ position, rotation, scale }) {

   const wheelModel = useGLTF('/models/damagedWheel.glb ')

   return <primitive object={wheelModel.scene} position={position} rotation={rotation} scale={scale} />

   // const rimModel = useGLTF('/models/oz_rim.glb')  //

   // return (
   //    // <RigidBody type="fixed" colliders= {false}
   //    //    position={position}
   //    //    rotation={rotation}
   //    // >
   //    //    <CuboidCollider
   //    //       args={[
   //    //          scale[0] * 0.5,
   //    //          scale[1] * 0.5,
   //    //          scale[2] * 0.5,
   //    //       ]}
   //    //       restitution={0.9}
   //    //       friction={0}
   //    //    />
   //    //    {/* <Clone object={rimModel.scene} position={position} rotation={rotation} scale={scale} /> */}
   //    //    {/* <Clone object={rimModel.scene} scale={scale} /> */}

   //    //    <primitive object={rimModel.scene} scale={scale} />
   //    // </RigidBody>

   //    <Clone object={rimModel.scene} position={position} rotation={rotation} scale={scale} />
   // )

}  // 

function CreateRustyBox({ position, rotation, scale }) {

   const groupRef = useRef()
   const rigidBodyRef = useRef()
   const utilityBox = useGLTF('/models/utility_box_02_2k.gltf')

   {/** Verwendung von useFrame() stürzt gelegentlich ab... */ }

   // useFrame((_, delta) => {
   //    if (!rigidBodyRef || !groupRef) return

   //    // groupRef.current.rotation.x += delta * 0.75
   //    groupRef.current.rotation.y += delta * 0.95

   //    rigidBodyRef.current.setNextKinematicRotation(groupRef.current.rotation)
   // })

   return (
      <RigidBody ref={rigidBodyRef} type="kinematicPosition" colliders={false}
         position={position} rotation={rotation}
      >
         <CuboidCollider args={[scale * 0.5, scale * 0.5, scale * 0.5]} />

         <group ref={groupRef} scale={scale}>
            <primitive object={utilityBox.scene} />
            <Html distanceFactor={5}>
               <div className="content">
                  created with Render using a GLTF file
               </div>
            </Html>
         </group>
      </RigidBody>
   )
}  // CreateRustyBox()

function CreateFloorTexture(path2textureFile) {

   // const rockyTerrainModel = useGLTF('/models/rockyTerrain.glb ')
   // return <primitive object={rockyTerrainModel.scene} position={position} rotation={rotation} scale={scale} />

   let texture = useTexture(path2textureFile)

   texture.colorSpace = THREE.SRGBColorSpace
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   texture.repeat.set(1, 1)

   // return the texture created 
   return texture

}  //  CreateFloorTexture()

function CreateFireHydrant({ position, rotation, scale = 1 }) {

   const fireHydrantModel = useGLTF('/models/fire_hydrant.glb')

   return (
      <group position={position} rotation={rotation} scale={scale}>
         <primitive object={fireHydrantModel.scene} />
         <Html distanceFactor={5}>
            <div className="content">
               fire_hydrant GLB-file
            </div>
         </Html>
      </group>
   )

   // return <primitive object={fireHydrantModel.scene} position={position} rotation={rotation} scale={scale} />
}  // CreateFireHydrant()

function CreateGrass({ position, rotation, scale = 2 }) {

   const grassModel = useGLTF('/models/grass_medium.glb')
   // normal usage: grassModel.scene
   // grassModel.nodes.grass_medium_01_large_a_LOD0; grassModel.nodes enthält verschiedene Grassgrößen

   return <primitive object={grassModel.nodes.grass_medium_01_large_a_LOD0} position={position} rotation={rotation} scale={scale} />

}  // CreateGrass()

//* ERRS: zeichnet bei mehrfacher Verwendung genau ein Objekt...
function CorrugatedIron({ position = [0, 5, 0], restitution = 1, scale = 1 }) {

   const ironModel = useGLTF('/models/corrugated_iron.glb')
   ironModel.materials.corrugated_iron.metalness = 0.95
   ironModel.materials.corrugated_iron.roughness = 0.65

   //? useConvexPolyhedron(); vertices + faces from your model’s geometry
   //? useCompoundBody

   return (
      <RigidBody
         colliders={false}
         position={position}
         mass={5}
         restitutionCombineRule="max"
         linearDamping={0}
         angularDamping={0}
         canSleep={false}
         ccd  // Continuous Collision Detection
         softCcdPrediction={0.2}
      >
         <CuboidCollider args={[scale * 1.5, scale * 0.75, scale * 0.6]} restitution={restitution} friction={0.15} />
         <primitive object={ironModel.scene} scale={scale} castShadow receiveShadow />
      </RigidBody>
   )
}  // CorrugatedIron()

//* Colliders page component
export default function Colliders() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   const [camoUsed, setCamoUsed] = useState(false)  // camo for the Balls created?
   const [indexUsed, setIndexUsed] = useState(false)  // switches index per Ball created

   const [createBalls, setCreateBalls] = useState(false)  // start creating Balls?
   const [disabled, setDisabled] = useState(false)  // state of the CREATE button 
   const [enableCircularProgress, setCircularProgress] = useState(false)  // state of CircularProgress
   const [size, setSize] = useState(0.15)  // SIZE of the Balls created 
   const [noBalls, setNoBalls] = useState(5)  // NUMBER of Balls created

   const [lengthScene, setLengthScene] = useState(10)  // length of scene in seconds


   // states for color picker 
   const [color01, setcolor01] = useState('')
   const [color02, setcolor02] = useState('')
   const [color03, setcolor03] = useState('')
   const [customCamoMix, setCustomColorMix] = useState([])

   function mixCustomCamo() {
      let customCamoMix = []
      customCamoMix.push(getMuiColorObj(color01))  // später: mit [shade]
      customCamoMix.push(getMuiColorObj(color02))
      customCamoMix.push(getMuiColorObj(color03))
      return (customCamoMix)
   }  // mixCustomCamo()

   const handleChange = (event) => {
      setSize(event.target.value)
   }  // handleChange() Slider-Components

   useEffect(() => {
      console.log('useEffect(): createBalls:', createBalls, 'camoUsed: ', camoUsed)
   }, [camoUsed, createBalls, customCamoMix, indexUsed, lengthScene])

   // preload of GLTF-models
   useGLTF.preload('/models/oz_rim.glb')
   useGLTF.preload('/models/utility_box_02_2k.gltf')
   useGLTF.preload('/models/fire_hydrant.glb')
   useGLTF.preload('/models/grass_medium.glb')
   useGLTF.preload('/models/corrugated_iron.glb')
   useGLTF.preload('/textures/corrugated_iron_diff_2k.jpg')  //?

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
                           disabled={disabled}
                           onClick={() => {
                              setCreateBalls(true)
                              setDisabled(true)
                              setCircularProgress(true)
                              setLengthScene(lengthScene)

                              // build camo if user mixed one 
                              let idSwitch = document.getElementById('idSwitchMixCamo')
                              if (idSwitch.checked === true) {
                                 setCustomColorMix(mixCustomCamo())
                              }
                           }}>
                           Create Balls
                           {enableCircularProgress && <CircularProgress className='m-1' size={20} color="success" />}
                        </Button>
                     </div>

                     {/** Slider controls */}
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
                           onChange={(event) => { setNoBalls(event.target.value) }}
                           value={noBalls}
                           disabled={disabled}
                        />
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
                                    setIndexUsed(true)
                                 }
                                 else {
                                    setIndexUsed(false)
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
                                    setCamoUsed(true)
                                 }
                                 else {
                                    setCamoUsed(false)
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
                                 if (e.target.checked === true) {
                                    // mixCustomCamo()  is done when button is pressed
                                    // make select's visible 
                                    setSelectsVisible()
                                 }
                                 else {
                                    // inactivate color select's
                                    setcolor01(null)
                                    setcolor02(null)
                                    setcolor03(null)
                                    setCustomColorMix([])

                                    // make select's invisible
                                    setSelectsInvisible()
                                 }
                              }} />
                        }
                           label="mix camo" />
                     </FormGroup>

                     {/** choose color01 */}
                     <FormControl id='idFrmColor01' className="invisible d-none" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        {/* blue, brown, green, grey, orange, purple, red, yellow */}
                        <InputLabel id="idColor01">Color01</InputLabel>
                        <Select
                           labelId="idSelectColor01"
                           id="idSelectColor01"
                           value={color01}
                           onChange={(e) => {
                              setcolor01(e.target.value)
                           }}
                           label="Color01"
                        >
                           <MenuItem value={'blue'}>Blue</MenuItem>
                           <MenuItem value={'brown'}>Brown</MenuItem>
                           <MenuItem value={'green'}>Green</MenuItem>
                           <MenuItem value={'grey'}>Grey</MenuItem>
                           <MenuItem value={'orange'}>Orange</MenuItem>
                           <MenuItem value={'purple'}>Purple</MenuItem>
                           <MenuItem value={'red'}>Red</MenuItem>
                           <MenuItem value={'yellow'}>Yellow</MenuItem>
                        </Select>
                     </FormControl>

                     {/** choose color02 */}
                     <FormControl id='idFrmColor02' className="invisible d-none" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="idColor02">Color02</InputLabel>
                        <Select
                           labelId="idSelectColor01"
                           id="idSelectColor01"
                           value={color02}
                           onChange={(e) => {
                              setcolor02(e.target.value)
                           }}
                           label="Color02"
                        >
                           <MenuItem value={'blue'}>Blue</MenuItem>
                           <MenuItem value={'brown'}>Brown</MenuItem>
                           <MenuItem value={'green'}>Green</MenuItem>
                           <MenuItem value={'grey'}>Grey</MenuItem>
                           <MenuItem value={'orange'}>Orange</MenuItem>
                           <MenuItem value={'purple'}>Purple</MenuItem>
                           <MenuItem value={'red'}>Red</MenuItem>
                           <MenuItem value={'yellow'}>Yellow</MenuItem>
                        </Select>
                     </FormControl>

                     {/** choose color03 */}
                     <FormControl id='idFrmColor03' className="invisible d-none" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        {/* blue, brown, green, grey, orange, purple, red, yellow */}
                        <InputLabel id="idColor03">Color03</InputLabel>
                        <Select
                           labelId="idSelectColor03"
                           id="idSelectColor03"
                           value={color03}
                           onChange={(e) => {
                              setcolor03(e.target.value)
                           }}
                           label="Color03"
                        >
                           <MenuItem value={'blue'}>Blue</MenuItem>
                           <MenuItem value={'brown'}>Brown</MenuItem>
                           <MenuItem value={'green'}>Green</MenuItem>
                           <MenuItem value={'grey'}>Grey</MenuItem>
                           <MenuItem value={'orange'}>Orange</MenuItem>
                           <MenuItem value={'purple'}>Purple</MenuItem>
                           <MenuItem value={'red'}>Red</MenuItem>
                           <MenuItem value={'yellow'}>Yellow</MenuItem>
                        </Select>
                     </FormControl>
                  </Card>

                  {/** Slider for LENGTH of scene [seconds] */}
                  <Card className='rounded shadow'>
                     <div className="row m-3 border border-info rounded">
                        <h6>Adjust LENGTH of scene [seconds]: </h6>
                        <Slider
                           name='idLengthScene'
                           aria-label="Slider for LENGTH of scene"
                           defaultValue={10}
                           valueLabelDisplay="auto"
                           step={1}
                           min={10}
                           max={50}
                           onChange={(event) => { setLengthScene(event.target.value) }}
                           value={lengthScene}
                           disabled={disabled}
                        />
                     </div>
                  </Card>
               </Box>

               {/* COl with the scene / canvas*/}
               <Box orientation='col' className='mt-4 bg-dark-subtle rounded'
                  sx={{ mt: 2, width: '85%', minHeight: '200px', border: '1px solid red' }}
               >
                  <Canvas shadows camera={{ position: [1, 8, 2], fov: 95 }}
                     style={{
                        width: "86vw",
                        height: "100vh",
                        display: "block"
                     }}>
                     <ambientLight intensity={0.85} />
                     <directionalLight position={[0, 5, 5]} castShadow />
                     {/* <pointLight position={[1, 5, 1]} color="orange" /> */}

                     {/* <Physics gravity={[0, -9.81, 0]}> */}
                     {/* <ColliderBox position={[0, 2, 0]} /> */}
                     {/* Ground */}
                     {/* <Ground /> */}
                     {/* </Physics> */}

                     <Physics gravity={[0, -9.81, 0]} > {/** debug> */}

                        <Ball position={[0, 5, 0]} restitution={0.95} radius={0.5} />
                        {/* <Ball position={[1, 5, 0]} restitution={0.95} radius={0.55} /> */}
                        {/* <Ball position={[-1, 5, 0]} restitution={0.95} radius={0.55} /> */}

                        {/* <ExplodingBox position = {[0, 8, 0]} color={green[400]}/> */}

                        {/* <CorrugatedIron position={[1, 8, 0]} restitution={0.95} scale={0.75} /> */}

                        {/** does not work, just shows one ball with corrugatedIron... */}
                        {/* <CorrugatedIron position={[2, 8, 1]} restituion={1} scale={1} /> */}



                        <CreateRustyBox position={[3, 0.75, -7]} rotation={[0, 0, 0]} scale={1.5} />
                        <CreateOZRim position={[0, 2, -8]} rotation={[0, 0, 0]} scale={2} />
                        <CreateFireHydrant position={[0, 0.5, -6]} rotation={[0, 0, 0]} scale={2} />
                        <CreateGrass position={[0, 0.5, -6.25]} rotation={[0, 0, 0]} scale={10} />

                        {/** füllt unerwünscht den Hintergrund... */}
                        {/* <CreateRockyTerrain position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}/> */}

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


                        {/* <ExplodingBox position={[0, 5, 0]} color={getRandomMuiColor()} /> */}
                        {/* <ExplodingBox position={[2, 5, 1]} color={green[500]} /> */}
                        {/* <ExplodingBox position={[-2, 5, -1]} color={yellow[500]} /> */}

                        {/* <Connectors /> */}

                        {/* <DodecahedronGroup />  */}
                        {/* <OpenableBox position={[5, 1, 7]} color={red[500]}/> */}

                        {createBalls &&
                           <>
                              <CreateManyBalls position={[-2.25, 5, 0]} size={size} noBalls={noBalls} withCamo={camoUsed}
                                 customCamoMix={customCamoMix}
                                 withIndex={indexUsed}
                                 lengthScene={lengthScene}
                                 onDone={() => {
                                    setCreateBalls(prev => {
                                       console.log('onDone, previous value:', prev)
                                       return false
                                    })
                                    setDisabled(false)  // setzt den Button zur Erzeugung von Bällen wieder auf aktiv
                                    setCircularProgress(false)  // CircularProgress neben Button "Create" aus 
                                 }}
                              />
                           </>
                        }

                        {/*                         <BouncingBalls colors={{color1: red[200], color2: blue[200]}}/>
                        <BouncingBalls colors={{color1: red[400], color2: blue[400]}} />
                        <BouncingBalls colors={{color1: red[600], color2: blue[600]}} /> */}

                        {/* <BouncingBalls01 /> */}

                        {/* <ColliderBox position={[-1, 8, 0]} /> */}
                        {/* <ColliderBox position={[1, 3, 0]} /> */}


                        {/** size wird in WALL für Collider und Geometry verwendet */}
                        <Wall position={[1, 2, 4]} size={[0.25, 5, 3]} color={blue[200]} />
                        <Wall position={[2, 3.25, 3.15]} rotation={[0, 0, 1.55]} size={[0.25, 3, 4]} color={green[500]} />

                        <Wall position={[-1, 2, -4]} size={[0.25, 5, 4]} color={blue[400]} />

                        <Wall position={[-4, 1.5, 0]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={orange[500]} rotate={false} />
                        <Wall position={[0.15, 3, -2]} rotation={[1.6, 1, -2]} size={[0.25, 3, 2]} color={red[200]} rotate={true} />

                        <Wall position={[4, 1.5, 2.5]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={red[600]} rotate={true} />
                        <Wall position={[4, 1.5, 0.2]} rotation={[0, 0, 0]} size={[0.25, 3, 2]} color={red[900]} />

                        <Wall position={[9, 3, 2]} rotation={[1.55, 0, 0]} size={[0.25, 8, 5]} color={blue[600]} />

                        <Wall position={[-9, 3, 2]} rotation={[1.55, 0, 0]} size={[0.25, 8, 5]} color={blue[600]} />
                        <Wall position={[-7.5, 4.25, 3.15]} rotation={[0, 0, 1.6]} size={[0.25, 4, 5]} color={green[500]} />

                        <Wall position={[-4, 1.25, 9]} rotation={[1.55, 0, -1.5]} size={[0.15, 7, 2]} color={blue[600]} />
                        <Wall position={[4, 1.25, -9]} rotation={[1.55, 0, -1.5]} size={[0.15, 7, 2]} color={blue[600]} />

                        <Floor />
                     </Physics>

                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // Colliders()
