'use client';

import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function PreviewPage({ params }) {
  const { filename } = params;

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>
         Previewing File:
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        {filename}
      </Typography>

    

      <Button
        variant="outlined"
        color="primary"
        href="/videos"
        sx={{ mt: 3 }}
        component={Link}
      >
       Back to Videos
      </Button>
    </Box>
  );
}
