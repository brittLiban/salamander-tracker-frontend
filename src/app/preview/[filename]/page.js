'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Typography, Box, Button, Slider } from '@mui/material';

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
  const [threshold, setThreshold] = useState(50); // default 2 50


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


  const hexaCoding = (color) => {
    // to extract the number
    const [r, g, b] = color.match(/\d+/g).map(Number);
    //converting everything to hexacode
    return [r, g, b].map(n => n.toString(16).padStart(2, '0'))
    //put array together
    .join('');
  }

  const handleColorPick = (color) => {
    
    console.log(' color:', color);
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
      <Box mt={2}>
        <Typography>
          Selected Color: <span style={{ color: selectedColor || '#000' }}>
            {selectedColor || 'None'}
          </span>
        </Typography>
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: selectedColor || '#000',
            border: '1px solid #000',
            mt: 1,
          }}
        />
      </Box>
      {/* Threshold Slider */}
      <Box width={200}>
        <Typography gutterBottom>Threshold: {threshold}</Typography>
        <Slider
          value={threshold}
          onChange={(e, newValue) => setThreshold(newValue)}
          aria-label="Threshold"
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
      </Box>
      {/* For the job  */}
      <Box width={200}>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={async () => {
            if (!selectedColor || !threshold) return alert('Missing color or threshold');

            console.log("selectedColor:", selectedColor);

            console.log("threshold:", threshold);
            const hexaNum = hexaCoding(selectedColor);
            console.log(hexaNum)
            try {
              const res = await fetch(
                `http://localhost:3001/process/${filename}?targetColor=${hexaNum}&threshold=${threshold}`,
                { method: 'POST' }
              );

              //doing to grab the text being set from the back end on req.

              //not sent as json for some reason :/
              const text = await res.text();
              let data;

              try {
                //if the text is json then it works
                data = JSON.parse(text);
              } catch {
                // if not than its a error msg
                throw new Error(text);
              }

              if (!res.ok) throw new Error(data.error || 'Failed to start job');


              alert(`Job started!\nJob ID: ${data.jobId}`);

            } catch (err) {
              alert('Error: ' + err.message);
            }
          }}
        >
          Start Video Job
        </Button>

      </Box>
    </Box>

  );
}
