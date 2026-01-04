/*
*  Stand: 03.01.2026
*
* Testet u.A: npm install three @react-three/fiber
*/

import { Avatar, Box } from "@mui/material"
import { useState } from "react"
import  "../components/Dice.css"  //?



// 
export default function DiceAvatar({ size = 64 }) {
   const [rolling, setRolling] = useState(false);
   const [value, setValue] = useState(1);

   const roll = () => {
      if (rolling) return;

      setRolling(true);
      const next = Math.floor(Math.random() * 6) + 1;
      setValue(next);
      setTimeout(() => setRolling(false), 2000);
   }

   // 
   return (
      <Box
         onClick={roll}
         sx={{
            width: size,
            height: size,
            perspective: '600px',
            cursor: "pointer",
         }}
      >
         <Avatar
            className={`dice ${rolling ? "roll" : `show-${value}`}`}
            sx={{
               width: "100%",
               height: "100%",
               bgcolor: "#fff",
            }}
         >
            <Box className="face front">1</Box>
            <Box className="face back">6</Box>
            <Box className="face right">3</Box>
            <Box className="face left">4</Box>
            <Box className="face top">5</Box>
            <Box className="face bottom">2</Box>
         </Avatar>
      </Box>
   )  // return()
}  // DiceAvatar()