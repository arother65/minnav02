/**
 *  Stand: 08.01.2025
 *  Startet die Anwendung ( AppRouter aus App.jsx )
 * 
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './AppRouter'

// ReactDOM.options: optional params
const reactDomOptions = {
  onCaughtError: ()=>{ console.log('onCaughtError') },
  onUncaughtError: ()=>{ console.log('onUncaughtError') },
  onRecoverableError: () => { console.log('onRecoverableError') }
}  //

// https://react.dev/reference/react-dom/client/createRoot
// getting the main node / <div>-tag from /public/index.html:
const root = ReactDOM.createRoot(document.getElementById('idRoot'), reactDomOptions)

// "hydrating" this HTML-/DON-node:
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)  // render()
