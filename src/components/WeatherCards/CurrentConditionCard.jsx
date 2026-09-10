import React from "react";
import WeatherIcon from "../UtilityComponents/WeatherIcon";
import { Card, CardHeader, Skeleton } from "@mui/material";
import { wmoCodes } from "../../common/constants";


export default function CurrentConditionCard({ code, isLoading }) {
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
    <Card sx={{ textAlign: "center" }}>
      <CardHeader title={<h3>Current Conditions</h3>} />
      <WeatherIcon code={code} size={200} />
      <h4>{wmoCodes[code]}</h4>
    </Card>
  );
}
