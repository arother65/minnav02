/**
 * 
 *  
 * 
 */

import * as THREE from "three"
import { useEffect, useRef } from "react"

// import { LEGO } from "./legoConstants"
const LEGO = {
   STUD_SPACING: 1,
   STUD_RADIUS: 0.24,
   STUD_HEIGHT: 0.18,
   BRICK_HEIGHT: 0.96,
}


//
export function InstancedLegoBricks({ bricks = [], wireframe = false
   // [{ id, position: [x, y, z], width, depth, color }] 
}) {

   const bodyRef = useRef()
   const studRef = useRef()

   const bodyMatrix = new THREE.Matrix4()
   const studMatrix = new THREE.Matrix4()
   const color = new THREE.Color()

   useEffect(() => {
      // BODY INSTANCES
      bricks.forEach((brick, i) => {
         const { position, width, depth } = brick

         bodyMatrix.compose(
            new THREE.Vector3(
               position[0] + width / 2 - 0.5,
               position[1] + LEGO.BRICK_HEIGHT / 2,
               position[2] + depth / 2 - 0.5
            ),
            new THREE.Quaternion(),
            new THREE.Vector3(width, LEGO.BRICK_HEIGHT, depth)
         )

         bodyRef.current.setMatrixAt(i, bodyMatrix)
         bodyRef.current.setColorAt(i, color.set(brick.color))
      })

      bodyRef.current.instanceMatrix.needsUpdate = true
      bodyRef.current.instanceColor.needsUpdate = true

      // STUD INSTANCES
      let studIndex = 0
      bricks.forEach((brick) => {
         for (let x = 0; x < brick.width; x++) {
            for (let z = 0; z < brick.depth; z++) {
               studMatrix.setPosition(
                  brick.position[0] + x,
                  brick.position[1] + LEGO.BRICK_HEIGHT + LEGO.STUD_HEIGHT / 2,
                  brick.position[2] + z
               )

               studRef.current.setMatrixAt(studIndex, studMatrix)
               studRef.current.setColorAt(studIndex, color.set(brick.color))
               studIndex++
            }
         }
      })

      studRef.current.instanceMatrix.needsUpdate = true
      studRef.current.instanceColor.needsUpdate = true
   }, [bricks])

   const totalStuds = bricks.reduce((sum, b) => sum + b.width * b.depth, 0)

   return (
      <>
         <group position={[0, 0, 0]}>
            {/* Brick bodies */}
            <instancedMesh
               ref={bodyRef}
               args={[null, null, bricks.length]}  // count = number of instances
               castShadow
               receiveShadow
               onClick={(e) => {
                  // setExploded(true)
                  console.log('bricks:', bricks, 'coords: ',  e.barycoord)
               }}
            >
               <boxGeometry />
               <meshStandardMaterial
                  roughness={0.05}
                  metalness={0.5}
                  // vertexColors
                  wireframe={wireframe}
               />
            </instancedMesh>

            {/* Studs */}
            <instancedMesh
               ref={studRef}
               args={[null, null, totalStuds]}
            >
               <cylinderGeometry
                  args={[
                     LEGO.STUD_RADIUS,
                     LEGO.STUD_RADIUS,
                     LEGO.STUD_HEIGHT,
                     16,
                  ]}
               />
               <meshStandardMaterial
                  // transparent
                  // opacity={0.5}
                  wireframe={wireframe}
                  roughness={0.05}
                  metalness={0.5} />
            </instancedMesh>
         </group >
      </>
   )
}
