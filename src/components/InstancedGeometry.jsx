/**
 * 
 * 
 * 
 */

//*
import { useMemo } from 'react'
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"
import * as THREE from 'three'

//*
function createShape() {
   const shape = new THREE.Shape()

   shape.moveTo(0, 0)
   shape.lineTo(0.005, 0.005)
   shape.lineTo(0.005, 0.005)

   // shape.lineTo(0.025, 0.005)
   // shape.lineTo(0.025, 0.005)

   shape.bezierCurveTo(0.01, 0.01, 0.01, 0.01)
   // shape.bezierCurveTo(0.02, 0.02, 0.02, 0.02)
   shape.closePath()

   return shape
}  // createShape()

function getRandomColor() {

   // returns a randon color of [blue, brown, green, grey, orange, purple, red, yellow], length 8
   const arr = [blue, brown, green, grey, orange, purple, red, yellow]
   const randomIndex = Math.floor(Math.random() * arr.length)
   const randomItem = arr[randomIndex]

   return randomItem[500]
}  // getRandomColor()


//* 
export default function CreateExtrudeGeometry() {

   const shape02 = createShape()

   const geometry = useMemo(
      () =>
         new THREE.ExtrudeGeometry(shape02, {
            depth: 0.01,
            steps: 16,
            bevelEnabled: true,
            bevelSize: 0.1,
            bevelSegments: 8,
         }),
      [shape02]
   )

   const material = useMemo(
      () =>
         new THREE.MeshStandardMaterial({
            color: getRandomColor(),
            metalness: 0.95,
            roughness: 0.45,
            side: THREE.DoubleSide,
         }),
      []
   )

   return (
      Array.from({ length: 5 }).map((_, index) => (
         <mesh
            key={index}
            geometry={geometry}
            material={material}
            position={[-5 + index / 4, 0.15 + index / 4, 2]}
            rotation={[0, 0, 0.8]}
            receiveShadow
         >

         </mesh>
      ))
   )  // return()
}  // CreateExtrudeGeometry()
