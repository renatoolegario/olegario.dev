"use client";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "black",
      }}
    >
      <Box
        component="img"
        src="/olegario.png"
        alt="Olegário background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.45)",
        }}
      />
      <Typography
        variant="h1"
        sx={{
          position: "relative",
          textAlign: "center",
          color: "#f5f5f5",
          fontWeight: 700,
          px: 2,
        }}
      >
        Resolvendo Problemas desde 2012
      </Typography>
    </Box>
  );
}