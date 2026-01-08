/*
*  https://mui.com/material-ui/react-speed-dial/
*/

import * as React from 'react'
import '../App.css'
import logo from '../logo.svg'
import { Modal, Box, Button, Typography } from "@mui/material"
import { Link } from 'react-router'

//
export default function ShowListItem() {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	//
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h2>Page ListItem</h2>
			</header>

			<main className="App-main">
				<Button variant="contained" sx={{
					borderRadius: 4
				}}
					onClick={handleOpen}>
					Modal öffnen
				</Button>
				<Modal open={open} onClose={handleClose}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							bgcolor: "background.paper",
							p: 4,
							borderRadius: 4,
							boxShadow: 24,
						}}
					>
						<Typography variant="h6" component="h2">
							MUI Modal Beispiel
						</Typography>
						<Typography sx={{ mt: 2 }}>
							Das ist ein einfaches Material UI Modal.
						</Typography>
						<Button
							onClick={handleClose}
							sx={{ mt: 2 }}
							variant="outlined"
							color="error"
						>
							Schließen
						</Button>
					</Box>
				</Modal>
			</main>

			<footer className="App-footer" >
				<nav>
					<Link className="App-link" to="/">Home</Link>
				</nav>
				<p>footer text</p>
			</footer>
		</div>
	)  // return()
}  // ShowListItem()