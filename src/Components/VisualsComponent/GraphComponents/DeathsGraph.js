import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap'
import { ResponsiveLine } from '@nivo/line';
import axios from "axios";
import Loading from '../../Loading'

const DeathsGraph = (props) => {
    const [finalData, setFinalData] = useState([]);
    const [maxY, setMaxY] = useState();

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
                        id: "Deaths",
                        data: []
                    },
                ];

                let values = {
                    x: "date",
                    y: 0
                };

                let caseCount = [];

                for (let i = 0; i < 7; i++) {
                    formattedData[0].data.push({ ...values });
                    formattedData[0].data[i].x = dateFormat(res.data[i].date);
                    formattedData[0].data[i].y = res.data[i].deathIncrease;
                    caseCount.push(res.data[i].deathIncrease);
                }
                setFinalData(formattedData);
                setMaxY(Math.max(...caseCount));
            })
    }, [])

    return (
        <Container className="deaths-graph">
            {finalData ?
                <ResponsiveLine
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
                                fontSize: "14px"
                            }
                        }
                    }}
                    colors={{ scheme: 'set1' }}
                    data={finalData}
                    margin={{ top: 20, right: 90, bottom: 50, left: 80 }}
                    xScale={{ type: 'point', reverse: false }}
                    yScale={{ type: 'linear', min: 0, max: maxY + (maxY / 2), stacked: true, reverse: false }}
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
                        legend: "Increase in Deaths",
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

export default DeathsGraph