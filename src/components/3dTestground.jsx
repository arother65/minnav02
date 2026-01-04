/**
 *  https://www.npmjs.com/package/@react-three/fiber
 */

// imports 
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

//
export default function ThreeDTest() {

   const cubes = [
      { position: [0, 0, 0], color: 'red' },
      { position: [2, 0, 0], color: 'green' },
      { position: [-2, 0, 0], color: 'blue' },
      { position: [0, 2, 0], color: 'orange' },
   ]

  const cubes02 = [
    { position: [0, 0, 0], color: 'red', speed: 0.5 },
    { position: [2, 0, 0], color: 'green', speed: 1 },
    { position: [-2, 0, 0], color: 'blue', speed: 1.5 },
  ]

   function Cube({ position, color }) {
      return (
         <mesh position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
         </mesh>
      )
   }  // Cube()

   function Cube02({ position, color, speed }) {
      const ref = useRef()

      useFrame((_, delta) => {
         ref.current.rotation.y += speed * delta
         ref.current.rotation.x += speed * delta
      })

      return (
         <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
         </mesh>
      )
   }  // Cube02

   // 
   return (
      <>
         <Canvas>
            <ambientLight />
            <mesh
               position={[0, 2, 0]}
               rotation={[Math.PI / 4, 0, 0]}>
               <boxGeometry args={[1, 1, 1]} />
               <meshStandardMaterial color="lightgrey" />
            </mesh>

            {/*             <mesh position={[10, 20, 0]} rotation={[Math.PI / 4, 0, 0]}>
               <cylinderGeometry args={[10, 10, 10]} />
               <meshStandardMaterial color="red" />
            </mesh> */}

            <mesh position={[5, 1, 0]}>
               <sphereGeometry args={[2, 2, 2]} />
               <meshStandardMaterial color="green" />
            </mesh>
         </Canvas>

         <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            {cubes02.map((cube, index) => (
               <Cube02 key={index} {...cube} />
            ))}
         </Canvas>

         {/*          <Canvas >
            <mesh position={[15, 15, 0]}>
               <sphereGeometry args={[5, 5, 5]} />
               <meshStandardMaterial color="red" />
            </mesh>
         </Canvas> */}
      </>
   )
}  // ThreeDTest()