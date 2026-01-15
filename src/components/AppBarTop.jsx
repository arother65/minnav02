/*
*   Stand: 08.01.2026
*/

// imports
import { useState, forwardRef } from 'react'
import { AppBar, Box, Backdrop, CircularProgress, IconButton, Toolbar, Menu, MenuItem, } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'  // or imported from react-router

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
                  sx={ menuItemSx }
                  onClick={() => {
                     fnNavigate('/UsrPwdInputForm')
                  }}>
                  Login
               </MenuItem>

               <MenuItem
                  sx={ menuItemSx }
                  onClick={() => {
                     fnNavigate('/CryptString')
                  }}>
                  Crypt a string
               </MenuItem>

               <MenuItem
                  sx={ menuItemSx }
                  onClick={() => {
                     setTimeout(() => {
                        // handleNavigate4gewinnt('/VierGewinnt')
                        // setLoading(true)
                        fnNavigate('/Dice', {})
                     }, 1000)
                     setLoading(true)
                  }}>
                  Würfeln...
               </MenuItem>

               <MenuItem
                  sx={ menuItemSx }
                  onClick={() => {
                     setTimeout(() => {
                        fnNavigate('/Carousel3D', {})
                     }, 1000)
                     setLoading(true)
                  }}>
                  3D Carousel...
               </MenuItem>

               <MenuItem
                  sx={ menuItemSx }
                  onClick={() => {
                     setTimeout(() => {
                        // handleNavigate4gewinnt('/VierGewinnt')
                        // setLoading(true)
                        fnNavigate('/VierGewinnt', {})
                     }, 1000)
                     setLoading(true)
                  }}>
                  Vier gewinnt
               </MenuItem>

                              <MenuItem
                  sx={menuItemSx}
                  onClick={() => {
                     fnNavigate('/about')
                  }}>
                  about page
               </MenuItem>

               <Backdrop open={loading} sx={{ zIndex: 500 }} onClick={() => { setLoading(false) }}>
                  <Box sx={{ display: 'flex' }}>
                     <CircularProgress color="midnightblue" sx={{ position: 'fixed' }} />
                  </Box>
               </Backdrop>
            </Menu>

            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* <Switch defaultChecked /> */}
         </Toolbar>
      </AppBar>
   )  // return()
}  // AppBarTop()



