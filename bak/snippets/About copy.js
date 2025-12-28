/*
*   Zeigt nur zwei TabStrips, da ab zwei tabs mobil nicht zugreifbar / verwendbar
*/

import '../App.css'
import logo from '../logo.svg'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { Accordion, AppBar, Box, Card, Container, IconButton, Tab, Toolbar, Tooltip, Typography } from '@mui/material'
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import HomeIcon from '@mui/icons-material/Home'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// colors
//import { red } from '@mui/material/colors'

// non-MUI-components
import TimelineAboutPage from '../pages/TimelineAboutPage'
// import Carousel from '../pages/Carousel'  // build with tailwind.css

/* const slides = [
    { id: 1, image: "https://picsum.photos/id/1018/800/400", alt: "Nature 1" },
    { id: 2, image: "https://picsum.photos/id/1015/800/400", alt: "Nature 2" },
    { id: 3, image: "https://picsum.photos/id/1019/800/400", alt: "Nature 3" },
] */

//
export default function About() {
    const [value, setValue] = useState('1')  // index of default <Tab>  for <TabContext>

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const fnNavigate = useNavigate()

    //
    return (
        <>
            <header>
                <AppBar
                    /* className='App-bar' */ // no effect
                    sx={{ backgroundColor: 'rgba(40, 45, 60, 0.95)', position: 'fixed' }}
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
                                <a href="https://reactnative.dev/" rel='external'>
                                    <img src={logo} className="App-logo" alt="logo" />
                                </a>
                            </nav>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </header>

            <main className="App-main">
                <Container sx={{ mt: 10 }}>
                    <Accordion defaultExpanded>  {/* Accordion 1 */}
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Accordion 1</Typography>
                        </AccordionSummary>
{/*                         <AccordionDetails>
                            <Box sx={{ width: '100%', m: 1, mt: 10, border: '1px dashed grey' }}>
                                <TabContext value={value}>
                                    <TabList onChange={handleChange}
                                        aria-label="lab API tabs example"
                                        textColor='secondary'
                                        indicatorColor="secondary"
                                    >
                                        <Tab label="Timeline component" value="1" />
                                        <Tab label="Carousel component" value="2" />
                                    </TabList>
                                    <TabPanel value="1" sx={{ width: 'auto', border: '1px dashed red' }}>
                                        <Typography>
                                            <TimelineAboutPage />
                                        </Typography>
                                    </TabPanel>
                                    <TabPanel value="2" sx={{ width: 'auto', border: '1px dashed yellow' }}>
                                        <p>new carousel component goes here </p>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AccordionDetails> */}
                    </Accordion>

                    <Accordion>  {/*   Accordion 2 */}
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card>
                                <p>p-tag on Card</p>
                            </Card>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </main>

            <footer className="App-footer" >
                <p>&copy; 2025</p>
            </footer>
        </>
    )
}  // About()