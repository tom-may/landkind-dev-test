import React from "react";
import GetData from "../../apis/GetData";
import './CompliancePins.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'


const CompliancePins = () => {

    const data = GetData().dataWithCompliance

    // see here for styling points
    // https://developers.arcgis.com/javascript/latest/visualization/location-styles/

    return (
        data && data.map(site => {
            if (site.attributes.Compliant) {
                return <FontAwesomeIcon icon={faLocationPin} className="blue-pin" key={site.attributes.OBJECTID} />
            } else {
                return <FontAwesomeIcon icon={faLocationPin} className="red-pin" key={site.attributes.OBJECTID}/>
            }
        })
    )
}


export default CompliancePins;