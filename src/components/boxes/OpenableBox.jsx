/**
 * 
 * 
 * 
 */

//*
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { RigidBody, CuboidCollider } from '@react-three/rapier'

//*
export default function OpenableBox(props) {

   const lidRef = useRef()
   const [open, setOpen] = useState(false)

   useFrame(() => {
      if (!lidRef.current) return

      const targetRotation = open ? -Math.PI / 2 : 0
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
         lidRef.current.rotation.x,
         targetRotation,
         0.1
      )
   })

   return (
      <RigidBody type="fixed"
         position={props.position}
         rotation={[0, 0, 0]}
         colliders={false}
      >
         <CuboidCollider
            args={[1, 1, 1]}
            restitution={0.9}
            friction={0}
         />

         <group onClick={() => setOpen(!open)}>
            {/* Box base */}
            <mesh position={[0, -0.25, 0]}>
               <boxGeometry args={[2, 0.5, 2]} />
               <meshStandardMaterial color={props.color} />
            </mesh>

            {/* Box walls */}
            <mesh position={[0, 0.25, -0.75]}>
               <boxGeometry args={[2, 1, 0.5]} />
               <meshStandardMaterial color={props.color} />
            </mesh>

            <mesh position={[0, 0.25, 0.75]}>
               <boxGeometry args={[2, 1, 0.5]} />
               <meshStandardMaterial color={props.color} />
            </mesh>

            <mesh position={[-0.75, 0.25, 0]}>
               <boxGeometry args={[0.5, 1, 2]} />
               <meshStandardMaterial color={props.color} />
            </mesh>

            <mesh position={[0.75, 0.25, 0]}>
               <boxGeometry args={[0.5, 1, 2]} />
               <meshStandardMaterial color={props.color} />
            </mesh>

            {/* Lid (pivoted on back edge) */}
            <group
               ref={lidRef}
               position={[0, 0.75, -0.75]}
            >
               <mesh position={[0, 0, 0.75]}>
                  <boxGeometry args={[2, 0.2, 1.5]} />
                  <meshStandardMaterial color={props.color} />
               </mesh>
            </group>
         </group>
      </RigidBody>
   )
}
