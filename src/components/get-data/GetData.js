
// I created this component in order to seperate the functionallity of assessing the data 
// from the feature service, and from rendering the AveragesDisplay.

// Utilising useEffect, The data is assessed on render and new data atrributes for averages
// and compliance are set. This approach allowed me to calculate averages and rate of compliance for
// all sites, before rendering these figures on the page.

// My intention was to be able to call this component to use the data throughout the codebase.

import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl =
    "https://services1.arcgis.com/YAnRDYVL1tmpajaA/ArcGIS/rest/services/NZ_WaterQuality/FeatureServer/0/";

export default function GetData() {

    let [nitrateNationalAverage, setNitrateNationalAverage] = useState(0);
    let [phosphorusNationalAverage, setPhosphorusNationalAverage] = useState(0);
    let [rateOfCompliance, setRateOfCompliance] = useState(0);
    let [siteDataWithCompliance, setSiteDataWithCompliance] = useState([]);

    function getCompliance(data, nitrateAverage, phosphorusAverage) {
        const dataWithCompliance = data.map((site) => {
            if (site.attributes.Nitrate < nitrateAverage && site.attributes.Phosphorus < phosphorusAverage) {
                site.attributes.Compliant = true;
            } else {
                site.attributes.Compliant = false;
            }
            return site;
        });
        setSiteDataWithCompliance(dataWithCompliance);
        return dataWithCompliance;
    }

    function getComplianceRate(allSites) {
        const compliant = allSites.filter((site) => site.attributes.Compliant === true);
        const complianceRate = (compliant.length / allSites.length) * 100;
        setRateOfCompliance(complianceRate);
    }

    useEffect(() => {

        function setData(data) {
            // Calculate and set national averages
            let nitrateAverage = data.reduce((total, next) => total + next.attributes.Nitrate, 0) / data.length;
            let phosphorusAverage = data.reduce((total, next) => total + next.attributes.Phosphorus, 0) / data.length;
            setNitrateNationalAverage(nitrateAverage);
            setPhosphorusNationalAverage(phosphorusAverage);
            // Get compliance using national averages and set new data array with added compliance attribute.   
            const dataWithCompliance = getCompliance(
                data,
                nitrateAverage,
                phosphorusAverage
            );
            // Calculate rate of compliance of all sites
            getComplianceRate(dataWithCompliance);
        }

        // Grabs all data from the feature service table
        axios
            .get(baseUrl + "query?Where=OBJECTID>0&outFields=*&f=json")
            .then((response) => {
                setData(response.data.features);
            });
    }, []);

    // Returns averages, rate of compliance and new array of all data with compliance included
    return {
        nitrateNationalAverage: nitrateNationalAverage,
        phosphorusNationalAverage: phosphorusNationalAverage,
        compliantSiteRate: rateOfCompliance,
        // I hoped to use this to determine pin colour for sites on the map. 
        dataWithCompliance: siteDataWithCompliance
    };
}
