/*
 *  Stand: 28.02.2026 
*/
import { useState, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { createNatoCamoTexture } from '../../components/NatoCamoPattern'
import { red, orange, yellow } from '@mui/material/colors'

//*
export default function TestComponents(props) {

  const { scene } = useGLTF('/models/particle_rotor_base.glb')

  // ! 
  //   const container01 = scene.children[0].children[0].children[0].children[0].children[0]
  //   const geometry = container01.geometry
  //   const material = container01.material
  //   material.color.set({ isColor: true, r: 12, g: 2, b: 2 })
  //   material.metalness = 0.95
  //   material.roughness = 0.1

  // 
  return (
    <>
      <primitive object={scene} {...props} />

      {/** einzelne Container anzeigen: */}
      {/* <mesh geometry={geometry} material={material} {...props} position={[-8, 0.25, 4]} castShadow receiveShadow /> */}

    </>
  )
}  // TestComponents()


//*
export function ControlRoomMonitor(props) {

  const { scene } = useGLTF('/models/control_room_monitor.glb')

  const children = scene.children[0].children[0].children[0].children[0].children

  const object01 = children[0]  // display without frame 
  const geometry01 = object01.geometry
  const material01 = object01.material
  material01.color.set({ isColor: true, r: 12, g: 2, b: 2 })
  material01.metalness = 0.95
  material01.roughness = 0.35

  // 
  return (
    <>
      {/* <primitive object={scene} {...props} /> */}

      {/** einzelne Objekte der scene anzeigen: */}
      <mesh geometry={geometry01} material={material01} {...props} castShadow receiveShadow />

    </>
  )
}  // ControlRoomMonitor()

//*
export function Trees(props) {

  const { scene } = useGLTF('/models/lp_objects_trees.glb')

  // const children = scene.children[0].children[0].children[0].children[0].children

  // scene.children[0].children[0].children[0].children  // enhält drei 3D-Objekte

  // const object01 = children[0]  // display without frame 
  // const geometry01 = object01.geometry
  // const material01 = object01.material
  // material01.color.set({ isColor: true, r: 12, g: 2, b: 2 })
  // material01.metalness = 0.95
  // material01.roughness = 0.35

  // 
  return (
    <>
      <primitive object={scene} {...props} />

      {/** einzelne Objekte der scene anzeigen: */}
      {/* <mesh geometry={geometry01} material={material01} {...props} castShadow receiveShadow /> */}

    </>
  )
}  // ControlRoomMonitor()


//* Truck M977 HEMTT
export function M977(props) {

  const { scene } = useGLTF('/models/truck_m977_hemtt.glb')

  useEffect(() => {
    // truck to the left 
    const children = scene.children[0].children[0].children[0].children[0].children[0].children  // 8 objects
    console.log('M977 children: ', children)

    // für "_rootJoint", typeof "BONE": children.children[0].children (10 Objekte, Wheels)
    // const wheels = children.children[0].children
    const wheels = children[0].children[0].children // "Bone"
    console.log('M977 wheels: ', wheels)

    // 
    children.forEach((child, index) => {
      console.log(index, 'name: ', child.name, '; type:', child.type)

      if (index > 0) {
        try {
          child.material.color = { isColor: true, r: 2, g: 20, b: 20 }
        } catch (error) {
          console.log(index, ' error accessing: ', child.name, child.type)
          console.log(child.children)
        }
      }

    })

  }, [scene])
  // scene.children[0].children[0].children[0].children  // enhält

  // const object01 = children[0]  // display without frame 
  // const geometry01 = object01.geometry
  // const material01 = object01.material
  // material01.color.set({ isColor: true, r: 12, g: 2, b: 2 })
  // material01.metalness = 0.95
  // material01.roughness = 0.35

  // 
  return (
    <>
      <primitive object={scene} {...props} />

      {/** einzelne Objekte der scene anzeigen: */}
      {/* <mesh geometry={geometry01} material={material01} {...props} castShadow receiveShadow /> */}

    </>
  )
}  // M977)

//* Truck Ural 4320 
export function Ural4320(props) {

  const { scene } = useGLTF('/models/truck_ural_4320.glb')
  // const [truckFront, setTruckFront] = useState(null)

  const children = scene.children[0].children[0].children[0].children[0].children  // 17 objects

  children[0].material.color = { isColor: true, r: 1, g: 1, b: 1 }  // the truck's front hull, bumper, cabin
  children[0].material.metalness = 0.95
  children[0].material.roughness = 0.5

  useEffect(() => {
    children.forEach((child, index) => {
      console.log(index, 'name: ', child.name, '; type:', child.type)
    })
  })  // useEffect 

  const camoTexture = useMemo(() => createNatoCamoTexture([red[800], orange[200], yellow[800]]), [])  // goldig...
  // const camoTexture = useMemo(() => createNatoCamoTexture(), [])  // NATO-colors

  children[0].material.map = camoTexture

  // useEffect(() => {
  // truck to the left 
  // const children = scene.children[0].children[0].children[0].children[0].children  // 17 objects

  // // Teile des truck ausgeben / alle ; truck einfärben
  // let d3obj = null;
  // children.forEach((child, index) => {
  //   console.log(index, 'name: ', child.name, '; type:', child.type)

  //   try {
  //     child.material.color = { isColor: true, r: 3, g: 3, b: 2 }  // the truck's front hull, bumper, cabin
  //     child.material.metalness = 0.15
  //     child.material.roughness = 0.45

  //   } catch (error) {
  //     d3obj = child.children[0]
  //     console.log(index, ' error accessing: ', d3obj.name, d3obj.type)

  //     d3obj.material.color = { isColor: true, r: 12, g: 3, b: 2 }  // all other truck parts
  //     d3obj.material.metalness = 0.15
  //     d3obj.material.roughness = 0.45
  //   }
  // })  // Array.forEach()

  // setTruckFront(children[0])  //?

  // }, [truckFront, scene])  // useEffect()

  // 
  return (
    <>
      {/* <primitive object={scene} {...props} /> */}

      {/** einzelne Objekte der scene anzeigen: Kabine */}
      <mesh
        geometry={children[0].geometry}
        material={children[0].material}
        {...props}
        castShadow receiveShadow>
        {/* <meshStandardMaterial map={camoTexture} side={2}/> */}
      </mesh>
    </>
  )  // return()
}  // Ural4320()