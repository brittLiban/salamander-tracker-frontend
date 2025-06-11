'use client';

import { useEffect, useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@mui/material';
import Link from 'next/link';

// How its going to work, its going to poll all the recent jobs that have been done and when someone clicks on theirs it will show its csv as well

//I also want the ability for someone to do it by getting the time and date

export default function JobsPage() {

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await fetch('http://app:3001/jobs');
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
        <Box mt={5}>
            <Typography variant="h5" gutterBottom>Job History</Typography>

            {jobs.length === 0 ? (
                <Typography>No jobs yet.</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Video</TableCell>
                                <TableCell>Threshold</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Submitted</TableCell>
                                <TableCell>Link</TableCell>
                                <TableCell>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobs.map(job => (
                                <TableRow key={job.id}>
                                    <TableCell>{job.videoName}</TableCell>
                                    <TableCell>{job.threshold}</TableCell>
                                    <TableCell>
                                        #{job.targetColor}
                                        <Box
                                            component="span"
                                            sx={{
                                                display: 'inline-block',
                                                ml: 1,
                                                width: 14,
                                                height: 14,
                                                border: '1px solid #000',
                                                backgroundColor: `#${job.targetColor}`,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{new Date(job.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Link href={`/results/${job.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                                            View Result
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {/* To Download it sdsdsdadhashduash uh we up */}


                                        <a
                                            href={`http://app:3001/results/${job.id}.csv`}
                                            download
                                            style={{ textDecoration: 'none', color: '#1976d2' }}
                                        >
                                            Donwload
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}