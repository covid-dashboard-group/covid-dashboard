import React, {useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import {Table} from "react-bootstrap";
import stateInverter from "../../utils/stateInverter.js";
import statesAbb from "../../utils/statesAbb.json";
import axios from "axios";
import Loading from '../Loading'

const StateData = (props) => {
  const [finalData, setFinalData] =useState([]);

  useEffect(() => {
      axios
          .get("https://api.covidtracking.com/v1/states/current.json")
          .then((res) => {
              // console.log(res.data);
              let statesData = [];

              let indivStates = {
                  stateName: "state",
                  positiveTotal: 0,
                  positiveIncrease: 0
              };
          
              for(let i = 0; i < res.data.length; i++) {
                  statesData.push({...indivStates});
                  statesData[i].stateName = stateInverter(res.data[i].state, statesAbb);
                  statesData[i].positiveTotal = res.data[i].positive;
                  statesData[i].positiveIncrease = res.data[i].positiveIncrease;
              }

              // console.log(statesData);
              setFinalData(statesData);
          })
  }, [])

  const renderData = (data, index) => {
    return (
        <tr key={index}>
            <td className='state-name'>{data.stateName}</td>
            <td>{data.positiveTotal}</td>
            <td>{data.positiveIncrease}</td>
        </tr>
    )
}
  return (
    <Container className='StateData'>
              <Table
                striped
                >
                  <thead
                    className='state-table-header'
                    >
                    <th>State</th>
                    <th>Positive Total</th>
                    <th>Positive Increase</th>
                </thead>
                    {finalData ? 
                  <tbody
                    className='state-table-body'
                  >
                    {finalData.map(renderData)}
                </tbody>
                    : <Loading />}
            </Table>
    </Container>
  )
}

export default StateData