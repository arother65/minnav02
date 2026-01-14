/**
*   Stand: 31.10.2025 
*/

// import '../App.css'
import { useState } from 'react'
import { Stack, Tooltip, Typography } from "@mui/material"
import Slider from '@mui/joy/Slider'


// ! as a function to get data back to the parent-component, the PROPERTY-Name "onDataChange" has to be used
export default function TestSlider({ onDataChange }) {

   // react-standard-hooks/functions to control Sliders
   const [state, setState] = useState({
      idPwdLengthValue: 10,
      idOtherInput: 10
   })

   // locally declared customer-functions
   const getDeviceMemory = () => {
      return navigator.deviceMemory;
   }  // getDeviceMemory
   const lvDeviceMemory = getDeviceMemory()

   // 
   const getGeolocation = () => {
      if ("geolocation" in navigator) {
         // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
         console.log('geoposition available')
         const oGeoposition = navigator.geolocation

         const fnSuccess = (currentPosition) => {
            console.log(currentPosition.coords.latitude, currentPosition.coords.longitude)
            return currentPosition.coords
         }
         const fnError = (errGetCurrentPosition) => {
            return errGetCurrentPosition
         }
         const options = {}
         // (method) Geolocation.getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): void
         return oGeoposition.getCurrentPosition(fnSuccess, fnError, options)

      } else {
         /* geolocation IS NOT available */
         console.log('geoposition NOT available')
         return null
      }
   }  // getGeolocation
   const lvGeolocation = getGeolocation()

   const handleChange = (event) => {

      onDataChange(event.target.value) // function-name has to be used like the on-property of the parent is named 
      switch (true) {
         /* ! hier wird als id nur undefined vom slider geliefert */
         case event.target.name === 'idPwdLengthValue' || event.target.name === 'idOtherInput':
            setState({
               ...state,
               [event.target.name]: event.target.value
            })
            break
         default:
            break
      }
   }  // handleChange() Slider-Components

   //
   return (
      <div>
         <Stack direction="row" spacing={2} sx={{ border: '2px dashed grey', m: 2, p: 2, flexDirection: 'row', justifyContent: 'center' }}>
            {/*                 <Typography>Min: {data.min}</Typography>
                <Typography>Max: {data.max}</Typography> */}
            <p>{lvDeviceMemory}</p>
            <p>{lvGeolocation}</p>

            <Stack direction="col" sx={{ border: '1px dashed red' }}>
               <Typography>
                  Set Pwd-length:
               </Typography>
            </Stack>
            <Stack direction="col" sx={{ width: '50%', border: '1px dashed red' }}>
               <Slider
                  name='idPwdLengthValue'
                  aria-label="Slider with pwdLengthValue"
                  defaultValue={10}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  /*                         min={ getState() } */
                  min={10}
                  /* min und max können nicht aus dem state-objekt gezogen werden! */
                  max={20}
                  onChange={handleChange}
                  value={state.idPwdLengthValue}
               /* wird nicht aktuell an die UI weitergegeben */
               /* no change of state-object */
               /* onChangeCommitted={handleChange} */

               />
               <Typography>
                  {state.idPwdLengthValue}
               </Typography>
            </Stack>
            <Stack direction="col" sx={{ border: '1px dashed red' }}>
               <Typography sx={{ width: '100%' }}>
                  Set other input:
               </Typography>
            </Stack>
            <Tooltip title="slider" arrow>
               <Stack direction="col" sx={{ width: '50%', border: '1px dashed red' }}>
                  <Slider
                     name='idOtherInput'
                     aria-label="Slider otherInput"
                     defaultValue={10}
                     valueLabelDisplay="auto"
                     step={1}
                     marks
                     min={10}
                     max={20}
                     sx={{
                        color: 'lightgreen',
                        '&:hover': {
                           bgcolor: 'secondary.light',
                        }
                     }}
                     onChange={handleChange}
                     value={state.idOtherInput}
                  />
                  <Typography>
                     {state.idOtherInput}
                  </Typography>
               </Stack>
            </Tooltip>
         </Stack>  {/* Stack for one row with Sliders*/}
      </div>
   )
}  // TestSlider()