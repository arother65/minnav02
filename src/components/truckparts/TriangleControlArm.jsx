/**
 * 
 * 
 * 
 */

//* Imports
import { useRef } from "react"
import * as THREE from 'three'
import {
   RigidBody,
   useImpulseJoint,
   useSphericalJoint,
   useSpringJoint,
} from "@react-three/rapier"

import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"
// import { meshStandardMaterial, Vector3 } from "three"

//*
const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(1, 0, 0);
const p3 = new THREE.Vector3(0.5, 1, 0);

const loPoints = [p1, p2, p3]

//* Main Component
export default function TriangleControlArm({ points = loPoints, color = "orange" }) {
   const meshRef = useRef();

   // points should be an array of 3 Vector3s
   // e.g. [new Vector3(), new Vector3(1,0,0), new Vector3(0,1,0)]

   const geometry = new THREE.BufferGeometry().setFromPoints(points);
   geometry.setIndex([0, 1, 2]); // one triangular face
   geometry.computeVertexNormals();

   return (
      <mesh ref={meshRef} geometry={geometry}>
         <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
   )
}  // TriangleControlArm()

//*
export function LowerControlArm({ chassis }) {
   const arm = useRef();

   useImpulseJoint(
      chassis,
      arm,
      useSphericalJoint(
         [-0.4, 0.2, 0.5], // anchor on chassis
         [-0.3, 0, 0]     // anchor on arm
      )
   );

   return (
      <RigidBody
         ref={arm}
         mass={5}
         angularDamping={4}
         colliders="convexHull"
      >
         {/* mesh here */}
      </RigidBody>
   );
}  // LowerControlArm()


//* 
export function Suspension() {

   const chassis = useRef();
   const arm = useRef();
   const upright = useRef();

   // ─── Control arm → chassis (2 pivots)
   useSphericalJoint(chassis, arm, [[-0.4, 0, 0], [-0.3, 0, 0]])

   useSphericalJoint(chassis, arm, [[0.4, 0, 0], [0.3, 0, 0]])

   // ─── Control arm → upright
   useSphericalJoint(arm, upright, [[0, 0.1, 0], [0, -0.15, 0]])

   // ─── Spring / damper (shock)
   useSpringJoint(chassis, upright, [
      [0, 0.4, 0],
      [0, 0.1, 0],
      0.4,  // restLength
      12000,  // stiffness
      900  // damping
   ])

   return (
      <>
         {/* Chassis */}
         <RigidBody ref={chassis} mass={100} position={[0, 1, 0]}>
            <mesh>
               <boxGeometry args={[2, 0.4, 1]} />
               <meshStandardMaterial color="steelblue" />
            </mesh>
         </RigidBody>

         {/* Control Arm */}
         <RigidBody
            ref={arm}
            mass={5}
            position={[0, 0.6, 0]}
            angularDamping={4}
         >
            <mesh>
               <boxGeometry args={[0.8, 0.1, 0.2]} />
               <meshStandardMaterial color="#333" />
            </mesh>
         </RigidBody>

         {/* Upright */}
         <RigidBody
            ref={upright}
            mass={10}
            position={[0, 0.3, 0]}
            linearDamping={0.4}
         >
            <mesh>
               <boxGeometry args={[0.2, 0.4, 0.2]} />
               <meshStandardMaterial color="orange" />
            </mesh>
         </RigidBody>
      </>
   );
}  // 

//*
export function TriangleWithHoles({ position }) {

   // ─── Outer triangle
   const shape = new THREE.Shape();
   shape.moveTo(0, 1);
   shape.lineTo(-1, -1);
   shape.lineTo(1, -1);
   shape.lineTo(0, 1);

   // ─── Hole 1 (circle)
   const hole1 = new THREE.Path();
   hole1.absarc(0, -0.2, 0.25, 0, Math.PI * 2, false);

   // ─── Hole 2 (circle)
   const hole2 = new THREE.Path();
   hole2.absarc(-0.4, -0.6, 0.15, 0, Math.PI * 2, false);

   shape.holes.push(hole1, hole2);

   return (
      <mesh position={position} rotation-x={-Math.PI / 2}>
         <shapeGeometry args={[shape]} />
         <extrudeGeometry
            args={[
               shape,
               {
                  depth: 0.15,
                  bevelEnabled: false,
               },
            ]}
         />
         <meshStandardMaterial color="orange" side={THREE.DoubleSide} wireframe={true} />
      </mesh>
   );
}  // TriangleWithHoles()

//*
export function DIYControlArm({ position, rotation }) {

   return (
      <group position={position} rotation={rotation}>

         {/** "DIY control arm" */}
         <mesh position={[0.6, 0, 0]} receiveShadow>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial metalness={0.95} roughness={0.45} color={red[100]} />
         </mesh>
         {/** rod between joint balls*/}
         <mesh position={[0.75, 0, 0]} rotation={[0, 0, 1.6]} receiveShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 32]} />
            <meshStandardMaterial metalness={0.95} roughness={0.45} color={'white'} />
         </mesh>
         <mesh position={[0.85, 0, 0]} receiveShadow>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial metalness={0.95} roughness={0.45} color={red[100]} />
         </mesh>

         {/** left rod facing the front */}
         <mesh position={[0.65, -0.025, 0.125]} rotation={[0.35, 2, 1.5]} receiveShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 32]} />
            <meshStandardMaterial metalness={0.95} roughness={0.45} color={'white'} />
         </mesh>
         {/** right rod facing the front */}
         <mesh position={[0.8, -0.025, 0.125]} rotation={[0.2, -2, 1.5]} receiveShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.25, 32]} />
            <meshStandardMaterial metalness={0.95} roughness={0.45} color={'white'} />
         </mesh>
         {/** front joint pointing to wheel */}
         <mesh position={[0.725, -0.05, 0.25]} receiveShadow>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial metalness={0.95} roughness={0.45} color={red[500]} />
         </mesh>
      </group>
   )
}  // DIYControlArm()
