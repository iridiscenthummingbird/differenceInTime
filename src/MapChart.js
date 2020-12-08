import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Graticule
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function parseTime( t ) {
    var d = new Date();
    var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
    d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
    d.setMinutes( parseInt( time[2]) || 0 );
    return d;
}

Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

const MapChart = ({ setTooltipContent }) => {
    return (
        <ComposableMap
            data-tip=""
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [-10.0, -52.0, 0],
                scale: 1100
            }}
        >
            <Graticule stroke="#EAEAEC" />
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map(geo => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#9998A3"
                            stroke="#EAEAEC"

                            onMouseEnter={() => {
                                const { NAME, ISO_A2 } = geo.properties;

                                const ct = require('countries-and-timezones');
                                const timezone = ct.getTimezonesForCountry(ISO_A2);
                                var now = new Date(Date.now())
                                if(timezone != null)
                                {
                                    var time = 0
                                    var h = 0
                                    if (now.isDstObserved()) {
                                        time = timezone[0].dstOffsetStr
                                        h = 3
                                    }
                                    else {
                                        time = timezone[0].utcOffsetStr
                                        h = 2
                                    }

                                    var tmp = parseTime(time).getHours() - h

                                    setTooltipContent(NAME + " " + (tmp > 0 ? "+" : "") + tmp + " hour" + (tmp > 1 || tmp < -1 ? "s" : ""));

                                }
                            }}
                            onMouseLeave={() => {
                                setTooltipContent("");
                            }}
                            style={{
                                default: {
                                    fill: "#D6D6DA",
                                    outline: "none"
                                },
                                hover: {
                                    fill: "#F53",
                                    outline: "none"
                                },
                                pressed: {
                                    fill: "#E42",
                                    outline: "none"
                                }
                            }}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    );
};

export default MapChart;
