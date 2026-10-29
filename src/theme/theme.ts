import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#D2282E", dark: "#8E1B1B", contrastText: "#FFFFFF" },
    secondary: { main: "#F7D154", contrastText: "#3B0D0D" },
    background: { default: "#F5E1C0", paper: "#FFF8EC" },
    text: { primary: "#2A1210", secondary: "#5A3A35" },
  },
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
    h1: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h2: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h3: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
    h4: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 800,
          borderRadius: 2,
          paddingInline: 28,
        },
      },
    },
  },
});

export default theme;
