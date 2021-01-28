import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import NetPositiveGraph from './GraphComponents/NetPositiveGraph'

const Graph = (props) => {

  return (
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

      </Tab>
    </Tabs>
  )
}

export default Graph