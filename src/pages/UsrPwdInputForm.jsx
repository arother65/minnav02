/*
*   https://mui.com/system/getting-started/the-sx-prop/
*   https://mui.com/material-ui/customization/color/
*   https://react.dev/reference/react/useState
*   https://firebase.google.com/docs/auth/web/password-auth

    ?: AppBar, Card, Breadcrumbs, Drawer, Tabs

*/

import '../App.css'
import logo from '../logo.svg'
import { AppBar, Box, Button, Container, FormControlLabel, IconButton, Snackbar, Stack, Switch, Toolbar, Tooltip, TextField, Grid, Typography } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import { useState, useEffect, useRef } from 'react'
// import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import TestSlider from '../components/TestSlider'
import Footer from '../components/Footer'

//
export default function UsrPwdInputForm(usrLoggedIn) {
   const fnNavigate = useNavigate()

   // hooks
   const [formData, setFormData] = useState({
      name: '',
      pwd: '',
      postalCode: '',
      location: '',
   })

   // const objFormData = useRef(formData)  // typeOff formData

   // hooks to store data-object passed into this component from parent-component
   useEffect(() => {
      console.log(new Date(), ' call to useEffect ')
      // console.log('objFormData', objFormData)
      // data='logged in home '  // use ref-hook

      localStorage.setItem("loggedIn",
         JSON.stringify({ usr: 'usrName', pwd: 'usrPwd', date: new Date() })
      )  // store object, content not visible in browser-tools

      // return 'end useEffect'  // errs out
      // console.log(localStorage.getItem("loggedIn"))
   }, [formData])  // [formData]

   // using Snackbar 
   const [snackPosition, setSnackPosition] = useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
   })
   const { vertical, horizontal, open } = snackPosition

   const handleClick = (newState) => () => {
      setSnackPosition({ ...newState, open: true })
   }

   const handleClose = () => {
      setSnackPosition({ ...snackPosition, open: false })
   }

   const action = (
      <>
         <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
         >
            <CloseIcon fontSize="small" />
         </IconButton>
      </>
   )

   // hooks to control Switches and Sliders
   const [state, setState] = useState({
      idPwdLength: false,
      idPwdReq: true,
      idSwitch03: false
   })

   const handleChange = (event) => {
      switch (true) {
         case event.target.id === 'idPwdLength' || event.target.id === 'idPwdReq' || event.target.id === 'idSwitch03':
            setState({
               ...state,
               [event.target.id]: event.target.checked
            })
            break

         /* ! hier wird als id nur undefined vom slider geliefert */
         case event.target.id === 'idPwdLengthValue' || event.target.id === 'idOtherInput':
            setState({
               ...state,
               [event.target.id]: event.target.value
            })
            break
         default:
            break
      }
   }  // handleChange() Switch-Components

   // handle function for data changes in the CHILD component "TestSlider"
   const [data, setData] = useState()
   const handleDataChange = (childData) => {
      setData(childData)
   }  // handleDataChange

   //
   return (
      <div className="App">
         <header className="App-header">
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
                        onClick={() => {
                           fnNavigate('/')
                        }}
                     >
                        <HomeIcon sx={{ color: 'green' }} />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title='ReactJS home' arrow >
                     <nav>
                        <a href="https://reactnative.dev/" rel='external'>
                           <img src={logo} className="App-logo" alt="logo" />
                        </a>
                     </nav>
                  </Tooltip>
               </Toolbar>
            </AppBar>
         </header>

         <main className="App-main">
            <Container sx={{ mt: 10, backgroundColor: 'white' }}>
               <Stack direction="row" spacing={2} sx={{ border: '2px dashed grey', flexDirection: 'row', justifyContent: 'center' }}>
                  <Grid container columns={12} spacing={2}>
                     <AccountCircle sx={{ mr: 1, mx: 0.5, my: 0.5 }} />
                     <TextField id="idTxtName" label="TextField with icon" variant="standard"
                        color="success"
                        onChange={e => setFormData({
                           ...formData,
                           name: e.target.value
                        })}
                        value={formData.name}
                     />
                     <Stack
                        useFlexGap
                        sx={{
                           border: '1px dashed yellow',
                           display: 'flex',
                           alignItems: 'center',
                           bgcolor: 'darkgrey',
                           borderRadius: 2,
                           my: 1,
                           mx: 1
                        }}>
                        <Tooltip title="submit data" arrow>
                           <Button type="submit" variant="outlined" color="inherit"
                              sx={{
                                 my: 1,
                                 mx: 1,
                                 '&:hover': {
                                    bgcolor: 'secondary.light',
                                 }
                              }}
                              onClick={(e) => {
                                 e.preventDefault(); // Prevents default form submission behavior
                                 console.log(document.getElementById('idTxtName').value)

                                 // const newName = document.getElementById('idTxtName').value
                                 setFormData({
                                    ...formData,
                                    name: document.getElementById('idTxtName').value,
                                    postalCode: 38723,
                                    location: 'NDS'
                                 })
                              }}>
                              Submit
                           </Button>
                        </Tooltip>
                        <Tooltip title="Click to clear input" arrow>
                           <Button variant="contained" color="inherit" startIcon={<DeleteOutlined />}
                              sx={{
                                 my: 1,
                                 mx: 1,
                                 '&:hover': {
                                    bgcolor: 'secondary.light',
                                 }
                              }}
                              onClick={() => {
                                 setFormData({
                                    ...formData,
                                    name: '',
                                    postalCode: '',
                                    location: ''
                                 })
                              }}>
                              !
                           </Button>
                        </Tooltip>

                        {/* btn controlling Snackbar */}
                        <Button
                           variant="contained"
                           /*                                 color="inherit" */
                           sx={{
                              my: 1,
                              mx: 1,
                              '&:hover': {
                                 bgcolor: 'secondary.light',
                              }
                           }}
                           onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
                           {/*                     onClick={handleClick} > */}
                           Open Snackbar
                        </Button>
                        <Snackbar
                           anchorOrigin={{ vertical, horizontal }}
                           key={vertical + horizontal}
                           open={open}
                           autoHideDuration={5000}
                           onClose={handleClose}
                           message="Msg in Snackbar"
                           action={action}
                        />
                     </Stack> {/* Stack for one col */}
                  </Grid>
               </Stack> {/* Stack for one row */}

               <Stack direction="row" spacing={2} sx={{ border: '2px dashed grey', flexDirection: 'row', justifyContent: 'center' }}>
                  <Box
                     component="form"
                     sx={{ border: '1px dashed red', flexDirection: 'row', justifyContent: 'center' }}
                     onSubmit={(e) => {
                        setFormData({
                           ...formData,
                           name: formData.name,
                           pwd: formData.pwd,
                           postalCode: '38723',
                           location: 'NDS'
                        })
                        console.log(formData)

                        // objFormData.current = formData 
                        /* alert('box: onSubmit()', e.target.value) empty... */
                     }}
                  >
                     <Grid columns={2} spacing={2} >
                        <TextField type='email' required id="idTxtFieldUsr" label="Username" variant="filled"
                           color="success"
                           sx={{ mr: 1, boxShadow: 10, bgcolor: 'darkgrey', borderRadius: 2 }}
                           value={formData.name}
                           onChange={e => setFormData({
                              ...formData,
                              name: e.target.value
                           })}
                           helperText="Your email-address is sufficient"
                        />
                        {/* required */}
                        <TextField type='password' required id="idTxtFieldPwd" label="Password" variant="filled"
                           color="success"
                           sx={{ mr: 1, boxShadow: 10, bgcolor: 'darkgrey', borderRadius: 2 }}
                           value={formData.pwd}
                           onChange={e => setFormData({
                              ...formData,
                              pwd: e.target.value
                           })}
                           helperText="Password length minimum is: 8 characters"
                        />
                     </Grid>
                     <Button
                        type="submit"
                        // fullWidth
                        variant="contained"
                        sx={{
                           my: 1,
                           mx: 1,
                           '&:hover': {
                              bgcolor: 'secondary.light',
                           }
                        }}
                     >
                        Sign In
                     </Button>
                  </Box>
               </Stack> {/* Stack for one row */}

               <Stack direction="row" spacing={2} sx={{ border: '2px dashed grey', flexDirection: 'row', justifyContent: 'center' }}>
                  <FormControlLabel
                     control={<Switch id='idPwdLength' color="warning" checked={state.idPwdLength} onChange={handleChange} />}
                     label="Password, length > 8 chars"
                     labelPlacement='start' />
                  <FormControlLabel
                     control={<Switch id='idPwdReq' color="info" checked={state.idPwdReq} onChange={handleChange} />}
                     label="Password, required"
                     labelPlacement='start' />
                  <FormControlLabel
                     control={<Switch id='idSwitch03' color="info" checked={state.idSwitch03} onChange={handleChange} />}
                     label="Switch03"
                     labelPlacement='start' />
                  <Button onClick={() => {
                     let str = state.idPwdLength + ' ' + state.idPwdReq + ' ' + state.idSwitch03 + ' ' + state.idPwdLengthValue
                     alert(str)
                  }}>
                     show settings
                  </Button>
               </Stack>  {/* Stack for one row with Switches*/}

               <TestSlider onDataChange={handleDataChange} />
               {/* data is set with "onDataChange"  as a property in this child compoenent, not with {handleDataChange} */}
            </Container>
         </main>

         <footer className="App-footer">
            <Footer />
         </footer>
      </div>
   )
}  // UsrPwdInputForm()