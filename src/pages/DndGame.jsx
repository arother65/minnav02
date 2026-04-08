/**
 * 
 *  Stand: 02.04.2026
 * 
 */

/** ------------------------------------------------------------------------ */
//    Imports
/** ------------------------------------------------------------------------ */
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { easing } from "maath";

import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip, Box, Card, Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

/** ------------------------------------------------------------------------ */
//    Imports for customer components
/** ------------------------------------------------------------------------ */


/** ------------------------------------------------------------------------ */
//    Local declarations / components
/** ------------------------------------------------------------------------ */

// ---------------------- Utils ----------------------
function dist2D(a, b) {
   return Math.hypot(a.x - b.x, a.z - b.z);
}

function randomFrom(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------- Game Config ----------------------
const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#f59e0b"];
const TARGET_POSITIONS = [
   { x: -3, z: -2 },
   { x: 3, z: -2 },
   { x: -2, z: 2 },
   { x: 2, z: 2 }
];

// ---------------------- Ball ----------------------
function Ball({ data, onDrop }) {

   const ref = useRef();
   const [dragging, setDragging] = useState(false);

   useFrame(() => {
      if (!ref.current) return;

      if (!dragging) {
         ref.current.position.y =
            0.5 + Math.sin(Date.now() * 0.002 + data.id) * 0.05;
      }
   });

   return (
      <mesh
         ref={ref}
         position={data.position || [0, 0.5, 0]}
         castShadow

         onPointerDown={(e) => {
            e.stopPropagation();
            e.target.setPointerCapture(e.pointerId); // 🔥 important
            setDragging(true);
         }
         }

         onPointerUp={(e) => {
            e.target.releasePointerCapture(e.pointerId);
            setDragging(false);
            onDrop(ref.current.position, data);
         }}

         onPointerMove={(e) => {
            if (!dragging || !ref.current) return;

            e.stopPropagation();
            ref.current.position.x = e.point.x;
            ref.current.position.z = e.point.z;
         }}
      >
         <sphereGeometry args={[0.45, 32, 32]} />
         <meshStandardMaterial color={data.color} />
      </mesh>
   );
}  // Ball()

// ---------------------- Target ----------------------
function Target({ color, position }) {
   const ref = useRef();

   useFrame(() => {
      if (!ref.current) return;

      const s = 1 + Math.sin(Date.now() * 0.003) * 0.05;
      ref.current.scale.set(s, s, s);
   });

   return (
      <mesh ref={ref} position={position} receiveShadow>
         <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
         <meshStandardMaterial
            color={color}
            transparent
            opacity={0.6}
         />
      </mesh>
   );
} // Target()

// main()
export default function DndGame() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   const [score, setScore] = useState(0);
   const [combo, setCombo] = useState(0);
   const [time, setTime] = useState(45);
   const [gameOver, setGameOver] = useState(false);
   const [balls, setBalls] = useState([]);
   const [dragging, setDragging] = useState(false);


   const targets = useMemo(() => {
      return TARGET_POSITIONS.map((pos, i) => ({
         ...pos,
         color: COLORS[i % COLORS.length]
      }));
   }, []);

   useEffect(() => {
      startGame();
   }, []);

   useEffect(() => {
      if (time <= 0) {
         setGameOver(true);
         return;
      }
      const t = setInterval(() => setTime((v) => v - 1), 1000);
      return () => clearInterval(t);
   }, [time]);

   const spawnBalls = () => {
      return Array.from({ length: 6 }).map((_, i) => ({
         id: i + Math.random(),
         color: randomFrom(COLORS),
         position: [Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2]
      }));
   };

   const startGame = () => {
      setScore(0);
      setCombo(0);
      setTime(45);
      setGameOver(false);
      setBalls(spawnBalls());
   };

   const handleDrop = (pos, ball) => {
      if (gameOver) return;

      const target = targets.find((t) => t.color === ball.color);
      if (!target) {
         console.warn("No target found for color:", ball.color);
         return; // 🛑 prevent crash
      }

      const d = dist2D(pos, target);

      if (d < 1) {
         // success
         setScore((s) => s + 10 + combo * 2);
         setCombo((c) => c + 1);
         setBalls((prev) => prev.filter((b) => b.id !== ball.id));

         // respawn new ball
         setTimeout(() => {
            setBalls((prev) => [
               ...prev,
               {
                  id: Math.random(),
                  color: randomFrom(COLORS),
                  position: [Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2]
               }
            ]);
         }, 300);
      } else {
         // fail
         setCombo(0);
      }
   };

   // console.log("targets", targets);
   // console.log("balls", balls);

   //
   return (
      <>
         <header>
            <AppBar
               /* className='App-bar' */ // no effect
               sx={{ backgroundColor: 'rgba(40, 45, 60, 0.75)', position: 'fixed' }}
            >
               <Toolbar>
                  <Tooltip title='Home' arrow sx={{}}>
                     <IconButton
                        id="idBtnNavHome"
                        size="medium"
                        edge="start"
                        aria-label="nav to home"
                        sx={{ mr: 2 }}
                        onClick={() => { fnNavigate('/') }}
                     >
                        <HomeIcon sx={{ color: 'green' }} />
                     </IconButton>
                  </Tooltip>
               </Toolbar>
            </AppBar>
         </header>

         <main className="App-main">
            <div className="row mt-5">

               {/* COl with buttons controlling the scene */}
               <Box orientation='col' className='m-1 mt-2 bg-dark rounded shadow'
                  sx={{ width: '14%', border: '1px solid green', mt: 2 }}
               >
                  Steuerelemente
                  <Card className='m-1 rounded shadow'>
                     <Button variant="outlined"
                        color="success"
                        className='m-1'
                        onClick={() => {

                        }}>
                        wireframe
                     </Button>
                     <Button variant="outlined" color="warning" className='m-1'
                        onClick={() => {
                        }}>
                        explode scene
                     </Button>
                  </Card>
               </Box>

               {/* COl with the scene */}
               <Box orientation='col' className='m-1 mt-2 bg-dark-subtle rounded'
                  sx={{ width: '84%', height: '90vh', border: '1px solid red', mt: 2 }}
               >
                  {/* HUD */}
                  <div style={{ position: "absolute", zIndex: 10, padding: 20, color: "white" }}>
                     <h2>Score: {score}</h2>
                     <h3>Combo: {combo}</h3>
                     <h3>Time: {time}s</h3>

                     {gameOver && (
                        <div>
                           <h1>🏆 Game Over</h1>
                           <button onClick={startGame}>Restart</button>
                        </div>
                     )}
                  </div>

                  <div style={{ width: "100%", height: "100vh" }}>
                     <Canvas shadows camera={{ position: [6, 6, 6], fov: 50 }}>
                        <ambientLight intensity={0.4} />
                        <directionalLight
                           position={[5, 10, 5]}
                           intensity={1.5}
                           castShadow
                           shadow-mapSize-width={1024}
                           shadow-mapSize-height={1024}
                        />

                        {/* <Environment preset="sunset" /> */}

                        {/* Ground */}
                        <mesh
                           rotation={[-Math.PI / 2, 0, 0]}
                           receiveShadow
                           onPointerMove={(e) => e.stopPropagation()} // important
                        >
                           <planeGeometry args={[20, 20]} />
                           <meshStandardMaterial color="#1e293b" />
                        </mesh>

                        {/* Targets */}
                        {targets.map((t, i) => (
                           <Target key={i} color={t.color} position={[t.x, 0.1, t.z]} />
                        ))}

                        {/* Balls */}
                        {balls.map((b) => (
                           <Ball key={b.id} data={b} onDrop={handleDrop} />
                        ))}

                        {/* <OrbitControls enablePan={false} /> */}
                        {/* <OrbitControls enablePan={true} /> */}
                        <OrbitControls enabled={!dragging} />

                        {/* <axesHelper args={[5]} /> */}
                        {/* <gridHelper args={[10, 10]} /> */}
                     </Canvas>
                  </div>

               </Box>
            </div>
         </main>
      </>
   )
}  // DndGame()