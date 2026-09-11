import {
  Alert,
  AppBar,
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import useApi from "../services/useAPI";
import TempCard from "./WeatherCards/TempCard";
import CurrentConditionCard from "./WeatherCards/CurrentConditionCard";
import FiveDayForecast from "./WeatherCards/FiveDayForecast";
import WindCard from "./WeatherCards/WindCard";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { apiUrls } from "../common/constants";

const initFormData = {
  city: "",
  units: "",
};

function Dashboard() {
  const { setWeatherTheme, setPageName } = useOutletContext();
  const [weatherData, setWeatherData] = useState(null);
  const [formData, setFormData] = useState(initFormData);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityLookup, setCityLookup] = useState("");
  const [init, setInit] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const { response: cityResponse, runApi: getCities } = useApi("city");

  const {
    response: weatherResponse,
    isLoading: weatherIsLoading,
    runApi: getWeather,
  } = useApi("currentWeather");

  function handleCityChange(event, newValue) {
    setFormData((prevState) => ({
      ...prevState,
      city: newValue,
    }));
  }

  useEffect(() => {
    setPageName("Weather Dashboard");
  }, []);

  useEffect(() => {
    if (searchParams.size > 0) {
      getCities({
        name: searchParams.get('city'),
        count: 1,
        language: "en",
        format: "json",
      });
    }else{
      setInit(false)
    }
  }, []);

  useEffect(() => {
    if (cityResponse?.results) {
      if(init){
        city = cityResponse.results[0];
        units = searchParams.get('units')
        setFormData({city: city.name,units})
        fetchWeather(city,units)
        setInit(false)
      }
      setCityOptions(
        cityResponse.results.map((city) => ({
          label: city.name,
          id: city.id,
          ...city,
        })),
      );
    }
  }, [cityResponse]);

  useEffect(() => {
    if (weatherResponse) {
      setWeatherData(weatherResponse);
      setWeatherTheme(weatherResponse.hourly.weather_code[0]);
    }
  }, [weatherResponse]);

  function isFormValid() {
    const { city, units } = formData;
    if (!city || !units) {
      return false;
    }
    return true;
  }

  function handleCityInputChange(event, newInputValue) {
    setCityLookup(newInputValue);
    getCities({
      name: newInputValue,
      count: 10,
      language: "en",
      format: "json",
    });
  }

  function fetchWeather(searchCity = null, searchUnits = null) {
    const city = searchCity || formData.city;
    const units = searchUnits || formData.units;
    const unitParams = {};
    if (units === "imp") {
      unitParams.temperature_unit = "fahrenheit";
      unitParams.precipitation_unit = "inch";
      unitParams.wind_speed_unit = "mph";
    }
    setSearchParams({ city: `${city.name}, ${city.admin1}, ${city.country}`, units: units });
    getWeather({
      latitude: city.latitude,
      longitude: city.longitude,
      daily:
        "temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,weather_code",
      hourly:
        "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation",
      current:
        "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation",
      timezone: "auto",
      forecast_days: 5,
      ...unitParams,
    });
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 4, md: 12 }}
        sx={{ alignItems: "center", marginBottom: "1rem" }}
      >
        <Grid size={6}>
          <Autocomplete
            value={formData.city}
            onChange={handleCityChange}
            inputValue={cityLookup}
            onInputChange={handleCityInputChange}
            id="city"
            options={cityOptions}
            noOptionsText="Start entering a city name to populate options"
            getOptionKey={(option) => option.id}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Grid
                  container
                  direction={"row"}
                  key={key}
                  {...optionProps}
                  spacing={3}
                  sx={{ justifyContent: "space-evenly", alignItems: "center" }}
                >
                  <Grid size={"auto"}>
                    <p>{option.label}</p>
                  </Grid>
                  <Grid size={"grow"}>
                    <p>{option.country}</p>
                  </Grid>
                  <Grid size={3}>
                    <p>{option.admin1}</p>
                  </Grid>
                </Grid>
              );
            }}
            renderInput={(params) => (
              <TextField required {...params} label="City" />
            )}
          />
        </Grid>
        <Grid size={3}>
          <FormControl fullWidth required>
            <InputLabel id="units-label">Units</InputLabel>
            <Select
              label="Units"
              labelId="units-label"
              id="units"
              value={formData.units}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  units: e.target.value,
                }))
              }
            >
              <MenuItem value={"imp"}>Imperial</MenuItem>
              <MenuItem value={"met"}>Metric</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={3}>
          <Button
            variant="contained"
            disabled={!isFormValid()}
            onClick={() => fetchWeather()}
          >
            Get Weather
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "stretch" }}
        spacing={1}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        <Grid size={4}>
          <TempCard
            isLoading={weatherIsLoading}
            unit={weatherData?.hourly_units.temperature_2m}
            current={weatherData?.current.temperature_2m}
            low={weatherData?.daily.temperature_2m_min[0]}
            high={weatherData?.daily.temperature_2m_max[0]}
          />
        </Grid>
        <Grid size={4}>
          <CurrentConditionCard
            code={weatherData?.current.weather_code}
            isLoading={weatherIsLoading}
          />
        </Grid>
        <Grid size={4}>
          <WindCard
            unit={weatherData?.hourly_units.wind_speed_10m}
            speed={weatherData?.current.wind_speed_10m}
            direction={weatherData?.current.wind_direction_10m}
            isLoading={weatherIsLoading}
          />
        </Grid>
        <Grid size={12}>
          <FiveDayForecast
            days={weatherData?.daily.time}
            highs={weatherData?.daily.temperature_2m_max}
            lows={weatherData?.daily.temperature_2m_min}
            rainChances={weatherData?.daily.precipitation_probability_max}
            unit={weatherData?.daily_units.temperature_2m_max}
            conditions={weatherData?.daily.weather_code}
            isLoading={weatherIsLoading}
            sunsets={weatherData?.daily.sunset}
            sunrises={weatherData?.daily.sunrise}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
