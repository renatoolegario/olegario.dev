"use client";
import { Box } from "@mui/material";
import Header from "../organisms/Header";
import HeroSection from "../organisms/HeroSection";
import AboutSection from "../organisms/AboutSection";
import TechnologiesSection from "../organisms/TechnologiesSection";
import PortfolioSection from "../organisms/PortfolioSection";
import SocialSection from "../organisms/SocialSection";
import ContactSection from "../organisms/ContactSection";
import Footer from "../organisms/Footer";

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Header />
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <PortfolioSection />
      <SocialSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}