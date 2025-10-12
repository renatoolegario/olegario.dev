import { Box } from "@mui/material";
import React from "react";
import ParticleImage, { Vector, forces } from "react-particle-image";

const particleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255)
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "#1eb9d1", //
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 40,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  },
};

const motionForce = (x, y) => {
  return forces.disturbance(x, y, 5);
};

const Logo = () => {
  return (
    <Box component="section" id="home" sx={{ position: "relative" }}>
      <ParticleImage
        src={"/Olegário.Dev-removebg-preview.png"}
        scale={1}
        entropy={1}
        maxParticles={1500}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        particleOptions={particleOptions}
        backgroundColor="transparent"
      />
    </Box>
  );
};

export default Logo;
