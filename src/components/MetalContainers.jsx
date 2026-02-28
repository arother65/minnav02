/*
 * 
*/

import { useGLTF } from '@react-three/drei'

useGLTF.preload('/models/truck_container_pack.glb')

//
export default function MetalContainers(props) {

  const { scene } = useGLTF('/models/truck_container_pack.glb')

  // ! zerlegen in einzelne Container 

  // 
  return (
    <>
      <primitive object={scene} {...props} />
      {/* <mesh geometry={geometry} material={material} {...props} scale={0.50} castShadow receiveShadow /> */}
    </>
  )
}  // MetalContainers()
