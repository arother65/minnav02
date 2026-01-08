/**
 * 
*/

import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router'

//
export default function ExampleCollapsibleList() {

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [showCircle, setShowCircle] = React.useState(false)

    const navigate = useNavigate() // typeof NavigateFunction

    //
    return (
        // <Box sx={{ width: 1000, pl: '1px' }}>
        <Box  sx={{ pl: '1px' }}>
            <List
                size="lg"
                sx={(theme) => ({
                    // Gatsby colors
                    '--joy-palette-primary-plainColor': '#8a4baf',
                    '--joy-palette-neutral-plainHoverBg': 'transparent',
                    '--joy-palette-neutral-plainActiveBg': 'transparent',
                    '--joy-palette-primary-plainHoverBg': 'transparent',
                    '--joy-palette-primary-plainActiveBg': 'transparent',
                    [theme.getColorSchemeSelector('dark')]: {
                        '--joy-palette-text-secondary': '#635e69',
                        '--joy-palette-primary-plainColor': '#d48cff',
                    },
                    '--List-insetStart': '32px',
                    '--ListItem-paddingY': '0px',
                    '--ListItem-paddingRight': '16px',
                    '--ListItem-paddingLeft': '21px',
                    '--ListItem-startActionWidth': '0px',
                    '--ListItem-startActionTranslateX': '-50%',
                    [`& .${listItemButtonClasses.root}`]: {
                        borderLeftColor: 'divider',
                    },
                    [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                        borderLeftColor: 'currentColor',
                    },
                    '& [class*="startAction"]': {
                        color: 'var(--joy-palette-text-tertiary)',
                    },
                })}
            >
                <ListItem nested>
                    <ListItem component="div" startAction={<ReceiptLong />}>
                        <Typography level="body-lg" sx={{ textTransform: 'uppercase' }} color="danger">
                            Documentation
                        </Typography>
                    </ListItem>
                    <List sx={{ '--List-gap': '0px' }}>
                        <ListItem variant="plain">
                            <ListItemButton selected>Overview</ListItemButton>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem sx={{ '--List-gap': '0px' }}>
                    <ListItemButton action={() => {
                    }} onClick={() => {
                        // event verfügbar: event.target.id
                        setShowCircle(true)
                        setTimeout(() => {
                            navigate('/showlistitem', {})
                        }, 1000)
                    }}>
                        Quick Start

                        {showCircle && <CircularProgress size="sm" />}
                    </ListItemButton>
                </ListItem>

                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant="plain"
                            size="sm"
                            color="neutral"
                            onClick={() => setOpen(!open)}
                        >
                            <KeyboardArrowDown
                                sx={[
                                    open ? { transform: 'initial' } : { transform: 'rotate(-90deg)' },
                                ]}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level="inherit"
                            sx={[
                                open
                                    ? { fontWeight: 'bold', color: 'text.primary' }
                                    : { fontWeight: null, color: 'inherit' },
                            ]}
                        >
                            Tutorial
                        </Typography>
                        <Typography component="span" level="body-xs" color="success">
                            9
                        </Typography>
                    </ListItem>
                    {open && (
                        <List sx={{ '--ListItem-paddingY': '8px' }}>
                            <ListItem>
                                <ListItemButton>Overview</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    0. Set Up Your Development Environment
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    1. Create and Deploy Your First Gatsby Site
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>2. Use and Style React components</ListItemButton>
                            </ListItem>
                        </List>
                    )}
                </ListItem>

                <ListItem
                    nested
                    sx={{ my: 1 }}
                    startAction={
                        <IconButton
                            variant="plain"
                            size="sm"
                            color="neutral"
                            onClick={() => setOpen2((bool) => !bool)}
                        >
                            <KeyboardArrowDown
                                sx={[
                                    open2 ? { transform: 'initial' } : { transform: 'rotate(-90deg)' },
                                ]}
                            />
                        </IconButton>
                    }
                >
                    <ListItem>
                        <Typography
                            level="inherit"
                            sx={[
                                open2
                                    ? { fontWeight: 'bold', color: 'text.primary' }
                                    : { fontWeight: null, color: 'inherit' },
                            ]}
                        >
                            How-to Guides
                        </Typography>
                        <Typography component="span" level="body-xs">
                            39
                        </Typography>
                    </ListItem>
                    {open2 && (
                        <List sx={{ '--ListItem-paddingY': '8px' }}>
                            <ListItem>
                                <ListItemButton>Overview</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Local Development</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Routing</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Styling</ListItemButton>
                            </ListItem>
                        </List>
                    )}
                </ListItem>
            </List>
        </Box>
    );
}
