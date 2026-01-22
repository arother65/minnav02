/**
 * 
 *  Stand: 21.01.2026
 * 
 */

import { Canvas } from "@react-three/fiber"
import { OrbitControls, RoundedBox } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

// 
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
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

function createSkeleton() {
   const root = new THREE.Bone()
   root.position.y = 0

   const head = new THREE.Bone()
   head.position.y = 1
   root.add(head)

   return new THREE.Skeleton([root, head])
}

function createSkinnedGeometry() {
   const geo = new THREE.BoxGeometry(0.5, 2, 0.5)
   const pos = geo.attributes.position

   const skinIndices = []
   const skinWeights = []

   for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)

      if (y > 0) {
         skinIndices.push(1, 0, 0, 0) // head bone
         skinWeights.push(1, 0, 0, 0)
      } else {
         skinIndices.push(0, 0, 0, 0) // root bone
         skinWeights.push(1, 0, 0, 0)
      }
   }

   geo.setAttribute(
      'skinIndex',
      new THREE.Uint16BufferAttribute(skinIndices, 4)
   )
   geo.setAttribute(
      'skinWeight',
      new THREE.Float32BufferAttribute(skinWeights, 4)
   )

   return geo
}

function SkinnedCharacter() {
   const skeleton = useMemo(createSkeleton, [])
   const geometry = useMemo(createSkinnedGeometry, [])

   useFrame(({ clock }) => {
      skeleton.bones[1].rotation.z = Math.sin(clock.elapsedTime) * 0.5
   })

   return (
      <group position={[0, -1, 0]}>
         <skinnedMesh geometry={geometry} skeleton={skeleton}>
            <meshStandardMaterial color="orange" skinning />
         </skinnedMesh>

         {/* VERY IMPORTANT */}
         <primitive object={skeleton.bones[0]} />
      </group>
   )
}


function Mario() {
   return (
      <group position={[0, -0.05, 0]}>
         {/* Head */}
         <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#f1c27d" />
         </mesh>

         {/* Hat */}
         <mesh position={[0, 2.7, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.3, 32]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* Body */}
         <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
            <meshStandardMaterial skinning
               color="#e52521" />
         </mesh>

         {/* Arms */}
         <mesh position={[-0.9, 1.4, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshStandardMaterial color="red" />
         </mesh>
         <mesh position={[0.9, 1.4, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* Legs */}
         <mesh position={[-0.3, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
            <meshStandardMaterial color="brown" />
         </mesh>
         <mesh position={[0.3, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.8, 16]} />
            <meshStandardMaterial color="brown" />
         </mesh>
      </group>
   )
}  // Mario()


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


// Mario3D page component
export default function Mario3D() {

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

            <Canvas shadows camera={{ position: [5, 5, 5], fov: 75 }}
               style={{
                  width: "90vw",
                  height: "90vh",
                  display: "block"
               }}>
               <ambientLight intensity={1} />
               <directionalLight position={[5, 5, 5]} castShadow />

               <Mario />

               {/* <SkinnedCharacter /> */}

               <AnimatedTerrain />

               {/* Ground */}
               {/* <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[20, 20, 10, 10]} />
                  <meshStandardMaterial color="grey" /> */}
               {/* </mesh> */}

               <OrbitControls />
            </Canvas>
         </main>
      </>
   )
}  // Mario3D()
