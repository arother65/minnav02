/*
 * 
*/

import { useGLTF } from '@react-three/drei'

// useGLTF.preload('/models/truck_container_pack.glb')  // is preloaded in the parent component

//
export default function MetalContainers(props) {

  const { scene } = useGLTF('/models/truck_container_pack.glb')

  // ! zerlegen in einzelne Container 
  const container01 = scene.children[0].children[0].children[0].children[0].children[0]
  const geometry = container01.geometry
  const material = container01.material
  material.color.set({ isColor: true, r: 12, g: 2, b: 2 })
  material.metalness = 0.95
  material.roughness = 0.1

  const container02 = scene.children[0].children[0].children[0].children[1].children[0]  // Evergreen container
  const geometry02 = container02.geometry
  const material02 = container02.material
  material02.color.set({ isColor: true, r: 1, g: 10, b: 1 })
  material02.metalness = 0.85
  material02.roughness = 0.25

  const container03 = scene.children[0].children[0].children[0].children[2].children[0]  // KMTC Line container
  const geometry03 = container03.geometry
  const material03 = container03.material
  material03.color.set({ isColor: true, r: 1, g: 1, b: 12 })
  material03.metalness = 0.85
  material03.roughness = 0.25

  const container04 = scene.children[0].children[0].children[0].children[3].children[0]  // Maersk container
  const geometry04 = container04.geometry
  const material04 = container04.material
  material04.color.set({ isColor: true, r: 1, g: 5, b: 30 })
  material04.metalness = 0.85
  material04.roughness = 0.25

  // 
  return (
    <>
      {/* <primitive object={scene} {...props} /> */}

      {/** einzelne Container anzeigen: */}
      <mesh geometry={geometry} material={material} {...props} position={[-8, 0.25, 4]} castShadow receiveShadow />
      <mesh geometry={geometry02} material={material02} {...props} position={[-8, 2.25, 4]} castShadow receiveShadow />
      
      <mesh geometry={geometry03} material={material03} {...props} position={[-3, 0.25, 6]} castShadow receiveShadow />
      <mesh geometry={geometry04} material={material04} {...props} position={[-3, 2.25, 6]} castShadow receiveShadow />

    </>
  )
}  // MetalContainers()
