import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl =
  "https://services1.arcgis.com/YAnRDYVL1tmpajaA/ArcGIS/rest/services/NZ_WaterQuality/FeatureServer/0/";

export default function Averages() {
  let [nitrateNationalAverage, setNitrateNationalAverage] = useState(null);
  let [phosphorusNationalAverage, setPhosphorusNationalAverage] =
    useState(null);
  let [rateOfCompliance, setRateOfCompliance] = useState(0)

  function setCompliance(data, nitrateAverage, phosphorusAverage) {
      const dataWithCompliance = data.map((site) => {
        if (
          site.attributes.Nitrate < nitrateAverage &&
          site.attributes.Phosphorus < phosphorusAverage
        ) {
          site.Compliance = true;

        } else {
          site.Compliance = false;
        }
        return site;
      });

    return dataWithCompliance
  }

  function getComplianceRate(allSites) {
    const compliant = allSites.filter(site => site.Compliance === true)
    const complianceRate = compliant.length/allSites.length * 100
    console.log("rate", complianceRate)
    setRateOfCompliance(complianceRate)
    return complianceRate
  }
  
  function findNationalAverages(data) {
    let nitrateAverage =
      data.reduce((total, next) => total + next.attributes.Nitrate, 0) /
      data.length;
    let phosphorusAverage =
      data.reduce((total, next) => total + next.attributes.Phosphorus, 0) /
      data.length;
    setNitrateNationalAverage(nitrateAverage);
    setPhosphorusNationalAverage(phosphorusAverage);

    const dataWithCompliance = setCompliance(data, nitrateAverage, phosphorusAverage)
    console.log("data with compliance", dataWithCompliance)

    const rateOfCompliance = getComplianceRate(dataWithCompliance)


    return {
      dataWithCompliance: dataWithCompliance,
      nitrateNationalAverage: nitrateAverage,
      phosphorusNationalAverage: phosphorusAverage,
      totalRateOfCompliance: rateOfCompliance
    };
  }


  useEffect(() => {
    axios
      .get(baseUrl + "query?Where=Nitrate>0&outFields=*&f=json")
      .then((response) => {
        findNationalAverages(response.data.features)
      });
  }, []);

  return {
    nitrateNationalAverage: nitrateNationalAverage,
    phosphorusNationalAverage: phosphorusNationalAverage,
    compliantSiteRate: rateOfCompliance
  };
}
