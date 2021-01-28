import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import NetPositiveGraph from './GraphComponents/NetPositiveGraph'

const Graph = (props) => {

  return (
    <Tabs
      defaultActiveKey='netPositive'
    >
      <Tab
        eventKey='netPositive'
        title='Net Positive'
      >
        <NetPositiveGraph />
      </Tab>
      </Tabs>  
  )
}

export default Graph