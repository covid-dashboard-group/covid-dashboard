import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Table } from "react-bootstrap";
import axios from "axios";

const CountryData = (props) => {
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        axios
            .get("https://corona.lmao.ninja/v2/countries?yesterday&sort")
            .then((res) => {
                console.log(res.data);
                let countriesData = [];

                let indivCountries = {
                    countryName: "country",
                    positiveTotal: 0,
                    positiveIncrease: 0
                };

                for (let i = 0; i < res.data.length; i++) {
                    countriesData.push({ ...indivCountries });
                    countriesData[i].countryName = res.data[i].country;
                    countriesData[i].positiveTotal = res.data[i].cases;
                    countriesData[i].positiveIncrease = res.data[i].todayCases;
                }

                console.log(countriesData);
                setFinalData(countriesData);
            })
    }, [])

    const renderData = (data, index) => {
        return (
            <tr key={index}>
                <td className='country-name'>{data.countryName}</td>
                <td>{data.positiveTotal}</td>
                <td>{data.positiveIncrease}</td>
            </tr>
        )
    }

    return (
        <Container className='CountryData'>
            {finalData ?
                <Table
                    striped
                    // size='sm'
                >
                    <thead className='country-table-header'>
                        <th>Country</th>
                        <th>Positive Total</th>
                        <th>Positive Increase</th>
                    </thead>
                    <tbody className='country-table-body'>
                        {finalData.map(renderData)}
                    </tbody>
                </Table>
                : null}
        </Container>
    )
}

export default CountryData