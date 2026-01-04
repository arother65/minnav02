/**
 *  https://www.npmjs.com/package/@react-three/fiber
 */

// imports 
import { Canvas, useFrame } from '@react-three/fiber'
import { Alert, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useEffect, useState, useRef } from 'react'

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
      { position: [0.5, 0, 0], color: 'green', speed: 1 },
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
   const [valueTab, setValueTab] = useState('one');
   const handleChangeTab = (event, newValue) => {
      setValueTab(newValue)
   }  // 

   const [value, setValue] = useState('1');
   const handleChangeTabList = (event, newValue) => {
      setValue(newValue)
   }  // 


   // 
   return (
      <>
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

         <div className='row m-2 bg-light border border-2 border-success rounded'>

            <div className='col'>
               <p className='text-dark'>Canvas in bs-row</p>
               <Button variant="outlined" size="medium"
                  onClick={(e) => {

                     // const clone = [...original]
                     let newCubeArray = [...cubes03]

                     let position = []
                     newCubeArray[0].position[0] = newCubeArray[0].position[0] + 1

                     newCubeArray.push({ position, color: 'yellow', speed: 1 })
                     setNoCubes(newCubeArray)  //? no re-render

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
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
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

            <TabContext value={value}>
               <TabList onChange={handleChangeTabList} aria-label="lab API tabs example">
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
               </TabList>

               <TabPanel className='bg-secondary-subtle text-black' value="1">Item One</TabPanel>

               <TabPanel className='bg-secondary' value="2">Item Two</TabPanel>

               <TabPanel className='bg-dark' value="3">Item Three</TabPanel>
            </TabContext>
         </div >  {/* row */}
      </>
   )  // return()
}  // ThreeDTest()