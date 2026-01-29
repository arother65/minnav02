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
import { OrbitControls, RoundedBoxGeometry, Text } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { blue, brown, orange, purple, red, yellow, green } from "@mui/material/colors"

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
import TwistedCable from '../components/TwistedCable'
import Tube from '../components/Tube'

// import Triangle from '../components/Triangle'


/** ------------------------------------------------------------------------ */
//    Local declarations / components
/** ------------------------------------------------------------------------ */

// const test = THREE.ArcCurve()

//* PartsTestground page component
export default function PartsTestground() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

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
                  <Canvas shadows camera={{ position: [4, 4, 4], fov: 45 }}
                     style={{
                        width: "88vw",
                        height: "88vh",
                        display: "block"
                     }}>
                     <ambientLight intensity={0.75} />
                     <directionalLight position={[5, 5, 5]} castShadow />

                     <Text position={[0, 1, -1]} color={red[400]} fontSize={0.25}>MUI colors appear darker than defined</Text>

                     {/* <TBeam position={[-0.5, 0.25, 6]} />
                     <TBeamRusted position={[-1.25, 0.25, 6]} />
                     <TBeamRusted2 position={[-2, 0.25, 6]} /> */}

                     {/* effects = { color: blue[500], metalness: 0.95, roughness: 0.25 }  */}
                     {/* <TBeam3 position={[0, 0.25, 0]}
                        effects={{ color: blue[100], metalness: 0.95, roughness: 0.45 }}
                     /> */}


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

                     {/** Test GEOMETRIES; <torusGeometry args={[0.075, 0.025, 32, 32, Math.PI]} /> 
                      * position, rotation
                      * 
                     */}
                     <Tube />

                     <TwistedCable position={[1, 0.5, 0]} rotation={[1.55, 0, 0]} color={red[500]} />

                     <TwistedCable position={[2, 0, 0]} rotation={[0, 0, 0]} color={orange[500]} />
                     <TwistedCable position={[3, 0, 0]} rotation={[0, 0, 0]} />

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
