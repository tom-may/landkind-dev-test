import React from "react";
import Averages from "../apis/Averages";


const AveragesWidget = () => {

    const averages = Averages()

    return (
        <>
        <p>Nitrate: { averages.nitrateNationalAverage }</p>
        <p>Phosphorus: { averages.phosphorusNationalAverage }</p>
        <p>Compliance Rate: { averages.compliantSiteRate }%</p>
        </>
    )
}

export default AveragesWidget;