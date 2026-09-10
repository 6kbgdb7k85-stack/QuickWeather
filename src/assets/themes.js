import { createTheme } from "@mui/material";

const clearPalette = {
  palette: {
    mode: 'light',
    primary: {
      main: '#40fff9',
    },
    secondary: {
      main: '#c37f00',
    },
    background: {
      default: '#40a6ff',
      paper: '#4046ff',
    },
  },
};

const rainyPalette = {
  palette: {
    mode: 'light',
    primary: {
      main: '#876c00',
    },
    secondary: {
      main: '#87001b',
    },
    background: {
      default: '#001c87',
      paper: '#005f87',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.6)',
      disabled: 'rgba(255,255,255,0.38)',
    },
  },
};

const cloudyPalette = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4c4c4c',
    },
    secondary: {
      main: '#d8d6d6',
    },
    background: {
      default: '#a4a4a4',
      paper: '#5b5b5b',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
}

// old cloudy
// const cloudyPalette = {
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#ececec",
//     },
//     secondary: {
//       main: "#d8d6d6",
//     },
//     background: {
//       default: "#878787",
//       paper: "#a4a4a4",
//     },
//   },
// };

export const clearTheme = createTheme(clearPalette);
export const rainyTheme = createTheme(rainyPalette);
export const cloudyTheme = createTheme(cloudyPalette);
