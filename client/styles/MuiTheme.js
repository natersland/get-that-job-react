import React from "react";
import { createTheme } from "@mui/material/styles";

function MuiThemeProvider(props) {
  const Colors = {
    primary: "#bf5f82",
    secondary: "#f48fb1",
    success: "#f48fb1",
    info: "#e1e2e1",
    danger: "#bf5f82",
    light: "#ffc1e3",
    muted: "#8e8e8e",
    border: "#e1e2e1",
    inverse: "#ffc1e3",
  };

  const theme = createTheme({
    palette: { main: Colors.primary },
    secondary: Colors.secondary,
  });
}
