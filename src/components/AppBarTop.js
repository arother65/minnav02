/*
*   Menu item open dialog commented out due to problems with blocking the home.js page
*/

// imports
import { useState, forwardRef } from 'react'
import { AppBar, Box, Backdrop, CircularProgress, IconButton, Toolbar, Menu, MenuItem, } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'  // or imported from react-router

// import HTML-Components for Component Dialog
/* import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle' */
import Slide from '@mui/material/Slide'

// import CircularProgress from '@mui/joy/CircularProgress'  // errs
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

// const image = { uri: 'https://legacy.reactjs.org/logo-og.png' }
// import logo from '../logo.svg'

//
export default function AppBarTop() {

   // hooks for a menu-component 
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)
   const handleClick = (event) => { setAnchorEl(event.currentTarget) }
   const handleClose = () => { setAnchorEl(null) }

   // hooks for Component DIALOG
   const [openDialog, setOpenDialog] = useState(false)
   const handleOpenDialog = () => { setOpenDialog(true) }
   const handleCloseDialog = () => { setOpenDialog(false) }
   // fn for component DIALOG, called by a MenuItem
   const lvTransition = forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />
   })

   // navigation for MenuItem
   const fnNavigate = useNavigate()

   // handleNavigate4gewinnt('/VierGewinnt')
   const [loading, setLoading] = useState(false)

   /*    const handleNavigate4gewinnt = (navTarget) => {
         setLoading(true);
         fnNavigate(navTarget, {})
      }  // handleNavigate4gewinnt() */

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
                  sx={{
                     '&:hover': {
                        color: 'white',
                        backgroundColor: 'olivedrab',
                     }
                  }}
                  onClick={() => {
                     fnNavigate('/about')
                  }}>
                  about page
               </MenuItem>

               <MenuItem
                  sx={{
                     '&:hover': {
                        color: 'white',
                        backgroundColor: 'olivedrab',
                     }
                  }}
                  onClick={() => {
                     fnNavigate('/UsrPwdInputForm')
                  }}>
                  Login
               </MenuItem>

               <MenuItem
                  sx={{
                     '&:hover': {
                        color: 'white',
                        backgroundColor: 'olivedrab',
                     }
                  }}
                  onClick={() => {
                     fnNavigate('/CryptString')
                  }}>
                  Crypt a string
               </MenuItem>

               <MenuItem
                  sx={{
                     '&:hover': {
                        color: 'darkred',
                        backgroundColor: 'olivedrab',
                     }
                  }}
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

               <Backdrop open={loading} sx={{ zIndex: 500 }} onClick={() => { setLoading(false) }}>
                  <Box sx={{ display: 'flex' }}>
                     <CircularProgress color="midnightblue" sx={{ position: 'fixed' }} />
                  </Box>
               </Backdrop>

               {/* <CircularProgress color="inherit" /> */}
            </Menu>

            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* <Switch defaultChecked /> */}
         </Toolbar>
      </AppBar>
   )  // return()
}  // AppBarTop()



