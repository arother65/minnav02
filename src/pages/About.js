/*
*   Zeigt zwei Stacks, direction row, mit jeweils einem Carousel (erstellt mit bootstrap-CSS)
*   https://getbootstrap.com/
*/

import '../App.css'
import logo from '../logo.svg'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, Container, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

// colors
//import { red } from '@mui/material/colors'

// non-MUI-components
// import TimelineAboutPage from '../components/TimelineAboutPage'
import BootstrapCarousel from '../components/BootstrapCarousel'
import Footer from '../components/Footer'

//
export default function About() {
   const [value, setValue] = useState('1')  // index of default <Tab>  for <TabContext>

   const handleChange = (event, newValue) => {
      setValue(newValue);
   }

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
                        onClick={() => {
                           fnNavigate('/')
                        }}
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

         <main className="App-main">
            <Container sx={{ mt: 10, mb: 5 }}>
               <BootstrapCarousel />
            </Container>
         </main>

         <footer id='idFooterAbout' className="App-footer" >
            <Footer visible={null} />
         </footer>
      </>
   )
}  // About()