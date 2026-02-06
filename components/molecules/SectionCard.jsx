import { Box, ListItemButton, Typography } from "@mui/material";

export default function SectionCard({ index, title, subtitle, onClick }) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: 3,
        border: "1px solid #dbeafe",
        bgcolor: "#ffffff",
        alignItems: "flex-start",
        gap: 1.5,
        p: 2,
        transition: "all .2s ease",
        "&:hover": {
          borderColor: "#93c5fd",
          boxShadow: "0 18px 28px rgba(15, 23, 42, .08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          minWidth: 30,
          height: 30,
          borderRadius: 1.5,
          display: "grid",
          placeItems: "center",
          bgcolor: "#eff6ff",
          border: "1px solid #bfdbfe",
          fontSize: 12,
          fontWeight: 700,
          color: "#1d4ed8",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#475569" }}>
          {subtitle}
        </Typography>
      </Box>
    </ListItemButton>
  );
}
