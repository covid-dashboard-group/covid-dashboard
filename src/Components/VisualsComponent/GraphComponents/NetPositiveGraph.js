import React, {useState, useEffect} from "react";
import { ResponsiveLine } from '@nivo/line';
import axios from "axios";

const NetPositiveGraph = (props) => {
  const [finalData, setFinalData] = useState([]);
    
  const dateFormat = (date) => {
      let strDate = date.toString();
      let strYear = strDate.substring(0, 4);
      let strMonth = strDate.substring(4, 6);
      let strDay = strDate.substring(strDate.length - 2, strDate.length);
    //   console.log(strYear, strMonth, strDay)

      return `${strMonth}/${strDay}/${strYear}`;
  }

  useEffect(() => {
      axios
          .get("https://api.covidtracking.com/v1/us/daily.json")
          .then((res) => {
              let formattedData = [
                  {
                      id: "Positive",
                      data: []
                  },
              ];
          
              let values = {
                  x: "date",
                  y: 0
              };

              for(let i = 0; i < res.data.length; i++) {
                  formattedData[0].data.push({...values});
                  formattedData[0].data[i].x = dateFormat(res.data[res.data.length - (i + 1)].date);
                  formattedData[0].data[i].y = res.data[res.data.length - (i + 1)].positiveIncrease;
              }
              setFinalData(formattedData);
          })
  }, [finalData])

  return (
      <div className="netPositive-graph">
          {finalData ?  
              <ResponsiveLine
                  data={finalData}
                  margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 0, max: 300000, stacked: true, reverse: false }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={
                      // orient: 'bottom',
                      // tickSize: 5,
                      // tickPadding: 5,
                      // tickRotation: 0,
                      // legend: 'Date',
                      // legendOffset: 36,
                      // legendPosition: 'middle'
                      null
                  }
                  gridXValues={["01/08/2020"]}
                  axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Increase in Cases",
                      legendOffset: -70,
                      legendPosition: 'middle'
                  }}
                  enableGridX={false}
                  pointSize={1}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  enableArea={true}
                  useMesh={true}
                  legends={[
                      {
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 100,
                          translateY: 0,
                          itemsSpacing: 0,
                          itemDirection: 'left-to-right',
                          itemWidth: 80,
                          itemHeight: 20,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: 'circle',
                          symbolBorderColor: 'rgba(0, 0, 0, .5)',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemBackground: 'rgba(0, 0, 0, .03)',
                                      itemOpacity: 1
                                  }
                              }
                          ]
                      }
                  ]}
              />
          : null}
      </div>
  )
}

export default NetPositiveGraph