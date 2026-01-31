/**
 * 
 *  Stand: 28.01.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */

// import { useMemo } from "react" 
// import { useFrame } from "@react-three/fiber" 
// import * as THREE from 'three'
// import { useMemo } from "react"

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox, RoundedBoxGeometry, Text } from "@react-three/drei"
import { useGLTF } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */
// import { CamoBox } from '../components/CamoBox'
// import { createNatoCamoTexture } from '../components/NatoCamoPattern'
import TBeam, { TBeamRusted, TBeamRusted2, TBeam3 } from '../components/truckparts/TBeam'


// import MetalRack from '../components/MetalRack'
// import Fence from '../components/Fence'
// import GridFence3D from '../components/Fence'

// import CSGTorus from '../components/CSGTorus'
import MetalSpring from '../components/MetalSpring'
import Tube from '../components/Tube'

import CreateExtrudeGeometry, { CreateExtrudeGeometry02 } from '../components/InstancedGeometry'
import PlanetWithHole from '../components/PlanetWithHole'
import { Model, CreateSingleTree, CreateGrass, CreateStreet } from '../components/PlanetWithHole'

import ShockAbsorber from '../components/truckparts/ShockAbsorber'
import { DIYControlArm } from '../components/truckparts/TriangleControlArm'

// import { Suspension } from '../components/truckparts/TriangleControlArm'
// import { Physics } from '@react-three/rapier'
// import Triangle from '../components/Triangle'


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

function MetalRod({ args, position, rotation, color = 'white' }) {
   return (
      <mesh position={position} rotation={rotation}>
         <RoundedBox
            args={args}   // width, height, depth
            radius={0.15}         // corner radius
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


//* PartsTestground page component
export default function PartsTestground() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   useGLTF.preload('/models/Pine Trees.glb')  // usage not clear 
   useGLTF.preload('/models/Tree.glb')
   useGLTF.preload('/models/Grass.glb')

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
                  <Canvas shadows camera={{ position: [3, 3, 3], fov: 55 }}
                     style={{
                        width: "85vw",
                        height: "88vh",
                        display: "block"
                     }}>
                     <ambientLight intensity={0.95} />
                     <directionalLight position={[0, 5, 5]} castShadow />

                     {/* <Text position={[0, 1, -1]} color={red[400]} fontSize={0.25}>MUI colors appear darker than defined</Text> */}

                     <Model position={[5, 0, 4]} rotation={[0, 0, 0]} />
                     <Model position={[6, 0, 5]} rotation={[0, 0, 0]} scale={1.25} />
                     <Model position={[7, 0, 5.25]} rotation={[0, 0, 0]} scale={2.25} />

                     <CreateGrass position={[-62, 0.1, 4.25]} rotation={[0, 0, 0]} scale={1} />
                     <CreateGrass position={[-45, 0.1, 4.75]} rotation={[0, 0, 0]} scale={0.75} />

                     <CreateSingleTree position={[3, 0, -5.75]} rotation={[0, 0, 0]} scale={0.55} />
                     <CreateSingleTree position={[6, 0, -5.75]} rotation={[0, 0, 0]} scale={0.45} />

                     <CreateStreet position={[1, 0.05, 4]} rotation={[-1.5, 0, 0]} />

                     <Tube position={[0, 0, 4]} rotation={[0, 0, 0.725]} curve={catmullCurveTest} color='white' />

                     <CreateExtrudeGeometry noObjects={2} />
                     <CreateExtrudeGeometry02 noObjects={10} />

                     <PlanetWithHole position={[-1, 0.55, 4]} rotation={[-0.5, 0, 0]} />
                     <PlanetWithHole position={[-2.25, 0.55, 4]} rotation={[-0.75, 0, 0]} textureColors={[red[200], red[700], red[900]]} />
                     <PlanetWithHole position={[-3.5, 0.55, 4]} rotation={[-0.75, 0, 0]} textureColors={[green[200], green[700], green[900]]} />
                     <PlanetWithHole position={[-1.25, 0.55, 5]} rotation={[-0.5, 0, 0]} texture='wood' />
                     <PlanetWithHole position={[-2.5, 0.55, 5]} rotation={[-0.5, 0, 0]} texture='rust' />

                     {/** Scheibe, frontseite, Glas */}
                     <mesh position={[0, 0.35, 0.5]} rotation={[1.605, 0, -0.35]} receiveShadow>
                        <extrudeGeometry args={[
                           shape,
                           { depth: 0.01, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 8 }
                        ]} />
                        <meshStandardMaterial color={purple[400]} metalness={0.5} roughness={0.15} transparent opacity={0.85} />
                     </mesh>

                     {/** Front */}
                     <mesh position={[0, 0.35, 1]} rotation={[1.605, 0, -0.35]} receiveShadow>
                        <extrudeGeometry args={[
                           shape,
                           { depth: 0.01, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 8 }
                        ]} />
                        <meshStandardMaterial color={purple[300]} metalness={0.95} roughness={0.55} />
                     </mesh>

                     {/** Rear */}
                     <mesh position={[0, 0.35, -0.75]} rotation={[1.6, 0, 2.75]} receiveShadow>
                        <extrudeGeometry args={[
                           shape,
                           { depth: 0.01, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 8 }
                        ]} />
                        <meshStandardMaterial color={red[500]} metalness={0.95} roughness={0.55} side={2} />
                     </mesh>

                     {/** Test */}
                     <mesh position={[0, 0.15, 1.75]} rotation={[0, 0, 0.8]} receiveShadow>
                        <extrudeGeometry args={[
                           shape02,
                           { depth: 0.01, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 8 }
                        ]} />
                        <meshStandardMaterial color={green[400]} metalness={0.95} roughness={0.75} side={2} />
                     </mesh>
                     <mesh position={[0.5, 0.15, 1.75]} rotation={[0, 0, 0.8]} receiveShadow>
                        <extrudeGeometry args={[
                           shape02,
                           { depth: 0.01, steps: 32, bevelEnabled: true, bevelSize: 0.15, bevelSegments: 8 }
                        ]} />
                        <meshStandardMaterial color={orange[400]} metalness={0.95} roughness={0.75} side={2} />
                     </mesh>

                     <TBeam3 position={[0, 0.25, 0]} rotation={[0, 0, 0]}
                        // effects = { { color: yellow[500], metalness: 0.95, roughness: 0.25 }}
                        effects={{ color: purple[300], metalness: 0.95, roughness: 0.55 }}
                     />
                     {/* tyre */}
                     <mesh position={[0.15, 0.15, 0.43]} rotation={[0, 1.5, 0]} >
                        <torusGeometry args={[0.075, 0.025, 32, 32]} />
                        <meshStandardMaterial color={"grey"} metalness={1} roughness={0.65} />
                     </mesh>
                     <mesh position={[0.15, 0.145, 0.15]} rotation={[0, 1.5, 0]} >
                        <torusGeometry args={[0.075, 0.025, 32, 32]} />
                        <meshStandardMaterial color={"grey"} metalness={1} roughness={0.65} />
                     </mesh>
                     <mesh position={[0.15, 0.145, -0.15]} rotation={[0, 1.5, 0]} >
                        <torusGeometry args={[0.075, 0.025, 32, 32]} />
                        <meshStandardMaterial color={"grey"} metalness={1} roughness={0.65} />
                     </mesh>
                     <mesh position={[0.15, 0.15, -0.43]} rotation={[0, 1.5, 0]} >
                        <torusGeometry args={[0.075, 0.025, 32, 32]} />
                        <meshStandardMaterial color={"grey"} metalness={1} roughness={0.65} />
                     </mesh>


                     <TBeam3 position={[-1, 0.25, 0]} rotation={[0, 0, 0]}
                        // effects = { { color: yellow[500], metalness: 0.95, roughness: 0.25 }}
                        effects={{ color: red[300], metalness: 0.95, roughness: 0.65 }}
                     />
                     {/** nozzle, front */}
                     <mesh position={[-1, 0.15, 0.25]} receiveShadow>
                        {/* Cylinder is vertical on Y axis */}
                        <cylinderGeometry args={[0.1, 0.2, 0.3, 64]} />
                        <meshStandardMaterial color={red[900]}
                           metalness={1}
                           roughness={0.65}
                           envMapIntensity={0.75} />
                     </mesh>
                     {/** nozzle, rear */}
                     <mesh position={[-1, 0.15, -0.25]} receiveShadow>
                        {/* Cylinder is vertical on Y axis */}
                        <cylinderGeometry args={[0.1, 0.2, 0.3, 64]} />
                        <meshStandardMaterial color={red[900]}
                           metalness={1}
                           roughness={0.65}
                           envMapIntensity={0.75} />
                     </mesh>

                     {/** noose */}
                     <mesh position={[-1.015, 0.25, 0.6]} rotation={[1.5, 0, 0.05]} receiveShadow>
                        {/* Cylinder is vertical on Y axis */}
                        <cylinderGeometry args={[0.09, 0.2, 0.25, 64]} />
                        <meshStandardMaterial color={orange[300]}
                           metalness={0.95}
                           roughness={0.65}
                           envMapIntensity={0.75} />
                     </mesh>
                     {/** noose tip */}
                     <mesh position={[-1.0235, 0.255, 0.78]} rotation={[1.55, 0, 0.05]} receiveShadow>
                        {/* Cylinder is vertical on Y axis */}
                        <cylinderGeometry args={[0.005, 0.09, 0.125, 64]} />
                        <meshStandardMaterial color={yellow[300]}
                           metalness={0.95}
                           roughness={0.65}
                           envMapIntensity={0.75} />
                     </mesh>

                     <mesh position={[0, 0.5, -0.25]} rotation={[1.6, 0, 0]}>
                        { /** width, height, depth, segments, radius */}
                        <RoundedBoxGeometry args={[0.4, 0.2, 0.025, 16, 1]} />

                        <meshStandardMaterial color="red"
                           metalness={1}
                           roughness={0.45}
                           envMapIntensity={1} />
                     </mesh>

                     {/** undefinierbar, aber eine interessante Form, front grill */}
                     <MetalRod args={[0.25, 0.25, 0.15]} position={[0, 0.3, 0.5]}
                        rotation={[0, 0, 0]}
                        color={''} />
                     <MetalRod args={[0.2, 0.15, 0.35]} position={[0, 0.65, -0.22]}
                        rotation={[1.55, 0, 0]}
                        color={''} />

                     {/** Test GEOMETRIES; <torusGeometry args={[0.075, 0.025, 32, 32, Math.PI]} /> 
                      * position, rotation
                      * 
                     */}
                     <Tube position={[3, 0.5, 2]} curve={catmullCurve} color={red[400]} />

                     <MetalSpring position={[0.25, 0, 0]} rotation={[0, 0, 0]} color={red[500]} />
                     <MetalSpring position={[0.35, 0, 0]} rotation={[0, 0, 0]} color={orange[500]} />

                     {/** Shockabsorber */}
                     <ShockAbsorber position={[0, -0.1, 0.5]} rotation={[0, 0, 0.55]} />

                     {/* <TriangleControlArm color="blue" /> */}
                     {/* <TriangleWithHoles position={[-2, 2, 0]} /> */}

                     {/** front wishbones */}
                     <DIYControlArm position={[0.35, 0.15, 1.5]} rotation={[0, 1.5, 0]} />
                     <DIYControlArm position={[-0.35, 0.15, 0]} rotation={[0, -1.5, 0]} />

                     {/** undefinierbare objekte, erzeugt mit MetalRod */}
                     {/* <group position={[0, 0, -4]} receiveShadow>
                        <mesh position={[0.6, 0.25, 0]} receiveShadow>
                           <sphereGeometry args={[0.1, 32, 32]} />
                           <meshStandardMaterial color={red[500]} />
                        </mesh>
                        <MetalRod args={[0.35, 0.15, 0]}
                           position={[0.5, 0.25, 0]}
                           rotation={[0, 0, 0]}
                           color={yellow[100]}
                        />
                        <mesh position={[0.4, 0.25, 0]} receiveShadow>
                           <sphereGeometry args={[0.1, 32, 32]} />
                           <meshStandardMaterial color={orange[500]} />
                        </mesh>
                     </group> */}

                     <MetalRod args={[0.5, 0.2, 0.05]}
                        position={[1, 0.3, 1]}
                        rotation={[0, 0, 0]}
                        color={yellow[500]}
                     />

                     {/* <BallJointSimple /> */}

                     {/* <Physics gravity={[0, -9.81, 0]} debug>
                        <Suspension />
                     </Physics> */}

                     {/* <MetalRack position={[1, 0, 3]} color={blue[100]}/>
                     <Fence position={[0, 0, 7]} color={blue[500]}/>
                     <GridFence3D position={[1, 0, 3]} color='red' /> */}

                     {/* <Triangle position={[-4, 0.65, 3]}/> */}

                     {/* Ground */}
                     <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial
                           color='grey'
                           roughness={1}
                           metalness={0}
                        // map={camoTexture} // #4b5320
                        />
                     </mesh>
                     <OrbitControls />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // PartsTestground()
