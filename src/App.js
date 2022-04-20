// A rather large App.js file. It would have been nice to seperate the setupWebMap 
// functionality in to another file.

// Unfortunately, I could not figure out how to set pins on the map as per the wireframe
// and settled for a simple marker
// Some questions I asked myself:
// Should I import pins as a url? 
// Is there an ArcGIS option for location pin, similar to "simple-marker" as used below

// How do you overwrite/remove the pins and popups already included in the feature layer?
// Should I create my own feature layer?
// If so, could I use the dataWithCompliance object from GetData?

// As you can see below, I could not figure out how to set a coloured pin based
// on both Nitrate and Phosphorus levels being below national average. 
// So I settled for just one below average. Not Ideal.
// Is using classBreaksRenderer the correct approach here?
// How could I use dataWithCompliance from GetData to assess this?
// Initially I tried using a CompliancePins component, where I assigned a coloured 
// pin (using css and FontAwesome) for each site by mapping through my dataWithCompliance array. 
// This was great for displaying the correct coloured pin... just not on the map ¯\_(ツ)_/¯ 


import { useEffect } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer";
import "./App.css";
import AveragesWidget from "./components/averages-display/AveragesDisplay";
import GetData from "./components/get-data/GetData";

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
            // Need to use Phosphorus too
            // Does not always render correctly.
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
                            color: "#208CE5", // blue
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
        </div>
    );
}

