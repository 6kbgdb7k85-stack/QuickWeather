import { Card, CardHeader, Grid } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { WiSunrise, WiSunset } from "weather-icons-react";
import { formatTime } from "../../services/utils";

const ICON_SIZE = 100;

export default function SunriseSunsetCard({ sunrise, sunset, is24HrTime }) {
  const sunriseDatetime = new Date(sunrise);
  const sunsetDatetime = new Date(sunset);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title={<h3>Sunrise and Sunset</h3>} />
      <Grid container spacing={1}>
        <Grid size={6}>
          <WiSunrise size={ICON_SIZE} />
          <h3>{formatTime(sunriseDatetime,is24HrTime)}</h3>
        </Grid>
        <Grid size={6}>
          <WiSunset size={ICON_SIZE} />
          <h3>{formatTime(sunsetDatetime,is24HrTime)}</h3>
        </Grid>
      </Grid>
    </Card>
  );
}
