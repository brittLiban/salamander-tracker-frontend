'use client';

import React, { useEffect, useRef } from 'react';

export default function LiveCentroidTuner({ src, defaultColor = 'FF0000', defaultThreshold = 60 }) {
  const canvasRef = useRef(null);

  // the useEffect that will help process live updates to the image
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // fix for CORS issues when using canvas with external images

    // as the image comes it it'll load
    img.onload = () => {
      processImage(img);
    };

    img.src = src;
  }, [src, defaultColor, defaultThreshold]);

  // function that runs when the image is loaded in
  function processImage(img) {
    const canvas = canvasRef.current;
    // if the page essentially hasn't loaded yet then return and don’t run

    // this is nice 'cause as the useEffect checks the img it can bypass this
    if (!canvas) return;

    // letting the computer know it will generate an image on a 2d plane
    const ctx = canvas.getContext('2d', { willReadFrequently: true }); // added willReadFrequently for performance
    if (!ctx) return;

    // setting the canvas to mirror the image
    canvas.width = img.width;
    canvas.height = img.height;

    // drawing the image starting from the top left
    ctx.drawImage(img, 0, 0);

    // allows us to grab the entire width and height of the 'canvas' we're drawing onto.
    // we know the information for every single pixel
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // how we grab all the pixels for us to loop through later!
    const data = imageData.data;

    const rT = parseInt(defaultColor.slice(0, 2), 16);
    const gT = parseInt(defaultColor.slice(2, 4), 16);
    const bT = parseInt(defaultColor.slice(4, 6), 16);

    // finding the distance between each pixel 
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const dist = Math.sqrt((r - rT) ** 2 + (g - gT) ** 2 + (b - bT) ** 2);
      const isClose = dist < defaultThreshold;

      const color = isClose ? 255 : 0;
      // if the color is close set it to white, if not do black
      data[i] = data[i + 1] = data[i + 2] = color;
      // Set the pixel’s Red, Green, and Blue all to the same: either full white or full black.
    }

    // taking all the images and pixel data and printing it!
    ctx.putImageData(imageData, 0, 0);
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          border: '1px solid black',
        }}
      />
    </div>
  );
}
