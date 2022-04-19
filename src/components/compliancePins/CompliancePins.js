import React from "react";
import GetData from "../../apis/GetData";
import './CompliancePins.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'


const CompliancePins = () => {

    const data = GetData().dataWithCompliance

    return (
        data && data.map(site => {
            if (site.attributes.Compliant) {
                return <FontAwesomeIcon icon={faLocationPin} className="blue-pin" />
            } else {
                return <FontAwesomeIcon icon={faLocationPin} className="red-pin" />
            }
        })
    )
}


export default CompliancePins;