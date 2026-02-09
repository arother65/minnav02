/**
 * 
 * 
 * 
 */

//*
import { useRef, useEffect } from 'react'
// import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {
   RigidBody,
   CuboidCollider 
} from '@react-three/rapier'

import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

//*
function useFlipperInput() {

   const left = useRef(false)
   const right = useRef(false)

   useEffect(() => {
      const down = (e) => {
         if (e.code === 'KeyA') left.current = true
         if (e.code === 'KeyL') right.current = true
      }

      const up = (e) => {
         if (e.code === 'KeyA') left.current = false
         if (e.code === 'KeyL') right.current = false
      }

      window.addEventListener('keydown', down)
      window.addEventListener('keyup', up)
      return () => {
         window.removeEventListener('keydown', down)
         window.removeEventListener('keyup', up)
      }
   }, [])

   return { left, right }
}

//*
function useArrowInput() {
   const left = useRef(false)
   const right = useRef(false)

   useEffect(() => {
      const down = (e) => {
         if (e.code === 'ArrowLeft') left.current = true
         if (e.code === 'ArrowRight') right.current = true
      }

      const up = (e) => {
         if (e.code === 'ArrowLeft') left.current = false
         if (e.code === 'ArrowRight') right.current = false
      }

      window.addEventListener('keydown', down)
      window.addEventListener('keyup', up)
      return () => {
         window.removeEventListener('keydown', down)
         window.removeEventListener('keyup', up)
      }
   }, [])

   return { left, right }
}


export default function Flipper({ position = [0, 0, 0], rotation = [Math.PI / 2, 0, 0] }) {

   const rigidBody = useRef()

   //* Event handler
   function handleOnCollisionEnter(rigidBody) {

      // rigidBody.current?.applyTorqueImpulse({
      //    x: Math.random() * 1,
      //    y: Math.random() * 1,
      //    z: Math.random() * 0.15,
      // })

      rigidBody.current?.setRotation({ x: 0.95, y: 5, z: 0.25 }, true)

      // rigidBody.current?.applyForce({ x: 5, y: 0.5, z: 0 }, true)
      // rigidBody.current?.setAngvel({ x: Math.random() * 5, y: 0, z: 0 })  // angular velocity 

   }  // handleOnCollisionEnter()

   return (
      <>
         {/** Math.PI / 2 = 90° */}
         < RigidBody
            ref={rigidBody}
            // type="kinematicVelocity"  // kinematicVelocity or manually set rotation if you want controlled motion
            type="dynamic"  // makes physics work
            position={position}
            rotation={rotation}
            colliders={false}
            onCollisionEnter={() => { if (rigidBody) { handleOnCollisionEnter(rigidBody) } }
            }
         >
            <CuboidCollider
               args={[1.25, 1, 1]}
               restitution={0.5}
               friction={0.05}
            />

            <group>
               <mesh>
                  {/** radius, length, capSegments, radialSegemnts */}
                  <capsuleGeometry args={[0.25, 3, 8, 32]} />
                  <meshStandardMaterial color="orange" metallness={0.95} roughness={0.15} />
               </mesh>

               {/** rubber band, left */}
               <mesh position={[0, 0.5, 0]}>
                  {/** new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments) */}
                  <torusGeometry args={[0.25, 0.1, 32, 32]} />
                  <meshStandardMaterial color={red[500]} side={THREE.DoubleSide} metallness={0} roughness={0.45} />
               </mesh>

               {/** rubber band, middle */}
               <mesh position={[0, 0, 0]}>
                  {/** new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments) */}
                  <torusGeometry args={[0.25, 0.1, 32, 32]} />
                  <meshStandardMaterial color={red[500]} side={THREE.DoubleSide} metallness={0} roughness={0.45} />
               </mesh>

               {/** rubber band, right */}
               <mesh position={[0, -0.5, 0]}>
                  {/** new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments) */}
                  <torusGeometry args={[0.25, 0.1, 32, 32]} />
                  <meshStandardMaterial color={red[500]} side={THREE.DoubleSide} metallness={0} roughness={0.45} />
               </mesh>
            </group>
         </RigidBody >
      </>

   )
}  // Flipper()
