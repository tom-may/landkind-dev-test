import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl =
  "https://services1.arcgis.com/YAnRDYVL1tmpajaA/ArcGIS/rest/services/NZ_WaterQuality/FeatureServer/0/";

export default function GetData() {
  let [nitrateNationalAverage, setNitrateNationalAverage] = useState(0);
  let [phosphorusNationalAverage, setPhosphorusNationalAverage] = useState(0);
  let [rateOfCompliance, setRateOfCompliance] = useState(0);
  let [siteDataWithCompliance, setSiteDataWithCompliance] = useState([]);

  function setCompliance(data, nitrateAverage, phosphorusAverage) {
    const dataWithCompliance = data.map((site) => {
      if ( site.attributes.Nitrate < nitrateAverage && site.attributes.Phosphorus < phosphorusAverage) {
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

  function findNationalAverages(data) {
    let nitrateAverage = data.reduce((total, next) => total + next.attributes.Nitrate, 0) / data.length;
    let phosphorusAverage = data.reduce((total, next) => total + next.attributes.Phosphorus, 0) /data.length;

    setNitrateNationalAverage(nitrateAverage);
    setPhosphorusNationalAverage(phosphorusAverage);

    const dataWithCompliance = setCompliance(
      data,
      nitrateAverage,
      phosphorusAverage
    );
    getComplianceRate(dataWithCompliance);
  }

  useEffect(() => {
    axios
      .get(baseUrl + "query?Where=Nitrate>0&outFields=*&f=json")
      .then((response) => {
        findNationalAverages(response.data.features);
      });
  }, []);

  // returns averages, rate of compliance and new array of all data with compliance included
  // to be injected anywhere in the codebase
  return {
    nitrateNationalAverage: nitrateNationalAverage,
    phosphorusNationalAverage: phosphorusNationalAverage,
    compliantSiteRate: rateOfCompliance,
    dataWithCompliance: siteDataWithCompliance
  };
}
