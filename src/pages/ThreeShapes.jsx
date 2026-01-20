/**
 * 
 * 
 * 
 */

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls, Text } from "@react-three/drei"

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import logo from '../logo.svg'

//
function Pentagon({ radius = 1, depth = 0.4 }) {

   const [hovered, setHovered] = useState(false)

   const shape = new THREE.Shape()
   for (let i = 0; i < 6; i++) {
      const angle = (i / 5) * Math.PI * 2

      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
   }
   shape.closePath()

   return (
      <group>
         {/* Geometry */}
         <mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
         >
            <extrudeGeometry
               args={[
                  shape,
                  { depth, bevelEnabled: false }
               ]}
            />
            <meshStandardMaterial color="skyblue" />
         </mesh>

         {/* Text label */}
{/*          <Text
            position={[0, 1.95, 0.5]}   // slightly above
            fontSize={1.5}
            color="black"
            anchorX="center"
            anchorY="middle"
         >
            Pentagon
         </Text> */}

         {hovered && (
            <Text
               position={[2, 2, 2.7]}
               fontSize={1.2}
               color="white"
            >
               Click me!
            </Text>
         )}
      </group>
   )
}

//
export default function ThreeShapes() {

   // navigation 
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
                  <Tooltip title='ReactJS home' arrow >
                     <nav>
                        <a href="https://reactnative.dev/" rel='noreferrer' target='_blank'>
                           <img src={logo} className="App-logo" alt="logo" />
                        </a>
                     </nav>
                  </Tooltip>
               </Toolbar>
            </AppBar>
         </header>

         <Canvas camera={{ position: [6, 6, 6], fov: 45 }}
            style={{
               width: "90vw",
               height: "90vh",
               display: "block"
            }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />

            <Pentagon radius={5} depth={1.95} />

            <OrbitControls />
         </Canvas>
      </>
   )
}  // ThreeShapes()