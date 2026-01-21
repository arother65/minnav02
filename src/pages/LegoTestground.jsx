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
import { OrbitControls, Environment } from "@react-three/drei"
import logo from '../logo.svg'
import Footer from '../components/Footer'

// customer components for this page
import { InstancedLegoBricks } from "../components/InstancedLegoBricks"


//
export default function LegoScene() {

  // navigation 
  const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const bricks = [
    {
      id: 1,
      position: [0, 0, 0],
      width: 2,
      depth: 4,
      color: "darkred",
    },
    {
      id: 2,
      position: [0, 0.96, 0],
      width: 2,
      depth: 2,
      color: "darkblue",
    },
    {
      id: 3,
      position: [-3.5, 0, 0],
      width: 2,
      depth: 4,
      color: "darkgreen",
    },
    {
      id: 4,
      position: [-5.55, 0, 0],
      width: 2,
      depth: 4,
      color: "darkgreen",
    },
    {
      id: 5,
      position: [-5.55, 2, 0],
      width: 2,
      depth: 4,
      color: "darkgrey",
    },
    {
      id: 6,
      position: [-7.55, 2, 3],
      width: 2,
      depth: 2,
      color: "white",
    },
    {
      id: 6,
      position: [7, 1.5, 2],
      width: 2,
      depth: 2,
      color: "black",
    }
  ]

  const bricks01 = [
    {
      id: 1,
      position: [2, 0, 1.5],
      width: 2,
      depth: 2,
      color: "black",
    },
    {
      id: 2,
      position: [2.5, 0.75, 2],
      width: 2,
      depth: 2,
      color: "black",
    },
    {
      id: 3,
      position: [4, 1.5, 2.5],
      width: 2,
      depth: 2,
      color: "black",
    }
  ]

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
        <Canvas shadows camera={{ position: [6, 6, 6], fov: 75 }}
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
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 10, 5]} castShadow />

          <Environment preset="sunset" />

          <InstancedLegoBricks bricks={bricks} />
          <InstancedLegoBricks bricks={bricks01} />

          <OrbitControls />
        </Canvas>
      </main>

      <footer id='idFooterAbout' className="App-footer" >
        <Footer visible={null} />
      </footer>
    </>
  )
}  // LegoScene()
