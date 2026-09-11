import { Card, CardHeader, Skeleton, Stack } from "@mui/material";
import React from "react";
import {
    WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionDownRight,
  WiDirectionLeft,
  WiDirectionRight,
  WiDirectionUp,
  WiDirectionUpLeft,
  WiDirectionUpRight,
} from "weather-icons-react";

const ICON_SIZE = 150;

export default function WindCard({ speed, direction, unit, isLoading }) {
  function windDirection(direction) {
    const normalizedDirection = ((direction % 360) + 360) % 360;
    const compassDirection = Math.round(normalizedDirection / 45) % 8;
    switch (compassDirection) {
      case 0:
        return <WiDirectionUp size={ICON_SIZE} />;
      case 1:
        return <WiDirectionUpRight size={ICON_SIZE} />;
      case 2:
        return <WiDirectionRight size={ICON_SIZE} />;
      case 3:
        return <WiDirectionDownRight size={ICON_SIZE} />;
      case 4:
        return <WiDirectionDown size={ICON_SIZE} />;
      case 5:
        return <WiDirectionDownLeft size={ICON_SIZE} />;
      case 6:
        return <WiDirectionLeft size={ICON_SIZE} />;
      case 7:
        return <WiDirectionUpLeft size={ICON_SIZE} />;
    }
  }

  if (isLoading) {
    return (
      <Card sx={{ height: "100%", textAlign: "center" }}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={"100%"} height={300} />
          <Skeleton variant="rectangular" width={"100%"} height={100}/>
        </Stack>
      </Card>
    );
  }

  if (!speed || !direction || !unit) {
    return <></>;
  }

  return (
    <Card id='wind-card' sx={{ height: "100%", textAlign: "center" }}>
    <CardHeader id='wind-direction' title={<h3>Wind Speed</h3>}/>
      {windDirection(Number(direction))}
      <h3 id='wind-speed'>
        {speed} {unit}
      </h3>
    </Card>
  );
}
