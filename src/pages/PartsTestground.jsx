/**
 * 
 *  Stand: 26.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import { useState } from "react"
// import { useMemo } from "react" 
// import { useFrame } from "@react-three/fiber" 

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox, Text } from "@react-three/drei"
import { Physics, usePlane } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { blue, orange, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
// import { CamoBox } from '../components/CamoBox'
// import { createNatoCamoTexture } from '../components/NatoCamoPattern'
// import TBeam, { TBeamRusted, TBeamRusted2, TBeam3 } from '../components/truckparts/TBeam'

// import MetalRack from '../components/MetalRack'
// import Fence from '../components/Fence'
// import GridFence3D from '../components/Fence'

// import CSGTorus from '../components/CSGTorus'
import MetalSpring from '../components/MetalSpring'
// import Tube from '../components/Tube'

// import CreateExtrudeGeometry, { CreateExtrudeGeometry02 } from '../components/InstancedGeometry'
import PlanetWithHole from '../components/PlanetWithHole'
// import { Model, CreateSingleTree, CreateGrass, CreateStreet, CreateTruck } from '../components/PlanetWithHole'
import Cannonball, { ShockwaveMetal } from '../components/CannonBall'
import Ball from '../components/Ball'

import ShockAbsorber from '../components/truckparts/ShockAbsorber'

// import { DIYControlArm } from '../components/truckparts/TriangleControlArm'
// import { Suspension } from '../components/truckparts/TriangleControlArm'
// import Triangle from '../components/Triangle'

import OshkoshTruck from '../components/Oskosh-truck'
import { TruckParts, TruckPartsWheel } from '../components/Oskosh-truck'
import Foxhound from '../components/Foxhound'
import MetalContainers from '../components/MetalContainers'

import TestComponents from '../components/PartsTestground/TestComponents'
import { ControlRoomMonitor, Trees, M977, Ural4320 } from '../components/PartsTestground/TestComponents'


/** ------------------------------------------------------------------------ */
//    Local declarations / components
/** ------------------------------------------------------------------------ */

const catmullCurve = new THREE.CatmullRomCurve3([
   new THREE.Vector3(2, 0, 0),  // Horizontale
   new THREE.Vector3(2, 2, 0),  //
   new THREE.Vector3(6, 3, 1),   //
])

// CatmullRomCurve3( points?: THREE.Vector3[] | undefined, 
//                   closed?: boolean, 
//                   curveType?: THREE.CurveType, 
//                   tension?: number): THREE.CatmullRomCurve3
const catmullCurveTest = new THREE.CatmullRomCurve3([
   new THREE.Vector3(0, 0, 0),  // Punkte eines Abschnittes
   new THREE.Vector3(1, 1, 0),  //
   new THREE.Vector3(2, 0.35, 0),   //
   new THREE.Vector3(3, -0.55, 0)
])

//* Local declarations
const shape = new THREE.Shape()
shape.moveTo(0, 0)
shape.lineTo(0.005, 0.005)
shape.lineTo(0.005, 0.005)

shape.lineTo(0.015, 0.005)
shape.lineTo(0.015, 0.005)

// shape.lineTo(0.25, 0.1)
shape.closePath()

//*
const shape02 = new THREE.Shape()
shape02.moveTo(0, 0)
shape02.lineTo(0.005, 0.005)
shape02.lineTo(0.005, 0.005)

// shape02.lineTo(0.025, 0.005)
// shape02.lineTo(0.025, 0.005)

shape02.bezierCurveTo(0.01, 0.01, 0.01, 0.01)
// shape02.bezierCurveTo(0.02, 0.02, 0.02, 0.02)

shape02.closePath()

//*
export function MetalRod({ args = [1, 1, 1], radius = 0.15, position = [0, 0, 0], rotation = [0, 0, 0], color = 'white' }) {
   return (
      <mesh position={position} rotation={rotation}>
         <RoundedBox
            args={args}   // width, height, depth
            radius={radius}         // corner radius
            smoothness={32}        // segments
         >
            <meshStandardMaterial
               color={color}
               metalness={0.95}
               roughness={0.55}
               envMapIntensity={0.75}
            />
         </RoundedBox>
      </mesh>
   )
}  // MetalRod()

//* preloading the GLB-models used here
function preloadModels() {
   // (method) preload(path: Path, useDraco?: UseDraco, useMeshopt?: boolean, extendLoader?: ExtendLoader): void
   useGLTF.preload('/models/Pine Trees.glb')  // usage not clear 
   useGLTF.preload('/models/Tree.glb')
   useGLTF.preload('/models/Grass.glb')
   useGLTF.preload('/models/Dump truck.glb')
   useGLTF.preload('/models/truck_container_pack.glb')
   useGLTF.preload('/models/particle_rotor_base.glb')
   useGLTF.preload('/models/control_room_monitor.glb')
   useGLTF.preload('/models/lp_objects_trees.glb')
   useGLTF.preload('/models/truck_m977_hemtt.glb')
   useGLTF.preload('/models/truck_ural_4320.glb')

}  // preloadModels()

//*
function Explosion({ position }) {
   const particles = [...Array(20)]

   return particles.map((_, i) => (
      <mesh
         key={i}
         position={position}
         scale={0.05}
      >
         <sphereGeometry />
         <meshStandardMaterial color="orange" emissive="red" />
      </mesh>
   ))
}

function explode(position, worldApi) {
   worldApi.bodies.forEach((body) => {
      body.applyImpulse(
         [
            (body.position[0] - position[0]) * 5,
            (body.position[1] - position[1]) * 5,
            (body.position[2] - position[2]) * 5,
         ],
         body.position
      )
   })
}

function Ground() {
   return (
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0]} receiveShadow>
         {/* <planeGeometry args={[20, 20, 10]} /> */}
         <boxGeometry args={[30, 0.5, 30]} />
         <meshStandardMaterial color="lightsteelblue" />
      </mesh>
   )
}  // Ground()


//* PartsTestground page component
export default function PartsTestground() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction
   preloadModels()

   // const camoTextureColors = ['#ffd700', '#bdb76b', '#b8860b']
   // const camoTextureColors = [orange[500], brown[600], orange[900]]
   // const camoTexture = createNatoCamoTexture(camoTextureColors)

   // const camoTextureColors01 = ['#bdb76b', '#b8860b', '#a52a2a']
   // #bdb76b darkkhaki; #b8860b darkgoldenrod; #a52a2a brown
   // const camoTexture01 = createNatoCamoTexture(camoTextureColors01)

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
                        wireframe
                     </Button>
                     <Button variant="outlined" color="warning" className='m-1'
                        onClick={() => {
                        }}>
                        explode scene
                     </Button>
                  </Card>
               </Box>

               {/* COl with the scene */}
               <Box orientation='col' className='m-1 mt-2 bg-dark-subtle rounded'
                  sx={{ width: '84%', minHeight: '200px', border: '1px solid red', mt: 2 }}
               >
                  <Canvas shadows camera={{ position: [3, 5, 3], fov: 75 }}
                     style={{
                        width: "85vw",
                        height: "88vh",
                        display: "block"
                     }}>
                     <ambientLight intensity={0.95} />
                     <directionalLight position={[0, 5, 5]} castShadow />

                     {/** Ball */}
                     <Ball position={[-2, 0.5, 0]} velocity={[0.5, 0, 0]} color={red[500]} />
                     <Ball position={[2, 0.5, 0]} velocity={[-0.5, 0, 0]} color={red[900]} />

                     {/*                      <Ball position={[-3, 0.5, 1]} velocity={[1, 0, 0]} color={orange[500]}/>
                     <Ball position={[3, 0.5, 1]}  velocity={[-1, 0, 0]} color={blue[900]}/> */}


                     {/* <Cannonball /> */}
                     <Physics gravity={[0, 0, 0]} allowSleep>

                        <Cannonball position={[0, 1, 1]} velocity={[0, 0, 0]} />
                        <Text position={[0, 1.65, 1]} color={blue[900]} fontSize={0.25}>
                           Cannonball with Physics, click to explode
                        </Text>

                        {/** two trucks */}
                        {/* <OshkoshTruck position={[8, 0, 0]} scale={0.25}/> */}

                        {/** single parts from the Oshkosh Truck: */}
                        {/* <TruckPartsWheel position={[4, -2.7, 4]} rotation={[0, 0, 0]} scale={0.25} orientation={'left'}/> */}
                        <TruckPartsWheel position={[8, 0.25, 5]} rotation={[0, 0, 0]} scale={0.5} orientation={'right'} />

                        {/** Foxhound armoured vehicle */}
                        {/* <Foxhound position={[8, 0.15, -1]} rotation={[0, -Math.PI/2, 0]} scale={2}/> */}

                        {/* <M977 position={[8, 0.1, -3]} rotation={[0, 0, 0]} scale={1} /> */}
                        <Ural4320 position={[6, 0.1, 9]} rotation={[-1.55, 0, -1.55]} scale={1}/>

                        {/** four metal containers */}
                        <MetalContainers position={[-1, 0.15, 8]} rotation={[0, 0, 0]} scale={1} />

                        <TestComponents position={[-5, 0.25, -8]} rotation={[0, 0, 0]} scale={1} />
                        <ControlRoomMonitor position={[-6, 1.25, 10]} rotation={[0, -1.55, 0]} scale={1} />

                        <Trees position={[0, 0.15, 8]} rotation={[0, 0, 0]} scale={2} />

                        {/*                         <Model position={[5, 0, 4]} rotation={[0, 0, 0]} />
                        <Model position={[6, 0, 5]} rotation={[0, 0, 0]} scale={1.25} />
                        <Model position={[7, 0, 5.25]} rotation={[0, 0, 0]} scale={2.25} />

                        <CreateGrass position={[-62, 0.1, 4.25]} rotation={[0, 0, 0]} scale={1} />
                        <CreateGrass position={[-45, 0.1, 4.75]} rotation={[0, 0, 0]} scale={0.75} />

                        <CreateSingleTree position={[3, 0, -5.75]} rotation={[0, 0, 0]} scale={0.55} />
                        <CreateSingleTree position={[6, 0, -5.75]} rotation={[0, 0, 0]} scale={0.45} />

                        <Tube position={[0, 0, 4]} rotation={[0, 0, 0.725]} curve={catmullCurveTest} color='white' /> */}

                        {/* <CreateExtrudeGeometry noObjects={20} /> */}
                        {/* <CreateExtrudeGeometry02 noObjects={10} /> */}

                        <PlanetWithHole position={[-1, 0.55, 6]} rotation={[-0.5, 0, 0]} />
                        <PlanetWithHole position={[-2.25, 0.55, 4]} rotation={[-0.75, 0, 0]} textureColors={[red[200], red[700], red[900]]} />
                        <PlanetWithHole position={[-3.5, 0.55, 4]} rotation={[-0.75, 0, 0]} textureColors={[orange[200], red[700], yellow[900]]} />
                        <PlanetWithHole position={[-1.25, 0.55, 5]} rotation={[-0.5, 0, 0]} texture='wood' />
                        <PlanetWithHole position={[-2.5, 0.55, 5]} rotation={[-0.5, 0, 0]} texture='rust' />

                        {/* <Tube position={[3, 0.5, -3]} curve={catmullCurve} color={red[400]} /> */}

                        <MetalSpring position={[0.25, 0, 0]} rotation={[0, 0, 0]} color={red[500]} />
                        <MetalSpring position={[0.35, 0, 0]} rotation={[0, 0, 0]} color={orange[500]} />

                        {/** Shockabsorber */}
                        <ShockAbsorber position={[0, -0.1, 0.5]} rotation={[0, 0, 0.55]} />

                        {/** front wishbones */}
                        {/*                         <DIYControlArm position={[0.35, 0.15, 1.5]} rotation={[0, 1.5, 0]} />
                        <DIYControlArm position={[-0.35, 0.15, 0]} rotation={[0, -1.5, 0]} /> */}

                        {/** some parts / group later */}
                        {/*                         <group position={[0, 0.25, -10]}>
                           <MetalRod args={[1, 1.75, 0.15]}
                              position={[2, 0.85, 7]}
                              rotation={[0, 0, 1.585]}
                              color={yellow[200]}
                           />
                           <MetalRod args={[1, 1.75, 0.15]}
                              position={[-0.25, 0.85, 7.05]}
                              rotation={[0, 0, 1.585]}
                              color={yellow[200]}
                           />
                           <MetalRod args={[1, 0.5, 0.15]}
                              position={[-1.35, 0.825, 7.05]}
                              rotation={[0, 0, 1.585]}
                              color={orange[500]}
                           />
                           <MetalRod args={[1, 0.5, 0.15]}
                              position={[3.15, 0.825, 7]}
                              rotation={[0, 0, 1.585]}
                              color={orange[500]}
                           />
                           <MetalRod args={[0.05, 0.05, 5.5]}
                              position={[0.95, 0.3, 7]}
                              rotation={[0, 1.6, 0]}
                              color={grey[300]}
                           />
                        </group> */}

                        {/* Ground */}
                        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                           <planeGeometry args={[20, 20]} />
                           <meshStandardMaterial
                              color='grey'
                              roughness={1}
                              metalness={0}
                           // map={camoTexture} // #4b5320
                           />
                        </mesh> */}
                        <Ground />

                     </Physics>

                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // PartsTestground()
