/**
 * 
 *  Stand: 20.01.2026
 * 
 */

//*
import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Card, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from "@react-three/drei"
import logo from '../logo.svg'


//* customer components for this page
import Footer from '../components/Footer'
import { InstancedLegoBricks } from "../components/InstancedLegoBricks"

import importedBricks from '../components/lego/bricksData.json'
import { Physics, RigidBody } from '@react-three/rapier'

//*
export default function LegoScene() {

  // navigation 
  const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  // imported bricks from JSON-object
  const [bricks, setBricks] = useState(importedBricks)
  const [bricksLoaded, setBricksLoaded] = useState(false)
  useEffect(() => {
    // setBricks()
  }, [bricks])


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

  // states for the bricks
  const [wireframe, setWireframe] = useState(false);
  const [explodedBrick, setExplodedBrick] = useState(false);


  function Fragment({ position, color, velocity, noFragments }) {

    const ref = useRef()
    const matRef = useRef()
    let modNoFragments = noFragments % 2

    useFrame(() => {
      if (!ref.current) { return }
      if (!matRef.current) { return }
    })  // useFrame() 

    const [actColor] = useState(color)
    useEffect(() => {
      if (matRef.current) {
        matRef.current.color.set(actColor)
      }
      else { return }
    }, [actColor])

    return (
      <RigidBody
        position={position}
        linearVelocity={velocity}
        angularVelocity={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ]}
        gravityScale={0.5}
        restitution={0.4}
        friction={0.6}
        colliders="ball"
      >
        <mesh ref={ref} position={position} linearVelocity={velocity}>
          {(modNoFragments === 0) &&
            <sphereGeometry args={[0.08, 8, 8]}>
              {/* <meshStandardMaterial ref={matRef} color={color} /> */}
            </sphereGeometry>
          }
          {(modNoFragments > 0) &&
            <coneGeometry args={[0.05, 0.2, 3]}>
              {/* <meshStandardMaterial ref={matRef} color={color} /> */}
            </coneGeometry>
          }
          <meshStandardMaterial ref={matRef} />
        </mesh>
      </RigidBody>
    )
  }  // Fragment()

  function ExplodingBrick({ position, color, noFragments }) {

    return (
      Array.from({ length: noFragments }).map((_, i) => (

        <Fragment
          velocity={new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6, (Math.random() - 0.5) * 6)}
          position={position}
          color={color}
          noFragments={noFragments}
        />

      ))  // Array.from()
    )  // return()
  }  // ExplodingBrick()

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

  // Main component 
  return (
    <div>
      <header>
        <AppBar sx={{ backgroundColor: 'rgba(40, 45, 60, 0.75)', position: 'fixed' }}>
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
            <Tooltip title='ReactJS home' arrow>
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
        <div className='row mt-5 p-1'>
          {/* COl with buttons controlling the scene */}
          <Box orientation='col' className='m-1 mt-1 bg-dark rounded shadow'
            sx={{ width: '14%', border: '1px solid green', mt: 2 }}
          >
            Steuerelemente
            <Card className='m-1 rounded shadow'>
              <Button variant="outlined"
                color="success"
                className='m-1'
                onClick={() => {
                  if (wireframe) {
                    setWireframe(false)
                  }
                  else {
                    setWireframe(true)
                  }
                }}>
                wireframe
              </Button>
              <Button variant="outlined" color="warning" className='m-1'
                onClick={() => {
                  // color col with canvas
                  // let colCanvas = document.getElementById('idColCanvas')
                  // let className = colCanvas.className
                  // let newClassName = ''
                  // newClassName = newClassName.concat(className, ' bg-dark')
                  // colCanvas.setAttribute('className', newClassName)

                  // effect
                  setExplodedBrick(true)
                  // setBricks([])
                }}>
                explode scene
              </Button>
              <Button variant="outlined"
                color="success"
                className='m-1'
                onClick={() => {
                  if (wireframe) {
                    setWireframe(false)
                  }
                  else {
                    setWireframe(true)
                  }
                }}
                disabled>
                save scene
              </Button>
              <Button variant="outlined"
                color="success"
                className='m-1'
                onClick={() => {
                  if (wireframe) {
                    setWireframe(false)
                  }
                  else {
                    setWireframe(true)
                  }
                }}
                disabled>
                load scene
              </Button>
            </Card>
          </Box>

          {/* COl with the scene */}
          <Box orientation='col' className='m-1 mt-1 bg-dark rounded shadow'
            sx={{ width: '84%', minHeight: '200px', border: '1px solid red', mt: 2 }}
          >
            <Canvas shadows camera={{ position: [5, 5, 5], fov: 105 }}
              style={{
                width: "75vw",
                height: "90vh",
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

              {!explodedBrick &&
                <>
                  <Fade3DText text={'bricks data loaded'} />
                  <InstancedLegoBricks bricks={bricks} wireframe={wireframe} />
                  <InstancedLegoBricks bricks={bricks01} wireframe={wireframe} />
                </>
              }
              {explodedBrick &&
                <>
                  <Physics
                    gravity={[1, -5, 1]}
                  // timeStep="vary"
                  // paused={false}
                  // debug={false}
                  // colliders={false}
                  // interpolate={true}
                  // updateLoop="follow"
                  >
                    <RigidBody>
                      <ExplodingBrick position={[-5, -1, 2]} color="red" noFragments={64} />
                      <ExplodingBrick position={[-3, 1, 3]} color="blue" noFragments={8} />
                      <ExplodingBrick position={[-1, 2, 2]} color="orange" noFragments={32} />
                      <ExplodingBrick position={[1, 2, 3]} color="black" noFragments={64} />
                      <ExplodingBrick position={[1, 2, 2]} color="grey" noFragments={8} />

                      {/* <Fade3DText text={'...bricks destroyed as ordered.'} /> */}

                    </RigidBody>
                  </Physics>
                </>
              }

              <OrbitControls />
            </Canvas>
          </Box>
        </div>
      </main >

      <footer id='idFooterAbout' className="App-footer" >
        <Footer visible={null} />
      </footer>
    </div >
  )
}  // LegoScene()
