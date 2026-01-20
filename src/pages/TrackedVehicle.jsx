/**
 * 
 * 
 * 
 */

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


// 
function Hull() {
   return (
      // TRUE sloped T-34 hull: lower hull + upper glacis wedge
      <group position={[0, 1, 0]}>
         {/* Lower hull */}
         <mesh castShadow receiveShadow>
            <boxGeometry args={[6, 1.1, 3.4]} />
            <meshStandardMaterial color="#4b5d2a" roughness={0.75} />
         </mesh>


         {/* Upper glacis (sloped front armor) */}
         <mesh
            position={[1.6, 0.6, 0]}
            rotation={[0, 0, -0.55]}
            castShadow
            receiveShadow
         >
            <boxGeometry args={[2.6, 0.9, 3.35]} />
            <meshStandardMaterial color="#4b5d2a" roughness={0.7} />
         </mesh>

         {/* Rear engine deck slope */}
         <mesh
            position={[-1.8, 0.55, 0]}
            rotation={[0, 0, 0.35]}
            castShadow
            receiveShadow
         >
            <boxGeometry args={[2.2, 0.8, 3.35]} />
            <meshStandardMaterial color="#4b5d2a" roughness={0.8} />
         </mesh>
      </group>
   )
}

/* ---------------- EXHAUST ---------------- */
function Exhaust() {
   return (
      <group position={[-1.8, 1.1, -2]}>
         {Array.from({ length: 2 }).map((_, i) => (
            <mesh key={i} position={[i * 0.8, 0, 0]}>
               <cylinderGeometry args={[0.18, 0.18, 0.6, 12]} />
               <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
            </mesh>
         ))}
      </group>
   )
}

/* ---------------- FUEL DRUMS ---------------- */
function FuelDrums() {
   return (
      <group position={[0, 1.2, -2.8]}>
         {Array.from({ length: 2 }).map((_, i) => (
            <mesh key={i} position={[i * 1.1 - 0.55, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
               <cylinderGeometry args={[0.35, 0.35, 1.1, 20]} />
               <meshStandardMaterial color="#3b3b3b" roughness={0.7} />
            </mesh>
         ))}
      </group>
   )
}

/* ---------------- HATCHES ---------------- */
function Hatches() {
   return (
      <group position={[0, 2.6, 0]}>
         {/* Commander hatch */}
         <mesh position={[0.4, 0, -0.3]} rotation={[-0.15, 0.2, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.08, 20]} />
            <meshStandardMaterial color="#445428" roughness={0.6} />
         </mesh>

         {/* Loader hatch */}
         <mesh position={[-0.4, 0, -0.3]} rotation={[-0.1, -0.15, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.08, 20]} />
            <meshStandardMaterial color="#445428" roughness={0.6} />
         </mesh>
      </group>
   )
}

function Turret() {

   const points = []
   points.push(new THREE.Vector2(0.0, 0.0))
   points.push(new THREE.Vector2(0.8, 0.1))
   points.push(new THREE.Vector2(1.2, 0.3))
   points.push(new THREE.Vector2(1.3, 0.6))
   points.push(new THREE.Vector2(1.15, 0.9))
   points.push(new THREE.Vector2(0.7, 1.1))

   return (
      <group position={[0, 2, 0]}>
         <mesh rotation={[0, Math.PI, 0]} castShadow>
            <latheGeometry args={[points, 32]} />
            <meshStandardMaterial color="#3f4f24" roughness={0.6} />
         </mesh>

         {/* Gun mantlet */}
         <mesh position={[0, 0.6, 1.2]} castShadow>
            <boxGeometry args={[0.9, 0.6, 0.5]} />
            <meshStandardMaterial color="#3f4f24" />
         </mesh>

         {/* Cannon */}
         <mesh position={[0, 0.6, 3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 4, 24]} />
            <meshStandardMaterial color="#3f4f24" metalness={0.6} roughness={0.3} />
         </mesh>

         <Hatches />
      </group>
   )
}

function Track({ side = 1 }) {
   return (
      <group position={[side * 2.2, 0.6, 0]}>
         {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[0, 0, i * 0.9 - 2.3]}>
               <cylinderGeometry args={[0.45, 0.45, 0.5, 18]} />
               <meshStandardMaterial color="#1c1c1c" roughness={0.8} />
            </mesh>
         ))}
      </group>
   )
}

function ArmorZone({ size, position, rotation, armor, name }) {
   return (
      <mesh position={position} rotation={rotation} userData={{ armor, name }} visible={false}>
         <boxGeometry args={size} />
         <meshBasicMaterial color="red" wireframe />
      </mesh>
   )
}

function T34Tank() {
   return (
      <group>
         <Hull />
         <Turret />
         <Exhaust />
         <FuelDrums />

         {/* ARMOR ZONES */}
         <ArmorZone
            name="front"
            armor={75}
            size={[3.5, 1.2, 0.6]}
            position={[1.7, 1.2, 0]}
            rotation={[0, Math.PI / 2, 0]}
         />
         <ArmorZone
            name="side"
            armor={45}
            size={[3.4, 1.2, 0.5]}
            position={[0, 1.2, 1.9]}
            rotation={[0, 0, 0]}
         />
         <ArmorZone
            name="side"
            armor={45}
            size={[3.4, 1.2, 0.5]}
            position={[0, 1.2, -1.9]}
            rotation={[0, 0, 0]}
         />
         <ArmorZone
            name="rear"
            armor={40}
            size={[3, 1.1, 0.6]}
            position={[-1.7, 1.2, 0]}
            rotation={[0, Math.PI / 2, 0]}
         />

         <Track side={1} />
         <Track side={-1} />
      </group>
   )
}


//
export default function TrackedVehicle() {

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

         <main>
            {/* <div className="row mt-5"></div> */}

            <div className="row mt-1 min-vh-100 min-vw-75">
               <div className="col min-vh-75">
                  <Canvas camera={{ position: [10, 6, 10], fov: 50 }}>
                     <ambientLight intensity={0.4} />
                     <directionalLight position={[10, 10, 5]} intensity={1} />

                     <T34Tank />

                     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                        <planeGeometry args={[75, 75]} />
                        <meshStandardMaterial color="lightgrey" />
                     </mesh>

                     <OrbitControls />
                  </Canvas>
               </div>
            </div>
         </main>
      </>
   )
}