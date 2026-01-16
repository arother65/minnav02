
// created with util SASS from SCSS-source code
import './BootstrapCarousel.css'

import logo192 from '../carouselPics/logo192.png'
// import flagDE334px200px from '../carouselPics/'

import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import ReactSpeedometer from "react-d3-speedometer"
import GaugeComponent from 'react-gauge-component'
import { LineChart } from "@mui/x-charts/LineChart"
import { Gauge } from "@mui/x-charts/Gauge"

//
export default function BootstrapCarousel() {

   return (
      <>
         <Stack
            direction="row"
            spacing={1}
            sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row', justifyContent: 'center' }}>
            
            <Tooltip title='Carousel01 made with Bootstrap'>
               <div id="idCarousel01" className="carousel slide border border-success-subtle">
                  <div className="carousel-indicators">
                     <button type="button" data-bs-target="#idCarousel01" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                     <button type="button" data-bs-target="#idCarousel01" data-bs-slide-to="1" aria-label="Slide 2"></button>
                     <button type="button" data-bs-target="#idCarousel01" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                     <div className="carousel-item active">
                        <img src={logo192} className="d-block w-100" alt="not loaded" />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>First slide label</h5>
                           <p>Some representative placeholder content for the first slide.</p>
                        </div>
                     </div>
                     <div className="carousel-item">
                        <img src='null' className="d-block w-100" alt="not loaded" />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>Second slide label</h5>
                           <p>Some representative placeholder content for the second slide.</p>
                        </div>
                     </div>
                     <div className="carousel-item">
                        <img src="null" className="d-block w-100" alt="not loaded" />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>Third slide label</h5>
                           <p>Some representative placeholder content for the third slide.</p>
                        </div>
                     </div>
                  </div>

                  <button className="text-bg-dark carousel-control-prev" type="button" data-bs-target="#idCarousel01" data-bs-slide="prev">
                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="text-bg-dark carousel-control-next" type="button" data-bs-target="#idCarousel01" data-bs-slide="next">
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Next</span>
                  </button>
               </div>
            </Tooltip>
         </Stack>

         {/* using a overridden color "$primary" from SCSS-file: no effect */}
         <div className="row border bg-primary shadow-lg"><p>bg-primary</p></div>

         <Stack
            direction="row"
            spacing={1}
            /* 				sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row', justifyContent: 'center' }}> */
            sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row' }}
         >
            <Tooltip title='Carousel02 made with Bootstrap' arrow followCursor>
               <div id="idCarousel02" className="carousel slide border border-success-subtle rounded shadow">
                  <div className="carousel-indicators">
                     <button type="button" data-bs-target="#idCarousel02" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                     <button type="button" data-bs-target="#idCarousel02" data-bs-slide-to="1" aria-label="Slide 2"></button>
                     <button type="button" data-bs-target="#idCarousel02" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                     <div className="carousel-item active">
                        {/* <img src={logo192} className="d-block w-100" alt="not loaded" /> */}
                        <Gauge
                           className='bg-primary-subtle border border-danger-subtle shadow rounded'
                           value={75}
                           width={100}
                           height={100}
                           startAngle={0}
                           endAngle={360}
                        />
                     </div>

                     <div className="carousel-item">
                        <img src={''} className="d-block w-100" alt="not loaded" />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>Second slide label</h5>
                           <p>Some representative placeholder content for the second slide.</p>
                        </div>
                     </div>
                     <div className="carousel-item">
                        <img src="null" className="d-block w-100" alt="not loaded" />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>Third slide label</h5>
                           <p>Some representative placeholder content for the third slide.</p>
                        </div>
                     </div>
                  </div>

                  <button className="carousel-control-prev text-bg-warning  rounded" type="button" data-bs-target="#idCarousel02" data-bs-slide="prev">
                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next text-bg-warning rounded" type="button" data-bs-target="#idCarousel02" data-bs-slide="next">
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Next</span>
                  </button>
               </div>
            </Tooltip>
         </Stack>

         <Stack
            direction="row"
            spacing={1}
            /* sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row', justifyContent: 'center' }}> */
            sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row' }}
         >
            <div className="col">
               <p>180x180</p>
               <ReactSpeedometer
                  width={180}
                  height={180}
                  maxValue={100}
                  value={65}
                  needleColor="black"
                  startColor="red"
                  endColor="green"
                  needleTransition="easeElastic"
                  needleTransitionDuration={2000}
               />
            </div>

            <div className="col">
               <p>250x250</p>
               <ReactSpeedometer
                  width={250}
                  height={250}
                  maxValue={100}
                  value={50}
                  needleColor="orange"
                  startColor="grey"
                  endColor="black"
               />
            </div>

            {/* Component with default values */}
            <GaugeComponent
               type='semicircle'
               labels={{
                  tickLabels: {
                     type: "outer",
                     ticks: [
                        { value: 0 },
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                        { value: 100 },
                        // { valueConfig: { fontSize: 10, color: green[900] } }  // errs
                     ],
                     defaultTickValueConfig: {
                        // style: { fontSize: "10px", color: 'black' }, // errs 
                        // hide: false  // ok
                     },
                     defaultTickLineConfig: {
                        width: 1,
                        color: "white"
                     }
                  }
               }}
               arc={{
                  subArcs: [
                     {
                        limit: 20,
                        color: '#EA4228',
                        showTick: true
                     },
                     {
                        limit: 40,
                        color: '#F58B19',
                        showTick: true
                     },
                     {
                        limit: 60,
                        color: '#F5CD19',
                        showTick: true
                     },
                     {
                        limit: 80,
                        color: '#5BE12C',
                        showTick: true
                     },
                     {
                        limit: 100,
                        color: 'rgba(40, 140, 0, 1)',
                        showTick: true
                     },
                  ]
               }}
               pointer={{ type: 'needle' }}
               value={50}
            />
         </Stack>  {/* row */}

         <Stack
            direction="row"
            spacing={1}
            sx={{ width: '100%', border: '3px dashed grey', flexDirection: 'row' }}
         >
            <div className='col w-100'>
               <LineChart
                  className='bg-warning-subtle border border-danger-subtle shadow rounded'
                  xAxis={[{ data: [1, 2, 3, 4] }]}
                  series={[{ data: [10, 30, 20, 40] }]}
                  width={200}
                  height={100}
               />
            </div> {/* col */}

            <div className='col w-100'>
               <div className="card align-items-center">
                  <Gauge
                     className='bg-primary-subtle border border-danger-subtle shadow rounded'
                     // position-absolute top-150 start-150 translate-middle'
                     value={65}
                     width={100}
                     height={100}
                     startAngle={0}
                     endAngle={360}
                  />
                  <div className="card-body w-100 bg-success-subtle rounded"
                     id='idCardBodyGauge'
                     onMouseOver={() => {
                        const ele = document.getElementById('idCardBodyGauge')
                        let classList = ele.getAttribute('class')
                        classList = ''
                        // classList = 'card-body w-100 bg-warning shadow rounded z-2 position-absolute top-0 start-50'
                        classList = 'card-body w-100 bg-warning shadow rounded'
                        ele.setAttribute('class', classList)
                     }}
                     onMouseOut={() => {
                        const ele = document.getElementById('idCardBodyGauge')
                        let classList = ele.getAttribute('class')
                        classList = ''
                        classList = 'card-body w-100 bg-success-subtle rounded'
                        ele.setAttribute('class', classList)
                     }}
                  >
                     <p className="card-text">MUI-X Gauge control.</p>
                  </div> {/* card-body */}
               </div> {/* card */}
            </div> {/* col */}
         </Stack> {/* row */}
      </>
   )  // return()
}  // BootstrapCarousel ()