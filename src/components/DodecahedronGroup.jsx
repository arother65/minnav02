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
          // ref.current.applyImpulse({ x: 0.25, y: 0.5, z: 0.1 }, true);

          // ref.current.applyImpulse(
          //   {
          //     x: dir.x * 8 * ref.current.mass(),
          //     y: 4 * ref.current.mass(),
          //     z: dir.z * 8 * ref.current.mass(),
          //   },
          //   true
          // );
          ref.current.applyTorqueImpulse({ x: Math.random() * 1.5, y: Math.random() * 1.75, z: Math.random() * 0.15 }, true);
        }}
      />
      <mesh>
        <dodecahedronGeometry args={[0.95]} />
        {/* <meshStandardMaterial roughness={0.5} emissive="#404057" color={props.color} /> */}
        <meshStandardMaterial roughness={0.1} color={props.color} />
        <Html distanceFactor={10}>
          <div className="content">
            {props.text}
          </div>
        </Html>
      </mesh>
    </RigidBody>
  )
}  // Dodecahedron()

//* erstellt eine rotierende Gruppe von "Dodecahedron"-Objekten
export default function DodecahedronGroup() {
  const ref = useRef()

  // 
  return (
    <group ref={ref}>
      <Dodecahedron position={[0, 3, 0]} color={red[900]} text={'01'} />
      <Dodecahedron position={[0, 4, 0]} color={green[500]} text={'02'} />
      <Dodecahedron position={[-1, 5, 0.25]} color={blue[900]} text={'03'} />
      <Dodecahedron position={[-2, 5, 0.5]} color={orange[900]} text={'04'} />
      <Dodecahedron position={[-3, 5, 0.75]} color={yellow[900]} text={'05'} />
    </group>
  )
}  // DodecahedronGroup