/**
*  Stand: 03.11.2025 
*  Algorithm used: AES-GCM
*
*  Material UI color: https://mui.com/material-ui/customization/color/
*
*/

// imports
import logo from '../logo.svg'
import '../App.css'

// import React, { useState } from "react"
import { useState, useEffect } from "react"
import { useNavigate, useNavigationType } from 'react-router'

import { AppBar, Button, Card, CardContent, Container, IconButton, Stack, TextField, Toolbar, Tooltip } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home'

// colors
import { red, orange, purple } from '@mui/material/colors'

// IterateEncryptedArr
import IterateEncryptedArr from '../utils/IterateEncryptedArr'
import CryptHistory from '../components/CryptHistory'
import Footer from '../components/Footer'

// event handlers for loading / unloading

//
export default function CryptString() {
	// imported colors
	const colRed300 = red[300]
	const colOrange500 = orange[300]
	const colPurple100 = purple[100]
	const colPurple200 = purple[200]

	// function for navigation/routing
	const fnNavigate = useNavigate()

	// React-standard hooks
	const [encryptedString, setEncryptedString] = useState(null)
	const [readableString, setReadableString] = useState('')
	const [strValue, setStrValue] = useState('')

	// event handlers
	const handleCrypt = async () => {

		// console.log(window.crypto.subtle)
		const iv = crypto.getRandomValues(new Uint8Array(12));
		const algorithm = {
			name: "AES-GCM",
			iv: iv,           // Initialization vector, Uint8Array<ArrayBuffer>
		}
		//const key = crypto.subtle.generateKey()
		const key = await crypto.subtle.generateKey(
			{ name: "AES-GCM", length: 256 },
			true,
			["encrypt", "decrypt"]
		)  // CryptoKey

		const enc = new TextEncoder()
		const data = enc.encode(strValue)  // BufferSource, UInt8Array

		try {
			await window.crypto.subtle.encrypt(algorithm, key, data)  // crypto.subtle.encrypt(algorithm, key, data)
				.then((encryptedResult) => {
					// resolves to an ArrayBuffer
					setEncryptedString(encryptedResult)
				})
				.catch((err) => {
					console.log(err)
					setEncryptedString('error')
				})  // 
		} catch (errEncrypt) {
			console.log(errEncrypt)
			setEncryptedString('error')
		}
	}  //  handleCrypt

	const handleDecrypt = async () => {
		// crypto.subtle.decrypt(algorithm, key, data)
		alert('not ready yet')
	}  // handleDecrypt

	// trying to get into the load event
	const navType = useNavigationType()
	const onLoad = (e) => {
		// alert(navType)
		e.nativeEvent.preventDefault()
		console.log('event: ', e, 'navType: ', navType)
	}  // onLoad()

	/* 	useEffect(() => {
	
		}, [navType]) */

	//
	return (
		<div onLoad={onLoad}>
			<header className="App-header">
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
								<a href="https://reactnative.dev/" rel='external'>
									<img src={logo} className="App-logo" alt="logo" />
								</a>
							</nav>
						</Tooltip>
					</Toolbar>
				</AppBar>
			</header>

			<main className="App-main">
				<Container>
					<Stack spacing={1} sx={{ mt: 10, bgcolor: colPurple100, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
						<Card sx={{ m: 1 }}>
							<CardContent>
								<IconButton
									id="idBtn01"
									size="small"
									edge="start"
									color="primary"
									aria-label=""
									sx={{
										border: 1, borderRadius: 2, boxShadow: 1,
										'&:hover': {
											bgcolor: colRed300,
											// bgcolor: 'secondary.light',
											color: 'secondary.contrastText'
										}
									}}
									/*               aria-controls={open ? 'demo-positioned-menu' : undefined} */
									onClick={handleCrypt}>
									encrypt string
									{/*               <MenuIcon sx={{ color: 'green' }} /> */}
								</IconButton>
								<TextField
									id="idTxtFieldStr"
									type='text'
									label="Uncoded text"
									variant="filled"
									color="success"
									slotProps={{
										input: {
											readOnly: false
										},
										size: 20
									}}
									sx={{ m: 2, p: 1, boxShadow: 2, bgcolor: 'darkgrey', borderRadius: 2 }}
									value={strValue}
									onChange={e => setStrValue(e.target.value)}
									helperText="Pls. mind the length <= 20">
								</TextField>
							</CardContent>
						</Card>
						<>
							{(encryptedString)
								?
								<Card sx={{ color: colRed300 }}>
									<CardContent>
										<IterateEncryptedArr data={encryptedString} setReadableString={setReadableString} />
									</CardContent>
								</Card>
								:
								<Card sx={{ color: colRed300 }}>
									<CardContent>
										<p>nothing encrypted yet</p>
									</CardContent>
								</Card>
							}
						</>
					</Stack>

					<Stack spacing={1} sx={{ m: 1, bgcolor: colPurple200, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
						<Card sx={{ m: 1, width: '100%' }}>
							<CardContent sx={{ m: 1, bgcolor: colPurple200 }}>
								<Button
									id="idBtn02"
									size="small"
									edge="start"
									color="success"
									aria-label=""
									type='button'
									sx={{
										border: 1, borderRadius: 2, boxShadow: 1,
										'&:hover': {
											bgcolor: colOrange500,
											color: 'secondary.contrastText'
										}
									}}
									onClick={handleDecrypt}>
									decrypt
								</Button>
								<TextField
									id="idTxtDecrypted"
									label="Coded text"
									variant='filled'
									sx={{
										m: 2, p: 1, border: 1, borderRadius: 2, boxShadow: 2, width: '100%'
									}}
									slotProps={{
										input: {
											readOnly: true
										},
										size: 500
									}}
									value={readableString}
									helperText="Encrypted text"
								>
								</TextField>
							</CardContent>
						</Card>
					</Stack>

					<CryptHistory />
				</Container>
			</main >

			<footer className="App-footer">
				<Footer visible={null}/>
			</footer>
		</div>
	)
}  // CryptString