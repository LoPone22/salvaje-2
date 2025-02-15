import React from 'react';
import { Image, Box } from '@mantine/core';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 100,
    md: 150,
    lg: 200
  };

  return (
    <Box ta="center" mb="md">
      <Image
        src="/logo.png"
        alt="Salvaje Logo"
        width={sizes[size]}
        height="auto"
        fit="contain"
      />
    </Box>
  );
}
