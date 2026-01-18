/**
 * Explosions.jsx
 *
 * A React component that renders a 3D scene with an exploding cannonball effect using react-three-fiber.  
 *  
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

import { Physics, RigidBody } from '@react-three/rapier'

// local functions
function Fragment({ velocity }) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.position.addScaledVector(velocity, delta)
    velocity.y -= 3 * delta // gravity
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}  // Fragment()

function ExplodingCannonBall({ position, color, noFragments }) {
  const [exploded, setExploded] = useState(false)

  if (exploded) {
    return Array.from({ length: noFragments }).map((_, i) => (
      <Fragment
        key={i}
        velocity={new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6, (Math.random() - 0.5) * 6)}
        color={'red'}  // bleibt Orange
      />
    ))
  }

  return (
    <mesh
      position={position}
      onClick={() => {
        setExploded(true)
      }}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color={color}
        // transparent
        // opacity={0.5}
        // emissive="orange"
      />
    </mesh>
  )
}  // ExplodingCannonBall()


// main component
export function Explosions() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [4, 3, 4], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} />

        <ExplodingCannonBall position={[2, 0, 0]} color="darkgreen" noFragments={50}/>
        <ExplodingCannonBall position={[-5, -1, 0]} color="darkred" noFragments={120}/>
        <ExplodingCannonBall position={[-15, -1, 0]} color="darkblue" noFragments={10} />

        <OrbitControls />
      </Canvas>
    </div>
  )
}  // Explosions()

/**
 * 
 * @returns 
 */

function Brick({ position }) {
  return (
    <RigidBody
      position={position}
      colliders="cuboid"
      restitution={0.1}
      friction={0.9}
      mass={1}
    >
      <mesh>
        <boxGeometry args={[0.9, 0.4, 0.4]} />
        <meshStandardMaterial color="#8b3a3a" />
      </mesh>
    </RigidBody>
  )
}

function DestructibleWall() {
  const bricks = []
  const rows = 6
  const cols = 6

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      bricks.push(
        <Brick
          key={`${x}-${y}`}
          position={[x - cols / 2, y * 0.45, 0]}
        />
      )
    }
  }
  return <>{bricks}</>
}

function CannonBall() {
  const [fired, setFired] = useState(false)

  return (
    <RigidBody
      colliders="ball"
      position={[-5, 2, 0]}
      mass={5}
      onClick={(e) => {
        e.stopPropagation()
        setFired(true)
      }}
      linearVelocity={fired ? [15, 0, 0] : [0, 0, 0]}
    >
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </RigidBody>
  )
}

function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[20, 1, 10]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </RigidBody>
  )
}

//
export function ExplodingWall() {

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 4, 10] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} />

        <Physics gravity={[0, -9.81, 0]}>
          <Ground />
          <DestructibleWall />
          <CannonBall />
        </Physics>

        <OrbitControls />
      </Canvas>
    </div>
  )
}  // ExplodingWall()