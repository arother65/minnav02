/**
 *  https://www.npmjs.com/package/@react-three/fiber
 */

// imports 
import { useEffect, useState, useRef } from 'react'
import { Alert, Button } from '@mui/material'

import { Canvas, useFrame } from '@react-three/fiber'
import { RigidBody } from "@react-three/rapier"
import { Physics } from "@react-three/rapier"
import { OrbitControls } from "@react-three/drei"

//
export default function Circle() {

   const body = useRef()

   //
   return (
      <div className='row m-2 bg-dark rounded' style={{ width: '98vw', height: '200px' }}>

         <div className='col m-1 bg-dark-subtle rounded' style={{ width: '50%' }}>
            <h6 style={{ color: 'black' }}>circleGeometry</h6>
         </div>

         <div className='col m-1 bg-light border rounded' style={{ width: '50%' }}>
            <Canvas camera={{ position: [0, 0, 0], fov: 50 }} shadows>  {/*  fov: Nähe zum Betrachter */}
               <ambientLight intensity={0.4} />
               <directionalLight position={[5, 8, 5]} intensity={1} />

               {/* <Physics> */}
                  {/* <RigidBody type="fixed" position={[0, 0, 0]} ref={body}> */}

                     <mesh value={1} position={[0, 0, 0]} rotation={[0, 0, 0]}> 
                        <circleGeometry args={[1.5, 64]} />

                        {/* <ringGeometry args={[0.05, 0.1, 32]} /> */}
                        <meshStandardMaterial color="black" />
                     </mesh>

                  {/* </RigidBody> */}
               {/* </Physics> */}
               <OrbitControls />
            </Canvas>
         </div>
      </div>
   )  // return()
}  // Circle()