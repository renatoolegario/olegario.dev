import { Box, Link, Typography } from "@mui/material";

export default function SocialLink({ social }) {
  return (
    <Link
      key={social.name}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        color: "text.primary",
        textDecoration: "none",
        "&:hover": { color: "primary.main" },
      }}
    >
      <Box
        sx={{
          bgcolor: "grey.800",
          p: 2,
          borderRadius: "50%",
          transition: "background-color 0.3s",
          "&:hover": { bgcolor: "primary.main" },
        }}
      >
        <social.icon fontSize="large" />
      </Box>
      <Typography variant="caption">{social.name}</Typography>
    </Link>
  );
}