/**
 * 
 * 
 * 
 */

//*
import { useMemo, useRef, useEffect } from 'react'
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"
import * as THREE from 'three'
import { Text } from "@react-three/drei"

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
export default function CreateExtrudeGeometry({noObjects = 2}) {

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

   const material = useMemo(() =>
      new THREE.MeshStandardMaterial({
         color: getRandomColor(),
         metalness: 0.95,
         roughness: 0.45,
         side: THREE.DoubleSide,
      }), [])

   return (
      Array.from({ length: noObjects }).map((_, index) => (
         <mesh
            key={index}
            geometry={geometry}
            material={material}
            position={[-5 + index / 4, 0.15 + index / 4, 2]}
            rotation={[0, 0, 0.8]}
            receiveShadow
         >
            <Text position={[0, 0.35, 0]} color={material.color} fontSize={0.2}>{index}</Text>
         </mesh>
      ))
   )  // return()
}  // CreateExtrudeGeometry()


//* 
export function CreateExtrudeGeometry02({ noObjects = 100 }) {

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

   const material = useMemo(() =>
      new THREE.MeshStandardMaterial({
         color: getRandomColor(),
         metalness: 0.95,
         roughness: 0.45,
         side: THREE.DoubleSide,
      }), [])

   const ref = useRef()

   useEffect(() => {
      for (let i = 0; i < noObjects; i++) {
         const matrix = new THREE.Matrix4()

         // (method) Matrix4.compose(position: THREE.Vector3, quaternion: THREE.Quaternion, scale: THREE.Vector3): THREE.Matrix4
         matrix.compose(
            new THREE.Vector3(-5 + i / 50, 0.15, 3),  // position
            new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.8)),  // quaternion
            new THREE.Vector3(1, 1, 1)  // scale
         )
         ref.current.setMatrixAt(i, matrix)
      }
      ref.current.instanceMatrix.needsUpdate = true
   })

   return (
      <instancedMesh ref={ref} args={[geometry, material, noObjects]} receiveShadow>
         <Text position={[-4, 0.5, 3]} color={material.color} fontSize={0.2}>created using instancedMesh</Text>
      </instancedMesh>
   )
}  // CreateExtrudeGeometry02()