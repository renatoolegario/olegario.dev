"use client";
import { Box } from "@mui/material";
import Header from "../organisms/Header";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />
    </Box>
  );
}
