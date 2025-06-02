'use client';

import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h3" gutterBottom>
        Salamander Tracker
      </Typography>
      <Typography variant="h6" gutterBottom>
        Track and preview salamander movement videos in style.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/videos"
        sx={{ mt: 4 }}
      >
        Browse Videos
      </Button>
    </Box>
  );
}
