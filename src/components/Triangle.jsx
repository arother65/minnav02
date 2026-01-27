/**
 * 
 *  Triangle.jsx
 * 
 */

//* Imports
import * as THREE from "three";

//* main component 
export default function Triangle({position}) {

   const geometry = new THREE.BufferGeometry();

   // 3 vertices
   const vertices = new Float32Array([
      0, 0.5, 0,   // top
      -0.5, -0.5, 0,   // bottom left
      0.5, -0.5, 1,   // bottom right
   ]);

   // RGB color per vertex
   const colors = new Float32Array([
      1, 0, 0,   // red (top)
      0, 1, 0,   // green (bottom left)
      0, 0, 1,   // blue (bottom right) 0,0,1
   ]);

   geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
   );

   // (array: THREE.TypedArray, itemSize: number, normalized?: boolean): THREE.BufferAttribute
   geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
   );

   geometry.computeVertexNormals();

   return (
      <mesh geometry={geometry} position={position}>
         <meshStandardMaterial
            vertexColors
            side={THREE.DoubleSide}
            metalness={0}
            roughness={0.5}
         />
      </mesh>
   )
}  // Triangle()


