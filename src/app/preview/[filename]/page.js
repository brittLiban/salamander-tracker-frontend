'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function PreviewPage({ params }) {

  const [thumbnailUrl, setThumbnailUrl] = useState();
  const { filename } = params;
  useEffect(() => {
    fetch(`http://localhost:3001/thumbnail/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load thumbnail");
        return res.blob(); //returning the binary response
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob); //now its a familiar img url
        setThumbnailUrl(objectUrl);
      })
      .catch(err => {
        console.error('Error fetching thumbnail:', err);
      });
  }, [filename]); //only rerun this if the filename changes


  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>
        Previewing File:

        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${filename}`}
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        )}
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
      // Default goes back the the over videos 
      >
        Back to Videos
      </Button>
    </Box>
  );
}
