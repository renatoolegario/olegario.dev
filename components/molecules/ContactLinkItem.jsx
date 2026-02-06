import { Link as MuiLink, Stack, Typography } from "@mui/material";

export default function ContactLinkItem({ label, href, description }) {
  return (
    <MuiLink
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      underline="none"
      sx={{
        border: "1px solid #dbeafe",
        bgcolor: "#ffffff",
        borderRadius: 2,
        p: 1.5,
        transition: "all .2s ease",
        "&:hover": {
          borderColor: "#60a5fa",
          boxShadow: "0 10px 24px rgba(15, 23, 42, .07)",
        },
      }}
    >
      <Stack spacing={0.4}>
        <Typography sx={{ color: "#0f172a", fontWeight: 700 }}>{label}</Typography>
        <Typography variant="body2" sx={{ color: "#334155" }}>
          {description}
        </Typography>
      </Stack>
    </MuiLink>
  );
}
