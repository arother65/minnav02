/** 
 *  ? ThemeProvider, Layout-file (innerhalb von BrowserRouter) verwenden für alle "children" = verwendete components
*/

import './App.css'
import { useState } from 'react'

/** newer routing-logic
 *  using react-router-dom // parent->children navigation
 */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'  // 

// import of local components
import Home from './pages/Home'
import About from './pages/About'
import UsrPwdInputForm from './pages/UsrPwdInputForm'
import CryptString from './pages/CryptString'
import VierGewinnt from './pages/VierGewinnt'
import NotFound404 from './pages/404'

//
export default function App() {

  //  const [visible, setVisible] = useState(true)
  const [skeletonOn, setSkeletonOn] = useState(true)  // for Skeleton-components

  // instantiating a router-object; routes: RouteObject[], opts?: DOMRouterOpts
  const loRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route exact path="/" element={<Home skeletonOn={skeletonOn} setSkeletonOn={setSkeletonOn} />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/showlistitem" element={<ShowListItem />} /> */}
        <Route path="/UsrPwdInputForm" element={<UsrPwdInputForm />} />
        <Route path="/CryptString" element={<CryptString />} />
        <Route path="/VierGewinnt" element={<VierGewinnt />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    ),  // createRoutesFromElements()
    {  }
  )  // createBrowserRouter()

  //
  return (
    <>
      <RouterProvider router={loRoutes} />
    </>
  )
}  // App()
