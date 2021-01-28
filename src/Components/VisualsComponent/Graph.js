import React from "react";
import { Tabs, Tab, Container, DropdownButton, Dropdown } from "react-bootstrap";
import NetPositiveGraph from './GraphComponents/NetPositiveGraph'
import DeathsGraph from './GraphComponents/DeathsGraph'

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
      </Tabs>
    </Container>
  )
}

export default Graph