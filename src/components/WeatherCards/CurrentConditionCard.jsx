import React from "react";
import WeatherIcon from "../UtilityComponents/WeatherIcon";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { wmoCodes } from "../../common/constants";

export default function CurrentConditionCard({ code, isLoading, isForecast=false }) {
  if (isLoading) {
    return (
      <Card sx={{ textAlign: "center", height: "100%" }}>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </Card>
    );
  }

  if (isNaN(code)) {
    return <></>;
  }

  return (
    <Card id="current-condition-card" sx={{ textAlign: "center" }}>
      <CardHeader title={<h3>{isForecast?'Expected Conditions':'Current Conditions'}</h3>} />
      <WeatherIcon id="condition-icon" code={code} size={200} />
      <h3 idf="condition-text">
        {wmoCodes[code] || `Unknown weather code ${code}`}
      </h3>
    </Card>
  );
}
