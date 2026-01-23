import * as THREE from "three"

//
const tyreProfile = [
  new THREE.Vector2(0.45, 1.0),
  new THREE.Vector2(0.48, 1.08),
  new THREE.Vector2(0.5, 1.2),
  new THREE.Vector2(0.5, 1.8),
  new THREE.Vector2(0.48, 1.92),
  new THREE.Vector2(0.45, 2.0)
]

//
export default function Tyre() {
  return (
    <mesh>
      <latheGeometry args={[tyreProfile, 32]} />
      <meshStandardMaterial
        color="#1b1b1b"
        roughness={0.85}
        metalness={0.02}
      />
    </mesh>
  )
}  // Tyre()
