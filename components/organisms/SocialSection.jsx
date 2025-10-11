import { Box, Container, Typography } from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
import SocialLink from "../molecules/SocialLink";

const socialLinks = [
  {
    icon: GitHubIcon,
    name: "GitHub",
    href: "https://github.com/renatoolegario",
  },
  {
    icon: LinkedInIcon,
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/renato-oleg%C3%A1rio-3b28a3147/",
  },
  {
    icon: InstagramIcon,
    name: "Instagram",
    href: "https://www.instagram.com/olegario.dev/",
  },
];

export default function SocialSection() {
  return (
    <Box component="section" sx={{ py: 10, px: 3, bgcolor: "background.paper" }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
          Redes Sociais
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
          {socialLinks.map((social) => (
            <SocialLink key={social.name} social={social} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}