import React from "react";
import Averages from "../apis/Averages";


const AveragesWidget = () => {

    const averages = Averages()

    console.log(averages)

    return (
        <>
        <p>Nitrate: { averages.nitrateNationalAverage }</p>
        <p>Phosphorus: { averages.phosphorusNationalAverage }</p>
        <p>Compliance Count: { averages.complianceCount }</p>
        </>
    )
}

export default AveragesWidget;