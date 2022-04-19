import React from "react";
import GetData from "../apis/GetData";
import './AveragesWidget.css'


const AveragesWidget = () => {

    const data = GetData()


    return (
        <>
            <div className="container">
                <p className="header"> State of NZ water Quality</p>
                <div className="averages-container">
                    <div className="averages-subcontainer">
                        <div className="averages-circle">
                            <p id="nitrogen-average">{data.nitrateNationalAverage}</p>
                        </div>
                        <div className="averages-text">
                            <p>Average Nitrogen</p>
                            <p className="averages-subtext">(parts per million)</p>
                        </div>
                    </div>
                    <div className="averages-subcontainer">
                        <div className="averages-circle">
                            <p id="phosphorus-average">{data.phosphorusNationalAverage}</p>
                        </div>
                        <div className="averages-text">
                            <p>Average Phosphorus</p>
                            <p className="averages-subtext">(parts per million)</p>
                        </div>
                    </div>
                    <div className="averages-subcontainer">
                        <div className="averages-circle">
                            <p id="rate-of-compliance">{data.compliantSiteRate}<span id="percentage">%</span></p>
                        </div>
                        <div className="averages-text">
                            <p>Compliant with national standards</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AveragesWidget;