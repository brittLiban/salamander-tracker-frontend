'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';




// Lets put the results in a table again. Also make it downloadable

export default function getJobCsv(){
    const params = useParams(); //useParams() from Next.js App Router
  const { jobId } = params;

    const [rows, setRows] = useState([]);
    useEffect(() => {
        const getCsv = async () => {
            try {
                const res = await fetch(`http://localhost:3001/csvjson/${jobId}`);
                const data = await res.json();
                setRows(data);
                console.log('Fetched csv:', data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        getCsv();
    }, [jobId]);// Run after the job id

      return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        CSV Results for Job: {jobId}
      </Typography>

      {rows.length === 0 ? (
        <Typography>Loading or no data found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(rows[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              
            </Table>
          </TableContainer>

          
        </>
      )}
    </Box>
  );
}
