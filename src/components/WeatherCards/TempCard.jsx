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

    const style = { color: colorScale(temp) };

    return style;
  }

  return (
    <Card id="temp-card" sx={{ height: "100%", textAlign: "center" }}>
      <CardHeader title={<h3>Temperatures</h3>} />
      <Grid container>
        {current ? (
          <Grid size={12}>
            <h3>Current:</h3>
            <h1 id="temp-current" style={getTempColor(unit, current)}>
              {current}
              {unit}
            </h1>
          </Grid>
        ) : (
          <></>
        )}
        {high && low ? (
          <>
            <Grid size={6}>
              <h3>Low:</h3>
              <h2 id="temp-low" style={getTempColor(unit, low)}>
                {low}
                {unit}
              </h2>
            </Grid>
            <Grid size={6}>
              <h3>High:</h3>
              <h2 id="temp-high" style={getTempColor(unit, high)}>
                {high}
                {unit}
              </h2>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Card>
  );
}
