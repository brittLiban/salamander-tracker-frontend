'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';

export default function VideoChooserPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/videos') 
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={4} px={4}>
      <Typography variant="h4" gutterBottom>
        Salamander Videos
      </Typography>

      <Stack spacing={2}>
        {videos.map((video, idx) => (
          <Box key={idx} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">{video.filename || video}</Typography>
            <Button
              component={Link}
              href={`/preview/${video.filename || video}`}
              variant="outlined"
              size="small"
            >
              Preview
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
