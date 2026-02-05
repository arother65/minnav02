/** 
  * 
  * Stand: 04.02.2026 
  * 
  * 
  *  
 */

//*
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'


//*
function randomVector(scale = 1) {
   return new THREE.Vector3(
      (Math.random() - 0.5) * scale,
      (Math.random() - 0.5) * scale,
      (Math.random() - 0.5) * scale
   )
}  // 

//*
function SpinArrow({ target, angularVelocity, color }) {
   const arrow = useRef()

   useFrame(() => {
      if (!target.current) return

      const dir = angularVelocity.current.clone()
      const length = dir.length()

      if (length > 0.0001) {
         dir.normalize()
         arrow.current.setDirection(dir)
         arrow.current.setLength(length * 8, 0.2, 0.15)
         arrow.current.position.copy(target.current.position)
      }
   })

   return <arrowHelper ref={arrow} args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, color]} />
}  // 

//* Main component
export default function BouncingBalls({ colors = {color1: 'white', color2: 'darkgrey'}}) {

   const ball1 = useRef()
   const ball2 = useRef()

   const v1 = useRef(randomVector(0.08))
   const v2 = useRef(randomVector(0.08))

   const w1 = useRef(randomVector(0.05))
   const w2 = useRef(randomVector(0.05))

   const radius = 0.5
   const bounds = 4

   useFrame(() => {
      ball1.current.position.add(v1.current)
      ball2.current.position.add(v2.current)

      ball1.current.rotation.x += w1.current.x
      ball1.current.rotation.y += w1.current.y
      ball1.current.rotation.z += w1.current.z

      ball2.current.rotation.x += w2.current.x
      ball2.current.rotation.y += w2.current.y
      ball2.current.rotation.z += w2.current.z

      const p1 = ball1.current.position
      const p2 = ball2.current.position

      const normal = new THREE.Vector3().subVectors(p2, p1)
      const distance = normal.length()

      if (distance <= radius * 2) {
         normal.normalize()
         const relativeVelocity = new THREE.Vector3().subVectors(v1.current, v2.current)
         const speed = relativeVelocity.dot(normal)

         if (speed < 0) {
            const impulse = normal.clone().multiplyScalar(speed)
            v1.current.sub(impulse)
            v2.current.add(impulse)

            const tangent = new THREE.Vector3()
               .subVectors(relativeVelocity, normal.clone().multiplyScalar(speed))
               .multiplyScalar(0.3)

            w1.current.add(tangent)
            w2.current.sub(tangent)
         }
      }

      ;[ball1, ball2].forEach((ball, i) => {
         const v = i === 0 ? v1.current : v2.current
         const w = i === 0 ? w1.current : w2.current

            ;['x', 'y', 'z'].forEach(axis => {
               if (Math.abs(ball.current.position[axis]) > bounds) {
                  v[axis] *= -1
                  w.add(randomVector(0.02))
                  ball.current.position[axis] = THREE.MathUtils.clamp(
                     ball.current.position[axis],
                     -bounds,
                     bounds
                  )
               }
            })
      })
   })

   return (
      <>
         <Sphere ref={ball1} args={[radius, 32, 32]} position={[-1, 0, 0]}>
            <meshStandardMaterial color={colors.color1} />
         </Sphere>
         <Sphere ref={ball2} args={[radius, 32, 32]} position={[1, 0, 0]}>
            <meshStandardMaterial color={colors.color2} />
         </Sphere>

         <SpinArrow target={ball1} angularVelocity={w1} color={0xff69b4} />
         <SpinArrow target={ball2} angularVelocity={w2} color={0x87ceeb} />
      </>
   )
}  // BouncingBalls()

//* with timer / slow motion
export function BouncingBalls01() {
  const ball1 = useRef()
  const ball2 = useRef()

  const v1 = useRef(randomVector(0.08))
  const v2 = useRef(randomVector(0.08))

  const w1 = useRef(randomVector(0.05))
  const w2 = useRef(randomVector(0.05))

  // time scaling for slow motion
  const timeScale = useRef(1)

  const radius = 0.5
  const bounds = 4

  useFrame(() => {
    // smoothly recover time
    timeScale.current = THREE.MathUtils.lerp(timeScale.current, 1, 0.05)

    const dt = timeScale.current

    // linear motion
    ball1.current.position.addScaledVector(v1.current, dt)
    ball2.current.position.addScaledVector(v2.current, dt)

    // angular motion
    ball1.current.rotation.x += w1.current.x * dt
    ball1.current.rotation.y += w1.current.y * dt
    ball1.current.rotation.z += w1.current.z * dt

    ball2.current.rotation.x += w2.current.x * dt
    ball2.current.rotation.y += w2.current.y * dt
    ball2.current.rotation.z += w2.current.z * dt

    const p1 = ball1.current.position
    const p2 = ball2.current.position

    const normal = new THREE.Vector3().subVectors(p2, p1)
    const distance = normal.length()

    if (distance <= radius * 2) {
      normal.normalize()
      const relativeVelocity = new THREE.Vector3().subVectors(v1.current, v2.current)
      const speed = relativeVelocity.dot(normal)

      if (speed < 0) {
        // trigger slow motion
        timeScale.current = 0.15

        const impulse = normal.clone().multiplyScalar(speed)
        v1.current.sub(impulse)
        v2.current.add(impulse)

        const tangent = new THREE.Vector3()
          .subVectors(relativeVelocity, normal.clone().multiplyScalar(speed))
          .multiplyScalar(0.3)

        w1.current.add(tangent)
        w2.current.sub(tangent)
      }
    }

    ;[ball1, ball2].forEach((ball, i) => {
      const v = i === 0 ? v1.current : v2.current
      const w = i === 0 ? w1.current : w2.current

      ;['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(ball.current.position[axis]) > bounds) {
          v[axis] *= -1
          w.add(randomVector(0.02))
          ball.current.position[axis] = THREE.MathUtils.clamp(
            ball.current.position[axis],
            -bounds,
            bounds
          )
        }
      })
    })
  })

  return (
    <>
      <Sphere ref={ball1} args={[radius, 32, 32]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
      <Sphere ref={ball2} args={[radius, 32, 32]} position={[1, 0, 0]}>
        <meshStandardMaterial color="skyblue" />
      </Sphere>

      <SpinArrow target={ball1} angularVelocity={w1} color={0xff69b4} />
      <SpinArrow target={ball2} angularVelocity={w2} color={0x87ceeb} />
    </>
  )
}  // BouncingBalls01()
