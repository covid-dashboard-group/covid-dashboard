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

const { REACT_APP_MAPBOX_APIKEY, REACT_APP_NEWS_API, REACT_APP_COVID_ACT_NOW} = process.env;

function App() {
  const [state, setState]=useState('')
  const [pos, setPos]= useState({longitude:null,latitude:null})
  const [natData, setNatData]=useState({})
  const [allStatesData, setAllStatesData]=useState([])
  const [stateData, setStateData]=useState({})
  const [countyData, setCountyData]= useState([])
  const [news, setNews]=useState([])
  const [tweets, setTweets]=useState([])
  
  
  const successLocation=(e)=>{
    console.log('location found')
    const {longitude,latitude}=e.coords
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${REACT_APP_MAPBOX_APIKEY}`)
    .then(res=>{
      console.log(res.data.features)
      let placeArray=res.data.features[res.data.features.length-2].place_name.split(',')[0]
      setState(stateInverter(placeArray,statesAbb))
      console.log(state)
      getLocalNews(placeArray)
    })
    .catch(e=>console.log(e))
  }

  const errorLocation=(e)=>{
    console.log('location not provided')
    getNationalNews()
  }

  //Get Location
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successLocation,errorLocation)
  },[])
  // Get National Data

  useEffect(()=>{    
    axios.get('https://covid-19.dataflowkit.com/v1/usa')
    .then(res=>setNatData(res.data))
    .catch(e=>console.log(e))
  },[])

  //Get State Data
  useEffect(()=>{
    console.log('getting states')
    axios.get('api/daily/states')
    .then(res=>setAllStatesData(res.data))      
    .catch(e=>console.log(e))
  },[])

  //once state and natData available, filter to get the state data

  useEffect(()=>{
    if(state&&allStatesData){
      console.log('setting state data')
      setStateData(allStatesData.filter(e=>e.state===state)[0])     
    }    
  },[state,allStatesData])

  //news

  const getLocalNews=(inputState)=>{
    axios.get(`https://newsapi.org/v2/everything?q=${'COVID '+inputState}&sortBy=publishedAt&apiKey=${REACT_APP_NEWS_API}&pageSize=100&page=1`)
    .then(res=>setNews(res.data))
    .catch(e=>console.log(e))
  }
  const getNationalNews=()=>{
    axios.get(`https://newsapi.org/v2/everything?q=COVID United States&sortBy=publishedAt&apiKey=${REACT_APP_NEWS_API}&pageSize=100&page=1`)
    .then(res=>setNews(res.data))
    .catch(e=>console.log(e))
  }
  //twitter
  // useEffect(()=>{
  //   axios.get(`/api/tweets`)
  //   .then(res=>setTweets(res.data))
  //   .catch(e=>console.log(e))
  // },[])
  //county data
  useEffect(()=>{
    axios.get(`https://api.covidactnow.org/v2/counties.json?apiKey=${REACT_APP_COVID_ACT_NOW}`)
    .then(res=>setCountyData(res.data))
    .catch(e=>console.log(e))
  },[])

  return (
    <div className="App">
      <Header natData={natData}/>
      <Container className='display' fluid>
        <Row>
          <Col xs={12} md={3} className='Col'>
            <Data />
          </Col>
          <Col xs={12} md={6} className='Col'>
            <Visuals
            allStatesData={allStatesData}
            countyData={countyData} />
          </Col>
          <Col xs={12} md={3} className='Col'>
            <Media news={news}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
