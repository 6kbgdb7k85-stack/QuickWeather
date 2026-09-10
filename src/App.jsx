import { BrowserRouter, Routes, Route, Navigate } from "react-router";
// import './App.css'
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "@mui/material";
import { useState } from "react";
import { getTheme } from "./services/utils";
import ForecastDetails from "./components/ForecastDetails";
import AppLayout from "./common/components/AppLayout";

function App() {
  const [weatherCondition, setWeatherCondition] = useState(0);

  const theme = getTheme(weatherCondition);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forecast/day" element={<ForecastDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    // <ThemeProvider theme={theme}>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route index element={<Navigate to="/dashboard" replace />} />
    //       <Route
    //         path="/dashboard"
    //         element={<Dashboard setWeatherTheme={setWeatherCondition} />}
    //       />
    //       <Route
    //         path="/forecast/day"
    //         element={<ForecastDetails setWeatherTheme={setWeatherCondition} />}
    //       />
    //     </Routes>
    //   </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
