import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'


// Wheel component 
function Wheel({ position }) {
   return (
      <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
         <cylinderGeometry args={[0.3, 0.3, 0.45, 48]} />
         <meshStandardMaterial color="black" />
      </mesh>
   )
}  // Wheel() 

// Car component 
function Car() {

   return (
      <group position={[0, 0.5, 0]}>
         {/* Body */}
         <mesh castShadow>
            <boxGeometry args={[1, 0.5, 5]} />
            <meshStandardMaterial color="red" />
         </mesh>

         {/* Cabin */}
         <mesh position={[0, 0.6, 1.5]}>
            <boxGeometry args={[-1, 0.65, 0.75]} />
            <meshStandardMaterial color="darkred" />
         </mesh>

         {/* Cabin level 1 */}
         <mesh position={[0, 1, 1.75]}>
            <boxGeometry args={[-1, 0.05, 0.5]} />
            <meshStandardMaterial color="green" />
         </mesh>


         {/* Wheels */}
         <Wheel position={[-0.8, -0.25, 1.5]} />
         <Wheel position={[0.8, -0.25, 1.5]} />
         <Wheel position={[-0.8, -0.25, -1.5]} />
         <Wheel position={[0.8, -0.25, -1.5]} />
      </group>
   )
}  // Car()

// Car3D page component
export default function Car3D() {

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
            <div className="row mt-5"></div>

            <div className="col min-vh-100 min-vw-100">
               <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 5, 5]} castShadow />

                  <Car />

                  {/* Ground */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                     <planeGeometry args={[50, 50]} />
                     <meshStandardMaterial color="#4caf50" />
                  </mesh>

                  <OrbitControls />
               </Canvas>
            </div>
         </main>
      </>
   )
}  // Car3D()
