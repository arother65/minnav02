/**
 * 
 * 
 * 
 */

//*
import { useSphere } from '@react-three/cannon'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

//*
export function ShockwaveMetal({
   position,
   radius = 0.55,
   thickness = 0.25, // 👈 depth parameter (metal sheet thickness)
   speed = 5,
   fade = 2,
   onDone,
}) {
   const mesh = useRef()
   const material = useRef()

   useFrame((_, delta) => {
      if (!mesh.current) return

      mesh.current.scale.x += delta * speed
      mesh.current.scale.z += delta * speed

      if (material.current) {
         material.current.opacity -= delta * fade
         if (material.current.opacity <= 0) {
            onDone?.()
         }
      }
   })

   return (
      <mesh
         ref={mesh}
         position={position}
         rotation={[-Math.PI / 2, 0, 0]}
         scale={0.1}
      >
         <torusGeometry
            args={[
               radius,      // ring radius
               thickness,   // tube radius = metal thickness
               8,           // radial segments (low = sharp edge)
               64,          // tubular segments
            ]}
         />
         <meshStandardMaterial
            ref={material}
            color="#bbbbbb"
            metalness={0.95}
            roughness={0.45}
            transparent
            opacity={0.95}
            side={THREE.DoubleSide}
         />
      </mesh>
   )
}  // ShockwaveMetal()


//*
export default function Cannonball({ position, velocity }) {
   const [exploded, setExploded] = useState(false)

   const [ref] = useSphere(() => ({
      mass: 1,
      position,
      velocity
   }))

   return (
      <mesh
         ref={ref}
         onClick={(e) => {
            e.stopPropagation()
            if (!exploded) {
               setExploded(true)
            }
         }}
         castShadow
      >
         {!exploded &&
            <>
               <sphereGeometry args={[0.2, 16, 16]} />
               <meshStandardMaterial color="black" />
            </>
         }
         {exploded &&
            <>
               <ShockwaveMetal />
            </>
         }
      </mesh>
   )
}
