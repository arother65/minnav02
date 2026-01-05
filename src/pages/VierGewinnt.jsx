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
   }  // playGroundInit

   // "hook"-functions
   const [playGround, setPlayground] = useState(playGroundInit)
   const [dragSourceId, setDragSourceId] = useState(null)
   const [dragParentId, setDragParentId] = useState(null)

   // useRef for the Coins created with <Avatar />-Component 
   const coinRef = useRef({})
   useEffect(() => {
      const el = coinRef.current;
      if (!el) return;

      console.log("coinRef: draggable:", el.draggable);     // boolean
      console.log("coinRef: width:", el.offsetWidth);       // number
      console.log("coinRef: height:", el.offsetHeight);     // number
      // console.log("", el.data-coin-value)  // errs 
   }, [])  // useEffect() for coinRef

   // useRef for the PARENT of one Coin created with <Avatar />-Component 
   const parentCoinRef = useRef(null)
   useEffect(() => {
      const el = parentCoinRef.current;
      if (!el) return;

      console.log("parentCoinRef: id:", el.id);
      setDragParentId(el.id)

      console.log("parentCoinRef: draggable:", el.draggable);     // boolean
      console.log("parentCoinRef: width:", el.offsetWidth);       // number
      console.log("parentCoinRef: height:", el.offsetHeight);     // number
   }, [])  // useEffect() for parentCoinRef

   useEffect(() => {
      console.log('useEffect for moving coins.')
   }, [dragParentId, dragSourceId, playGround])  //?

   // sets coinValue when view is first created
   const [coinValue, setCoinValue] = useState(1)
   const [noCoins, setNoCoins] = useState(4)  // used in Array.map() for #coins
   useEffect(() => {
      const newCoinValue = getRandomCoinValue()
      setCoinValue(newCoinValue)  // overrides initial value

      setNoCoins(noCoins)  //?

      console.log('useEffect on: ', 'noCoins: ', noCoins, 'coinValue: ', coinValue)
   }, [coinValue, noCoins])

   // gets value from select and creates random values for the coins
   const handleNoObjects = (e) => {

      // setting new value for coinValue
      console.log('coinValue before: ', coinValue)
      setCoinValue(getRandomCoinValue())
      console.log('coinValue after: ', coinValue)

      // setting new value for noCoins
      console.log('No. before', noCoins)
      setNoCoins(e.target.value)
      console.log('No. after', e.target.value)
   }  // handleNoObjects()

   // creates a fn of type NavigateFunction
   const fnNavigate = useNavigate()

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

   //* drag&drop handling
   function fnOnDrop(event) {
      event.preventDefault()

      // mark actual row/col-combination in playGround as USED, event.currentTarget.id = actual dropTarget  
      console.log('got ID as dropTarget: ', event.currentTarget.id)
      let splittedID = event.currentTarget.id.split('-')
      let rowId = splittedID[0]
      let colId = splittedID[1]

      // check if this row-col in playGround is already in use
      let cell = playGround[`row${rowId}`][`col${colId}`]
      if (cell.used === true) {
         // cell was already used
         event.stopPropagation()
         return
      }

      // check if the actual coin () is already in ONE row playGround 
      //! Unterscheidung je nach event: drop aus dieser Zelle ODER drop in diese Zelle
      let parentDiv, checkedCell, actCol

      // check all rows 
      for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
         // console.log(rowIndex)

         // check all cols in this row 
         for (let colIndex = 0; colIndex < 4; colIndex++) {
            console.log('row: ', rowIndex, 'col: ', colIndex)

            actCol = `col${colIndex}`
            checkedCell = playGround[`row${rowIndex}`][actCol]

            // coin aus der aktuell untersuchten cell 'checkedCell' entfernen:
            if (checkedCell.used === true) {
               checkedCell.used = false
               checkedCell.coinId = null

               // get that div with css-class col
               parentDiv = document.getElementById(`${rowIndex}-${colIndex}`)
               console.log(parentDiv.className)
               parentDiv.className = parentDiv.className.replace('bg-success', '')
            }
         }  // checking if cell is already in use 
      }  // run through all rows 

      // check if row is already full
      const row = playGround[`row${rowId}`]

      if (cell.used === false) {
         // mark this cell as used & memorize the coin just dropped in here 
         cell.used = true
         cell.coinId = dragSourceId

         // add this coin to a cell in the playground 
         let data = event.dataTransfer.getData("text/plain")
         event.target.appendChild(document.getElementById(data))

         // restore the coin's opacity 
         let actCoin = document.getElementById(dragSourceId)
         actCoin.style.opacity = 1

         // ausgabe des parent aus dem Player-Bereich, der dragSource
         let dragParent = document.getElementById(dragParentId)
         console.log(dragParent.children)

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

   function fnDragStart(event) {
      // console.log('fnDragStart', event.target.id)

      // write the actual Coin to global memory:
      setDragSourceId(event.target.id)

      event.currentTarget.style.opacity = "0.45"
      event.dataTransfer.setData("text/plain", event.target.id)  // text/html || text/plain
   }  // fnDragStart()

   function fnAllowDrop(event) {
      event.preventDefault()

      // console.log('fnAllowDrop', event)
      event.dataTransfer.effectAllowed = 'none'
      event.dataTransfer.dropEffect = 'copy'  // move
   }  // fnAllowDrop() / event onDragOver

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

                  {/* parnet of the coin being moved (dragSourceId) */}
                  <Typography align='center' className='bg-dark border border-success rounded shadow'
                     sx={{ mt: 1, width: '200px' }}>
                     dragParentId: {dragParentId ? dragParentId : 'void'}
                  </Typography>
               </div>

               {/* col for Player 2 */}
               <div className="col Player2-animate">
                  <h6>Player 2</h6>
                  <Box id={'idPlayer2Box'}
                     ref={parentCoinRef}
                     sx={{ display: 'flex', justifyContent: 'center', border: '1px dashed red', borderRadius: 3, bgcolor: 'secondary.light', m: 1 }}
                  >
                     <>
                        {noCoins && Array.from({ length: noCoins }).map((_, i) => (
                           <Avatar
                              id={`coin-${i}`}
                              key={`coin-${i}`}
                              ref={(el) => (coinRef.current[i] = el)}
                              component={'div'}
                              className='Coin-animate'
                              sx={{ bgcolor: purple[700], border: '1px solid red', margin: 1 }}
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
                        ))
                        }
                     </>
                  </Box>
               </div>
            </div>

            {/* Spielfeld, playGround */}
            <>
               {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="row mt-1 border border-1 border-info rounded" draggable={false}>
                     <p>row {rowIndex}</p>

                     {Array.from({ length: 4 }).map((_, colIndex) => (
                        <div key={colIndex}
                           id={`${rowIndex}-${colIndex}`}
                           className="col mt-1 border border-1 border-warning rounded"
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

