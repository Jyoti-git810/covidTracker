import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Table from './Table';
import LineGraph  from "./LineGraph";
import { sortData } from "./util/helper";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [TableInfo, setTableInfo] = useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
        setCountryInfo(data)
    })
  },[])
  useEffect(() => {
    const getCountriesData = async () => {
     await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData=sortData(data);
          setTableInfo(sortedData);
          setCountries(countries);
          console.log("u=>",TableInfo)
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        setInputCountry(countryCode);
        setCountryInfo(data);
        console.log("lll=>",countryInfo)
    })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
            <InfoBox Title="Coronavirus Cases" Cases={countryInfo.todayCases} Total={countryInfo.cases}/>
            <InfoBox Title="Recored" Cases={countryInfo.todayRecovered} Total={countryInfo.Recovered}/>
            <InfoBox Title="Death" Cases={countryInfo.todayDeaths} Total={countryInfo.deaths}/>
        </div>
    </div>
    <div className="app_right">
        <Card>
            <CardContent>
                <h2>Cases By Country</h2>
                <Table countries={TableInfo}/>
                <h2>Cases By World</h2>
                <LineGraph/>
            </CardContent>
        </Card>
    </div>
    </div>
  );
};

export default App;