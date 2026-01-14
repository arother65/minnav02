/**
 *  https://www.npmjs.com/package/@react-three/fiber
 */

// imports 
import { Canvas, useFrame } from '@react-three/fiber'
import { Alert, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { useEffect, useState, useRef } from 'react'

import { OrbitControls } from "@react-three/drei"
import Dice from "./Dice3D.jsx"
import { RigidBody } from "@react-three/rapier"
import { Physics } from "@react-three/rapier"
import { RoundedBox } from "@react-three/drei"


//
export default function ThreeDTest() {

   const cubes = [
      { position: [0, 0, 0], color: 'red' },
      { position: [2, 0, 0], color: 'green' },
      { position: [-2, 0, 0], color: 'blue' },
      { position: [0, 2, 0], color: 'orange' },
   ]

   const cubes02 = [
      { position: [0, 0, 0], color: 'red', speed: 0.5 },
      { position: [2, 0, 0], color: 'green', speed: 1 },
      { position: [-2, 0, 0], color: 'blue', speed: 1.5 },
      { position: [-4, 0, 0], color: 'yellow', speed: 2.0 },
      { position: [-5, 0, 0], color: 'darkred', speed: 2.5 },
      { position: [-6, 0, 0], color: 'darkgreen', speed: 3.0 },
   ]

   /*    const cubes03 = [
         { position: [0, 0, 0], color: 'red', speed: 1 },
         { position: [0.5, 0, 0], color: 'green', speed: 1 },
         { position: [-1, 0, 0], color: 'blue', speed: 1 },
         { position: [-1.5, 0, 0], color: 'yellow', speed: 1 },
         { position: [-2, 0, 0], color: 'darkred', speed: 1 },
         { position: [-2.5, 0, 0], color: 'darkgreen', speed: 1 },
      ]
    */
   const cubes03Init = [
      { position: [0, 0, 0], color: 'red', speed: 1 },
      // { position: [0.5, 0, 0], color: 'green', speed: 1 },
   ]

   // push new object data to cubes03
   // cubes03.push({ position: [-2.5, 0, 0], color: 'darkgreen', speed: 1 })

   function Cube({ position, color }) {
      return (
         <mesh position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
         </mesh>
      )
   }  // Cube()

   function Cube02({ position, color, speed }) {
      const ref = useRef()

      useFrame((_, delta) => {
         ref.current.rotation.y += speed * delta
         ref.current.rotation.x += speed * delta
      })

      return (
         <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
         </mesh>
      )
   }  // Cube02

   const [cubes03, setNoCubes] = useState(cubes03Init)
   useEffect(() => {
      console.log('new data for cubes03', cubes03)
   }, [cubes03])  // useEffect()

   // Steuerung der Oberfläche
   const [visible, setVisible] = useState(true)
   useEffect(() => {
      console.log('new data for visible', visible)
   }, [visible])  // useEffect()

   // using Switch-component
   const [enabled, setEnabled] = useState(true);

   // handling  a TABS component
   // const [valueTab, setValueTab] = useState('one');
   // const handleChangeTab = (event, newValue) => {
   //    setValueTab(newValue)
   // }  // 

   const [value, setValue] = useState('1');
   const handleChangeTabList = (event, newValue) => {
      setValue(newValue)
   }  // 

   // for 3D cubes 
   const [rolling, setRolling] = useState(false);
   const [results, setResults] = useState([]);


   // 
   return (
      <>
         <div className='row m-1 bg-dark border border-1 border-success rounded shadow'>
            <div className='col m-1 bg-dark-subtle border border-1 border-success rounded shadow'>
               {/*                <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }} style={{ height: "250px" }}>
                  <ambientLight intensity={0.75} />
                  <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

                  {/* <Physics gravity={[0, -9.81, 0]}> */}
               {/* <RidigBody></RidigBody> */}

               {/* <Dice position={[0, 6, 0]} rolling={rolling} onResult={(v) => setResults((r) => [...r, v])} /> */}

               {/* </Physics> */}

               {/* <OrbitControls enablePan={false} /> */}
               {/* </Canvas> */}

               <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>  {/*  fov: Nähe zum Betrachter */}
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 8, 5]} intensity={1} />

                  {/* ✅ Physics MUST wrap Dice */}
                  <Physics gravity={[0, -9.81, 0]}>
                     {/* Floor */}
                     {/*                      <RigidBody type="fixed" colliders="cuboid">
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                           <planeGeometry args={[20, 20]} />
                           <meshStandardMaterial color="#777" />
                        </mesh>
                     </RigidBody> */}

                     {/* Dice */}
                     {/* <Dice position={[0, 5, 0]} rolling={rolling} /> */}
                     {/* <Dice position={[0, 7, 0]} /> */}

                     <RoundedBox
                        position={[0, 0, 0]}  // bottom-right, vertical, bottom-left. [0,5,0] = out of sight
                        args={[2.5, 2.5, 2.5]}      // size of the object. [1,1,1] = small
                        radius={0.25}          // edge roundness
                        smoothness={8}        // geometry quality
                        castShadow
                     >
                        <meshStandardMaterial color="lightgreen" />
                     </RoundedBox>
                  </Physics>

                  <Physics>

                     {/* <RigidBody type="fixed" position={[0, 3, 2]}>; type="dynamic" bewegt sich auf der Vertikalen von oben aus dem Bild  */}
                     {/* RigidBody owns the position, not RoundedBox */}
                     {/*                      <RigidBody type="fixed" position={[0, 2, 1]}>
                        <RoundedBox args={[2, 2, 2]}>
                           <meshStandardMaterial color="red" />
                        </RoundedBox>
                     </RigidBody> */}

                     {/*                      <RigidBody type="fixed" position={[-2, 2, 1]}>
                        <RoundedBox args={[2, 2, 2]}>
                           <meshStandardMaterial color="blue" />
                        </RoundedBox>
                     </RigidBody> */}

                     <RigidBody type="fixed" position={[-3.95, 2, 1]}>
                        <RoundedBox args={[2, 2, 2]}>
                           <meshStandardMaterial color="lightblue" roughness={0.95} metalness={0.5} emissive="blue" emissiveIntensity={0.5}
                              transparent
                              opacity={0.25}
                              wireframe={true}
                           />
                        </RoundedBox>
                     </RigidBody>

                     {/*                      <RigidBody type="fixed" position={[0, 0, 0]}>
                        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} >
                           <planeGeometry args={[10, 10]} />
                           <meshStandardMaterial color="lightyellow" />
                        </mesh>
                     </RigidBody> */}

                  </Physics>

                  <OrbitControls />
               </Canvas>
            </div>
         </div>

         {/* tabs  */}
         <div className='row m-2 bg-light border border-2 border-success rounded'>
            <TabContext value={value}>
               <TabList onChange={handleChangeTabList} aria-label="lab API tabs example">
                  <Tab label="Rotating cube" value="1" />
                  <Tab label="Multiple cubes" value="2" />
                  <Tab label="Rolling dice" value="3" />
               </TabList>

               <TabPanel className='bg-secondary-subtle text-black' value="1">
                  <div className='col'>
                     <p className='text-dark'>Canvas in bs-row</p>
                     <Button variant="outlined" size="medium"
                        onClick={(e) => {

                           // clone array "cubes03"
                           let newCubeArray = cubes03.filter(() => {
                              return true
                           })

                           let newLength = newCubeArray.push(newCubeArray[0])
                           newLength--

                           let newX = newCubeArray[newLength].position[0]
                           newX++
                           newCubeArray[newLength].position[0] = newX
                           newCubeArray[newLength].color = 'darkred'
                           newCubeArray[newLength].speed = 1

                           // trotz Änderung des aktuellen DS newCubeArray[newLength] werden ALLE properties im Array geändert

                           setNoCubes(newCubeArray)

                           // setNoCubes(cubes03 => ({
                           //     ...cubes03,
                           //    position: position,
                           //    color: 'red'
                           // }))
                        }}>
                        add cube
                     </Button>
                     <FormControlLabel
                        id='idFormControl'
                        className='m-1 bg-warning rounded shadow'
                        control={
                           <Switch
                              className='m-1'
                              checked={enabled}
                              // color="secondary"
                              color="error"
                              onChange={() => {
                                 let formControl = document.getElementById('idFormControl')
                                 let formControlClass = formControl.getAttribute('class')

                                 if (enabled) {
                                    setEnabled(false)
                                    setVisible(false)

                                    // set new background
                                    formControlClass = formControlClass.replace('bg-warning', 'bg-dark')
                                    formControl.setAttribute('class', formControlClass)
                                 } else {
                                    setEnabled(true)
                                    setVisible(true)
                                    // set new background
                                    formControlClass = formControlClass.replace('bg-dark', 'bg-warning')
                                    formControl.setAttribute('class', formControlClass)
                                 }
                              }}
                              sx={{}}
                           />
                        }
                        label={enabled ? "disable column" : "enable column"}
                        labelPlacement="end"
                     />
                  </div>

                  {visible &&
                     <div className='col m-1 bg-light border border-2 rounded shadow' width='50%'>
                        {/* param fov changes object size  */}
                        <Canvas camera={{ position: [5, 5, 5], fov: 15 }}>
                           <ambientLight intensity={0.5} />
                           <directionalLight position={[5, 5, 5]} />

                           {cubes03.map((cube, index) => (
                              <Cube02 key={index} {...cube} />
                           ))}
                        </Canvas>
                     </div>
                  }
                  {!visible &&
                     <div className='col m-1 bg-light border border-2 rounded shadow' width='50%'>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                           Column switched invisible. Refresh to renew UI.
                        </Alert>
                     </div>
                  }
               </TabPanel>

               <TabPanel className='bg-secondary' value="2">
                  <div className='row m-2 bg-light border border-2 border-success rounded shadow'>
                     <p className='text-dark'>Canvas in bs-row</p>
                     <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} />

                        {cubes02.map((cube, index) => (
                           // <div className='col border border-1'>
                           <Cube02 key={index} {...cube} />
                           // </div>
                        ))}

                        {/*             <mesh visible userData={{ hello: 'world' }} position={[1, 0, 0]}>
               <sphereGeometry args={[2, 2, 2]} />
               <meshStandardMaterial color="green" />
            </mesh> */}
                     </Canvas>
                  </div>
               </TabPanel>

               <TabPanel className='bg-dark' value="3">
                  <div className='col m-1 bg-dark border border-1 border-success rounded shadow'>
                     <Button className='m-2' variant="outlined" size="medium" onClick={() => setRolling((r) => !r)}>
                        Roll
                     </Button>
                     {/* <div style={{ position: "absolute", top: 20, left: 20 }}> */}

                     Results: {results.join(", ")}
                  </div>

                  {/*  Würfel */}
                  <div className='col m-1 bg-dark border border-1 border-success rounded shadow'>
                     <Canvas
                        shadows
                        camera={{ position: [3, 3, 3], fov: 50 }}
                        style={{ height: "250px" }}
                     >
                        <ambientLight intensity={0.4} />
                        <directionalLight
                           position={[5, 5, 5]}
                           intensity={1}
                           castShadow
                        />
                        <Dice rolling={rolling} />
                        <OrbitControls enablePan={false} />
                     </Canvas>
                  </div>
               </TabPanel>
            </TabContext>
         </div >  {/* row */}
      </>
   )  // return()
}  // ThreeDTest()