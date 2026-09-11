import { Card, CardHeader, Grid, Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { WiSunrise, WiSunset } from "weather-icons-react";
import { formatTime } from "../../services/utils";

const ICON_SIZE = 100;

export default function SunriseSunsetCard({ sunrise, sunset, is24HrTime }) {
  const sunriseDatetime = new Date(sunrise);
  const sunsetDatetime = new Date(sunset);

  return (
    <Card sx={{ height: "100%"}}>
      <CardHeader title={<Typography sx={{fontWeight:'bold'}} variant="h4">Sunrise and Sunset</Typography>} />
      <Grid container spacing={1}>
        <Grid size={6}>
          <WiSunrise size={ICON_SIZE} />
          <Typography variant="h5" sx={{fontWeight:'bold', marginBottom:'1rem'}} component={'p'}>{formatTime(sunriseDatetime,is24HrTime)}</Typography>
        </Grid>
        <Grid size={6}>
          <WiSunset size={ICON_SIZE} />
          <Typography variant="h5" sx={{fontWeight:'bold', marginBottom:'1rem'}} component={'p'}>{formatTime(sunsetDatetime,is24HrTime)}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
