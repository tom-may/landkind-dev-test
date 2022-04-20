# Landkind Developer Candidate Test

This project is designed to allow you to show off your JS developing skills. Provided is a fresh out of the box create-react-app, with the **[Esri JS API](https://developers.arcgis.com/javascript/latest/api-reference/index.html)** and map already loaded and ready to go. Use these **[wire frames](https://gpsitnz.sharepoint.com/:b:/g/EYF24WqbsG1ImTHG-L8Ks5oBoc4DUDDgZqXDplGJGsjF-Q)** to create a web application to the best of your ability! We are interested in:

  - Standard coding style across the entire project.
  - Unit testing.
  - Useful comments.
  - Problem solving skills.
  - Maybe a little bit of black magic.

We expect you should be able to get this boiler plate up and running without any issue! If you have any questions about the wire frames please feel free to ask, and remember Have fun!!! 🤘🏻

## Initial Notes:

 - This was awesome! Although its been a busy Easter break, I had a bit of time off work, so must admit I spent a tad more than a few hours on it.
 - A lot of this time was spent exploring the ArcGIS api, particularly the basemaps (My favourite being 'national-geographic')
 
 - I've added some notes below on my approach to this project, as well as areas for improvement that I didn't get to, or that I need to spend more time learning.

 - There are also notes on some of the files that may help.


## My approach:

 First problem: How to render the map

 - Straight to the docs. After spending some time reading through the ArcGIS documentation, I went through the 'Display a map' tutorial, then looked at some examples, where I learned how to style the basemap, set center location, zoom and contraints.

 Second problem: Where is the data?

 - This one took a bit of digging, but thanks to a mention of a 'feature service' on the wireframe, I discovered the feature layer and service URL.
 - I then discovered how to use SQL to query the data feature service. I settled on axios to help pull all the data for its simplicity.

Third problem: Cool data, now what?

- At this point I had the idea for the GetData component. This helped by seperating the concern for analyzing data, and rendering the data.
- After writing functions to analyse the data, I could finally console.log the averages and the rate of compliance - woohoo!

Fourth problem: How to display the data?

- Setting up the AveragesDisplay component, I used flex to arrange containers, set up a simple render then set up simple CSS to match the wireframe. That was the easy part.
- The hard part was rendering a responsive cirlce, with figures that stayed in the center. After a bit of googling, I found a solution.
- I then added media queries for responsiveness

Final problem: Pins and popups

- I started with pins. Initially I tried using a CompliancePins component, where I rendered a coloured pin (using css and FontAwesome) for each site by mapping through my dataWithCompliance array. This was great for displaying the correct coloured pin... just not on the map ¯\_(ツ)_/¯.

- After failing miserably with my CompliancePins I switched to the popups. Again, thanks to the docs I found the popup template that queried the feature layer. Too easy.

- This got me thinking about the pins again. Could I query the feature layer to set these? It seemed I could, just not quite how I wanted to. See my notes in app.js for more on this.

And thats as far as I got. For an MVP, I'm ok with it, but i'm sure there are many areas for improvement.

## Improvements:

 - Testing. I need to learn more about using Jest.  
 - 404 page.
 - Error handling/logging.
 - Pin colour assigned based on both Nitrate and Phosphorus values. This also does not initially render correctly.
 - Original feature layer pins and popups removed/overwritten by new pins and popups.
 - Location name. The data from the feature layer is 'Site:x'. Can you return the name of the nearest body of water instead?


## Extra features

 - allow user to close the water quality display, or make it a pop out modal.
 - allow user to  recenter map.
 - have pin popups overlay averages display.
 - Spinning Landkind logo (or loading symbol) while pages renders/data is fetched.


