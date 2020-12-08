import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./styles.css";

import MapChart from "./MapChart";

function App() {
    const [content, setContent] = useState("");
    return (
        <div>
            <header>
                <h1>Check the difference with Ukraine</h1>
            </header>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
            <footer>
                <p>Copyright © Iridiscenthummingbird Inc. 2020.</p>
            </footer>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
