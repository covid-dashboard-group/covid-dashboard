import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import Loading from '../../Loading'

const CumulativeGraph = (props) => {
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
                        id: "Positive",
                        data: []
                    },
                    {
                        id: "Negative",
                        data: []
                    }
                ];

                let values = {
                    x: "date",
                    y: 0
                };

                let caseCount = [];

                for (let i = 0; i < res.data.length; i++) {
                    formattedData[0].data.push({ ...values });
                    formattedData[0].data[i].x = dateFormat(res.data[res.data.length - (i + 1)].date);
                    formattedData[0].data[i].y = res.data[res.data.length - (i + 1)].positive;
                    formattedData[1].data.push({ ...values });
                    formattedData[1].data[i].x = dateFormat(res.data[res.data.length - (i + 1)].date);
                    formattedData[1].data[i].y = res.data[res.data.length - (i + 1)].negative;
                    caseCount.push(res.data[res.data.length - (i + 1)].negative);
                }
                setFinalData(formattedData);
                setMaxY(Math.max(...caseCount));
            })
    }, [finalData])

    return (
        <Container className="cumulative-graph">
            {finalData && maxY > 0 ?
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
                    margin={{ top: 10, right: 20, bottom: 50, left: 100 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 0, max: maxY + (maxY / 2), stacked: true, reverse: false }}
                    yFormat=" >-.9r"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: ["01/20/20 20", "05/20/2020", "09/20/2020", "01/20/2021"],
                        legend: 'Date',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Cumulative Cases",
                        legendOffset: -90,
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
                            anchor: 'top',
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

export default CumulativeGraph