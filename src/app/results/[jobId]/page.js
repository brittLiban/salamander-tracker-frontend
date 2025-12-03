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

export default function GetJobCsv() {
    const params = useParams(); //useParams() from Next.js App Router
    const { jobId } = params;

    const [rows, setRows] = useState([]);
    useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const fetchCsv = async () => {
        try {
            const res = await fetch(`${API_URL}/csvjson/${jobId}`);
            const data = await res.json();
            setRows(data);
            console.log('Fetched csv:', data);
        } catch (err) {
            console.error('Error fetching jobs:', err);
        }
    };

    fetchCsv(); 
}, [jobId]);

       // Run after the job id

    return (
        <Box mt={5}>
            <Typography variant="h5" gutterBottom>
                CSV Results for Job: {jobId}
            </Typography>

            {rows.length === 0 ? (
                <Typography>Loading or no data found.</Typography>
            ) : (
                <>
                {/* Making backend commit */}
                    <TableContainer component={Paper} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Frame</TableCell>
                                    <TableCell>X</TableCell>
                                    <TableCell>Y</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.frame}</TableCell>
                                        <TableCell>{row.x}</TableCell>
                                        <TableCell>{row.y}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </>
            )}
            {/* To Download it adhashduash uh we up */}
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/results/${jobId}.csv`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                >
                    Download CSV
                </Button>
            </Box>
        </Box>
    );
}
