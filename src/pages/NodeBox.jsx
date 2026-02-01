/**
 * 
 *  Stand: 01.02.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */
// import * as THREE from 'three'

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, CameraControls, Environment, PivotControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Box, AppBar, Toolbar, Tooltip, IconButton, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */

/** ------------------------------------------------------------------------ */
//    Local declarations / components
/** ------------------------------------------------------------------------ */
function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }) {

   const mesh = useRef()
   const { worldUnits } = useControls({ worldUnits: false })
   const { nodes } = useGLTF('/models/aobox-transformed.glb')

   useFrame((state, delta) => {
      mesh.current.rotation.x = mesh.current.rotation.y += delta
   })

   return (
      <MeshPortalMaterial worldUnits={worldUnits} attach={`material-${index}`}>
         {/** Everything in here is inside the portal and isolated from the canvas */}
         <ambientLight intensity={0.5} />

         <Environment preset="city" />

         {/** A box with baked AO */}
         <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
            <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
            <spotLight castShadow color={bg} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} />
         </mesh>

         {/** The shape */}
         <mesh castShadow receiveShadow ref={mesh}>
            {children}
            <meshLambertMaterial color={bg} />
         </mesh>
      </MeshPortalMaterial>
   )
}  // Side()

//* NodeBox page component
export default function NodeBox() {

   // navigation for MenuItem
   const fnNavigate = useNavigate()

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

                     <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={0.75} lineWidth={3.5}>
                        <mesh castShadow receiveShadow>
                           <boxGeometry args={[2, 2, 2]} />
                           <Edges color='red'/>

                           <Side rotation={[0, 0, 0]} bg="orange" index={0}>
                              <torusGeometry args={[0.65, 0.3, 64]} />
                           </Side>
                           <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
                              <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
                           </Side>
                           <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="lightgreen" index={2}>
                              <boxGeometry args={[1.15, 1.15, 1.15]} />
                           </Side>
                           <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="aquamarine" index={3}>
                              <octahedronGeometry />
                           </Side>
                           <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
                              <icosahedronGeometry />
                           </Side>
                           <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
                              <dodecahedronGeometry />
                           </Side>

                        </mesh>
                     </PivotControls>

                     <CameraControls makeDefault />
                  </Canvas>
               </Box>
            </div>
         </main>
      </>
   )
}  // NodeBox()
