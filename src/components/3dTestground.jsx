/**
 *  https://www.npmjs.com/package/@react-three/fiber
 */

// imports 
import { Canvas, useFrame } from '@react-three/fiber'
import { Button } from '@mui/material'
import { useEffect, useState, useRef } from 'react'

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
      { position: [-4, 0, 0], color: 'yellow', speed: 2.0 },
      { position: [-5, 0, 0], color: 'darkred', speed: 2.5 },
      { position: [-6, 0, 0], color: 'darkgreen', speed: 3.0 },
   ]

   /*    const cubes03 = [
         { position: [0, 0, 0], color: 'red', speed: 1 },
         { position: [0.5, 0, 0], color: 'green', speed: 1 },
         { position: [-1, 0, 0], color: 'blue', speed: 1 },
         { position: [-1.5, 0, 0], color: 'yellow', speed: 1 },
         { position: [-2, 0, 0], color: 'darkred', speed: 1 },
         { position: [-2.5, 0, 0], color: 'darkgreen', speed: 1 },
      ]
    */
   const cubes03Init = [
      { position: [0, 0, 0], color: 'red', speed: 1 },
      { position: [0.5, 0, 0], color: 'green', speed: 1 },
   ]

   // push new object data to cubes03
   // cubes03.push({ position: [-2.5, 0, 0], color: 'darkgreen', speed: 1 })

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

   const [cubes03, setNoCubes] = useState(cubes03Init)
   useEffect(() => {
      console.log('new data for cubes03', cubes03)
   }, [cubes03])  // useEffect()

   // 
   return (
      <>
         {/*          <Canvas>
            <ambientLight />
            <mesh
               position={[0, 2, 0]}
               rotation={[Math.PI / 4, 0, 0]}>
               <boxGeometry args={[1, 1, 1]} />
               <meshStandardMaterial color="lightgrey" />
            </mesh>
            <mesh position={[5, 1, 0]}>
               <sphereGeometry args={[2, 2, 2]} />
               <meshStandardMaterial color="green" />
            </mesh>
         </Canvas> */}

         <div className='row m-2 bg-light border border-2 border-success rounded shadow'>
            <p className='text-dark'>Canvas in bs-row</p>
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
               <ambientLight intensity={0.5} />
               <directionalLight position={[5, 5, 5]} />

               {cubes02.map((cube, index) => (
                  // <div className='col border border-1'>
                  <Cube02 key={index} {...cube} />
                  // </div>
               ))}

               {/*             <mesh visible userData={{ hello: 'world' }} position={[1, 0, 0]}>
               <sphereGeometry args={[2, 2, 2]} />
               <meshStandardMaterial color="green" />
            </mesh> */}
            </Canvas>
         </div>

         <div className='row m-2 bg-light border border-2 border-success rounded'>

            <div className='col'>
               <p className='text-dark'>Canvas in bs-row</p>
               <Button variant="outlined" size="medium"
                  onClick={(e) => {

                     // const clone = [...original]
                     let newCubeArray = [...cubes03]

                     let position = []
                     newCubeArray[0].position[0] = newCubeArray[0].position[0] + 1

                     newCubeArray.push({ position, color: 'yellow', speed: 1 })
                     setNoCubes(newCubeArray)  //? no re-render

                     // setNoCubes(cubes03 => ({
                     //     ...cubes03,
                     //    position: position,
                     //    color: 'red'
                     // }))
                  }}>
                  add cube
               </Button>
            </div>

            <div className='col m-1 bg-light border border-2 rounded shadow' width='50%'>
               <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} />

                  {cubes03.map((cube, index) => (
                     <Cube02 key={index} {...cube} />
                  ))}
               </Canvas>
            </div>

            {/*             <div className='col m-1 bg-light border border-2 rounded shadow' width='50%'>
               <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} />

                  { cubes03.map((cube, index) => ( <Cube02 key={index} {...cube} /> )) }
               </Canvas>
            </div> */}

         </div>
      </>
   )
}  // ThreeDTest()