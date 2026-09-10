import React from "react";
import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiRainMix,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "weather-icons-react";

//return weather icon to approximately match code
// no icons to differentiate varying degrees of a condition (for example: light and heavy rain) so they are all grouped together by condition type (rain for the previous example)
export default function WeatherIcon({ code, size }) {
  switch (Number(code)) {
    case 0:
      return <WiDaySunny size={size} />;
    case 1:
    case 2:
      return <WiDayCloudy size={size} />;
    case 3:
      return <WiCloudy size={size} />;
    // only 1 fog icon. grouping fog codes
    case 45:
    case 48:
      return <WiFog size={size} />;
    // drizzle has no separate icon. grouping with rain codes
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return <WiRain size={size} />;
    // these codes say freezing drizzle/rain. using wintery mix icon as match
    case 56:
    case 57:
    case 66:
    case 67:
      return <WiRainMix size={size} />;
    case 71:
    case 73:
    case 75:
    case 77: // this code is snow grains. couldn't find a specific match so it goes with snow
    // snow shower codes. closer to snow than rain shower for icons
    case 85:
    case 86:
      return <WiSnow size={size} />;
    case 80:
    case 81:
    case 82:
      return <WiShowers size={size} />;
    case 95:
    case 96:
    case 99:
      return <WiThunderstorm size={size} />;
  }
}
