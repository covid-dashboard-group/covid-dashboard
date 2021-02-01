
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import dotenv from 'dotenv'
import mapboxgl from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';
import statesAbb from '../../utils/statesAbb.json'
import stateInverter from '../../utils/stateInverter'


const { REACT_APP_MAPBOX_APIKEY } = process.env;

const Map = (props) => {
  const mapContainer = useRef("");
  const [stateGeojson,setStateGeojson]=useState({})

  const geoMaker=(geoData,covidData)=>{
      for(let i=0;i<geoData.features.length;i++){
        for(let j=0;j<props.allStatesData.length;j++){
          if(geoData.features[i].properties['NAME']===stateInverter(props.allStatesData[j].state,statesAbb)){
              geoData.features[i].properties={...geoData.features[i].properties,...props.allStatesData[j],isState:true}
          }

        }
      }
    

    return geoData
  }

  mapboxgl.accessToken = REACT_APP_MAPBOX_APIKEY
  var zoomThreshold = 4;

  const styles = {
    width: "100%",
    height: "42vh",
    borderRadius: "10px",
  };
  useEffect(()=>{
    axios.get('https://persona-project.s3-us-west-1.amazonaws.com/gz_2010_us_040_00_20m.json')
    .then(res=>{
      let geoTotal=geoMaker(res.data,props.allStatesData)
      setStateGeojson(geoTotal)})
    .catch(e=>console.log(e))
  },[props.allStatesData])

  useEffect(()=>{
    if(stateGeojson&&props.allStatesData.length>0){
      console.log('got both')
      console.log('geo',stateGeojson)
      console.log('props',props.allStatesData)
    } 
  },[setStateGeojson,props.allStatesData])
  useEffect(() => {
    if (stateGeojson){

      
      let map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-111, 33],
        zoom: 3
      })

      
      map.on('load', function () {
        map.addSource('statesGeo', {
          'type': 'geojson',
          'data': stateGeojson
        });    
        
        // map.addLayer({
        //   'id':'first',
        //   'source':'statesGeo',
        //   // "source-layer": 'properties',
        //   'type':'symbol',
        //   // 'paint': 
        //   //       {
            
        //     //           'fill-opacity': 0.75
        //     //       },
        //     'layout': {
        //       "text-field":['get','positive']
        //     }
        //   })
          
          map.addLayer({
              'id':'seconds',
              'source':'statesGeo',
              // "source-layer": 'properties',
              'type':'fill',
              'paint': 
                    {
                      'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'positive'],
                        0,
                        '#E9F268',
                        50000,
                        '#E9D95E',
                        75000,
                        '#E8BF53',
                        100000,
                        '#E8A649',
                        250000,
                        '#E88C3E',
                        500000,
                        '#E77334',
                        750000,
                        '#E75929',
                        1000000,
                        '#E7401F',
                        2500000,
                        '#E60D0A'
                    ],
                          'fill-opacity': 0.80
                      },                      
                })
                
                // map.addLayer(
                  //     {
                    //         'id': 'state-population',
                    //         'source': 'population',
                    //         'source-layer': 'CENSUSAREA',
                    //         // 'maxzoom': zoomThreshold,
                    //         'type': 'fill',
                    //         // 'filter': ['==', 'isState', true],
                    // 'paint': 
                    // {
                          // 'fill-color': [
                          //       'interpolate',
                          //       ['linear'],
                          //       ['get', 'population'],
                          //       0,
                          //       '#F2F12D',
                          //       500000,
                          //       '#EED322',
                          //       750000,
                          //       '#E6B71E',
                          //       1000000,
                          //       '#DA9C20',
                          //       2500000,
                          //       '#CA8323',
                          //       5000000,
                          //       '#B86B25',
                          //       7500000,
                          //       '#A25626',
                          //       10000000,
                          //       '#8B4225',
                          //       25000000,
                          //       '#723122'
                          //   ],
                        //     'fill-opacity': 0.75
                        // }
                        //     },
                        //     'waterway-label'
                        // );
                        
                        //     // map.addLayer(
                          //     //     {
                            //     //         'id': 'county-population',
                            //     //         'source': 'population',
                            //     //         'source-layer': 'state_county_population_2014_cen',
                            //     //         'minzoom': zoomThreshold,
                            //     //         'type': 'fill',
                            //     //         'filter': ['==', 'isCounty', true],
                            //     //         'paint': {
                              //     //             'fill-color': [
                                //     //                 'interpolate',
                                //     //                 ['linear'],
                                //     //                 ['get', 'population'],
                                //     //                 0,
                                //     //                 '#F2F12D',
                                //     //                 100,
                                //     //                 '#EED322',
                                //     //                 1000,
                                //     //                 '#E6B71E',
                                //     //                 5000,
                                //     //                 '#DA9C20',
                                //     //                 10000,
                                //     //                 '#CA8323',
                                //     //                 50000,
                                //     //                 '#B86B25',
                                //     //                 100000,
                                //     //                 '#A25626',
                                //     //                 500000,
                                //     //                 '#8B4225',
                                //     //                 1000000,
                                //     //                 '#723122'
                                //     //             ],
                                //     //             'fill-opacity': 0.75
                                //     //         }
                                //     //     },
                                //     //     'waterway-label'
                                //     // );
  // });
  
  // var stateLegendEl = document.getElementById('state-legend');
  // var countyLegendEl = document.getElementById('county-legend');
  // map.on('zoom', function () {
    //     if (map.getZoom() > zoomThreshold) {
      //         stateLegendEl.style.display = 'none';
      //         countyLegendEl.style.display = 'block';
      //     } else {
  //         stateLegendEl.style.display = 'block';
  //         countyLegendEl.style.display = 'none';
  //     }
});
}
}, [stateGeojson])

return (
  <Container className='Map'>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div id="state-legend" class="legend">
    <h4>Population</h4>
    <div><span style={{backgroundColor: '#e60d0a'}}></span>2,500,000</div>
    <div><span style={{backgroundColor: '#e7401f'}}></span>1,000,000</div>
    <div><span style={{backgroundColor: '#e75929'}}></span>750,000</div>
    <div><span style={{backgroundColor: '#e77334'}}></span>500,000</div>
    <div><span style={{backgroundColor: '#e88c3e'}}></span>250,000</div>
    <div><span style={{backgroundColor: '#e8a649'}}></span>100,000</div>
    <div><span style={{backgroundColor: '#e8bf53'}}></span>75,000</div>
    <div><span style={{backgroundColor: '#e9d95e'}}></span>50,000</div>    
</div>
    </Container>
  )
}

export default Map