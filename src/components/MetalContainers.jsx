/*
 * 
*/

import { useGLTF } from '@react-three/drei'

useGLTF.preload('/models/truck_container_pack.glb')

//
export default function MetalContainers(props) {

  const { scene } = useGLTF('/models/truck_container_pack.glb')

  // ! zerlegen in einzelne Container 
  console.log(scene)
  const children = scene.children[0].children[0].children[0].children[0].children

  const container01 = children[0]
  const geometry = container01.geometry
  const material = container01.material 

  const container02 = children[1]
  const container03 = children[2]
  const container04 = children[3] 


  // 
  return (
    <>
      {/* <primitive object={scene} {...props} /> */}

      {/** einzelnen Container anzeigen: */}
      <mesh geometry={geometry} material={material} {...props} castShadow receiveShadow />
    </>
  )
}  // MetalContainers()
