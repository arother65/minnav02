/*
* 
*/

// imports
import '../App.css'

import logo from '../logo.svg'
import joker from '../icons8-joker-64.png'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Toolbar, Tooltip } from '@mui/material'
// import Slide from '@mui/material/Slide'

// colors, icons 
import { red, purple } from '@mui/material/colors'
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

    // noObjects
    setNoObjects(e.target.value)

    noCoins.length = e.target.value
    setNoCoins(noCoins)
  }  // handleNoObjects()

  // const theme = useTheme()

  // drag&drop handling
  function drop(event) {
    event.preventDefault();

    let data = event.dataTransfer.getData("text/plain");
    console.log(data); //
    event.target.appendChild(document.getElementById(data));
  }

  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);  // text/html || text/plain
  }

  function allowDrop(event) {
    event.preventDefault();
  }

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

        <div className="row mt-5">
          <div className="col">
            <Box sx={{
              display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
              bgcolor: 'primary.light', m: 1
            }}>
              <h6>Player 1</h6>
              <>
                {Array.from({ ...noCoins }).map((_, i) => (
                  /*               <Box
                                  key={i}
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                  }}
                                >
                                  {i + 1}
                                </Box> */

                  <div key={i} >
                    <Avatar sx={{ bgcolor: red[900], margin: 1 }} aria-label="coin">
                      {coinValue}
                      {/* {() => {
                    let actCoinValue = 1
                    for (let i = 0; i < noCoins; i++) {
                      actCoinValue = Math.random() * 10
                      actCoinValue = Math.floor(actCoinValue)

                      if (actCoinValue > 0) {
                        setCoinValue(actCoinValue)  // overrides initial value
                      }
                    }
                  }}   // not valid as a react child 
                  */}
                    </Avatar>
                  </div>
                ))  // map()
                }  {/* Array.from() */}
              </>
            </Box>
          </div>

          <div className="col">
            <Box sx={{
              display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
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

        <div className="row bg-primary border border-1 border-black shadow rounded">
          <div className="col rounded-1">
            <p>col01</p>
            <Box sx={{
              display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
              bgcolor: 'primary.light',
            }}>
              <p>box in col01</p>
            </Box>

            <div>
              <Box id="idDndSource"
                component="div"
                draggable={true}
                // ondrag="dragging(event)"
                // onDragStart={dragStart}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", 'idDragP');
                  e.dataTransfer.effectAllowed = "move";
                }}
              >
                <p id='idDragP'draggable={true}>Drag me!</p>
              </Box>
            </div>
          </div>

          {/* droptarget, use <DndContext></DndContext>? */}
          <div className="col border border-1 border-black shadow rounded-2">
            <div
              className="col mt-2 bg-warning-subtle border border-1 border-black shadow rounded-1"
              id="idDndTarget"
              onDrop={drop}
              onDragOver={allowDrop}>
              Droptarget div
            </div>
            <div id="idDndTarget"
              className="col mt-2 bg-warning-subtle border border-1 border-black shadow rounded-1"
              onDrop={drop}
              onDragOver={allowDrop}>
              <p className="bg-primary-subtle">Droptarget p</p>
            </div>
          </div>

          <div className="col rounded-1 border-info">
            <p>Choose a Logo to drag</p>

            <img id="img1"
              src={joker}
              // className="App-logo"
              draggable={true}
              onDragStart={dragStart}
              width="50"
              height="50"
              alt="React logo" />

            <img id="img2"
              src={logo}
              // className="App-logo"
              draggable={true}
              onDragStart={dragStart}
              width="300"
              height="50"
              alt="React logo" />

            <img id="img3"
              src={logo}
              // className="App-logo"
              draggable={true}
              onDragStart={dragStart}
              width="300"
              height="50"
              alt="React logo" />

            <div id="div1"
              onDrop={drop}
              onDragOver={allowDrop}>
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

