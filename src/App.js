import { useEffect } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer";
import "./App.css";
import AveragesWidget from "./components/averagesWidget/AveragesWidget.js";
import CompliancePins from "./components/compliancePins/CompliancePins.js";
import GetData from "./apis/GetData";

export default function App() {

    const nitrateAverage = GetData().nitrateNationalAverage;

    useEffect(() => {

        const setupWebMap = () => {
            const webMap = new WebMap({
                basemap: "gray-vector",
                portalItem: {
                    id: "c3337bfc8f964688856b36a4651b66cf"
                }
            });
            // Load map
            const mapView = new MapView({
                container: "mapView",
                map: webMap,
                center: [-178, -41],
                zoom: 5,
                constraints: {
                    minZoom: 5,
                }
            });

            // Set popup template
            const popupName = new FeatureLayer({
                url: "https://services1.arcgis.com/YAnRDYVL1tmpajaA/ArcGIS/rest/services/NZ_WaterQuality/FeatureServer/0/",
                outFields: ["NAME"],
                popupTemplate: { "title": "{Name}" }
            });

            // Set Blue or Red Location pin
            // https://developers.arcgis.com/javascript/latest/visualization/data-driven-styles/class-breaks/

            const locationPinRenderer = new ClassBreaksRenderer({
                field: "Nitrate",
                defaultSymbol: {
                    type: "simple-marker",
                    color: "white",
                },
                classBreakInfos: [
                    {
                        minValue: 0,
                        maxValue: `${nitrateAverage}`,
                        symbol: {
                            type: "simple-marker",
                            color: "#208CE5", //
                        }
                    },
                    {
                        minValue: `${nitrateAverage}`,
                        maxValue: 99999, // Not happy with hard coded value
                        symbol: {
                            type: "simple-marker",
                            color: "#E51354", // red
                        }
                    }
                ]
            });

            // Create the layer and set the renderer
            const locationPin = new FeatureLayer({
                url: "https://services1.arcgis.com/YAnRDYVL1tmpajaA/ArcGIS/rest/services/NZ_WaterQuality/FeatureServer/0/",
                renderer: locationPinRenderer
            });

            webMap.add(locationPin);

            webMap.add(popupName);
        };
        setupWebMap();
    }, []);



    return (
        <div className="app-container">
            {/* Load esri API and the map */}
            <div id="mapView" className="map-view" />
            <AveragesWidget />
            {/* Compliance pins component disabled until it is completed*/}
            {/* <CompliancePins /> */}
        </div>
    );
}

