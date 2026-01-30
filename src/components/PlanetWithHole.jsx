/**
 * 
 * 
 * 
 */


//*
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'
import { createNatoCamoTexture } from './NatoCamoPattern'
import { orange } from "@mui/material/colors"

//* creates a mid-size square
function createShapeMD() {
   const shape = new THREE.Shape()

   // Outer rectangle
   shape.moveTo(-0.5, -0.5)

   shape.lineTo(0.5, -0.5)
   shape.lineTo(0.5, 0.5)
   shape.lineTo(-0.5, 0.5)
   shape.lineTo(-0.5, -0.5)

   // Circular hole
   // Hole definitions
   const holes = [
      { x: -0.35, y: 0.35, r: 0.05 },
      { x: 0, y: 0.35, r: 0.05 },
      { x: 0.35, y: 0.35, r: 0.05 },

      { x: -0.35, y: 0.15, r: 0.05 },
      { x: 0, y: 0.15, r: 0.05 },
      { x: 0.35, y: 0.15, r: 0.05 },

      { x: -0.35, y: 0, r: 0.05 },
      { x: 0, y: 0, r: 0.05 },
      { x: 0.35, y: 0, r: 0.05 },

      { x: -0.35, y: -0.15, r: 0.05 },
      { x: 0, y: -0.15, r: 0.05 },
      { x: 0.35, y: -0.15, r: 0.05 },

      { x: -0.35, y: -0.35, r: 0.05 },
      { x: 0, y: -0.35, r: 0.05 },
      { x: 0.35, y: -0.35, r: 0.05 }
   ]

   holes.forEach(({ x, y, r }) => {
      const hole = new THREE.Path()
      hole.absarc(x, y, r, 0, Math.PI * 2, false)
      shape.holes.push(hole)
   })

   return shape
}  // createShapeMD()

//* creates a small-size square
function createShapeSM() {
   const shape = new THREE.Shape()

   // Outer triangle
   shape.moveTo(0.5, 0.5)

   shape.lineTo(1, 0.15)
   shape.lineTo(0.15, 0.15)

   // Circular holes, definitions
   const holes = [
      { x: 0.5, y: 0.4, r: 0.025 },
      { x: 0.5, y: 0.3, r: 0.025 },
      { x: 0.5, y: 0.2, r: 0.025 },
   ]

   holes.forEach(({ x, y, r }) => {
      const hole = new THREE.Path()
      hole.absarc(x, y, r, 0, Math.PI * 2, false)
      shape.holes.push(hole)
   })

   return shape
}  // createShapeSM()

//* loads and retuns a model
export function Model({position=[0, 0, 0], rotation=[0, 0, 0]}) {

   const treeModel = useGLTF('/models/Pine Trees.glb')
   //   console.log(treeModel)

   //  useGLTF.preload('/models/Pine Trees.glb')  // usage not clear 

   return <primitive object={treeModel.scene} position={position} rotation={rotation} scale={1} />
}  // Model()

//*
export default function PlanetWithHole({
   position = [0, 0, 0],
   rotation = [0, 0, 0],
   texture,
   textureColors
}) {

   // let shape = createShapeMD()
   let shape = createShapeSM()

   // create texture here
   let textureCardboard = useTexture('/textures/cardboard.png')
   let textureWood = useTexture('/textures/wood.jpg')
   let textureRust = useTexture('/textures/rust/speckled-rust_albedo.png')

   switch (texture) {
      case 'cardboard':
         texture = textureCardboard
         break;
      case 'wood':
         texture = textureWood
         break;
      case 'rust':
         texture = textureRust
         break;
      default:
         if (!textureColors) {
            texture = createNatoCamoTexture([orange[200], orange[400], orange[600]])
         } else {
            texture = createNatoCamoTexture(textureColors)
         }
         break;
   }
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   texture.repeat.set(2, 2)

   //
   return (
      <mesh position={position} rotation={rotation} receiveShadow>
         <shapeGeometry args={[shape]} />
         <meshStandardMaterial
            color="white"
            roughness={0.15}
            metalness={0.85}
            map={texture}
            side={THREE.DoubleSide}
         />
      </mesh>
   )
}
