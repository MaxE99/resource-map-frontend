import { createTheme } from "@mui/material/styles";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#1277c4",
    },
  },
});

const BASE_STYLE = {
  COLOR_PALLETE: {
    BACKGROUND: "#333333",
    ELEMENTS: "#1277c4",
    TEXT: "#fff",
    LIGHT_GREY: "#666",
    RED: "#FF3131",
    GREEN: "#39FF14",
  },
  BOX_SHADOW: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
};

export { BASE_STYLE, THEME };
