import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import NetPositiveGraph from './GraphComponents/NetPositiveGraph'
import DeathsGraph from './GraphComponents/DeathsGraph'

const Graph = (props) => {

  return (
    <Tabs
      defaultActiveKey='netPositive'
      className='Graph'
    >
      <Tab
        eventKey='netPositive'
        title='Net Positive'
        className='GraphTab'
      >
        <NetPositiveGraph />
      </Tab>
      <Tab
        eventKey='deaths'
        title='Deaths'
        className='GraphTab'
      >
        <DeathsGraph />
      </Tab>
    </Tabs>
  )
}

export default Graph