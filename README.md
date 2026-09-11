# Quick Weather
Weather application using Open-Meteo API to get weather data from around the world at a moments notice
- uses Geocoding API from Open-Meteo to get coordinate data from city names

# Features
- Get current weather conditions and a 5 day forecast by city in either Imperial or Metric units
- Theme changes to match the weather conditions
    - Debug options are available in the menu to view each theme independently of the weather condition. Upon fetching weather conditions again the theme will reset according to the current condition
- Temperature values shown in the Temperature card are colored along a gradient based on how hot or cold it is
    - Blue (32F/0C) dangerously cold
    - Green (72F/22C) comfortable
    - Red (103F/39C) dangerously hot
- Click a card in the "5 Day Forecast" section to get more details about that day

# Usage
- https://quickweather-t6eq.onrender.com/dashboard
- Start typing a city name into the "City" field and select the desired city from the list
- Select "Imperial" or "Metric" from the "Units" dropdown
- Click "Get Weather"

# Local Usage
- clone repo
- run npm install and npm run dev
- refer to usage section

# TODO
- Trip planner where a user can enter their start and destination city and how long the trip is to get forecast data for the duration of the trip and the different conditions between start and end points on travel days (gotta know what to have easily accessible when you first arrive)
- Hour by hour forecast for the current day
- ~~Ability to click on a forecast card for more details about that days forecast~~ Complete