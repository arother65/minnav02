/** 
 * 
 * 
 * 
 */

import * as THREE from "three"

//
export default function RealisticTree({position}) {
  return (
    <group position={position}>
      {/* 🌲 Trunk */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0.03]} receiveShadow>
        <cylinderGeometry args={[0.25, 0.35, 2, 12]} />
        <meshStandardMaterial
          color="#6b4f2a"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* 🍃 Foliage */}
      <mesh position={[0, 2.7, 0]} receiveShadow>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial
          color="#2e7d32"
          roughness={0.8}
        />
      </mesh>

      <mesh position={[-0.8, 2.3, 0.5]} receiveShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color="#388e3c"
          roughness={0.85}
        />
      </mesh>

      <mesh position={[0.9, 2.4, -0.4]} receiveShadow>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial
          color="#2e7d32"
          roughness={0.8}
        />
      </mesh>

      <mesh position={[0, 3.5, 0]} receiveShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial
          color="#43a047"
          roughness={0.75}
        />
      </mesh>
    </group>
  )
}  // RealisticTree()
