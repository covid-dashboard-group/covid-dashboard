import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ResponsiveLine } from "@nivo/line";
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

                for (let i = 0; i < 7; i++) {
                    formattedData[0].data.push({ ...values });
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
                    margin={{ top: 10, right: 30, bottom: 50, left: 50 }}
                    xScale={{ type: 'point', reverse: false }}
                    yScale={{ type: 'linear', min: 0, max: 15, stacked: true, reverse: false }}
                    yFormat=" >-.2~f"
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
                        legendOffset: -40,
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

export default PercentChange