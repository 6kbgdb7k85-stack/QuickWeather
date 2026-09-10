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

const initFormData = {
  city: "",
  units: "",
};

function Dashboard({ setWeatherTheme }) {
  const theme = useTheme();
  const [weatherData, setWeatherData] = useState(null);
  const [formData, setFormData] = useState(initFormData);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityLookup, setCityLookup] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);

  const {
    response: cityResponse,
    isLoading: cityIsLoading,
    runApi: getCities,
  } = useApi("city");

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
    if (cityResponse?.results) {
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

  function openMenu(e) {
    setMenuAnchor(e.currentTarget);
  }

  function closeMenu(e) {
    setMenuAnchor(null);
  }

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

  function fetchWeather() {
    const unitParams = {};
    if (formData.units === "imp") {
      unitParams.temperature_unit = "fahrenheit";
      unitParams.precipitation_unit = "inch";
      unitParams.wind_speed_unit = "mph";
    }
    getWeather({
      latitude: formData.city.latitude,
      longitude: formData.city.longitude,
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
    <Container
      fixed
      sx={{
        bgcolor: theme.palette.background.default,
        width: "100%",
        maxWidth: "100%",
        paddingBottom: "1rem",
      }}
    >
      <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={openMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={closeMenu}
            >
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setWeatherTheme(95);
                }}
              >
                Debug Rain Theme
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setWeatherTheme(0);
                }}
              >
                Debug Clear Theme
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setWeatherTheme(3);
                }}
              >
                Debug Cloudy Theme
              </MenuItem>
            </Menu>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Quick Weather
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 4, md: 12 }}
        sx={{ alignItems: "center", marginBottom: "1rem" }}
      >
        {/* <Grid size={12}>
          <Alert severity="info">City and Units are required</Alert>
        </Grid> */}
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
                  sx={{ justifyContent: "space-evenly", alignItems: "center" }}
                >
                  <Grid size={3}>
                    <p>{option.label}</p>
                  </Grid>
                  <Grid size={3}>
                    <p>{option.country}</p>
                  </Grid>
                  <Grid size={3}>
                    <p>{option.admin1}</p>
                  </Grid>
                </Grid>
              );
            }}
            renderInput={(params) => <TextField required {...params} label="City" />}
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
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
