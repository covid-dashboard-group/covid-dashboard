
import React, { useEffect, useRef } from 'react'
import dotenv from 'dotenv'
import mapboxgl from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css";

const { REACT_APP_MAPBOX_APIKEY} = process.env;

const Map = (props) => {
  const mapContainer = useRef("");   
    
    mapboxgl.accessToken = REACT_APP_MAPBOX_APIKEY

    const styles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px"        
    };
    useEffect(()=>{
        let map=new mapboxgl.Map({
            container:mapContainer.current,
            style:'mapbox://styles/mapbox/streets-v11',
            center:[-111,33],
            zoom:3
        })
      },[])
  return (
    
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    
  )
}

export default Map