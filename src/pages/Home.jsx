/*
*  Stand: 25.12.2025
*  fetch() with controller: https://netninja.dev/courses/build-websites-with-react-firebase/lectures/35907438

   Using Dialog: https://mui.com/material-ui/react-dialog/

*/

import { useState } from 'react'
// import '../../src/App.css'
import '../App.css'

import { ToastContainer, toast } from 'react-toastify'

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import Rating from '@mui/material/Rating'
import Skeleton from '@mui/material/Skeleton'
import LinearProgress from '@mui/material/LinearProgress'

// Import tool-functions for interaction with firebase 
import { initializeApp } from "firebase/app"
// import firebaseConfig from '../utils/getFirebaseConfig'  // err no default export

// customer components
import AppBarTop from '../components/AppBarTop'
import Footer from '../components/Footer'

//
export default function Home({ skeletonOn, setSkeletonOn }) {

   // Initialize Firebase
   const firebaseConfig = {
      apiKey: "AIzaSyDwCbSNyqMzXiyc3kGrtIaJkepIAX053cI",
      authDomain: "prj-r3f.firebaseapp.com",
      projectId: "prj-r3f",
      storageBucket: "prj-r3f.firebasestorage.app",
      messagingSenderId: "512907026571",
      appId: "1:512907026571:web:663e13496a9a6a85a1748e"
   };
   const app = initializeApp(firebaseConfig)

   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries

   // hooks, for tag footer
   const [visible, setVisible] = useState(true)

   // useState()-hooks for Skeleton
   const [value, setValue] = useState(1)  // for setting the Rating-component

   // handler-functions 
   const skeletonHandler = () => {
      setTimeout(() => {
         setSkeletonOn(false)
      }, 1500)
   }  // skeletonHandler()
   skeletonHandler()

   // controlled Switches
   /*   const hndlChangeSwitch = (e) => {
    
       // get idMainHome
       const mainElement = document.getElementById('idMainHome')
    
       // change CSS-class
       console.log(mainElement.classList, mainElement.classList.value)
    
       //     let classList01 = mainElement.classList
       //    let classList02 = mainElement.getAttribute('class') 
    
       if (!e.target.checked) {
         mainElement.className = 'App-main-red'
       } else {
         mainElement.className = 'App-main'
       }
      } */

   //
   return (
      <div className="App">
         <header>
            <AppBarTop />
         </header>

         <main id="idMainHome" className="App-main">
            {/* main column with a few rows */}

            <Container disableGutters={true} sx={{ mt: 10 }}>
               <Stack spacing={1} sx={{ width: '100%', border: '3px dashed red', flexDirection: 'col', justifyContent: 'center' }}>
                  <Stack direction="row" spacing={2} sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row', justifyContent: 'center' }}
                  >
                     <Grid container
                        size={{ xs: 12, sm: 6 }}
                        spacing={1}
                        columns={2}
                        sx={{ border: '2px dashed white', width: '100%' }}>
                        <Grid sx={{ border: '2px dashed green' }}>
                           {/* <ExampleCollapsibleList /> */}
                           <Typography>Text</Typography>
                        </Grid>
                        <Grid sx={{ border: '2px dashed green' }}>
                           <Typography>Text</Typography>
                        </Grid>
                     </Grid>
                     <Grid container
                        size={{ xs: 12, sm: 6 }}
                        spacing={1}
                        columns={2}
                        sx={{ border: '2px dashed white', width: '100%' }}>
                        <Typography>This site was created with: </Typography>

                     </Grid>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row', justifyContent: 'center' }}>
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'row',
                           p: 1,
                           m: 1,
                           bgcolor: 'background.paper',
                           borderRadius: 1,
                        }}
                     >
                        <Typography>Text in Box-Tag</Typography>
                     </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row', justifyContent: 'center' }}>
                     <Typography>Text in Stack-Tag</Typography>
                  </Stack>
               </Stack>  {/* end main column */}

               {/* Button for opening <ToastContainer /> */}
               <Button type='button' onClick={() => {
                  toast("Loaded all resources!", {
                     position: "bottom-right",
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "light",
                     // transition: 'slide',
                  })

                  toast("App ready!", {
                     position: "bottom-right",
                     autoClose: 3000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "dark",  // light
                     // transition: 'slide',
                  })
               }
               }>
                  See application-log
               </Button>
               {/*           <ToastContainer /> */}
               <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
               // transition="slide"
               />

               {/* <UsrPwdInputForm usrLoggedIn={usrLoggedIn}/> */}

               {skeletonOn &&
                  <>
                     <Stack spacing={1} sx={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={200} height={50} />
                     </Stack>

                     <Stack spacing={1} sx={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={200} height={50} />
                     </Stack>

                     <Stack spacing={1} sx={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        {/* For other variants, adjust the size with `width` and `height` */}
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={200} height={50} />
                     </Stack>
                     <LinearProgress
                        color="success"
                        sx={{ border: 1, borderColor: 'primary.main', borderRadius: 2, width: '100%', height: '10px' }} >
                     </LinearProgress>
                     {/* { setSkeletonOn(false)} */}
                  </>
               }
               {!skeletonOn &&
                  <Stack spacing={1} sx={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                     <Box sx={{ '& > legend': { mt: 1 } }}>
                        <Typography component="legend">Controlled</Typography>
                        <Rating
                           name="simple-controlled"
                           value={value}
                           onChange={(event, newValue) => {
                              setValue(newValue);
                           }}
                        />
                     </Box>
                     <Box sx={{ '& > legend': { mt: 1 } }}>
                        <Typography component="legend">Read only</Typography>
                        <Rating name="read-only" value={value} readOnly />
                     </Box>
                  </Stack>
               }

               <Container sx={{ mt: 1, border: 1, borderColor: 'error.main', borderRadius: 2 }}>
                  <p>text on inner container</p>
                  <Stack spacing={1}
                     sx={{ width: '100%', flexDirection: 'row', justifyContent: 'center', border: 1, borderColor: 'error.light', borderRadius: 2 }}>
                     <p>text in Stack ROW</p>
                     <Stack spacing={1}
                        sx={{ width: '100%', flexDirection: 'col', justifyContent: 'center', border: 1, borderColor: 'primary.dark', borderRadius: 2 }}>
                        <p>text in Stack COL</p>
                     </Stack>
                     <Stack spacing={1}
                        sx={{ width: '100%', flexDirection: 'col', justifyContent: 'center', border: 1, borderColor: 'primary.dark', borderRadius: 2 }}>
                        <p>text in Stack COL</p>
                     </Stack>
                  </Stack>

                  <Stack spacing={1}
                     sx={{ width: '100%', flexDirection: 'col', justifyContent: 'center', border: 1, borderColor: 'primary.main', borderRadius: 2 }}>
                     <p>text in Stack COL</p>
                  </Stack>
               </Container>

               <div className="row border shadow">
                  <p>text in bs-row</p>
                  <div className="col border shadow">
                     <p>p in bs-col</p>
                  </div>
                  <div className="col border shadow">
                     <p>p in bs-col</p>
                  </div>
               </div>
            </Container>
         </main>

         <>
            {visible
               ?
               <footer id='idFooterHome' className="App-footer">
                  <Footer visible={null} />
               </footer>
               :
               <footer id='idFooterHome' className="App-footer">
               </footer>
            }
         </>
      </div>
   )  // return()
}  // Home()