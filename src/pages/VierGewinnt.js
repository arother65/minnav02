/*
* 
*/

// imports
import '../App.css'
import logo from '../logo.svg'
import Joker from '../icons8-joker-64.png'
import kreuzAs from '../icons8-kreuzass-64.png'

//
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Box, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, Toolbar, Tooltip } from '@mui/material'
// import Slide from '@mui/material/Slide'
import { useDraggable, DndContext } from "@dnd-kit/core"

// colors, icons 
import { blue, red, purple } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'

// 
import Footer from '../components/Footer'

//
export default function VierGewinnt() {

   // "hook"-functions
   const initialBorderColor = 'secondary.main'
   const [actBorderColor, setActBorderColor] = useState(initialBorderColor)

   const [noObjects, setNoObjects] = useState(1)
   const [noCoins, setNoCoins] = useState({ length: 1 })

   const getRandomCoinValue = () => {
      let actCoinValue = 1
      actCoinValue = Math.random() * 5
      actCoinValue = Math.floor(actCoinValue)

      // checking actCoinValue to fit in the usual coin-values (1, 2, 5)
      if (actCoinValue === 1 || actCoinValue === 2) { return actCoinValue }
      if (actCoinValue > 2 && actCoinValue <= 5) { return 5 }
      if (actCoinValue > 5) { return 5 }
   }  // getRandomCoinValue()

   // handling the values of the coins created
   let [coinValue, setCoinValue] = useState(1)

   // sets coinValue when view is first created
   useEffect(() => {
      setCoinValue(getRandomCoinValue())  // overrides initial value
   }, [coinValue])

   // 
   const initialBgColor = 'midnightblue'
   const [actBgColor, setActBgColor] = useState(initialBgColor)

   //
   const commonStyle = {
      bgcolor: actBgColor,
      // borderColor: actBorderColor,  // err: reagiert nicht auf Änderungen
      m: 1,
      border: 3,
      width: '5rem',
      height: '5rem',
   }
   const [actCommonStyle] = useState(commonStyle)

   // local variables:
   const fnNavigate = useNavigate()  // creates a fn of type NavigateFunction

   // dynamic rendering of components for the display of coins 

   // gets value from select and creates random values for the coins
   const handleNoObjects = (e) => {

      // setting new value for coinValue
      console.log('coinValue before: ', coinValue)
      setCoinValue(getRandomCoinValue())
      console.log('coinValue after: ', coinValue)

      //
      setNoObjects(e.target.value)

      noCoins.length = e.target.value
      setNoCoins(noCoins)
   }  // handleNoObjects()

   // const theme = useTheme()

   // drag&drop handling
   function fnDrop(event) {
      event.preventDefault();

      let data = event.dataTransfer.getData("text/plain");
      console.log(data); //
      event.target.appendChild(document.getElementById(data));

      // idCntrDrops : Zähler hochsetzen
      let cntDrops = document.getElementById('idCntrDrops')
      let actCount = Number(cntDrops.innerText)
      actCount++
      cntDrops.innerText = actCount

   }  // fnDrop(event) 

   function fnDragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);  // text/html || text/plain
   }  // fnDragStart()

   function fnAllowDrop(event) {
      event.preventDefault();
   }

   // attempt to make Box draggable: 
   const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable(1);  // id?

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
                  <Tooltip title='ReactcolIndexS home' arrow >
                     <nav>
                        <a href="https://reactnative.dev/" rel='noreferrer' target='_blank'>
                           <img src={logo} className="App-logo" alt="logo" />

                           {/* <img src={logo} className="App.logo.animation" alt="logo" /> errs*/}
                        </a>
                     </nav>
                  </Tooltip>
               </Toolbar>
               <FormControl sx={{ mt: 1, width: 100, position: "absolute", top: 1, right: 15 }}>
                  <InputLabel id="demo-simple-select-label">No. objects</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={noObjects}
                     // label= '0'
                     onChange={handleNoObjects}
                     sx={{ backgroundColor: 'darkgrey', borderColor: 'red' }}
                  >
                     <MenuItem value={1}
                     /*                 sx={{
                                       '&:hover': {
                                         color: 'black',
                                         backgroundColor: 'khaki',
                                       }
                                     }} */
                     >1</MenuItem>
                     <MenuItem value={2}
                     /*                 sx={{
                                       '&:hover': {
                                         color: 'black',
                                         backgroundColor: 'khaki',
                                       }
                                     }} */
                     >2</MenuItem>
                     <MenuItem value={10}>10</MenuItem>
                     <MenuItem value={15}>15</MenuItem>
                  </Select>
               </FormControl>
            </AppBar>
         </header>

         {/* <main className="App-main"> */}
         <main className="AppContainer">

            {/* https://mui.com/system/getting-started/the-sx-prop/ */}

            {/* row with cols for players */}
            <div className="row mt-5">
               {/* Player 1 */}
               <div className="col">
                  <Box
                     className="Player1-animate"
                     sx={{
                        display: 'flex', colIndexustifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                        bgcolor: 'primary.light', m: 1
                     }}>
                     <h6 draggable={false}>Player 1</h6>
                     {/* <div draggable={false}> */}
                     {Array.from({ ...noCoins }).map((_, i) => (
                        <div key={i} draggable={true}>
                           <DndContext
                              onDragStart={(e) => {
                                 e.dataTransfer.setData("text/plain", i);
                                 e.dataTransfer.effectAllowed = "move";
                              }}
                              onDragEnd={(event) => {
                                 const { over, active } = event;
                                 if (over) {
                                    console.log(`Avatar ${active.id} dropped on ${over.id}`);
                                 }
                              }}>
                              <Box
                                 id={i}
                                 key={i}
                                 // component={'div'}  //?
                                 // ref={'div'}  // typeof React.ref 
                                 ref={setNodeRef(Box)}
                                 draggable={true}
                                 sx={{ width: 20, height: 20, bgcolor: red[900], margin: 1 }}
                                 aria-label="coin"
                                 /*                                  onDragStart={(e) => {
                                                                     e.dataTransfer.setData("text/plain", i);
                                                                     e.dataTransfer.effectAllowed = "move";
                                                                  }} */
                                 {...listeners}
                                 {...attributes}
                              >
                                 {coinValue}
                              </Box>
                           </DndContext>
                        </div>
                     ))  // map()
                     }  {/* Array.from() */}
                     {/* </div> */}
                  </Box>
               </div>

               {/* Player 2 */}
               <div className="col">
                  <Box
                     className="Player2-animate"
                     sx={{
                        display: 'flex', colIndexustifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                        bgcolor: 'secondary.light', m: 1
                     }}>
                     <h6>Player 2</h6>
                     <>
                        {Array.from({ ...noCoins }).map((_, i) => (
                           <div key={i} >
                              <Avatar sx={{ bgcolor: purple[900], margin: 1 }} aria-label="coin">
                                 {coinValue}
                              </Avatar>
                           </div>
                        ))
                        }
                     </>
                  </Box>
               </div>
            </div>

            {/* Spielfeld */}
            <>
               {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="row mt-1 border border-1 border-info">
                     <p>row {rowIndex}</p>

                     {Array.from({ length: 4 }).map((_, colIndex) => (
                        <div key={colIndex} className="col mt-1 border border-1 border-warning">
                           <p>col {colIndex}</p>
                        </div>
                     ))  // map()
                     }  {/* erzeugt Spalten*/}
                  </div>
               ))  // map()
               }  {/* erzeugt Zeilen*/}
            </>

            {/* test bs row/col */}
            <div className="row bg-primary border border-1 border-black shadow rounded">
               {/* drop-source */}
               <div className="col bg-secondary rounded-1">
                  <p>col01</p>
                  <Box className="m-1"
                     sx={{
                        display: 'flex', colIndexustifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                        bgcolor: 'primary.light',
                     }}>
                     <p>box in col01</p>
                  </Box>
                  <Box id="idDndSource"
                     className="m-1"
                     draggable={true}
                     // ondrag="dragging(event)"
                     // onDragStart={fnDragStart}
                     onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", 'idDndSource');
                        e.dataTransfer.effectAllowed = "move";
                     }}
                     sx={{
                        display: 'flex', colIndexustifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                        bgcolor: 'primary.light',
                     }}
                  > draggable BOX with p-tag
                     <p id='idDragP' draggable={true}> p-tag</p>
                  </Box>
               </div>

               {/* droptarget, use <DndContext></DndContext>? */}
               <div className="col border border-1 border-black shadow rounded-2">
                  <div className="row">
                     <div
                        className="col mt-2 border border-1 border-black shadow rounded-1"
                        id="idDndTarget"
                        onDrop={fnDrop}
                        onDragOver={fnAllowDrop}>
                        Droptarget div
                     </div>
                     <div className="col mt-2 bg-secondary border shadow rounded-1">
                        <p>Drop Counter</p>
                        {/* <Avatar id='idCntrDrops'>0</Avatar> */}
                        <Chip avatar={
                           <Avatar
                              id='idCntrDrops'
                              className='Avatar-animate'
                              sx={{ bgcolor: purple[200] }}>
                              0
                           </Avatar>
                        }
                           sx={{ m: 1 }}
                           label="Drop count" color="error" />
                     </div>
                     <div id="idDndTarget"
                        className="col mt-2 border border-1 border-black shadow rounded-1"
                        onDrop={fnDrop}
                        onDragOver={fnAllowDrop}>
                        <p className="bg-primary">Droptarget p</p>
                     </div>
                  </div>
               </div>

               <div className="col rounded-1 border-info">
                  <p>Choose a Logo to drag</p>
                  <img id="img1"
                     src={Joker}
                     // className="App-logo"
                     draggable={true}
                     onDragStart={fnDragStart}
                     width="50"
                     height="50"
                     alt="React logo" />

                  <img id="img2"
                     src={kreuzAs}
                     // className="App-logo"
                     draggable={true}
                     onDragStart={fnDragStart}
                     width="50"
                     height="50"
                     alt="React logo" />

                  <img id="img3"
                     src={logo}
                     // className="App-logo"
                     draggable={true}
                     onDragStart={fnDragStart}
                     width="300"
                     height="50"
                     alt="React logo" />

                  <div id="div1"
                     onDrop={fnDrop}
                     onDragOver={fnAllowDrop}>
                     div dnd target
                  </div>
               </div>
            </div>
         </main >

         <footer className="App-footer" >
            <Footer visible={null} />
         </footer>
      </>
   )
}  // VierGewinnt()

