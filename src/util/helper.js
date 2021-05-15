
import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData=(data)=>{
    const sortData=[...data];
    return sortData.sort((a,b)=>(a.cases>b.cases?-1:1))

}

export const printSate=(num)=>num?`${numeral(num).format("0.0a")}`:"+0";
export const showDataOnMap = (data, casesType) =>
data.map((country) => (
  <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
    fillOpacity={0.4}
    radius={
      Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
    }
  >
   <Popup>
     <div>
       <div className="info_flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
       <div className="info_country">{country.country}</div>
       <div className="info_Cases">Cases:{numeral(country.cases).format("0.0")}</div>
       <div className="info_recovered">Recovered:{numeral(country.recovered).format("0.0")}</div>
       <div className="info_deaths">Deaths:{numeral(country.deaths).format("0.0")}</div>
     </div>
   </Popup>
</Circle>
));
  