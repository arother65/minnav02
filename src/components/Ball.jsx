/**
 * 
 */

//*
import { Physics, RigidBody } from '@react-three/rapier'

//*
export default function Ball({ position, velocity, color = 'red' }) {
   return (
      
      <Physics gravity={[0, -0.05, 0]}>
         <RigidBody
            colliders="ball"  // works even if deactivated
            restitution={1}        // bounciness
            friction={0}
            linearVelocity={velocity}
            position={position} 
            type="kinematicVelocity"
         >
            <mesh>
               <sphereGeometry args={[0.5, 32, 32]} />
               <meshStandardMaterial color={color} />
            </mesh>     
         </RigidBody>
      </Physics>
   )
}

// export default function Scene() {
//   return (
//     <Canvas>
//       <ambientLight />
//       <Physics gravity={[0, 0, 0]}>
//         <Ball position={[-2, 0, 0]} velocity={[2, 0, 0]} />
//         <Ball position={[2, 0, 0]} velocity={[-2, 0, 0]} />
//       </Physics>
//     </Canvas>
//   )
// }
