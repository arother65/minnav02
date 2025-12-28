/*
*  Stand: 29.10.2025
*  fetch() with controller: https://netninja.dev/courses/build-websites-with-react-firebase/lectures/35907438

   Using Dialog: https://mui.com/material-ui/react-dialog/

*/

import React from 'react'
// import { View, Text } from 'react-native'  // err cannot resolve

import { useState, useEffect, useCallback } from 'react'
import logo from '../logo.svg'
import '../App.css'
import { Link, useNavigate } from 'react-router'
import {
  AppBar, Button, Grid, IconButton, Switch, SpeedDial, Tooltip, Toolbar, Menu, MenuItem
}
  from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'

// import HTML-Elements for Component Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

// Beispiel von MUI/Joy: https://mui.com/joy-ui/getting-started/
import ExampleCollapsibleList from '../pages/ExampleCollapsibleList'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

// Import tool-functions for interaction with firebase, data, own components
import firebaseConfig from '../../src/utils/getFirebaseConfig'
// import UsrPwdInputForm from './UsrPwdInputForm'

// import crypto from 'node:crypto'  //err

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// fn for component Dialog, called by a MenuItem
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

//
export default function Home() {


  // hooks
  let [visible, setVisible] = useState(true)

  // hooks for a menu-component 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  // user defined functions 
  const connectToDB = useCallback(() => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    console.log('Firebase App instantiated: ', app)

    // Initialize Authorization, initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    /*     console.log("Firebase auth.languageCode: ", auth.languageCode)
        console.log("currentUser: ", auth.currentUser)
     */
    const email = 'anro@email.de', password = '!Start1965'
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log('user logged in: ', userCredential.user.uid)
        return true
      })
      .catch((error) => {
        console.log(error.code, error.message)
        return false
      })

    /*   onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      }) */
  }, [])  // usrLoggedIn? as dependency



  // Login with user/password: 2 variants: 1st with dependency array and function created by useCallback(), 2nd without
  /*   useEffect(() => {
      if (!usrLoggedIn) {
        // const result = connectToDB()  // erzeugt zwei aufrufe
        setLoggedIn(connectToDB())  // erzeugt drei aufrufe
      } else {
        setLoggedIn(false)
      }
      // return 0
    }, [usrLoggedIn, connectToDB])
   */

  /*   useEffect(() => {
  
      if (!usrLoggedIn) {
  
        // Initialize Firebase
        const app = initializeApp(firebaseConfig)
        console.log('Firebase App instantiated: ', app)
  
        // Initialize Authorization, initialize Firebase Authentication and get a reference to the service
        const auth = getAuth(app);
        const email = 'anro@email.de', password = '!Start1965'
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            console.log('user logged in: ', userCredential.user.uid)
            setLoggedIn(true)  // erzeugt zwei aufrufe
          })
          .catch((error) => {
            console.log(error.code, error.message)
            setLoggedIn(false)  //?
          })
      }
    }, [usrLoggedIn]) */

  // navigation for MenuItem
  const fnNavigate = useNavigate()

  // hooks for Component Dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  //
  return (
    <>
      <header>
        <AppBar
          /* className='App-bar' */ // no effect
          sx={{ backgroundColor: 'rgba(40, 45, 60, 0.95)', position: 'fixed' }}
        >
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
              anchorEl={anchorEl}
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
            /*               sx={{ backgroundColor: 'rgba(40, 45, 60, 0.95)' }}  // färbt den im Hintergrund befindlichen View */
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'olivedrab',
                  }
                }}
                onClick={handleOpenDialog}>
                open dialog
              </MenuItem> {/* opens Dialog */}
              <Dialog
                open={openDialog}
                slots={{
                  transition: Transition,
                }}
                keepMounted
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
              </Dialog>

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
            </Menu>

            <img src={logo} className="App-logo" alt="logo" />
          </Toolbar>
        </AppBar>
      </header>

      <main className="App-main">
        <ExampleCollapsibleList />

        {/* <UsrPwdInputForm usrLoggedIn={usrLoggedIn}/> */}
      </main>

      <>
        {visible
          ?
          <footer id='idFooterHome' className="App-footer">

            {/* spacing = space between children */}
            <Grid container columns={4} spacing={1} sx={{}}>
              <Grid size={1}>
                <Button variant="outlined" onClick={(event) => {
                  console.log(event.target.id)

                  // get idFooterHome
                  /*               const element = document.getElementById('idFooterHome')  // or by classname
                                console.log(element.getAttribute('class'))
                                element.setAttribute('class', '') */
                  setVisible(false)

                }}>Ausblenden
                </Button>
              </Grid>
              <Grid size={1}>
                <nav>
                  <Link className="App-link" to="/about">About</Link>
                </nav>
              </Grid>
              <Grid size={1}>
                <p>footer text</p>
                {/* <Switch checked={false} onChange={handleHiddenChange} color="primary" /> */}
                <Switch checked={false} color="primary" />
              </Grid>
              <Grid size={1}>
                <Tooltip title="SpeedDial">
                  <SpeedDial
                    ariaLabel="SpeedDial in footer-tag"
                    // sx={{ position: 'sticky', bottom: 1, left: 1, right: 1 }}
                    sx={{ position: 'sticky' }}
                  >
                  </SpeedDial>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton>
                    {/* sx={{ color: green[500] }} */}
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </footer>
          :
          <footer id='idFooterHome' className="App-footer">
          </footer>
        }
      </>
    </>
  )
}  // Home()