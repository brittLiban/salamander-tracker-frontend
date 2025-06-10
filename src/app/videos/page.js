'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';

export default function VideoChooserPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //when the page is loaded it will first load this data from the url
    fetch('http://localhost:3002/api/videos') 
    //translate it to json
      .then(res => res.json())
      //then put that data into the serVideos variable
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
        {/* Printing out each video as a map from the server */}
        {videos.map((video, idx) => (
          <Box key={idx} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">{video.filename || video}</Typography>
            <Button
              component={Link}
              // How we dynamically load the next page for each button
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
