import { Card, CardHeader, Grid } from "@mui/material";
import React from "react";
import { WiSunrise, WiSunset } from "weather-icons-react";

const ICON_SIZE = 100;

export default function SunriseSunsetCard({ sunrise, sunset }) {
  const sunriseDatetime = new Date(sunrise);
  const sunsetDatetime = new Date(sunset);

  const sunriseString = `${String(sunriseDatetime.getHours()).padStart(2, "0")}:${String(sunriseDatetime.getMinutes()).padStart(2, "0")}`;
  const sunsetString = `${String(sunsetDatetime.getHours()).padStart(2, "0")}:${String(sunsetDatetime.getMinutes()).padStart(2, "0")}`;

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title={<h3>Sunrise and Sunset</h3>} />
      <Grid container spacing={1}>
        <Grid size={6}>
          <WiSunrise size={ICON_SIZE} />
          <p>{sunriseString}</p>
        </Grid>
        <Grid size={6}>
          <WiSunset size={ICON_SIZE} />
          <p>{sunsetString}</p>
        </Grid>
      </Grid>
    </Card>
  );
}
