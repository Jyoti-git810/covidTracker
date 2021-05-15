
import numeral from 'numeral';
import React from 'react';
import './Table.css';

 function Table({countries}) {
    return (
        <div className="Table">
            {countries.map(({country,cases,key})=>(
                <tr key={key}>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}
export default Table;