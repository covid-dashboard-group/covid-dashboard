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
                    formattedData[0].data.push({...values});
                    formattedData[0].data[i].x = dateFormat(res.data[7 - (i + 1)].date);
                    formattedData[0].data[i].y = res.data[7 - (i + 1)].deathIncrease;
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
                    margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
                    xScale={{ type: 'point', reverse: false }}
                    yScale={{ type: 'linear', min: 0, max: maxY + (maxY / 2), stacked: true, reverse: false }}
                    yFormat=" >-.4~f"
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
                        legendOffset: -50,
                        legendPosition: 'middle'
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    useMesh={true}
                />
                : <Loading />}
        </Container>
    )
}

export default DeathsGraph