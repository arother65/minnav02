/**
 * A simple 3D Pyramid component using React Three Fiber 
 */

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useTexture, Stars } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Physics } from '@react-three/rapier'

// import { Sky } from "@react-three/drei"
// import testFlagge from '../../public/flags/img1_.jpg'

//* local functions
function Pyramid({ args, position, ivTexture }) {

   const texture = useTexture(ivTexture)

   texture.wrapS = texture.wrapT = 1000
   texture.repeat.set(1, 1)

   return (
      <mesh rotation={[0, 10, 0]} position={position} castShadow receiveShadow>
         <coneGeometry args={args} />

         {/* <meshStandardMaterial color="#d2b48c" map={texture} roughness={0.9} metalness={0.05} /> */}
         <meshStandardMaterial map={texture} roughness={0} metalness={0} envMapIntensity={0.5} />
      </mesh>
   )
}  // Pyramid()

function Ground() {
   const grass = useTexture('./grass.png')
   grass.wrapS = grass.wrapT = 1000
   grass.repeat.set(1, 1)  // small numbers = higher detail

   return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]} receiveShadow>
         <planeGeometry args={[30, 30]} />
         <meshStandardMaterial
            map={grass}
         // roughness={0}
         // metalness={0} 
         />
      </mesh>
   )
}  // Ground()

// Test CuboidCollider
function FNcuboidCollider() {
   return (
      <Canvas camera={{ position: [3, 3, 5] }}>
         <ambientLight intensity={0.4} />
         <directionalLight position={[5, 5, 5]} />

         <Physics gravity={[0, -9.81, 0]}>
            <RigidBody
               position={[0, 5, 0]}
               colliders={false}   // disable auto colliders
               restitution={0.3}
               friction={0.8}
            >
               <mesh castShadow>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="orange" />
               </mesh>

               {/* Half size = 0.5 */}
               <CuboidCollider args={[0.5, 0.5, 0.5]} />
            </RigidBody>
         </Physics>
      </Canvas>
   )
} // FNcuboidCollider()

//
function Wall({
   width = 1,
   height = 1,
   depth = 1,
   position = [1, 1, 1],
   rotation = [0, 0, 0],
   color = "darkred",
   ivTexture
}) {

   const texture = useTexture(ivTexture || './flags/img1_.jpg')

   texture.wrapS = texture.wrapT = 1000
   texture.repeat.set(1, 1)

   // 
   return (
      <mesh position={position} rotation={rotation} castShadow receiveShadow>
         <boxGeometry args={[width, height, depth]} />

         {/* <meshStandardMaterial color={color}  map={texture}/> */}
         <meshStandardMaterial
            color={ivTexture ? undefined : color}
            map={ivTexture ? texture : undefined}
            roughness={0.8}
            metalness={0}
         />
      </mesh>
   )
}  // Wall()

//
export default function Pyramid3D() {

   return (
      <div className="w-full h-screen">
         <Canvas camera={{ position: [5, 5, 5], fov: 100 }}
            // fog={['#3b1c5a', 10, 40]}   // color, near, far
            shadows
         >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} castShadow />

            {/* <Stars radius={100} depth={50} count={1000} factor={6} saturation={0.5} fade speed={1} /> */}

            {/* HDRI Environment */}
            {/* <Environment
               files="/hdri/charolettenbrunn_park_2k.hdr"
               background   // <-- makes it the sky
            /> */}

            {/* Sky */}
            {/* <Sky     
          sunPosition={[100, 20, 100]}
          turbidity={8}
          rayleigh={6}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        /> */}

            {/* <Environment preset="sunset" background />  */}
            <Pyramid args={[4.5, 4.5, 64]} position={[-6, 0, 0]} ivTexture={'./flags/img1_.jpg'} />
            <Pyramid args={[4.5, 2.5, 4]} position={[1, 0, 1]} ivTexture={'./flags/img2_.jpg'} />
            <Pyramid args={[3.5, 2.5, 4]} position={[2, 0, 2]} ivTexture={'./flags/img3_.jpg'} />
            <Pyramid args={[3.5, 2.5, 4]} position={[3, 0, 3]} ivTexture={'./flags/img4_.jpg'} />
            <Pyramid args={[2.5, 2.5, 4]} position={[4, 0, 4]} ivTexture={'./flags/img5_.jpg'} />

            <Pyramid args={[1.5, 2.5, 4]} position={[-1, 0, 6]} ivTexture={'./flags/img6_.jpg'} />
            <Pyramid args={[1.5, 2.5, 4]} position={[-2, 0, 5]} ivTexture={'./flags/img7_.jpg'} />
            <Pyramid args={[1.6, 2.5, 4]} position={[-3, 0, 6]} ivTexture={'./flags/img8_.jpg'} />
            <Pyramid args={[1.6, 2.5, 4]} position={[-4, 0, 5]} ivTexture={'./flags/img9_.jpg'} />
            <Pyramid args={[1.7, 2.5, 4]} position={[-5, 0, 6]} ivTexture={'./flags/img10_.jpg'} />
            <Pyramid args={[1.7, 2.5, 4]} position={[-6, 0, 5]} ivTexture={'./flags/img11_.jpg'} />
            <Pyramid args={[1.8, 2.5, 4]} position={[-7, 0, 6]} ivTexture={'./flags/img12_.jpg'} />


            {/* Wall components */}
            <Wall position={[5, 0, 0]} color='darkblue' ivTexture={'./damaged_plaster_diff_2k.jpg'} />
            {/* <Wall position={[5, 0, 0]} color='darkblue' ivTexture={'./flags/img1_.jpg'} /> */}
            {/* <Wall position={[5, 0, 0]} color='darkblue' /> */}

            <Wall position={[6, 0, 0]} color='blue' ivTexture={'./broken_brick_wall_diff_2k.jpg'} />
            <Wall position={[7, 0, 0]} color='lightblue' ivTexture={'./damaged_plaster_diff_2k.jpg'} />

            <Wall position={[5, 1, 0]} color='darkred' ivTexture={'./damaged_plaster_diff_2k.jpg'} />
            <Wall position={[6, 1, 0]} color='red' ivTexture={'./broken_brick_wall_diff_2k.jpg'} />
            <Wall position={[7, 1, 0]} color='orange' ivTexture={'./damaged_plaster_diff_2k.jpg'} />

            <Wall position={[5, 2, 0]} color='darkgreen' ivTexture={'./damaged_plaster_diff_2k.jpg'} />
            <Wall position={[6, 2, 0]} color='green' ivTexture={'./broken_brick_wall_diff_2k.jpg'} />
            <Wall position={[7, 2, 0]} color='lightgreen' ivTexture={'./damaged_plaster_diff_2k.jpg'} />

            <Wall position={[5, 3, 0]} color='darkred' ivTexture={'./damaged_plaster_diff_2k.jpg'} />
            <Wall position={[6, 3, 0]} color='beige' ivTexture={'./broken_brick_wall_diff_2k.jpg'} />
            <Wall position={[7, 3, 0]} color='darkred' ivTexture={'./damaged_plaster_diff_2k.jpg'} />

            <Wall position={[-10, 0, 2]} color='darkblue' />   {/*ivTexture={'./damaged_plaster_diff_2k.jpg'} /> */}
            <Wall position={[-10, 1, 2]} color='darkblue' />

            <Ground />
            <OrbitControls />
         </Canvas>

         {/* <FNcuboidCollider /> errs  */}

      </div>
   )
}  // Pyramid3D()
