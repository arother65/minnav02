/*
 * 
*/

import { useGLTF } from '@react-three/drei'

useGLTF.preload('/models/foxhound_mrap.glb')

//
export default function Foxhound(props) {

  const { scene } = useGLTF('/models/foxhound_mrap.glb')

  // 
  return (
    <>
      <primitive object={scene} {...props} />
      {/* <mesh geometry={geometry} material={material} {...props} scale={0.50} castShadow receiveShadow /> */}
    </>
  )
}  // Foxhound()
