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
   color = 'red'
}) {
   const mesh = useRef()
   const material = useRef()

   useFrame((_, ivdelta) => {
      if (!mesh.current) return

      mesh.current.scale.x += ivdelta * speed
      mesh.current.scale.y += ivdelta * speed
      mesh.current.scale.z += ivdelta * speed

      if (material.current) {
         material.current.opacity -= ivdelta * fade

         if (material.current.opacity <= 0) { onDone?.() }
      }
   })  // useFrame()

   return (
      <group>
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
                  32,           // radial segments (low = sharp edge)
                  64,          // tubular segments
               ]}
            />

            {/* <torusGeometry args={[0.25, 0.15, 16, 64]}/> */}
            <meshStandardMaterial
               ref={material}
               color={color}
               metalness={0.95}
               roughness={0.45}
               transparent
               opacity={0.95}
               side={THREE.DoubleSide}
            />
         </mesh>
      </group>
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
               <sphereGeometry args={[0.25, 16, 16]} />
               <meshStandardMaterial color={'grey'} />
            </>
         }
         {exploded &&
            <>
               <ShockwaveMetal position={[0, 0, 0]}    speed={1} color={'red'}/>
               <ShockwaveMetal position={[-0.5, -0.25, 0]} speed={1} color={'orange'}/>
               <ShockwaveMetal position={[0.5, 0.25, 0]}  speed={1} color={'yellow'}/>
            </>
         }
      </mesh>
   )
}
