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
import { printSate, sortData } from "./util/helper";
import Map from "./Map";
import "leaflet/dist/leaflet.css";


const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [TableInfo, setTableInfo] = useState([]);
  const [MapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [MapZoom, setMapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
    
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
          setmapCountries(data);
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
        countryCode === "worldwide"
        ? setMapCenter([34.80746, -40.4796])
        : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
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
              {countries.map((country,key) => (
                <MenuItem key={key} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
            <InfoBox 
                onClick={(e)=>setCasesType("cases")} 
                active={casesType==='cases'}
                Title="Coronavirus Cases" 
                isRed
                Cases={printSate(countryInfo.todayCases)} 
                Total={printSate(countryInfo.cases)}
            />
            <InfoBox 
                onClick={(e)=>setCasesType("recovered")} 
                active={casesType === "recovered"}
                Title="Recovered" 
                Cases={printSate(countryInfo.todayRecovered)} 
                Total={printSate(countryInfo.recovered)}
            />
            <InfoBox 
              onClick={(e)=>setCasesType("deaths")} 
              active={casesType === "deaths"}
              Title="Death" 
              isRed
              Cases={printSate(countryInfo.todayDeaths)} 
              Total={printSate(countryInfo.deaths)}
            />
        </div>
         <Map
          casesType={casesType}
          countries={mapCountries}
          center={MapCenter}
          zoom={MapZoom}
        />
      </div>
    <div className="app__right">
        <Card>
            <CardContent>
                <h2>Cases By Country</h2>
                <Table countries={TableInfo}/>
                <h2>worldwide new {casesType}</h2>
                <LineGraph className="app__graph" CasesType={casesType}/>
            </CardContent>
        </Card>
    </div>
    </div>
  );
};

export default App;