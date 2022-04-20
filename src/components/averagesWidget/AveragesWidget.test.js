import React from "react";
import ReactDOM from "react-dom";
import AveragesWidget from "./AveragesWidget";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AveragesWidget />, div);
    ReactDOM.unmountComponentAtNode(div);
});
