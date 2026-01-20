/**
 * 
 *  
 * 
 */

import { Cylinder, Box } from "@react-three/drei"

//
function PieceMaterial({ color }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.35}
      metalness={0.1}
    />
  )
}

// 
export default function King({ position, color = "ivory" }) {

  return (
    <group position={position}>
      <Cylinder args={[0.5, 0.55, 0.2, 32]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </Cylinder>
      <Cylinder args={[0.3, 0.4, 1.3, 32]} position={[0, 0.85, 0]}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </Cylinder>
      {/* <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} /> */}

      {/* Cross */}
      <Box args={[0.15, 0.5, 0.15]} position={[0, 1.7, 0]} >
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </Box>
      <Box args={[0.5, 0.15, 0.15]} position={[0, 1.7, 0]} >
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </Box>
    </group>
  )
}
