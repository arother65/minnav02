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


export function Flipper00({ position = [0, 0, 0], rotation = [Math.PI / 2, 0, 0] }) {

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


//* 
export function Flipper01({ position = [0, 0, 0], rotation = [Math.PI / 2, 0, 0] }) {
   const rigidBody = useRef();

   //* Flip parameters
   const flipSpeed = 2 // radians per second
   const maxRotation = 1.5 // max rotation around X
   const restRotation = 0 // resting rotation

   //* Event handler for collision
   function handleOnCollisionEnter() {
      if (!rigidBody.current) return;

      // Set angular velocity around X axis to flip
      rigidBody.current.setAngvel({ x: 0, y: 0, z: flipSpeed })

      // Optionally, reset after a short delay to simulate return
      // setTimeout(() => {
      //    rigidBody.current?.setAngvel({ x: -flipSpeed * 0.8, y: 0, z: 0 }); // return slowly
      // }, 100); // milliseconds
   }

   return (
      <RigidBody
         ref={rigidBody}
         type="kinematicVelocity" // kinematic with angular velocity
         position={position}
         rotation={rotation}
         colliders={false}
         onCollisionEnter={handleOnCollisionEnter}
      >
         <CuboidCollider args={[1.5, 0.75, 0.75]} restitution={0.5} friction={0.05} />

         <group>
            <mesh>
               <capsuleGeometry args={[0.25, 3, 8, 32]} />
               <meshStandardMaterial color="orange" metalness={0.9} roughness={0.45} />
            </mesh>

            {/* Rubber bands */}
            {[-1, 0, 1].map((y, i) => (
               <mesh key={i} position={[0, y, 0]}>
                  <torusGeometry args={[0.35, 0.15, 32, 32]} />
                  <meshStandardMaterial color={red[500]} side={THREE.DoubleSide} metalness={0} roughness={0.45} />
               </mesh>
            ))}
         </group>
      </RigidBody>
   );
}

//*
export function Flipper02({ position = [0, 0, 0], rotation = [Math.PI / 2, 0, 0] }) {

   const anchorRef = useRef();
   const flipperRef = useRef();

   // Create hinge joint (X-axis rotation)
   const joint00 = useRevoluteJoint(
      anchorRef,
      flipperRef,
      [0, 0, 0],      // anchor on fixed body
      [-1.5, 0, 0],   // anchor on flipper
      [1, 0, 0],      // axis on fixed body
      [1, 0, 0]       // axis on flipper
   );

  const joint = useImpulseJoint("revolute", anchorRef, flipperRef, {
    localAnchorA: [0, 0, 0],
    localAnchorB: [-1.5, 0, 0],
    axisA: [1, 0, 0],
    axisB: [1, 0, 0],
    limits: [-0.25, 1.4],
    motorEnabled: true,
    motorTargetVelocity: 0,
    motorMaxTorque: 80,
  });

   function handleOnCollisionEnter() {
      if (!joint.current) return;

      // Flip instantly
      joint.current.configureMotorVelocity(12, 60);
   }

   function handleOnCollisionExit() {
      if (!joint.current) return;

      // Auto-return smoothly
      joint.current.configureMotorVelocity(-6, 60);
   }

   return (
      <>
         {/* Fixed hinge anchor */}
         <RigidBody
            ref={anchorRef}
            type="fixed"
            position={position}
         />

         {/* Flipper */}
         <RigidBody
            ref={flipperRef}
            type="dynamic"
            position={position}
            rotation={rotation}
            colliders={false}
            onCollisionEnter={handleOnCollisionEnter}
            onCollisionExit={handleOnCollisionExit}
         >
            <CuboidCollider args={[1.5, 0.25, 0.5]} restitution={0.4} />

            <group>
               <mesh>
                  <capsuleGeometry args={[0.25, 3, 8, 32]} />
                  <meshStandardMaterial
                     color="orange"
                     metalness={0.9}
                     roughness={0.2}
                  />
               </mesh>

               {/* Rubber rings */}
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
      </>
   );
}  // 


//*
export default function Flipper({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  
   const body = useRef(null);

  function flip() {
    if (!body.current) return
    body.current.setAngvel( { x: 0, y: 25, z: 0 }, true )
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
      <CuboidCollider args={[1.5, 0.25, 0.5]} restitution={0.4} />

      <group>
        <mesh>
          <capsuleGeometry args={[0.25, 3, 8, 32]} />
          <meshStandardMaterial
            color="orange"
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
