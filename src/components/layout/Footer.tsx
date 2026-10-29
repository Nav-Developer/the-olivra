import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a0f0d",
        color: "#f5e1c0",
        py: 4,
        textAlign: "center",
        borderTop: "3px solid",
        borderColor: "secondary.main",
      }}
    >
      <Typography variant="body2" sx={{ letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} Broffles. ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
}
