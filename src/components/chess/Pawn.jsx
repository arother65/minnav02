/**
 * 
 * 
 * 
 */

import { Cylinder, Sphere } from "@react-three/drei"

//
export default function Pawn({ position, color = "ivory" }) {
  return (
    <group position={position}>
      {/* Base */}
      <Cylinder args={[0.45, 0.5, 0.15, 32]} position={[0, 0.075, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>

      {/* Body */}
      <Cylinder args={[0.25, 0.35, 0.8, 32]} position={[0, 0.55, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>

      {/* Head */}
      <Sphere args={[0.25, 32, 32]} position={[0, 1.05, 0]}>
        <meshStandardMaterial color={color} />
      </Sphere>
    </group>
  )
}
