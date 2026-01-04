/*
*  https://docs.dndkit.com/introduction/getting-started
*/

// imports
import '../App.css'
import logo from '../logo.svg'

//
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'

// colors, icons 
import { blue, green, purple, red } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// 
import Footer from '../components/Footer'

//
export default function VierGewinnt() {

  // "hook"-functions
  const [noCoins, setNoCoins] = useState(4)  // used in Array.map() for #coins
  const [coinValue, setCoinValue] = useState(1)
  const [dragSourceId, setDragSourceId] = useState(null)

  // creates a fn of type NavigateFunction
  const fnNavigate = useNavigate()

  // 
  const getRandomCoinValue = () => {
    let actCoinValue = 1

    actCoinValue = Math.random() * 5

    while (actCoinValue === 0 || actCoinValue === undefined || actCoinValue < 1.0) {
      actCoinValue = Math.random() * 5
    }  //

    actCoinValue = Math.floor(actCoinValue)
    console.log('actCoinValue: ', actCoinValue)

    // checking actCoinValue to fit in the usual EUR-coin-values (1, 2, 5)
    if (actCoinValue === 1 || actCoinValue === 2) { return actCoinValue }
    if (actCoinValue > 2 && actCoinValue <= 5) { return 5 }
    if (actCoinValue > 5) { return 5 }
  }  // getRandomCoinValue()

  // sets coinValue when view is first created
  useEffect(() => {
    const newCoinValue = getRandomCoinValue()
    setCoinValue(newCoinValue)  // overrides initial value
    console.log('useEffect on coinValue')
  }, [coinValue])

  // gets value from select and creates random values for the coins
  const handleNoObjects = async (e) => {

    // setting new value for coinValue
    console.log('coinValue before: ', coinValue)
    setCoinValue(getRandomCoinValue())
    console.log('coinValue after: ', coinValue)

    // err: new no. of coins : invalid state usage 
    console.log('No. before', noCoins)
    setNoCoins(e.target.value)
    console.log('No. after', e.target.value)
  }  // handleNoObjects()

  useEffect(() => {
    console.log('useEffect on noCoins')
  }, [noCoins])

  //* drag&drop handling
  async function fnOnDrop(event) {
    event.preventDefault()

    // mark actual row/col-combination in playGround as USED, event.currentTarget.id = actual dropTarget  
    console.log('got ID as dropTarget: ', event.currentTarget.id)
    let splittedID = event.currentTarget.id.split('-')
    let rowId = splittedID[0]
    let colId = splittedID[1]

    // check if the actual coin () is already in playGround 
    let parentDiv, checkedCell, actCol
    for (let i = 0; i < 4; i++) {
      actCol = `col${i}`
      checkedCell = playGround[`row${rowId}`][actCol]

      // coin aus der aktuell untersuchten cell 'checkedCell' entfernen:
      if (checkedCell.used === true) {
        checkedCell.used = false
        checkedCell.coinId = null

        // get that div with css-class col
        parentDiv = document.getElementById(`${rowId}-${i}`)
        console.log(parentDiv.className)
        parentDiv.className = parentDiv.className.replace('bg-success', '')
      }
    }  // checking if cell is already in use 

    // check if this row-col in playGround is already in use
    let cell = playGround[`row${rowId}`][`col${colId}`]

    // check if row is already full
    const row = playGround[`row${rowId}`]

    if (cell.used === false) {
      // mark this cell
      cell.used = true
      cell.coinId = dragSourceId

      // console.log(playGround)
      console.log('dragSourceId', dragSourceId)

      // add new node
      let data = event.dataTransfer.getData("text/plain")
      event.target.appendChild(document.getElementById(data))
      //? removeChild() aus dem PLayer-Bereich, der dragSource

      // color the cell in use
      let className = event.currentTarget.className
      event.currentTarget.className = className + ' bg-success'

      // mark as used
      setPlayground(playGround)

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
      // cell was already used 
      event.stopPropagation()
      return
    }
  }  // fnOnDrop(event) 

  async function fnDragStart(event) {
    console.log('fnDragStart', event.target.id)
    //? write actualCoin to global memory
    setDragSourceId(event.target.id)

    event.currentTarget.style.opacity = "0.25"

    event.dataTransfer.setData("text/plain", event.target.id)  // text/html || text/plain
  }  // fnDragStart()

  async function fnAllowDrop(event) {
    event.preventDefault()

    // console.log('fnAllowDrop', event)
    event.dataTransfer.effectAllowed = 'none'
    event.dataTransfer.dropEffect = 'copy'  // move
  }  // fnAllowDrop() / event onDragOver

  // custom state and fn's to handle <Menu />
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }

  const handleClose = (event) => {
    setAnchorEl(null)
    handleNoObjects(event)  // current MenuItem in: event.target.value

    // setNoCoins(event.target.value)
  }

  // common sx-object for all <MenuItem />'s used
  const menuItemSx = {
    '&:hover': {
      color: 'white',
      // backgroundColor: 'olivedrab', 
      backgroundColor: 'primary.light',
    }
  }  // 

  // Aufbau des Spielfeldes, Verwaltung der bereits besetzten Positionen in "fnOnDrop()"
  let playGroundInit = {
    row0: {
      col0: {
        used: false,
        coinId: null
      },
      col1: {
        used: false,
        coinId: null
      },
      col2: {
        used: false,
        coinId: null
      },
      col3: {
        used: false,
        coinId: null
      }
    },
    row1: {
      col0: {
        used: false,
        coinId: null
      },
      col1: {
        used: false,
        coinId: null
      },
      col2: {
        used: false,
        coinId: null
      },
      col3: {
        used: false,
        coinId: null
      }
    },
    row2: {
      col0: {
        used: false,
        coinId: null
      },
      col1: {
        used: false,
        coinId: null
      },
      col2: {
        used: false,
        coinId: null
      },
      col3: {
        used: false,
        coinId: null
      }
    },
    row3: {
      col0: {
        used: false,
        coinId: null
      },
      col1: {
        used: false,
        coinId: null
      },
      col2: {
        used: false,
        coinId: null
      },
      col3: {
        used: false,
        coinId: null
      }
    }
  }  // playGround
  const [playGround, setPlayground] = useState(playGroundInit)

  // useRef for the Coins created with <Avatar />-Component 
  const avatarRef = useRef(null)

  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;

    console.log("draggable:", el.draggable);     // boolean
    console.log("width:", el.offsetWidth);       // number
    console.log("height:", el.offsetHeight);     // number
    // console.log("", el.data-coin-value)  // errs 

  }, [])  // useeffect() for avatarRef

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
          <div className="col Player1-animate " >
            <Box
              sx={{
                display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                bgcolor: 'primary.light', m: 1
              }}>
              <h6>Player 1</h6>
              <Avatar id="idCompPlayer1"
                className='Coin-animate'
                draggable={true}
                onDragStart={fnDragStart}
                onDragEnd={(e) => {
                  e.currentTarget.style.opacity = "1"
                }}
                sx={{
                  display: 'flex', justifyContent: 'center', border: '1px dashed green', borderRadius: 5,
                  bgcolor: 'primary.main', m: 1
                }}>
                {coinValue}
              </Avatar>
            </Box>
          </div>

          {/* for debugging purposes only: */}
          <div className="col align-content-center border rounded">
            {/* <p className='border border-success rounded shadow' width='25px'>dragSourceId: {dragSourceId ? dragSourceId : 'void'}</p> */}
            <Typography align='center' className='bg-dark border border-success rounded shadow'
              sx={{ mt: 1, width: '200px' }}>
              dragSourceId: {dragSourceId ? dragSourceId : 'void'}
            </Typography>
          </div>

          {/* col for Player 2 */}
          <div className="col Player2-animate">
            <Box
              // className="Player2-animate"
              sx={{
                display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3,
                bgcolor: 'secondary.light', m: 1
              }}>
              <h6>Player 2</h6>
              <>
                {Array.from({ length: noCoins }).map((_, i) => (
                  <div key={`div-${i}`} draggable={true}>
                    <Avatar
                      id={`coin-${i}`}
                      ref={avatarRef}
                      component={'div'}
                      className='Coin-animate'
                      sx={{ bgcolor: purple[700], border: '1px solid red', margin: 1 }}
                      // slots={{ fallback: 'div' }}
                      // slotProps={{}}
                      aria-label="coin"
                      draggable={true}
                      data-coin-value={coinValue}
                      variant='circular'
                      onDragStart={fnDragStart}
                      onDragEnd={(e) => {
                        e.currentTarget.style.opacity = "1"
                      }}>
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

