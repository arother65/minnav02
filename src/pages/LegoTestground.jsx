/**
 * 
 *  Stand: 20.01.2026
 * 
 */


import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Card, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { Canvas } from "@react-three/fiber"
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from "@react-three/drei"
import logo from '../logo.svg'
import Footer from '../components/Footer'

// customer components for this page
import { InstancedLegoBricks } from "../components/InstancedLegoBricks"

import importedBricks from '../components/lego/bricksData.json'

//
export default function LegoScene() {

  // navigation 
  const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  // imported bricks from JSON-object
  const [bricks, setBricks] = useState(importedBricks)

  const [bricksLoaded, setBricksLoaded] = useState(false)

  const checkData = () => {
    if (bricks) {
      // setBricks(importedBricks)
      setBricksLoaded(true)
    } else {
      setBricksLoaded(false)
    }
  }  // checkData()

  const bricks01 = [
    {
      id: 1,
      position: [3, 0, 0.5],
      width: 1,
      depth: 1,
      color: "goldenrod",
    },
    {
      id: 2,
      position: [2.5, 0, 1.5],
      width: 2,
      depth: 1,
      color: "#ffa07a",
    },
    {
      id: 3,
      position: [4, 0, 2.5],
      width: 2,
      depth: 2,
      color: "#8b0000",
    }
  ]

  const [wireframe, setWireframe] = useState(false);

  //
  function Fade3DText({ text, delay = 5 }) {
    const ref = useRef()

    useFrame((_, delta) => {
      if (!ref.current) return
      ref.current.material.opacity = Math.max(0, ref.current.material.opacity - delta * 0.5)
    })

    useEffect(() => {
      setTimeout(() => {
        ref.current.material.transparent = true
      }, delay * 1000)
    }, [delay])

    return (
      <Text 
        ref={ref} 
        color="white" 
        position={[0, 4, 0]}
        rotation={[0, 0.75, 0]}>
        {text}
      </Text>
    )
  }  // Fade3DText()

  //
  return (
    // <div onLoad={checkData()}>
    <div>
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

        <div className='col m-1 text-bg-dark w-25 h-100 rounded shadow'>
          Steuerelemente
          <Card>
            <Button variant="outlined" className='m-1' onClick={() => {
              if (wireframe) {
                setWireframe(false)
              }
              else {
                setWireframe(true)
              }
            }}>
              wireframe
            </Button>
            <Button variant="outlined" className='m-1' onClick={() => {

            }}>
              explode scene
            </Button>
          </Card>
        </div>
        {/* <div> </div> */}

        <Canvas shadows camera={{ position: [5, 5, 5], fov: 105 }}
          style={{
            width: "95vw",
            height: "95vh",
            display: "block"
          }}
          onPointerMissed={() => {
            setSelected(null);
            setHovered(null);
          }}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} castShadow />

          <Environment preset="sunset" />

          {!bricks &&
            <Text
              position={[-3.5, 0, -4]}
              rotation={[0, 0, 0]}
              fontSize={1}
              color="red"
              anchorX="center"
              anchorY="middle"
            >
              No bricks data available
            </Text>
          }
          {bricks &&
            <>
              <Fade3DText text={'bricks data loaded'} />
              <InstancedLegoBricks bricks={bricks} wireframe={wireframe} />
            </>
          }

          <InstancedLegoBricks bricks={bricks01} wireframe={wireframe} />

          <OrbitControls />
        </Canvas>

      </main>

      <footer id='idFooterAbout' className="App-footer" >
        <Footer visible={null} />
      </footer>
    </div>
  )
}  // LegoScene()
