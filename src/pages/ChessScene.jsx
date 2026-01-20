/**
 * 
 *  Stand: 20.01.2026
 * 
 */


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import logo from '../logo.svg'
import Pawn from "../components/chess/Pawn"
import King from "../components/chess/King"

import Board from "../components/chess/Board"

import Footer from '../components/Footer'

//
export default function ChessScene() {

  // navigation 
  const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

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
            <Tooltip title='ReactJS home' arrow >
              <nav>
                <a href="https://reactnative.dev/" rel='noreferrer' target='_blank'>
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
              </nav>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </header>

      <main className="App-main">
        <Canvas shadows camera={{ position: [6, 6, 6], fov: 45 }}
          style={{
            width: "90vw",
            height: "90vh",
            display: "block"
          }}
          onPointerMissed={() => {
            setSelected(null);
            setHovered(null);
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} castShadow />

          <Board />
          <Pawn position={[0, 0.1, 1]} color="#f5f5f5" />
          <Pawn position={[0.75, 0.1, 1]} color="#f5f5f5" />
          <King position={[1.99, 0.1, 1]} color="#f5f5f5" />

          <Pawn position={[-0.5, 0.1, 2]} color="#000000" />
          <King position={[5, 0.1, 0]} color="#000000" />

          <OrbitControls />
        </Canvas>
      </main>

      <footer id='idFooterAbout' className="App-footer" >
        <Footer visible={null} />
      </footer>
    </>
  )
}
