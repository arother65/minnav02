/**
 * 
 * 
 * 
 */

//*
import { useSphere } from '@react-three/cannon'

//*
export default function Cannonball({ position, velocity = [0, 0, 0], onExplode }) {

   const [ref, api] = useSphere(() => ({
      mass: 5,
      position: position,
      velocity: velocity,
      onCollide: (e) => {
         onExplode(e.contact.impactVelocity)
      },
   }))

   return (
      <mesh ref={ref} castShadow>
         <sphereGeometry args={[0.5, 16, 16]} />
         <meshStandardMaterial color="darkgreen" />
      </mesh>
   )
}
