import React, { useEffect } from 'react';
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"
import './App.css';

export default function App() {
  useEffect(() => {
    const setupWebMap = () => {
      const webMap = new WebMap({
        portalItem: {
          id: 'c3337bfc8f964688856b36a4651b66cf'
        }
      });
      const mapView = new MapView({
        container: "mapView",
        map: webMap
      });
    }
    setupWebMap()
  }, [])
  
  return (
    <div className="app-container">
    {/* Load esri API and the map */}
    <div id="mapView" className='map-view'/>
  </div>
  )
}

