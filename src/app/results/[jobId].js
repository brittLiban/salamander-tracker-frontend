'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

export default function PreviewPage() {
  const { filename } = useParams();
  const [jobId, setJobId] = useState(null);
  const [polling, setPolling] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const startJob = async () => {
    const res = await fetch(`http://localhost:3001/process/${filename}?targetColor=5a020c&threshold=60`, {
      method: 'POST',
    });

    const data = await res.json();
    const id = data.jobId;
    setJobId(id);
    setPolling(true);

    const pollInterval = setInterval(async () => {
      const statusRes = await fetch(`http://localhost:3001/jobStatus/${id}`);
      const status = await statusRes.json();

      if (status.status === 'done') {
        clearInterval(pollInterval);
        setDone(true);
        setPolling(false);
      } else if (status.status === 'error') {
        clearInterval(pollInterval);
        setPolling(false);
        setError(status.error);
      }
    }, 3000);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Previewing: {filename}</Typography>

      <Button onClick={startJob} variant="contained" sx={{ mt: 3 }}>
        Start Video Job
      </Button>

      {polling && <Typography mt={2}>🔥 Processing video... hang tight!</Typography>}

      {done && jobId && (
        <Box mt={4}>
          <Typography variant="h6" color="green">
            ✅ Job complete!
          </Typography>
          <Link href={`/results/${jobId}`}>
            <Button variant="outlined" sx={{ mt: 2 }}>
              View Results
            </Button>
          </Link>
        </Box>
      )}

      {error && (
        <Typography mt={3} color="error">
          ❌ Error: {error}
        </Typography>
      )}
    </Box>
  );
}
