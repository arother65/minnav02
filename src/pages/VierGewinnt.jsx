/*
*  https://docs.dndkit.com/introduction/getting-started
*/

// imports
import '../App.css'
import logo from '../logo.svg'
import Joker from '../icons8-joker-64.png'
import kreuzAs from '../icons8-kreuzass-64.png'

//
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Box, Button, Chip, IconButton, Menu, MenuItem, Toolbar, Tooltip } from '@mui/material'

// colors, icons 
import { blue, red, purple } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// 
import Footer from '../components/Footer'

//
export default function VierGewinnt() {

  // "hook"-functions
  const [noObjects, setNoObjects] = useState(1)
  const [noCoins, setNoCoins] = useState({ length: 1 })  // used in Array.map() for #coins
  const [coinValue, setCoinValue] = useState(1)

  // 
  const getRandomCoinValue = () => {
    let actCoinValue = 1
    actCoinValue = Math.random() * 5
    actCoinValue = Math.floor(actCoinValue)

    // checking actCoinValue to fit in the usual EUR-coin-values (1, 2, 5)
    if (actCoinValue === 1 || actCoinValue === 2) { return actCoinValue }
    if (actCoinValue > 2 && actCoinValue <= 5) { return 5 }
    if (actCoinValue > 5) { return 5 }
  }  // getRandomCoinValue()

  // sets coinValue when view is first created
  useEffect(() => {
    setCoinValue(getRandomCoinValue())  // overrides initial value
  }, [coinValue])

  // creates a fn of type NavigateFunction
  const fnNavigate = useNavigate()

  // gets value from select and creates random values for the coins
  const handleNoObjects = (e, child) => {

    console.log(child)

    // setting new value for coinValue
    console.log('coinValue before: ', coinValue)
    setCoinValue(getRandomCoinValue())
    console.log('coinValue after: ', coinValue)

    //
    setNoObjects(e.target.value)

    noCoins.length = e.target.value
    setNoCoins(noCoins)
  }  // handleNoObjects()

  //* drag&drop handling
  function fnDrop(event) {
    event.preventDefault();

    let data = event.dataTransfer.getData("text/plain");

    if (data === '') { data = 'Id-Coin-Init' }
    console.log(data); //

    event.target.appendChild(document.getElementById(data));

    // idCntrDrops : Zähler hochsetzen
    let cntDrops = document.getElementById('idCntrDrops')
    let actCount = Number(cntDrops.innerText)
    actCount++
    cntDrops.innerText = actCount

    // färben des drop target
    let dndTarget01 = document.getElementById('idDndTarget01')
    console.log(dndTarget01)

    let classList = dndTarget01.getAttribute('class')
    classList = classList.concat(classList, ' ', 'bg-success')  //
    dndTarget01.setAttribute('class', classList)

  }  // fnDrop(event) 

  function fnDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);  // text/html || text/plain
  }  // fnDragStart()

  function fnAllowDrop(event) {
    event.preventDefault();
  }  // fnAllowDrop()

  // custom state and fn's to handle <Menu>
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = (event) => { setAnchorEl(null); handleNoObjects(event) }

  // commpn sx-object for all MenuItems used
  const menuItemSx = {
    '&:hover': {
      color: 'white',
      // backgroundColor: 'olivedrab', 
      backgroundColor: 'primary.light',
    }
  }  // 

  // creating the view:
  return (
    <>
      <header>
        <AppBar sx={{ backgroundColor: 'rgba(40, 45, 60, 0.75)', position: 'fixed' }}>
          <Toolbar >
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
            <Tooltip title='React home' arrow >
              <nav>
                <a href="https://reactnative.dev/" rel='noreferrer' target='_blank'>
                  <img src={logo} className="App-logo" alt="logo" />

                  {/* <img src={logo} className="App.logo.animation" alt="logo" /> errs*/}
                </a>
              </nav>
            </Tooltip>

            <Button
              id="demo-customized-button"
              // aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ position: "absolute", top: 12, right: 15 }}
            >
              No. of coins
            </Button>
            <Menu anchorEl={anchorEl}
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={handleClose} value={1} sx={menuItemSx}>1</MenuItem>
              <MenuItem onClick={handleClose} value={2} sx={menuItemSx}>2</MenuItem>
              <MenuItem onClick={handleClose} value={10} sx={menuItemSx}>10</MenuItem>
              <MenuItem onClick={handleClose} value={15} sx={menuItemSx}>15</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </header>

      <main className="AppContainer">

        {/* https://mui.com/system/getting-started/the-sx-prop/ */}

        {/* row with cols for players */}
        <div className="row mt-5">
          {/* Player 1 */}
          <div className="col">
            <Box
              sx={{
                display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                bgcolor: 'primary.light', m: 1
              }}>
              <h6>Player 1</h6>
              <Avatar id="idCompPlayer1"
                draggable={true}
                onDragStart={fnDragStart}
                /*                         onDragStart={(e) => {
                                           e.dataTransfer.setData("text/plain", 'idCompPlayer1');
                                           e.dataTransfer.effectAllowed = "move";
                                        }} */
                // className="Player1-animate"  // errs, no drag possible

                sx={{
                  display: 'flex', justifyContent: 'center', border: '1px dashed green', borderRadius: 5,
                  bgcolor: 'primary.main', m: 1
                }}>
                {coinValue}
              </Avatar>
            </Box>
          </div>

          {/* Player 2 */}
          <div className="col">
            <Box
              // className="Player2-animate"
              sx={{
                display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                bgcolor: 'secondary.light', m: 1
              }}>
              <h6>Player 2</h6>
              <>
                {Array.from({ ...noCoins }).map((_, i) => (
                  <div key={i} >
                    <Avatar
                      id={i}
                      sx={{ bgcolor: purple[900], margin: 1 }} aria-label="coin"
                      draggable={true}
                      onDragStart={fnDragStart}>
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
                <div key={colIndex}
                  id={colIndex}
                  className="col mt-1 border border-1 border-warning"
                  onDrop={fnDrop}
                  onDragOver={fnAllowDrop}>
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
              // onDragStart={fnDragStart}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", 'idDndSource');
                e.dataTransfer.effectAllowed = "move";
              }}
              sx={{
                display: 'flex', colIndexustifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                bgcolor: 'primary.light',
              }}
            > draggable BOX
              {/* <p id='idDragP' draggable={true}> p-tag</p> */}
            </Box>
          </div>

          {/* droptarget */}
          <div className="col border border-1 border-black shadow rounded-2">
            <div className="row">
              <div
                className="col mt-2 border border-1 border-black shadow rounded-1"
                id="idDndTarget01"
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
              <div id="idDndTarget02"
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

