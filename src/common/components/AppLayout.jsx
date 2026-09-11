import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { getTheme } from "../../services/utils";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

export default function AppLayout() {
  const [weatherCondition, setWeatherCondition] = useState(0);
  const [pageName, setPageName] = useState("");
  const [is24HrTime, setIs24HrTime] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const theme = getTheme(weatherCondition);

  function openMenu(e) {
    setMenuAnchor(e.currentTarget);
  }

  function closeMenu(e) {
    setMenuAnchor(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        fixed
        sx={{
          bgcolor: theme.palette.background.default,
          width: "100%",
          maxWidth: "100%",
          paddingBottom: "1rem",
        }}
      >
        <AppBar position="static" sx={{ flexGrow: 1, marginBottom: "1rem" }}>
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
                  setWeatherCondition(95);
                }}
              >
                Debug Rain Theme
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setWeatherCondition(0);
                }}
              >
                Debug Clear Theme
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setWeatherCondition(3);
                }}
              >
                Debug Cloudy Theme
              </MenuItem>
            </Menu>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Quick Weather
            </Typography>
            <FormControl component={"fieldset"}>
              <FormGroup>
                <FormControlLabel
                  value="on"
                  control={
                    <Switch
                      color="secondary"
                      checked={is24HrTime}
                      onChange={(e) => setIs24HrTime(e.target.checked)}
                    />
                  }
                  label="24Hr"
                  labelPlacement="End"
                />
              </FormGroup>
            </FormControl>
            {pathname !== "/dashboard" ? (
              <Button
                sx={{ color: "text.primary", marginLeft:'1rem' }}
                onClick={() => navigate(-1)}
                variant="text"
              >
                Return
              </Button>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ color: theme.palette.text.primary }}>
          <h1>{pageName}</h1>
        </Box>
        <Outlet
          context={{
            setWeatherTheme: setWeatherCondition,
            setPageName,
            is24HrTime,
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
