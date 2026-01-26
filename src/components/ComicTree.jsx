/**
 * 
 * 
 * 
 */

//
// import * as THREE from "three";
import { Edges } from "@react-three/drei"

//
export default function ComicTree({ position }) {
	return (
		<group position={position}>
			{/* 🌲 Trunk */}
			<mesh position={[0, 0.75, 0]}>
				<cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
				<meshToonMaterial color="#8B5A2B" />
				<Edges scale={1.01} color="black" />
			</mesh>

			{/* 🍃 Leaves */}
			<mesh position={[0, 1.9, 0]}>
				<sphereGeometry args={[0.9, 10, 10]} />
				<meshToonMaterial color="#2ecc71" />
				<Edges scale={1.01} color="black" />
			</mesh>

			<mesh position={[-0.5, 1.6, 0.3]}>
				<sphereGeometry args={[0.6, 10, 10]} />
				<meshToonMaterial color="#27ae60" />
				<Edges scale={1.01} color="black" />
			</mesh>

			<mesh position={[0.5, 1.6, -0.3]}>
				<sphereGeometry args={[0.6, 10, 10]} />
				<meshToonMaterial color="#27ae60" />
				<Edges scale={1.01} color="black" />
			</mesh>
		</group>
	)  // return()
}  // ComicTree()
