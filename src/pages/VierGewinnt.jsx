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
  const [noCoins, setNoCoins] = useState({ length: 4 })  // used in Array.map() for #coins
  const [coinValue, setCoinValue] = useState(0)

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
    const newCoinValue = getRandomCoinValue()
    setCoinValue(newCoinValue)  // overrides initial value
  },
    // [coinValue]
    []
  )

  // creates a fn of type NavigateFunction
  const fnNavigate = useNavigate()

  // gets value from select and creates random values for the coins
  const handleNoObjects = (e) => {

    // setting new value for coinValue
    console.log('coinValue before: ', coinValue)
    setCoinValue(getRandomCoinValue())
    console.log('coinValue after: ', coinValue)

    noCoins.length = e.target.value
    
/*     //?  
    useEffect(() => {
      setNoCoins(noCoins)
    },
      [noCoins]
    )
 */    
  }  // handleNoObjects()

  //* drag&drop handling
  function fnOnDrop(event) {
    event.preventDefault()

    // check, ob ein Feld im playGround frei ist: 
    console.log(playGround)

    // mark row/col-combination in playGround 
    console.log('got ID: ', event.currentTarget.id)
    let id = ''
    id = event.currentTarget.id
    let splittedID = id.split('-')
    let rowId = splittedID[0]
    let colId = splittedID[1]

    // check if this row-col in playGround is already in use
    const cell = playGround[`row${rowId}`][`col${colId}`]
    console.log(cell)

    // check if row is already full
    const row = playGround[`row${rowId}`]
    console.log(row)

    if (cell.used === false) {
      cell.used = true

      // add new node
      let data = event.dataTransfer.getData("text/plain")
      console.log(data);
      event.target.appendChild(document.getElementById(data))

      if (row.col0.used === true &&
        row.col1.used === true &&
        row.col2.used === true &&
        row.col3.used === true
      ) {
        console.log('row full! ID: ', rowId)
        event.stopPropagation()
        return
      }

    } else {
      event.stopPropagation()
      return
    }
  }  // fnOnDrop(event) 

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

  const handleClose = (event) => {
    setAnchorEl(null)
    handleNoObjects(event)  // current MenuItem in: event.target.value
    
    // setNoCoins(event.target.value)
  }

  // common sx-object for all MenuItems used
  const menuItemSx = {
    '&:hover': {
      color: 'white',
      // backgroundColor: 'olivedrab', 
      backgroundColor: 'primary.light',
    }
  }  // 

  // Aufbau des Spielfeldes, Verwaltung der bereits besetzten Positionen in "fnOnDrop()"
  let playGround = {
    row0: {
      col0: {
        used: false
      },
      col1: {
        used: false
      },
      col2: {
        used: false
      },
      col3: {
        used: false
      }
    },
    row1: {
      col0: {
        used: false
      },
      col1: {
        used: false
      },
      col2: {
        used: false
      },
      col3: {
        used: false
      }
    },
    row2: {
      col0: {
        used: false
      },
      col1: {
        used: false
      },
      col2: {
        used: false
      },
      col3: {
        used: false
      }
    },
    row3: {
      col0: {
        used: false
      },
      col1: {
        used: false
      },
      col2: {
        used: false
      },
      col3: {
        used: false
      }
    }
  }  // playGround

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
              <MenuItem onClick={handleClose} value={4} sx={menuItemSx}>4</MenuItem>
              <MenuItem onClick={handleClose} value={8} sx={menuItemSx}>8</MenuItem>
              <MenuItem onClick={handleClose} value={12} sx={menuItemSx}>12</MenuItem>
              <MenuItem onClick={handleClose} value={16} sx={menuItemSx}>16</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </header>

      <main className="AppContainer">
        {/* https://mui.com/system/getting-started/the-sx-prop/ */}

        {/* row with one col per player */}
        <div className="row mt-5">
          {/* col for Player 1 */}
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

          {/* col for Player 2 */}
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

        {/* Spielfeld, playGround */}
        <>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <div key={rowIndex} className="row mt-1 border border-1 border-info" draggable={false}>
              <p>row {rowIndex}</p>

              {Array.from({ length: 4 }).map((_, colIndex) => (
                <div key={colIndex}
                  id={`${rowIndex}-${colIndex}`}
                  className="col mt-1 border border-1 border-warning"
                  onDrop={fnOnDrop}
                  onDragOver={fnAllowDrop}
                  draggable={false}>
                  <p>col {`${rowIndex}-${colIndex}`}</p>
                </div>
              ))  // map()
              }  {/* erzeugt Spalten*/}
            </div>
          ))  // map()
          }  {/* erzeugt Zeilen*/}
        </>
      </main >

      <footer className="App-footer" >
        <Footer visible={null} />
      </footer>
    </>
  )
}  // VierGewinnt()

