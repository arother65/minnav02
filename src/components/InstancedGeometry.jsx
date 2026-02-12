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
   shape.lineTo(0.05, 0.05)  // divides the shape in half
   shape.lineTo(0.05, 0.05)  // divides the shape in half

   // shape.lineTo(0.025, 0.005)
   // shape.lineTo(0.025, 0.005)

   shape.bezierCurveTo(
      1.9,  // ? Länge des Objekts UND Lage in der vertikalen Achse
      1.9,  // Länge und Lage im Raum 
      // 0.5, //? Länge des Objekts
      // 1, 
      3.75,  // Breite des Objekts 
      0.25
   )
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
export default function CreateExtrudeGeometry({ position = [0, 0, 0], rotation = [0, 0, 0], color = 'red' }) {

   const shape02 = createShape()

   const geometry = useMemo(
      () =>
         new THREE.ExtrudeGeometry(shape02, {
            depth: 0.01,  // length of the object 
            steps: 16,
            bevelEnabled: true,
            bevelSize: 0.1,
            bevelSegments: 8,
         }),
      [shape02]
   )

   const material = useMemo(() =>
      new THREE.MeshStandardMaterial({
         color: color,
         metalness: 0.95,
         roughness: 0.45,
         side: THREE.DoubleSide,
      }), [])

   return (
      <mesh
         geometry={geometry}
         material={material}
         position={position}
         rotation={rotation}
         receiveShadow
      >
         {/* <Text depthOffset={1} position={[0, 0.45, 0]} color={material.color} fontSize={0.2}>THREE.ExtrudeGeometry</Text> */}
      </mesh>
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