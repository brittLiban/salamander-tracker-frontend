'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';

// How its going to work, its going to poll all the recent jobs that have been done and when someone clicks on theirs it will show its csv as well

//I also want the ability for someone to do it by getting the time and date

export default function jobsPage() {
    useEffect(() => {
        fetch(`http://localhost:3001/jobs`).then(res => {
            const jsonObj = res.json
        })

    })

}