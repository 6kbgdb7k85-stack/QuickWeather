import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import WindCard from "./WeatherCards/WindCard";
import CurrentConditionCard from "./WeatherCards/CurrentConditionCard";
import TempCard from "./WeatherCards/TempCard";
import { Grid } from "@mui/material";
import SunriseSunsetCard from "./WeatherCards/SunriseSunsetCard";

export default function ForecastDetails() {
  const { setWeatherTheme, setPageName } = useOutletContext();
  const { unit, day, condition, high, low, sunrise, sunset } = useLocation().state;

  useEffect(() => {
    setPageName(`Forecast Details ${day}`);
    setWeatherTheme(condition);
  }, []);

  return (
    <Grid
      container
      direction={"row"}
      sx={{ justifyContent: "center", alignItems: "stretch" }}
      spacing={1}
      columns={{ xs: 4, sm: 4, md: 12 }}
    >
    <Grid size={4}>
        <TempCard
            high={high}
            low={low}
            unit={unit}
        />
    </Grid>
      <Grid size={4}>
        <CurrentConditionCard
          code={condition}
        />
      </Grid>
      <Grid size={4}>
        <SunriseSunsetCard sunrise={sunrise} sunset={sunset}/>
      </Grid>
    </Grid>
  );
}
