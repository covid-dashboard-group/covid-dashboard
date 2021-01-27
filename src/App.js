import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import Data from './Components/Data'
import Visuals from './Components/Visuals'
import Media from './Components/Media'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import dotenv from 'dotenv'
import statesAbb from './utils/statesAbb.json'
import stateInverter from './utils/stateInverter'

const { REACT_APP_MAPBOX_APIKEY} = process.env;

function App() {
  const [state, setState]=useState('')
  const [pos, setPos]= useState({longitude:null,latitude:null})
  const [natData, setNatData]=useState({})
  const [allStatesData, setAllStatesData]=useState([])
  const [stateData, setStateData]=useState({})
  
  const successLocation=(e)=>{
    console.log('location found')
    const {longitude,latitude}=e.coords
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${REACT_APP_MAPBOX_APIKEY}`)
    .then(res=>{
      console.log(res.data.features)
      let placeArray=res.data.features[res.data.features.length-2].place_name.split(',')[0]
      setState(stateInverter(placeArray,statesAbb))
      console.log(state)
             
    })
    .catch(e=>console.log(e))

  }

  const errorLocation=(e)=>{
    console.log('location not provided')
  }

  //Get Location
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successLocation,errorLocation)
  },[])
  //Get National Data
  useEffect(()=>{
    axios.get('api/daily/national')
    .then(res=>setNatData(res.data))
    .catch(e=>console.log(e))
  },[])
  //Get State Data
  useEffect(()=>{
    axios.get('api/daily/states')
    .then(res=>{
      setAllStatesData(res.data)      
    })
      
    .catch(e=>console.log(e))
  },[])
  //alert to test the timing. can be turned off if annoying
  useEffect(()=>{
    state&&
    axios.get(`api/daily/states?q=${state}`)
    .then(res=>setStateData(res.data))
    .catch(e=>console.log(e))
  console.log(stateData)    
  },[state])

  return (
    <div className="App">
      <Header />
      <Container className='display' fluid>
        <Row>
          <Col xs={12} md={3} className='Data'>
            <Data />
          </Col>
          <Col xs={12} md={6} className='Visuals'>
            <Visuals />
          </Col>
          <Col xs={12} md={3} className='Media'>
            <Media />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
