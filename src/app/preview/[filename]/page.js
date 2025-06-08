'use client';

import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the color picker for client-side only rendering
const ImageColorPicker = dynamic(
  () => import('react-image-color-picker').then(mod => mod.ImageColorPicker),
  { ssr: false }
);

export default function PreviewPage() {
  const params = useParams(); //useParams() from Next.js App Router
  const { filename } = params;

  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    //fetch req for the thumb img
    fetch(`http://localhost:3001/thumbnail/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load thumbnail');
        // it comes as binary so we put it in a img
        return res.blob();
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        setThumbnailUrl(objectUrl);
      })
      .catch(err => {
        console.error('Error fetching thumbnail:', err);
      });
      //run this fetch again only if the filename changes
  }, [filename]);

  const handleColorPick = (color) => {
    console.log('Selected color:', color);
    setSelectedColor(color);
  };

  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>
        Previewing File:
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        {filename}
      </Typography>

      {thumbnailUrl && (
        <>
          <ImageColorPicker
          //how were loading the img and picking the color
            imgSrc={thumbnailUrl}
            onColorPick={handleColorPick}
            zoom={1}
          />
        </>
      )}

      {/* container that holds the information for the selected color */}
      {selectedColor && (
        <Box mt={2}>
          <Typography>
            Selected Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
          </Typography>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: selectedColor,
              border: '1px solid #000',
              mt: 1,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
