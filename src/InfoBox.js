import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";
import "./infoBox.css"

 function InfoBox({Title,Cases,Total,onClick,active,isRed}) {
    return (
        <Card className={`InfoBoxe ${active && 'infoBox--selected'} ${isRed && 'infoBox--isRed'}`} onClick={onClick}>
            <CardContent>
                <Typography color="textSecondary" className="InfoBoxe_title">{Title} </Typography>
                <Typography  className={`InfoBoxe_Cases ${!isRed && 'infoBox--recovered'}`}>{Cases}</Typography>
                <Typography color="textSecondary" className="InfoBoxe_total">{Total} Total</Typography>
            </CardContent>
        </Card>
    )
}
export default InfoBox;