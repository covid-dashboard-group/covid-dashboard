import React from "react";
import { Tabs, Tab, Container, DropdownButton, Dropdown } from "react-bootstrap";
import NetPositiveGraph from './GraphComponents/NetPositiveGraph'
import DeathsGraph from './GraphComponents/DeathsGraph'
import CumulativeGraph from "./GraphComponents/CumulativeGraph";
import PercentChangeGraph from "./GraphComponents/PercentChange";
import HospitalizedGraph from "./GraphComponents/HospitalizedGraph";

const Graph = (props) => {

  return (
    <Container className='Graph'>
      <Tabs
        defaultActiveKey='netPositive'
        className='GraphTabs'
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
        <Tab
          eventKey="cumulative"
          title="Cumulative"
          className="GraphTab"
        >
          <CumulativeGraph />
        </Tab>
        <Tab
          eventKey="percentChange"
          title="7-Day Change"
          className="GraphTab"
        >
          <PercentChangeGraph />
        </Tab>
        <Tab
          eventKey="hospitalized"
          title="Currently Hospitalized"
          className="GraphTab"
        >
          <HospitalizedGraph />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default Graph