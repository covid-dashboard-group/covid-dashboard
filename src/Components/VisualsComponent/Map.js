
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import dotenv from 'dotenv'
import mapboxgl from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';

const { REACT_APP_MAPBOX_APIKEY } = process.env;

const Map = (props) => {
  const mapContainer = useRef("");
  const [stateGeojson,setStateGeojson]=useState({})

  mapboxgl.accessToken = REACT_APP_MAPBOX_APIKEY
  var zoomThreshold = 4;

  const styles = {
    width: "100%",
    height: "42vh",
    borderRadius: "10px",
  };
  useEffect(()=>{
    axios.get('https://persona-project.s3-us-west-1.amazonaws.com/gz_2010_us_040_00_20m.json')
    .then(res=>setStateGeojson(res.data))
    .catch(e=>console.log(e))
  },[])

  useEffect(()=>{
    if(stateGeojson&&props.allStatesData.length>0){
      console.log('got both')
      console.log('geo',stateGeojson)
      console.log('props',props.allStatesData)
    } 
  },[setStateGeojson,props.allStatesData])
  useEffect(() => {
    

    let map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-111, 33],
      zoom: 3
    })
    map.on('load', function () {
      map.addSource('population', {
          'type': 'vector',
          'url': 'mapbox://mapbox.660ui7x6'
      });
      
      
      map.addLayer(
          {
              'id': 'state-population',
              'source': 'population',
              'source-layer': 'state_county_population_2014_cen',
              'maxzoom': zoomThreshold,
              'type': 'fill',
              'filter': ['==', 'isState', true],
              'paint': {
                  'fill-color': [
                      'interpolate',
                      ['linear'],
                      ['get', 'population'],
                      0,
                      '#F2F12D',
                      500000,
                      '#EED322',
                      750000,
                      '#E6B71E',
                      1000000,
                      '#DA9C20',
                      2500000,
                      '#CA8323',
                      5000000,
                      '#B86B25',
                      7500000,
                      '#A25626',
                      10000000,
                      '#8B4225',
                      25000000,
                      '#723122'
                  ],
                  'fill-opacity': 0.75
              }
          },
          'waterway-label'
      );

      map.addLayer(
          {
              'id': 'county-population',
              'source': 'population',
              'source-layer': 'state_county_population_2014_cen',
              'minzoom': zoomThreshold,
              'type': 'fill',
              'filter': ['==', 'isCounty', true],
              'paint': {
                  'fill-color': [
                      'interpolate',
                      ['linear'],
                      ['get', 'population'],
                      0,
                      '#F2F12D',
                      100,
                      '#EED322',
                      1000,
                      '#E6B71E',
                      5000,
                      '#DA9C20',
                      10000,
                      '#CA8323',
                      50000,
                      '#B86B25',
                      100000,
                      '#A25626',
                      500000,
                      '#8B4225',
                      1000000,
                      '#723122'
                  ],
                  'fill-opacity': 0.75
              }
          },
          'waterway-label'
      );
  });

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
  // });
  }, [])

  return (
    <Container className='Map'>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </Container>
  )
}

export default Map