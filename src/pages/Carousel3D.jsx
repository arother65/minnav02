
import { App } from '../components/App.jsx'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Tooltip, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import logo from '../logo.svg'

//
export default function Carousel3D() {

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

         <div className='row mt-3'>

            <div className='col w-50 border border-primary'>
               <div className='m-2 mt-20 border border-success rounded shadow' style={{ height: '300px' }}>
                  <App radius={1.8} count={10} />
               </div>
            </div>

            <div className='col w-50 border border-primary'>
               <div className='m-2 mt-1 border border-success rounded shadow' style={{ height: '300px' }}>
                  <App radius={1.5} count={8} />
               </div>
            </div>
         </div>

      </>
   )  // return()
}  // Carousel3D()