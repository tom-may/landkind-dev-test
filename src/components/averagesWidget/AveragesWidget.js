import GetData from "../../apis/GetData";
import "./AveragesWidget.css";


const AveragesWidget = () => {

    const data = GetData();

    return (
        <>
            <div className="container">
                <p className="header"> State of NZ water Quality</p>
                <div className="averages-container">
                    <div className="averages-subcontainer">
                        <div className="averages-circle">
                            <p id="nitrogen-average">{data.nitrateNationalAverage.toFixed(1)}</p>
                        </div>
                        <div className="averages-text">
                            <p className="averages-main-text">Average Nitrogen</p>
                            <p className="averages-subtext">(parts per million)</p>
                        </div>
                    </div>
                    <div className="averages-subcontainer">
                        <div className="averages-circle">
                            <p id="phosphorus-average">{data.phosphorusNationalAverage.toFixed(1)}</p>
                        </div>
                        <div>
                            <p className="averages-main-text">Average Phosphorus</p>
                            <p className="averages-subtext">(parts per million)</p>
                        </div>
                    </div>
                    <div className="averages-subcontainer">
                        <div className="averages-circle">
                            <p id="rate-of-compliance">{data.compliantSiteRate.toFixed(1)}<span id="percentage">%</span></p>
                        </div>
                        <div>
                            <p className="averages-main-text">Compliant with national standards</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AveragesWidget;