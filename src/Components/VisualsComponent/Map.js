
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
  const [stateGeojson, setStateGeojson] = useState({})
  const [countyGeojson, setCountyGeojson] = useState({})

  const geoMaker = (geoData, covidData) => {
    for (let i = 0; i < geoData.features.length; i++) {
      for (let j = 0; j < props.allStatesData.length; j++) {

        if (geoData.features[i].properties['NAME'] === stateInverter(props.allStatesData[j].state, statesAbb)) {
          geoData.features[i].properties = { ...geoData.features[i].properties, ...props.allStatesData[j], isState: true }
        }

      }
    }


    return geoData
  }
  const countyGeoMaker = (geoData) => {
    for (let i = 0; i < geoData.features.length; i++) {
      for (let j = 0; j < props.countyData.length; j++) {

        if (geoData.features[i].properties['AFFGEOID'].includes(`US${props.countyData[j]['fips']}`)) {
          geoData.features[i].properties = { ...geoData.features[i].properties, ...props.countyData[j], ...props.countyData[j].metrics, isCounty: true }
        }
      }
    }
    return geoData
  }

  mapboxgl.accessToken = REACT_APP_MAPBOX_APIKEY
  const zoomThreshold = 4;

  const styles = {
    width: "100%",
    height: "42vh",
    borderRadius: "10px",
  };

  useEffect(() => {
    axios.get('https://persona-project.s3-us-west-1.amazonaws.com/gz_2010_us_040_00_20m.json')
      .then(res => {
        let geoTotal = geoMaker(res.data, props.allStatesData)
        setStateGeojson(geoTotal)
      })
      .catch(e => console.log(e))
  }, [props.allStatesData])

  useEffect(() => {
    axios.get('https://persona-project.s3-us-west-1.amazonaws.com/cb_2018_us_county_20m.geojson')
      .then(res => {
        let geoTotal = countyGeoMaker(res.data, props.countyData)
        setCountyGeojson(geoTotal)
      })
      .catch(e => console.log(e))
  }, [props.countyData])


  useEffect(() => {
    if (stateGeojson && props.allStatesData.length > 0) {
      // console.log('got both')
      // console.log('geo',stateGeojson)
      // console.log('props',props.allStatesData)
    }
  }, [setStateGeojson, props.allStatesData])

  // useEffect(()=>{
  //   axios.get()
  // })
  useEffect(() => {
    if (stateGeojson && countyGeojson) {


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
        map.addSource('cb_2018_us_county_20m', {
          'type': 'geojson',
          'data': countyGeojson
        })

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
          'id': 'seconds',
          'source': 'statesGeo',
          // "source-layer": 'properties',
          'type': 'fill',
          'filter': ['==', 'isState', true],
          'maxzoom': zoomThreshold,
          'paint':
          {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'positive'],
              0,
              '#F1EC56',
              50000,
              '#F0D04D',
              75000,
              '#EEB443',
              100000,
              '#ED983A',
              250000,
              '#EC7D30',
              500000,
              '#EA6127',
              750000,
              '#E9451D',
              1000000,
              '#E72914',
              2500000,
              '#E60D0A'
            ],
            'fill-opacity': 0.75
          },
        })

        // map.addLayer(
        //     {
        //         'id': 'state-population',
        //         'source': 'population',
        //         'source-layer': 'CENSUSAREA',
        //         // 'maxzoom': zoomThreshold,
        //         'type': 'fill',
        // 'filter': ['==', 'isState', true],
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

        map.addLayer(
          {
            'id': 'county-population',
            'source': 'cb_2018_us_county_20m',
            'minzoom': zoomThreshold,
            'type': 'fill',
            'filter': ['==', 'isCounty', true],
            'paint': {
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'caseDensity'],
                0,
                '#F1EC56',
                25,
                '#F0D04D',
                50,
                '#EEB443',
                75,
                '#ED983A',
                100,
                '#EC7D30',
                125,
                '#EA6127',
                150,
                '#E9451D',
                175,
                '#E72914',
                200,
                '#E60D0A'
              ],
              'fill-opacity': 0.75
            }
          },
          'waterway-label'
        );
        // });

        const stateLegendEl = document.getElementById('state-legend');
        const countyLegendEl = document.getElementById('county-legend');

        const stateHover =
          map.on('zoom', function () {
            if (map.getZoom() > zoomThreshold) {
              stateLegendEl.style.display = 'none';
              countyLegendEl.style.display = 'block';
              map.on('mousemove', (e) => {
                const counties = map.queryRenderedFeatures(e.point, {
                  layers: ['county-population']
                })
                if (counties.length > 0) {
                  document.getElementById('pd').innerHTML = '<h3><strong>' + counties[0].properties.county + '</strong></h3><p><strong><em>' + counties[0].properties.caseDensity.toFixed(2) + '</strong> Case Density</em></p>' + ((counties[0].properties.icuCapacityRatio !== 'null') ? ('<strong><em>' + counties[0].properties.icuCapacityRatio.toFixed(2) + '</strong> icuCapacityRatio</em></p>') : '<p>Unavailable</p>')

                }
                else {
                  document.getElementById('pd').innerHTML = '<p>Hover over a county!</p>';
                }
              })
            } else {
              stateLegendEl.style.display = 'block';
              countyLegendEl.style.display = 'none';

              map.on('mousemove', (e) => {
                const states = map.queryRenderedFeatures(e.point, {
                  layers: ['seconds']
                })

                if (states.length > 0) {
                  document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.NAME + '</strong></h3><p><strong><em>' + states[0].properties.positive + '</strong> Positive</em></p><p><strong><em>' + (+states[0].properties.hospitalized || +states[0].properties.hospitalizedCumulative || +states[0].properties.hospitalizedCurrently) + '</strong> Hospitalized</em></p>'

                }
                else {
                  document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
                }
              })
            }
          })
        map.on('mousemove', (e) => {
          const states = map.queryRenderedFeatures(e.point, {
            layers: ['seconds']
          })
          // const counties=map.queryRenderedFeatures(e.point, {
          //   layers: ['seconds','county-population']
          // })
          if (states.length > 0) {
            document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.NAME + '</strong></h3><p><strong><em>' + states[0].properties.positive + '</strong> Positive</em></p><p><strong><em>' + (+states[0].properties.hospitalized || +states[0].properties.hospitalizedCumulative || +states[0].properties.hospitalizedCurrently) + '</strong> Hospitalized</em></p>'

          }
          //  if(map.getZoom() > zoomThreshold&&counties.length>0){    
          //    console.log(map.getZoom())  
          //   document.getElementById('pd').innerHTML = '<h3><strong>' + counties[0].properties.county + '</strong></h3><p><strong><em>' + counties[0].properties.caseDensity + '</strong> Case Density</em></p>'

          // }
          else {
            document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
          }

        })
      });
    }
  }, [stateGeojson, countyGeojson])

  return (
    <Container className='Map'>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <div id="state-legend" className="legend">
        <h4>Population</h4>
        <div><span style={{ backgroundColor: '#E60D0A' }}></span>2,500,000</div>
        <div><span style={{ backgroundColor: '#E72914' }}></span>1,000,000</div>
        <div><span style={{ backgroundColor: '#E9451D' }}></span>750,000</div>
        <div><span style={{ backgroundColor: '#EA6127' }}></span>500,000</div>
        <div><span style={{ backgroundColor: '#EC7D30' }}></span>250,000</div>
        <div><span style={{ backgroundColor: '#ED983A' }}></span>100,000</div>
        <div><span style={{ backgroundColor: '#EEB443' }}></span>75,000</div>
        <div><span style={{ backgroundColor: '#F0D04D' }}></span>50,000</div>
        <div><span style={{ backgroundColor: '#F1EC56' }}></span>0</div>
      </div>
      <div id="county-legend" className="legend" style={{ display: 'none' }}>
        <h4>Case Density</h4>
        <div><span style={{ backgroundColor: '#E60D0A' }}></span>200</div>
        <div><span style={{ backgroundColor: '#E72914' }}></span>175</div>
        <div><span style={{ backgroundColor: '#E9451D' }}></span>150</div>
        <div><span style={{ backgroundColor: '#EA6127' }}></span>125</div>
        <div><span style={{ backgroundColor: '#EC7D30' }}></span>100</div>
        <div><span style={{ backgroundColor: '#ED983A' }}></span>75</div>
        <div><span style={{ backgroundColor: '#EEB443' }}></span>50</div>
        <div><span style={{ backgroundColor: '#F0D04D' }}></span>25</div>
        <div><span style={{ backgroundColor: '#F1EC56' }}></span>0</div>
      </div>

      <div className='map-overlay' id='features'>
        <h5>US Population Density</h5>
        <div id='pd'>
          <p>Hover over a state!</p>
        </div>
      </div>


    </Container>
  )
}

export default Map