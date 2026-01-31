/**
 * 
 * 
 * 
 */


//*
import * as THREE from 'three'
import { useTexture, useGLTF, Clone } from '@react-three/drei'
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
   shape.lineTo(0.1, 0.15)

   // Circular holes, definitions (holes.absarc)
   const holes = [
      { x: 0.5, y: 0.4, r: 0.025 },
      { x: 0.5, y: 0.3, r: 0.025 },
      { x: 0.5, y: 0.2, r: 0.025 },
   ]

   // const holes = [
   // { x: 1, y: 1, xr: 0.015, yr: 0.015 },
   // { x: 0.5, y: 0.3, r: 0.025 },
   // { x: 0.5, y: 0.2, r: 0.025 },
   // ]  // hols for hole.ellipse'

   holes.forEach(({ x, y, r }) => {
      const hole = new THREE.Path()
      hole.absarc(x, y, r, 0, Math.PI * 2, false)

      // hole.ellipse(x, y, xr, yr, 1, 2)

      shape.holes.push(hole)
   })

   return shape
}  // createShapeSM()

//* loads and returns a model
export function Model({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {

   const treeModel = useGLTF('/models/Pine Trees.glb')

   treeModel.materials.Wood.metalness = 0
   treeModel.materials.Wood.roughness = 0.65
   treeModel.materials.Green.metalness = 0
   treeModel.materials.Green.roughness = 0.65

   //  useGLTF.preload('/models/Pine Trees.glb')  // usage not clear 

   // return <Clone object={treeModel.scene} {...props} />
   return <Clone object={treeModel.scene} position={position} rotation={rotation} scale={scale} />
}  // Model()

//*
export function CreateSingleTree({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {

   const treeModel = useGLTF('/models/Tree.glb')

   // treeModel.materials.Wood.metalness = 0
   // treeModel.materials.Wood.roughness = 0.65
   // treeModel.materials.Green.metalness = 0
   // treeModel.materials.Green.roughness = 0.65

   //  useGLTF.preload('/models/Tree.glb')  // usage not clear 

   // return <Clone object={treeModel.scene} {...props} />
   return <Clone object={treeModel.scene} position={position} rotation={rotation} scale={scale} />
}  // CreateSingleTree()

//*
export function CreateGrass({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {

   const grassModel = useGLTF('/models/Grass.glb')
   grassModel.materials.Grass.metalness = 0
   grassModel.materials.Grass.roughness = 0.8

   // return <Clone object={treeModel.scene} {...props} />
   return <Clone object={grassModel.scene} position={position} rotation={rotation} scale={scale} />
}  // CreateGrass()

//*
export function CreateStreet({ position = [0, 0, 0], rotation = [0, 0, 0] }) {

   let texture = useTexture('/textures/highway/highway-lanes_albedo.png')
   // map: '/textures/highway/highway-lanes_albedo.png',
   // normalMap: '/textures/highway/highway-lanes_ao.png',
   // metalnessMap: '/textures/highway/highway-lanes_metallic.psd',  // errs 

   texture.colorSpace = THREE.SRGBColorSpace
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping
   texture.repeat.set(1, 1)

   /*    , (texture) => {
         texture.wrapS = texture.wrapT = THREE.RepeatWrapping
         texture.repeat.set(2, 2)
      }
    */

   /* const textures = useTexture({
     map: '/albedo.jpg',
     normalMap: '/normal.jpg',
     roughnessMap: '/roughness.jpg',
     metalnessMap: '/metalness.jpg',
   }) */

   //
   return (
      <mesh position={position} rotation={rotation} receiveShadow>
         <planeGeometry args={[1, 1, 10, 10]} />
         <meshStandardMaterial
            color="white"
            roughness={0.65}
            metalness={0.05}
            map={texture}
            side={THREE.DoubleSide}
         />
      </mesh>
   )
}  // CreateStreet()


//*
export function CreateTruck({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {

   const truckModel = useGLTF('/models/Dump truck.glb')
   // grassModel.materials.Grass.metalness = 0
   // grassModel.materials.Grass.roughness = 0.8

   truckModel.materials.F44336.metallness = 0.95
   truckModel.materials.F44336.roughness  = 0.45
   truckModel.materials.F44336.color = { isColor: true, r: 128, g: 0, b: 0 }  //?

   truckModel.materials.FF5722.metallness = 0.95
   truckModel.materials.FF5722.roughness  = 0.45

   truckModel.materials.FF9800.metallness = 0.95
   truckModel.materials.FF9800.roughness  = 0.45

   truckModel.materials.FFEB3B.metallness = 0.95
   truckModel.materials.FFEB3B.roughness  = 0.45

   // return <Clone object={treeModel.scene} {...props} />
   return <Clone color={'red'} object={truckModel.scene} position={position} rotation={rotation} scale={scale} />
}  // CreateTruck()

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
}  // PlanetWithHole()
