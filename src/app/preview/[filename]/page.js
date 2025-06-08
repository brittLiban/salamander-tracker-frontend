'use client';

import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function PreviewPage({ params }) {
  const { filename } = params;
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/thumbnail/${filename}`) 
    //translate to json 
      .then(res => res.json())
        .then(data => {
          setThumbnailUrl(data);
        })
      }).catch(err => {
        console.error('Error fetching thumbnail:', err);
      });

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
        // Default goes back the the over videos 
      >
       Back to Videos
      </Button>
    </Box>
  );
}
