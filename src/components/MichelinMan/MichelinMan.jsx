/**
 * 
 * 
 */

//* Imports
import * as THREE from "three"
import { useLayoutEffect, useRef } from "react"


//
function Ring({ position, scale = 1 }) {
   return (
      <mesh position={position} scale={scale}>
         <torusGeometry args={[0.6, 0.18, 16, 32]} />
         <meshStandardMaterial
            color="#f5f5f5"
            roughness={0.6}
            metalness={0}
         />
      </mesh>
   );
}  // Ring()

//
export function MichelinMan() {
   return (
      <group>
         {/* 🧍 Body */}
         <Ring position={[0, 0.5, 0]} scale={1.2} />
         <Ring position={[0, 0.9, 0]} scale={1.25} />
         <Ring position={[0, 1.3, 0]} scale={1.3} />
         <Ring position={[0, 1.7, 0]} scale={1.25} />
         <Ring position={[0, 2.1, 0]} scale={1.15} />

         {/* 🙂 Head */}
         <mesh position={[0, 2.7, 0]}>
            <sphereGeometry args={[0.45, 24, 24]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.6} />
         </mesh>

         <Ring position={[0, 2.55, 0]} scale={0.9} />

         {/* 💪 Left arm */}
         <group rotation={[0, 0, Math.PI / 6]}>
            <Ring position={[-1, 1.8, 0]} scale={0.9} />
            <Ring position={[-1.4, 1.4, 0]} scale={0.85} />
         </group>

         {/* 💪 Right arm */}
         <group rotation={[0, 0, -Math.PI / 6]}>
            <Ring position={[1, 1.8, 0]} scale={0.9} />
            <Ring position={[1.4, 1.4, 0]} scale={0.85} />
         </group>
      </group>
   );
}  // MichelinMan()

//
export function MichelinManInstanced() {
  const meshRef = useRef();

  // All ring transforms
  const rings = [
    // Body
    { pos: [0, 0.5, 0], scale: 1.2 },
    { pos: [0, 0.9, 0], scale: 1.25 },
    { pos: [0, 1.3, 0], scale: 1.3 },
    { pos: [0, 1.7, 0], scale: 1.25 },
    { pos: [0, 2.1, 0], scale: 1.15 },

    // Neck
    { pos: [0, 2.55, 0], scale: 0.9 },

    // Left arm
    { pos: [-1, 1.8, 0], scale: 0.9, rotZ: Math.PI / 6 },
    { pos: [-1.4, 1.4, 0], scale: 0.85, rotZ: Math.PI / 6 },

    // Right arm
    { pos: [1, 1.8, 0], scale: 0.9, rotZ: -Math.PI / 6 },
    { pos: [1.4, 1.4, 0], scale: 0.85, rotZ: -Math.PI / 6 },
  ];

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();

    rings.forEach((ring, i) => {
      dummy.position.set(...ring.pos);
      dummy.scale.setScalar(ring.scale);
      dummy.rotation.set(0, 0, ring.rotZ || 0);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* Rings (INSTANCED) */}
      <instancedMesh
        ref={meshRef}
        args={[null, null, rings.length]}
      >
        <torusGeometry args={[0.6, 0.18, 16, 32]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.6}
          metalness={0}
        />
      </instancedMesh>

      {/* Head (separate mesh, different geometry) */}
      <mesh position={[0, 2.7, 0]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}  // MichelinManInstanced()
