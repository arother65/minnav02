/*
*   Stand: 08.01.2026
*/

// imports
import { useState } from 'react'
import {
   AppBar, Box, Backdrop, Card, CardContent, CircularProgress, IconButton,
   Typography, Toolbar, Menu, MenuItem,
}
   from "@mui/material"

import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'  // or imported from react-router

// for 3D animations
import { Canvas } from "@react-three/fiber";

// animating Ball
import { Sphere } from '@react-three/drei'
import { Physics, useSphere } from '@react-three/cannon'

//
export default function AppBarTop() {

   // hooks for a menu-component 
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)
   const handleClick = (event) => { setAnchorEl(event.currentTarget) }
   const handleClose = () => { setAnchorEl(null) }

   // navigation for MenuItem
   const fnNavigate = useNavigate()

   // handleNavigate4gewinnt('/VierGewinnt')
   const [loading, setLoading] = useState(false)

   /*    const handleNavigate4gewinnt = (navTarget) => {
         setLoading(true);
         fnNavigate(navTarget, {})
      }  // handleNavigate4gewinnt() */

   // common sx-object for all MenuItems used
   const menuItemSx = {
      '&:hover': {
         color: 'white',
         // backgroundColor: 'olivedrab', 
         backgroundColor: 'primary.light',
      }
   }  // 

   // 
   function PhysicsBall({ position, color }) {
      // Create a physics-enabled sphere
      const [ref, api] = useSphere(() => ({
         mass: 20,
         // position: [0, 2, 0],
         position: position,
         args: [1.25], // radius of the Ball
      }))

      return (
         // Anzahl der Segmente des Balles in: args={[1.5, 16, 16] 
         <Sphere ref={ref} args={[1.25, 64, 64]}>
            <meshStandardMaterial color={color} />
         </Sphere>
      )  // return()
   }  // PhysicsBall()


   // 
   return (
      <AppBar sx={{ backgroundColor: 'rgba(40, 45, 60, 0.85)', position: 'fixed' }} >
         <Toolbar>
            <IconButton
               id="demo-positioned-menu"
               size="large"
               edge="start"
               color="inherit"
               aria-label="open drawer"
               sx={{ mr: 2 }}
               aria-controls={open ? 'demo-positioned-menu' : undefined}
               onClick={handleClick}
            >
               <MenuIcon sx={{ color: 'green' }} />
            </IconButton>
            <Menu
               id="demo-positioned-menu"
               aria-labelledby="demo-positioned-button"
               anchorEl={anchorEl}  // element to diplay menu list underneath
               open={open}
               onClose={handleClose}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
               }}
            >
               {/* 					<MenuItem
						sx={{
							'&:hover': {
								color: 'white',
								backgroundColor: 'olivedrab',
							}
						}}
						onClick={handleOpenDialog}>
						open dialog
					</MenuItem> {/* opens Dialog */}
               {/* <Dialog
						open={openDialog}
						slots={{
							transition: lvTransition,
						}}
						keepMounted= {false}
						onClose={handleCloseDialog}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle>{"Title DialogTitle"}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								This is a component of type "Dialog".
								No functionality, you are safe...
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<IconButton
								id="idBtnCloseDialog"
								size="large"
								edge="start"
								color="inherit"
								aria-label="close dialog"
								sx={{ mr: 2 }}
								onClick={handleCloseDialog}
							>
								<CloseRoundedIcon sx={{ color: 'red' }} />
							</IconButton>
						</DialogActions>
					</Dialog> */}

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/UsrPwdInputForm')
                  }}>
                  Login
               </MenuItem>

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/CryptString')
                  }}>
                  Crypt a string
               </MenuItem>

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     setTimeout(() => {
                        fnNavigate('/Dice', {})
                     }, 4000)
                     setLoading(true)
                  }}>
                  Würfeln...
               </MenuItem>

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     setTimeout(() => {
                        fnNavigate('/Carousel3D', {})
                     }, 500)
                     setLoading(true)
                  }}>
                  3D Carousel...
               </MenuItem>

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     setTimeout(() => {
                        // handleNavigate4gewinnt('/VierGewinnt')
                        // setLoading(true)
                        fnNavigate('/VierGewinnt', {})
                     }, 500)
                     setLoading(true)
                  }}>
                  Vier gewinnt
               </MenuItem>

               {/* goto /Spinwheel */}
               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/SpinWheel')
                  }}>
                  Spinning wheel
               </MenuItem>

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/car3d')
                  }}>
                  simple car 3D
               </MenuItem>

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/ChessScene')
                  }}>
                  ChessScene
               </MenuItem>

               {/* <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/trackedVehicle')
                  }}>
                  simple tracked vehicle
               </MenuItem> */}

               <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/about')
                  }}>
                  about page
               </MenuItem>

               <Backdrop open={loading} sx={{ zIndex: 500 }} onClick={() => { setLoading(false) }}>
                  <Card >
                     <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                           ...navigating
                        </Typography>
                        {/* <CircularProgress color="midnightblue" sx={{ position: 'relative' }} /> */}

                        {/* 3d animation  */}
                        <Box orientation='col'
                           className='m-1 bg-dark-subtle rounded shadow '
                           sx={{ minHeight: '100px', minWidth: '150px', border: '1px solid green' }}
                        >
                           {/* von oben die Szene betrachten: camera={{ position: [0, 5, 0] }} */}
                           <Canvas camera={{ position: [0, 1, 10] }}>
                              <ambientLight intensity={0.5} />
                              <directionalLight position={[5, 5, 5]} />

                              {/* gravity ca.: x = unklar; y = horizontal; vertical = z */}
                              <Physics gravity={[0, 0, 20]}>
                                 <PhysicsBall position={[1, 0, -3]} color={'lightgreen'} />
                                 <PhysicsBall position={[1, 0, -2]} color={'green'} />
                                 <PhysicsBall position={[1, 0, -1]} color={'darkgreen'} />
                              </Physics>
                           </Canvas>
                        </Box>
                     </CardContent>
                  </Card>
               </Backdrop>
            </Menu>

            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* <Switch defaultChecked /> */}
         </Toolbar>
      </AppBar>
   )  // return()
}  // AppBarTop()



