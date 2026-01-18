/**
 *  https://cydstumpel.nl/
 */

// 
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import '../utils/util'

// The main App component that sets up the 3D scene   
export const App = ({ radius, count, rolling, speed }) => {

   const { scene } = useThree()
   // console.log(scene)

   // 
   const boxRef = useRef()
   useFrame((_, delta) => {
      if (rolling && boxRef.current) {
         boxRef.current.rotation.x += delta * speed
         // boxRef.current.rotation.y += delta
         // boxRef.current.rotation.z += delta
         // console.log(scene)
         // console.log(boxRef)
      }
   })

   //
   return (
      <mesh ref={boxRef}>
         <ScrollControls pages={5} infinite > {/* vertikaler Rollbalken */}
            <Rig rotation={[0, 0, -4.685]} > {/* neigt den Ring: 0,0,-x kippt vertikal */}
               <Carousel
                  radius={radius}
                  count={count} />
            </Rig >
            {/* <Banner position={[0, -0.25, 0.5]} /> */}
         </ScrollControls >
      </mesh >
   )  // return()
}  // App()


function Rig(props) {

   const ref = useRef()
   const scroll = useScroll()

   useFrame((state, delta) => {
      // ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
      ref.current.rotation.x = -scroll.offset * (Math.PI * 2) // Rotate contents vertically
      // ref.current.rotation.z = -scroll.offset * (Math.PI * 2) // Rotate contents

      state.events.update() // Raycasts every frame rather than on pointer-move

      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
      state.camera.lookAt(0, 0, 0) // Look at center
   })

   return <group ref={ref} {...props} />
}  // Rig()

// function Carousel({ radius = 1.5, count = 8 }) {
function Carousel({ radius, count }) {

   return (
      // <mesh ref={cardRef}>
      Array.from({ length: count }, (_, i) => (
         <Card
            key={i}

            // Bilder aus /public : ''<img1_.jpg> bis '<img10_.jpg>' 
            url={`/flags/img${Math.floor(i % 8) + 1}_.jpg`}

            position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}

            rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}  // dreht die erzeugten Cards und ordnet diese im Kreis an 
         // rotation={[0, 5, 0]}
         />
      ))
      // </mesh >
   )
}  // Carousel()

function Card({ url, ...props }) {

   const refImg = useRef()
   const [hovered, hover] = useState(false)

   const pointerOver = (e) => {
      e.stopPropagation();
      hover(true);
      // alert(e.currentTarget.url);
      // console.log(ref.current)
   }

   const pointerOut = () => hover(false)

   useFrame((state, delta) => {
      // when hovered, image gets enlarged: hovered ? 2.15 : 1 
      easing.damp3(refImg.current.scale, hovered ? 2.5 : 1, 0.1, delta)

      // easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
      // easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
   })

   return (
      <Image ref={refImg} url={url}
         transparent side={THREE.DoubleSide}
         onPointerOver={pointerOver}
         onPointerOut={pointerOut}
         onClick={() => {
            alert(`You clicked on:\n${url}`)   // ok, gets the current image
            console.log(url)
         }}
         {...props}>

         <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>
   )
}  // Card()

function Banner(props) {
   const ref = useRef()

   // const texture = useTexture('/work_.png')
   const texture = useTexture('/logo.svg')   // alien-1294345.svg
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping

   const scroll = useScroll()

   useFrame((state, delta) => {
      ref.current.material.time.value += Math.abs(scroll.delta) * 4
      ref.current.material.map.offset.x += delta / 2
   })

   return (
      <mesh ref={ref} {...props}>
         <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
         <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
   )
}  // Banner() 
