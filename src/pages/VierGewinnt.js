/*
* 
*/

// imports
import '../App.css'
import logo from '../logo.svg'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Grid, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

// colors
// import { red } from '@mui/material/colors'
// import { Backdrop, Box, CircularProgress } from '@mui/material'

// 
import Footer from '../components/Footer'

//
export default function VierGewinnt() {

  const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

  const commonStyles = {
    bgcolor: 'green',
    borderColor: 'text.primary',
    m: 1,
    border: 5,
    width: '5rem',
    height: '5rem',
  };

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
        {/* <Grid columns={12} sx={{ borderLeft: 5, borderColor: 'red', bgcolor: 'green', borderRadius: 2, boxShadow: 5, }}>
          <p>text</p>
          <p>text02</p>
          <p>text03</p>
        </Grid> Anwendung von GRID unklar */}

        {/* https://mui.com/system/getting-started/the-sx-prop/ */}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ ...commonStyles, borderRadius: '50%' }} />
          <Box sx={{ ...commonStyles, borderRadius: 1 }} />
          <Box sx={{ ...commonStyles, borderRadius: '16px' }} />
        </Box>
      </main>

      <footer className="App-footer" >
        <Footer visible={null} />
      </footer>
    </>
  )
}  // VierGewinnt()