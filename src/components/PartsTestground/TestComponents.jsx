/*
 *  Stand: 28.02.2026 
*/
import { useGLTF } from '@react-three/drei'

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
