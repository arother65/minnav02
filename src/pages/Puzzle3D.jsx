/**
 * 
 *  Stand: 21.01.2026
 * 
 */

import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { useRef, useState } from 'react'
import { useDrag } from '@use-gesture/react'


import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

// 
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// import logo192 from '../components/logo192.png'


//
function MetalRod({ args, position, rotation, color }) {
   return (
      <mesh position={position} rotation={rotation}>
         <RoundedBox
            args={args}   // width, height, depth
            radius={0.15}         // corner radius
            smoothness={32}        // segments
         >
            <meshStandardMaterial
               color={color}
               metalness={1}
               roughness={0.55}
               envMapIntensity={0.5}
            />
         </RoundedBox>
      </mesh>
   )
}  // MetalRod()


//
function AnimatedTerrain() {
   const ref = useRef()

   useFrame(({ clock }) => {
      const pos = ref.current.geometry.attributes.position
      const t = clock.elapsedTime

      for (let i = 0; i < pos.count; i++) {
         const x = pos.getX(i)
         const y = pos.getY(i)
         pos.setZ(i, Math.sin(x * 0.2 + t) * Math.cos(y * 0.2) * 2)
      }

      pos.needsUpdate = true
      ref.current.geometry.computeVertexNormals()
   })

   return (
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
         <planeGeometry args={[50, 50, 128, 128]} />
         <meshStandardMaterial color="#2196f3" />
      </mesh>
   )
}  // AnimatedTerrain()

const GRID_SIZE = 5   // 3x3x3 soma cube
const CELL = 1

const PIECES = [
   {
      id: 1,
      color: 'orange',
      blocks: [
         [0, 0, 0],
         [1, 0, 0],
         [0, 1, 0],
      ],
   },
   {
      id: 2,
      color: 'hotpink',
      blocks: [
         [0, 0, 0],
         [1, 0, 0],
         [2, 0, 0],
         [1, 1, 0],
      ],
   },
]

function snapToGrid(pos) {
   return pos.map(v => Math.round(v))
}

function isInsideGrid([x, y, z]) {
   return (
      x >= 0 && x < GRID_SIZE &&
      y >= 0 && y < GRID_SIZE &&
      z >= 0 && z < GRID_SIZE
   )
}

function blocksWorldPositions(piece, position) {
   return piece.blocks.map(b => [
      b[0] + position[0],
      b[1] + position[1],
      b[2] + position[2],
   ])
}

function Piece({ piece }) {
   const ref = useRef()
   const [pos, setPos] = useState([0, 0, 0])
   const [rot, setRot] = useState([0, 0, 0])

   const bind = useDrag(({ offset: [x, y] }) => {
      setPos(snapToGrid([x / 50, 0, y / 50]))
   })

   const rotate = axis => {
      setRot(r => {
         const next = [...r]
         next[axis] += Math.PI / 2
         return next
      })
   }

   return (
      <group
         ref={ref}
         {...bind()}
         position={pos}
         rotation={rot}
         onClick={() => rotate(1)}
      >
         {piece.blocks.map((b, i) => (
            <mesh key={i} position={b}>
               <boxGeometry args={[1, 1, 1]} />
               <meshStandardMaterial color={piece.color} />
            </mesh>
         ))}
      </group>
   )
}


function Grid() {
   return (
      <mesh position={[1, 1, 1]}>
         <boxGeometry args={[GRID_SIZE, GRID_SIZE, GRID_SIZE]} />
         <meshBasicMaterial wireframe />
      </mesh>
   )
}


// Puzzle3D page component
export default function Puzzle3D() {

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
               </Toolbar>
            </AppBar>
         </header>

         <main className="App-main">
            <div className="row mt-5"></div>

            <Canvas shadows camera={{ position: [5, 5, 5], fov: 95 }}
               style={{
                  width: "90vw",
                  height: "90vh",
                  display: "block"
               }}>
               <ambientLight intensity={1} />
               <directionalLight position={[5, 5, 5]} castShadow />

               <Grid />

               {PIECES.map(p => (
                  <Piece key={p.id} piece={p} />
               ))}

               {/* <AnimatedTerrain /> */}

               {/* Ground */}
               {/* <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[20, 20, 10, 10]} />
                  <meshStandardMaterial color="grey" /> */}
               {/* </mesh> */}

               <OrbitControls />
            </Canvas>
         </main>

      </>
   )  // return()
}  // Puzzle3D()
