'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress, Stack, dividerClasses } from '@mui/material';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

// How its going to work, its going to poll all the recent jobs that have been done and when someone clicks on theirs it will show its csv as well

//I also want the ability for someone to do it by getting the time and date

export default function JobsPage() {

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await fetch('http://localhost:3001/jobs');
                const data = await res.json();
                setJobs(data);
                console.log('Fetched jobs:', data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        getJobs();
    }, []);// Run once after initial render

    return (
       <div>jobs</div>
    );
}