import { Chip } from "@mui/material";

export default function SectionBadge({ label }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        borderRadius: 1.5,
        fontWeight: 600,
        bgcolor: "#f1f5f9",
        border: "1px solid #dbeafe",
        color: "#0f172a",
      }}
    />
  );
}
