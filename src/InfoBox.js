import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";

 function InfoBox({Title,Cases,Total}) {
    return (
        <Card className="InfoBoxe">
            <CardContent>
                <Typography color="textSecondary" className="InfoBoxe_title">{Title}</Typography>
                <Typography color="textSecondary" className="InfoBoxe_Cases">{Cases}</Typography>
                <Typography color="textSecondary" className="InfoBoxe_total">{Total}</Typography>
            </CardContent>
        </Card>
    )
}
export default InfoBox;