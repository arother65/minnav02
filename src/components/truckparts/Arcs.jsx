/**
 * 
 * 
 * 
 */

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// import { OrbitControls } from "@react-three/drei";


// ------------------- Airflow Arc -------------------
export default function AirflowArc({ controlPoints = [0,0,0], color = "#00aaff", speed = 0.01 }) {
    const ref = useRef();

    const curve = new THREE.CatmullRomCurve3(controlPoints);
    const geometry = new THREE.TubeGeometry(curve, 50, 0.02, 8, false);
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
    });

    // Particle along the curve
    const particleRef = useRef();

    useFrame(() => {
        if (!particleRef.current) return;

        particleRef.current.userData.t = (particleRef.current.userData.t || 0) + speed;

        if (particleRef.current.userData.t > 1) particleRef.current.userData.t = 0;

        const pos = curve.getPointAt(particleRef.current.userData.t);
        particleRef.current.position.copy(pos);
    });

    return (
        <group>
            <mesh geometry={geometry} material={material} />
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
}

// ------------------- Main Scene -------------------
// export default function TruckScene() {
//   const arcs = [
//     // Left cab airflow
//     [
//       new THREE.Vector3(-0.7, 1.05, -1),
//       new THREE.Vector3(-0.9, 1.2, 0),
//       new THREE.Vector3(-1, 1.4, 2),
//       new THREE.Vector3(-1.2, 1.5, 4),
//     ],
//     // Center cab airflow
//     [
//       new THREE.Vector3(0, 1.05, -1),
//       new THREE.Vector3(0, 1.3, 0.5),
//       new THREE.Vector3(0, 1.5, 2.5),
//       new THREE.Vector3(0, 1.6, 4),
//     ],
//     // Right cab airflow
//     [
//       new THREE.Vector3(0.7, 1.05, -1),
//       new THREE.Vector3(0.9, 1.2, 0),
//       new THREE.Vector3(1, 1.4, 2),
//       new THREE.Vector3(1.2, 1.5, 4),
//     ],
//   ];

//   return (
//     <Canvas shadows camera={{ position: [8, 5, 10], fov: 45 }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
//       <Truck />
//       {arcs.map((points, i) => (
//         <AirflowArc key={i} controlPoints={points} />
//       ))}
//       <OrbitControls />
//       {/* Ground */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
//         <planeGeometry args={[30, 30]} />
//         <meshStandardMaterial color="#555555" />
//       </mesh>
//     </Canvas>
//   );
// }
