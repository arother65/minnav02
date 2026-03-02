/*
 * 
*/

import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

useGLTF.preload('/models/foxhound_mrap.glb')

//
export default function Foxhound(props) {

  const { scene } = useGLTF('/models/foxhound_mrap.glb')

  useEffect(() => {
    const children = scene.children[0].children[0].children[0].children[0].children  // enthält 28 objekte

    children.forEach((child, i) => {
      console.log(i, child.name)  // children[0] = Chassis

      {/** nicht jeder mesh läßt sich ohne weiteren Zugriff auf "children" zugreifen... */ }
      try {
        if (child.material.color) {
          child.material.color = { isColor: true, r: 12, g: 1, b: 1 }  // funktioniert nur einmal
          child.material.metalness = 0.25
          child.material.roughness = 0.55
        }

      } catch (error) {
        // console.log('Err with: ', i, child.name, child.children[0])
        child.children[0].material.color = { isColor: true, r: 12, g: 1, b: 1 }
        child.children[0].material.metalness = 0.35
        child.children[0].material.roughness = 0.55
      }
    })    // forEach()
  }, [scene])

  // 
  return (
    <>
      <primitive object={scene} {...props} shadows />
      {/* <mesh geometry={geometry} material={material} {...props} castShadow receiveShadow /> */}

    </>
  )  // return()
}  // Foxhound()
