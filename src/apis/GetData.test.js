import GetData from "./GetData";
import axios from "axios";

const baseUrl =
    "https://services1.arcgis.com/YAnRDYVL1tmpajaA/ArcGIS/rest/services/NZ_WaterQuality/FeatureServer/0/";

test("the data is called", () => {
    return axios
        .get(baseUrl + "query?Where=OBJECTID>0&outFields=*&f=json")
        .then(data => {
            expect(data).toHaveBeenCalled;
        });
});

test("data is an empty array", () => {
    return axios
        .get(baseUrl + "query?Where=OBJECTID<0&outFields=*&f=json")
        .then(data => {
            expect(data.data.features).toEqual([]);
        });
});
