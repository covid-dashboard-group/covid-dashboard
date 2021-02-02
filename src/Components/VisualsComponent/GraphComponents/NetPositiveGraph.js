import React, { useState, useEffect } from "react";
import { ResponsiveLine } from '@nivo/line';
import axios from "axios";
import { Container } from 'react-bootstrap'
import { ThemeProvider } from '@nivo/core'
import Loading from '../../Loading'

const NetPositiveGraph = (props) => {
    const [finalData, setFinalData] = useState([]);

    const dateFormat = (date) => {
        let strDate = date.toString();
        let strYear = strDate.substring(0, 4);
        let strMonth = strDate.substring(4, 6);
        let strDay = strDate.substring(strDate.length - 2, strDate.length);
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

                for (let i = 0; i < res.data.length; i++) {
                    formattedData[0].data.push({ ...values });
                    formattedData[0].data[i].x = dateFormat(res.data[res.data.length - (i + 1)].date);
                    formattedData[0].data[i].y = res.data[res.data.length - (i + 1)].positiveIncrease;
                }
                setFinalData(formattedData);
            })
    }, [finalData])

    return (
        <Container className="netPositive-graph" >
            {
                finalData ?
                    < ResponsiveLine
                        theme={{
                            fontFamily: "'Raleway', Arial, Helvetica, sans-serif",
                            fontSize: "11px",
                            axis: {
                                legend: {
                                    text: {
                                        fontSize: "18px",
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fontSize: "12px"
                                }
                            }
                        }}
                        colors={{ scheme: 'set1' }}
                        data={finalData}
                        margin={{ top: 10, right: 20, bottom: 50, left: 80 }}
                        xScale={{ type: 'point' }
                        }
                        yScale={{ type: 'linear', min: 0, max: 300000, stacked: true, reverse: false }}
                        yFormat=" >-.6~f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            tickValues: ["01/20/2020", "05/20/2020", "09/20/2020", "01/20/2021"],
                            legend: 'Date',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
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
                        pointLabelYOffset={- 12}
                        enableArea={true}
                        useMesh={true}
                    />
                    : <Loading />}
        </Container >
    )
}

export default NetPositiveGraph