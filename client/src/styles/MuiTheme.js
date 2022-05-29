import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f48fb1",
      hoverState: "#bf5f82",
    },
    secondary: {
      main: "#bf5f82",
    },
    tertiary: {
      main: "#ffc1e3",
    },
    text: {
      primary: "#373737",
      secondary: "#5C5C5C",
    },
    content: {
      main: "#1E1E1E",
    },
    contentsecondary: {
      main: "#5C5C5C",
    },
    gray: {
      main: "#5C5C5C",
    },
    lightgray: {
      main: "#8E8E8E",
    },
    darkgray: {
      main: "#373737",
    },
    backgrounddark: {
      main: "#E1E2E1",
    },
  },
  typography: {
    fontFamily: "Noto Sans Thai,Montserrat, sans-serif",
  },
});
