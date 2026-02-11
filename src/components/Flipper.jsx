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
   CuboidCollider,
   useRevoluteJoint,
   useImpulseJoint
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

//*
export function Flipper({ position = [0, 0, 0], rotation = [0, 0, 0], color = red[500] }) {

   const body = useRef(null);

   function flip() {
      if (!body.current) return
      body.current.setAngvel({ x: 0, y: 25, z: 0 }, true)
   }

   return (
      <RigidBody
         ref={body}
         type="dynamic"
         position={position}
         rotation={rotation}
         colliders={false}
         enabledRotations={[false, true, false]}   // hinge on y
         enabledTranslations={[false, false, false]}
         angularDamping={6}                         // auto-return
         onCollisionEnter={flip}
      >
         <CuboidCollider args={[1.25, 0.5, 0.5]} restitution={0.4} />

         <group>
            <mesh>
               <capsuleGeometry args={[0.25, 3, 8, 32]} />
               <meshStandardMaterial
                  color={color}
                  metalness={0.9}
                  roughness={0.2}
               />
            </mesh>

            {[-0.5, 0, 0.5].map((y, i) => (
               <mesh key={i} position={[0, y, 0]}>
                  <torusGeometry args={[0.25, 0.1, 32, 32]} />
                  <meshStandardMaterial
                     color={red[500]}
                     side={THREE.DoubleSide}
                     roughness={0.4}
                  />
               </mesh>
            ))}

         </group>
      </RigidBody>
   );
}
