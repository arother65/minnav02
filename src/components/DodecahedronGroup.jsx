/**
 * 
 * 
 * 
 */

//*
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { RigidBody, CuboidCollider } from "@react-three/rapier"
import "./styles.css"
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"

//*
function Dodecahedron({ time, ...props }) {

  const ref = useRef()

  return (
    <RigidBody ref={ref} position={props.position} mass={5} colliders={false} restitution={0.5}>
      <CuboidCollider
        args={[0.95 / 2, 0.95 / 2, 0.95 / 2]}
        // sensor
        onCollisionEnter={() => {
          // ref.current.applyImpulse({ x: 0.5, y: 0.1, z: 0.1 }, true);
          ref.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 }, true);
        }}
      />
      <mesh>
        <dodecahedronGeometry args={[0.95]} />
        {/* <meshStandardMaterial roughness={0.5} emissive="#404057" color={props.color} /> */}
        <meshStandardMaterial roughness={0.1} color={props.color} />
        <Html distanceFactor={10}>
          <div className="content">
            hello <br />
            world
          </div>
        </Html>
      </mesh>
    </RigidBody>
  )
}  // Dodecahedron()

//* erstellt eine rotierende Gruppe von "Dodecahedron"-Objekten
export default function DodecahedronGroup() {
  const ref = useRef()

  // useFrame(() => (
  //   ref.current.rotation.x += 0.015,
  //   ref.current.position.x -= 0.0,

  //   ref.current.rotation.y += 0.015,
  //   ref.current.position.y += 0.0

  //   // ref.current.?
  //   // ref.current.rotation.z += 0.02
  // )
  // )

  // 
  return (
    <group ref={ref}>
      <Dodecahedron position={[0, 10, 0]} color={red[900]} />
      <Dodecahedron position={[0, 2, 0]} color={green[500]} />
      <Dodecahedron position={[-1, 5, -1]} color={blue[900]} />
    </group>
  )
}  // DodecahedronGroup