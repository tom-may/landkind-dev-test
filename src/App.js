import React, { Component } from 'react';
import EsriLoaderReact from 'esri-loader-react';
import './App.css';

class App extends Component {
  onMapReady = ({ loadedModules, containerNode }) => {
    // Extract the loaded api modules
    const [
      WebMap,
      MapView
    ] = loadedModules;
    // Creates the web map.
    // This will likely be your starting point! You will need to know about this class
    // as it will contain what you need to complete the task!
    const webMap = new WebMap({
      portalItem: {
        id: 'c3337bfc8f964688856b36a4651b66cf'
      }
    });
    // Loads the web map into the map view
    // This just displays the data and map on the screen! :)
    const mapView = new MapView({
      container: containerNode,
      map: webMap
    });
  }
  
  render() {
    
    return (
      <div className="app-container">
        {/* Load esri API and the map */}
        <EsriLoaderReact 
          options={{ url: 'https://js.arcgis.com/4.18/' }}
          modulesToLoad={[
            'esri/WebMap',
            'esri/views/MapView'
          ]}    
          onReady={this.onMapReady}
        />
      </div>
    );
  }
}

export default App;
