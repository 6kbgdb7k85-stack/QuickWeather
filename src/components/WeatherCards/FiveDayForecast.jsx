import {
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  Skeleton,
  Stack,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { getTheme } from "../../services/utils";
import WeatherIcon from "../UtilityComponents/WeatherIcon";
import { daysOfWeek } from "../../common/constants";
import { useNavigate } from "react-router-dom";

export default function FiveDayForecast({
  unit,
  days,
  highs,
  lows,
  conditions,
  rainChances,
  isLoading,
  sunsets,
  sunrises
}) {

  const navigate = useNavigate();

  function getSkeleton() {
    const skeleton = [];
    for (let i = 0; i < 5; i++) {
      skeleton.push(
        <Grid key={i} size={2}>
          <Stack spacing={1}>
            <Skeleton>
              <h1>{new Date().toDateString()}</h1>
            </Skeleton>
            <Skeleton>
              <WeatherIcon code={0} size={50} />
            </Skeleton>
            <Skeleton>
              <p>Hi: No Data</p>
            </Skeleton>
            <Skeleton>
              <p>Low: No Data</p>
            </Skeleton>
            <Skeleton>
              <p>No precipitation data</p>
            </Skeleton>
          </Stack>
        </Grid>,
      );
    }
    return skeleton;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader
          align="center"
          title={
            <Skeleton>
              <h4>5 Day Forecast</h4>
            </Skeleton>
          }
        />
        <Grid
          container
          direction={"row"}
          spacing={1}
          sx={{ justifyContent: "center", alignContent: "center" }}
        >
          {getSkeleton()}
        </Grid>
      </Card>
    );
  }

  if (!unit || !days || !highs || !lows || !rainChances || !conditions) {
    return <></>;
  }

  return (
    <Card id="forecast-card" sx={{ paddingBottom: "1rem" }}>
      <CardHeader align="center" title={<h3>5 Day Forecast</h3>} />
      <Grid
        container
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "stretch" }}
        spacing={1}
      >
        {days?.map((day, idx) => {
          const [year, month, date] = day.split("-").map(Number);
          return (
            <ThemeProvider key={day} theme={getTheme(conditions[idx])}>
              <Grid size={2}>
                <Card
                  id={`weather-card-day-${idx}`}
                  variant="outlined"
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    overflowWrap: "break-word",
                    hyphens: "auto",
                    borderColor: "black",
                    borderWidth: "1px",
                  }}
                >
                  <CardActionArea onClick={()=>navigate('/forecast/day',{state:{
                    unit,
                    day,
                    condition: conditions[idx],
                    high: highs[idx],
                    low: lows[idx],
                    sunset: sunsets[idx],
                    sunrise: sunrises[idx]
                  }})}>
                    <h2>
                      {daysOfWeek[new Date(year, month - 1, date).getDay()].substring(0,3)}
                    </h2>
                    <WeatherIcon code={conditions[idx]} size={50} />
                    <p>
                      High: {highs[idx]}
                      {unit}
                    </p>
                    <p>
                      Low: {lows[idx]}
                      {unit}
                    </p>
                    <p>Precipitation: {rainChances[idx]}%</p>
                  </CardActionArea>
                </Card>
              </Grid>
            </ThemeProvider>
          );
        })}
      </Grid>
    </Card>
  );
}
