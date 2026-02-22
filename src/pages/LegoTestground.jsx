/**
 * 
 *  Stand: 22.02.2026
 * 
 */

//*
import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Card, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { Canvas } from "@react-three/fiber"
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from "@react-three/drei"
import logo from '../logo.svg'

//* customer components for this page
import Footer from '../components/Footer'
import { InstancedLegoBricks } from "../components/InstancedLegoBricks"

import importedBricks from '../components/lego/bricksData.json'
import { Physics, RigidBody } from '@react-three/rapier'
import { velocity } from 'three/src/nodes/accessors/VelocityNode.js'

//*
export default function LegoScene() {

  // navigation 
  const fnNavigate = useNavigate()  // creates a function of type NavigateFunction

  // imported bricks from JSON-object
  const [bricks, setBricks] = useState(importedBricks)

  // testdata for bricks, if no data is imported from JSON-object 
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
                  // trigger effect
                  setExplodedBrick(true)
                  setWireframe(false)  //? reset wireframe to false, if it was active, to show the explosion better
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
            // onPointerMissed={() => {
            //   setSelected(null);
            //   setHovered(null);
            // }}
            >
              <ambientLight intensity={2} />
              <directionalLight position={[5, 5, 5]} castShadow />
              <Physics gravity={explodedBrick ? [1, -5, 1] : [0, -9.81, 0]}
                interpolate={false}
                key={explodedBrick ? 'exploded' : 'normal'}  //? forces re-rendering of physics when explodedBrick changes
              >
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
                  </>}

                {explodedBrick &&
                  <>
                    <ExplodingBrick position={[-5, -1, 2]} color="red" noFragments={64} />
                    <ExplodingBrick position={[-3, 1, 3]} color="blue" noFragments={8} />
                    <ExplodingBrick position={[-1, 2, 2]} color="orange" noFragments={32} />
                    <ExplodingBrick position={[1, 2, 3]} color="black" noFragments={64} />
                    <ExplodingBrick position={[1, 2, 2]} color="grey" noFragments={8} />

                    {/* <Fade3DText text={'...bricks destroyed as ordered.'} /> */}
                  </>}
              </Physics>

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

//* functions used in main component 

function Fade3DText({ text, delay = 5 }) {

  const refText = useRef()

  useFrame((_, delta) => {
    if (refText.current) {
      // refText.current._defaultMaterial.opacity = Math.max(0, refText.current_defaultMaterial.opacity - delta * 0.5)
      refText.current.material.opacity = Math.max(0, refText.current.material.opacity - delta * 0.5)
    }
  })

  useEffect(() => {
    if (refText.current) {
      setTimeout(() => {
        refText.current.material.transparent = true
      }, delay * 1000)
    }
  }, [delay])

  return (
    <Text
      ref={refText}
      color="white"
      position={[0, 4, 0]}
      rotation={[0, 0.75, 0]}>
      {text}
    </Text>
  )
}  // Fade3DText()

function ExplodingBrick({ position = [0, 0, 0], color = "red", noFragments = 64 }) {

  const velocity = useMemo(() => [
    (Math.random() - 0.5) * 6,
    Math.random() * 6,
    (Math.random() - 0.5) * 6,
  ], [])

  return (
    Array.from({ length: noFragments }).map((_, i) => (
      <Fragment
        key={i}  // ✅ REQUIRED: Unique key for each fragment
        // velocity={new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 6, (Math.random() - 0.5) * 6)}
        velocity={velocity}
        position={position}
        color={color}
        noFragments={noFragments}
      />
    ))  // Array.from()
  )  // return()
}  // ExplodingBrick() uses Fragment()

function Fragment({ position = [0, 0, 0], color, velocity, noFragments = 32 }) {

  let modNoFragments = noFragments % 2

  const angular = useMemo(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  ], [])

  return (
    <RigidBody
      position={position}
      linearVelocity={velocity}
      angularVelocity={angular}
      gravityScale={0.5}
      restitution={0.4}
      friction={0.6}
    >
      {modNoFragments === 0 ? (
        <mesh>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ) : (
        <mesh>
          <coneGeometry args={[0.05, 0.2, 3]} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}
    </RigidBody>
  )
}  // Fragment()
