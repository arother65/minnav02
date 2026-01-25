/**
 * 
 * 
 */

// colors used 
// Dark Green #4b5320
// Brown #5b3a29
// Black #1c1c1c
// Background Green #6b7f2a

import * as THREE from "three"
import { useMemo } from "react"

//
export function createNatoCamoTexture(ivColors=[], size = 1024, blobs = 80) {

   const canvas = document.createElement("canvas");
   canvas.width = canvas.height = size;
   const ctx = canvas.getContext("2d", {});  // creates "context"
   let colors = []

   // Base color
   ctx.fillStyle = "#6b7f2a";  // light green 
   ctx.fillRect(0, 0, size, size);

   if (ivColors.length !== 0) {
      colors = ivColors
   } else {
      colors = [
         "#4b5320", // dark green
         "#5b3a29", // brown
         "#1c1c1c"  // black
      ]
   }

   function blob(color) {
      ctx.fillStyle = color;
      ctx.beginPath();

      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = size * (0.05 + Math.random() * 0.15);
      const points = 6 + Math.floor(Math.random() * 6);

      for (let i = 0; i <= points; i++) {
         const angle = (i / points) * Math.PI * 2;
         const radius = r * (0.7 + Math.random() * 0.6);
         ctx.lineTo(
            x + Math.cos(angle) * radius,
            y + Math.sin(angle) * radius
         );
      }
      ctx.closePath();
      ctx.fill();
   }  // blob()

   for (let i = 0; i < blobs; i++) {
      blob(colors[Math.floor(Math.random() * colors.length)])  // build context / ctx
   }

   const texture = new THREE.CanvasTexture(canvas);
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
   texture.repeat.set(2, 2);
   texture.anisotropy = 8;
   texture.colorSpace = THREE.SRGBColorSpace;

   return texture;
}  // createNatoCamoTexture()

//
export function NatoCamoPlane({ position = [0, 0.35, 0], args = [2, 2, 1, 1] }) {

   const camoTexture = useMemo(() => createNatoCamoTexture(), []);

   return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
         <planeGeometry args={args} />

         <meshStandardMaterial
            map={camoTexture}
            roughness={0.9}
            metalness={0.0}
         />
      </mesh>
   );
}  // NatoCamoPlane()


