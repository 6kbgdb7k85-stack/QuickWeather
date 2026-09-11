import {
  Box,
  Card,
  CardHeader,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { scaleLinear } from "d3-scale";

export default function TempCard({ current, high, low, unit, isLoading }) {
  if (isLoading) {
    return (
      <Card sx={{ height: "100%", textAlign: "center" }}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={"100%"} height={120} />
          <Skeleton variant="rectangular" width={"100%"} height={120} />
          <Skeleton variant="rectangular" width={"100%"} height={120} />
        </Stack>
      </Card>
    );
  }

  if ((!current && (!high && !low)) || !unit) {
    return <></>;
  }

  //take temperature and return a color based on a gradient from cold to hot
  function getTempColor(unit, temp) {
    const cold = unit[1] === "F" ? 32 : 0;
    const hot = unit[1] === "F" ? 103 : 39;
    const good = unit[1] === "F" ? 72 : 22;

    const colorScale = scaleLinear()
      .domain([cold, good, hot])
      .range(["#A5F3FC", "#22C55E", "#EF4444"])
      .clamp(true);

    const roundedTemp = Math.round(temp)

    const style = { color: colorScale(roundedTemp) };

    return style;
  }

  return (
    <Card id="temp-card" sx={{ height: "100%", textAlign: "center" }}>
      <CardHeader title={<Typography sx={{fontWeight:'bold'}} variant="h3">Temperatures</Typography>} />
      <Grid container>
        {current ? (
          <Grid size={12}>
            <Typography variant="h5" sx={{fontWeight:'bold'}} component={'p'}>Current:</Typography>
            <Typography variant="h4" sx={{fontWeight:'bold'}} component={'h6'} style={getTempColor(unit,current)}>{Math.round(current)}{unit}</Typography>
          </Grid>
        ) : (
          <></>
        )}
        {high && low ? (
          <>
            <Grid size={6}>
              <Typography variant="h5" sx={{fontWeight:'bold'}} component={'p'}>Low:</Typography>
              <Typography variant="h4" sx={{fontWeight:'bold'}} component={'h6'} style={getTempColor(unit, low)}>
                {Math.round(low)}
                {unit}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h5" sx={{fontWeight:'bold'}} component={'p'}>High:</Typography>
              <Typography variant="h4" sx={{fontWeight:'bold'}} component={'h6'} id="temp-high" style={getTempColor(unit, high)}>
                {Math.round(high)}
                {unit}
              </Typography>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Card>
  );
}
