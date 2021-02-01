import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {ResponsiveLine} from "@nivo/line";
import axios from "axios";
import Loading from "../../Loading";

const PercentChange = (props) => {
    const [finalData, setFinalData] = useState([]);

    const dateFormat = (date) => {
        let strYear = date.substring(0, 4);
        let strMonth = date.substring(5, 7);
        let strDay = date.substring(date.length - 2, date.length);

        return `${strMonth}/${strDay}/${strYear}`;
    }

    useEffect(() => {
        axios
            .get("https://api.covidtracking.com/v2beta/us/daily.json")
            .then((res) => {
                let formattedData = [
                    {
                        id: "Percent Change",
                        data: []
                    },
                ];
            
                let values = {
                    x: "date",
                    y: 0
                };

                for(let i = 0; i < 7; i++) {
                    formattedData[0].data.push({...values});
                    formattedData[0].data[i].x = dateFormat(res.data.data[7 - (i + 1)].date);
                    formattedData[0].data[i].y = res.data.data[7 - (i + 1)].cases.total.calculated.seven_day_change_percent;
                }
                setFinalData(formattedData);
            })
    }, [])

    return (
        <Container className="percentChange-graph">
            {finalData ?  
                <ResponsiveLine
                    data={finalData}
                    margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
                    xScale={{ type: 'point', reverse: false }}
                    yScale={{ type: 'linear', min: 0, max: 15, stacked: true, reverse: false }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "7 Day Percent Change",
                        legendOffset: -70,
                        legendPosition: 'middle'
                    }}
                    pointSize={10}
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
            : <Loading />}
        </Container>
    )
}

export default PercentChange