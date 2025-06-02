'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
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
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        🎥 Salamander Videos
      </Typography>

      <Grid container spacing={3}>
        {videos.map((video, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card>
              <CardMedia
                component="video"
                src={`/videos/${video.filename}`} // Place .mp4 files in public/videos/
                height="200"
                controls
              />
              <CardContent>
                <Typography variant="h6">{video.title}</Typography>
                <Button
                  component={Link}
                  href={`/preview/${video.filename}`}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Preview
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
