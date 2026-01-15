
// imports
import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

//
import ThreeDTest from '../components/3dTestground'

//
export default function Dice() {

   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   //
   return (
      <>
         <header>
            <IconButton
               id="idBtnNavHome"
               size="medium"
               edge="start"
               aria-label="nav to home"
               sx={{ m: 2 }}
               onClick={() => {
                  fnNavigate('/')
               }}
            >
               <HomeIcon sx={{ color: 'green' }} />
            </IconButton>
         </header>

         <main>
            <ThreeDTest>
               <p>three d test</p>
            </ThreeDTest>
         </main>
      </>
   )
}  // Dice()