
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import {
   RigidBody,
   CuboidCollider,
   CapsuleCollider,
   useRevoluteJoint,
} from '@react-three/rapier'

//*
export function useFlipperInput() {

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
export function useArrowInput() {
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

//* The main component created here:
function Flipper00({ position, side = 'left', input }) {

   const baseRef = useRef()
   const flipperRef = useRef()

   const dir = side === 'left' ? 1 : -1
   const isPressed = side === 'left' ? input.left : input.right

   const REST_ANGLE = dir * -0.35
   const ACTIVE_ANGLE = dir * 0.35

   const joint = useRevoluteJoint(baseRef, flipperRef, {
      axis: [0, 1, 0],
      limits: [REST_ANGLE, ACTIVE_ANGLE],
      motorEnabled: true,
   })

   useFrame(() => {
      if (!joint.current) return

      joint.current.setMotorTarget(
         isPressed.current ? ACTIVE_ANGLE : REST_ANGLE,
         40,   // motor speed
         120   // motor torque
      )
   })

   return (
      <>
         {/* Fixed pivot */}
         <RigidBody ref={baseRef} type="fixed" position={position} />

         {/* Flipper paddle */}
         <RigidBody
            ref={flipperRef}
            type="dynamic"
            colliders={false}
            enabledTranslations={[false, false, false]}
            enabledRotations={[false, true, false]}
            angularDamping={0.15}
         >
            <CuboidCollider
               args={[0.6, 0.12, 0.2]}
               restitution={0.9}
               friction={0.02}
            />

            <CapsuleCollider
               args={[0.12, 0.2]}
               position={[0.6 * dir, 0, 0]}
               restitution={0.9}
               friction={0.02}
            />

            <mesh position={[0.6 * dir, 0, 0]}>
               <boxGeometry args={[1.2, 0.24, 0.4]} />
               <meshStandardMaterial color={side === 'left' ? 'orange' : 'deepskyblue'} />
            </mesh>
         </RigidBody>
      </>
   )
}

export default function Flipper({ position, side = 'left', input }) {

   const baseRef = useRef()
   const flipperRef = useRef()

   const dir = side === 'left' ? 1 : -1
   const isPressed = side === 'left' ? input?.left : input?.right

   const REST_ANGLE = dir * -0.35
   const ACTIVE_ANGLE = dir * 0.35

   // ✅ CORRECT joint creation
   const joint = useRevoluteJoint(
      baseRef,
      flipperRef,
      [
         [0, 0, 0],                 // anchor on base
         [-0.6 * dir, 0, 0],        // anchor on flipper (pivot point)
         [0, 1, 0],                 // rotation axis (Y)
      ]
   )

   // Configure joint AFTER creation
   useEffect(() => {
      if (!joint.current) return

      joint.current.setLimits(REST_ANGLE, ACTIVE_ANGLE)
      joint.current.configureMotorPosition(
         REST_ANGLE,
         40,   // motor speed
         120   // motor force
      )
   }, [])

   useFrame(() => {
      if (!joint.current || !isPressed) return

      joint.current.configureMotorPosition(
         isPressed.current ? ACTIVE_ANGLE : REST_ANGLE,
         40,
         120
      )
   })

   return (
      <>
         {/* Fixed pivot */}
         <RigidBody ref={baseRef} type="fixed" position={position} />

         {/* Flipper paddle */}
         <RigidBody
            ref={flipperRef}
            type="dynamic"
            colliders={false}
            enabledTranslations={[false, false, false]}
            enabledRotations={[false, true, false]}
            angularDamping={0.15}
         >
            {/* Main body */}
            <CuboidCollider
               args={[0.6, 0.12, 0.2]}
               restitution={0.9}
               friction={0.02}
            />

            {/* Rounded tip */}
            <CapsuleCollider
               args={[0.12, 0.2]}
               position={[0.6 * dir, 0, 0]}
               restitution={0.9}
               friction={0.02}
            />

            {/* Visual */}
            <mesh position={[0.6 * dir, 0, 0]}>
               <boxGeometry args={[1.2, 0.24, 0.4]} />
               <meshStandardMaterial
                  color={side === 'left' ? 'orange' : 'deepskyblue'}
               />
            </mesh>
         </RigidBody>
      </>
   )
}
