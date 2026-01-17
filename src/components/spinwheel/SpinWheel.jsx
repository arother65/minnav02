/**
 * SpinWheel.jsx 
 */

import { useState, useRef } from "react"
import { Text } from "@react-three/drei"
import { Html } from "@react-three/drei";

//
const SEGMENTS = [
   { label: "Prize 1", color: "#e74c3c" },
   { label: "Prize 2", color: "#f1c40f" },
   { label: "Prize 3", color: "#2ecc71" },
   { label: "Prize 4", color: "#3498db" },
   { label: "Prize 5", color: "#9b59b6" },
   { label: "Prize 6", color: "#e67e22" }
]

// const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS.length;
const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS.length;


// HTML Overlay Component
function HtmlOverlay({ spin, winner }) {
   return (
      <Html>
         <div
            style={{
               position: "static",
               top: 1,
               left: 150,
               right: 0,
               color: "black",
               fontFamily: "sans-serif",
               backgroundColor: "lightgrey",
               textAlign: "center"
            }}
         >
            <button className="btn btn-secondary" onClick={spin} style={{ fontSize: 16 }}>
               SPIN 🎡
            </button>

            {winner && (
               <p style={{ marginTop: 1 }}>
                  Winner: <h6>{winner}</h6>
               </p>
            )}
         </div>
         <div>
            <p>text </p>
         </div>
      </Html>
   )
}  // HtmlOverlay() 

// Wheel Component
function Wheel({ wheelRef }) {
   return (
      <group ref={wheelRef} rotation-x={-Math.PI / 2}>

         {SEGMENTS.map((segment, i) => {
            const angle = i * SEGMENT_ANGLE;

            return (
               <group key={i} rotation-z={angle}>
                  {/* Segment */}
                  <mesh rotation-z={SEGMENT_ANGLE / 2}>
                     <cylinderGeometry
                        args={[2, 2, 0.3, 64, 1, false, 0, SEGMENT_ANGLE]}
                     />
                     <meshStandardMaterial color={segment.color} />
                  </mesh>

                  {/* Text */}
                  <Text
                     position={[1.4, 0, 0.2]}
                     rotation={[Math.PI / 2, 0, SEGMENT_ANGLE / 2]}

                     fontSize={0.25}
                     // font="/fonts/Roboto-Regular.ttf"
                     color="black"
                     anchorX="center"
                     anchorY="middle"
                  >
                     {segment.label}
                  </Text>
               </group>
            );
         })}
      </group>
   );
}  // Wheel()

// SpinWheel Component  
export default function SpinWheel() {

   const wheelRef = useRef();
   const [winner, setWinner] = useState(null);
   const spinning = useRef(false);

   const spin = () => {
      if (spinning.current) return;

      spinning.current = true;

      const spins = Math.random() * 6 + 6; // 6–12 spins
      const targetRotation = spins * 2 * Math.PI;
      const duration = 3500;
      const start = performance.now();

      const animate = (time) => {
         const progress = Math.min((time - start) / duration, 1);
         const easeOut = 1 - Math.pow(1 - progress, 3);

         wheelRef.current.rotation.z = targetRotation * easeOut;

         if (progress < 1) {
            requestAnimationFrame(animate);

         } else {
            spinning.current = false;

            // 🎯 WINNER CALCULATION
            const rotation =
               wheelRef.current.rotation.z % (2 * Math.PI);

            const normalized =
               (2 * Math.PI - rotation) % (2 * Math.PI);

            const index = Math.floor(
               normalized / SEGMENT_ANGLE
            );

            setWinner(SEGMENTS[index].label);
         }
      }
      requestAnimationFrame(animate);
   }

   return (
      <>
         <Wheel wheelRef={wheelRef} />

         {/* Pointer */}
         <mesh position={[0.01, 2.09, -0.1]}>
            <coneGeometry args={[0.15, 0.4, 32]} />
            <meshStandardMaterial color="black" />
         </mesh>

         {/* HTML overlay */}
         <HtmlOverlay spin={spin} winner={winner} />
      </>
   )  // return()
}  // SpinWheel()
