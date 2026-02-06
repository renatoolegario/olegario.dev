import { Typography } from "@mui/material";

export default function SectionTitle({ children, ...props }) {
  return (
    <Typography
      variant="h5"
      sx={{ fontWeight: 700, letterSpacing: "0.01em", color: "#0f172a" }}
      {...props}
    >
      {children}
    </Typography>
  );
}
