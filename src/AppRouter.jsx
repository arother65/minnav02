/** 
 *  Stand: 08.01.2026
 * 
 *  ? ThemeProvider, Layout-file (innerhalb von BrowserRouter) verwenden für alle "children" = verwendete components
*/

import './App.css'
import { useState } from 'react'

// newer routing-logic
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// import of local / customer components
import Home from './pages/Home'
import UsrPwdInputForm from './pages/UsrPwdInputForm'
import CryptString from './pages/CryptString'
import VierGewinnt from './pages/VierGewinnt'
import Dice from './pages/Dice'
import Carousel3D from './pages/Carousel3D'
import SpinningWheel from './pages/SpinningWheel'
import Car3D from './pages/Car3D'
// import TrackedVehicle from './pages/TrackedVehicle'

import ChessScene from './pages/ChessScene'
import ThreeShapes from './pages/ThreeShapes'


import About from './pages/About'
import NotFound404 from './pages/404'

//
export default function AppRouter() {

  //  const [visible, setVisible] = useState(true)
  const [skeletonOn, setSkeletonOn] = useState(true)  // for Skeleton-components

  const domRouterOptions = {

  }  //

  // instantiating a router-object; routes: RouteObject[], opts?: DOMRouterOpts
  // createBrowserRouter(routes: RouteObject[], opts?: DOMRouterOpts): Router
  const loRoutes = createBrowserRouter(

    createRoutesFromElements(
      <Route>
        <Route exact path="/" element={<Home skeletonOn={skeletonOn} setSkeletonOn={setSkeletonOn} />} />

        {/* <Route path="/showlistitem" element={<ShowListItem />} /> */}
        <Route path="/UsrPwdInputForm" element={<UsrPwdInputForm />} />
        <Route path="/CryptString" element={<CryptString />} />
        <Route path="/VierGewinnt" element={<VierGewinnt />} />
        <Route path="/Dice" element={<Dice />} />
        <Route path="/Carousel3D" element={<Carousel3D />} />
        <Route path="/SpinWheel" element={<SpinningWheel />} />
        <Route path="/Car3D" element={<Car3D />} />
        {/* <Route path="/trackedVehicle" element={<TrackedVehicle />} />  */}

        <Route path="/ChessScene" element={<ChessScene />} />
        <Route path="/ThreeShapes" element={<ThreeShapes />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound404 />} />
      </Route>
    ),  // createRoutesFromElements()
    domRouterOptions
  )  // createBrowserRouter()

  //
  return (
    <>
      <RouterProvider router={loRoutes} />
    </>
  )
}  // AppRouter()
