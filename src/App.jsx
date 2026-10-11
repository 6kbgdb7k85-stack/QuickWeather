import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Dashboard from "./components/Dashboard";
import ForecastDetails from "./components/ForecastDetails";
import AppLayout from "./common/components/AppLayout";

function App() {

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
  );
}

export default App;
