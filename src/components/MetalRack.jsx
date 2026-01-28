/**
 * 
 * 
 * 
 */

//*
import { useMemo } from "react"
import * as THREE from "three"
import { red } from "@mui/material/colors"

//*
export default function MetalRack({
   position = [0, 0, 0],
   width = 2,
   depth = 0.6,
   height = 2.5,
   shelves = 2,
   poleThickness = 0.05,
   color = red[500]
}) {
   const shelfThickness = 0.05
   const shelfSpacing = height / (shelves + 1)

   const metalMaterial = useMemo(
      () =>
         new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.1,
            roughness: 0.55,
         }),
      []
   )

   return (
      <group position={position}>
         {/* Vertical poles */}
         {[
            [-width / 2, 0, -depth / 2],
            [width / 2, 0, -depth / 2],
            [-width / 2, 0, depth / 2],
            [width / 2, 0, depth / 2],
         ].map((pos, i) => (
            <mesh
               key={i}
               position={[pos[0], height / 2, pos[2]]}
               material={metalMaterial}
               receiveShadow
               // castShadow
            >
               <boxGeometry args={[poleThickness, height, poleThickness]} />
            </mesh>
         ))}

         {/* Shelves */}
         {Array.from({ length: shelves }).map((_, i) => (
            <mesh
               key={i}
               position={[0, shelfSpacing * (i + 1), 0]}
               material={metalMaterial}
               receiveShadow
               // castShadow
            >
               <boxGeometry
                  args={[width, shelfThickness, depth]}
               />
            </mesh>
         ))}
      </group>
   )
}  // MetalRack 
