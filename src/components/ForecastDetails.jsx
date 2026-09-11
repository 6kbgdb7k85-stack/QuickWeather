import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import WindCard from "./WeatherCards/WindCard";
import CurrentConditionCard from "./WeatherCards/CurrentConditionCard";
import TempCard from "./WeatherCards/TempCard";
import { Grid } from "@mui/material";
import SunriseSunsetCard from "./WeatherCards/SunriseSunsetCard";
import { daysOfWeek } from "../common/constants";

export default function ForecastDetails() {
  const { setWeatherTheme, setPageName, is24HrTime } = useOutletContext();
  const { unit, day, condition, high, low, sunrise, sunset } = useLocation().state;

  useEffect(() => {
    const [year,month,date] = day.split('-').map(Number)
    const weekDay = daysOfWeek[new Date(year,month-1,date).getDay()]
    setPageName(<><span>Forecast Details</span><br/><span>{weekDay} {String(date).padStart(2,'0')}/{String(month).padStart(2,'0')}/{year}</span></>);
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
          isForecast
        />
      </Grid>
      <Grid size={4}>
        <SunriseSunsetCard sunrise={sunrise} sunset={sunset} is24HrTime={is24HrTime}/>
      </Grid>
    </Grid>
  );
}
