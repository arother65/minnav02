/**
 * 
 *  Stand: 05.02.2025
 * 
 * 
 * 
 */

// https://twitter.com/lusionltd/status/1701534187545636964
// https://lusion.co

import * as THREE from 'three'
import { useRef, useReducer, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei'
import { OrbitControls, Text } from "@react-three/drei"
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { easing } from 'maath'

// import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

//*
const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
const shuffle = (accent = 0) => [
   { color: '#444', roughness: 0.1 },
   { color: '#444', roughness: 0.75 },
   { color: '#444', roughness: 0.75 },
   { color: 'white', roughness: 0.1 },
   { color: 'white', roughness: 0.75 },
   { color: 'white', roughness: 0.1 },
   { color: accents[accent], roughness: 0.1, accent: true },
   { color: accents[accent], roughness: 0.75, accent: true },
   { color: accents[accent], roughness: 0.1, accent: true }
]

function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {

   const refRigidBody = useRef()
   const pos = useMemo(() => position || [r(10), r(10), r(10)], [])

   useFrame((state, delta) => {
      delta = Math.min(0.1, delta)
      refRigidBody.current?.applyImpulse(vec.copy(refRigidBody.current.translation()).negate().multiplyScalar(0.2))
   })

   return (
      <RigidBody ref={refRigidBody} linearDamping={4} angularDamping={1} friction={0.1} position={pos} colliders={false}>
         <CuboidCollider args={[0.38, 1.27, 0.38]}
            onCollisionEnter={(e) => {
               // console.log('connector collided')
               // alert('collision')
            }} />
         <CuboidCollider args={[1.27, 0.38, 0.38]} />
         <CuboidCollider args={[0.38, 0.38, 1.27]} />

         {children ? children : <Model {...props} />}
         {accent && <pointLight intensity={2} distance={2.5} color={props.color} />}
      </RigidBody>
   )
}  // Connector()

function Pointer({ vec = new THREE.Vector3() }) {
   const ref = useRef()
   useFrame(({ mouse, viewport }) => {
      ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
   })
   return (
      <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
         <BallCollider args={[1]} />
      </RigidBody>
   )
}  // Pointer()

function Model({ children, color = 'white', roughness = 0, ...props }) {
   const ref = useRef()
   const { nodes, materials } = useGLTF('/models/c-transformed.glb')

   useFrame((state, delta) => {
      easing.dampC(ref.current.material.color, color, 0.2, delta)
   })

   return (
      <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
         <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
         {children}
      </mesh>
   )
}  // Model()

//* Main Component
export default function Connectors(props) {

   // props: color, roughness, accent

   // const [accent, click] = useReducer((state) => ++state % accents.length, 0)
   // const connectors = useMemo(() => shuffle(accent), [accent])

   return (
      <>
         {/* <Physics gravity={[0, -0.981, 0]}> */}
         <Pointer />

         {/* {connectors.map((props, i) => <Connector key={i} {...props} />)} */}

         <Connector position={props.position}>
            <Model color={props.color}>
               <MeshTransmissionMaterial clearcoat={0.85} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={2} resolution={128} />
            </Model>
         </Connector>

         {/* <Connector position={[2, 6, 0]}></Connector> */}

         {/* </Physics> */}

         <EffectComposer disableNormalPass multisampling={8}>
            <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
         </EffectComposer>

         <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
               <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
               <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
               <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
               <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            </group>
         </Environment>
      </>
   )
}


