'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
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

    const [id, setId] = useState([]);
    useEffect(() => {
        const getCsv = async () => {
            try {
                const res = await fetch(`http://localhost:3001/csvjson/${jobId}`);
                const data = await res.json();
                setId(data);
                console.log('Fetched csv:', data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        getCsv();
    }, [id]);// Run once after initial render

}
