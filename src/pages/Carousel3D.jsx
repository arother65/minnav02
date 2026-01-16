/**
 * 
 */

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppBar, Box, Button, Typography, Toolbar, Tooltip, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import { Canvas } from '@react-three/fiber'

import { App } from '../components/App.jsx'
import logo from '../logo.svg'

//
export default function Carousel3D() {

   const [rolling, setRolling] = useState(false)
   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

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

         <div className='row mt-5'>
         </div>

         {/* <div className='row mt-4 w-100 vh-100 justify-content-center align-items-center'> */}
         <div className='row mt-4 m-1 w-100 h-75'>

            <Box orientation='col' className='m-1 bg-dark rounded shadow' sx={{ width: '25%', border: '1px solid red' }}>
               <Canvas camera={{ position: [0, 0, 0], fov: 15 }}>
                  <App radius={1.5} count={10} rolling={rolling} />
               </Canvas>
            </Box>

            <Box orientation='col' className='m-1 bg-dark rounded shadow' sx={{ width: '25%', border: '1px solid red' }}>
               <Canvas camera={{ position: [0, 0, 0], fov: 15 }}>
                  <App radius={1.5} count={8} rolling={rolling} />
               </Canvas>
            </Box>

            <Box orientation='col' className='m-1 bg-dark rounded shadow' sx={{ width: '25%', border: '1px solid red' }}>
               <Canvas camera={{ position: [0, 0, 0], fov: 15 }}>
                  <App radius={1.5} count={8} rolling={rolling} />
               </Canvas>
            </Box>

            <Box orientation='col' className='m-1 bg-dark rounded shadow' sx={{ width: '20%', border: '1px solid green' }}>
               <Typography variant="h6" component="h6">Ihr Spielergebnis</Typography>
            </Box>
         </div>

         {/* Bedienelemente */}
         <div className='row mt-1 w-100 justify-content-center align-items-center'>
            <div className='col m-2'>
               <Button className='m-1' variant="contained" color="primary"
                  onClick={() => {
                     setRolling(true)
                  }}>
                  Start
               </Button>
               <Button className='m-1' variant="contained" color="secondary"
                  onClick={() => { setRolling(false) }}>
                  Stop
               </Button>
            </div>
            <div className='col m-1'>

            </div>
         </div>

      </>
   )  // return()
}  // Carousel3D()