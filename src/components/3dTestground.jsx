/**
 *  https://www.npmjs.com/package/@react-three/fiber
 */

// imports 
import { useEffect, useState, useRef } from 'react'

//
import { Alert, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Tab from '@mui/material/Tab'
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material'
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined'

//
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// @react-three with 3D geometric objects
import { Canvas } from '@react-three/fiber' // 
import { useFrame } from '@react-three/fiber' // rotating objects
import { OrbitControls, Stars } from "@react-three/drei"
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier"
import { RoundedBox } from "@react-three/drei"

// customer components
import Dice from "./Dice3D.jsx"
import { Explosions, ExplodingWall } from '../components/Explosions'
import Pyramid3D from '../components/Pyramid3D'


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

   // for handling Accordion components
   const [expanded, setExpanded] = useState(true)
   const [expanded00, setExpanded00] = useState(false)

   //* Event handler for <Accordion />
   const handleExpansion = (e) => {
      // setExpanded((prevExpanded) => !prevExpanded);  // ok
      // setExpanded((expanded) => !expanded);  // ok      

      if (e.currentTarget.id === 'idAccordion00') {
         // setExpanded00((prevExpanded) => !prevExpanded)  //?
         setExpanded00((expanded00) => !expanded00)
      }

      if (e.currentTarget.id === 'idAccordion01') {
         // setExpanded((prevExpanded) => !prevExpanded)  // ok
         setExpanded((expanded) => !expanded)
      }
   }  // handleExpansion()

   // for 3D cubes 
   const [rolling, setRolling] = useState(false)
   const [result, setResult] = useState(0)
   const body = useRef()

   /** function for rotating the box referenced with boxRef*/
   const [rollStateBox, setRollStateBox] = useState(true)
   function RotatingBox({ delta, position, color, args, rolling }) {
      const boxRef = useRef()

      useFrame((_, delta) => {
         if (rolling && boxRef.current) {
            boxRef.current.rotation.x += delta
            boxRef.current.rotation.y += delta
            boxRef.current.rotation.z += delta
         }
      })

      // 
      return (
         <mesh
            ref={boxRef}
            position={position}
            onClick={(event) => alert('event: ', event)}
         >
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} />
         </mesh>
      )
   }  // RotatingBox()

   // function FindRotatingBox() {
   //    const { scene } = useThree();

   //    const box = scene.getObjectByName("idRotatingBox01");
   //    console.log(box);

   //    return null;
   // }  // FindRotatingBox()

   function Ground() {
      return (
         <RigidBody type="fixed" colliders={false}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
               <planeGeometry args={[20, 20]} />
               <meshStandardMaterial color="green" />
            </mesh>
            <CuboidCollider args={[10, 0.1, 10]} />
         </RigidBody>
      )
   }  // Ground()

   // 
   return (
      <>
         {/* a simple pyramid */}
         <div className='row m-2 bg-dark-subtle rounded shadow' style={{ width: '98vw', height: '350px' }}>
            <Box orientation='col'
               className='m-1 bg-dark rounded shadow'
               sx={{ width: '23%', border: '1px solid red' }}>
               <p>Pyramid on Ground...</p>
            </Box>

            <Pyramid3D />
         </div>

         {/* Exploding balls */}
         <div className='row m-2 bg-dark-subtle rounded shadow' style={{ width: '98vw', height: '300px' }}>
            <Box orientation='col'
               className='m-1 bg-dark rounded shadow'
               sx={{ width: '23%', border: '1px solid red' }}>
               <p>exploding balls, click on one...</p>
            </Box>

            <Explosions />
         </div>
         {/* <ExplodingWall /> */}

         {/* row with a few 3D components */}
         <div className='row m-2 bg-dark-subtle rounded shadow' style={{ width: '98vw', height: '300px' }}>
            <Box orientation='col'
               className='m-1 bg-dark rounded shadow'
               sx={{ width: '23%', border: '1px solid red' }}>
               <p>In Box-Component: Physics, RigidBody, RoundedBox</p>
            </Box>
            <Box orientation='col'
               className='m-1 bg-dark-subtle rounded shadow'
               sx={{ width: '75%', border: '1px solid red' }}>
               <Canvas camera={{ position: [6, 6, 6], fov: 50 }} shadows>  {/*  fov: Nähe zum Betrachter */}
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 8, 5]} intensity={1} />

                  {/* ✅ Physics MUST wrap Dice */}
                  <Physics gravity={[0, -9.81, 0]}>
                     {/* Dice */}
                     {/* <Dice position={[0, 5, 0]} rolling={rolling} onResult={(value) => console.log("Dice rolled:", value)} /> */}
                  </Physics>

                  <Physics>
                     <RigidBody type="fixed" position={[-3.95, 1, 1]}
                        ref={body}
                        canSleep
                        onSleep={() => {
                           alert('onSleep()')
                           //    // 1. Get world rotation of dice
                           //    const q = new THREE.Quaternion();
                           //    body.current.rotation().toQuaternion(q);

                           //    // 2. Compute top face
                           //    const value = readDiceValue(q);

                           //    // 3. Trigger callback
                           //    onResult?.(value);

                        }}
                     >
                        <RoundedBox
                           args={[2, 2, 2]}
                           radius={0.11}
                           smoothness={10}
                        >
                           <meshStandardMaterial
                              color="#f3eaf7"
                              // roughness={0.95} metalness={0.5} 
                              // emissive="blue" emissiveIntensity={0.5}
                              // transparent
                              opacity={0.95}
                              wireframe={false}
                              envMapIntensity={0.6}
                              clearcoat={0.9}
                              clearcoatRoughness={0.05}
                              dithering
                           />
                        </RoundedBox>

                        <RigidBody type="fixed" position={[-3.95, 1, 1]}
                           ref={body}
                           canSleep
                           onSleep={() => {
                              alert('onSleep()')
                              //    // 1. Get world rotation of dice
                              //    const q = new THREE.Quaternion();
                              //    body.current.rotation().toQuaternion(q);

                              //    // 2. Compute top face
                              //    const value = readDiceValue(q);

                              //    // 3. Trigger callback
                              //    onResult?.(value);

                           }}
                        >
                           <RoundedBox
                              args={[2, 2, 2]}
                              radius={0.11}
                              smoothness={10}
                           >
                              <meshStandardMaterial
                                 color="green"
                                 // roughness={0.95} metalness={0.5} 
                                 // emissive="blue" emissiveIntensity={0.5}
                                 // transparent
                                 opacity={0.95}
                                 wireframe={true}
                                 envMapIntensity={0.6}
                                 clearcoat={0.9}
                                 clearcoatRoughness={0.05}
                                 dithering
                              />
                           </RoundedBox>
                        </RigidBody>
                     </RigidBody>
                  </Physics>

                  <OrbitControls />
               </Canvas>
            </Box>
         </div>

         {/* </div row> */}
         <div className='row m-2 bg-dark-subtle rounded shadow' style={{ width: '98vw', height: '300px' }}>
            <Box orientation='col'
               className='m-1 bg-dark rounded shadow'
               sx={{ width: '23%', border: '1px solid red' }}>
               Some Geometric-Objects
            </Box>
            <Box orientation='col'
               className='m-1 bg-dark-subtle rounded shadow'
               sx={{ width: '75%', border: '1px solid red' }}>

               <Canvas camera={{ position: [6, 6, 6], fov: 50 }} shadows>  {/*  fov: Nähe zum Betrachter */}
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
                     <Dice position={[0, 5, 0]} rolling={rolling} onResult={(value) => console.log("Dice rolled:", value)} />
                     {/* <Dice position={[0, 7, 0]} /> */}

                     {/*                   <RoundedBox
                     position={[0, 0, 0]}  // bottom-right, vertical, bottom-left. [0,5,0] = out of sight
                     args={[2.5, 2.5, 2.5]}      // size of the object. [1,1,1] = small
                     radius={0.25}          // edge roundness
                     smoothness={8}        // geometry quality
                     castShadow
                  >
                     <meshStandardMaterial color="lightgreen" />
                  </RoundedBox> */}
                  </Physics>

                  <Physics>
                     {/* type='dynamic' bewegt Objekte auf der Vertikalen*/}
                     <RigidBody type="fixed" position={[-3, 2, 1]}
                        ref={body}
                        canSleep
                        onSleep={() => {
                           // alert('onSleep()')
                           //    // 1. Get world rotation of dice
                           //    const q = new THREE.Quaternion();
                           //    body.current.rotation().toQuaternion(q);

                           //    // 2. Compute top face
                           //    const value = readDiceValue(q);

                           //    // 3. Trigger callback
                           //    onResult?.(value);

                        }}
                     >
                        <RoundedBox
                           args={[2, 2, 2]}
                           radius={0.11}
                           smoothness={10}
                        >
                           <meshStandardMaterial
                              color="#f3ead7"
                              // roughness={0.95} metalness={0.5} 
                              // emissive="blue" emissiveIntensity={0.5}
                              // transparent
                              opacity={0.95}
                              wireframe={false}
                              envMapIntensity={0.6}
                              clearcoat={0.9}
                              clearcoatRoughness={0.05}
                              dithering
                           />
                        </RoundedBox>

                        {/* <mesh value={1} position={[5.5, 0.5, 0.5]} rotation={[0, 0, 0]}>
                        <sphereGeometry args={[1, 1, 1]} radius={Math.PI / 2} />
                        <meshStandardMaterial color="black" />
                     </mesh> */}

                        <mesh value={1} position={[1.5, 0.5, 0.5]} rotation={[-0.5, 0, 0]}>
                           <cylinderGeometry args={[0.1, 0.1, 2.5, 64]} />
                           <meshStandardMaterial color="darkred" />
                        </mesh>

                        <mesh value={1} position={[1.75, 0.5, 0.5]} rotation={[0.5, 0, 0]}>
                           <cylinderGeometry args={[0.1, 0.1, 1, 64]} />
                           <meshStandardMaterial color="darkred" />
                        </mesh>

                        <mesh value={1} position={[3, 1, 0]} rotation={[0, 0, 0]}>
                           <ringGeometry args={[0.5, 1, 64]} />
                           <meshStandardMaterial color="black" />
                        </mesh>

                        <mesh value={1} position={[3.5, -1.75, 2]} rotation={[0.1, 0.1, 0]}>
                           <circleGeometry args={[1.5, 64]} />
                           <meshStandardMaterial color="green" />
                        </mesh>

                        <mesh value={1} position={[6.5, -1.75, 2]} rotation={[0.1, 0.1, 0]}>
                           <circleGeometry args={[1.5, 64]} />
                           <meshStandardMaterial color="blue" />
                        </mesh>
                        <mesh value={1} position={[9.5, -1.75, 2]} rotation={[0.1, 0.1, 0]}>
                           <circleGeometry args={[1.5, 64]} />
                           <meshStandardMaterial color="darkred" />
                        </mesh>
                     </RigidBody>

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

                     {/* <RigidBody type="fixed" position={[0, 0, 0]}>
                        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} >
                           <planeGeometry args={[10, 10]} />
                           <meshStandardMaterial color="lightyellow" />
                        </mesh>
                     </RigidBody> */}
                  </Physics>

                  <OrbitControls />
               </Canvas>
            </Box>
         </div>

         {/* ringGeometry */}
         <div className='row m-2 bg-dark-subtle rounded shadow' style={{ width: '98vw', height: '300px' }}>
            <Box orientation='col' className='m-1 bg-dark rounded shadow' sx={{ width: '23%', border: '1px solid red' }}>
               Some ringGeometry
               <Button id={'idBtnRoll'} className='m-3' variant="outlined" size="medium"
                  onClick={() => {
                     setRollStateBox((r) => !r)

                     let btn = document.getElementById('idBtnRoll')
                     if (btn.innerText === 'STOP ROTATION') {
                        btn.innerText = 'START ROTATION'
                     }
                     else {
                        btn.innerText = 'STOP ROTATION'
                     }
                  }}>
                  Stop rotation
               </Button>
            </Box>

            <Box orientation='col' className='m-1 bg-dark-subtle rounded shadow' sx={{ width: '75%', border: '1px solid red' }}>
               <Canvas camera={{ position: [5, 5, 5], fov: 50 }}
                  dpr={[1, 2]}
                  gl={{ antialias: true }}
                  shadows>  {/*  fov: Nähe zum Betrachter */}

                  <ambientLight intensity={0.5} />
                  <directionalLight position={[3, 8, 5]} intensity={0.5} />

                  {/* <mesh value={1} position={[0, 0, 0]} rotation={[0, 0, 0]}>
                     <boxGeometry args={[1, 1, 1]} />
                     <meshStandardMaterial color="orange" />
                  </mesh>

                  <mesh value={1} position={[1, 3, 3]} rotation={[0, 0, 0]}>
                     <ringGeometry args={[0.5, 1, 64]} />
                     <meshStandardMaterial color="lightgrey" />
                  </mesh>

                  <mesh value={1} position={[1, 1, -1]} rotation={[0, 0, 0]}>
                     <ringGeometry args={[0.5, 1, 64]} />
                     <meshStandardMaterial color="lightgrey" />
                  </mesh> */}

                  <RotatingBox name='idRotatingBox01'
                     position={[1, 2, 2]}
                     args={[1, 1, 1]}
                     color="lightgreen"
                     rolling={rollStateBox} />
                  {/* <RotatingBox delta={1} position={[1.5, 2, 2]} args={[1, 1, 1]} color="lightgrey" />
                  <RotatingBox delta={1} position={[2, 2, 2]} args={[1, 1, 1]} color="lightgrey" />
                  <RotatingBox delta={1} position={[2.5, 2, 2]} args={[1, 1, 1]} color="lightgrey" />
                  <RotatingBox delta={1} position={[2.75, 2, 2]} args={[1, 1, 1]} color="grey" />
                  <RotatingBox delta={1} position={[3, 2, 2]} args={[1, 1, 1]} color="grey" />
                  <RotatingBox delta={1} position={[3.5, 2, 2]} args={[1, 1, 1]} color="darkgrey" />
                  <RotatingBox delta={1} position={[3.75, 2, 2]} args={[1, 1, 1]} color="darkred" /> */}
                  <RotatingBox name='idRotatingBox02' delta={0.1} position={[4, 2, 2]} args={[1, 1, 1]} color="red" />

                  <Dice />

                  <OrbitControls enableRotate={true} />
               </Canvas>
            </Box>
         </div>

         {/* first accordion with tabs  */}
         <Accordion className='bg-component m-3 rounded shadow' expanded={expanded00} onChange={handleExpansion}>
            <AccordionSummary
               id="idAccordion00"
               className='mt-1'
               expandIcon={<BubbleChartOutlinedIcon sx={{ color: 'black' }} />}
               aria-controls="idAccordion00"
            >
               <Typography>
                  3D components
               </Typography>
            </AccordionSummary>
            <AccordionDetails className='bg-component-top rounded'>
               <div className='row m-2 bg-light border border-2 border-success rounded'>
                  <TabContext value={value}>
                     <TabList onChange={handleChangeTabList} aria-label="lab API tabs example">
                        <Tab label="3D balls" value="1" />
                        <Tab label="xxx" value="2" />
                        <Tab label="yyy" value="3" />
                     </TabList>

                     <TabPanel className='bg-secondary-subtle text-black' value="1">
                        <Canvas camera={{ position: [6, 6, 6], fov: 50 }} shadows>  {/*  fov: Nähe zum Betrachter */}
                           <ambientLight intensity={0.4} />
                           <directionalLight position={[5, 8, 5]} intensity={1} />

                           <mesh value={1} position={[1, 1, 0]} rotation={[0, 0, 0]}>
                              {/* <circleGeometry args={[1.5, 64]} /> */}
                              <octahedronGeometry args={[0.5, 32]} />
                              <meshStandardMaterial color="lightblue" />
                           </mesh>
                           <mesh value={1} position={[2.1, 1, 0]} rotation={[0, 0, 0]}>
                              {/* <circleGeometry args={[1.5, 64]} /> */}
                              <octahedronGeometry args={[0.5, 32]} />
                              <meshStandardMaterial color="blue" />
                           </mesh>
                           <mesh value={1} position={[3.2, 1, 0]} rotation={[0, 0, 0]}>
                              {/* <circleGeometry args={[1.5, 64]} /> */}
                              <octahedronGeometry args={[0.5, 32]} />
                              <meshStandardMaterial color="darkblue" />
                           </mesh>

                           <OrbitControls />
                        </Canvas>
                     </TabPanel>

                     <TabPanel className='bg-secondary' value="2">
                     </TabPanel>

                     <TabPanel className='bg-dark' value="3">
                     </TabPanel>
                  </TabContext>
               </div>
            </AccordionDetails>
         </Accordion>

         {/* second accordion with tabs  */}
         <Accordion className='bg-component m-3 rounded shadow' expanded={expanded} onChange={handleExpansion}>
            <AccordionSummary
               id="idAccordion01"
               className='mt-1'
               expandIcon={<BubbleChartOutlinedIcon sx={{ color: 'black' }} />}
               aria-controls="idAccordion01"
            >
               <Typography>
                  Cubes and Dices 3D
               </Typography>
            </AccordionSummary>
            <AccordionDetails className='bg-component-top rounded'>
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
                              className='m-1 bg-warning-subtle rounded shadow'
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
                                          formControlClass = formControlClass.replace('bg-warning-subtle', 'bg-dark-subtle')
                                          formControl.setAttribute('class', formControlClass)
                                       } else {
                                          setEnabled(true)
                                          setVisible(true)
                                          // set new background
                                          formControlClass = formControlClass.replace('bg-dark-subtle', 'bg-warning-subtle')
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
                        <div className='col m-1 bg-light border border-1 border-success rounded shadow'>
                           <Button className='m-2' variant="outlined" size="medium"
                              onClick={() => {
                                 setRolling((rolling) => !rolling)
                                 setResult(result)
                              }}>
                              Roll
                           </Button>
                           {/* <div style={{ position: "absolute", top: 20, left: 20 }}> */}
                           Result: {result}
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

                              <Physics gravity={[0, -0.001, 0]}>
                                 <Ground />

                                 {/* <DiceCup position={[0, 2, 0]} /> */}

                                 <Dice rolling={rolling} position={[0, 0.5, 0]}
                                    onResult={
                                       (result) => {
                                          console.log("🎲 Rolled:", result)
                                          setResult(result)
                                       }} />
                              </Physics>

                              <OrbitControls enablePan={false} />
                           </Canvas>
                        </div>
                     </TabPanel>
                  </TabContext>
               </div >  {/* row */}
            </AccordionDetails>
         </Accordion>
      </>
   )  // return()
}  // ThreeDTest()