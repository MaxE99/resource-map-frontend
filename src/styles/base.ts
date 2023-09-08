import { createTheme } from "@mui/material/styles";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#333333", // Your primary color
    },
    secondary: {
      main: "#1277c4", // Your secondary color
    },
  },
});

const BASE_STYLE = {
  COLOR_PALLETE: {
    BACKGROUND: "#333333",
    ELEMENTS: "#1277c4",
    TEXT: "#fff",
  },
};

export { BASE_STYLE, THEME };
